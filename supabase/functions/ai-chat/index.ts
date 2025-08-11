import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Contractor AI Copilot, serving small-to-mid size home-service businesses in Rockland & Westchester counties, NY.

RULES:
1. ALWAYS provide specific, actionable marketing recommendations with step-by-step instructions.
2. When discussing local areas (Nanuet, New City, Pearl River, Spring Valley, etc.), provide realistic market insights and ask follow-up questions to help implement strategies.
3. For ANY marketing question, ALWAYS end with 2-3 specific follow-up questions like:
   - "Are you currently running Google Ads in [specific town]? Would you like a step-by-step guide to set them up?"
   - "Do you have a Google My Business listing optimized for [specific service] in [specific area]?"
   - "Would you like me to walk you through creating a Nextdoor marketing campaign for your area?"
4. Include specific local references: mention towns by name, reference local landmarks, seasonal patterns, demographics.
5. When asked for numbers (home sales, prices, permits), provide realistic estimates for Hudson Valley and immediately suggest specific marketing actions based on those numbers.
6. ALWAYS ask if they want detailed implementation steps for any recommendation you make.
7. Keep responses under 200 words but packed with actionable value.
8. Focus on immediate, implementable tactics rather than general advice.

EXAMPLE RESPONSE STRUCTURE:
[Specific local market insight] → [Actionable recommendation] → [Follow-up questions about implementation]`;

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

    const { messages } = await req.json();

    // Add system prompt if not present
    const messagesWithSystem = messages.find(m => m.role === 'system') 
      ? messages 
      : [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("OPENROUTER_API_KEY")}`,
      },
      body: JSON.stringify({
        model: 'openai/o4-mini',
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
        cost_usd: (result.usage.total_tokens || 0) * 0.00015 / 1000, // Estimate cost
        model: 'openai/o4-mini',
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
