-- Phase 1: Critical Security Fixes

-- ============================================
-- 1. Fix RLS Policies for Data Exposure
-- ============================================

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can submit appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow insert for new subscribers" ON public.subscribers;

-- appointments: Only allow inserts, no public reads
CREATE POLICY "Allow anonymous appointment submissions"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- contact_submissions: Only allow inserts, no public reads
CREATE POLICY "Allow anonymous contact submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- testimonials: Only allow inserts, public reads only for approved
CREATE POLICY "Allow anonymous testimonial submissions"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- subscribers: Restrict to service role only for inserts
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.subscribers;

CREATE POLICY "Service role can insert subscribers"
ON public.subscribers
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Users can view own subscription by user_id or email"
ON public.subscribers
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Users can update own subscription by user_id or email"
ON public.subscribers
FOR UPDATE
TO authenticated
USING (user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- ============================================
-- 2. Restrict market_data_cache and local_market_intelligence
-- ============================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Users can access market data cache" ON public.market_data_cache;
DROP POLICY IF EXISTS "System can manage local market intelligence" ON public.local_market_intelligence;
DROP POLICY IF EXISTS "Users can view local market intelligence" ON public.local_market_intelligence;

-- market_data_cache: Admin and service role only
CREATE POLICY "Admin and service role can manage market cache"
ON public.market_data_cache
FOR ALL
TO authenticated, service_role
USING (is_admin() OR auth.role() = 'service_role');

-- local_market_intelligence: Authenticated users can read, service role can manage
CREATE POLICY "Authenticated users can view market intelligence"
ON public.local_market_intelligence
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Service role can manage market intelligence"
ON public.local_market_intelligence
FOR ALL
TO service_role
USING (true);

-- ============================================
-- 3. Set search_path on all functions (security best practice)
-- ============================================

-- Update existing functions to have explicit search_path
CREATE OR REPLACE FUNCTION public.check_rate_limit(_ip_address inet, _endpoint text, _max_requests integer DEFAULT 10, _window_minutes integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_count INTEGER;
    window_start_time TIMESTAMP WITH TIME ZONE;
BEGIN
    DELETE FROM public.rate_limits 
    WHERE window_start < now() - INTERVAL '1 hour';
    
    SELECT request_count, window_start 
    INTO current_count, window_start_time
    FROM public.rate_limits 
    WHERE ip_address = _ip_address AND endpoint = _endpoint;
    
    IF current_count IS NULL THEN
        INSERT INTO public.rate_limits (ip_address, endpoint, request_count, window_start)
        VALUES (_ip_address, _endpoint, 1, now());
        RETURN true;
    END IF;
    
    IF window_start_time < now() - (_window_minutes || ' minutes')::INTERVAL THEN
        UPDATE public.rate_limits 
        SET request_count = 1, window_start = now()
        WHERE ip_address = _ip_address AND endpoint = _endpoint;
        RETURN true;
    END IF;
    
    IF current_count < _max_requests THEN
        UPDATE public.rate_limits 
        SET request_count = request_count + 1
        WHERE ip_address = _ip_address AND endpoint = _endpoint;
        RETURN true;
    END IF;
    
    RETURN false;
END;
$$;

CREATE OR REPLACE FUNCTION public.anonymize_old_customer_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.contact_submissions 
    SET 
        name = 'Anonymous User',
        email = 'anonymized@example.com',
        phone = NULL,
        company = NULL
    WHERE created_at < now() - INTERVAL '90 days'
    AND name != 'Anonymous User';
    
    UPDATE public.appointments 
    SET 
        name = 'Anonymous User',
        email = 'anonymized@example.com',
        phone = NULL,
        company = NULL
    WHERE created_at < now() - INTERVAL '90 days'
    AND name != 'Anonymous User';
    
    INSERT INTO public.audit_logs (
        user_id, 
        table_name, 
        operation, 
        new_data
    ) VALUES (
        NULL, 
        'data_retention', 
        'UPDATE', 
        jsonb_build_object('action', 'anonymized_old_data', 'timestamp', now())
    );
END;
$$;

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