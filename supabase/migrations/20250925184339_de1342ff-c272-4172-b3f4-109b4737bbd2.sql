-- Create CTA clicks tracking table
CREATE TABLE public.cta_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cta_type TEXT NOT NULL,
  cta_label TEXT NOT NULL,
  destination TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  page_url TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cta_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for CTA clicks tracking
CREATE POLICY "Allow anonymous CTA tracking" 
ON public.cta_clicks 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own CTA clicks" 
ON public.cta_clicks 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all CTA clicks" 
ON public.cta_clicks 
FOR SELECT 
USING (is_admin());

-- Add index for performance
CREATE INDEX idx_cta_clicks_user_id ON public.cta_clicks(user_id);
CREATE INDEX idx_cta_clicks_timestamp ON public.cta_clicks(timestamp);
CREATE INDEX idx_cta_clicks_type ON public.cta_clicks(cta_type);