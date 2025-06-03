
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star } from 'lucide-react';

interface BusinessAd {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  offer?: string;
  rating?: number;
  category: string;
  link: string;
}

const BusinessAdvert = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const businessAds: BusinessAd[] = [
    {
      id: '1',
      title: 'Spicy yet wonderful BURGER',
      subtitle: 'DARE YOU TAKE ON THE CHALLENGE?',
      image: '/lovable-uploads/e64b4503-67ff-40f1-8ce6-a52085d858ce.png',
      offer: '20% OFF First Order',
      rating: 4.8,
      category: 'Restaurant',
      link: '#'
    },
    {
      id: '2',
      title: 'Exclusive Hijab',
      subtitle: 'FASHION FELICITY',
      image: '/lovable-uploads/7632d030-2eb4-430d-9c4c-8061492eceec.png',
      offer: 'Up to 40% OFF',
      rating: 4.9,
      category: 'Fashion',
      link: '#'
    },
    {
      id: '3',
      title: 'The taste of tradition',
      subtitle: 'NO1 BRAND IN TURKISH ARABIC COFFEE',
      image: '/lovable-uploads/fe248050-12b2-4476-8078-10cbcce78d02.png',
      offer: 'Free Shipping on Orders £25+',
      rating: 4.7,
      category: 'Food & Beverage',
      link: '#'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % businessAds.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [businessAds.length]);

  const currentAd = businessAds[currentAdIndex];

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div className="relative h-40">
        <img
          src={currentAd.image}
          alt={currentAd.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
            {currentAd.category}
          </Badge>
          {currentAd.rating && (
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-white">{currentAd.rating}</span>
            </div>
          )}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-lg font-bold mb-1">{currentAd.title}</h3>
          {currentAd.subtitle && (
            <p className="text-xs font-semibold text-amber-200 uppercase tracking-wide mb-2">
              {currentAd.subtitle}
            </p>
          )}
          
          {/* Offer and Visit button in same row */}
          <div className="flex items-center justify-between">
            {currentAd.offer && (
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-md px-3 py-1 text-xs font-bold">
                {currentAd.offer}
              </div>
            )}
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-1 text-xs">
              <span>Visit</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center py-3 space-x-2">
        {businessAds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAdIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentAdIndex 
                ? 'bg-amber-500 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </Card>
  );
};

export default BusinessAdvert;
