
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin'::app_role)
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Public form tables
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_interest text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (public.is_admin());

CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_type text NOT NULL,
  appointment_date timestamptz,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.appointments TO anon, authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit appointments" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view appointments" ON public.appointments FOR SELECT TO authenticated USING (public.is_admin());

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  service text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  testimonial text NOT NULL,
  email text,
  image_url text,
  is_approved boolean DEFAULT false,
  is_human_verified boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.testimonials TO anon, authenticated;
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit testimonials" ON public.testimonials FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can view approved testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (is_approved = true OR public.is_admin());
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- CTA tracking
CREATE TABLE public.cta_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cta_type text NOT NULL,
  cta_label text NOT NULL,
  destination text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  timestamp timestamptz NOT NULL DEFAULT now(),
  user_agent text,
  page_url text,
  referrer text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.cta_clicks TO anon, authenticated;
GRANT ALL ON public.cta_clicks TO service_role;
ALTER TABLE public.cta_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record cta clicks" ON public.cta_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view cta clicks" ON public.cta_clicks FOR SELECT TO authenticated USING (public.is_admin());

-- Business profiles
CREATE TABLE public.business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text,
  website_url text,
  years_in_business integer,
  service_radius integer,
  business_description text,
  services_offered text[],
  keywords text[],
  target_audience text,
  enrichment_status text DEFAULT 'pending',
  last_enriched_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_profiles TO authenticated;
GRANT ALL ON public.business_profiles TO service_role;
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own business profile" ON public.business_profiles FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_business_profiles_updated_at BEFORE UPDATE ON public.business_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Chat signals
CREATE TABLE public.chat_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id uuid,
  signal_type text NOT NULL,
  signal_value text NOT NULL,
  confidence_score numeric(3,2) DEFAULT 0.85,
  context text,
  extracted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_signals TO authenticated;
GRANT ALL ON public.chat_signals TO service_role;
ALTER TABLE public.chat_signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own chat signals" ON public.chat_signals FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Campaigns
CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  campaign_type text NOT NULL,
  status text DEFAULT 'draft',
  target_location text,
  target_service text,
  budget_allocated numeric(10,2),
  start_date timestamptz,
  end_date timestamptz,
  source_chat_session_id uuid,
  plan_content jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaigns TO authenticated;
GRANT ALL ON public.campaigns TO service_role;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own campaigns" ON public.campaigns FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Campaign metrics
CREATE TABLE public.campaign_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  metric_date date NOT NULL,
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  conversions integer DEFAULT 0,
  spend numeric(10,2) DEFAULT 0,
  revenue numeric(10,2) DEFAULT 0,
  calls_received integer DEFAULT 0,
  forms_submitted integer DEFAULT 0,
  metric_source text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(campaign_id, metric_date, metric_source)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaign_metrics TO authenticated;
GRANT ALL ON public.campaign_metrics TO service_role;
ALTER TABLE public.campaign_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own campaign metrics" ON public.campaign_metrics FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.campaigns c WHERE c.id = campaign_id AND c.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.campaigns c WHERE c.id = campaign_id AND c.user_id = auth.uid()));

-- User intelligence profile
CREATE TABLE public.user_intelligence_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  primary_pain_points text[],
  service_focus text[],
  target_locations text[],
  typical_budget_range text,
  preferred_channels text[],
  urgency_level text DEFAULT 'medium',
  experience_level text DEFAULT 'beginner',
  conversation_count integer DEFAULT 0,
  last_active_at timestamptz,
  insights jsonb DEFAULT '{}',
  recommendations jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_intelligence_profile TO authenticated;
GRANT ALL ON public.user_intelligence_profile TO service_role;
ALTER TABLE public.user_intelligence_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own intelligence profile" ON public.user_intelligence_profile FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_user_intelligence_updated_at BEFORE UPDATE ON public.user_intelligence_profile FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Local market intelligence
CREATE TABLE public.local_market_intelligence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  industry text NOT NULL,
  data_type text NOT NULL,
  data_payload jsonb NOT NULL,
  relevance_score numeric(3,2) DEFAULT 0.75,
  source text,
  collected_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT now() + INTERVAL '30 days',
  created_at timestamptz DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.local_market_intelligence TO authenticated;
GRANT ALL ON public.local_market_intelligence TO service_role;
ALTER TABLE public.local_market_intelligence ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view market intelligence" ON public.local_market_intelligence FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage market intelligence" ON public.local_market_intelligence FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
