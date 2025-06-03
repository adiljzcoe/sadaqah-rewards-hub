
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CharityProduct {
  id: string;
  charity_id: string;
  name: string;
  description: string;
  category: string;
  product_type: 'fixed_price' | 'flexible_amount' | 'subscription' | 'cause_campaign';
  pricing_model: 'fixed' | 'minimum' | 'suggested' | 'free_choice';
  fixed_price?: number;
  minimum_amount?: number;
  suggested_amount?: number;
  maximum_amount?: number;
  currency: string;
  image_url?: string;
  is_active: boolean;
  is_featured: boolean;
  target_amount?: number;
  raised_amount: number;
  beneficiaries_count?: number;
  impact_description?: string;
  tags?: string[];
  pricing_tiers?: Array<{
    id: string;
    name: string;
    amount: number;
    description: string;
    impact_description: string;
  }>;
}

export const useCharityProducts = (charityId: string) => {
  return useQuery({
    queryKey: ['charity-products', charityId],
    queryFn: async () => {
      console.log('Fetching products for charity:', charityId);
      
      // Fetch products
      const { data: products, error: productsError } = await supabase
        .from('charity_products')
        .select('*')
        .eq('charity_id', charityId)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (productsError) {
        console.error('Error fetching charity products:', productsError);
        throw productsError;
      }

      console.log('Fetched products:', products);

      // Fetch pricing tiers for each product
      const productsWithTiers = await Promise.all(
        (products || []).map(async (product) => {
          const { data: tiers, error: tiersError } = await supabase
            .from('product_pricing_tiers')
            .select('*')
            .eq('product_id', product.id)
            .order('sort_order', { ascending: true });

          if (tiersError) {
            console.error('Error fetching pricing tiers:', tiersError);
          }

          return {
            ...product,
            pricing_tiers: tiers || []
          };
        })
      );

      return productsWithTiers as CharityProduct[];
    },
    enabled: !!charityId,
  });
};
