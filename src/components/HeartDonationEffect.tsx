
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
        x: Math.random() * 60 - 30, // Wider horizontal spread
        y: Math.random() * 20 + 20, // Start higher up
        delay: i * 200, // Longer stagger for visibility
        scale: 1.0 + Math.random() * 0.5, // Bigger for visibility
      }));

      console.log('HeartDonationEffect: Generated hearts:', newHearts);
      setHearts(newHearts);

      // Clear hearts after animation completes
      const timeout = setTimeout(() => {
        console.log('HeartDonationEffect: Clearing hearts and calling onComplete');
        setHearts([]);
        onComplete?.();
      }, 4500); // Longer duration

      return () => clearTimeout(timeout);
    }
  }, [trigger, onComplete, amount, currency]);

  console.log('HeartDonationEffect: Rendering with hearts count:', hearts.length);

  if (!hearts.length) {
    console.log('HeartDonationEffect: No hearts to render');
    return null;
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden" 
      style={{ zIndex: 9999 }}
    >
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute heart-floating"
          style={{
            left: `calc(50% + ${heart.x}px)`,
            top: `calc(50% + ${heart.y}px)`,
            animationDelay: `${heart.delay}ms`,
            animationDuration: '4s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            transform: `scale(${heart.scale})`,
            '--scale': heart.scale.toString(),
          }}
        >
          <div className="relative">
            {/* Outer halo effect - much larger and brighter */}
            <div className="absolute -inset-4 animate-ping">
              <div className="w-24 h-24 bg-pink-500/50 rounded-full blur-xl"></div>
            </div>
            
            {/* Inner halo effect */}
            <div className="absolute -inset-3 animate-pulse">
              <div className="w-20 h-20 bg-red-500/60 rounded-full blur-lg"></div>
            </div>
            
            {/* Main heart with amount - much larger */}
            <div className="relative flex flex-col items-center">
              <Heart 
                className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-2xl" 
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 1)) drop-shadow(0 0 40px rgba(239, 68, 68, 0.8))'
                }}
              />
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-2xl border-2 border-pink-200 mt-3">
                <span className="text-lg font-bold text-emerald-600 whitespace-nowrap">
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
            transform: translateY(-30px) scale(calc(var(--scale) * 1.5)) rotate(15deg);
          }
          25% {
            transform: translateY(-80px) scale(calc(var(--scale) * 1.4)) rotate(-10deg);
            opacity: 1;
          }
          40% {
            transform: translateY(-130px) scale(calc(var(--scale) * 1.3)) rotate(8deg);
            opacity: 1;
          }
          60% {
            transform: translateY(-180px) scale(calc(var(--scale) * 1.2)) rotate(-5deg);
            opacity: 0.9;
          }
          80% {
            transform: translateY(-230px) scale(calc(var(--scale) * 1.0)) rotate(3deg);
            opacity: 0.6;
          }
          95% {
            transform: translateY(-280px) scale(calc(var(--scale) * 0.8)) rotate(0deg);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-320px) scale(calc(var(--scale) * 0.5)) rotate(0deg);
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
