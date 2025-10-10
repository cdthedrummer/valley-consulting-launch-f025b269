import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location, industry } = await req.json();
    
    console.log('[PROPERTY-DATA] Starting scrape for:', { location, industry });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check cache first
    const cacheKey = `property_data_${location.toLowerCase().replace(/\s+/g, '_')}_${industry.toLowerCase()}`;
    const { data: cached } = await supabase
      .from('local_market_intelligence')
      .select('*')
      .eq('location', location)
      .eq('industry', industry)
      .eq('data_type', 'property_opportunities')
      .gte('expires_at', new Date().toISOString())
      .single();

    if (cached) {
      console.log('[PROPERTY-DATA] Cache hit');
      return new Response(
        JSON.stringify({ data: cached.data_payload, cached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Simulate property data extraction
    // In production, this would integrate with real estate APIs like Zillow, Redfin, etc.
    const propertyData = {
      location,
      industry,
      properties: [
        {
          address: `${Math.floor(Math.random() * 9000) + 1000} Main Street, ${location}`,
          estimatedValue: Math.floor(Math.random() * 300000) + 200000,
          yearBuilt: Math.floor(Math.random() * 50) + 1970,
          lastRenovated: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 2014 : null,
          opportunityScore: Math.random() * 100,
          reason: ['Aging HVAC system', 'Original windows', 'Kitchen needs update'][Math.floor(Math.random() * 3)],
          homeownerProfile: {
            estimatedAge: Math.floor(Math.random() * 30) + 35,
            estimatedIncome: Math.floor(Math.random() * 100000) + 60000,
            likelyNeeds: ['Maintenance', 'Upgrades', 'Repairs'][Math.floor(Math.random() * 3)]
          }
        },
        {
          address: `${Math.floor(Math.random() * 9000) + 1000} Oak Avenue, ${location}`,
          estimatedValue: Math.floor(Math.random() * 300000) + 200000,
          yearBuilt: Math.floor(Math.random() * 50) + 1970,
          lastRenovated: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 2014 : null,
          opportunityScore: Math.random() * 100,
          reason: ['Aging roof', 'Dated plumbing', 'Original flooring'][Math.floor(Math.random() * 3)],
          homeownerProfile: {
            estimatedAge: Math.floor(Math.random() * 30) + 35,
            estimatedIncome: Math.floor(Math.random() * 100000) + 60000,
            likelyNeeds: ['Maintenance', 'Upgrades', 'Repairs'][Math.floor(Math.random() * 3)]
          }
        },
        {
          address: `${Math.floor(Math.random() * 9000) + 1000} Elm Drive, ${location}`,
          estimatedValue: Math.floor(Math.random() * 300000) + 200000,
          yearBuilt: Math.floor(Math.random() * 50) + 1970,
          lastRenovated: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 2014 : null,
          opportunityScore: Math.random() * 100,
          reason: ['Deck replacement needed', 'Fence repair', 'Siding update'][Math.floor(Math.random() * 3)],
          homeownerProfile: {
            estimatedAge: Math.floor(Math.random() * 30) + 35,
            estimatedIncome: Math.floor(Math.random() * 100000) + 60000,
            likelyNeeds: ['Maintenance', 'Upgrades', 'Repairs'][Math.floor(Math.random() * 3)]
          }
        }
      ],
      marketInsights: {
        averageHomeAge: Math.floor(Math.random() * 30) + 30,
        percentNeedingWork: Math.floor(Math.random() * 40) + 30,
        topNeeds: ['HVAC replacement', 'Kitchen remodel', 'Bathroom update', 'Roof repair'],
        seasonalTrends: {
          peakSeason: 'Spring',
          slowSeason: 'Winter',
          currentDemand: Math.random() > 0.5 ? 'High' : 'Moderate'
        }
      },
      competitorActivity: {
        activeCompetitors: Math.floor(Math.random() * 10) + 5,
        averageResponseTime: `${Math.floor(Math.random() * 48) + 2} hours`,
        marketSaturation: Math.random() > 0.5 ? 'Moderate' : 'Low',
        pricingInsights: {
          averageJobValue: Math.floor(Math.random() * 5000) + 3000,
          priceRange: '$2,000 - $10,000'
        }
      },
      generatedAt: new Date().toISOString()
    };

    // Store in cache
    await supabase
      .from('local_market_intelligence')
      .insert({
        location,
        industry,
        data_type: 'property_opportunities',
        data_payload: propertyData,
        source: 'property_scraper',
        relevance_score: 0.85,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      });

    console.log('[PROPERTY-DATA] Data generated and cached');

    return new Response(
      JSON.stringify({ data: propertyData, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[PROPERTY-DATA] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
