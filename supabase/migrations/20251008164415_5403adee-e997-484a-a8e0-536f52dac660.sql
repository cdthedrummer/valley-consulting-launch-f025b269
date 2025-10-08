-- Create business_profiles table to store enhanced company information
CREATE TABLE IF NOT EXISTS public.business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic business info
  business_name TEXT,
  website_url TEXT,
  years_in_business INTEGER,
  service_radius INTEGER, -- in miles
  
  -- Auto-enriched data
  business_description TEXT,
  services_offered TEXT[],
  keywords TEXT[],
  target_audience TEXT,
  
  -- Metadata
  enrichment_status TEXT DEFAULT 'pending', -- pending, enriching, completed, failed
  last_enriched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own business profile
CREATE POLICY "Users can view their own business profile"
  ON public.business_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own business profile
CREATE POLICY "Users can insert their own business profile"
  ON public.business_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own business profile
CREATE POLICY "Users can update their own business profile"
  ON public.business_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_business_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_business_profiles_updated_at
  BEFORE UPDATE ON public.business_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_business_profiles_updated_at();