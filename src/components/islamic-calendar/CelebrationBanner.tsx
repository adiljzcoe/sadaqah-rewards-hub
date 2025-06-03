
import React from 'react';
import { Sparkles, Star, Heart } from 'lucide-react';

interface CelebrationBannerProps {
  eventTitle: string;
  isToday?: boolean;
}

const CelebrationBanner = ({ eventTitle, isToday = false }: CelebrationBannerProps) => {
  if (!isToday) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 py-3 animate-celebration-bounce">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-white font-bold text-lg md:text-xl">
          <Sparkles className="h-6 w-6 animate-spin" />
          <Star className="h-5 w-5 animate-pulse" />
          <span className="animate-pulse">🎉 Celebrating {eventTitle} Today! 🎉</span>
          <Star className="h-5 w-5 animate-pulse" />
          <Sparkles className="h-6 w-6 animate-spin" />
        </div>
        <div className="text-center text-white/90 text-sm mt-1">
          <Heart className="h-4 w-4 inline mr-1" />
          May Allah bless this sacred day
          <Heart className="h-4 w-4 inline ml-1" />
        </div>
      </div>
    </div>
  );
};

export default CelebrationBanner;
