import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ELEVEN_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVEN_API_KEY) {
      return new Response(JSON.stringify({ error: "ELEVENLABS_API_KEY not set" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { agentId } = await req.json();
    if (!agentId) {
      return new Response(JSON.stringify({ error: "agentId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${encodeURIComponent(agentId)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "xi-api-key": ELEVEN_API_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(JSON.stringify({ error: `ElevenLabs error: ${text}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await response.json();
    return new Response(JSON.stringify(body), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
