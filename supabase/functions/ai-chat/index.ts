import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const generateSystemPrompt = (location?: string, locationType?: string, industry?: string, language: string = 'English') => {
  const basePrompt = `You are Contractor AI Copilot, serving small-to-mid size home-service businesses in Rockland & Westchester counties, NY.

RESPOND IN ${language.toUpperCase()} LANGUAGE.

USER CONTEXT:
${location ? `- Service Area: ${location} (${locationType})` : '- Service Area: Hudson Valley region'}
${industry ? `- Industry: ${industry}` : '- Industry: General contracting/home services'}

RULES:
1. ALWAYS provide specific, actionable marketing recommendations with step-by-step instructions.
2. When discussing local areas, provide realistic market insights and ask follow-up questions to help implement strategies.
${location ? `3. Focus heavily on ${location}-specific data, demographics, and opportunities.` : '3. Reference local Hudson Valley towns and markets.'}
${industry ? `4. Tailor all advice specifically for ${industry} businesses.` : '4. Provide industry-specific advice when the user mentions their trade.'}
5. For ANY marketing question, ALWAYS end with 2-3 specific follow-up questions like:
   - "Are you currently running Google Ads in [specific area]? Would you like a step-by-step guide?"
   - "Do you have a Google My Business listing optimized for [specific service]?"
   - "Would you like me to walk you through creating a local marketing campaign?"
6. Include specific local references: mention towns by name, reference local landmarks, seasonal patterns, demographics.
7. When asked for numbers (home sales, prices, permits), provide realistic estimates and immediately suggest specific marketing actions.
8. ALWAYS ask if they want detailed implementation steps for any recommendation.
9. Keep responses under 250 words but packed with actionable value.
10. Focus on immediate, implementable tactics rather than general advice.

EXAMPLE RESPONSE STRUCTURE:
[Specific local market insight] → [Actionable recommendation] → [Follow-up questions about implementation]`;

  return basePrompt;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    // Check subscription status
    const { data: subscription } = await supabaseClient
      .from("subscribers")
      .select("subscribed")
      .eq("user_id", user.id)
      .single();

    if (!subscription?.subscribed) {
      return new Response(JSON.stringify({ error: "Subscription required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    const { messages, userContext } = await req.json();
    const { location, locationType, industry, language } = userContext || {};

    // Add dynamic system prompt if not present
    const systemPrompt = generateSystemPrompt(location, locationType, industry, language);
    const messagesWithSystem = messages.find(m => m.role === 'system') 
      ? messages 
      : [{ role: 'system', content: systemPrompt }, ...messages];

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("OPENROUTER_API_KEY")}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: messagesWithSystem,
        usage: { include: true },
      }),
    });

    const result = await openRouterResponse.json();

    // Log usage to database
    if (result.usage) {
      await supabaseClient.from("ai_usage").insert({
        user_id: user.id,
        prompt_tokens: result.usage.prompt_tokens || 0,
        completion_tokens: result.usage.completion_tokens || 0,
        total_tokens: result.usage.total_tokens || 0,
        cost_usd: (result.usage.prompt_tokens || 0) * 0.072 / 1000000 + (result.usage.completion_tokens || 0) * 0.28 / 1000000, // OSS-120b pricing
        model: 'openai/gpt-oss-120b',
      });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
