
import React, { useEffect, useState } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface DuaMessage {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

interface LoveMessage {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
}

interface MegaFirework {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  burst: boolean;
}

interface FloatingLantern {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

interface AmazingCelebrationEffectsProps {
  isActive: boolean;
  eventTitle: string;
}

const AmazingCelebrationEffects = ({ isActive, eventTitle }: AmazingCelebrationEffectsProps) => {
  const [duaMessages, setDuaMessages] = useState<DuaMessage[]>([]);
  const [loveMessages, setLoveMessages] = useState<LoveMessage[]>([]);
  const [megaFireworks, setMegaFireworks] = useState<MegaFirework[]>([]);
  const [floatingLanterns, setFloatingLanterns] = useState<FloatingLantern[]>([]);
  const [confettiExplosion, setConfettiExplosion] = useState<any[]>([]);

  const duas = [
    "Alhamdulillahi Rabbil Alameen 🤲",
    "SubhanAllah wa bihamdihi ✨",
    "La ilaha illa Allah 🌟",
    "Allahu Akbar 🎉",
    "Astaghfirullah 💝",
    "Barakallahu feeki 🌺",
    "May Allah bless this day 🌙",
    "Ameen Ya Rabbil Alameen 🕌"
  ];

  const loveMessageTemplates = [
    "💖 Allah loves you",
    "🌟 You are blessed",
    "✨ Jannah awaits",
    "🤲 Your duas are heard",
    "💝 Keep your faith strong",
    "🌺 Allah is with you",
    "🕌 Peace be upon you",
    "🌙 Blessed and loved"
  ];

  const vibrantColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#98FB98', '#F4A460', '#20B2AA', '#FFD700',
    '#FF69B4', '#00CED1', '#32CD32', '#FF1493', '#00FA9A'
  ];

  const arabicColors = [
    '#B8860B', '#CD853F', '#DAA520', '#8B4513', '#A0522D', 
    '#D2691E', '#228B22', '#4169E1', '#DC143C', '#FF8C00'
  ];

  useEffect(() => {
    if (!isActive) return;

    // Create mega celebration sequence
    const celebrationSequence = async () => {
      // Phase 1: Instant confetti explosion
      createMegaConfettiExplosion();
      
      // Phase 2: Floating duas (immediate)
      createFloatingDuas();
      
      // Phase 3: Love messages (after 0.5s)
      setTimeout(() => createLoveMessages(), 500);
      
      // Phase 4: Mega fireworks (after 1s)
      setTimeout(() => createMegaFireworks(), 1000);
      
      // Phase 5: Beautiful lanterns (after 1.5s)
      setTimeout(() => createFloatingLanterns(), 1500);
      
      // Phase 6: Second wave of effects (after 3s)
      setTimeout(() => {
        createFloatingDuas();
        createMegaConfettiExplosion();
      }, 3000);
    };

    celebrationSequence();

    // Cleanup after 8 seconds
    const cleanup = setTimeout(() => {
      setDuaMessages([]);
      setLoveMessages([]);
      setMegaFireworks([]);
      setFloatingLanterns([]);
      setConfettiExplosion([]);
    }, 8000);

    return () => clearTimeout(cleanup);
  }, [isActive]);

  const createMegaConfettiExplosion = () => {
    const newConfetti = [];
    for (let i = 0; i < 80; i++) {
      newConfetti.push({
        id: `confetti-${Date.now()}-${i}`,
        x: Math.random() * 100,
        y: -10,
        size: 6 + Math.random() * 12,
        color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 1000
      });
    }
    setConfettiExplosion(prev => [...prev, ...newConfetti]);
  };

  const createFloatingDuas = () => {
    const newDuas = [];
    for (let i = 0; i < 6; i++) {
      newDuas.push({
        id: `dua-${Date.now()}-${i}`,
        text: duas[Math.floor(Math.random() * duas.length)],
        x: i < 3 ? 5 + Math.random() * 15 : 80 + Math.random() * 15, // Left or right sides
        y: 20 + Math.random() * 60,
        color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
        size: 16 + Math.random() * 8
      });
    }
    setDuaMessages(prev => [...prev, ...newDuas]);
  };

  const createLoveMessages = () => {
    const newLove = [];
    for (let i = 0; i < 5; i++) {
      newLove.push({
        id: `love-${Date.now()}-${i}`,
        text: loveMessageTemplates[Math.floor(Math.random() * loveMessageTemplates.length)],
        x: i < 2 ? 2 + Math.random() * 18 : 80 + Math.random() * 18, // Sides
        y: 30 + Math.random() * 40,
        color: ['#FF69B4', '#FF1493', '#DC143C', '#FF6347'][Math.floor(Math.random() * 4)]
      });
    }
    setLoveMessages(prev => [...prev, ...newLove]);
  };

  const createMegaFireworks = () => {
    const newFireworks = [];
    for (let i = 0; i < 8; i++) {
      newFireworks.push({
        id: `firework-${Date.now()}-${i}`,
        x: i < 4 ? 10 + Math.random() * 20 : 70 + Math.random() * 20, // Left or right
        y: 15 + Math.random() * 30,
        color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
        size: 80 + Math.random() * 60,
        burst: false
      });
    }
    setMegaFireworks(prev => [...prev, ...newFireworks]);

    // Trigger burst effect after a delay
    setTimeout(() => {
      setMegaFireworks(prev => prev.map(fw => ({ ...fw, burst: true })));
    }, 500);
  };

  const createFloatingLanterns = () => {
    const newLanterns = [];
    for (let i = 0; i < 12; i++) {
      newLanterns.push({
        id: `lantern-${Date.now()}-${i}`,
        x: i < 6 ? 2 + Math.random() * 18 : 80 + Math.random() * 18, // Sides
        y: 80 + Math.random() * 20, // Bottom area
        size: 25 + Math.random() * 20,
        color: arabicColors[Math.floor(Math.random() * arabicColors.length)],
        delay: Math.random() * 2000
      });
    }
    setFloatingLanterns(prev => [...prev, ...newLanterns]);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Mega Confetti Explosion */}
      {confettiExplosion.map(confetti => (
        <div
          key={confetti.id}
          className="absolute animate-confetti"
          style={{
            left: `${confetti.x}%`,
            top: `${confetti.y}%`,
            animationDelay: `${confetti.delay}ms`,
            animationDuration: '4s'
          }}
        >
          <div
            className="rounded-sm animate-spin"
            style={{
              width: `${confetti.size}px`,
              height: `${confetti.size}px`,
              backgroundColor: confetti.color,
              transform: `rotate(${confetti.rotation}deg)`
            }}
          />
        </div>
      ))}

      {/* Floating Duas */}
      {duaMessages.map(dua => (
        <div
          key={dua.id}
          className="absolute animate-float-up font-bold text-center px-4 py-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm border-2"
          style={{
            left: `${dua.x}%`,
            top: `${dua.y}%`,
            color: dua.color,
            fontSize: `${dua.size}px`,
            borderColor: dua.color,
            animationDuration: '5s'
          }}
        >
          {dua.text}
        </div>
      ))}

      {/* Love Messages */}
      {loveMessages.map(love => (
        <div
          key={love.id}
          className="absolute animate-pulse font-bold text-center px-3 py-2 rounded-lg bg-white/95 shadow-xl backdrop-blur-sm"
          style={{
            left: `${love.x}%`,
            top: `${love.y}%`,
            color: love.color,
            fontSize: '18px',
            animationDuration: '2s'
          }}
        >
          {love.text}
        </div>
      ))}

      {/* Mega Fireworks */}
      {megaFireworks.map(firework => (
        <div
          key={firework.id}
          className={`absolute ${firework.burst ? 'animate-firework' : ''}`}
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`
          }}
        >
          <div
            className="rounded-full border-4 opacity-80"
            style={{
              width: `${firework.size}px`,
              height: `${firework.size}px`,
              borderColor: firework.color,
              background: `radial-gradient(circle, ${firework.color}33 0%, transparent 70%)`
            }}
          />
          {/* Firework sparkles */}
          {firework.burst && [...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-ping"
              style={{
                backgroundColor: firework.color,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-${firework.size / 2}px)`
              }}
            />
          ))}
        </div>
      ))}

      {/* Floating Arabic Lanterns */}
      {floatingLanterns.map(lantern => (
        <div
          key={lantern.id}
          className="absolute animate-float-up"
          style={{
            left: `${lantern.x}%`,
            top: `${lantern.y}%`,
            animationDelay: `${lantern.delay}ms`,
            animationDuration: '6s'
          }}
        >
          <div
            className="relative animate-traditional-glow rounded-lg opacity-90"
            style={{
              width: `${lantern.size}px`,
              height: `${lantern.size * 1.3}px`,
              backgroundColor: lantern.color
            }}
          >
            {/* Lantern glow */}
            <div
              className="absolute inset-0 rounded-lg blur-md"
              style={{
                backgroundColor: lantern.color,
                opacity: 0.7,
                transform: 'scale(1.3)'
              }}
            />
            {/* Lantern details */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-3 bg-yellow-600 rounded-sm" />
            <Star className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-yellow-200 animate-pulse" />
          </div>
        </div>
      ))}

      {/* Side sparkles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`side-sparkle-${i}`}
          className="absolute animate-sparkle"
          style={{
            left: i < 10 ? `${Math.random() * 15}%` : `${85 + Math.random() * 15}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3000}ms`
          }}
        >
          <Sparkles
            className="h-6 w-6"
            style={{
              color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)]
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AmazingCelebrationEffects;
