-- Add advanced marketing context fields to business_profiles table
ALTER TABLE public.business_profiles 
ADD COLUMN IF NOT EXISTS marketing_goal TEXT,
ADD COLUMN IF NOT EXISTS monthly_budget TEXT,
ADD COLUMN IF NOT EXISTS ideal_customers TEXT;

COMMENT ON COLUMN public.business_profiles.marketing_goal IS 'Primary marketing goal (e.g., lead generation, brand awareness)';
COMMENT ON COLUMN public.business_profiles.monthly_budget IS 'Approximate monthly marketing budget';
COMMENT ON COLUMN public.business_profiles.ideal_customers IS 'Description of target customer profile';