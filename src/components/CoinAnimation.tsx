
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
      // Generate 4-6 coins with random positions around the mascot
      const newCoins = Array.from({ length: Math.floor(Math.random() * 3) + 4 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 200, // Wider spread around mascot
        y: Math.random() * 40 + 20, // Start from bottom area
        delay: i * 150, // Stagger the coins
      }));

      console.log('Generated coins:', newCoins);
      setCoins(newCoins);

      // Clear coins after animation completes
      setTimeout(() => {
        setCoins([]);
        onComplete?.();
        console.log('Coin animation completed');
      }, 2500);
    }
  }, [trigger, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute coin-flying"
          style={{
            left: `calc(50% + ${coin.x}px)`,
            bottom: `${coin.y}px`,
            animationDelay: `${coin.delay}ms`,
            animationDuration: '2s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            zIndex: 20,
          }}
        >
          <SimpleGoldCoin size={24} />
        </div>
      ))}

      <style>{`
        @keyframes fly-to-mascot-head {
          0% {
            transform: translateY(0) translateX(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          20% {
            transform: translateY(-30px) translateX(0) scale(1.2) rotate(72deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-80px) translateX(calc(var(--coin-x) * -0.5)) scale(1) rotate(180deg);
            opacity: 1;
          }
          80% {
            transform: translateY(-120px) translateX(calc(var(--coin-x) * -0.8)) scale(0.7) rotate(288deg);
            opacity: 0.8;
          }
          95% {
            transform: translateY(-140px) translateX(calc(var(--coin-x) * -1)) scale(0.4) rotate(342deg);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-150px) translateX(calc(var(--coin-x) * -1)) scale(0.1) rotate(360deg);
            opacity: 0;
          }
        }
        
        .coin-flying {
          animation-name: fly-to-mascot-head;
          --coin-x: var(--start-x, 0px);
        }
      `}</style>
    </div>
  );
};

export default CoinAnimation;
