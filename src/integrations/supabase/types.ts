export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          points_reward: number | null
          rarity: string | null
          requirement_type: string | null
          requirement_value: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          points_reward?: number | null
          rarity?: string | null
          requirement_type?: string | null
          requirement_value?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          points_reward?: number | null
          rarity?: string | null
          requirement_type?: string | null
          requirement_value?: number | null
        }
        Relationships: []
      }
      business_partners: {
        Row: {
          company_name: string
          created_at: string | null
          id: string
          logo_url: string | null
          matching_pool_balance: number | null
          total_matched: number | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
          website_url: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          matching_pool_balance?: number | null
          total_matched?: number | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          website_url?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          matching_pool_balance?: number | null
          total_matched?: number | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_partners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          charity_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          goal_amount: number | null
          id: string
          image_url: string | null
          raised_amount: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["campaign_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          charity_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          goal_amount?: number | null
          id?: string
          image_url?: string | null
          raised_amount?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          charity_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          goal_amount?: number | null
          id?: string
          image_url?: string | null
          raised_amount?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      charities: {
        Row: {
          activity_score: number | null
          category: string | null
          country: string | null
          created_at: string | null
          description: string | null
          id: string
          last_activity_date: string | null
          logo_url: string | null
          name: string
          registration_number: string | null
          total_posts: number | null
          total_raised: number | null
          trust_rating: number | null
          updated_at: string | null
          verified: boolean | null
          verified_posts: number | null
          website_url: string | null
        }
        Insert: {
          activity_score?: number | null
          category?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          last_activity_date?: string | null
          logo_url?: string | null
          name: string
          registration_number?: string | null
          total_posts?: number | null
          total_raised?: number | null
          trust_rating?: number | null
          updated_at?: string | null
          verified?: boolean | null
          verified_posts?: number | null
          website_url?: string | null
        }
        Update: {
          activity_score?: number | null
          category?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          last_activity_date?: string | null
          logo_url?: string | null
          name?: string
          registration_number?: string | null
          total_posts?: number | null
          total_raised?: number | null
          trust_rating?: number | null
          updated_at?: string | null
          verified?: boolean | null
          verified_posts?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      charity_activity_metrics: {
        Row: {
          activity_score: number | null
          charity_id: string
          created_at: string
          id: string
          posts_count: number | null
          total_likes: number | null
          total_views: number | null
          verified_posts_count: number | null
          week_start_date: string
        }
        Insert: {
          activity_score?: number | null
          charity_id: string
          created_at?: string
          id?: string
          posts_count?: number | null
          total_likes?: number | null
          total_views?: number | null
          verified_posts_count?: number | null
          week_start_date: string
        }
        Update: {
          activity_score?: number | null
          charity_id?: string
          created_at?: string
          id?: string
          posts_count?: number | null
          total_likes?: number | null
          total_views?: number | null
          verified_posts_count?: number | null
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_activity_metrics_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_allocations: {
        Row: {
          activity_weight: number | null
          allocation_percentage: number
          calculated_percentage: number | null
          charity_id: string
          created_at: string
          id: string
          is_active: boolean | null
          manual_override: boolean | null
          trust_weight: number | null
          updated_at: string
        }
        Insert: {
          activity_weight?: number | null
          allocation_percentage: number
          calculated_percentage?: number | null
          charity_id: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          manual_override?: boolean | null
          trust_weight?: number | null
          updated_at?: string
        }
        Update: {
          activity_weight?: number | null
          allocation_percentage?: number
          calculated_percentage?: number | null
          charity_id?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          manual_override?: boolean | null
          trust_weight?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_allocations_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_feed_posts: {
        Row: {
          charity_id: string
          content: string
          created_at: string
          id: string
          likes_count: number | null
          location: string | null
          media_urls: string[] | null
          post_type: string | null
          title: string
          updated_at: string
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          views_count: number | null
        }
        Insert: {
          charity_id: string
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          location?: string | null
          media_urls?: string[] | null
          post_type?: string | null
          title: string
          updated_at?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          views_count?: number | null
        }
        Update: {
          charity_id?: string
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          location?: string | null
          media_urls?: string[] | null
          post_type?: string | null
          title?: string
          updated_at?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "charity_feed_posts_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_feed_posts_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      disbursements: {
        Row: {
          amount: number
          charity_id: string
          created_at: string
          created_by: string | null
          disbursement_date: string
          id: string
          notes: string | null
          reference_number: string | null
          status: string | null
        }
        Insert: {
          amount: number
          charity_id: string
          created_at?: string
          created_by?: string | null
          disbursement_date?: string
          id?: string
          notes?: string | null
          reference_number?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          charity_id?: string
          created_at?: string
          created_by?: string | null
          disbursement_date?: string
          id?: string
          notes?: string | null
          reference_number?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disbursements_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disbursements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_disbursements: {
        Row: {
          amount: number
          created_at: string
          disbursement_id: string
          donation_id: string
          id: string
        }
        Insert: {
          amount: number
          created_at?: string
          disbursement_id: string
          donation_id: string
          id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          disbursement_id?: string
          donation_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_disbursements_disbursement_id_fkey"
            columns: ["disbursement_id"]
            isOneToOne: false
            referencedRelation: "disbursements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_disbursements_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          anonymous: boolean | null
          campaign_id: string | null
          charity_id: string | null
          created_at: string | null
          disbursed_amount: number | null
          disbursement_status: string | null
          id: string
          jannah_points_earned: number | null
          message: string | null
          payment_intent_id: string | null
          sadaqah_coins_earned: number | null
          status: Database["public"]["Enums"]["donation_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          anonymous?: boolean | null
          campaign_id?: string | null
          charity_id?: string | null
          created_at?: string | null
          disbursed_amount?: number | null
          disbursement_status?: string | null
          id?: string
          jannah_points_earned?: number | null
          message?: string | null
          payment_intent_id?: string | null
          sadaqah_coins_earned?: number | null
          status?: Database["public"]["Enums"]["donation_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          anonymous?: boolean | null
          campaign_id?: string | null
          charity_id?: string | null
          created_at?: string | null
          disbursed_amount?: number | null
          disbursement_status?: string | null
          id?: string
          jannah_points_earned?: number | null
          message?: string | null
          payment_intent_id?: string | null
          sadaqah_coins_earned?: number | null
          status?: Database["public"]["Enums"]["donation_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gift_card_products: {
        Row: {
          assigned_charity_id: string | null
          category: string
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          max_amount: number | null
          min_amount: number | null
          name: string
          product_type: string | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          assigned_charity_id?: string | null
          category: string
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          max_amount?: number | null
          min_amount?: number | null
          name: string
          product_type?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          assigned_charity_id?: string | null
          category?: string
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          max_amount?: number | null
          min_amount?: number | null
          name?: string
          product_type?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gift_card_products_assigned_charity_id_fkey"
            columns: ["assigned_charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_pool: {
        Row: {
          business_partner_id: string | null
          created_at: string | null
          donation_id: string | null
          id: string
          matched: boolean | null
          matched_at: string | null
          sadaqah_coins_amount: number
          user_id: string | null
        }
        Insert: {
          business_partner_id?: string | null
          created_at?: string | null
          donation_id?: string | null
          id?: string
          matched?: boolean | null
          matched_at?: string | null
          sadaqah_coins_amount: number
          user_id?: string | null
        }
        Update: {
          business_partner_id?: string | null
          created_at?: string | null
          donation_id?: string | null
          id?: string
          matched?: boolean | null
          matched_at?: string | null
          sadaqah_coins_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matching_pool_business_partner_id_fkey"
            columns: ["business_partner_id"]
            isOneToOne: false
            referencedRelation: "business_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matching_pool_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matching_pool_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          achievement_notifications: boolean | null
          created_at: string | null
          donation_confirmations: boolean | null
          email_notifications: boolean | null
          id: string
          marketing_emails: boolean | null
          updated_at: string | null
          user_id: string | null
          weekly_summary: boolean | null
        }
        Insert: {
          achievement_notifications?: boolean | null
          created_at?: string | null
          donation_confirmations?: boolean | null
          email_notifications?: boolean | null
          id?: string
          marketing_emails?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          weekly_summary?: boolean | null
        }
        Update: {
          achievement_notifications?: boolean | null
          created_at?: string | null
          donation_confirmations?: boolean | null
          email_notifications?: boolean | null
          id?: string
          marketing_emails?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          weekly_summary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_streak: number | null
          donation_count: number | null
          email: string
          full_name: string | null
          id: string
          jannah_points: number | null
          last_donation_date: string | null
          longest_streak: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          sadaqah_coins: number | null
          total_donated: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_streak?: number | null
          donation_count?: number | null
          email: string
          full_name?: string | null
          id: string
          jannah_points?: number | null
          last_donation_date?: string | null
          longest_streak?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          sadaqah_coins?: number | null
          total_donated?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_streak?: number | null
          donation_count?: number | null
          email?: string
          full_name?: string | null
          id?: string
          jannah_points?: number | null
          last_donation_date?: string | null
          longest_streak?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          sadaqah_coins?: number | null
          total_donated?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          earned_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_charity_allocations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_user_role: {
        Args: { user_uuid?: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      campaign_status: "draft" | "active" | "paused" | "completed" | "cancelled"
      donation_status: "pending" | "completed" | "failed" | "refunded"
      user_role:
        | "user"
        | "admin"
        | "charity_partner"
        | "business_partner"
        | "charity_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      campaign_status: ["draft", "active", "paused", "completed", "cancelled"],
      donation_status: ["pending", "completed", "failed", "refunded"],
      user_role: [
        "user",
        "admin",
        "charity_partner",
        "business_partner",
        "charity_admin",
      ],
    },
  },
} as const
