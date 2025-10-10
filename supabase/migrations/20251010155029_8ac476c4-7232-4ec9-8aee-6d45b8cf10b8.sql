-- Create chat_signals table to extract actionable intelligence from conversations
CREATE TABLE public.chat_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  signal_type TEXT NOT NULL, -- 'pain_point', 'service_interest', 'location_mention', 'budget_hint', 'competitor_mention', 'seasonal_pattern', 'urgency'
  signal_value TEXT NOT NULL,
  confidence_score DECIMAL(3,2) DEFAULT 0.85, -- AI confidence in extraction
  context TEXT, -- surrounding conversation context
  extracted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_chat_signals_user_id ON public.chat_signals(user_id);
CREATE INDEX idx_chat_signals_session_id ON public.chat_signals(session_id);
CREATE INDEX idx_chat_signals_type ON public.chat_signals(signal_type);
CREATE INDEX idx_chat_signals_extracted_at ON public.chat_signals(extracted_at DESC);

-- Create campaigns table to track marketing actions taken
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_name TEXT NOT NULL,
  campaign_type TEXT NOT NULL, -- 'google_ads', 'facebook_ads', 'email', 'seo', 'direct_mail', 'other'
  status TEXT DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed'
  target_location TEXT,
  target_service TEXT,
  budget_allocated DECIMAL(10,2),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  source_chat_session_id UUID REFERENCES public.chat_sessions(id),
  plan_content JSONB, -- Store the marketing plan that generated this campaign
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_campaigns_user_id ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_campaigns_start_date ON public.campaigns(start_date DESC);

-- Create campaign_metrics table to track performance
CREATE TABLE public.campaign_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  spend DECIMAL(10,2) DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  calls_received INTEGER DEFAULT 0,
  forms_submitted INTEGER DEFAULT 0,
  metric_source TEXT, -- 'google_ads', 'manual', 'call_tracking', 'form_tracking'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, metric_date, metric_source)
);

CREATE INDEX idx_campaign_metrics_campaign_id ON public.campaign_metrics(campaign_id);
CREATE INDEX idx_campaign_metrics_date ON public.campaign_metrics(metric_date DESC);

-- Create user_intelligence_profile table for AI-powered personalization
CREATE TABLE public.user_intelligence_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  primary_pain_points TEXT[], -- Top 3-5 recurring pain points
  service_focus TEXT[], -- Services they talk about most
  target_locations TEXT[], -- Locations they're targeting
  typical_budget_range TEXT, -- 'under_1k', '1k_5k', '5k_10k', '10k_plus'
  preferred_channels TEXT[], -- 'google_ads', 'seo', 'social', 'email'
  urgency_level TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  experience_level TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  conversation_count INTEGER DEFAULT 0,
  last_active_at TIMESTAMP WITH TIME ZONE,
  insights JSONB DEFAULT '{}', -- Additional AI-generated insights
  recommendations JSONB DEFAULT '{}', -- Personalized recommendations
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_intelligence_user_id ON public.user_intelligence_profile(user_id);

-- Create local_market_intelligence table for property and competitor data
CREATE TABLE public.local_market_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL, -- ZIP code or county
  industry TEXT NOT NULL,
  data_type TEXT NOT NULL, -- 'property_sale', 'building_permit', 'competitor_activity', 'market_trend'
  data_payload JSONB NOT NULL,
  relevance_score DECIMAL(3,2) DEFAULT 0.75,
  source TEXT, -- 'zillow_api', 'permit_api', 'google_places', 'manual'
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 days',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_local_market_location ON public.local_market_intelligence(location);
CREATE INDEX idx_local_market_industry ON public.local_market_intelligence(industry);
CREATE INDEX idx_local_market_type ON public.local_market_intelligence(data_type);
CREATE INDEX idx_local_market_expires ON public.local_market_intelligence(expires_at);

-- Enable RLS
ALTER TABLE public.chat_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_intelligence_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_market_intelligence ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_signals
CREATE POLICY "Users can view their own chat signals"
  ON public.chat_signals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert chat signals"
  ON public.chat_signals FOR INSERT
  WITH CHECK (true);

-- RLS Policies for campaigns
CREATE POLICY "Users can view their own campaigns"
  ON public.campaigns FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own campaigns"
  ON public.campaigns FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns"
  ON public.campaigns FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for campaign_metrics
CREATE POLICY "Users can view metrics for their campaigns"
  ON public.campaign_metrics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = campaign_metrics.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert metrics for their campaigns"
  ON public.campaign_metrics FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = campaign_metrics.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- RLS Policies for user_intelligence_profile
CREATE POLICY "Users can view their own intelligence profile"
  ON public.user_intelligence_profile FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own intelligence profile"
  ON public.user_intelligence_profile FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own intelligence profile"
  ON public.user_intelligence_profile FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for local_market_intelligence
CREATE POLICY "Users can view local market intelligence"
  ON public.local_market_intelligence FOR SELECT
  USING (true);

CREATE POLICY "System can manage local market intelligence"
  ON public.local_market_intelligence FOR ALL
  USING (true);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON public.campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_intelligence_updated_at
    BEFORE UPDATE ON public.user_intelligence_profile
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();