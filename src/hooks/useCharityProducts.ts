
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CharityProduct {
  id: string;
  charity_id: string;
  name: string;
  description?: string;
  category: string;
  image_url?: string;
  product_type: 'fixed_price' | 'flexible_donation';
  pricing_model: 'fixed' | 'minimum' | 'suggested' | 'tiered';
  fixed_price?: number;
  minimum_amount?: number;
  suggested_amount?: number;
  maximum_amount?: number;
  target_amount?: number;
  raised_amount: number;
  impact_description?: string;
  tags?: string[];
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  currency: string;
  beneficiaries_count?: number;
  created_at: string;
  updated_at: string;
}

export const useCharityProducts = (charityId?: string) => {
  return useQuery({
    queryKey: ['charity-products', charityId],
    queryFn: async () => {
      console.log('Fetching charity products:', charityId);
      
      let query = supabase.from('charity_products').select('*');
      
      if (charityId) {
        query = query.eq('charity_id', charityId);
      }
      
      query = query.order('sort_order', { ascending: true });
      
      const { data, error } = await query;

      if (error) {
        console.error('Error fetching charity products:', error);
        throw error;
      }

      console.log('Fetched charity products:', data);
      return (data || []) as CharityProduct[];
    },
  });
};
