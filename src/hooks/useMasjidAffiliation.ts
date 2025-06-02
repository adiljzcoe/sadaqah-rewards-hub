
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface Masjid {
  id: string;
  name: string;
  city: string;
  country: string;
  verified: boolean;
  total_referrals: number;
  total_earnings: number;
}

export function useMasjidAffiliation() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userMasjid, isLoading } = useQuery({
    queryKey: ['userMasjid', user?.id],
    queryFn: async (): Promise<Masjid | null> => {
      if (!user?.id) return null;
      
      // Using test data since the tables might not be in types yet
      return {
        id: '1',
        name: 'Central London Mosque',
        city: 'London',
        country: 'UK',
        verified: true,
        total_referrals: 245,
        total_earnings: 1250.50
      };
    },
    enabled: !!user?.id,
  });

  const affiliateWithMasjid = useMutation({
    mutationFn: async ({ masjidId, referralCode }: { masjidId: string; referralCode?: string }) => {
      if (!user?.id) throw new Error('Must be logged in');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
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

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, commissionAmount: baseAmount * 0.1 };
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
