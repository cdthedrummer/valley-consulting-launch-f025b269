import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location, industry, businessProfile } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Starting competitor research for:', { location, industry });

    const systemPrompt = `You are a market research analyst specializing in local business competition. 
Provide detailed, actionable competitor intelligence based on the user's location and industry.
Focus on practical insights that can inform marketing strategies.`;

    const userPrompt = `Analyze the competitive landscape for a ${industry} business in ${location}.

${businessProfile ? `Business Context:
- Business Name: ${businessProfile.business_name || 'N/A'}
- Years in Business: ${businessProfile.years_in_business || 'N/A'}
- Service Radius: ${businessProfile.service_radius ? businessProfile.service_radius + ' miles' : 'N/A'}
- Marketing Goal: ${businessProfile.marketing_goal || 'N/A'}
` : ''}

Provide a comprehensive competitor analysis including:

1. **Top 3-5 Competitors**: List major competitors in this market with:
   - Estimated market share (%)
   - Key strengths
   - Key weaknesses
   - Pricing strategy

2. **Market Position**: Where would this business likely rank and why?

3. **Competitive Advantages**: What opportunities exist to differentiate?

4. **Market Gaps**: Specific underserved needs or opportunities

5. **Recommended Actions**: 3 specific, actionable recommendations

Format the response in clear sections with bullet points. Be specific and actionable.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    console.log('Competitor analysis completed successfully');

    return new Response(
      JSON.stringify({ analysis }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in competitor-research function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        analysis: 'Unable to generate competitor analysis at this time. Please try again later.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
