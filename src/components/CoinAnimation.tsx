
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
      // Generate 3-5 coins with random positions
      const newCoins = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 60 - 30, // Random x offset
        y: Math.random() * 20 + 10, // Random starting y position
        delay: i * 100, // Stagger the coins
      }));

      setCoins(newCoins);

      // Clear coins after animation completes
      setTimeout(() => {
        setCoins([]);
        onComplete?.();
      }, 1500);
    }
  }, [trigger, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute animate-coin-to-mascot"
          style={{
            left: `calc(50% + ${coin.x}px)`,
            bottom: `${coin.y}px`,
            animationDelay: `${coin.delay}ms`,
            animationDuration: '1.2s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
          }}
        >
          <SimpleGoldCoin size={16} />
        </div>
      ))}

      <style>{`
        @keyframes coin-to-mascot {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-40px) scale(0.8) rotate(180deg);
            opacity: 0.9;
          }
          80% {
            transform: translateY(-60px) scale(0.6) rotate(270deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-80px) scale(0.3) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-coin-to-mascot {
          animation-name: coin-to-mascot;
        }
      `}</style>
    </div>
  );
};

export default CoinAnimation;
