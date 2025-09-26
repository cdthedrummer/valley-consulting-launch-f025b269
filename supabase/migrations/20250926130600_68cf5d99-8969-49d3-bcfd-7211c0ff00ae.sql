-- Fix security warning: Set search_path for the cleanup function
CREATE OR REPLACE FUNCTION public.cleanup_expired_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.market_data_cache 
  WHERE expires_at < now();
END;
$$;