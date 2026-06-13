
ALTER TABLE public.business_profiles
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS industry text,
  ADD COLUMN IF NOT EXISTS marketing_goal text,
  ADD COLUMN IF NOT EXISTS monthly_budget text,
  ADD COLUMN IF NOT EXISTS ideal_customers text;

CREATE TABLE public.competitor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_profile_id uuid NOT NULL REFERENCES public.business_profiles(id) ON DELETE CASCADE,
  competitor_name text NOT NULL,
  competitor_url text,
  services_offered text[],
  pricing_hints text,
  strengths text[],
  weaknesses text[],
  scraped_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.competitor_profiles TO authenticated;
GRANT ALL ON public.competitor_profiles TO service_role;
ALTER TABLE public.competitor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own competitor profiles" ON public.competitor_profiles FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.business_profiles b WHERE b.id = business_profile_id AND b.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.business_profiles b WHERE b.id = business_profile_id AND b.user_id = auth.uid()));
CREATE TRIGGER update_competitor_profiles_updated_at BEFORE UPDATE ON public.competitor_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'New chat',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_sessions TO authenticated;
GRANT ALL ON public.chat_sessions TO service_role;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own chat sessions" ON public.chat_sessions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON public.chat_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own chat messages" ON public.chat_messages FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.chat_sessions s WHERE s.id = session_id AND s.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.chat_sessions s WHERE s.id = session_id AND s.user_id = auth.uid()));

CREATE TABLE public.quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  website_url text NOT NULL,
  phone_number text,
  business_name text,
  industry text,
  location text,
  primary_services text[],
  marketing_challenge text,
  urgency_level text,
  is_subscribed boolean DEFAULT false,
  scraped_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
GRANT INSERT ON public.quiz_responses TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.quiz_responses TO authenticated;
GRANT ALL ON public.quiz_responses TO service_role;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit quiz responses" ON public.quiz_responses FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Users view own quiz responses" ON public.quiz_responses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_quiz_responses_updated_at BEFORE UPDATE ON public.quiz_responses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
