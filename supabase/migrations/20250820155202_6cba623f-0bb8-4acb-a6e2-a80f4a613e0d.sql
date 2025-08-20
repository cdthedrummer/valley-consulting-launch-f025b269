-- Add discount usage tracking to subscribers table
ALTER TABLE public.subscribers 
ADD COLUMN discount_codes_used TEXT[] DEFAULT '{}',
ADD COLUMN subscription_status TEXT,
ADD COLUMN trial_end TIMESTAMPTZ,
ADD COLUMN is_canceled BOOLEAN DEFAULT false;

-- Update existing records to have proper status
UPDATE public.subscribers 
SET subscription_status = CASE 
  WHEN subscribed = true THEN 'active'
  ELSE 'inactive'
END;

-- Create index for performance
CREATE INDEX idx_subscribers_status ON public.subscribers(subscription_status);
CREATE INDEX idx_subscribers_trial_end ON public.subscribers(trial_end);