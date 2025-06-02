
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export function useMasjidAffiliation() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userMasjid, isLoading } = useQuery({
    queryKey: ['userMasjid', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('primary_masjid_id')
        .eq('id', user.id)
        .single();
      
      if (profileError) throw profileError;
      
      if (!profileData?.primary_masjid_id) return null;
      
      const { data: masjidData, error: masjidError } = await supabase
        .from('masjid_profiles')
        .select('*')
        .eq('id', profileData.primary_masjid_id)
        .single();
      
      if (masjidError) throw masjidError;
      return masjidData;
    },
    enabled: !!user?.id,
  });

  const affiliateWithMasjid = useMutation({
    mutationFn: async ({ masjidId, referralCode }: { masjidId: string; referralCode?: string }) => {
      if (!user?.id) throw new Error('Must be logged in');

      // Update user's primary masjid
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ primary_masjid_id: masjidId })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Create affiliation record
      const { data, error } = await supabase
        .from('user_masjid_affiliations')
        .upsert({
          user_id: user.id,
          masjid_id: masjidId,
          referral_source: referralCode ? 'referral_code' : 'direct'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMasjid', user?.id] });
      toast({
        title: "Masjid Connected! 🕌",
        description: "You are now part of your masjid community. Your donations will help them earn rewards!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Connection failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createCommission = useMutation({
    mutationFn: async ({
      masjidId,
      sourceType,
      sourceId,
      baseAmount
    }: {
      masjidId: string;
      sourceType: 'membership' | 'donation';
      sourceId: string;
      baseAmount: number;
    }) => {
      if (!user?.id) throw new Error('Must be logged in');

      const { data, error } = await supabase.rpc('create_masjid_commission', {
        p_masjid_id: masjidId,
        p_user_id: user.id,
        p_source_type: sourceType,
        p_source_id: sourceId,
        p_base_amount: baseAmount
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Commission Created! 💰",
        description: "Your masjid has earned a commission from your activity.",
      });
    },
  });

  return {
    userMasjid,
    isLoading,
    affiliateWithMasjid: affiliateWithMasjid.mutate,
    isAffiliating: affiliateWithMasjid.isPending,
    createCommission: createCommission.mutate,
    isCreatingCommission: createCommission.isPending,
  };
}
