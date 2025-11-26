export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_usage: {
        Row: {
          completion_tokens: number
          cost_usd: number
          created_at: string
          id: number
          model: string
          prompt_tokens: number
          total_tokens: number
          user_id: string | null
        }
        Insert: {
          completion_tokens?: number
          cost_usd?: number
          created_at?: string
          id?: number
          model?: string
          prompt_tokens?: number
          total_tokens?: number
          user_id?: string | null
        }
        Update: {
          completion_tokens?: number
          cost_usd?: number
          created_at?: string
          id?: number
          model?: string
          prompt_tokens?: number
          total_tokens?: number
          user_id?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          service_type: string
          status: string
        }
        Insert: {
          appointment_date?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          service_type: string
          status?: string
        }
        Update: {
          appointment_date?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          service_type?: string
          status?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown
          new_data: Json | null
          old_data: Json | null
          operation: string
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_profiles: {
        Row: {
          business_description: string | null
          business_name: string | null
          competitor_urls: string[] | null
          created_at: string | null
          enrichment_status: string | null
          id: string
          ideal_customers: string | null
          industry: string | null
          keywords: string[] | null
          last_enriched_at: string | null
          location: string | null
          marketing_goal: string | null
          marketing_score: number | null
          monthly_budget: string | null
          phone_number: string | null
          scraped_data: Json | null
          service_gaps: string[] | null
          service_radius: number | null
          services_offered: string[] | null
          target_audience: string | null
          updated_at: string | null
          user_id: string
          website_url: string | null
          years_in_business: number | null
        }
        Insert: {
          business_description?: string | null
          business_name?: string | null
          competitor_urls?: string[] | null
          created_at?: string | null
          enrichment_status?: string | null
          id?: string
          ideal_customers?: string | null
          industry?: string | null
          keywords?: string[] | null
          last_enriched_at?: string | null
          location?: string | null
          marketing_goal?: string | null
          marketing_score?: number | null
          monthly_budget?: string | null
          phone_number?: string | null
          scraped_data?: Json | null
          service_gaps?: string[] | null
          service_radius?: number | null
          services_offered?: string[] | null
          target_audience?: string | null
          updated_at?: string | null
          user_id: string
          website_url?: string | null
          years_in_business?: number | null
        }
        Update: {
          business_description?: string | null
          business_name?: string | null
          competitor_urls?: string[] | null
          created_at?: string | null
          enrichment_status?: string | null
          id?: string
          ideal_customers?: string | null
          industry?: string | null
          keywords?: string[] | null
          last_enriched_at?: string | null
          location?: string | null
          marketing_goal?: string | null
          marketing_score?: number | null
          monthly_budget?: string | null
          phone_number?: string | null
          scraped_data?: Json | null
          service_gaps?: string[] | null
          service_radius?: number | null
          services_offered?: string[] | null
          target_audience?: string | null
          updated_at?: string | null
          user_id?: string
          website_url?: string | null
          years_in_business?: number | null
        }
        Relationships: []
      }
      campaign_metrics: {
        Row: {
          calls_received: number | null
          campaign_id: string
          clicks: number | null
          conversions: number | null
          created_at: string | null
          forms_submitted: number | null
          id: string
          impressions: number | null
          metric_date: string
          metric_source: string | null
          revenue: number | null
          spend: number | null
        }
        Insert: {
          calls_received?: number | null
          campaign_id: string
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          forms_submitted?: number | null
          id?: string
          impressions?: number | null
          metric_date: string
          metric_source?: string | null
          revenue?: number | null
          spend?: number | null
        }
        Update: {
          calls_received?: number | null
          campaign_id?: string
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          forms_submitted?: number | null
          id?: string
          impressions?: number | null
          metric_date?: string
          metric_source?: string | null
          revenue?: number | null
          spend?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget_allocated: number | null
          campaign_name: string
          campaign_type: string
          created_at: string | null
          end_date: string | null
          id: string
          plan_content: Json | null
          source_chat_session_id: string | null
          start_date: string | null
          status: string | null
          target_location: string | null
          target_service: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget_allocated?: number | null
          campaign_name: string
          campaign_type: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_content?: Json | null
          source_chat_session_id?: string | null
          start_date?: string | null
          status?: string | null
          target_location?: string | null
          target_service?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget_allocated?: number | null
          campaign_name?: string
          campaign_type?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_content?: Json | null
          source_chat_session_id?: string | null
          start_date?: string | null
          status?: string | null
          target_location?: string | null
          target_service?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_source_chat_session_id_fkey"
            columns: ["source_chat_session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_signals: {
        Row: {
          confidence_score: number | null
          context: string | null
          created_at: string | null
          extracted_at: string | null
          id: string
          session_id: string | null
          signal_type: string
          signal_value: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          context?: string | null
          created_at?: string | null
          extracted_at?: string | null
          id?: string
          session_id?: string | null
          signal_type: string
          signal_value: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          context?: string | null
          created_at?: string | null
          extracted_at?: string | null
          id?: string
          session_id?: string | null
          signal_type?: string
          signal_value?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_signals_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      competitor_profiles: {
        Row: {
          business_profile_id: string
          competitor_name: string
          competitor_url: string | null
          created_at: string | null
          id: string
          pricing_hints: string | null
          scraped_data: Json | null
          services_offered: string[] | null
          strengths: string[] | null
          updated_at: string | null
          weaknesses: string[] | null
        }
        Insert: {
          business_profile_id: string
          competitor_name: string
          competitor_url?: string | null
          created_at?: string | null
          id?: string
          pricing_hints?: string | null
          scraped_data?: Json | null
          services_offered?: string[] | null
          strengths?: string[] | null
          updated_at?: string | null
          weaknesses?: string[] | null
        }
        Update: {
          business_profile_id?: string
          competitor_name?: string
          competitor_url?: string | null
          created_at?: string | null
          id?: string
          pricing_hints?: string | null
          scraped_data?: Json | null
          services_offered?: string[] | null
          strengths?: string[] | null
          updated_at?: string | null
          weaknesses?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "competitor_profiles_business_profile_id_fkey"
            columns: ["business_profile_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          service_interest: string | null
          status: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          service_interest?: string | null
          status?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          service_interest?: string | null
          status?: string
        }
        Relationships: []
      }
      cta_clicks: {
        Row: {
          created_at: string
          cta_label: string
          cta_type: string
          destination: string
          id: string
          page_url: string | null
          referrer: string | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          cta_label: string
          cta_type: string
          destination: string
          id?: string
          page_url?: string | null
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          cta_label?: string
          cta_type?: string
          destination?: string
          id?: string
          page_url?: string | null
          referrer?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      local_market_intelligence: {
        Row: {
          collected_at: string | null
          created_at: string | null
          data_payload: Json
          data_type: string
          expires_at: string | null
          id: string
          industry: string
          location: string
          relevance_score: number | null
          source: string | null
        }
        Insert: {
          collected_at?: string | null
          created_at?: string | null
          data_payload: Json
          data_type: string
          expires_at?: string | null
          id?: string
          industry: string
          location: string
          relevance_score?: number | null
          source?: string | null
        }
        Update: {
          collected_at?: string | null
          created_at?: string | null
          data_payload?: Json
          data_type?: string
          expires_at?: string | null
          id?: string
          industry?: string
          location?: string
          relevance_score?: number | null
          source?: string | null
        }
        Relationships: []
      }
      market_data_cache: {
        Row: {
          cache_key: string
          created_at: string | null
          data: Json
          expires_at: string
          id: string
          updated_at: string | null
        }
        Insert: {
          cache_key: string
          created_at?: string | null
          data: Json
          expires_at: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          cache_key?: string
          created_at?: string | null
          data?: Json
          expires_at?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_responses: {
        Row: {
          business_name: string | null
          created_at: string | null
          id: string
          industry: string | null
          is_subscribed: boolean | null
          location: string | null
          marketing_challenge: string | null
          phone_number: string | null
          primary_services: string[] | null
          scraped_data: Json | null
          updated_at: string | null
          urgency_level: string | null
          user_id: string | null
          website_url: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          is_subscribed?: boolean | null
          location?: string | null
          marketing_challenge?: string | null
          phone_number?: string | null
          primary_services?: string[] | null
          scraped_data?: Json | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string | null
          website_url: string
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          is_subscribed?: boolean | null
          location?: string | null
          marketing_challenge?: string | null
          phone_number?: string | null
          primary_services?: string[] | null
          scraped_data?: Json | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string | null
          website_url?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          ip_address: unknown
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address: unknown
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: unknown
          request_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
      security_incidents: {
        Row: {
          created_at: string
          description: string | null
          endpoint: string | null
          id: string
          incident_type: string
          ip_address: unknown
          resolved: boolean | null
          severity: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          endpoint?: string | null
          id?: string
          incident_type: string
          ip_address?: unknown
          resolved?: boolean | null
          severity?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          endpoint?: string | null
          id?: string
          incident_type?: string
          ip_address?: unknown
          resolved?: boolean | null
          severity?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          discount_codes_used: string[] | null
          email: string
          id: string
          is_canceled: boolean | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_status: string | null
          subscription_tier: string | null
          trial_end: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          discount_codes_used?: string[] | null
          email: string
          id?: string
          is_canceled?: boolean | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          discount_codes_used?: string[] | null
          email?: string
          id?: string
          is_canceled?: boolean | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          is_approved: boolean
          name: string
          rating: number
          service: string
          testimonial: string
        }
        Insert: {
          company: string
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          is_approved?: boolean
          name: string
          rating: number
          service: string
          testimonial: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          is_approved?: boolean
          name?: string
          rating?: number
          service?: string
          testimonial?: string
        }
        Relationships: []
      }
      user_intelligence_profile: {
        Row: {
          conversation_count: number | null
          created_at: string | null
          experience_level: string | null
          id: string
          insights: Json | null
          last_active_at: string | null
          preferred_channels: string[] | null
          primary_pain_points: string[] | null
          recommendations: Json | null
          service_focus: string[] | null
          target_locations: string[] | null
          typical_budget_range: string | null
          updated_at: string | null
          urgency_level: string | null
          user_id: string
        }
        Insert: {
          conversation_count?: number | null
          created_at?: string | null
          experience_level?: string | null
          id?: string
          insights?: Json | null
          last_active_at?: string | null
          preferred_channels?: string[] | null
          primary_pain_points?: string[] | null
          recommendations?: Json | null
          service_focus?: string[] | null
          target_locations?: string[] | null
          typical_budget_range?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id: string
        }
        Update: {
          conversation_count?: number | null
          created_at?: string | null
          experience_level?: string | null
          id?: string
          insights?: Json | null
          last_active_at?: string | null
          preferred_channels?: string[] | null
          primary_pain_points?: string[] | null
          recommendations?: Json | null
          service_focus?: string[] | null
          target_locations?: string[] | null
          typical_budget_range?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      zillow_cache: {
        Row: {
          created_at: string
          expires_at: string
          key: string
          payload: Json
        }
        Insert: {
          created_at?: string
          expires_at: string
          key: string
          payload: Json
        }
        Update: {
          created_at?: string
          expires_at?: string
          key?: string
          payload?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      anonymize_old_customer_data: { Args: never; Returns: undefined }
      check_rate_limit: {
        Args: {
          _endpoint: string
          _ip_address: unknown
          _max_requests?: number
          _window_minutes?: number
        }
        Returns: boolean
      }
      check_rate_limit_with_security: {
        Args: {
          _endpoint: string
          _ip_address: unknown
          _max_requests?: number
          _window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_expired_cache: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      search_web_for_property_data: {
        Args: { location: string; query_type: string }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
