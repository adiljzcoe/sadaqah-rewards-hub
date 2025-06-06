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
      admin_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      batch_disbursements: {
        Row: {
          activity_score_at_time: number
          allocation_percentage: number
          amount: number
          batch_id: string
          charity_id: string
          created_at: string
          id: string
          project_type: string | null
          trust_rating_at_time: number
        }
        Insert: {
          activity_score_at_time: number
          allocation_percentage: number
          amount: number
          batch_id: string
          charity_id: string
          created_at?: string
          id?: string
          project_type?: string | null
          trust_rating_at_time: number
        }
        Update: {
          activity_score_at_time?: number
          allocation_percentage?: number
          amount?: number
          batch_id?: string
          charity_id?: string
          created_at?: string
          id?: string
          project_type?: string | null
          trust_rating_at_time?: number
        }
        Relationships: [
          {
            foreignKeyName: "batch_disbursements_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "disbursement_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_disbursements_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
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
      charity_ad_campaigns: {
        Row: {
          budget_allocated: number
          budget_spent: number | null
          campaign_name: string
          charity_partner_id: string
          created_at: string | null
          end_date: string | null
          id: string
          platform: string
          start_date: string | null
          status: string | null
          target_audience: Json | null
          updated_at: string | null
          utm_parameters: Json | null
        }
        Insert: {
          budget_allocated: number
          budget_spent?: number | null
          campaign_name: string
          charity_partner_id: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          platform: string
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
          utm_parameters?: Json | null
        }
        Update: {
          budget_allocated?: number
          budget_spent?: number | null
          campaign_name?: string
          charity_partner_id?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          platform?: string
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
          utm_parameters?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "charity_ad_campaigns_charity_partner_id_fkey"
            columns: ["charity_partner_id"]
            isOneToOne: false
            referencedRelation: "charity_partners"
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
      charity_partners: {
        Row: {
          ad_spend_budget: number | null
          charity_id: string
          commission_rate: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          monthly_spend_limit: number | null
          partner_slug: string
          updated_at: string | null
        }
        Insert: {
          ad_spend_budget?: number | null
          charity_id: string
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          monthly_spend_limit?: number | null
          partner_slug: string
          updated_at?: string | null
        }
        Update: {
          ad_spend_budget?: number | null
          charity_id?: string
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          monthly_spend_limit?: number | null
          partner_slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "charity_partners_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_products: {
        Row: {
          beneficiaries_count: number | null
          category: string
          charity_id: string
          created_at: string
          currency: string
          description: string | null
          fixed_price: number | null
          id: string
          image_url: string | null
          impact_description: string | null
          is_active: boolean
          is_featured: boolean
          maximum_amount: number | null
          minimum_amount: number | null
          name: string
          pricing_model: Database["public"]["Enums"]["pricing_model"]
          product_type: Database["public"]["Enums"]["product_type"]
          raised_amount: number | null
          sort_order: number | null
          suggested_amount: number | null
          tags: string[] | null
          target_amount: number | null
          updated_at: string
        }
        Insert: {
          beneficiaries_count?: number | null
          category: string
          charity_id: string
          created_at?: string
          currency?: string
          description?: string | null
          fixed_price?: number | null
          id?: string
          image_url?: string | null
          impact_description?: string | null
          is_active?: boolean
          is_featured?: boolean
          maximum_amount?: number | null
          minimum_amount?: number | null
          name: string
          pricing_model?: Database["public"]["Enums"]["pricing_model"]
          product_type?: Database["public"]["Enums"]["product_type"]
          raised_amount?: number | null
          sort_order?: number | null
          suggested_amount?: number | null
          tags?: string[] | null
          target_amount?: number | null
          updated_at?: string
        }
        Update: {
          beneficiaries_count?: number | null
          category?: string
          charity_id?: string
          created_at?: string
          currency?: string
          description?: string | null
          fixed_price?: number | null
          id?: string
          image_url?: string | null
          impact_description?: string | null
          is_active?: boolean
          is_featured?: boolean
          maximum_amount?: number | null
          minimum_amount?: number | null
          name?: string
          pricing_model?: Database["public"]["Enums"]["pricing_model"]
          product_type?: Database["public"]["Enums"]["product_type"]
          raised_amount?: number | null
          sort_order?: number | null
          suggested_amount?: number | null
          tags?: string[] | null
          target_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_products_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_revenue_tracking: {
        Row: {
          attribution_method: string
          charity_partner_id: string
          donation_id: string
          gross_amount: number
          id: string
          net_amount: number
          platform_fee: number
          processed_at: string | null
          utm_tracking_id: string | null
        }
        Insert: {
          attribution_method: string
          charity_partner_id: string
          donation_id: string
          gross_amount: number
          id?: string
          net_amount: number
          platform_fee: number
          processed_at?: string | null
          utm_tracking_id?: string | null
        }
        Update: {
          attribution_method?: string
          charity_partner_id?: string
          donation_id?: string
          gross_amount?: number
          id?: string
          net_amount?: number
          platform_fee?: number
          processed_at?: string | null
          utm_tracking_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "charity_revenue_tracking_charity_partner_id_fkey"
            columns: ["charity_partner_id"]
            isOneToOne: false
            referencedRelation: "charity_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_revenue_tracking_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_revenue_tracking_utm_tracking_id_fkey"
            columns: ["utm_tracking_id"]
            isOneToOne: false
            referencedRelation: "utm_tracking"
            referencedColumns: ["id"]
          },
        ]
      }
      check_in_locations: {
        Row: {
          address: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          jannah_points_reward: number | null
          latitude: number | null
          location_type: Database["public"]["Enums"]["check_in_location_type"]
          longitude: number | null
          name: string
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          jannah_points_reward?: number | null
          latitude?: number | null
          location_type: Database["public"]["Enums"]["check_in_location_type"]
          longitude?: number | null
          name: string
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          jannah_points_reward?: number | null
          latitude?: number | null
          location_type?: Database["public"]["Enums"]["check_in_location_type"]
          longitude?: number | null
          name?: string
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      dhikr_achievements: {
        Row: {
          badge_color: string | null
          badge_icon: string | null
          created_at: string
          description: string | null
          id: string
          jannah_points_reward: number | null
          requirement_type: string
          requirement_value: number
          title: string
        }
        Insert: {
          badge_color?: string | null
          badge_icon?: string | null
          created_at?: string
          description?: string | null
          id?: string
          jannah_points_reward?: number | null
          requirement_type: string
          requirement_value: number
          title: string
        }
        Update: {
          badge_color?: string | null
          badge_icon?: string | null
          created_at?: string
          description?: string | null
          id?: string
          jannah_points_reward?: number | null
          requirement_type?: string
          requirement_value?: number
          title?: string
        }
        Relationships: []
      }
      dhikr_counts: {
        Row: {
          count_increment: number
          created_at: string
          dhikr_type: string
          event_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          count_increment?: number
          created_at?: string
          dhikr_type: string
          event_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          count_increment?: number
          created_at?: string
          dhikr_type?: string
          event_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dhikr_counts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "dhikr_events"
            referencedColumns: ["id"]
          },
        ]
      }
      dhikr_events: {
        Row: {
          bonus_multiplier: number | null
          created_at: string
          created_by: string | null
          description: string | null
          dhikr_type: string
          end_time: string
          id: string
          is_active: boolean | null
          is_recurring: boolean | null
          jannah_points_reward: number | null
          recurrence_pattern: string | null
          start_time: string
          target_count: number
          title: string
          updated_at: string
        }
        Insert: {
          bonus_multiplier?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          dhikr_type: string
          end_time: string
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          jannah_points_reward?: number | null
          recurrence_pattern?: string | null
          start_time: string
          target_count?: number
          title: string
          updated_at?: string
        }
        Update: {
          bonus_multiplier?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          dhikr_type?: string
          end_time?: string
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          jannah_points_reward?: number | null
          recurrence_pattern?: string | null
          start_time?: string
          target_count?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      dhikr_participation: {
        Row: {
          dhikr_count: number
          event_id: string | null
          id: string
          joined_at: string
          last_dhikr_at: string | null
          total_points_earned: number | null
          user_id: string | null
        }
        Insert: {
          dhikr_count?: number
          event_id?: string | null
          id?: string
          joined_at?: string
          last_dhikr_at?: string | null
          total_points_earned?: number | null
          user_id?: string | null
        }
        Update: {
          dhikr_count?: number
          event_id?: string | null
          id?: string
          joined_at?: string
          last_dhikr_at?: string | null
          total_points_earned?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dhikr_participation_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "dhikr_events"
            referencedColumns: ["id"]
          },
        ]
      }
      dhikr_subscriptions: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          notification_enabled: boolean | null
          reminder_minutes: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id?: string
          notification_enabled?: boolean | null
          reminder_minutes?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          notification_enabled?: boolean | null
          reminder_minutes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dhikr_subscriptions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "dhikr_events"
            referencedColumns: ["id"]
          },
        ]
      }
      disbursement_batches: {
        Row: {
          batch_date: string
          calculation_snapshot: Json | null
          charity_count: number
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          status: string | null
          total_amount: number
        }
        Insert: {
          batch_date?: string
          calculation_snapshot?: Json | null
          charity_count?: number
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          total_amount?: number
        }
        Update: {
          batch_date?: string
          calculation_snapshot?: Json | null
          charity_count?: number
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "disbursement_batches_created_by_fkey"
            columns: ["created_by"]
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
          attributed_to_charity_partner: string | null
          attribution_source: string | null
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
          utm_tracking_id: string | null
        }
        Insert: {
          amount: number
          anonymous?: boolean | null
          attributed_to_charity_partner?: string | null
          attribution_source?: string | null
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
          utm_tracking_id?: string | null
        }
        Update: {
          amount?: number
          anonymous?: boolean | null
          attributed_to_charity_partner?: string | null
          attribution_source?: string | null
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
          utm_tracking_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_attributed_to_charity_partner_fkey"
            columns: ["attributed_to_charity_partner"]
            isOneToOne: false
            referencedRelation: "charity_partners"
            referencedColumns: ["id"]
          },
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
          {
            foreignKeyName: "donations_utm_tracking_id_fkey"
            columns: ["utm_tracking_id"]
            isOneToOne: false
            referencedRelation: "utm_tracking"
            referencedColumns: ["id"]
          },
        ]
      }
      dua_ameens: {
        Row: {
          created_at: string | null
          dua_id: string
          id: string
          ip_address: unknown | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          dua_id: string
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          dua_id?: string
          id?: string
          ip_address?: unknown | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dua_ameens_dua_id_fkey"
            columns: ["dua_id"]
            isOneToOne: false
            referencedRelation: "duas"
            referencedColumns: ["id"]
          },
        ]
      }
      dua_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      dua_donations: {
        Row: {
          amount: number
          created_at: string | null
          donor_name: string | null
          donor_user_id: string | null
          dua_id: string | null
          id: string
          is_anonymous: boolean | null
          jannah_points_earned: number | null
          message: string | null
          on_behalf_of: string | null
          payment_status: string | null
          sadaqah_coins_earned: number | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          donor_name?: string | null
          donor_user_id?: string | null
          dua_id?: string | null
          id?: string
          is_anonymous?: boolean | null
          jannah_points_earned?: number | null
          message?: string | null
          on_behalf_of?: string | null
          payment_status?: string | null
          sadaqah_coins_earned?: number | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          donor_name?: string | null
          donor_user_id?: string | null
          dua_id?: string | null
          id?: string
          is_anonymous?: boolean | null
          jannah_points_earned?: number | null
          message?: string | null
          on_behalf_of?: string | null
          payment_status?: string | null
          sadaqah_coins_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dua_donations_dua_id_fkey"
            columns: ["dua_id"]
            isOneToOne: false
            referencedRelation: "duas_library"
            referencedColumns: ["id"]
          },
        ]
      }
      duas: {
        Row: {
          ameen_count: number | null
          audio_duration: number | null
          audio_url: string
          created_at: string | null
          description: string | null
          id: string
          is_anonymous: boolean | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ameen_count?: number | null
          audio_duration?: number | null
          audio_url: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_anonymous?: boolean | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ameen_count?: number | null
          audio_duration?: number | null
          audio_url?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_anonymous?: boolean | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      duas_library: {
        Row: {
          arabic_text: string
          benefits: string | null
          category_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          recitation_count: number | null
          recommended_donation_amount: number | null
          reference: string | null
          tags: string[] | null
          title: string
          translation: string
          transliteration: string | null
          updated_at: string | null
          when_to_recite: string | null
        }
        Insert: {
          arabic_text: string
          benefits?: string | null
          category_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          recitation_count?: number | null
          recommended_donation_amount?: number | null
          reference?: string | null
          tags?: string[] | null
          title: string
          translation: string
          transliteration?: string | null
          updated_at?: string | null
          when_to_recite?: string | null
        }
        Update: {
          arabic_text?: string
          benefits?: string | null
          category_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          recitation_count?: number | null
          recommended_donation_amount?: number | null
          reference?: string | null
          tags?: string[] | null
          title?: string
          translation?: string
          transliteration?: string | null
          updated_at?: string | null
          when_to_recite?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "duas_library_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dua_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      family_accounts: {
        Row: {
          created_at: string
          family_name: string
          id: string
          is_active: boolean | null
          parent_user_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          family_name: string
          id?: string
          is_active?: boolean | null
          parent_user_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          family_name?: string
          id?: string
          is_active?: boolean | null
          parent_user_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      family_topups: {
        Row: {
          amount_paid: number | null
          created_at: string
          currency: string | null
          family_id: string
          id: string
          jannah_points_added: number | null
          kids_account_id: string
          parent_user_id: string
          sadaqah_coins_added: number | null
          topup_reason: string | null
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string
          currency?: string | null
          family_id: string
          id?: string
          jannah_points_added?: number | null
          kids_account_id: string
          parent_user_id: string
          sadaqah_coins_added?: number | null
          topup_reason?: string | null
        }
        Update: {
          amount_paid?: number | null
          created_at?: string
          currency?: string | null
          family_id?: string
          id?: string
          jannah_points_added?: number | null
          kids_account_id?: string
          parent_user_id?: string
          sadaqah_coins_added?: number | null
          topup_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_topups_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_topups_kids_account_id_fkey"
            columns: ["kids_account_id"]
            isOneToOne: false
            referencedRelation: "kids_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      fundraising_campaigns: {
        Row: {
          cause_category: string
          created_at: string | null
          created_by: string | null
          currency: string | null
          dedication_message: string | null
          description: string | null
          end_date: string | null
          id: string
          image_url: string | null
          is_team_fundraiser: boolean | null
          masjid_id: string | null
          raised_amount: number | null
          share_code: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["fundraiser_status"] | null
          target_amount: number
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          cause_category: string
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          dedication_message?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_team_fundraiser?: boolean | null
          masjid_id?: string | null
          raised_amount?: number | null
          share_code?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["fundraiser_status"] | null
          target_amount: number
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          cause_category?: string
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          dedication_message?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_team_fundraiser?: boolean | null
          masjid_id?: string | null
          raised_amount?: number | null
          share_code?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["fundraiser_status"] | null
          target_amount?: number
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      fundraising_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      fundraising_donations: {
        Row: {
          amount: number
          campaign_id: string | null
          created_at: string | null
          donor_name: string | null
          donor_user_id: string | null
          gift_aid: boolean | null
          id: string
          is_anonymous: boolean | null
          message: string | null
          payment_status: string | null
          team_id: string | null
        }
        Insert: {
          amount: number
          campaign_id?: string | null
          created_at?: string | null
          donor_name?: string | null
          donor_user_id?: string | null
          gift_aid?: boolean | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_status?: string | null
          team_id?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string | null
          created_at?: string | null
          donor_name?: string | null
          donor_user_id?: string | null
          gift_aid?: boolean | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_status?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fundraising_donations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "fundraising_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fundraising_donations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "fundraising_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      fundraising_teams: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          team_description: string | null
          team_name: string
          team_raised: number | null
          team_target: number | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          team_description?: string | null
          team_name: string
          team_raised?: number | null
          team_target?: number | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          team_description?: string | null
          team_name?: string
          team_raised?: number | null
          team_target?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fundraising_teams_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "fundraising_campaigns"
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
      gps_good_deeds: {
        Row: {
          accuracy: number | null
          created_at: string | null
          good_deed_type: string
          id: string
          jannah_points_earned: number | null
          latitude: number
          longitude: number
          notes: string | null
          user_id: string | null
        }
        Insert: {
          accuracy?: number | null
          created_at?: string | null
          good_deed_type: string
          id?: string
          jannah_points_earned?: number | null
          latitude: number
          longitude: number
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          accuracy?: number | null
          created_at?: string | null
          good_deed_type?: string
          id?: string
          jannah_points_earned?: number | null
          latitude?: number
          longitude?: number
          notes?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      kids_accounts: {
        Row: {
          age: number | null
          child_name: string
          created_at: string
          family_id: string
          id: string
          is_active: boolean | null
          jannah_points: number | null
          sadaqah_coins: number | null
          spending_limit_daily: number | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          child_name: string
          created_at?: string
          family_id: string
          id?: string
          is_active?: boolean | null
          jannah_points?: number | null
          sadaqah_coins?: number | null
          spending_limit_daily?: number | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          child_name?: string
          created_at?: string
          family_id?: string
          id?: string
          is_active?: boolean | null
          jannah_points?: number | null
          sadaqah_coins?: number | null
          spending_limit_daily?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kids_accounts_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      kids_donations: {
        Row: {
          amount_coins: number
          charity_id: string
          created_at: string
          donation_date: string | null
          id: string
          jannah_points_earned: number | null
          kids_account_id: string
          message: string | null
        }
        Insert: {
          amount_coins: number
          charity_id: string
          created_at?: string
          donation_date?: string | null
          id?: string
          jannah_points_earned?: number | null
          kids_account_id: string
          message?: string | null
        }
        Update: {
          amount_coins?: number
          charity_id?: string
          created_at?: string
          donation_date?: string | null
          id?: string
          jannah_points_earned?: number | null
          kids_account_id?: string
          message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kids_donations_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kids_donations_kids_account_id_fkey"
            columns: ["kids_account_id"]
            isOneToOne: false
            referencedRelation: "kids_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      live_streams: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_live: boolean | null
          scheduled_end: string | null
          scheduled_start: string | null
          stream_url: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          viewer_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          scheduled_end?: string | null
          scheduled_start?: string | null
          stream_url: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          viewer_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_live?: boolean | null
          scheduled_end?: string | null
          scheduled_start?: string | null
          stream_url?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          viewer_count?: number | null
        }
        Relationships: []
      }
      masjid_announcements: {
        Row: {
          announcement_type: string | null
          content: string
          created_at: string | null
          created_by: string | null
          expire_date: string | null
          id: string
          is_published: boolean | null
          masjid_id: string | null
          priority: number | null
          publish_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          announcement_type?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          expire_date?: string | null
          id?: string
          is_published?: boolean | null
          masjid_id?: string | null
          priority?: number | null
          publish_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          announcement_type?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          expire_date?: string | null
          id?: string
          is_published?: boolean | null
          masjid_id?: string | null
          priority?: number | null
          publish_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_announcements_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_event_registrations: {
        Row: {
          attendee_email: string
          attendee_name: string
          attendee_phone: string | null
          event_id: string | null
          id: string
          number_of_attendees: number | null
          payment_status: string | null
          registration_date: string | null
          user_id: string | null
        }
        Insert: {
          attendee_email: string
          attendee_name: string
          attendee_phone?: string | null
          event_id?: string | null
          id?: string
          number_of_attendees?: number | null
          payment_status?: string | null
          registration_date?: string | null
          user_id?: string | null
        }
        Update: {
          attendee_email?: string
          attendee_name?: string
          attendee_phone?: string | null
          event_id?: string | null
          id?: string
          number_of_attendees?: number | null
          payment_status?: string | null
          registration_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "masjid_events"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_events: {
        Row: {
          capacity: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          event_type: string
          id: string
          image_url: string | null
          is_published: boolean | null
          is_recurring: boolean | null
          location: string | null
          masjid_id: string | null
          organizer_contact: string | null
          organizer_name: string | null
          recurrence_pattern: string | null
          registration_fee: number | null
          registration_required: boolean | null
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_type: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          is_recurring?: boolean | null
          location?: string | null
          masjid_id?: string | null
          organizer_contact?: string | null
          organizer_name?: string | null
          recurrence_pattern?: string | null
          registration_fee?: number | null
          registration_required?: boolean | null
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          is_recurring?: boolean | null
          location?: string | null
          masjid_id?: string | null
          organizer_contact?: string | null
          organizer_name?: string | null
          recurrence_pattern?: string | null
          registration_fee?: number | null
          registration_required?: boolean | null
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_events_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_jummah_schedule: {
        Row: {
          capacity: number | null
          created_at: string | null
          id: string
          imam_name: string | null
          is_active: boolean | null
          jummah_time: string
          khutbah_language: string | null
          masjid_id: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          imam_name?: string | null
          is_active?: boolean | null
          jummah_time: string
          khutbah_language?: string | null
          masjid_id?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          imam_name?: string | null
          is_active?: boolean | null
          jummah_time?: string
          khutbah_language?: string | null
          masjid_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_jummah_schedule_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_khutbahs: {
        Row: {
          audio_url: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          imam_name: string
          is_featured: boolean | null
          khutbah_date: string
          language: string | null
          likes_count: number | null
          masjid_id: string | null
          tags: string[] | null
          title: string
          transcript: string | null
          updated_at: string | null
          video_url: string | null
          views_count: number | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          imam_name: string
          is_featured?: boolean | null
          khutbah_date: string
          language?: string | null
          likes_count?: number | null
          masjid_id?: string | null
          tags?: string[] | null
          title: string
          transcript?: string | null
          updated_at?: string | null
          video_url?: string | null
          views_count?: number | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          imam_name?: string
          is_featured?: boolean | null
          khutbah_date?: string
          language?: string | null
          likes_count?: number | null
          masjid_id?: string | null
          tags?: string[] | null
          title?: string
          transcript?: string | null
          updated_at?: string | null
          video_url?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_khutbahs_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_prayer_times: {
        Row: {
          asr_time: string
          created_at: string | null
          dhuhr_time: string
          fajr_time: string
          id: string
          isha_time: string
          maghrib_time: string
          masjid_id: string | null
          prayer_date: string
          sunrise_time: string | null
        }
        Insert: {
          asr_time: string
          created_at?: string | null
          dhuhr_time: string
          fajr_time: string
          id?: string
          isha_time: string
          maghrib_time: string
          masjid_id?: string | null
          prayer_date: string
          sunrise_time?: string | null
        }
        Update: {
          asr_time?: string
          created_at?: string | null
          dhuhr_time?: string
          fajr_time?: string
          id?: string
          isha_time?: string
          maghrib_time?: string
          masjid_id?: string | null
          prayer_date?: string
          sunrise_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_prayer_times_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_services: {
        Row: {
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          location: string | null
          masjid_id: string | null
          operating_hours: Json | null
          service_name: string
          service_type: string
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          masjid_id?: string | null
          operating_hours?: Json | null
          service_name: string
          service_type: string
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          masjid_id?: string | null
          operating_hours?: Json | null
          service_name?: string
          service_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_services_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_staff: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          masjid_id: string | null
          permissions: Json | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          masjid_id?: string | null
          permissions?: Json | null
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          masjid_id?: string | null
          permissions?: Json | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_staff_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_websites: {
        Row: {
          created_at: string | null
          custom_domain: string | null
          domain_verified: boolean | null
          id: string
          is_active: boolean | null
          masjid_id: string | null
          subdomain_slug: string
          theme_settings: Json | null
          updated_at: string | null
          website_settings: Json | null
        }
        Insert: {
          created_at?: string | null
          custom_domain?: string | null
          domain_verified?: boolean | null
          id?: string
          is_active?: boolean | null
          masjid_id?: string | null
          subdomain_slug: string
          theme_settings?: Json | null
          updated_at?: string | null
          website_settings?: Json | null
        }
        Update: {
          created_at?: string | null
          custom_domain?: string | null
          domain_verified?: boolean | null
          id?: string
          is_active?: boolean | null
          masjid_id?: string | null
          subdomain_slug?: string
          theme_settings?: Json | null
          updated_at?: string | null
          website_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_websites_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjids: {
        Row: {
          address: string | null
          contact_info: Json | null
          created_at: string | null
          id: string
          location: string | null
          name: string
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          location?: string | null
          name: string
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          contact_info?: Json | null
          created_at?: string | null
          id?: string
          location?: string | null
          name?: string
          verified?: boolean | null
        }
        Relationships: []
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
      product_media: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          media_type: string
          media_url: string
          product_id: string
          sort_order: number | null
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          media_type: string
          media_url: string
          product_id: string
          sort_order?: number | null
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          media_type?: string
          media_url?: string
          product_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "charity_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_pricing_tiers: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          impact_description: string | null
          name: string
          product_id: string
          sort_order: number | null
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          impact_description?: string | null
          name: string
          product_id: string
          sort_order?: number | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          impact_description?: string | null
          name?: string
          product_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_pricing_tiers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "charity_products"
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
      project_funds: {
        Row: {
          charity_id: string
          created_at: string
          id: string
          last_disbursement_date: string | null
          project_type: string
          remaining_balance: number | null
          total_allocated: number | null
          total_disbursed: number | null
          updated_at: string
        }
        Insert: {
          charity_id: string
          created_at?: string
          id?: string
          last_disbursement_date?: string | null
          project_type: string
          remaining_balance?: number | null
          total_allocated?: number | null
          total_disbursed?: number | null
          updated_at?: string
        }
        Update: {
          charity_id?: string
          created_at?: string
          id?: string
          last_disbursement_date?: string | null
          project_type?: string
          remaining_balance?: number | null
          total_allocated?: number | null
          total_disbursed?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_funds_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      push_delivery_logs: {
        Row: {
          delivered_at: string | null
          error_message: string | null
          id: string
          notification_id: string | null
          status: string
          subscription_id: string | null
        }
        Insert: {
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          notification_id?: string | null
          status: string
          subscription_id?: string | null
        }
        Update: {
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          notification_id?: string | null
          status?: string
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "push_delivery_logs_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "push_notifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "push_delivery_logs_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "push_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      push_notifications: {
        Row: {
          action_url: string | null
          actions: Json | null
          audience: string
          created_at: string | null
          created_by: string | null
          delivered_count: number | null
          failed_count: number | null
          icon_url: string | null
          id: string
          message: string
          priority: string
          require_interaction: boolean | null
          schedule_date: string | null
          scheduled: boolean | null
          sent_at: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          action_url?: string | null
          actions?: Json | null
          audience?: string
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          failed_count?: number | null
          icon_url?: string | null
          id?: string
          message: string
          priority?: string
          require_interaction?: boolean | null
          schedule_date?: string | null
          scheduled?: boolean | null
          sent_at?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          action_url?: string | null
          actions?: Json | null
          audience?: string
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          failed_count?: number | null
          icon_url?: string | null
          id?: string
          message?: string
          priority?: string
          require_interaction?: boolean | null
          schedule_date?: string | null
          scheduled?: boolean | null
          sent_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          active: boolean | null
          auth_key: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh_key: string
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          auth_key: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh_key: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          auth_key?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh_key?: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      quran_surahs: {
        Row: {
          created_at: string
          id: string
          name_arabic: string
          name_english: string
          name_transliteration: string
          revelation_place: string
          surah_number: number
          total_verses: number
        }
        Insert: {
          created_at?: string
          id?: string
          name_arabic: string
          name_english: string
          name_transliteration: string
          revelation_place: string
          surah_number: number
          total_verses: number
        }
        Update: {
          created_at?: string
          id?: string
          name_arabic?: string
          name_english?: string
          name_transliteration?: string
          revelation_place?: string
          surah_number?: number
          total_verses?: number
        }
        Relationships: []
      }
      quran_verses: {
        Row: {
          created_at: string
          id: string
          jannah_points_reward: number
          likes_count: number | null
          surah_id: string
          text_arabic: string
          text_translation: string
          text_transliteration: string
          verse_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          jannah_points_reward?: number
          likes_count?: number | null
          surah_id: string
          text_arabic: string
          text_translation: string
          text_transliteration: string
          verse_number: number
        }
        Update: {
          created_at?: string
          id?: string
          jannah_points_reward?: number
          likes_count?: number | null
          surah_id?: string
          text_arabic?: string
          text_translation?: string
          text_transliteration?: string
          verse_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "quran_verses_surah_id_fkey"
            columns: ["surah_id"]
            isOneToOne: false
            referencedRelation: "quran_surahs"
            referencedColumns: ["id"]
          },
        ]
      }
      qurbani_animals: {
        Row: {
          age_range: string | null
          animal_name: string
          animal_type: Database["public"]["Enums"]["animal_type"]
          availability_count: number | null
          charity_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_halal_certified: boolean | null
          location_id: string | null
          price_per_share: number
          total_shares: number
          updated_at: string
          weight_range: string | null
        }
        Insert: {
          age_range?: string | null
          animal_name: string
          animal_type: Database["public"]["Enums"]["animal_type"]
          availability_count?: number | null
          charity_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_halal_certified?: boolean | null
          location_id?: string | null
          price_per_share: number
          total_shares?: number
          updated_at?: string
          weight_range?: string | null
        }
        Update: {
          age_range?: string | null
          animal_name?: string
          animal_type?: Database["public"]["Enums"]["animal_type"]
          availability_count?: number | null
          charity_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_halal_certified?: boolean | null
          location_id?: string | null
          price_per_share?: number
          total_shares?: number
          updated_at?: string
          weight_range?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qurbani_animals_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qurbani_animals_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "qurbani_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      qurbani_locations: {
        Row: {
          charity_id: string | null
          coordinates: unknown | null
          country: string
          created_at: string
          id: string
          is_active: boolean | null
          local_currency: string | null
          name: string
          region: string | null
          updated_at: string
        }
        Insert: {
          charity_id?: string | null
          coordinates?: unknown | null
          country: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          local_currency?: string | null
          name: string
          region?: string | null
          updated_at?: string
        }
        Update: {
          charity_id?: string | null
          coordinates?: unknown | null
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          local_currency?: string | null
          name?: string
          region?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "qurbani_locations_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      qurbani_orders: {
        Row: {
          animal_id: string | null
          beneficiaries_fed: number | null
          charity_id: string | null
          created_at: string
          distribution_complete: boolean | null
          id: string
          location_id: string | null
          order_type: string | null
          payment_intent_id: string | null
          recipient_name: string | null
          shares_purchased: number
          slaughter_date: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["qurbani_status"] | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          animal_id?: string | null
          beneficiaries_fed?: number | null
          charity_id?: string | null
          created_at?: string
          distribution_complete?: boolean | null
          id?: string
          location_id?: string | null
          order_type?: string | null
          payment_intent_id?: string | null
          recipient_name?: string | null
          shares_purchased?: number
          slaughter_date?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["qurbani_status"] | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          animal_id?: string | null
          beneficiaries_fed?: number | null
          charity_id?: string | null
          created_at?: string
          distribution_complete?: boolean | null
          id?: string
          location_id?: string | null
          order_type?: string | null
          payment_intent_id?: string | null
          recipient_name?: string | null
          shares_purchased?: number
          slaughter_date?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["qurbani_status"] | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qurbani_orders_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "qurbani_animals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qurbani_orders_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qurbani_orders_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "qurbani_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      qurbani_settings: {
        Row: {
          created_at: string
          general_markup_percentage: number | null
          id: string
          is_active: boolean | null
          preorder_start_date: string
          qurbani_end_date: string
          qurbani_start_date: string
          season_year: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          general_markup_percentage?: number | null
          id?: string
          is_active?: boolean | null
          preorder_start_date: string
          qurbani_end_date: string
          qurbani_start_date: string
          season_year: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          general_markup_percentage?: number | null
          id?: string
          is_active?: boolean | null
          preorder_start_date?: string
          qurbani_end_date?: string
          qurbani_start_date?: string
          season_year?: number
          updated_at?: string
        }
        Relationships: []
      }
      ramadan_calendar_days: {
        Row: {
          background_color: string | null
          bonus_points: number | null
          created_at: string
          day_number: number
          description: string | null
          dua_text: string | null
          dua_translation: string | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          sadaqah_coin_cost: number
          special_reward: string | null
          title: string
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          bonus_points?: number | null
          created_at?: string
          day_number: number
          description?: string | null
          dua_text?: string | null
          dua_translation?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          sadaqah_coin_cost?: number
          special_reward?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          bonus_points?: number | null
          created_at?: string
          day_number?: number
          description?: string | null
          dua_text?: string | null
          dua_translation?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          sadaqah_coin_cost?: number
          special_reward?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ramadan_calendar_progress: {
        Row: {
          bonus_points_earned: number | null
          calendar_day_id: string | null
          completed_at: string
          created_at: string
          id: string
          sadaqah_coins_spent: number
          user_id: string | null
        }
        Insert: {
          bonus_points_earned?: number | null
          calendar_day_id?: string | null
          completed_at?: string
          created_at?: string
          id?: string
          sadaqah_coins_spent: number
          user_id?: string | null
        }
        Update: {
          bonus_points_earned?: number | null
          calendar_day_id?: string | null
          completed_at?: string
          created_at?: string
          id?: string
          sadaqah_coins_spent?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ramadan_calendar_progress_calendar_day_id_fkey"
            columns: ["calendar_day_id"]
            isOneToOne: false
            referencedRelation: "ramadan_calendar_days"
            referencedColumns: ["id"]
          },
        ]
      }
      ramadan_calendar_settings: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          ramadan_end_date: string
          ramadan_start_date: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          ramadan_end_date: string
          ramadan_start_date: string
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          ramadan_end_date?: string
          ramadan_start_date?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      stream_chat_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          message_type: string | null
          stream_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          message_type?: string | null
          stream_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          message_type?: string | null
          stream_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stream_chat_messages_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "live_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_reactions: {
        Row: {
          created_at: string | null
          id: string
          reaction_type: string
          stream_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          reaction_type: string
          stream_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          reaction_type?: string
          stream_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stream_reactions_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "live_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          personal_raised: number | null
          personal_target: number | null
          role: Database["public"]["Enums"]["team_role"] | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          personal_raised?: number | null
          personal_target?: number | null
          role?: Database["public"]["Enums"]["team_role"] | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          personal_raised?: number | null
          personal_target?: number | null
          role?: Database["public"]["Enums"]["team_role"] | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "fundraising_teams"
            referencedColumns: ["id"]
          },
        ]
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
      user_check_ins: {
        Row: {
          check_in_time: string | null
          created_at: string | null
          id: string
          jannah_points_earned: number | null
          location_id: string | null
          notes: string | null
          user_id: string | null
        }
        Insert: {
          check_in_time?: string | null
          created_at?: string | null
          id?: string
          jannah_points_earned?: number | null
          location_id?: string | null
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          check_in_time?: string | null
          created_at?: string | null
          id?: string
          jannah_points_earned?: number | null
          location_id?: string | null
          notes?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_check_ins_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "check_in_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_dhikr_achievements: {
        Row: {
          achievement_id: string | null
          earned_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          earned_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          earned_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_dhikr_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "dhikr_achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_verse_progress: {
        Row: {
          completed_at: string
          id: string
          jannah_points_earned: number
          user_id: string
          verse_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          jannah_points_earned?: number
          user_id: string
          verse_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          jannah_points_earned?: number
          user_id?: string
          verse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_verse_progress_verse_id_fkey"
            columns: ["verse_id"]
            isOneToOne: false
            referencedRelation: "quran_verses"
            referencedColumns: ["id"]
          },
        ]
      }
      utm_tracking: {
        Row: {
          created_at: string | null
          device_fingerprint: Json | null
          first_touch_timestamp: string | null
          id: string
          landing_page: string | null
          last_touch_timestamp: string | null
          referrer: string | null
          session_id: string
          user_id: string | null
          utm_campaign: string | null
          utm_charity: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          created_at?: string | null
          device_fingerprint?: Json | null
          first_touch_timestamp?: string | null
          id?: string
          landing_page?: string | null
          last_touch_timestamp?: string | null
          referrer?: string | null
          session_id: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_charity?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          created_at?: string | null
          device_fingerprint?: Json | null
          first_touch_timestamp?: string | null
          id?: string
          landing_page?: string | null
          last_touch_timestamp?: string | null
          referrer?: string | null
          session_id?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_charity?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      verse_likes: {
        Row: {
          created_at: string
          id: string
          user_id: string
          verse_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
          verse_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
          verse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verse_likes_verse_id_fkey"
            columns: ["verse_id"]
            isOneToOne: false
            referencedRelation: "quran_verses"
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
      check_kids_daily_spending_limit: {
        Args: { p_kids_account_id: string; p_amount_coins: number }
        Returns: boolean
      }
      create_bulk_disbursement: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      disable_rls_for_testing: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      enable_rls_for_production: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      enable_rls_for_seeding_tables: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_user_role: {
        Args: { user_uuid?: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      process_donation_attribution: {
        Args: {
          p_donation_id: string
          p_user_id?: string
          p_session_id?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      animal_type: "sheep" | "goat" | "cow" | "buffalo" | "camel"
      campaign_status: "draft" | "active" | "paused" | "completed" | "cancelled"
      check_in_location_type:
        | "masjid"
        | "family_home"
        | "muslim_business"
        | "islamic_center"
        | "halal_restaurant"
        | "islamic_school"
        | "community_center"
        | "charity_office"
      donation_status:
        | "pending"
        | "completed"
        | "failed"
        | "refunded"
        | "sent_to_charity"
      fundraiser_status: "draft" | "active" | "completed" | "cancelled"
      pricing_model: "fixed" | "minimum" | "suggested" | "free_choice"
      product_type:
        | "fixed_price"
        | "flexible_amount"
        | "subscription"
        | "cause_campaign"
      qurbani_status:
        | "preorder"
        | "confirmed"
        | "slaughtered"
        | "distributed"
        | "completed"
      team_role: "leader" | "member" | "admin"
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
      animal_type: ["sheep", "goat", "cow", "buffalo", "camel"],
      campaign_status: ["draft", "active", "paused", "completed", "cancelled"],
      check_in_location_type: [
        "masjid",
        "family_home",
        "muslim_business",
        "islamic_center",
        "halal_restaurant",
        "islamic_school",
        "community_center",
        "charity_office",
      ],
      donation_status: [
        "pending",
        "completed",
        "failed",
        "refunded",
        "sent_to_charity",
      ],
      fundraiser_status: ["draft", "active", "completed", "cancelled"],
      pricing_model: ["fixed", "minimum", "suggested", "free_choice"],
      product_type: [
        "fixed_price",
        "flexible_amount",
        "subscription",
        "cause_campaign",
      ],
      qurbani_status: [
        "preorder",
        "confirmed",
        "slaughtered",
        "distributed",
        "completed",
      ],
      team_role: ["leader", "member", "admin"],
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
