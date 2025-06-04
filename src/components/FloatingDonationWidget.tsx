
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';
import PixarHeartMascot from './PixarHeartMascot';

const FloatingDonationWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Show the widget after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDonate = () => {
    setIsActive(true);
    // Reset animation after a short time
    setTimeout(() => setIsActive(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="relative bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl shadow-2xl border border-pink-200 p-4 max-w-xs">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Pixar Heart Mascot */}
        <div className="w-32 h-32 mx-auto mb-4">
          <PixarHeartMascot isActive={isActive} className="w-full h-full" />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Spread Love Today! 💕
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Our blessed heart is ready to help you make a difference in someone's life.
          </p>
          
          <Button 
            onClick={handleDonate}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Heart className="h-4 w-4 mr-2" />
            Donate with Love
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-rose-300 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default FloatingDonationWidget;
