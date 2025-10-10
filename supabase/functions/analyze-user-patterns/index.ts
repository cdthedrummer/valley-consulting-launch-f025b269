import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const budgetMentions = signals?.filter(s => s.signal_type === 'budget_indicator').map(s => s.signal_value) || [];
    const competitors = signals?.filter(s => s.signal_type === 'competitor_mention').map(s => s.signal_value) || [];
    const conversationCount = sessionCount || 0;
    const recentSignals = signals?.slice(0, 10) || [];

    console.log('[ANALYZE-PATTERNS] Running AI-powered pattern analysis');

    // Enhanced AI analysis with more sophisticated pattern recognition
    const analysisPrompt = `Analyze this contractor's marketing intelligence data:

CONVERSATION HISTORY & SIGNALS:
- Locations discussed: ${JSON.stringify(locationMentions)}
- Services of interest: ${JSON.stringify(serviceInterests)}
- Budget indicators: ${JSON.stringify(budgetMentions)}
- Pain points expressed: ${JSON.stringify(painPoints)}
- Competitors mentioned: ${JSON.stringify(competitors)}
- Total conversations: ${conversationCount}

RECENT SIGNALS (last 10):
${JSON.stringify(recentSignals, null, 2)}

Provide a comprehensive marketing intelligence analysis with:
1. PRIMARY_PAIN_POINTS: Top 3-5 marketing challenges this contractor faces
2. SERVICE_FOCUS: Which services they should prioritize marketing (ranked by urgency/opportunity)
3. TARGET_LOCATIONS: Specific geographic areas to focus on
4. BUDGET_RANGE: Estimated marketing budget based on indicators
5. PREFERRED_CHANNELS: Best marketing channels for their business (digital, local, referral, etc.)
6. URGENCY_LEVEL: How quickly they need marketing help (low/medium/high)
7. EXPERIENCE_LEVEL: Their marketing sophistication (beginner/intermediate/advanced)
8. INSIGHTS: Detailed observations about business maturity, growth potential, marketing gaps, competitive positioning, seasonal opportunities
9. RECOMMENDATIONS: Actionable next steps prioritized by impact

Return structured JSON for database storage.`;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    let aiAnalysis = null;
    try {
      const aiResponse = await fetch(
        'https://ai.gateway.lovable.dev/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { 
                role: 'system', 
                content: 'You are an expert marketing intelligence analyst specializing in contractor and service businesses. Provide deep, actionable insights based on conversation patterns.' 
              },
              { role: 'user', content: analysisPrompt }
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "analyze_contractor_patterns",
                  description: "Analyze contractor marketing patterns and provide strategic intelligence",
                  parameters: {
                    type: "object",
                    properties: {
                      primary_pain_points: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "Top 3-5 specific marketing challenges"
                      },
                      service_focus: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "Services to prioritize in marketing, ranked by opportunity"
                      },
                      target_locations: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "Specific cities, counties, or zip codes to target"
                      },
                      typical_budget_range: { 
                        type: "string",
                        description: "Estimated monthly marketing budget range"
                      },
                      preferred_channels: { 
                        type: "array", 
                        items: { type: "string" },
                        description: "Best marketing channels for this contractor"
                      },
                      urgency_level: { 
                        type: "string", 
                        enum: ["low", "medium", "high"],
                        description: "How urgently they need marketing help"
                      },
                      experience_level: { 
                        type: "string", 
                        enum: ["beginner", "intermediate", "advanced"],
                        description: "Their marketing sophistication level"
                      },
                      insights: { 
                        type: "object",
                        properties: {
                          businessMaturity: { type: "string" },
                          growthPotential: { type: "string" },
                          marketingGaps: { type: "array", items: { type: "string" } },
                          competitivePosition: { type: "string" },
                          seasonalOpportunities: { type: "array", items: { type: "string" } }
                        }
                      },
                      recommendations: { 
                        type: "object",
                        properties: {
                          nextSteps: { 
                            type: "array", 
                            items: { type: "string" },
                            description: "Prioritized action items"
                          },
                          quickWins: {
                            type: "array",
                            items: { type: "string" },
                            description: "Easy actions with immediate impact"
                          },
                          longTermStrategy: {
                            type: "array",
                            items: { type: "string" },
                            description: "Strategic initiatives for sustained growth"
                          }
                        }
                      }
                    },
                    required: ["primary_pain_points", "service_focus", "urgency_level", "experience_level", "insights", "recommendations"],
                    additionalProperties: false
                  }
                }
              }
            ],
            tool_choice: { type: "function", function: { name: "analyze_contractor_patterns" } }
          })
        }
      );

      const aiData = await aiResponse.json();
      console.log('[ANALYZE-PATTERNS] AI response received');
      
      if (aiData.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments) {
        aiAnalysis = JSON.parse(aiData.choices[0].message.tool_calls[0].function.arguments);
        console.log('[ANALYZE-PATTERNS] AI analysis parsed successfully');
      }
    } catch (error) {
      console.error('[ANALYZE-PATTERNS] AI analysis failed:', error);
      // Fall back to basic analysis if AI fails
    }

    // Prepare intelligence profile data using AI analysis or fallback
    const intelligenceData = {
      user_id: userId,
      primary_pain_points: aiAnalysis?.primary_pain_points || [...new Set(painPoints)].slice(0, 5),
      service_focus: aiAnalysis?.service_focus || [...new Set(serviceInterests)].slice(0, 5),
      target_locations: aiAnalysis?.target_locations || [...new Set([
        profile?.location,
        ...locationMentions
      ].filter(Boolean))].slice(0, 5),
      typical_budget_range: aiAnalysis?.typical_budget_range || (budgetMentions.length > 0 ? budgetMentions[0] : profile?.monthly_budget || null),
      preferred_channels: aiAnalysis?.preferred_channels || (profile?.marketing_goal ? [profile.marketing_goal] : []),
      urgency_level: aiAnalysis?.urgency_level || 'medium',
      experience_level: aiAnalysis?.experience_level || (conversationCount > 10 ? 'intermediate' : 'beginner'),
      conversation_count: conversationCount,
      last_active_at: new Date().toISOString(),
      insights: aiAnalysis?.insights || {
        total_signals: signals?.length || 0,
        most_discussed_topics: [...new Set(serviceInterests)].slice(0, 3),
        recent_focus: signals?.slice(0, 10).map(s => s.signal_type) || [],
      },
      recommendations: aiAnalysis?.recommendations || {
        nextSteps: [],
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