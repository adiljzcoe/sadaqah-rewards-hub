
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Gift, Loader2, Star } from 'lucide-react';

interface DonationProduct {
  id: string;
  name: string;
  description?: string;
  category: string;
  fixed_price?: number;
  minimum_amount?: number;
  suggested_amount?: number;
  maximum_amount?: number;
  pricing_model: string;
  image_url?: string;
  is_featured: boolean;
  charity_id?: string;
  charities?: {
    name: string;
  };
}

const DonationProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['charity-products'],
    queryFn: async () => {
      console.log('Fetching charity products...');
      const { data, error } = await supabase
        .from('charity_products')
        .select(`
          *,
          charities(name)
        `)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(8);

      if (error) {
        console.error('Error fetching charity products:', error);
        throw error;
      }

      console.log('Fetched charity products:', data);
      return data as DonationProduct[];
    },
  });

  const formatPrice = (product: DonationProduct) => {
    if (product.pricing_model === 'fixed' && product.fixed_price) {
      return `£${(product.fixed_price / 100).toFixed(2)}`;
    }
    if (product.pricing_model === 'flexible') {
      if (product.suggested_amount) {
        return `From £${(product.suggested_amount / 100).toFixed(2)}`;
      }
      if (product.minimum_amount) {
        return `From £${(product.minimum_amount / 100).toFixed(2)}`;
      }
    }
    return 'Flexible';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Donation Products</h3>
          <p className="text-gray-600">Choose how you'd like to make an impact</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Donation Products</h3>
          <p className="text-gray-600">Choose how you'd like to make an impact</p>
        </div>
        <div className="text-center py-12">
          <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Available</h3>
          <p className="text-gray-500">Donation products will appear here soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Donation Products</h3>
        <p className="text-gray-600">Choose how you'd like to make an impact</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="relative mb-4">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-32 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                )}
                
                {product.is_featured && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
                
                <h4 className="font-semibold text-lg group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h4>
                
                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                {product.charities?.name && (
                  <p className="text-xs text-gray-500">
                    by {product.charities.name}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-emerald-600">
                  {formatPrice(product)}
                </div>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Heart className="h-3 w-3 mr-1" />
                  Donate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DonationProducts;
