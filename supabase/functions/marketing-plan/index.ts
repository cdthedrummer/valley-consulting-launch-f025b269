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
    const { location, locationType, industry } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const locationStr = locationType === 'zipcode' ? `ZIP ${location}` : location;
    const systemPrompt = `You are a marketing strategist AI for contractor businesses in the Hudson Valley region. Generate detailed, actionable marketing plans with specific tactics, budgets, and timelines. Always respond with valid JSON only - no markdown, no explanations.`;
    
    const userPrompt = `Create a comprehensive marketing plan for a ${industry || 'contractor'} business serving ${locationStr}. Include:
- 5-7 prioritized tasks with timelines
- Budget allocation across channels (Google Ads, SEO, Email, Nextdoor, Direct Mail)
- 10-15 relevant keywords
- Email sequence templates (3 emails)
- Google Search ad copy (3 variations)
- Nextdoor ad copy (2 variations)
- Google Maps/LSA descriptions (2 variations)
- Timeline milestones (6 items)
- Success metrics (5 items)
- Call-to-action examples (4 items)

Return ONLY valid JSON in this exact structure with no additional text:
{
  "tasks": [{"task": "string", "priority": "high|medium|low", "timeline": "string"}],
  "budgetAllocations": [{"channel": "string", "percentage": number, "amount": number}],
  "keywords": ["string"],
  "creatives": {
    "email": ["string"],
    "search": ["string"],
    "nextdoor": ["string"],
    "maps": ["string"]
  },
  "timeline": ["string"],
  "metrics": ["string"],
  "callsToAction": ["string"]
}`;

    console.log('Calling Lovable AI for marketing plan generation');
    
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
        tools: [
          {
            type: "function",
            function: {
              name: "generate_marketing_plan",
              description: "Generate a complete marketing plan with tasks, budget, keywords, and creatives",
              parameters: {
                type: "object",
                properties: {
                  tasks: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        task: { type: "string" },
                        priority: { type: "string", enum: ["high", "medium", "low"] },
                        timeline: { type: "string" }
                      },
                      required: ["task", "priority", "timeline"]
                    }
                  },
                  budgetAllocations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        channel: { type: "string" },
                        percentage: { type: "number" },
                        amount: { type: "number" }
                      },
                      required: ["channel", "percentage", "amount"]
                    }
                  },
                  keywords: { type: "array", items: { type: "string" } },
                  creatives: {
                    type: "object",
                    properties: {
                      email: { type: "array", items: { type: "string" } },
                      search: { type: "array", items: { type: "string" } },
                      nextdoor: { type: "array", items: { type: "string" } },
                      maps: { type: "array", items: { type: "string" } }
                    },
                    required: ["email", "search", "nextdoor", "maps"]
                  },
                  timeline: { type: "array", items: { type: "string" } },
                  metrics: { type: "array", items: { type: "string" } },
                  callsToAction: { type: "array", items: { type: "string" } }
                },
                required: ["tasks", "budgetAllocations", "keywords", "creatives", "timeline", "metrics", "callsToAction"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_marketing_plan" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response from Lovable AI');
    
    let plan;
    if (data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments) {
      const argsStr = data.choices[0].message.tool_calls[0].function.arguments;
      plan = typeof argsStr === 'string' ? JSON.parse(argsStr) : argsStr;
    } else if (data.choices?.[0]?.message?.content) {
      const content = data.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        plan = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    } else {
      throw new Error('Unexpected response format from AI');
    }

    return new Response(
      JSON.stringify({ plan }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in marketing-plan function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate marketing plan' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
