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

CRITICAL RESPONSE REQUIREMENTS:
1. ALWAYS provide SPECIFIC, ACTIONABLE data with EXACT numbers, addresses, and detailed insights.
2. For home sales questions, include: exact number of sales, specific streets/areas, property details, renovation potential, and target property recommendations.
3. For market data, provide: specific sales numbers, price ranges, dates, property characteristics, and actionable business opportunities.
4. Create DETAILED property lists with addresses, sale prices, years built, and renovation potential scores.
5. Always end with 2-3 SPECIFIC follow-up questions that offer implementation help.

RESPONSE FORMAT:
- Lead with specific data (numbers, addresses, dates)
- Provide detailed property insights and renovation opportunities  
- Include actionable marketing strategies with step-by-step implementation
- Offer to create contact lists, marketing materials, or campaign strategies
- End with specific implementation questions

EXAMPLES OF REQUIRED DETAIL LEVEL:
❌ AVOID: "Target new construction areas" 
✅ PROVIDE: "37 homes sold in ${location || 'Nanuet'} last quarter. 12 were built pre-1970: 123 Main St ($450k, 1965, high renovation potential), 456 Oak Ave ($520k, 1978, medium potential). Would you like me to help you create a targeted outreach strategy for these 8 unrenovated properties?"

❌ AVOID: "Focus on demographics"
✅ PROVIDE: "2,847 households in ${location || 'area'}, median income $89,500. 25% are age 35-44 (prime renovation age). 78% homeownership rate. Target the 156 households earning $100k+ on Maple Street and Cedar Drive. Want me to draft a direct mail campaign for these specific addresses?"

ALWAYS offer to:
- Create property contact lists
- Draft marketing emails/calls
- Design specific campaigns
- Generate lead magnets
- Build implementation timelines

Keep responses under 300 words but PACKED with specific, actionable data and concrete next steps.`;

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
