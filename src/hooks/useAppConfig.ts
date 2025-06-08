
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AppSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type?: string;
  description?: string;
  category?: string;
  is_public?: boolean;
}

export interface ContentItem {
  id: string;
  content_key: string;
  content_value: string;
  content_type?: string;
  component_name?: string;
  description?: string;
}

export interface BusinessRule {
  id: string;
  rule_key: string;
  rule_value: any;
  rule_type: string;
  component_name?: string;
  description?: string;
  is_active?: boolean;
}

export const useAppSettings = () => {
  return useQuery({
    queryKey: ['app-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*');
      
      if (error) {
        console.log('Using fallback settings due to:', error);
        // Fallback to hardcoded values if database is not available
        return [
          { setting_key: 'app_name', setting_value: 'Your Jannah' },
          { setting_key: 'default_currency', setting_value: 'GBP' },
          { setting_key: 'currency_symbol', setting_value: '£' },
          { setting_key: 'minimum_donation', setting_value: '100' },
          { setting_key: 'maximum_donation', setting_value: '1000000' },
          { setting_key: 'vip_threshold', setting_value: '100000' },
          { setting_key: 'default_jannah_points_rate', setting_value: '10' },
          { setting_key: 'default_sadaqah_coins_rate', setting_value: '5' }
        ];
      }
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export const useContent = () => {
  return useQuery({
    queryKey: ['content-management'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_management')
        .select('*');
      
      if (error) {
        console.log('Using fallback content due to:', error);
        // Fallback to hardcoded values
        return [
          { content_key: 'donate_button_text', content_value: 'Donate Now' },
          { content_key: 'loading_text', content_value: 'Loading...' },
          { content_key: 'error_generic', content_value: 'Something went wrong. Please try again.' },
          { content_key: 'no_data_message', content_value: 'No data available' },
          { content_key: 'success_donation', content_value: 'Thank you for your donation!' },
          { content_key: 'form_required_field', content_value: 'This field is required' },
          { content_key: 'mosque_leagues_title', content_value: 'Mosque & Madrassah Leagues' },
          { content_key: 'admin_dashboard_title', content_value: 'Admin Dashboard' }
        ];
      }
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useBusinessRules = () => {
  return useQuery({
    queryKey: ['business-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_rules')
        .select('*')
        .eq('is_active', true);
      
      if (error) {
        console.log('Using fallback business rules due to:', error);
        // Fallback to hardcoded values
        return [
          { 
            rule_key: 'donation_limits', 
            rule_value: { min: 100, max: 1000000, currency: 'pence' },
            rule_type: 'validation'
          },
          { 
            rule_key: 'user_segments', 
            rule_value: { active_days: 30, dormant_days: 90, new_user_days: 7, vip_threshold: 100000 },
            rule_type: 'calculation'
          },
          { 
            rule_key: 'reward_rates', 
            rule_value: { jannah_points_per_pound: 10, sadaqah_coins_per_pound: 5 },
            rule_type: 'calculation'
          }
        ];
      }
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
