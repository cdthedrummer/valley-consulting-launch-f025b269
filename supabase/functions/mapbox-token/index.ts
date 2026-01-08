import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     '0.0.0.0';

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting: 100 requests per hour per IP
    const { data: allowed } = await supabase.rpc('check_rate_limit_with_security', {
      _ip_address: clientIp,
      _endpoint: 'mapbox-token',
      _max_requests: 100,
      _window_minutes: 60
    });

    if (!allowed) {
      console.log(`[MAPBOX] Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          }
        }
      );
    }

    // Prefer secure key if available, fall back to public token
    const secureToken = Deno.env.get('MAPBOXHVCG_KEY');
    const publicToken = Deno.env.get('MAPBOX_PUBLIC_API');
    const mapboxToken = secureToken || publicToken;
    
    if (!mapboxToken) {
      console.error('[MAPBOX] API key not configured');
      return new Response(
        JSON.stringify({ error: 'Service not configured' }),
        { 
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json' 
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ token: mapboxToken }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('[MAPBOX] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to get Mapbox token' }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    )
  }
})
