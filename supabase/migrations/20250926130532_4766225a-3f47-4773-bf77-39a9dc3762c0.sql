-- Create table to cache API responses and reduce external API calls
CREATE TABLE IF NOT EXISTS public.market_data_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on cache table
ALTER TABLE public.market_data_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for cache access (allow authenticated users to read/write their cached data)
CREATE POLICY "Users can access market data cache" ON public.market_data_cache
FOR ALL USING (true);

-- Create index for efficient cache lookups
CREATE INDEX IF NOT EXISTS idx_market_data_cache_key ON public.market_data_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_market_data_cache_expires ON public.market_data_cache(expires_at);

-- Create function to clean up expired cache entries
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.market_data_cache 
  WHERE expires_at < now();
END;
$$;