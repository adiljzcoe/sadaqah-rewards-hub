
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X } from 'lucide-react';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isExpanded && (
        <div className="mb-6 bg-gradient-to-br from-white via-candy-pink-50 to-purple-magic-50 rounded-3xl shadow-2xl border-4 border-candy-pink-300 p-6 w-80 animate-slide-in subtle-shadow relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-black text-xl gradient-text">Quick Donate! 🚀</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-candy-pink-600 hover-scale transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-candy-pink-500 to-purple-magic-500 hover:from-candy-pink-600 hover:to-purple-magic-600 text-white font-bold py-4 rounded-2xl shadow-lg hover-scale border-0">
              <Heart className="h-5 w-5 mr-3 animate-gentle-pulse" />
              <span className="text-lg">£10 - Hot Meals 🍽️</span>
            </Button>
            
            <Button className="w-full justify-start bg-gradient-to-r from-vibrant-orange-500 to-lime-green-500 hover:from-vibrant-orange-600 hover:to-lime-green-600 text-white font-bold py-4 rounded-2xl shadow-lg hover-scale border-0">
              <Heart className="h-5 w-5 mr-3 animate-gentle-pulse" />
              <span className="text-lg">£25 - Water Wells 💧</span>
            </Button>
            
            <Button className="w-full justify-start bg-gradient-to-r from-electric-blue-500 to-purple-magic-500 hover:from-electric-blue-600 hover:to-purple-magic-600 text-white font-bold py-4 rounded-2xl shadow-lg hover-scale border-0">
              <Heart className="h-5 w-5 mr-3 animate-gentle-pulse" />
              <span className="text-lg">£50 - Education 📚</span>
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-400 to-vibrant-orange-400 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center text-lg font-black text-white">
                <Zap className="h-5 w-5 mr-2" />
                Double points active! ⚡🎉
              </div>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-candy-pink-500 via-purple-magic-500 to-electric-blue-500 hover:from-candy-pink-600 hover:via-purple-magic-600 hover:to-electric-blue-600 shadow-2xl hover:shadow-3xl transition-all duration-300 text-white border-0 hover-scale animate-gentle-bounce subtle-shadow relative overflow-hidden"
        size="lg"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <Heart className="h-8 w-8 animate-gentle-pulse relative z-10" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-vibrant-orange-400 rounded-full flex items-center justify-center text-xs font-bold">
          🔥
        </div>
      </Button>
    </div>
  );
};

export default FloatingDonationButton;
