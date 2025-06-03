
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useFundraising = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get user's campaigns
  const useUserCampaigns = () => {
    return useQuery({
      queryKey: ['user-campaigns', user?.id],
      queryFn: async () => {
        if (!user) return [];
        
        const { data, error } = await supabase
          .from('fundraising_campaigns')
          .select(`
            *,
            fundraising_teams(
              id,
              team_name,
              team_raised,
              team_target,
              team_members(
                id,
                profiles:user_id(full_name, avatar_url),
                personal_raised
              )
            ),
            fundraising_donations(
              id,
              amount,
              donor_name,
              message,
              created_at
            )
          `)
          .eq('created_by', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
      },
      enabled: !!user,
    });
  };

  // Get campaign by share code
  const useCampaignByShareCode = (shareCode: string) => {
    return useQuery({
      queryKey: ['campaign-share', shareCode],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('fundraising_campaigns')
          .select(`
            *,
            profiles:created_by(full_name, avatar_url),
            masjids(name, location),
            fundraising_teams(
              id,
              team_name,
              team_raised,
              team_target,
              team_members(
                id,
                profiles:user_id(full_name, avatar_url),
                personal_raised,
                personal_target
              )
            ),
            fundraising_donations(
              id,
              amount,
              donor_name,
              message,
              is_anonymous,
              created_at
            )
          `)
          .eq('share_code', shareCode)
          .eq('status', 'active')
          .single();
        
        if (error) throw error;
        return data;
      },
      enabled: !!shareCode,
    });
  };

  // Join team mutation
  const useJoinTeam = () => {
    return useMutation({
      mutationFn: async ({ teamId, personalTarget }: { teamId: string; personalTarget?: number }) => {
        if (!user) throw new Error('Must be logged in');

        const { data, error } = await supabase
          .from('team_members')
          .insert({
            team_id: teamId,
            user_id: user.id,
            personal_target: personalTarget,
            role: 'member',
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        toast.success('Successfully joined the team!');
        queryClient.invalidateQueries({ queryKey: ['campaign-share'] });
      },
      onError: (error) => {
        toast.error('Failed to join team: ' + error.message);
      },
    });
  };

  // Create donation mutation
  const useCreateDonation = () => {
    return useMutation({
      mutationFn: async (donationData: {
        campaign_id: string;
        team_id?: string;
        amount: number;
        donor_name?: string;
        message?: string;
        is_anonymous?: boolean;
        gift_aid?: boolean;
      }) => {
        const { data, error } = await supabase
          .from('fundraising_donations')
          .insert({
            ...donationData,
            donor_user_id: user?.id,
            payment_status: 'completed', // In real app, this would be pending until payment confirmed
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        toast.success('Donation submitted successfully!');
        queryClient.invalidateQueries({ queryKey: ['fundraising-campaigns'] });
        queryClient.invalidateQueries({ queryKey: ['campaign-share'] });
      },
      onError: (error) => {
        toast.error('Failed to process donation: ' + error.message);
      },
    });
  };

  // Update campaign mutation
  const useUpdateCampaign = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
        const { data, error } = await supabase
          .from('fundraising_campaigns')
          .update(updates)
          .eq('id', id)
          .eq('created_by', user?.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        toast.success('Campaign updated successfully!');
        queryClient.invalidateQueries({ queryKey: ['user-campaigns'] });
        queryClient.invalidateQueries({ queryKey: ['fundraising-campaigns'] });
      },
      onError: (error) => {
        toast.error('Failed to update campaign: ' + error.message);
      },
    });
  };

  return {
    useUserCampaigns,
    useCampaignByShareCode,
    useJoinTeam,
    useCreateDonation,
    useUpdateCampaign,
  };
};
