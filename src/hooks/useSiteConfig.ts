
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteConfig {
  id: string;
  config_key: string;
  config_value: any;
  config_type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  is_public: boolean;
  description: string;
  category: string;
}

// Mock data for site config since the table doesn't exist yet
const mockSiteConfig: SiteConfig[] = [
  {
    id: '1',
    config_key: 'site_name',
    config_value: 'Islamic Charity Platform',
    config_type: 'string',
    is_public: true,
    description: 'The name of the website',
    category: 'general'
  },
  {
    id: '2',
    config_key: 'maintenance_mode',
    config_value: false,
    config_type: 'boolean',
    is_public: false,
    description: 'Whether the site is in maintenance mode',
    category: 'system'
  },
  {
    id: '3',
    config_key: 'max_donation_amount',
    config_value: 10000,
    config_type: 'number',
    is_public: true,
    description: 'Maximum donation amount allowed',
    category: 'donations'
  }
];

export const useSiteConfig = (configKey?: string) => {
  return useQuery({
    queryKey: ['site-config', configKey],
    queryFn: async () => {
      console.log('Fetching site config (mock data):', configKey);
      
      if (configKey) {
        const config = mockSiteConfig.find(c => c.config_key === configKey);
        if (!config) {
          throw new Error('Config not found');
        }
        console.log('Fetched site config:', config);
        return config;
      } else {
        console.log('Fetched site config:', mockSiteConfig);
        return mockSiteConfig;
      }
    },
  });
};

export const usePublicSiteConfig = () => {
  return useQuery({
    queryKey: ['public-site-config'],
    queryFn: async () => {
      console.log('Fetching public site config (mock data)');
      
      const publicConfigs = mockSiteConfig.filter(config => config.is_public);
      
      // Convert to object for easier access
      const configObject = publicConfigs.reduce((acc: any, config: any) => {
        let value = config.config_value;
        
        // Parse JSON values if needed
        if (typeof value === 'string') {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // Keep as string if not valid JSON
          }
        }
        
        acc[config.config_key] = value;
        return acc;
      }, {} as Record<string, any>);

      return configObject;
    },
  });
};
