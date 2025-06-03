
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

interface AmazingCelebrationEffectsProps {
  isActive: boolean;
  eventTitle: string;
  isPaused?: boolean;
}

const AmazingCelebrationEffects = ({ isActive, eventTitle, isPaused = false }: AmazingCelebrationEffectsProps) => {
  const [duaMessages, setDuaMessages] = useState<DuaMessage[]>([]);
  const [loveMessages, setLoveMessages] = useState<LoveMessage[]>([]);
  const [megaFireworks, setMegaFireworks] = useState<MegaFirework[]>([]);
  const [confettiExplosion, setConfettiExplosion] = useState<any[]>([]);

  const duas = [
    "Alhamdulillahi Rabbil Alameen 🤲",
    "SubhanAllah wa bihamdihi ✨",
    "La ilaha illa Allah 🌟",
    "Allahu Akbar 🎉",
    "Astaghfirullah 💝",
    "Barakallahu feeki 🌺",
    "May Allah bless this day 🌙",
    "Ameen Ya Rabbil Alameen 🕌",
    "Bismillah hirrahman nirraheem 🌸",
    "Rabbana atina fi'd-dunya hasana 🌺",
    "La hawla wa la quwwata illa billah 💫",
    "Hasbi Allahu wa ni'mal wakeel 🌟"
  ];

  const loveMessageTemplates = [
    "💖 Allah loves you",
    "🌟 You are blessed",
    "✨ Jannah awaits",
    "🤲 Your duas are heard",
    "💝 Keep your faith strong",
    "🌺 Allah is with you",
    "🕌 Peace be upon you",
    "🌙 Blessed and loved",
    "💎 You are precious to Allah",
    "🌸 Your heart is pure",
    "⭐ Allah sees your efforts",
    "🌼 Paradise is near"
  ];

  const vibrantColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#98FB98', '#F4A460', '#20B2AA', '#FFD700',
    '#FF69B4', '#00CED1', '#32CD32', '#FF1493', '#00FA9A',
    '#FF8C00', '#9370DB', '#FF4500', '#1E90FF', '#32CD32'
  ];

  useEffect(() => {
    if (!isActive || isPaused) return;

    // Initial mega burst
    createMegaConfettiExplosion();
    createFloatingDuas();
    
    // Continuous celebration intervals
    const confettiInterval = setInterval(() => {
      createMegaConfettiExplosion();
    }, 4000);

    const duaInterval = setInterval(() => {
      createFloatingDuas();
    }, 3000);

    const loveInterval = setInterval(() => {
      createLoveMessages();
    }, 5000);

    const fireworkInterval = setInterval(() => {
      createMegaFireworks();
    }, 6000);

    // Cleanup old effects periodically
    const cleanupInterval = setInterval(() => {
      setDuaMessages(prev => prev.filter(msg => Date.now() - parseInt(msg.id.split('-')[1]) < 8000));
      setLoveMessages(prev => prev.filter(msg => Date.now() - parseInt(msg.id.split('-')[1]) < 8000));
      setMegaFireworks(prev => prev.filter(fw => Date.now() - parseInt(fw.id.split('-')[1]) < 3000));
      setConfettiExplosion(prev => prev.filter(conf => Date.now() - parseInt(conf.id.split('-')[1]) < 6000));
    }, 2000);

    return () => {
      clearInterval(confettiInterval);
      clearInterval(duaInterval);
      clearInterval(loveInterval);
      clearInterval(fireworkInterval);
      clearInterval(cleanupInterval);
    };
  }, [isActive, isPaused]);

  // Clear all effects when paused or inactive
  useEffect(() => {
    if (!isActive || isPaused) {
      setDuaMessages([]);
      setLoveMessages([]);
      setMegaFireworks([]);
      setConfettiExplosion([]);
    }
  }, [isActive, isPaused]);

  const createMegaConfettiExplosion = () => {
    const newConfetti = [];
    for (let i = 0; i < 60; i++) {
      newConfetti.push({
        id: `confetti-${Date.now()}-${i}`,
        x: Math.random() * 100, // Full screen width
        y: -10,
        size: 4 + Math.random() * 10,
        color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 2000
      });
    }
    setConfettiExplosion(prev => [...prev, ...newConfetti]);
  };

  const createFloatingDuas = () => {
    const newDuas = [];
    for (let i = 0; i < 8; i++) {
      newDuas.push({
        id: `dua-${Date.now()}-${i}`,
        text: duas[Math.floor(Math.random() * duas.length)],
        x: Math.random() * 100, // Full screen coverage
        y: 10 + Math.random() * 80, // Most of screen height
        color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
        size: 14 + Math.random() * 6
      });
    }
    setDuaMessages(prev => [...prev, ...newDuas]);
  };

  const createLoveMessages = () => {
    const newLove = [];
    for (let i = 0; i < 6; i++) {
      newLove.push({
        id: `love-${Date.now()}-${i}`,
        text: loveMessageTemplates[Math.floor(Math.random() * loveMessageTemplates.length)],
        x: Math.random() * 100, // Full screen coverage
        y: 20 + Math.random() * 60,
        color: ['#FF69B4', '#FF1493', '#DC143C', '#FF6347', '#FFD700', '#FF8C00'][Math.floor(Math.random() * 6)]
      });
    }
    setLoveMessages(prev => [...prev, ...newLove]);
  };

  const createMegaFireworks = () => {
    const newFireworks = [];
    for (let i = 0; i < 6; i++) {
      newFireworks.push({
        id: `firework-${Date.now()}-${i}`,
        x: 10 + Math.random() * 80, // Across the screen
        y: 10 + Math.random() * 40, // Upper portion
        color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
        size: 60 + Math.random() * 80,
        burst: false
      });
    }
    setMegaFireworks(prev => [...prev, ...newFireworks]);

    // Trigger burst effect after a delay
    setTimeout(() => {
      setMegaFireworks(prev => prev.map(fw => 
        newFireworks.find(nf => nf.id === fw.id) ? { ...fw, burst: true } : fw
      ));
    }, 600);
  };

  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-40 overflow-hidden ${isPaused ? 'opacity-30' : 'opacity-100'} transition-opacity duration-500`}>
      {/* Mega Confetti Explosion */}
      {confettiExplosion.map(confetti => (
        <div
          key={confetti.id}
          className={`absolute animate-confetti ${isPaused ? 'animation-play-state-paused' : ''}`}
          style={{
            left: `${confetti.x}%`,
            top: `${confetti.y}%`,
            animationDelay: `${confetti.delay}ms`,
            animationDuration: '5s'
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
          className={`absolute animate-float-up font-bold text-center px-3 py-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm border-2 ${isPaused ? 'animation-play-state-paused' : ''}`}
          style={{
            left: `${dua.x}%`,
            top: `${dua.y}%`,
            color: dua.color,
            fontSize: `${dua.size}px`,
            borderColor: dua.color,
            animationDuration: '7s'
          }}
        >
          {dua.text}
        </div>
      ))}

      {/* Love Messages */}
      {loveMessages.map(love => (
        <div
          key={love.id}
          className={`absolute animate-pulse font-bold text-center px-3 py-2 rounded-lg bg-white/95 shadow-xl backdrop-blur-sm ${isPaused ? 'animation-play-state-paused' : ''}`}
          style={{
            left: `${love.x}%`,
            top: `${love.y}%`,
            color: love.color,
            fontSize: '16px',
            animationDuration: '3s'
          }}
        >
          {love.text}
        </div>
      ))}

      {/* Mega Fireworks */}
      {megaFireworks.map(firework => (
        <div
          key={firework.id}
          className={`absolute ${firework.burst ? 'animate-firework' : ''} ${isPaused ? 'animation-play-state-paused' : ''}`}
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
          {firework.burst && [...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-ping ${isPaused ? 'animation-play-state-paused' : ''}`}
              style={{
                backgroundColor: firework.color,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${firework.size / 2}px)`
              }}
            />
          ))}
        </div>
      ))}

      {/* Background sparkles across entire screen */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`bg-sparkle-${i}`}
          className={`absolute animate-sparkle ${isPaused ? 'animation-play-state-paused' : ''}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4000}ms`
          }}
        >
          <Sparkles
            className="h-4 w-4 opacity-60"
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
