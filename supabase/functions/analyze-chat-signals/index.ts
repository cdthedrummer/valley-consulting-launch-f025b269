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

    const { sessionId, userId, messages } = await req.json();

    if (!sessionId || !userId || !messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[ANALYZE-SIGNALS] Analyzing ${messages.length} messages for session ${sessionId}`);

    // Build conversation context for AI analysis
    const conversationText = messages
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join('\n\n');

    // Use Lovable AI to extract signals
    const extractionPrompt = `Analyze this conversation and extract actionable marketing intelligence signals. Return a JSON array of signals.

Each signal should have:
- signal_type: One of 'pain_point', 'service_interest', 'location_mention', 'budget_hint', 'competitor_mention', 'seasonal_pattern', 'urgency'
- signal_value: The extracted value (be specific)
- confidence_score: 0.0-1.0
- context: Brief surrounding context (max 100 chars)

Conversation:
${conversationText}

Return ONLY valid JSON array, no markdown formatting.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a marketing intelligence extraction AI. Extract specific, actionable signals from conversations. Return only valid JSON.' },
          { role: 'user', content: extractionPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      console.error('[ANALYZE-SIGNALS] AI API error:', aiResponse.status);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const extractedContent = aiData.choices[0]?.message?.content || '[]';
    
    // Parse AI response (handle markdown code blocks if present)
    let signals = [];
    try {
      const cleanContent = extractedContent
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim();
      signals = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('[ANALYZE-SIGNALS] Failed to parse AI response:', extractedContent);
      signals = [];
    }

    console.log(`[ANALYZE-SIGNALS] Extracted ${signals.length} signals`);

    // Insert signals into database
    const insertedSignals = [];
    for (const signal of signals) {
      if (signal.signal_type && signal.signal_value) {
        const { data, error } = await supabase
          .from('chat_signals')
          .insert({
            user_id: userId,
            session_id: sessionId,
            signal_type: signal.signal_type,
            signal_value: signal.signal_value,
            confidence_score: signal.confidence_score || 0.85,
            context: signal.context || '',
          })
          .select()
          .single();

        if (error) {
          console.error('[ANALYZE-SIGNALS] Insert error:', error);
        } else {
          insertedSignals.push(data);
        }
      }
    }

    console.log(`[ANALYZE-SIGNALS] Inserted ${insertedSignals.length} signals to database`);

    // Trigger user pattern analysis
    try {
      await supabase.functions.invoke('analyze-user-patterns', {
        body: { userId }
      });
    } catch (patternError) {
      console.error('[ANALYZE-SIGNALS] Pattern analysis trigger failed:', patternError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        signalsExtracted: insertedSignals.length,
        signals: insertedSignals 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[ANALYZE-SIGNALS] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});