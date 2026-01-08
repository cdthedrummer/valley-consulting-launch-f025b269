import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    // Validate authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claims, error: authError } = await authClient.auth.getClaims(token);
    
    if (authError || !claims?.claims?.sub) {
      console.error('[ANALYZE-SIGNALS] Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authenticatedUserId = claims.claims.sub;

    // Use service role for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { sessionId, userId, messages } = await req.json();

    // Input validation
    if (!sessionId || !userId || !messages) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate UUIDs
    if (!UUID_REGEX.test(sessionId) || !UUID_REGEX.test(userId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid ID format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the user is analyzing their own data
    if (authenticatedUserId !== userId) {
      console.error('[ANALYZE-SIGNALS] User mismatch:', { authenticatedUserId, userId });
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages must be a non-empty array' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Limit messages count
    if (messages.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Too many messages' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[ANALYZE-SIGNALS] Analyzing ${messages.length} messages for session ${sessionId}`);

    // Build conversation context for AI analysis (with length limits)
    const conversationText = messages
      .slice(-50) // Only use last 50 messages
      .map((msg: any) => {
        const role = String(msg.role || 'user').substring(0, 20);
        const content = String(msg.content || '').substring(0, 2000);
        return `${role}: ${content}`;
      })
      .join('\n\n')
      .substring(0, 15000); // Total limit

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
      throw new Error('AI service unavailable');
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
      
      // Validate signals is an array
      if (!Array.isArray(signals)) {
        signals = [];
      }
    } catch (parseError) {
      console.error('[ANALYZE-SIGNALS] Failed to parse AI response');
      signals = [];
    }

    console.log(`[ANALYZE-SIGNALS] Extracted ${signals.length} signals`);

    // Insert signals into database (limit to 20 signals)
    const insertedSignals = [];
    for (const signal of signals.slice(0, 20)) {
      if (signal.signal_type && signal.signal_value) {
        // Sanitize signal data
        const sanitizedSignal = {
          user_id: userId,
          session_id: sessionId,
          signal_type: String(signal.signal_type).substring(0, 50),
          signal_value: String(signal.signal_value).substring(0, 500),
          confidence_score: Math.min(1, Math.max(0, Number(signal.confidence_score) || 0.85)),
          context: String(signal.context || '').substring(0, 200),
        };

        const { data, error } = await supabase
          .from('chat_signals')
          .insert(sanitizedSignal)
          .select()
          .single();

        if (error) {
          console.error('[ANALYZE-SIGNALS] Insert error:', error.message);
        } else {
          insertedSignals.push(data);
        }
      }
    }

    console.log(`[ANALYZE-SIGNALS] Inserted ${insertedSignals.length} signals to database`);

    // Trigger user pattern analysis
    try {
      await supabase.functions.invoke('analyze-user-patterns', {
        body: { userId },
        headers: { Authorization: authHeader }
      });
    } catch (patternError) {
      console.error('[ANALYZE-SIGNALS] Pattern analysis trigger failed');
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
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
