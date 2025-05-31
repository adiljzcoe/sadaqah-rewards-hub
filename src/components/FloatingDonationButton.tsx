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
        className="relative w-20 h-20 rounded-full border-0 shadow-2xl text-white overflow-hidden group"
        size="lg"
      >
        {/* Ray of light behind the bin */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/80 via-yellow-300/60 to-white/80 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-200/40 to-transparent animate-shimmer"></div>
        
        {/* 3D Charity tin with left-right shaking animation */}
        <div className="relative z-10 w-full h-full flex items-center justify-center animate-charity-shake">
          {/* Charity tin base */}
          <div className="relative">
            {/* Tin shadow/depth */}
            <div className="absolute top-1 left-1 w-10 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full transform rotate-1"></div>
            
            {/* Main tin body - cylindrical like the reference image */}
            <div className="relative w-10 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full border-2 border-red-400 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              {/* Tin opening/slot - wider at top like real charity tins */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full shadow-inner"></div>
              
              {/* Label area on tin */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white/90 rounded-sm flex items-center justify-center">
                <span className="text-red-600 text-xs font-bold">💝</span>
              </div>
              
              {/* Tin rim at top */}
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
              
              {/* 3D highlight on cylinder */}
              <div className="absolute top-1 left-1 w-2 h-8 bg-gradient-to-r from-white/60 to-transparent rounded-l-full"></div>
              
              {/* Bottom rim */}
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-9 h-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Floating coins animation */}
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
          <GoldCoin3D size={32}>
            🔥
          </GoldCoin3D>
        </div>
        
        {/* Additional light rays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </Button>
    </div>
  );
};

export default FloatingDonationButton;
