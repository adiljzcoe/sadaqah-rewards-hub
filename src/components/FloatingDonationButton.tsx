import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X } from 'lucide-react';

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

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-20 h-20 cursor-pointer overflow-hidden group"
      >
        {/* 3D Charity collection tin with side-to-side shaking animation */}
        <div className="relative z-10 w-full h-full flex items-center justify-center animate-charity-shake">
          {/* Charity tin viewed from the side */}
          <div className="relative">
            {/* Tin shadow/depth - positioned behind and to the right */}
            <div className="absolute top-1 left-1 w-8 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg transform rotate-1"></div>
            
            {/* Main collection tin body - tall cylindrical shape like the reference */}
            <div className="relative w-8 h-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg border-2 border-blue-300 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              {/* Top lid of the tin */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-9 h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full border border-blue-500"></div>
              
              {/* Coin slot on top */}
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-gray-900 rounded-full shadow-inner"></div>
              
              {/* White label area with "DONATE" text */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-7 h-8 bg-white rounded-sm flex items-center justify-center">
                <div className="text-blue-600 text-[6px] font-bold leading-none transform -rotate-90">
                  DONATE
                </div>
              </div>
              
              {/* Thin handle area near the bottom - more prominent */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gradient-to-r from-blue-700 to-blue-800 rounded-sm border border-blue-600 shadow-inner"></div>
              
              {/* Bottom rim */}
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
              
              {/* 3D highlight on cylinder */}
              <div className="absolute top-0 left-0.5 w-1 h-14 bg-gradient-to-r from-white/60 to-transparent rounded-l-lg"></div>
              
              {/* Handle attachment point */}
              <div className="absolute top-3 -right-1 w-1 h-1 bg-blue-700 rounded-full"></div>
            </div>
            
            {/* Collection tin handle - curved rope/strap */}
            <div className="absolute top-4 -right-2 w-3 h-6">
              {/* Handle strap */}
              <div className="w-0.5 h-6 bg-gradient-to-b from-blue-800 to-blue-900 rounded-full transform rotate-12"></div>
              {/* Handle grip */}
              <div className="absolute bottom-0 -right-1 w-2 h-1 bg-blue-900 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDonationButton;
