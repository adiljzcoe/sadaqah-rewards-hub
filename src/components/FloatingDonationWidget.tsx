
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export const FloatingDonationWidget = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        size="lg" 
        className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        <Heart className="mr-2 h-5 w-5" />
        Donate Now
      </Button>
    </div>
  );
};
