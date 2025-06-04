
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
    if (trigger) {
      console.log('HeartDonationEffect: Animation triggered!', { amount, currency });
      
      // Generate 4-6 hearts with random positions
      const newHearts = Array.from({ length: Math.floor(Math.random() * 3) + 4 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 40 - 20, // Smaller horizontal spread for mobile
        y: Math.random() * 10 + 10, // Start from button area
        delay: i * 150, // Slightly longer stagger
        scale: 0.9 + Math.random() * 0.3, // Slightly larger for mobile visibility
      }));

      console.log('HeartDonationEffect: Generated hearts:', newHearts);
      setHearts(newHearts);

      // Clear hearts after animation completes
      setTimeout(() => {
        setHearts([]);
        onComplete?.();
        console.log('HeartDonationEffect: Animation completed');
      }, 4000);
    }
  }, [trigger, onComplete, amount, currency]);

  if (!hearts.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute heart-floating"
          style={{
            left: `calc(50% + ${heart.x}px)`,
            top: `calc(50% + ${heart.y}px)`,
            animationDelay: `${heart.delay}ms`,
            animationDuration: '3.5s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            transform: `scale(${heart.scale})`,
          }}
        >
          <div className="relative">
            {/* Outer halo effect - larger for mobile */}
            <div className="absolute -inset-3 animate-ping">
              <div className="w-20 h-20 md:w-16 md:h-16 bg-pink-400/30 rounded-full blur-lg"></div>
            </div>
            
            {/* Inner halo effect */}
            <div className="absolute -inset-2 animate-pulse">
              <div className="w-16 h-16 md:w-14 md:h-14 bg-red-400/40 rounded-full blur-md"></div>
            </div>
            
            {/* Main heart with amount - larger for mobile */}
            <div className="relative flex flex-col items-center">
              <Heart 
                className="w-12 h-12 md:w-10 md:h-10 text-red-500 fill-red-500 drop-shadow-2xl" 
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.9)) drop-shadow(0 0 25px rgba(239, 68, 68, 0.5))'
                }}
              />
              <div className="bg-white/98 backdrop-blur-sm px-4 py-2 md:px-3 md:py-1.5 rounded-full shadow-2xl border-2 border-pink-200 mt-2">
                <span className="text-base md:text-sm font-bold text-emerald-600 whitespace-nowrap">
                  {currency}{amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0) scale(var(--scale)) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-20px) scale(calc(var(--scale) * 1.4)) rotate(10deg);
          }
          25% {
            transform: translateY(-50px) scale(calc(var(--scale) * 1.3)) rotate(-8deg);
            opacity: 1;
          }
          40% {
            transform: translateY(-80px) scale(calc(var(--scale) * 1.2)) rotate(5deg);
            opacity: 1;
          }
          60% {
            transform: translateY(-120px) scale(calc(var(--scale) * 1.1)) rotate(-3deg);
            opacity: 0.9;
          }
          80% {
            transform: translateY(-160px) scale(calc(var(--scale) * 0.9)) rotate(2deg);
            opacity: 0.6;
          }
          95% {
            transform: translateY(-200px) scale(calc(var(--scale) * 0.7)) rotate(0deg);
            opacity: 0.2;
          }
          100% {
            transform: translateY(-240px) scale(calc(var(--scale) * 0.4)) rotate(0deg);
            opacity: 0;
          }
        }
        
        .heart-floating {
          animation-name: heartFloat;
          --scale: 1;
        }
      `}</style>
    </div>
  );
};

export default HeartDonationEffect;
