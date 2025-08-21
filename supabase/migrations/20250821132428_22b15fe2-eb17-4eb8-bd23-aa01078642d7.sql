-- Phase 1 & 2: Fix Critical RLS and Admin Access Controls
-- Fix zillow_cache RLS policy to use proper admin check instead of overly permissive 'true'
DROP POLICY IF EXISTS "Admin access to zillow cache" ON public.zillow_cache;
CREATE POLICY "Admin access to zillow cache" 
ON public.zillow_cache 
FOR ALL 
TO authenticated 
USING (is_admin());

-- Phase 3: Database Security Hardening - Fix search_path for all functions
-- Update has_role function with proper search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- Update is_admin function with proper search_path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $function$
  SELECT public.has_role(auth.uid(), 'admin'::app_role)
$function$;

-- Update search_web_for_property_data function with proper search_path
CREATE OR REPLACE FUNCTION public.search_web_for_property_data(location text, query_type text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
    result JSON;
BEGIN
    -- This is a placeholder function that would integrate with real estate APIs
    -- For now, it returns mock data to demonstrate the structure
    
    IF query_type = 'home_sales' THEN
        result := JSON_BUILD_OBJECT(
            'location', location,
            'total_sales_last_quarter', 37,
            'properties', JSON_BUILD_ARRAY(
                JSON_BUILD_OBJECT(
                    'address', '123 Main St',
                    'sale_price', 450000,
                    'sale_date', '2024-01-15',
                    'year_built', 1965,
                    'bedrooms', 3,
                    'bathrooms', 2,
                    'renovation_potential', 'high'
                ),
                JSON_BUILD_OBJECT(
                    'address', '456 Oak Ave',
                    'sale_price', 520000,
                    'sale_date', '2024-02-03',
                    'year_built', 1978,
                    'bedrooms', 4,
                    'bathrooms', 2,
                    'renovation_potential', 'medium'
                )
            ),
            'insights', JSON_BUILD_OBJECT(
                'pre_1970_homes', 12,
                'unrenovated_potential', 8,
                'average_price', 485000,
                'market_trend', 'stable'
            )
        );
    ELSIF query_type = 'demographics' THEN
        result := JSON_BUILD_OBJECT(
            'location', location,
            'total_households', 2847,
            'median_income', 89500,
            'avg_home_value', 475000,
            'age_groups', JSON_BUILD_OBJECT(
                '25_34', 18,
                '35_44', 25,
                '45_54', 22,
                '55_64', 20,
                '65_plus', 15
            ),
            'home_ownership_rate', 78
        );
    ELSE
        result := JSON_BUILD_OBJECT('error', 'Unknown query type');
    END IF;
    
    RETURN result;
END;
$function$;

-- Update handle_new_user function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$function$;

-- Phase 4: Add audit logging table for security monitoring
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE', 'SELECT')),
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
TO authenticated 
USING (is_admin());

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" 
ON public.audit_logs 
FOR INSERT 
WITH CHECK (true);

-- Phase 4: Add data retention and security policies
-- Add email field to testimonials table to track PII (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'testimonials' 
        AND column_name = 'email' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.testimonials ADD COLUMN email TEXT;
    END IF;
END $$;

-- Create function to anonymize old customer data (90+ days old)
CREATE OR REPLACE FUNCTION public.anonymize_old_customer_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
    -- Anonymize old contact submissions (90+ days)
    UPDATE public.contact_submissions 
    SET 
        name = 'Anonymous User',
        email = 'anonymized@example.com',
        phone = NULL,
        company = NULL
    WHERE created_at < now() - INTERVAL '90 days'
    AND name != 'Anonymous User';
    
    -- Anonymize old appointments (90+ days)
    UPDATE public.appointments 
    SET 
        name = 'Anonymous User',
        email = 'anonymized@example.com',
        phone = NULL,
        company = NULL
    WHERE created_at < now() - INTERVAL '90 days'
    AND name != 'Anonymous User';
    
    -- Log the anonymization
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
$function$;

-- Phase 4: Add rate limiting table for form submissions
CREATE TABLE IF NOT EXISTS public.rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address INET NOT NULL,
    endpoint TEXT NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(ip_address, endpoint)
);

-- Enable RLS on rate limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only system can access rate limits
CREATE POLICY "System access to rate limits" 
ON public.rate_limits 
FOR ALL 
WITH CHECK (true);

-- Create function to check rate limits
CREATE OR REPLACE FUNCTION public.check_rate_limit(
    _ip_address INET,
    _endpoint TEXT,
    _max_requests INTEGER DEFAULT 10,
    _window_minutes INTEGER DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
    current_count INTEGER;
    window_start_time TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Clean up old rate limit entries
    DELETE FROM public.rate_limits 
    WHERE window_start < now() - INTERVAL '1 hour';
    
    -- Get current count for this IP and endpoint
    SELECT request_count, window_start 
    INTO current_count, window_start_time
    FROM public.rate_limits 
    WHERE ip_address = _ip_address AND endpoint = _endpoint;
    
    -- If no record exists, create one
    IF current_count IS NULL THEN
        INSERT INTO public.rate_limits (ip_address, endpoint, request_count, window_start)
        VALUES (_ip_address, _endpoint, 1, now());
        RETURN true;
    END IF;
    
    -- If window has expired, reset count
    IF window_start_time < now() - (_window_minutes || ' minutes')::INTERVAL THEN
        UPDATE public.rate_limits 
        SET request_count = 1, window_start = now()
        WHERE ip_address = _ip_address AND endpoint = _endpoint;
        RETURN true;
    END IF;
    
    -- If under limit, increment and allow
    IF current_count < _max_requests THEN
        UPDATE public.rate_limits 
        SET request_count = request_count + 1
        WHERE ip_address = _ip_address AND endpoint = _endpoint;
        RETURN true;
    END IF;
    
    -- Rate limit exceeded
    RETURN false;
END;
$function$;