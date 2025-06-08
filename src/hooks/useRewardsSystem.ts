
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePointsConfig = () => {
  return useQuery({
    queryKey: ['points-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('points_config')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useCoinsConfig = () => {
  return useQuery({
    queryKey: ['coins-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coins_config')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useMultiplierEvents = () => {
  return useQuery({
    queryKey: ['multiplier-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('multiplier_events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUpdatePointsConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('points_config')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['points-config'] });
      toast({ title: 'Points configuration updated successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error updating configuration', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateCoinsConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('coins_config')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coins-config'] });
      toast({ title: 'Coins configuration updated successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error updating configuration', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateMultiplierEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('multiplier_events')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['multiplier-events'] });
      toast({ title: 'Multiplier event updated successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error updating event', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};
