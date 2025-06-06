
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SubdomainData {
  subdomain: string;
  isSubdomain: boolean;
  masjidWebsite?: any;
  customDomain?: string;
}

export const useSubdomainDetection = () => {
  const [subdomainData, setSubdomainData] = useState<SubdomainData>({
    subdomain: '',
    isSubdomain: false
  });

  useEffect(() => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    // Check if it's a subdomain (more than 2 parts for .com domains)
    if (parts.length > 2 && !hostname.includes('localhost')) {
      const subdomain = parts[0];
      setSubdomainData({
        subdomain,
        isSubdomain: true
      });
    } else {
      setSubdomainData({
        subdomain: '',
        isSubdomain: false
      });
    }
  }, []);

  // Fetch masjid website data based on subdomain or custom domain
  const { data: masjidWebsite, isLoading } = useQuery({
    queryKey: ['masjid-website', subdomainData.subdomain, window.location.hostname],
    queryFn: async () => {
      if (!subdomainData.isSubdomain && !subdomainData.customDomain) return null;

      const { data, error } = await supabase
        .from('masjid_websites')
        .select(`
          *,
          masjids (
            id,
            name,
            location,
            address,
            verified,
            contact_info
          )
        `)
        .or(`subdomain_slug.eq.${subdomainData.subdomain},custom_domain.eq.${window.location.hostname}`)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: subdomainData.isSubdomain || !!subdomainData.customDomain
  });

  return {
    ...subdomainData,
    masjidWebsite,
    isLoading
  };
};
