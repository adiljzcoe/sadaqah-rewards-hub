
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X } from 'lucide-react';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isExpanded && (
        <div className="mb-6 professional-card rounded-xl p-6 w-80 animate-gentle-fade">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-lg text-gray-900">Quick Donate</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full justify-start vibrant-gradient hover:scale-[1.02] text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
              <Heart className="h-4 w-4 mr-3" />
              <span>£10 - Hot Meals</span>
            </Button>
            
            <Button className="w-full justify-start accent-gradient hover:scale-[1.02] text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
              <Heart className="h-4 w-4 mr-3" />
              <span>£25 - Water Wells</span>
            </Button>
            
            <Button className="w-full justify-start purple-gradient hover:scale-[1.02] text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
              <Heart className="h-4 w-4 mr-3" />
              <span>£50 - Education</span>
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg text-center border border-amber-200 shadow-sm">
            <div className="flex items-center justify-center text-sm font-semibold text-amber-800">
              <Zap className="h-4 w-4 mr-2" />
              Double points active!
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full vibrant-gradient hover:scale-110 shadow-xl hover:shadow-2xl transition-all duration-300 text-white border-0 animate-subtle-pulse"
        size="lg"
      >
        <Heart className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
          🔥
        </div>
      </Button>
    </div>
  );
};

export default FloatingDonationButton;
