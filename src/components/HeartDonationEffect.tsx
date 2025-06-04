
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

  useEffect(() => {
    console.log('HeartDonationEffect: Effect triggered with:', { trigger, amount, currency });
    
    if (trigger) {
      console.log('HeartDonationEffect: Animation triggered! Creating hearts...');
      
      // Generate 4-6 hearts with random positions
      const newHearts = Array.from({ length: Math.floor(Math.random() * 3) + 4 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100 - 50, // Wider horizontal spread for mobile
        y: Math.random() * 30 + 10, // Start position
        delay: i * 150, // Stagger timing
        scale: 1.2 + Math.random() * 0.8, // Bigger for mobile visibility
      }));

      console.log('HeartDonationEffect: Generated hearts:', newHearts);
      setHearts(newHearts);

      // Clear hearts after animation completes
      const timeout = setTimeout(() => {
        console.log('HeartDonationEffect: Clearing hearts and calling onComplete');
        setHearts([]);
        onComplete?.();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [trigger, onComplete, amount, currency]);

  console.log('HeartDonationEffect: Rendering with hearts count:', hearts.length);

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
            transform: translateY(-40px) scale(1.6) rotate(15deg);
          }
          25% {
            transform: translateY(-100px) scale(1.5) rotate(-10deg);
            opacity: 1;
          }
          40% {
            transform: translateY(-160px) scale(1.4) rotate(8deg);
            opacity: 1;
          }
          60% {
            transform: translateY(-220px) scale(1.2) rotate(-5deg);
            opacity: 0.8;
          }
          80% {
            transform: translateY(-280px) scale(1.0) rotate(3deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-350px) scale(0.6) rotate(0deg);
            opacity: 0;
          }
        }
        
        .heart-floating {
          animation: heartFloat 4.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>

      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden" 
        style={{ zIndex: 99999 }}
      >
        {/* Mobile-optimized overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        
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
              {/* Outer glow effect - enhanced for mobile */}
              <div className="absolute -inset-6 animate-ping">
                <div className="w-32 h-32 bg-pink-500/60 rounded-full blur-2xl"></div>
              </div>
              
              {/* Inner glow effect */}
              <div className="absolute -inset-4 animate-pulse">
                <div className="w-24 h-24 bg-red-500/70 rounded-full blur-xl"></div>
              </div>
              
              {/* Main heart with amount - optimized for mobile */}
              <div className="relative flex flex-col items-center">
                <Heart 
                  className="w-20 h-20 text-red-500 fill-red-500 drop-shadow-2xl" 
                  style={{
                    filter: 'drop-shadow(0 0 25px rgba(239, 68, 68, 1)) drop-shadow(0 0 50px rgba(239, 68, 68, 0.9))'
                  }}
                />
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl border-2 border-pink-200 mt-4">
                  <span className="text-xl font-bold text-emerald-600 whitespace-nowrap">
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
