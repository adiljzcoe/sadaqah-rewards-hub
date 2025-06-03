
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

export const useSiteConfig = (configKey?: string) => {
  return useQuery({
    queryKey: ['site-config', configKey],
    queryFn: async () => {
      console.log('Fetching site config:', configKey);
      
      if (configKey) {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .eq('config_key', configKey)
          .single();

        if (error) {
          console.error('Error fetching site config:', error);
          throw error;
        }

        console.log('Fetched site config:', data);
        return data as SiteConfig;
      } else {
        const { data, error } = await supabase
          .from('site_config')
          .select('*');

        if (error) {
          console.error('Error fetching site config:', error);
          throw error;
        }

        console.log('Fetched site config:', data);
        return (data || []) as SiteConfig[];
      }
    },
  });
};

export const usePublicSiteConfig = () => {
  return useQuery({
    queryKey: ['public-site-config'],
    queryFn: async () => {
      console.log('Fetching public site config');
      
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .eq('is_public', true);

      if (error) {
        console.error('Error fetching public site config:', error);
        throw error;
      }

      console.log('Fetched public site config:', data);
      
      // Convert to object for easier access
      const configObject = (data || []).reduce((acc: any, config: any) => {
        let value = config.config_value;
        
        // Parse JSON values
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
