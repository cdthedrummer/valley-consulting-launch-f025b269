
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Contractor AI Copilot, serving small-to-mid size home-service businesses in Rockland & Westchester counties, NY.

RULES:
1. Every answer must include at least one *actionable marketing recommendation* tied to local data.
2. When asked for numbers—home sales, median prices, permit counts—acknowledge that you would normally call external data sources, but for this demo, provide realistic estimates based on Hudson Valley market knowledge.
3. If the data suggests an opportunity, propose a concrete tactic (Google Search Ads geo-targeting, Nextdoor post, door-hanger campaign, etc.).
4. Keep tone friendly, jargon-free, and under 250 words unless the user asks for more depth.
5. Focus on actionable marketing moves for contractors in the Hudson Valley area.`;

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
        model: 'openai/gpt-4o-mini',
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
        model: 'openai/gpt-4o-mini',
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
