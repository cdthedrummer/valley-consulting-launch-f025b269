-- Add location and industry columns to business_profiles table
ALTER TABLE public.business_profiles 
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS industry TEXT;