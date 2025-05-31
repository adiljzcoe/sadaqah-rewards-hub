
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
      console.log('Coin animation triggered!');
      // Generate 5-7 coins with random starting positions
      const newCoins = Array.from({ length: Math.floor(Math.random() * 3) + 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 120 - 60, // Random horizontal spread
        y: Math.random() * 40 + 80, // Start from bottom area
        delay: i * 200, // Stagger the coins more
      }));

      console.log('Generated coins:', newCoins);
      setCoins(newCoins);

      // Clear coins after animation completes
      setTimeout(() => {
        setCoins([]);
        onComplete?.();
        console.log('Coin animation completed');
      }, 3000);
    }
  }, [trigger, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute coin-flying"
          style={{
            left: `calc(50% + ${coin.x}px)`,
            bottom: `${coin.y}px`,
            animationDelay: `${coin.delay}ms`,
            animationDuration: '2.5s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            zIndex: 40,
          }}
        >
          <SimpleGoldCoin size={24} />
        </div>
      ))}

      <style>{`
        @keyframes coinFlyToHead {
          0% {
            transform: translateY(0) translateX(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateY(-30px) translateX(calc(var(--start-x) * 0.5)) scale(1.2) rotate(90deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-60px) translateX(calc(var(--start-x) * 0.2)) scale(1.1) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-90px) translateX(calc(var(--start-x) * -0.3)) scale(0.8) rotate(270deg);
            opacity: 0.8;
          }
          90% {
            transform: translateY(-110px) translateX(calc(var(--start-x) * -0.7)) scale(0.5) rotate(340deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-130px) translateX(calc(var(--start-x) * -1)) scale(0.2) rotate(360deg);
            opacity: 0;
          }
        }
        
        .coin-flying {
          animation-name: coinFlyToHead;
          --start-x: 0px;
        }
      `}</style>
    </div>
  );
};

export default CoinAnimation;
