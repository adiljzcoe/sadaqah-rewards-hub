
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Heart, Users, Clock, ShoppingCart, Play } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  charity: string;
  description: string;
  price?: number;
  currency: string;
  beneficiaries: number;
  timeframe: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
  charityLogo?: string;
  isFixedPrice?: boolean;
  priceOptions?: { amount: number; description: string }[];
  isAnyAmount?: boolean;
  suggestedAmounts?: number[];
  image?: string;
  video?: string;
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
  isFixedPrice = false,
  priceOptions,
  isAnyAmount = false,
  suggestedAmounts,
  image,
  video
}) => {
  const [selectedPrice, setSelectedPrice] = useState<number>(
    price || priceOptions?.[0]?.amount || suggestedAmounts?.[0] || 0
  );
  const [customAmount, setCustomAmount] = useState<string>('');
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handlePriceSelection = (amount: number) => {
    setSelectedPrice(amount);
    setUseCustomAmount(false);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setUseCustomAmount(true);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setSelectedPrice(numValue);
    }
  };

  const getFinalAmount = () => {
    if (useCustomAmount && customAmount) {
      const numValue = parseFloat(customAmount);
      return !isNaN(numValue) ? numValue : 0;
    }
    return selectedPrice;
  };

  return (
    <Card className="overflow-hidden hover-lift transition-all duration-300 bg-white border border-gray-200 shadow-sm hover:shadow-lg">
      {/* Image/Video Section */}
      {(image || video) && (
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            {!showVideo && image ? (
              <div className="relative w-full h-full">
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
                {video && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                  >
                    <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-gray-900 ml-1" />
                    </div>
                  </button>
                )}
              </div>
            ) : video && showVideo ? (
              <iframe
                src={video}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </AspectRatio>
          {video && showVideo && (
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm hover:bg-black/70"
            >
              Show Image
            </button>
          )}
        </div>
      )}

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
            {isAnyAmount && (
              <Badge className="bg-blue-500 text-white text-xs">Any Amount</Badge>
            )}
            {priceOptions && (
              <Badge className="bg-teal-500 text-white text-xs">Multiple Options</Badge>
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

        {/* Price Options */}
        {priceOptions && (
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Choose an option:</h5>
            <RadioGroup value={selectedPrice.toString()} onValueChange={(value) => handlePriceSelection(parseFloat(value))}>
              {priceOptions.map((option) => (
                <div key={option.amount} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.amount.toString()} id={`option-${option.amount}`} />
                  <Label htmlFor={`option-${option.amount}`} className="text-sm cursor-pointer">
                    {currency}{option.amount} - {option.description}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Suggested Amounts for Any Amount products */}
        {isAnyAmount && suggestedAmounts && (
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Suggested amounts:</h5>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {suggestedAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedPrice === amount && !useCustomAmount ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePriceSelection(amount)}
                  className="text-xs"
                >
                  {currency}{amount}
                </Button>
              ))}
            </div>
            <div>
              <Label htmlFor="custom-amount" className="text-sm text-gray-700">Or enter your own amount:</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="mt-1"
                min="1"
              />
            </div>
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {currency}{getFinalAmount()}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              {isFixedPrice ? 'fixed' : 'donation'}
            </span>
          </div>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6"
            disabled={getFinalAmount() <= 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isFixedPrice ? 'Order' : 'Donate'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
