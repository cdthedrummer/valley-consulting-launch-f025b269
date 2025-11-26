-- Add new columns to business_profiles for Phase 1
ALTER TABLE business_profiles
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS competitor_urls TEXT[],
ADD COLUMN IF NOT EXISTS service_gaps TEXT[],
ADD COLUMN IF NOT EXISTS marketing_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS scraped_data JSONB DEFAULT '{}'::jsonb;

-- Create competitor_profiles table
CREATE TABLE IF NOT EXISTS competitor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_profile_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  competitor_name TEXT NOT NULL,
  competitor_url TEXT,
  services_offered TEXT[],
  pricing_hints TEXT,
  strengths TEXT[],
  weaknesses TEXT[],
  scraped_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create quiz_responses table for lead tracking
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  website_url TEXT NOT NULL,
  phone_number TEXT,
  business_name TEXT,
  industry TEXT,
  location TEXT,
  primary_services TEXT[],
  marketing_challenge TEXT,
  urgency_level TEXT,
  is_subscribed BOOLEAN DEFAULT false,
  scraped_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE competitor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- RLS policies for competitor_profiles
CREATE POLICY "Users can view competitors for their business profiles"
  ON competitor_profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM business_profiles
    WHERE business_profiles.id = competitor_profiles.business_profile_id
    AND business_profiles.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert competitors for their business profiles"
  ON competitor_profiles FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM business_profiles
    WHERE business_profiles.id = competitor_profiles.business_profile_id
    AND business_profiles.user_id = auth.uid()
  ));

-- RLS policies for quiz_responses
CREATE POLICY "Users can view their own quiz responses"
  ON quiz_responses FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert quiz responses"
  ON quiz_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own quiz responses"
  ON quiz_responses FOR UPDATE
  USING (auth.uid() = user_id);

-- Add updated_at trigger for new tables
CREATE TRIGGER update_competitor_profiles_updated_at
  BEFORE UPDATE ON competitor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_responses_updated_at
  BEFORE UPDATE ON quiz_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();