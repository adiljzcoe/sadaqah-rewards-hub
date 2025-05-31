
import React, { useState, useEffect } from 'react';
import SimpleGoldCoin from './SimpleGoldCoin';

interface CoinAnimationProps {
  trigger: boolean;
  onComplete?: () => void;
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({ trigger, onComplete }) => {
  const [coins, setCoins] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (trigger) {
      // Generate 4-6 coins with random positions
      const newCoins = Array.from({ length: Math.floor(Math.random() * 3) + 4 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 - 40, // Wider spread for bigger mascot
        y: Math.random() * 30 + 15, // Random starting y position
        delay: i * 120, // Stagger the coins
      }));

      setCoins(newCoins);

      // Clear coins after animation completes
      setTimeout(() => {
        setCoins([]);
        onComplete?.();
      }, 2000);
    }
  }, [trigger, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute animate-coin-to-top"
          style={{
            left: `calc(50% + ${coin.x}px)`,
            bottom: `${coin.y}px`,
            animationDelay: `${coin.delay}ms`,
            animationDuration: '1.5s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
          }}
        >
          <SimpleGoldCoin size={20} />
        </div>
      ))}

      <style>{`
        @keyframes coin-to-top {
          0% {
            transform: translateY(0) translateX(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          30% {
            transform: translateY(-40px) translateX(0) scale(1.1) rotate(90deg);
            opacity: 1;
          }
          60% {
            transform: translateY(-80px) translateX(calc(var(--target-x, 0px))) scale(0.9) rotate(180deg);
            opacity: 0.9;
          }
          85% {
            transform: translateY(-120px) translateX(calc(var(--target-x, 0px) * 2)) scale(0.6) rotate(270deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-140px) translateX(calc(var(--target-x, 0px) * 2)) scale(0.2) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-coin-to-top {
          animation-name: coin-to-top;
          --target-x: calc(-1 * var(--start-x, 0px));
        }
      `}</style>
    </div>
  );
};

export default CoinAnimation;
