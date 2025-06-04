
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
        x: Math.random() * 60 - 30, // Random horizontal spread (reduced for better visibility)
        y: Math.random() * 15 + 5, // Start from middle area
        delay: i * 100, // Stagger the hearts
        scale: 0.8 + Math.random() * 0.4, // Random size variation
      }));

      console.log('HeartDonationEffect: Generated hearts:', newHearts);
      setHearts(newHearts);

      // Clear hearts after animation completes
      setTimeout(() => {
        setHearts([]);
        onComplete?.();
        console.log('HeartDonationEffect: Animation completed');
      }, 3500);
    }
  }, [trigger, onComplete, amount, currency]);

  if (!hearts.length) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute heart-floating"
          style={{
            left: `calc(50% + ${heart.x}px)`,
            top: `calc(50% + ${heart.y}px)`,
            animationDelay: `${heart.delay}ms`,
            animationDuration: '3s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            zIndex: 1000,
            transform: `scale(${heart.scale})`,
          }}
        >
          <div className="relative">
            {/* Outer halo effect */}
            <div className="absolute -inset-2 animate-ping">
              <div className="w-16 h-16 bg-pink-400/20 rounded-full blur-md"></div>
            </div>
            
            {/* Inner halo effect */}
            <div className="absolute -inset-1 animate-pulse">
              <div className="w-14 h-14 bg-red-400/30 rounded-full blur-sm"></div>
            </div>
            
            {/* Main heart with amount */}
            <div className="relative flex flex-col items-center">
              <Heart 
                className="w-10 h-10 text-red-500 fill-red-500 drop-shadow-xl" 
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.8)) drop-shadow(0 0 20px rgba(239, 68, 68, 0.4))'
                }}
              />
              <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-xl border-2 border-pink-200 mt-2">
                <span className="text-sm font-bold text-emerald-600 whitespace-nowrap">
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
            transform: translateY(-15px) scale(calc(var(--scale) * 1.3)) rotate(8deg);
          }
          25% {
            transform: translateY(-35px) scale(calc(var(--scale) * 1.2)) rotate(-5deg);
            opacity: 1;
          }
          40% {
            transform: translateY(-60px) scale(calc(var(--scale) * 1.1)) rotate(3deg);
            opacity: 1;
          }
          60% {
            transform: translateY(-90px) scale(calc(var(--scale) * 1.0)) rotate(-2deg);
            opacity: 0.9;
          }
          80% {
            transform: translateY(-130px) scale(calc(var(--scale) * 0.8)) rotate(1deg);
            opacity: 0.6;
          }
          95% {
            transform: translateY(-170px) scale(calc(var(--scale) * 0.6)) rotate(0deg);
            opacity: 0.2;
          }
          100% {
            transform: translateY(-200px) scale(calc(var(--scale) * 0.3)) rotate(0deg);
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
