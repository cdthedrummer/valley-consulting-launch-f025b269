import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Missing userId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[ANALYZE-PATTERNS] Analyzing patterns for user ${userId}`);

    // Fetch all chat signals for this user
    const { data: signals, error: signalsError } = await supabase
      .from('chat_signals')
      .select('*')
      .eq('user_id', userId)
      .order('extracted_at', { ascending: false })
      .limit(100);

    if (signalsError) {
      throw signalsError;
    }

    // Fetch business profile
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Count chat sessions
    const { count: sessionCount } = await supabase
      .from('chat_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    console.log(`[ANALYZE-PATTERNS] Found ${signals?.length || 0} signals, ${sessionCount || 0} sessions`);

    // Aggregate signals by type
    const painPoints = signals?.filter(s => s.signal_type === 'pain_point').map(s => s.signal_value) || [];
    const serviceInterests = signals?.filter(s => s.signal_type === 'service_interest').map(s => s.signal_value) || [];
    const locationMentions = signals?.filter(s => s.signal_type === 'location_mention').map(s => s.signal_value) || [];
    const budgetHints = signals?.filter(s => s.signal_type === 'budget_hint').map(s => s.signal_value) || [];
    const urgencySignals = signals?.filter(s => s.signal_type === 'urgency').map(s => s.signal_value) || [];

    // Determine urgency level
    let urgencyLevel = 'medium';
    if (urgencySignals.length > 0) {
      const urgencyText = urgencySignals.join(' ').toLowerCase();
      if (urgencyText.includes('asap') || urgencyText.includes('urgent') || urgencyText.includes('immediately')) {
        urgencyLevel = 'high';
      } else if (urgencyText.includes('eventually') || urgencyText.includes('someday')) {
        urgencyLevel = 'low';
      }
    }

    // Determine experience level based on conversation sophistication
    let experienceLevel = 'beginner';
    if (sessionCount && sessionCount > 5) {
      experienceLevel = 'intermediate';
    }
    if (sessionCount && sessionCount > 15) {
      experienceLevel = 'advanced';
    }

    // Prepare intelligence profile data
    const intelligenceData = {
      user_id: userId,
      primary_pain_points: [...new Set(painPoints)].slice(0, 5),
      service_focus: [...new Set(serviceInterests)].slice(0, 5),
      target_locations: [...new Set([
        profile?.location,
        ...locationMentions
      ].filter(Boolean))].slice(0, 5),
      typical_budget_range: budgetHints.length > 0 ? budgetHints[0] : profile?.monthly_budget || null,
      preferred_channels: profile?.marketing_goal ? [profile.marketing_goal] : [],
      urgency_level: urgencyLevel,
      experience_level: experienceLevel,
      conversation_count: sessionCount || 0,
      last_active_at: new Date().toISOString(),
      insights: {
        total_signals: signals?.length || 0,
        most_discussed_topics: [...new Set(serviceInterests)].slice(0, 3),
        recent_focus: signals?.slice(0, 10).map(s => s.signal_type) || [],
      },
      recommendations: {
        suggested_actions: [],
        focus_areas: [...new Set(painPoints)].slice(0, 3),
      },
      updated_at: new Date().toISOString(),
    };

    // Upsert intelligence profile
    const { data: upsertedProfile, error: upsertError } = await supabase
      .from('user_intelligence_profile')
      .upsert(intelligenceData, { 
        onConflict: 'user_id',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (upsertError) {
      console.error('[ANALYZE-PATTERNS] Upsert error:', upsertError);
      throw upsertError;
    }

    console.log(`[ANALYZE-PATTERNS] Updated intelligence profile for user ${userId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        profile: upsertedProfile 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[ANALYZE-PATTERNS] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});