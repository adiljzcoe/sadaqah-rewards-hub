
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export function useDonations() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: platformSettings } = useQuery({
    queryKey: ['platform-settings'],
    queryFn: async () => {
      const { data } = await supabase
        .from('admin_settings')
        .select('setting_key, setting_value')
        .eq('setting_key', 'sandbox_mode');
      
      if (data && data.length > 0) {
        return JSON.parse(data[0].setting_value);
      }
      return false; // Default to live mode if not configured
    },
  });

  const { data: donations, isLoading } = useQuery({
    queryKey: ['donations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('donations')
        .select(`
          *,
          charities(name, logo_url),
          campaigns(title)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const createDonation = useMutation({
    mutationFn: async (donationData: {
      charity_id: string;
      campaign_id?: string;
      amount: number;
      message?: string;
      anonymous?: boolean;
    }) => {
      if (!user?.id) throw new Error('Must be logged in to donate');
      if (!profile) throw new Error('Profile not loaded');

      const sandboxMode = platformSettings || false;
      console.log(`Creating donation in ${sandboxMode ? 'test' : 'live'} mode`);

      // Calculate points and coins
      const jannahPoints = Math.floor(donationData.amount * 10); // 10 points per £1
      const sadaqahCoins = Math.floor(donationData.amount * 5); // 5 coins per £1

      const { data, error } = await supabase
        .from('donations')
        .insert({
          ...donationData,
          user_id: user.id,
          jannah_points_earned: jannahPoints,
          sadaqah_coins_earned: sadaqahCoins,
          status: 'completed', // In real app, this would be 'pending' until payment processed
        })
        .select()
        .single();

      if (error) throw error;

      // Update user profile with new points and coins
      await supabase
        .from('profiles')
        .update({
          jannah_points: (profile.jannah_points || 0) + jannahPoints,
          sadaqah_coins: (profile.sadaqah_coins || 0) + sadaqahCoins,
          total_donated: (profile.total_donated || 0) + donationData.amount,
          donation_count: (profile.donation_count || 0) + 1,
          last_donation_date: new Date().toISOString(),
        })
        .eq('id', user.id);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      
      const sandboxMode = platformSettings || false;
      toast({
        title: `Donation successful! 🎉 ${sandboxMode ? '(Test Mode)' : ''}`,
        description: `Thank you for your generosity. Your donation has been processed${sandboxMode ? ' in test mode' : ''}.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Donation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    donations,
    isLoading,
    createDonation: createDonation.mutate,
    isCreatingDonation: createDonation.isPending,
    profile,
    sandboxMode: platformSettings || false,
  };
}
