
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
        x: (Math.random() - 0.5) * 300, // Start from edges of container
        y: Math.random() * 100 + 150, // Start from bottom area
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
    <>
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute coin-flying pointer-events-none"
          style={{
            left: `calc(50% + ${coin.x}px)`,
            top: `calc(100% - ${coin.y}px)`,
            animationDelay: `${coin.delay}ms`,
            animationDuration: '2s',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            zIndex: 30,
          }}
        >
          <SimpleGoldCoin size={32} />
        </div>
      ))}

      <style>{`
        @keyframes fly-to-mascot-head {
          0% {
            transform: translateY(0) translateX(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          20% {
            transform: translateY(-40px) translateX(0) scale(1.3) rotate(72deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-120px) translateX(calc(var(--coin-x) * -0.3)) scale(1.1) rotate(180deg);
            opacity: 1;
          }
          80% {
            transform: translateY(-180px) translateX(calc(var(--coin-x) * -0.7)) scale(0.8) rotate(288deg);
            opacity: 0.8;
          }
          95% {
            transform: translateY(-220px) translateX(calc(var(--coin-x) * -0.9)) scale(0.4) rotate(342deg);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-250px) translateX(calc(var(--coin-x) * -1)) scale(0.1) rotate(360deg);
            opacity: 0;
          }
        }
        
        .coin-flying {
          animation-name: fly-to-mascot-head;
          --coin-x: 0px;
        }
      `}</style>
    </>
  );
};

export default CoinAnimation;
