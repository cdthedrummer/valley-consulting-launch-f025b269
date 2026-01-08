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
    console.log('[PROPERTY-DATA] Searching Repliers for location');
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
      console.warn('[PROPERTY-DATA] No locations found');
      return null;
    }

    const locationId = locationData.data[0].id;

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
    console.error('[PROPERTY-DATA] Repliers API error');
    return null;
  }
}

// Helper function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Helper function to geocode ZIP code to coordinates
const geocodeZipCode = async (zipCode: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(zipCode)}&country=US&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'PropertyLeadsFinder/1.0'
        }
      }
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
  } catch (error) {
    console.error('Geocoding error');
  }
  return null;
};

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    // Validate authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claims, error: authError } = await authClient.auth.getClaims(token);
    
    if (authError || !claims?.claims?.sub) {
      console.error('[PROPERTY-DATA] Auth error');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { location, industry } = await req.json();
    
    // Input validation
    if (!location || typeof location !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Location is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!industry || typeof industry !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Industry is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Length validation
    if (location.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Location too long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (industry.length > 50) {
      return new Response(
        JSON.stringify({ error: 'Industry too long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[PROPERTY-DATA] Starting scrape for authenticated user');

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

    // Get coordinates for the location (if it's a ZIP code)
    let centerCoords: { lat: number; lng: number } | null = null;
    const isZipCode = /^\d{5}$/.test(location);
    
    if (isZipCode) {
      centerCoords = await geocodeZipCode(location);
    }

    // Try to fetch from Repliers API
    const repliersListings = await fetchRepliersData(location, industry);
    let propertyData;

    if (repliersListings && repliersListings.length > 0) {
      console.log('[PROPERTY-DATA] Using Repliers API data');
      
      // Transform and filter Repliers data with distance calculation
      let transformedListings = repliersListings.slice(0, 50).map((listing: any) => {
        const transformed = {
          address: listing.address?.full || listing.location?.address || 'Address unavailable',
          estimatedValue: listing.price || listing.list_price || 0,
          yearBuilt: listing.year_built || listing.yearBuilt || null,
          lastRenovated: null,
          opportunityScore: calculateOpportunityScore(listing, industry),
          reason: determineOpportunityReason(listing, industry),
          latitude: listing.latitude || listing.location?.latitude,
          longitude: listing.longitude || listing.location?.longitude,
          homeownerProfile: {
            estimatedAge: Math.floor(Math.random() * 30) + 35,
            estimatedIncome: Math.floor(Math.random() * 100000) + 60000,
            likelyNeeds: ['Maintenance', 'Upgrades', 'Repairs'][Math.floor(Math.random() * 3)]
          }
        };

        // Calculate distance if we have coordinates
        if (centerCoords && transformed.latitude && transformed.longitude) {
          (transformed as any).distance = calculateDistance(
            centerCoords.lat,
            centerCoords.lng,
            transformed.latitude,
            transformed.longitude
          );
        }

        return transformed;
      });

      // Filter by distance if we have center coordinates
      if (centerCoords && isZipCode) {
        transformedListings = transformedListings
          .filter((listing: any) => !listing.distance || listing.distance <= 15) // 15 mile radius
          .sort((a: any, b: any) => {
            if (!a.distance) return 1;
            if (!b.distance) return -1;
            return a.distance - b.distance;
          });
      }

      const properties = transformedListings.slice(0, 10);

      // Calculate market insights from real data
      const ages = properties
        .filter((p: any) => p.yearBuilt)
        .map((p: any) => new Date().getFullYear() - p.yearBuilt!);
      const avgAge = ages.length > 0 ? Math.floor(ages.reduce((a: number, b: number) => a + b, 0) / ages.length) : 40;

      propertyData = {
        location,
        industry,
        properties,
        marketInsights: {
          averageHomeAge: avgAge,
          percentNeedingWork: properties.filter((p: any) => p.opportunityScore > 60).length * 10,
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

    console.log('[PROPERTY-DATA] Data cached successfully');

    return new Response(
      JSON.stringify({ data: propertyData, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[PROPERTY-DATA] Error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
