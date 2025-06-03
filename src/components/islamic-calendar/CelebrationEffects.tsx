
import React, { useEffect, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';

interface CelebrationParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'confetti' | 'sparkle' | 'star';
  delay: number;
}

interface Firework {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

interface Lantern {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  swayOffset: number;
}

const CelebrationEffects = () => {
  const [confetti, setConfetti] = useState<CelebrationParticle[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  const [sparkles, setSparkles] = useState<CelebrationParticle[]>([]);

  const celebrationColors = [
    '#FFD700', // Gold
    '#FF6B6B', // Coral
    '#4ECDC4', // Turquoise
    '#45B7D1', // Blue
    '#96CEB4', // Mint
    '#FFEAA7', // Light Yellow
    '#DDA0DD', // Plum
    '#98FB98', // Pale Green
    '#F4A460', // Sandy Brown
    '#20B2AA'  // Light Sea Green
  ];

  const arabicColors = [
    '#B8860B', // Dark Golden Rod
    '#CD853F', // Peru
    '#DAA520', // Goldenrod
    '#8B4513', // Saddle Brown
    '#A0522D', // Sienna
    '#D2691E', // Chocolate
    '#228B22', // Forest Green
    '#4169E1', // Royal Blue
  ];

  useEffect(() => {
    // Create initial lanterns
    const initialLanterns: Lantern[] = [];
    for (let i = 0; i < 8; i++) {
      initialLanterns.push({
        id: `lantern-${i}`,
        x: Math.random() * 100,
        y: 10 + Math.random() * 30,
        size: 30 + Math.random() * 20,
        color: arabicColors[Math.floor(Math.random() * arabicColors.length)],
        swayOffset: Math.random() * 2
      });
    }
    setLanterns(initialLanterns);

    // Create ongoing sparkles
    const sparkleInterval = setInterval(() => {
      setSparkles(prev => {
        const newSparkles = [];
        for (let i = 0; i < 3; i++) {
          newSparkles.push({
            id: `sparkle-${Date.now()}-${i}`,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 4 + Math.random() * 8,
            color: celebrationColors[Math.floor(Math.random() * celebrationColors.length)],
            type: 'sparkle' as const,
            delay: Math.random() * 1000
          });
        }
        return [...prev.slice(-15), ...newSparkles];
      });
    }, 2000);

    // Create confetti bursts
    const confettiInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        createConfettiBurst();
      }
    }, 3000);

    // Create firework bursts
    const fireworkInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        createFireworkBurst();
      }
    }, 4000);

    return () => {
      clearInterval(sparkleInterval);
      clearInterval(confettiInterval);
      clearInterval(fireworkInterval);
    };
  }, []);

  const createConfettiBurst = () => {
    const newConfetti: CelebrationParticle[] = [];
    for (let i = 0; i < 20; i++) {
      newConfetti.push({
        id: `confetti-${Date.now()}-${i}`,
        x: Math.random() * 100,
        y: -10,
        size: 4 + Math.random() * 8,
        color: celebrationColors[Math.floor(Math.random() * celebrationColors.length)],
        type: Math.random() > 0.5 ? 'confetti' : 'star',
        delay: Math.random() * 1000
      });
    }
    setConfetti(prev => [...prev, ...newConfetti]);

    // Clean up old confetti
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.includes(c)));
    }, 3000);
  };

  const createFireworkBurst = () => {
    const newFirework: Firework = {
      id: `firework-${Date.now()}`,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 40,
      color: celebrationColors[Math.floor(Math.random() * celebrationColors.length)],
      size: 50 + Math.random() * 50
    };

    setFireworks(prev => [...prev, newFirework]);

    setTimeout(() => {
      setFireworks(prev => prev.filter(f => f.id !== newFirework.id));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Floating Arabic Lanterns */}
      {lanterns.map(lantern => (
        <div
          key={lantern.id}
          className="absolute animate-lantern-sway"
          style={{
            left: `${lantern.x}%`,
            top: `${lantern.y}%`,
            animationDelay: `${lantern.swayOffset}s`
          }}
        >
          <div
            className="relative animate-traditional-glow rounded-lg"
            style={{
              width: `${lantern.size}px`,
              height: `${lantern.size * 1.2}px`,
              backgroundColor: lantern.color,
              opacity: 0.8
            }}
          >
            {/* Lantern glow effect */}
            <div
              className="absolute inset-0 rounded-lg blur-sm"
              style={{
                backgroundColor: lantern.color,
                opacity: 0.6,
                transform: 'scale(1.2)'
              }}
            />
            {/* Lantern details */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-600 rounded-full" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-4 bg-yellow-800 rounded-sm" />
          </div>
        </div>
      ))}

      {/* Confetti */}
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}ms`
          }}
        >
          {particle.type === 'star' ? (
            <Star
              className="animate-spin"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                color: particle.color
              }}
            />
          ) : (
            <div
              className="rounded-sm"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color
              }}
            />
          )}
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}ms`
          }}
        >
          <Sparkles
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              color: sparkle.color
            }}
          />
        </div>
      ))}

      {/* Fireworks */}
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="absolute animate-firework"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`
          }}
        >
          <div
            className="rounded-full border-4"
            style={{
              width: `${firework.size}px`,
              height: `${firework.size}px`,
              borderColor: firework.color,
              background: `radial-gradient(circle, ${firework.color}33 0%, transparent 70%)`
            }}
          />
          {/* Firework sparkles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: firework.color,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${firework.size / 3}px)`
              }}
            />
          ))}
        </div>
      ))}

      {/* Traditional Islamic Patterns */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="w-20 h-20 border-4 border-yellow-400 rotate-45 animate-spin" 
             style={{ borderRadius: '0 50% 0 50%', animationDuration: '8s' }} />
      </div>
      <div className="absolute top-10 right-10 opacity-20">
        <div className="w-20 h-20 border-4 border-green-400 rotate-45 animate-spin" 
             style={{ borderRadius: '0 50% 0 50%', animationDuration: '6s', animationDirection: 'reverse' }} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="w-16 h-16 border-4 border-blue-400 rounded-full animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="w-16 h-16 border-4 border-purple-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default CelebrationEffects;
