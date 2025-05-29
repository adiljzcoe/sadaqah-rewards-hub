
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isExpanded && (
        <div className="mb-6 game-card rounded-2xl p-6 w-80 animate-gentle-fade">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-lg text-gray-900">Quick Donate ⚡</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors gel-button w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <Button className="w-full justify-start gel-button bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 rounded-xl shadow-xl">
              <Heart className="h-5 w-5 mr-3 animate-subtle-pulse" />
              <span>£10 - Hot Meals 🍲</span>
            </Button>
            
            <Button className="w-full justify-start gel-button bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 rounded-xl shadow-xl">
              <Heart className="h-5 w-5 mr-3 animate-subtle-pulse" />
              <span>£25 - Water Wells 💧</span>
            </Button>
            
            <Button className="w-full justify-start gel-button bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 rounded-xl shadow-xl">
              <Heart className="h-5 w-5 mr-3 animate-subtle-pulse" />
              <span>£50 - Education 📚</span>
            </Button>
          </div>
          
          <div className="mt-4 game-card p-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-center text-sm font-bold text-amber-800">
                <Zap className="h-5 w-5 mr-2 animate-subtle-pulse" />
                Double points active! 🔥
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent animate-shimmer"></div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 rounded-full gel-button bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:scale-110 shadow-2xl text-white border-0 animate-colorful-glow relative overflow-hidden"
        size="lg"
      >
        <Heart className="h-7 w-7 animate-subtle-pulse" />
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full shadow-lg">
          <GoldCoin3D size={24}>
            🔥
          </GoldCoin3D>
        </div>
      </Button>
    </div>
  );
};

export default FloatingDonationButton;
