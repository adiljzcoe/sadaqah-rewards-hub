
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface HeartDonationEffectProps {
  trigger: boolean;
  amount: string;
  currency: string;
  onComplete?: () => void;
}

const HeartDonationEffect: React.FC<HeartDonationEffectProps> = ({ 
  trigger, 
  amount, 
  currency, 
  onComplete 
}) => {
  const [hearts, setHearts] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    delay: number;
    scale: number;
  }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    console.log('HeartDonationEffect: Effect triggered with:', { trigger, amount, currency });
    
    if (trigger && !isAnimating) {
      console.log('HeartDonationEffect: Starting animation! Creating hearts...');
      setIsAnimating(true);
      
      // Generate 5-7 hearts with random positions
      const newHearts = Array.from({ length: Math.floor(Math.random() * 3) + 5 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() * 120) - 60, // Wider horizontal spread
        y: (Math.random() * 40) + 20, // Start position
        delay: i * 200, // Stagger timing
        scale: 1.5 + Math.random() * 1.0, // Bigger for better visibility
      }));

      console.log('HeartDonationEffect: Generated hearts:', newHearts);
      setHearts(newHearts);

      // Clear hearts and reset animation state after animation completes
      const timeout = setTimeout(() => {
        console.log('HeartDonationEffect: Clearing hearts and calling onComplete');
        setHearts([]);
        setIsAnimating(false);
        onComplete?.();
      }, 5500); // Slightly longer to ensure animation completes

      return () => clearTimeout(timeout);
    }
  }, [trigger, isAnimating, onComplete, amount, currency]);

  console.log('HeartDonationEffect: Rendering with hearts count:', hearts.length, 'isAnimating:', isAnimating);

  if (!hearts.length) {
    console.log('HeartDonationEffect: No hearts to render');
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-50px) scale(1.8) rotate(15deg);
          }
          25% {
            transform: translateY(-120px) scale(1.6) rotate(-10deg);
            opacity: 1;
          }
          40% {
            transform: translateY(-200px) scale(1.4) rotate(8deg);
            opacity: 1;
          }
          60% {
            transform: translateY(-280px) scale(1.2) rotate(-5deg);
            opacity: 0.8;
          }
          80% {
            transform: translateY(-360px) scale(1.0) rotate(3deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-450px) scale(0.8) rotate(0deg);
            opacity: 0;
          }
        }
        
        .heart-floating {
          animation: heartFloat 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>

      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden" 
        style={{ zIndex: 99999 }}
      >
        {/* Enhanced mobile-optimized overlay */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute heart-floating"
            style={{
              left: `calc(50% + ${heart.x}px)`,
              top: `calc(50% + ${heart.y}px)`,
              animationDelay: `${heart.delay}ms`,
              transform: `scale(${heart.scale})`,
            }}
          >
            <div className="relative">
              {/* Enhanced outer glow effect */}
              <div className="absolute -inset-8 animate-ping">
                <div className="w-40 h-40 bg-pink-500/70 rounded-full blur-3xl"></div>
              </div>
              
              {/* Enhanced inner glow effect */}
              <div className="absolute -inset-6 animate-pulse">
                <div className="w-32 h-32 bg-red-500/80 rounded-full blur-2xl"></div>
              </div>
              
              {/* Main heart with amount - enhanced for mobile */}
              <div className="relative flex flex-col items-center">
                <Heart 
                  className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-2xl" 
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(239, 68, 68, 1)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.9))'
                  }}
                />
                <div className="bg-white/98 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl border-2 border-pink-200 mt-6">
                  <span className="text-2xl font-bold text-emerald-600 whitespace-nowrap">
                    {currency}{amount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeartDonationEffect;
