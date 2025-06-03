
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Target, Tag } from 'lucide-react';
import { type CharityProduct } from '@/hooks/useCharityProducts';

interface ProductTier {
  id: string;
  name: string;
  amount: number;
  description: string;
  impact_description: string;
}

interface CharityProductCardProps {
  product: CharityProduct;
  onDonate: (productId: string, amount?: number) => void;
}

const CharityProductCard: React.FC<CharityProductCardProps> = ({ product, onDonate }) => {
  const formatPrice = (amount: number) => {
    return `£${(amount / 100).toFixed(2)}`;
  };

  const getProductTypeLabel = () => {
    switch (product.product_type) {
      case 'fixed_price': return 'Fixed Price';
      case 'flexible_amount': return 'Flexible Amount';
      case 'subscription': return 'Monthly Sponsorship';
      case 'cause_campaign': return 'Campaign';
      default: return 'Product';
    }
  };

  const getProductTypeColor = () => {
    switch (product.product_type) {
      case 'fixed_price': return 'bg-blue-100 text-blue-800';
      case 'flexible_amount': return 'bg-green-100 text-green-800';
      case 'subscription': return 'bg-purple-100 text-purple-800';
      case 'cause_campaign': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderPricing = () => {
    switch (product.pricing_model) {
      case 'fixed':
        return (
          <div className="text-center">
            <div className="text-2xl font-bold text-islamic-green-700">
              {formatPrice(product.fixed_price || 0)}
            </div>
            <Button 
              className="w-full mt-2 bg-islamic-green-600 hover:bg-islamic-green-700"
              onClick={() => onDonate(product.id, product.fixed_price)}
            >
              <Heart className="h-4 w-4 mr-2" />
              Donate Now
            </Button>
          </div>
        );

      case 'minimum':
        return (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              Minimum: {formatPrice(product.minimum_amount || 0)}
            </div>
            <Button 
              className="w-full bg-islamic-green-600 hover:bg-islamic-green-700"
              onClick={() => onDonate(product.id)}
            >
              <Heart className="h-4 w-4 mr-2" />
              Choose Amount
            </Button>
          </div>
        );

      case 'suggested':
        return (
          <div className="space-y-2">
            <div className="text-center">
              <div className="text-lg font-semibold text-islamic-green-700">
                Suggested: {formatPrice(product.suggested_amount || 0)}
              </div>
              {product.minimum_amount && (
                <div className="text-sm text-gray-600">
                  From: {formatPrice(product.minimum_amount)}
                </div>
              )}
            </div>
            <Button 
              className="w-full bg-islamic-green-600 hover:bg-islamic-green-700"
              onClick={() => onDonate(product.id, product.suggested_amount)}
            >
              <Heart className="h-4 w-4 mr-2" />
              Donate {formatPrice(product.suggested_amount || 0)}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onDonate(product.id)}
            >
              Choose Different Amount
            </Button>
          </div>
        );

      case 'free_choice':
        return (
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">
              Choose your amount
            </div>
            <Button 
              className="w-full bg-islamic-green-600 hover:bg-islamic-green-700"
              onClick={() => onDonate(product.id)}
            >
              <Heart className="h-4 w-4 mr-2" />
              Donate
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercentage = product.target_amount 
    ? Math.min((product.raised_amount / product.target_amount) * 100, 100)
    : 0;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      {product.image_url && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.is_featured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">
              Featured
            </Badge>
          )}
          <Badge className={`absolute top-2 right-2 ${getProductTypeColor()}`}>
            {getProductTypeLabel()}
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
        </div>
        <Badge variant="outline" className="w-fit">
          {product.category}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
        
        {product.impact_description && (
          <div className="bg-islamic-green-50 rounded-lg p-3">
            <p className="text-sm text-islamic-green-800">{product.impact_description}</p>
          </div>
        )}

        {product.beneficiaries_count && (
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {product.beneficiaries_count.toLocaleString()} beneficiaries
          </div>
        )}

        {product.target_amount && product.product_type === 'cause_campaign' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center text-gray-600">
                <Target className="h-4 w-4 mr-1" />
                Progress
              </span>
              <span className="font-medium">
                {formatPrice(product.raised_amount)} / {formatPrice(product.target_amount)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-islamic-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              {progressPercentage.toFixed(1)}% funded
            </div>
          </div>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {product.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{product.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {product.pricing_tiers && product.pricing_tiers.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Donation Options:</h4>
            <div className="grid gap-2">
              {product.pricing_tiers.map((tier) => (
                <Button
                  key={tier.id}
                  variant="outline"
                  className="justify-between h-auto p-3"
                  onClick={() => onDonate(product.id, tier.amount)}
                >
                  <div className="text-left">
                    <div className="font-medium">{tier.name}</div>
                    {tier.impact_description && (
                      <div className="text-xs text-gray-600">{tier.impact_description}</div>
                    )}
                  </div>
                  <div className="font-bold text-islamic-green-700">
                    {formatPrice(tier.amount)}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {!product.pricing_tiers?.length && renderPricing()}
      </CardContent>
    </Card>
  );
};

export default CharityProductCard;
