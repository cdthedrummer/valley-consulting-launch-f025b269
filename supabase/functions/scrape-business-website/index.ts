import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const { websiteUrl } = await req.json();

    if (!websiteUrl || typeof websiteUrl !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid website URL is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Validate URL format
    let url: URL;
    try {
      url = new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('[SCRAPE] Fetching website content:', url.toString());

    // Fetch website content
    const websiteResponse = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HVCBot/1.0)'
      }
    });

    if (!websiteResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch website content' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const htmlContent = await websiteResponse.text();
    
    // Extract text content (simple HTML stripping)
    const textContent = htmlContent
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 8000); // Limit content size

    console.log('[SCRAPE] Analyzing content with AI...');

    // Use Lovable AI to analyze the website
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a business intelligence assistant analyzing contractor/home services websites.
Extract structured information from website content and return ONLY valid JSON (no markdown, no explanation).

Return this exact structure:
{
  "businessName": "extracted name or null",
  "industry": "one of: HVAC, Plumbing, Roofing, Flooring, Fencing, Deck & Patio, Landscaping, General Contracting, Other",
  "servicesOffered": ["service1", "service2"],
  "location": "city/region mentioned or null",
  "phoneNumber": "extracted phone or null",
  "emailAddress": "extracted email or null",
  "serviceGaps": ["what competitors offer that they don't"],
  "competitorUrls": ["potential competitor websites if mentioned"],
  "keyStrengths": ["what they emphasize"],
  "confidence": 0.0-1.0
}`
          },
          {
            role: 'user',
            content: `Analyze this website content from ${url.hostname}:\n\n${textContent}`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('[SCRAPE] AI error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'AI service rate limit exceeded. Please try again in a moment.' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
        );
      }
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiResult = await aiResponse.json();
    const aiContent = aiResult.choices[0]?.message?.content || '{}';
    
    console.log('[SCRAPE] AI raw response:', aiContent);

    // Parse AI response (handle potential markdown wrapping)
    let analysisData;
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : aiContent;
      analysisData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('[SCRAPE] Failed to parse AI response:', parseError);
      analysisData = {
        businessName: null,
        industry: 'Other',
        servicesOffered: [],
        location: null,
        phoneNumber: null,
        emailAddress: null,
        serviceGaps: [],
        competitorUrls: [],
        keyStrengths: [],
        confidence: 0.5
      };
    }

    // Log usage
    if (aiResult.usage) {
      await supabaseClient.from("ai_usage").insert({
        user_id: null,
        prompt_tokens: aiResult.usage.prompt_tokens || 0,
        completion_tokens: aiResult.usage.completion_tokens || 0,
        total_tokens: aiResult.usage.total_tokens || 0,
        cost_usd: 0,
        model: 'google/gemini-2.5-flash',
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          ...analysisData,
          websiteUrl: url.toString(),
          scrapedAt: new Date().toISOString()
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('[SCRAPE] Error:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
