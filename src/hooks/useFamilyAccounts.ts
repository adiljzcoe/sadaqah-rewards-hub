
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface FamilyAccount {
  id: string;
  family_name: string;
  parent_user_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface KidsAccount {
  id: string;
  family_id: string;
  child_name: string;
  age?: number;
  sadaqah_coins: number;
  jannah_points: number;
  spending_limit_daily: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface KidsDonation {
  id: string;
  kids_account_id: string;
  charity_id: string;
  amount_coins: number;
  message?: string;
  jannah_points_earned: number;
  created_at: string;
  donation_date: string;
  charities?: { name: string; logo_url?: string };
}

interface FamilyTopup {
  id: string;
  family_id: string;
  kids_account_id: string;
  parent_user_id: string;
  sadaqah_coins_added: number;
  jannah_points_added: number;
  amount_paid?: number;
  currency: string;
  topup_reason?: string;
  created_at: string;
}

export const useFamilyAccounts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get family account for current user
  const { data: familyAccount, isLoading: loadingFamily } = useQuery({
    queryKey: ['family-account', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('family_accounts')
        .select('*')
        .eq('parent_user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as FamilyAccount | null;
    },
    enabled: !!user?.id,
  });

  // Get kids accounts for family
  const { data: kidsAccounts, isLoading: loadingKids } = useQuery({
    queryKey: ['kids-accounts', familyAccount?.id],
    queryFn: async () => {
      if (!familyAccount?.id) return [];
      
      const { data, error } = await supabase
        .from('kids_accounts')
        .select('*')
        .eq('family_id', familyAccount.id)
        .eq('is_active', true)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as KidsAccount[];
    },
    enabled: !!familyAccount?.id,
  });

  // Create family account
  const createFamily = useMutation({
    mutationFn: async (familyName: string) => {
      if (!user?.id) throw new Error('Must be logged in');
      
      const { data, error } = await supabase
        .from('family_accounts')
        .insert({
          family_name: familyName,
          parent_user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as FamilyAccount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family-account'] });
      toast({
        title: "Family account created! 👨‍👩‍👧‍👦",
        description: "You can now create kids accounts and manage their donations.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create family account",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Create kids account
  const createKidsAccount = useMutation({
    mutationFn: async (data: { childName: string; age?: number; spendingLimit?: number }) => {
      if (!familyAccount?.id) throw new Error('Family account required');
      
      const { data: newAccount, error } = await supabase
        .from('kids_accounts')
        .insert({
          family_id: familyAccount.id,
          child_name: data.childName,
          age: data.age,
          spending_limit_daily: data.spendingLimit || 100,
        })
        .select()
        .single();
      
      if (error) throw error;
      return newAccount as KidsAccount;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kids-accounts'] });
      toast({
        title: "Kids account created! 🧒",
        description: "Your child can now make micro donations with their sadaqah coins.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create kids account",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Top up kids account
  const topupKidsAccount = useMutation({
    mutationFn: async (data: {
      kidsAccountId: string;
      sadaqahCoins: number;
      jannahPoints: number;
      amountPaid?: number;
      reason?: string;
    }) => {
      if (!familyAccount?.id || !user?.id) throw new Error('Family account and user required');
      
      // Update kids account balance
      const { error: updateError } = await supabase
        .from('kids_accounts')
        .update({
          sadaqah_coins: supabase.raw(`sadaqah_coins + ${data.sadaqahCoins}`),
          jannah_points: supabase.raw(`jannah_points + ${data.jannahPoints}`),
        })
        .eq('id', data.kidsAccountId);
      
      if (updateError) throw updateError;

      // Record topup transaction
      const { data: topup, error: topupError } = await supabase
        .from('family_topups')
        .insert({
          family_id: familyAccount.id,
          kids_account_id: data.kidsAccountId,
          parent_user_id: user.id,
          sadaqah_coins_added: data.sadaqahCoins,
          jannah_points_added: data.jannahPoints,
          amount_paid: data.amountPaid,
          topup_reason: data.reason,
        })
        .select()
        .single();
      
      if (topupError) throw topupError;
      return topup as FamilyTopup;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kids-accounts'] });
      toast({
        title: "Account topped up! 💰",
        description: "Your child's account has been updated with new coins and points.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Topup failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    familyAccount,
    kidsAccounts,
    isLoading: loadingFamily || loadingKids,
    createFamily: createFamily.mutate,
    isCreatingFamily: createFamily.isPending,
    createKidsAccount: createKidsAccount.mutate,
    isCreatingKidsAccount: createKidsAccount.isPending,
    topupKidsAccount: topupKidsAccount.mutate,
    isToppping: topupKidsAccount.isPending,
  };
};

export const useKidsDonations = (kidsAccountId?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get kids donations
  const { data: donations, isLoading } = useQuery({
    queryKey: ['kids-donations', kidsAccountId],
    queryFn: async () => {
      if (!kidsAccountId) return [];
      
      const { data, error } = await supabase
        .from('kids_donations')
        .select(`
          *,
          charities(name, logo_url)
        `)
        .eq('kids_account_id', kidsAccountId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as KidsDonation[];
    },
    enabled: !!kidsAccountId,
  });

  // Make kids donation
  const makeDonation = useMutation({
    mutationFn: async (data: {
      charityId: string;
      amountCoins: number;
      message?: string;
    }) => {
      if (!kidsAccountId) throw new Error('Kids account required');
      
      // Check spending limit
      const { data: canSpend, error: limitError } = await supabase
        .rpc('check_kids_daily_spending_limit', {
          p_kids_account_id: kidsAccountId,
          p_amount_coins: data.amountCoins,
        });
      
      if (limitError) throw limitError;
      if (!canSpend) throw new Error('Daily spending limit exceeded');

      // Check account balance
      const { data: account, error: accountError } = await supabase
        .from('kids_accounts')
        .select('sadaqah_coins')
        .eq('id', kidsAccountId)
        .single();
      
      if (accountError) throw accountError;
      if (account.sadaqah_coins < data.amountCoins) {
        throw new Error('Insufficient sadaqah coins');
      }

      // Calculate jannah points (1 point per 10 coins)
      const jannahPointsEarned = Math.floor(data.amountCoins / 10);

      // Deduct coins and add points
      const { error: updateError } = await supabase
        .from('kids_accounts')
        .update({
          sadaqah_coins: supabase.raw(`sadaqah_coins - ${data.amountCoins}`),
          jannah_points: supabase.raw(`jannah_points + ${jannahPointsEarned}`),
        })
        .eq('id', kidsAccountId);
      
      if (updateError) throw updateError;

      // Record donation
      const { data: donation, error: donationError } = await supabase
        .from('kids_donations')
        .insert({
          kids_account_id: kidsAccountId,
          charity_id: data.charityId,
          amount_coins: data.amountCoins,
          message: data.message,
          jannah_points_earned: jannahPointsEarned,
        })
        .select()
        .single();
      
      if (donationError) throw donationError;
      return donation as KidsDonation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kids-donations'] });
      queryClient.invalidateQueries({ queryKey: ['kids-accounts'] });
      toast({
        title: "Donation successful! 🎉",
        description: "You've earned Jannah points for your generous donation!",
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
    makeDonation: makeDonation.mutate,
    isDonating: makeDonation.isPending,
  };
};
