
export type ContactSubmission = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
  created_at?: string;
  status?: string;
};

export type Appointment = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: string;
  appointment_date?: string;
  status?: string;
  notes?: string;
  created_at?: string;
};

export type Testimonial = {
  id?: string;
  name: string;
  company: string;
  service: string;
  rating: number;
  testimonial: string;
  email?: string;
  image_url?: string;
  is_approved?: boolean;
  created_at?: string;
  is_human_verified?: boolean;
};

export type Profile = {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
};

export type ChatSession = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
};

export type SubscriptionStatus = {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_status?: 'active' | 'trialing' | 'canceled' | 'inactive' | 'incomplete' | 'past_due';
  subscription_end?: string;
  trial_end?: string;
  is_canceled?: boolean;
  is_trial_active?: boolean;
  days_remaining?: number;
};
