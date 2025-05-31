
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Clock, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  charity: string;
  description: string;
  price: number;
  currency: string;
  beneficiaries: number;
  timeframe: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
  charityLogo?: string;
  isFixedPrice?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  charity,
  description,
  price,
  currency,
  beneficiaries,
  timeframe,
  category,
  isPopular,
  isNew,
  charityLogo,
  isFixedPrice = false
}) => {
  return (
    <Card className="overflow-hidden hover-lift transition-all duration-300 bg-white border border-gray-200 shadow-sm hover:shadow-lg">
      {/* Header with badges */}
      <div className="relative p-4 pb-2">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            {charityLogo && (
              <img 
                src={charityLogo} 
                alt={`${charity} logo`}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{charity}</h4>
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50">
                {category}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-1">
            {isNew && (
              <Badge className="bg-green-500 text-white text-xs">New</Badge>
            )}
            {isPopular && (
              <Badge className="bg-orange-500 text-white text-xs">Popular</Badge>
            )}
            {isFixedPrice && (
              <Badge className="bg-purple-500 text-white text-xs">Fixed Price</Badge>
            )}
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
      </div>

      {/* Stats */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-blue-500" />
            <span>{beneficiaries} {beneficiaries === 1 ? 'person' : 'people'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-green-500" />
            <span>{timeframe}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">{currency}{price}</span>
            <span className="text-sm text-gray-500 ml-1">
              {isFixedPrice ? 'fixed' : 'donation'}
            </span>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isFixedPrice ? 'Order' : 'Donate'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
