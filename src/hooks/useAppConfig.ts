
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
    queryFn: async (): Promise<AppSetting[]> => {
      try {
        // Try to query the admin_settings table that exists
        const { data, error } = await supabase
          .from('admin_settings')
          .select('id, setting_key, setting_value, created_at, updated_at');
        
        if (error) {
          console.log('Using fallback settings due to:', error);
          return getFallbackSettings();
        }
        
        // Transform admin_settings to AppSetting format
        const transformedData = data?.map(setting => ({
          id: setting.id,
          setting_key: setting.setting_key,
          setting_value: setting.setting_value,
          setting_type: 'string',
          description: '',
          category: 'general',
          is_public: true
        })) || [];
        
        // Merge with fallback settings for missing keys
        const fallbackSettings = getFallbackSettings();
        const existingKeys = transformedData.map(s => s.setting_key);
        const missingSettings = fallbackSettings.filter(s => !existingKeys.includes(s.setting_key));
        
        return [...transformedData, ...missingSettings];
      } catch (error) {
        console.log('Using fallback settings due to error:', error);
        return getFallbackSettings();
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export const useContent = () => {
  return useQuery({
    queryKey: ['content-management'],
    queryFn: async (): Promise<ContentItem[]> => {
      // Since content_management table doesn't exist, return fallback content
      console.log('Using fallback content - content_management table not available');
      return getFallbackContent();
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useBusinessRules = () => {
  return useQuery({
    queryKey: ['business-rules'],
    queryFn: async (): Promise<BusinessRule[]> => {
      // Since business_rules table doesn't exist, return fallback rules
      console.log('Using fallback business rules - business_rules table not available');
      return getFallbackBusinessRules();
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Fallback data functions
const getFallbackSettings = (): AppSetting[] => [
  { id: '1', setting_key: 'app_name', setting_value: 'Your Jannah', setting_type: 'string', description: 'Application name', category: 'general', is_public: true },
  { id: '2', setting_key: 'default_currency', setting_value: 'GBP', setting_type: 'string', description: 'Default currency', category: 'general', is_public: true },
  { id: '3', setting_key: 'currency_symbol', setting_value: '£', setting_type: 'string', description: 'Currency symbol', category: 'general', is_public: true },
  { id: '4', setting_key: 'minimum_donation', setting_value: '100', setting_type: 'number', description: 'Minimum donation in pence', category: 'donations', is_public: true },
  { id: '5', setting_key: 'maximum_donation', setting_value: '1000000', setting_type: 'number', description: 'Maximum donation in pence', category: 'donations', is_public: true },
  { id: '6', setting_key: 'vip_threshold', setting_value: '100000', setting_type: 'number', description: 'VIP donor threshold in pence', category: 'donations', is_public: true },
  { id: '7', setting_key: 'default_jannah_points_rate', setting_value: '10', setting_type: 'number', description: 'Jannah points per pound', category: 'rewards', is_public: true },
  { id: '8', setting_key: 'default_sadaqah_coins_rate', setting_value: '5', setting_type: 'number', description: 'Sadaqah coins per pound', category: 'rewards', is_public: true }
];

const getFallbackContent = (): ContentItem[] => [
  { id: '1', content_key: 'donate_button_text', content_value: 'Donate Now', content_type: 'text', component_name: 'DonateButton', description: 'Main donation button text' },
  { id: '2', content_key: 'loading_text', content_value: 'Loading...', content_type: 'text', component_name: 'Global', description: 'Generic loading message' },
  { id: '3', content_key: 'error_generic', content_value: 'Something went wrong. Please try again.', content_type: 'text', component_name: 'Global', description: 'Generic error message' },
  { id: '4', content_key: 'no_data_message', content_value: 'No data available', content_type: 'text', component_name: 'Global', description: 'No data message' },
  { id: '5', content_key: 'success_donation', content_value: 'Thank you for your donation!', content_type: 'text', component_name: 'DonationSuccess', description: 'Donation success message' },
  { id: '6', content_key: 'form_required_field', content_value: 'This field is required', content_type: 'text', component_name: 'Forms', description: 'Required field validation message' },
  { id: '7', content_key: 'mosque_leagues_title', content_value: 'Mosque & Madrassah Leagues', content_type: 'text', component_name: 'MosqueLeagues', description: 'Mosque leagues page title' },
  { id: '8', content_key: 'admin_dashboard_title', content_value: 'Admin Dashboard', content_type: 'text', component_name: 'AdminDashboard', description: 'Admin dashboard page title' }
];

const getFallbackBusinessRules = (): BusinessRule[] => [
  { 
    id: '1',
    rule_key: 'donation_limits', 
    rule_value: { min: 100, max: 1000000, currency: 'pence' },
    rule_type: 'validation',
    component_name: 'DonationForm',
    description: 'Donation amount validation limits',
    is_active: true
  },
  { 
    id: '2',
    rule_key: 'user_segments', 
    rule_value: { active_days: 30, dormant_days: 90, new_user_days: 7, vip_threshold: 100000 },
    rule_type: 'calculation',
    component_name: 'UserManagement',
    description: 'User segmentation thresholds',
    is_active: true
  },
  { 
    id: '3',
    rule_key: 'reward_rates', 
    rule_value: { jannah_points_per_pound: 10, sadaqah_coins_per_pound: 5 },
    rule_type: 'calculation',
    component_name: 'RewardSystem',
    description: 'Reward calculation rates',
    is_active: true
  }
];
