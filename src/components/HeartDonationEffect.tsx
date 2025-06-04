
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
      console.log('Heart donation effect triggered!');
      
      // Generate 3-5 hearts with random positions
      const newHearts = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100 - 50, // Random horizontal spread
        y: Math.random() * 20 + 10, // Start from button area
        delay: i * 150, // Stagger the hearts
        scale: 0.8 + Math.random() * 0.4, // Random size variation
      }));

      console.log('Generated hearts:', newHearts);
      setHearts(newHearts);

      // Clear hearts after animation completes
      setTimeout(() => {
        setHearts([]);
        onComplete?.();
        console.log('Heart donation effect completed');
      }, 3000);
    }
  }, [trigger, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute heart-floating"
          style={{
            left: `calc(50% + ${heart.x}px)`,
            top: `calc(50% + ${heart.y}px)`,
            animationDelay: `${heart.delay}ms`,
            animationDuration: '2.5s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            zIndex: 50,
            transform: `scale(${heart.scale})`,
          }}
        >
          <div className="relative">
            {/* Halo effect background */}
            <div className="absolute inset-0 animate-ping">
              <div className="w-12 h-12 bg-pink-400/30 rounded-full blur-sm"></div>
            </div>
            
            {/* Main heart with amount */}
            <div className="relative flex flex-col items-center">
              <Heart 
                className="w-8 h-8 text-red-500 fill-red-500 drop-shadow-lg" 
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))'
                }}
              />
              <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg border border-pink-200 mt-1">
                <span className="text-xs font-bold text-emerald-600">
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
          15% {
            opacity: 1;
            transform: translateY(-20px) scale(calc(var(--scale) * 1.2)) rotate(5deg);
          }
          30% {
            transform: translateY(-40px) scale(calc(var(--scale) * 1.1)) rotate(-3deg);
          }
          50% {
            transform: translateY(-70px) scale(calc(var(--scale) * 1.0)) rotate(2deg);
            opacity: 1;
          }
          70% {
            transform: translateY(-100px) scale(calc(var(--scale) * 0.9)) rotate(-1deg);
            opacity: 0.8;
          }
          85% {
            transform: translateY(-130px) scale(calc(var(--scale) * 0.7)) rotate(1deg);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-160px) scale(calc(var(--scale) * 0.5)) rotate(0deg);
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
