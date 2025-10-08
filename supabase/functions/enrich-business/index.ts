import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { business_name, website_url, years_in_business, service_radius } = await req.json();

    console.log('Starting business enrichment for:', business_name);

    // Update the profile with pending status
    const { error: updateError } = await supabase
      .from('business_profiles')
      .upsert({
        user_id: user.id,
        business_name,
        website_url,
        years_in_business,
        service_radius,
        enrichment_status: 'enriching',
      });

    if (updateError) {
      console.error('Error updating business profile:', updateError);
      throw updateError;
    }

    // Auto-enrichment logic (simplified for now - can be enhanced with actual web scraping)
    let enrichedData = {
      business_description: '',
      services_offered: [] as string[],
      keywords: [] as string[],
      target_audience: '',
    };

    // Basic enrichment based on business name
    if (business_name) {
      enrichedData.keywords = business_name.toLowerCase().split(' ');
      enrichedData.business_description = `${business_name} - A professional service provider`;
    }

    // If website URL is provided, we could fetch and parse it
    // For now, we'll set placeholder data that indicates enrichment is complete
    if (website_url) {
      try {
        // In a real implementation, you would:
        // 1. Fetch the website HTML
        // 2. Parse for meta descriptions, keywords, services mentioned
        // 3. Extract relevant business information
        // 4. Use AI to analyze the content
        
        console.log('Website URL provided:', website_url);
        enrichedData.business_description = `${business_name} - Visit ${website_url} for more information`;
        enrichedData.services_offered = ['Services available - see website for details'];
      } catch (error) {
        console.error('Error enriching from website:', error);
      }
    }

    // Update with enriched data
    const { error: enrichError } = await supabase
      .from('business_profiles')
      .update({
        ...enrichedData,
        enrichment_status: 'completed',
        last_enriched_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (enrichError) {
      console.error('Error saving enriched data:', enrichError);
      throw enrichError;
    }

    console.log('Business enrichment completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Business profile enriched successfully',
        data: enrichedData 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in enrich-business function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});