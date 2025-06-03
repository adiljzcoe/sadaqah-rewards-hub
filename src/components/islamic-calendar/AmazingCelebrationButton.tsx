
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Star, PartyPopper } from 'lucide-react';

interface AmazingCelebrationButtonProps {
  eventTitle: string;
  onCelebrate: () => void;
}

const AmazingCelebrationButton = ({ eventTitle, onCelebrate }: AmazingCelebrationButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onCelebrate();
    
    // Reset animation after a short delay
    setTimeout(() => setIsPressed(false), 300);
  };

  return (
    <Button 
      onClick={handlePress}
      size="lg"
      className={`
        ${isPressed ? 'animate-ping' : ''}
        bg-gradient-to-r from-yellow-400 via-pink-500 via-purple-600 to-indigo-600 
        hover:from-yellow-500 hover:via-pink-600 hover:via-purple-700 hover:to-indigo-700
        text-white font-bold px-8 py-4 text-xl shadow-2xl 
        hover:shadow-3xl transform hover:scale-110 transition-all duration-300
        animate-pulse border-4 border-yellow-300 rounded-2xl
        relative overflow-hidden group
      `}
    >
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {/* Icons */}
      <PartyPopper className="h-6 w-6 mr-3 animate-bounce" />
      <Sparkles className="h-5 w-5 mr-2 animate-spin" />
      
      {/* Text */}
      <span className="relative z-10">
        🎉 AMAZING CELEBRATION! 🎉
      </span>
      
      {/* More icons */}
      <Sparkles className="h-5 w-5 ml-2 animate-spin" />
      <Heart className="h-6 w-6 ml-3 animate-pulse text-red-300" />
      <Star className="h-5 w-5 ml-2 animate-ping text-yellow-300" />
    </Button>
  );
};

export default AmazingCelebrationButton;
