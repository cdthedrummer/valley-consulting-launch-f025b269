import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// SSRF protection: Block private/internal networks
const isPrivateUrl = (hostname: string): boolean => {
  const privatePatterns = [
    /^localhost$/i,
    /^127\.\d+\.\d+\.\d+$/,
    /^10\.\d+\.\d+\.\d+$/,
    /^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/,
    /^192\.168\.\d+\.\d+$/,
    /^0\.0\.0\.0$/,
    /^::1$/,
    /^fc00:/i,
    /^fe80:/i,
    /\.local$/i,
    /\.internal$/i,
  ];
  return privatePatterns.some(pattern => pattern.test(hostname));
};

// Sanitize error for client response
const sanitizeError = (error: Error): string => {
  const errorMap: Record<string, string> = {
    'AI analysis failed': 'Service temporarily unavailable',
    'rate limit': 'Too many requests, please try again later',
    'fetch': 'Unable to retrieve website content',
    'Invalid URL': 'Please provide a valid website URL',
  };
  
  for (const [key, value] of Object.entries(errorMap)) {
    if (error.message.toLowerCase().includes(key.toLowerCase())) return value;
  }
  
  return 'An unexpected error occurred';
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  // Get client IP for rate limiting
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   req.headers.get('cf-connecting-ip') || 
                   '0.0.0.0';

  try {
    // Rate limiting: 5 requests per hour per IP
    const { data: allowed } = await supabaseClient.rpc('check_rate_limit_with_security', {
      _ip_address: clientIp,
      _endpoint: 'scrape-business-website',
      _max_requests: 5,
      _window_minutes: 60
    });

    if (!allowed) {
      console.log(`[SCRAPE] Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      );
    }

    const body = await req.json();
    const { websiteUrl } = body;

    // Input validation
    if (!websiteUrl || typeof websiteUrl !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid website URL is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Length validation
    if (websiteUrl.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'URL too long' }),
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

    // SSRF protection: Block private networks
    if (isPrivateUrl(url.hostname)) {
      console.log(`[SCRAPE] SSRF attempt blocked: ${url.hostname}`);
      return new Response(
        JSON.stringify({ error: 'Access to private networks is not allowed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return new Response(
        JSON.stringify({ error: 'Only HTTP/HTTPS URLs are allowed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log(`[SCRAPE] Processing request from IP: ${clientIp}`);

    // Fetch website content with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let websiteResponse;
    try {
      websiteResponse = await fetch(url.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; HVCBot/1.0)'
        },
        signal: controller.signal,
        redirect: 'follow'
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!websiteResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch website content' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const htmlContent = await websiteResponse.text();
    
    // Response size limit (100KB)
    if (htmlContent.length > 100000) {
      console.log('[SCRAPE] Response too large, truncating');
    }
    
    // Extract text content (simple HTML stripping)
    const textContent = htmlContent
      .substring(0, 100000) // Limit raw content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 8000); // Limit content size for AI

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
  "industry": "one of: HVAC, Plumbing, Roofing, Flooring, Fencing, Deck & Patio, Landscaping, Junk Removal, General Contracting, Other",
  "servicesOffered": ["service1", "service2"],
  "location": "city/region mentioned or null",
  "phoneNumber": "extracted phone or null",
  "emailAddress": "extracted email or null",
  "serviceGaps": ["what competitors offer that they don't", "missing services"],
  "competitorUrls": ["potential competitor websites if mentioned"],
  "keyStrengths": ["what they emphasize", "unique selling points"],
  "confidence": 0.0-1.0,
  "quickWins": ["actionable improvement 1", "actionable improvement 2", "actionable improvement 3"]
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
      console.error('[SCRAPE] AI error:', aiResponse.status);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again in a moment.' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
        );
      }
      throw new Error('AI analysis failed');
    }

    const aiResult = await aiResponse.json();
    const aiContent = aiResult.choices[0]?.message?.content || '{}';

    // Parse AI response (handle potential markdown wrapping)
    let analysisData;
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : aiContent;
      analysisData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('[SCRAPE] Failed to parse AI response');
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
        confidence: 0.5,
        quickWins: []
      };
    }

    // Calculate marketing score
    let marketingScore = 50; // Base score
    
    if (analysisData.phoneNumber) marketingScore += 15;
    if (analysisData.emailAddress) marketingScore += 10;
    if (analysisData.location) marketingScore += 10;
    
    const servicesCount = Math.min((analysisData.servicesOffered || []).length, 4);
    marketingScore += servicesCount * 5;
    
    const strengthsCount = Math.min((analysisData.keyStrengths || []).length, 3);
    marketingScore += strengthsCount * 5;
    
    const gapsCount = (analysisData.serviceGaps || []).length;
    marketingScore -= Math.min(gapsCount * 5, 20);
    
    marketingScore = Math.max(0, Math.min(100, marketingScore));
    
    // Generate quick wins if not provided
    if (!analysisData.quickWins || analysisData.quickWins.length === 0) {
      const wins = [];
      if (!analysisData.phoneNumber) wins.push("Add click-to-call button in header");
      if (!analysisData.emailAddress) wins.push("Add contact form to homepage");
      if ((analysisData.servicesOffered || []).length < 3) wins.push("Expand service descriptions");
      if (!analysisData.location) wins.push("Add service area map");
      if (gapsCount > 0) wins.push("Add emergency 24/7 services");
      analysisData.quickWins = wins.slice(0, 5);
    }
    
    // Generate fake competitor count (2-4 for teasing)
    const competitorCount = Math.floor(Math.random() * 3) + 2;

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
          scrapedAt: new Date().toISOString(),
          marketingScore,
          competitorCount
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('[SCRAPE] Error:', error);
    return new Response(
      JSON.stringify({ error: sanitizeError(error as Error) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
