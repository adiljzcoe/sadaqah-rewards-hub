
import React, { useEffect, useState } from 'react';

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  pulsePhase: number;
}

const PrayerParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      initialParticles.push({
        id: i.toString(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
        speed: 0.1 + Math.random() * 0.3,
        color: Math.random() > 0.5 ? '#10b981' : '#059669',
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    setParticles(initialParticles);

    // Animate particles
    const animationInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y - particle.speed + 100) % 100,
        pulsePhase: particle.pulsePhase + 0.1,
        opacity: 0.3 + 0.4 * Math.sin(particle.pulsePhase)
      })));
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animation: `pulse ${2 + Math.random()}s ease-in-out infinite`
          }}
        />
      ))}
    </div>
  );
};

export default PrayerParticleSystem;
