import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Security utilities
const getClientIP = (req: Request): string => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Extract first IP from comma-separated list
    return forwardedFor.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown';
};

const validateChatInput = (data: any): { isValid: boolean; error?: string } => {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Invalid request data' };
  }
  
  if (!Array.isArray(data.messages)) {
    return { isValid: false, error: 'Messages must be an array' };
  }
  
  if (data.messages.length === 0 || data.messages.length > 50) {
    return { isValid: false, error: 'Invalid message count (1-50 allowed)' };
  }
  
  for (const message of data.messages) {
    if (!message.role || !message.content) {
      return { isValid: false, error: 'Each message must have role and content' };
    }
    if (typeof message.content !== 'string' || message.content.length > 10000) {
      return { isValid: false, error: 'Message content too long (max 10000 chars)' };
    }
  }
  
  return { isValid: true };
};

const generateSystemPrompt = (
  location?: string, 
  locationType?: string, 
  industry?: string, 
  language: string = 'English',
  marketingGoal?: string,
  monthlyBudget?: string,
  idealCustomers?: string,
  businessName?: string,
  yearsInBusiness?: number,
  serviceRadius?: number
) => {
  const basePrompt = `You are Contractor AI Copilot, serving small-to-mid size home-service businesses in Rockland & Westchester counties, NY.

RESPOND IN ${language.toUpperCase()} LANGUAGE.

=== REMEMBER: USER'S BUSINESS PROFILE ===
${businessName ? `Business Name: ${businessName}` : ''}
${location ? `Service Area: ${location} (${locationType})` : 'Service Area: Hudson Valley region'}
${industry ? `Industry: ${industry}` : 'Industry: General contracting/home services'}
${yearsInBusiness ? `Years in Business: ${yearsInBusiness}` : ''}
${serviceRadius ? `Service Radius: ${serviceRadius} miles` : ''}
${marketingGoal ? `Marketing Goal: ${marketingGoal}` : ''}
${monthlyBudget ? `Monthly Budget: ${monthlyBudget}` : ''}
${idealCustomers ? `Target Customers: ${idealCustomers}` : ''}

IMPORTANT: Use this profile information to personalize all responses. Reference their business name when appropriate, acknowledge their goals, and tailor strategies to their budget and service area.

CRITICAL RESPONSE REQUIREMENTS:
1. ALWAYS provide SPECIFIC, ACTIONABLE data with EXACT numbers, addresses, and detailed insights.
2. For home sales questions, include: exact number of sales, specific streets/areas, property details, renovation potential, and target property recommendations.
3. For market data, provide: specific sales numbers, price ranges, dates, property characteristics, and actionable business opportunities.
4. Create DETAILED property lists with addresses, sale prices, years built, and renovation potential scores.
5. Always end with 2-3 SPECIFIC follow-up questions that offer implementation help.
${marketingGoal ? `6. PRIORITIZE recommendations that align with their stated goal: ${marketingGoal}` : ''}
${monthlyBudget ? `7. Suggest strategies that fit within their budget: ${monthlyBudget}` : ''}

RESPONSE FORMAT:
- Lead with specific data (numbers, addresses, dates)
- Provide detailed property insights and renovation opportunities  
- Include actionable marketing strategies with step-by-step implementation
${marketingGoal ? `- Tailor all recommendations to support: ${marketingGoal}` : ''}
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
    const clientIP = getClientIP(req);
    
    // Check rate limiting (200 requests per hour per IP for AI chat)
    const { data: rateLimitCheck, error: rateLimitError } = await supabaseClient.rpc('check_rate_limit', {
      _ip_address: clientIP,
      _endpoint: 'ai-chat',
      _max_requests: 200,
      _window_minutes: 60
    });

    // Get current request count
    const { count: requestCount } = await supabaseClient
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .eq('endpoint', 'ai-chat')
      .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

    if (!rateLimitCheck) {
      console.warn(`Rate limit exceeded for AI chat from IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          requestCount: requestCount || 200,
          maxRequests: 200,
          retryAfter: 3600
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        },
      );
    }
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

    // Validate request body
    const requestData = await req.json();
    const validation = validateChatInput(requestData);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }
    
    const { messages, userContext } = requestData;
    const { 
      location, 
      locationType, 
      industry, 
      language, 
      marketingGoal, 
      monthlyBudget, 
      idealCustomers,
      businessName,
      yearsInBusiness,
      serviceRadius
    } = userContext || {};

    // Log audit trail
    const { error: auditError } = await supabaseClient.from('audit_logs').insert({
      table_name: 'ai_chat',
      operation: 'REQUEST',
      new_data: { user_id: user.id, message_count: messages.length, location, industry },
      ip_address: clientIP,
      user_agent: req.headers.get('user-agent')
    });
    if (auditError) console.error('[AUDIT] Error logging ai_chat request:', auditError);

    // Add dynamic system prompt if not present
    const systemPrompt = generateSystemPrompt(
      location, 
      locationType, 
      industry, 
      language, 
      marketingGoal, 
      monthlyBudget, 
      idealCustomers,
      businessName,
      yearsInBusiness,
      serviceRadius
    );
    const messagesWithSystem = messages.find((m: any) => m.role === 'system') 
      ? messages 
      : [{ role: 'system', content: systemPrompt }, ...messages];

    const lovableAIResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: messagesWithSystem,
      }),
    });

    if (!lovableAIResponse.ok) {
      const errorText = await lovableAIResponse.text();
      console.error('[AI-CHAT] Lovable AI error:', lovableAIResponse.status, errorText);
      
      if (lovableAIResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'AI service rate limit exceeded. Please try again later.' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        });
      }
      if (lovableAIResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'AI service requires additional credits. Please contact support.' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 402,
        });
      }
      throw new Error(`AI gateway error: ${lovableAIResponse.status}`);
    }

    const result = await lovableAIResponse.json();

    // Log usage to database
    if (result.usage) {
      await supabaseClient.from("ai_usage").insert({
        user_id: user.id,
        prompt_tokens: result.usage.prompt_tokens || 0,
        completion_tokens: result.usage.completion_tokens || 0,
        total_tokens: result.usage.total_tokens || 0,
        cost_usd: 0, // Gemini is currently free during promotional period
        model: 'google/gemini-2.5-flash',
      });
    }

    // Trigger background signal extraction (fire and forget)
    const sessionId = data.sessionId;
    if (sessionId && messages.length >= 2) {
      try {
        // Don't await - let it run in background
        supabaseClient.functions.invoke('analyze-chat-signals', {
          body: {
            sessionId,
            userId: user.id,
            messages: messages.slice(-5) // Only analyze last 5 messages for efficiency
          }
        }).catch((err: any) => {
          console.error('Background signal extraction failed:', err);
        });
      } catch (bgError) {
        console.error('Failed to trigger signal extraction:', bgError);
      }
    }

    return new Response(JSON.stringify({
      ...result,
      rateLimit: {
        requestCount: (requestCount || 0) + 1,
        maxRequests: 200
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
