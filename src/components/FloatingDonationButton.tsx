
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X, Target, Trophy } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isExpanded && (
        <div className="mb-6 bg-gradient-to-br from-purple-900/95 to-blue-900/95 rounded-2xl p-6 w-96 animate-gentle-fade border-4 border-cyan-400 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-black text-2xl text-cyan-100">⚡ EPIC DROP ⚡</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-cyan-300 hover:text-pink-400 transition-colors bg-gradient-to-r from-gray-600 to-gray-700 rounded-full p-2 border-2 border-gray-400 shadow-xl hover:scale-110 transform duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <Button className="w-full justify-start bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 hover:from-green-400 hover:via-emerald-400 hover:to-cyan-400 text-white font-black py-6 rounded-2xl shadow-2xl border-4 border-green-300 transform hover:scale-105 transition-all duration-300 text-lg">
              <Heart className="h-6 w-6 mr-4 animate-sparkle" />
              <span>£10 - LEGENDARY MEALS 🍲</span>
            </Button>
            
            <Button className="w-full justify-start bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:from-blue-400 hover:via-cyan-400 hover:to-purple-400 text-white font-black py-6 rounded-2xl shadow-2xl border-4 border-blue-300 transform hover:scale-105 transition-all duration-300 text-lg">
              <Heart className="h-6 w-6 mr-4 animate-sparkle" />
              <span>£25 - EPIC WATER WELLS 💧</span>
            </Button>
            
            <Button className="w-full justify-start bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 text-white font-black py-6 rounded-2xl shadow-2xl border-4 border-purple-300 transform hover:scale-105 transition-all duration-300 text-lg">
              <Heart className="h-6 w-6 mr-4 animate-sparkle" />
              <span>£50 - MYTHIC EDUCATION 📚</span>
            </Button>
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-yellow-600/60 to-orange-600/60 rounded-2xl p-4 text-center relative overflow-hidden border-4 border-yellow-400 backdrop-blur-sm">
            <div className="relative z-10">
              <div className="flex items-center justify-center text-lg font-black text-yellow-100 mb-2">
                <Zap className="h-6 w-6 mr-3 animate-sparkle" />
                STORM WARNING: 2X POINTS! 🔥
              </div>
              <div className="text-2xl font-black text-white animate-number-pop">05:42</div>
              <div className="text-sm font-bold text-yellow-200">TIME REMAINING</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-20 h-20 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-400 hover:via-purple-400 hover:to-cyan-400 hover:scale-125 shadow-2xl text-white border-4 border-white/30 transform transition-all duration-300 relative overflow-hidden animate-rainbow"
        size="lg"
      >
        <Heart className="h-10 w-10 animate-sparkle" />
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full shadow-xl border-2 border-yellow-300">
          <GoldCoin3D size={32}>
            🔥
          </GoldCoin3D>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </Button>
    </div>
  );
};

export default FloatingDonationButton;
