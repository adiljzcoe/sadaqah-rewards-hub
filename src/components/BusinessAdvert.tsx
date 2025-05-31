
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, Clock, MapPin } from 'lucide-react';

interface BusinessAd {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  badge?: string;
  offer?: string;
  location?: string;
  rating?: number;
  category: string;
  link: string;
  sponsored: boolean;
}

const BusinessAdvert = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const businessAds: BusinessAd[] = [
    {
      id: '1',
      title: 'Spicy yet wonderful BURGER',
      subtitle: 'DARE YOU TAKE ON THE CHALLENGE?',
      description: 'Experience the ultimate spicy burger challenge with our signature flame-grilled patty',
      image: '/lovable-uploads/e64b4503-67ff-40f1-8ce6-a52085d858ce.png',
      badge: 'NEW',
      offer: '20% OFF First Order',
      location: 'Birmingham City Centre',
      rating: 4.8,
      category: 'Restaurant',
      link: '#',
      sponsored: true
    },
    {
      id: '2',
      title: 'Exclusive Hijab',
      subtitle: 'FASHION FELICITY',
      description: 'Discover our premium collection of modest fashion and elegant hijab styles',
      image: '/lovable-uploads/7632d030-2eb4-430d-9c4c-8061492eceec.png',
      offer: 'Up to 40% OFF',
      location: 'Online & In-Store',
      rating: 4.9,
      category: 'Fashion',
      link: '#',
      sponsored: true
    },
    {
      id: '3',
      title: 'The taste of tradition',
      subtitle: 'NO1 BRAND IN TURKISH ARABIC COFFEE',
      description: 'Authentic Turkish and Arabic coffee blends - bringing traditional flavors to your home',
      image: '/lovable-uploads/fe248050-12b2-4476-8078-10cbcce78d02.png',
      offer: 'Free Shipping on Orders £25+',
      location: 'Available Nationwide',
      rating: 4.7,
      category: 'Food & Beverage',
      link: '#',
      sponsored: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % businessAds.length);
    }, 8000); // Change ad every 8 seconds

    return () => clearInterval(interval);
  }, [businessAds.length]);

  const currentAd = businessAds[currentAdIndex];

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 group">
      {/* Sponsored Badge */}
      <div className="absolute top-4 left-4 z-20">
        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg">
          <Star className="h-3 w-3 mr-1" />
          Sponsored
        </Badge>
      </div>

      {/* New Badge */}
      {currentAd.badge && (
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg animate-pulse">
            {currentAd.badge}
          </Badge>
        </div>
      )}

      <div className="relative">
        {/* Business Ad Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={currentAd.image}
            alt={currentAd.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                {currentAd.category}
              </Badge>
              {currentAd.rating && (
                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{currentAd.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
              {currentAd.title}
            </h3>
            {currentAd.subtitle && (
              <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                {currentAd.subtitle}
              </p>
            )}
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {currentAd.description}
          </p>

          {/* Offer Section */}
          {currentAd.offer && (
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg p-3 mb-4 text-center shadow-lg">
              <div className="font-bold text-sm">🎉 Special Offer</div>
              <div className="text-lg font-extrabold">{currentAd.offer}</div>
            </div>
          )}

          {/* Location */}
          {currentAd.location && (
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
              <span>{currentAd.location}</span>
            </div>
          )}

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group">
            <span>Visit Store</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 space-x-2">
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
        </div>
      </div>
    </Card>
  );
};

export default BusinessAdvert;
