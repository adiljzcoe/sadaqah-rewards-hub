
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plane, Package, Heart, Zap, Gift, Star } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';

const epicDonations = [
  {
    id: 'care-package',
    title: 'Care Package Drop',
    amount: 500,
    icon: Package,
    emoji: '📦',
    animation: 'plane-drop',
    description: 'Emergency supplies',
    color: 'from-purple-500 to-pink-600',
    duration: 30000 // 30 seconds
  },
  {
    id: 'medical-kit',
    title: 'Medical Emergency Kit',
    amount: 750,
    icon: Heart,
    emoji: '🏥',
    animation: 'pulse-heal',
    description: 'Life-saving medicine',
    color: 'from-red-500 to-rose-600',
    duration: 25000 // 25 seconds
  },
  {
    id: 'golden-feast',
    title: 'Golden Feast',
    amount: 1000,
    icon: Star,
    emoji: '🍽️',
    animation: 'golden-shine',
    description: 'Feed 50 families',
    color: 'from-yellow-500 to-amber-600',
    duration: 20000 // 20 seconds
  },
  {
    id: 'super-shelter',
    title: 'Super Shelter',
    amount: 1500,
    icon: Gift,
    emoji: '🏠',
    animation: 'build-up',
    description: 'Emergency housing',
    color: 'from-green-500 to-emerald-600',
    duration: 35000 // 35 seconds
  }
];

const EpicDonationButton = () => {
  const [currentDonation, setCurrentDonation] = useState(0);
  const [timeLeft, setTimeLeft] = useState(epicDonations[0].duration);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          // Switch to next donation
          setCurrentDonation(current => (current + 1) % epicDonations.length);
          return epicDonations[(currentDonation + 1) % epicDonations.length].duration;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDonation]);

  const handleEpicDonate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const donation = epicDonations[currentDonation];
  const IconComponent = donation.icon;

  return (
    <div className="relative">
      <Button
        onClick={handleEpicDonate}
        className={`
          relative w-24 h-24 rounded-2xl shadow-2xl border-4 border-white/50
          bg-gradient-to-br ${donation.color}
          hover:scale-110 active:scale-95 
          transition-all duration-300 overflow-hidden
          ${isAnimating ? 'animate-bounce' : ''}
        `}
      >
        {/* Background animation effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse"></div>
        
        {/* Plane animation for care package */}
        {donation.animation === 'plane-drop' && isAnimating && (
          <div className="absolute -top-4 left-0 animate-ping">
            <Plane className="h-6 w-6 text-white rotate-45" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white h-full">
          <div className="text-2xl mb-1 animate-pulse">{donation.emoji}</div>
          <div className="flex items-center text-xs font-bold mb-1">
            <SimpleGoldCoin size={12} className="mr-1" />
            {donation.amount}
          </div>
          <div className="text-[8px] opacity-80 text-center leading-tight">
            {donation.description}
          </div>
          
          {/* Timer bar */}
          <div className="absolute bottom-1 left-1 right-1 h-1 bg-black/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white/80 rounded-full transition-all duration-1000"
              style={{ 
                width: `${(timeLeft / donation.duration) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Epic glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Sparkle effects */}
        {isAnimating && (
          <>
            <div className="absolute top-2 right-2 text-yellow-300 animate-ping">
              <Star className="h-3 w-3" />
            </div>
            <div className="absolute bottom-2 left-2 text-yellow-300 animate-ping" style={{ animationDelay: '0.5s' }}>
              <Zap className="h-3 w-3" />
            </div>
          </>
        )}
      </Button>

      {/* Floating text when clicked */}
      {isAnimating && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-xl">
            Epic Donation! 🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default EpicDonationButton;
