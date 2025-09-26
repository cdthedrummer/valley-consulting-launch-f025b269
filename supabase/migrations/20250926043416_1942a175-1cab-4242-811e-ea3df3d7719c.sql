-- Security Enhancement: Add stricter rate limiting policies
-- Update existing rate limit function to be more strict for different endpoints

-- Add new security audit logging table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.security_incidents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    incident_type TEXT NOT NULL,
    description TEXT,
    ip_address INET,
    user_agent TEXT,
    endpoint TEXT,
    severity TEXT DEFAULT 'low',
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on security incidents
ALTER TABLE public.security_incidents ENABLE ROW LEVEL SECURITY;

-- Only admins can view security incidents
CREATE POLICY "Only admins can view security incidents" 
ON public.security_incidents 
FOR SELECT 
USING (public.is_admin());

-- Create index for faster security incident queries
CREATE INDEX IF NOT EXISTS idx_security_incidents_created_at ON public.security_incidents(created_at);
CREATE INDEX IF NOT EXISTS idx_security_incidents_severity ON public.security_incidents(severity);
CREATE INDEX IF NOT EXISTS idx_security_incidents_resolved ON public.security_incidents(resolved);

-- Enhanced rate limiting function with incident logging
CREATE OR REPLACE FUNCTION public.check_rate_limit_with_security(
    _ip_address inet, 
    _endpoint text, 
    _max_requests integer DEFAULT 10, 
    _window_minutes integer DEFAULT 60
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
    current_count INTEGER;
    window_start_time TIMESTAMP WITH TIME ZONE;
    is_rate_limited BOOLEAN DEFAULT FALSE;
BEGIN
    -- Clean up old rate limit entries
    DELETE FROM public.rate_limits 
    WHERE window_start < now() - INTERVAL '2 hours';
    
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
    
    -- Rate limit exceeded - log security incident
    INSERT INTO public.security_incidents (
        incident_type,
        description,
        ip_address,
        endpoint,
        severity
    ) VALUES (
        'RATE_LIMIT_EXCEEDED',
        'IP ' || _ip_address::text || ' exceeded rate limit for endpoint ' || _endpoint,
        _ip_address,
        _endpoint,
        CASE 
            WHEN current_count > (_max_requests * 2) THEN 'high'
            WHEN current_count > (_max_requests * 1.5) THEN 'medium'
            ELSE 'low'
        END
    );
    
    RETURN false;
END;
$$;