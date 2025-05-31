
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X } from 'lucide-react';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  const handleTinClick = () => {
    setIsExpanded(!isExpanded);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
  };

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
        onClick={handleTinClick}
        className="relative w-20 h-20 cursor-pointer overflow-hidden group"
      >
        {/* Adorable charity collection tin with cat-like features */}
        <div className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 ${
          isWiggling ? 'animate-charity-shake' : 'animate-charity-shake'
        } group-hover:scale-110`}>
          <div className="relative">
            {/* Soft shadow for depth - more rounded */}
            <div className="absolute top-1 left-1 w-9 h-14 bg-gradient-to-br from-pink-300/40 to-purple-400/40 rounded-2xl transform rotate-1 blur-sm"></div>
            
            {/* Main collection tin body - more rounded and softer */}
            <div className="relative w-9 h-14 bg-gradient-to-br from-pink-300 via-pink-400 to-rose-400 rounded-2xl border-2 border-pink-200 shadow-xl transform transition-all duration-300">
              {/* Soft top lid - more rounded */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full border border-pink-300"></div>
              
              {/* Coin slot - smaller and cuter */}
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-gray-800 rounded-full shadow-inner"></div>
              
              {/* Big adorable eyes - much larger and more expressive */}
              <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {/* Left eye */}
                <div className="relative w-2 h-2 bg-white rounded-full border border-pink-300 shadow-sm">
                  {/* Pupil */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full">
                    {/* Light reflection */}
                    <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full opacity-90"></div>
                  </div>
                  {/* Cute eyelash */}
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-pink-600 rounded-full"></div>
                </div>
                
                {/* Right eye */}
                <div className="relative w-2 h-2 bg-white rounded-full border border-pink-300 shadow-sm">
                  {/* Pupil */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full">
                    {/* Light reflection */}
                    <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full opacity-90"></div>
                  </div>
                  {/* Cute eyelash */}
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-pink-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Tiny pink nose */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-rose-600 rounded-full"></div>
              
              {/* Sweet smile - wider and more cheerful */}
              <div className="absolute top-4.5 left-1/2 transform -translate-x-1/2 w-4 h-1.5 border-b-2 border-white rounded-full opacity-90"></div>
              
              {/* Rosy cheeks for extra cuteness */}
              <div className="absolute top-3.5 left-0.5 w-1.5 h-1 bg-rose-300 rounded-full opacity-60"></div>
              <div className="absolute top-3.5 right-0.5 w-1.5 h-1 bg-rose-300 rounded-full opacity-60"></div>
              
              {/* Soft white belly area */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-white/80 rounded-lg border border-pink-200">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-pink-600 text-[4px] font-bold">
                  DONATE
                </div>
                {/* Cute heart */}
                <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 text-pink-500 text-[6px]">
                  💝
                </div>
              </div>
              
              {/* Thin handle area - softer and more proportional */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-7 h-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg border border-pink-400 shadow-inner"></div>
              
              {/* Soft bottom rim */}
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-9 h-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"></div>
              
              {/* Soft highlight for 3D effect */}
              <div className="absolute top-0 left-1 w-1.5 h-12 bg-gradient-to-r from-white/50 to-transparent rounded-l-2xl"></div>
              
              {/* Cute ear-like decorations */}
              <div className="absolute -top-0.5 left-1 w-1 h-1 bg-pink-500 rounded-full border border-pink-300"></div>
              <div className="absolute -top-0.5 right-1 w-1 h-1 bg-pink-500 rounded-full border border-pink-300"></div>
              
              {/* Magical sparkles on hover */}
              <div className="absolute -top-2 -left-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping text-xs">
                ✨
              </div>
              <div className="absolute -top-1 -right-2 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping text-xs" style={{ animationDelay: '0.2s' }}>
                💫
              </div>
              <div className="absolute -bottom-1 -left-1 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping text-xs" style={{ animationDelay: '0.4s' }}>
                ⭐
              </div>
            </div>
            
            {/* Cute handle strap - more organic */}
            <div className="absolute top-4 -right-2 w-3 h-5">
              <div className="w-0.5 h-5 bg-gradient-to-b from-pink-600 to-rose-700 rounded-full transform rotate-12"></div>
              <div className="absolute bottom-0 -right-1 w-2 h-1 bg-rose-700 rounded-full"></div>
            </div>
            
            {/* Adorable floating hearts and expressions when clicked */}
            {isWiggling && (
              <>
                <div className="absolute -top-4 left-0 text-pink-400 animate-bounce opacity-90 text-sm">
                  💕
                </div>
                <div className="absolute -top-3 right-0 text-rose-400 animate-bounce opacity-90 text-sm" style={{ animationDelay: '0.2s' }}>
                  🥰
                </div>
                <div className="absolute top-0 -right-4 text-yellow-400 animate-bounce opacity-90 text-sm" style={{ animationDelay: '0.4s' }}>
                  ✨
                </div>
                <div className="absolute -bottom-2 -left-3 text-purple-400 animate-bounce opacity-90 text-sm" style={{ animationDelay: '0.6s' }}>
                  💖
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDonationButton;
