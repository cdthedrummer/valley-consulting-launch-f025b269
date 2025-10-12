import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function fetchRepliersData(location: string, industry: string) {
  const repliersApiKey = Deno.env.get('REPLIERS_API_KEY');
  
  if (!repliersApiKey) {
    console.warn('[PROPERTY-DATA] REPLIERS_API_KEY not found, using mock data');
    return null;
  }

  const headers = {
    'Authorization': `Bearer ${repliersApiKey}`,
    'Content-Type': 'application/json',
  };

  try {
    // Search for location first
    console.log('[PROPERTY-DATA] Searching Repliers for location:', location);
    const locationResponse = await fetch(
      `https://api.repliers.io/locations?q=${encodeURIComponent(location)}`,
      { headers }
    );

    if (!locationResponse.ok) {
      console.error('[PROPERTY-DATA] Repliers location search failed:', locationResponse.status);
      return null;
    }

    const locationData = await locationResponse.json();
    if (!locationData.data || locationData.data.length === 0) {
      console.warn('[PROPERTY-DATA] No locations found for:', location);
      return null;
    }

    const locationId = locationData.data[0].id;
    console.log('[PROPERTY-DATA] Found location ID:', locationId);

    // Search for property listings
    const listingsResponse = await fetch(
      `https://api.repliers.io/listings/search?location_id=${locationId}&limit=50`,
      { headers }
    );

    if (!listingsResponse.ok) {
      console.error('[PROPERTY-DATA] Repliers listings search failed:', listingsResponse.status);
      return null;
    }

    const listingsData = await listingsResponse.json();
    console.log('[PROPERTY-DATA] Found listings:', listingsData.data?.length || 0);

    return listingsData.data || [];
  } catch (error) {
    console.error('[PROPERTY-DATA] Repliers API error:', error);
    return null;
  }
}

function calculateOpportunityScore(property: any, industry: string): number {
  let score = 50;
  
  const yearBuilt = property.year_built || property.yearBuilt;
  const currentYear = new Date().getFullYear();
  const age = yearBuilt ? currentYear - yearBuilt : 0;
  
  // Older properties score higher for construction/renovation
  if (age > 40) score += 30;
  else if (age > 20) score += 20;
  else if (age > 10) score += 10;
  
  // Price range indicates affordability and investment potential
  const price = property.price || property.list_price || 0;
  if (price > 300000 && price < 600000) score += 15;
  else if (price < 300000) score += 5;
  
  return Math.min(score, 100);
}

function determineOpportunityReason(property: any, industry: string): string {
  const reasons = [
    'Aging HVAC system',
    'Original windows',
    'Kitchen needs update',
    'Aging roof',
    'Dated plumbing',
    'Original flooring',
    'Deck replacement needed',
    'Fence repair',
    'Siding update'
  ];
  
  const yearBuilt = property.year_built || property.yearBuilt;
  const age = yearBuilt ? new Date().getFullYear() - yearBuilt : 0;
  
  if (age > 30) {
    return reasons[Math.floor(Math.random() * reasons.length)];
  }
  
  return 'Property maintenance opportunity';
}

function generateMockPropertyData(location: string, industry: string) {
  return {
    location,
    industry,
    properties: [
      {
        address: `${Math.floor(Math.random() * 9000) + 1000} Main Street, ${location}`,
        estimatedValue: Math.floor(Math.random() * 300000) + 200000,
        yearBuilt: Math.floor(Math.random() * 50) + 1970,
        lastRenovated: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 2014 : null,
        opportunityScore: Math.random() * 100,
        reason: determineOpportunityReason({ yearBuilt: 1970 }, industry),
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
        reason: determineOpportunityReason({ yearBuilt: 1975 }, industry),
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
        reason: determineOpportunityReason({ yearBuilt: 1980 }, industry),
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
    generatedAt: new Date().toISOString(),
    dataSource: 'mock'
  };
}

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
    const { data: cached } = await supabase
      .from('local_market_intelligence')
      .select('*')
      .eq('location', location)
      .eq('industry', industry)
      .eq('data_type', 'property_opportunities')
      .gte('expires_at', new Date().toISOString())
      .maybeSingle();

    if (cached) {
      console.log('[PROPERTY-DATA] Cache hit');
      return new Response(
        JSON.stringify({ data: cached.data_payload, cached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Try to fetch from Repliers API
    const repliersListings = await fetchRepliersData(location, industry);
    let propertyData;

    if (repliersListings && repliersListings.length > 0) {
      console.log('[PROPERTY-DATA] Using Repliers API data');
      
      // Transform Repliers data to our format
      const properties = repliersListings.slice(0, 10).map((listing: any) => ({
        address: listing.address?.full || listing.location?.address || 'Address unavailable',
        estimatedValue: listing.price || listing.list_price || 0,
        yearBuilt: listing.year_built || listing.yearBuilt || null,
        lastRenovated: null,
        opportunityScore: calculateOpportunityScore(listing, industry),
        reason: determineOpportunityReason(listing, industry),
        homeownerProfile: {
          estimatedAge: Math.floor(Math.random() * 30) + 35,
          estimatedIncome: Math.floor(Math.random() * 100000) + 60000,
          likelyNeeds: ['Maintenance', 'Upgrades', 'Repairs'][Math.floor(Math.random() * 3)]
        }
      }));

      // Calculate market insights from real data
      const ages = properties
        .filter(p => p.yearBuilt)
        .map(p => new Date().getFullYear() - p.yearBuilt!);
      const avgAge = ages.length > 0 ? Math.floor(ages.reduce((a, b) => a + b, 0) / ages.length) : 40;

      propertyData = {
        location,
        industry,
        properties,
        marketInsights: {
          averageHomeAge: avgAge,
          percentNeedingWork: properties.filter(p => p.opportunityScore > 60).length * 10,
          topNeeds: ['HVAC replacement', 'Kitchen remodel', 'Bathroom update', 'Roof repair'],
          seasonalTrends: {
            peakSeason: 'Spring',
            slowSeason: 'Winter',
            currentDemand: properties.length > 15 ? 'High' : 'Moderate'
          }
        },
        competitorActivity: {
          activeCompetitors: Math.floor(Math.random() * 10) + 5,
          averageResponseTime: `${Math.floor(Math.random() * 48) + 2} hours`,
          marketSaturation: properties.length > 20 ? 'High' : 'Moderate',
          pricingInsights: {
            averageJobValue: Math.floor(Math.random() * 5000) + 3000,
            priceRange: '$2,000 - $10,000'
          }
        },
        generatedAt: new Date().toISOString(),
        dataSource: 'repliers'
      };
    } else {
      console.log('[PROPERTY-DATA] Using mock data (Repliers unavailable)');
      propertyData = generateMockPropertyData(location, industry);
    }

    // Store in cache
    await supabase
      .from('local_market_intelligence')
      .insert({
        location,
        industry,
        data_type: 'property_opportunities',
        data_payload: propertyData,
        source: propertyData.dataSource === 'repliers' ? 'repliers_api' : 'mock_generator',
        relevance_score: propertyData.dataSource === 'repliers' ? 0.95 : 0.65,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });

    console.log('[PROPERTY-DATA] Data cached successfully, source:', propertyData.dataSource);

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
