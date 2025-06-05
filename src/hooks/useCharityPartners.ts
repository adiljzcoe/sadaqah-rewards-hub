
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useCharityPartners = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get all charity partners
  const useCharityPartnersList = () => {
    return useQuery({
      queryKey: ['charity-partners'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('charity_partners')
          .select(`
            *,
            charities(id, name, logo_url, description)
          `)
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
      },
    });
  };

  // Get charity partner by slug
  const useCharityPartnerBySlug = (slug: string) => {
    return useQuery({
      queryKey: ['charity-partner', slug],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('charity_partners')
          .select(`
            *,
            charities(
              id, name, logo_url, description, website_url,
              charity_products(*)
            )
          `)
          .eq('partner_slug', slug)
          .eq('is_active', true)
          .single();
        
        if (error) throw error;
        return data;
      },
      enabled: !!slug,
    });
  };

  // Get charity partner revenue analytics
  const useCharityPartnerRevenue = (charityPartnerId: string, timeframe = '30d') => {
    return useQuery({
      queryKey: ['charity-partner-revenue', charityPartnerId, timeframe],
      queryFn: async () => {
        const daysBack = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysBack);

        const { data, error } = await supabase
          .from('charity_revenue_tracking')
          .select(`
            *,
            donations(created_at, amount),
            utm_tracking(utm_source, utm_medium, utm_campaign)
          `)
          .eq('charity_partner_id', charityPartnerId)
          .gte('processed_at', startDate.toISOString())
          .order('processed_at', { ascending: false });
        
        if (error) throw error;
        return data;
      },
      enabled: !!charityPartnerId,
    });
  };

  // Get charity ad campaigns
  const useCharityAdCampaigns = (charityPartnerId: string) => {
    return useQuery({
      queryKey: ['charity-ad-campaigns', charityPartnerId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('charity_ad_campaigns')
          .select('*')
          .eq('charity_partner_id', charityPartnerId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
      },
      enabled: !!charityPartnerId,
    });
  };

  // Create charity ad campaign
  const useCreateAdCampaign = () => {
    return useMutation({
      mutationFn: async (campaignData: {
        charity_partner_id: string;
        campaign_name: string;
        platform: string;
        budget_allocated: number;
        target_audience?: any;
        utm_parameters?: any;
        start_date?: string;
        end_date?: string;
      }) => {
        const { data, error } = await supabase
          .from('charity_ad_campaigns')
          .insert(campaignData)
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        toast.success('Ad campaign created successfully!');
        queryClient.invalidateQueries({ queryKey: ['charity-ad-campaigns'] });
      },
      onError: (error) => {
        toast.error('Failed to create campaign: ' + error.message);
      },
    });
  };

  // Update campaign status
  const useUpdateCampaignStatus = () => {
    return useMutation({
      mutationFn: async ({ campaignId, status }: { campaignId: string; status: string }) => {
        const { data, error } = await supabase
          .from('charity_ad_campaigns')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', campaignId)
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        toast.success('Campaign status updated!');
        queryClient.invalidateQueries({ queryKey: ['charity-ad-campaigns'] });
      },
      onError: (error) => {
        toast.error('Failed to update campaign: ' + error.message);
      },
    });
  };

  return {
    useCharityPartnersList,
    useCharityPartnerBySlug,
    useCharityPartnerRevenue,
    useCharityAdCampaigns,
    useCreateAdCampaign,
    useUpdateCampaignStatus,
  };
};
