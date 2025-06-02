
import React, { useEffect, useState } from 'react';

interface PrayerWave {
  id: string;
  startTime: number;
  duration: number;
  center: { x: number; y: number };
  color: string;
  intensity: number;
}

const PrayerWaveAnimation = () => {
  const [waves, setWaves] = useState<PrayerWave[]>([]);

  useEffect(() => {
    const createWave = () => {
      const newWave: PrayerWave = {
        id: Date.now().toString() + Math.random(),
        startTime: Date.now(),
        duration: 3000,
        center: {
          x: Math.random() * 100,
          y: Math.random() * 100
        },
        color: Math.random() > 0.5 ? '#10b981' : '#059669',
        intensity: 0.3 + Math.random() * 0.7
      };
      
      setWaves(prev => [...prev.slice(-10), newWave]);
    };

    // Create waves every 2-4 seconds
    const interval = setInterval(createWave, 2000 + Math.random() * 2000);
    
    // Initial wave
    createWave();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setWaves(prev => prev.filter(wave => now - wave.startTime < wave.duration));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {waves.map(wave => {
        const elapsed = Date.now() - wave.startTime;
        const progress = elapsed / wave.duration;
        const scale = progress * 3;
        const opacity = Math.max(0, wave.intensity * (1 - progress));

        return (
          <div
            key={wave.id}
            className="absolute rounded-full border-2"
            style={{
              left: `${wave.center.x}%`,
              top: `${wave.center.y}%`,
              width: `${scale * 50}px`,
              height: `${scale * 50}px`,
              transform: 'translate(-50%, -50%)',
              borderColor: wave.color,
              opacity: opacity,
              animation: 'pulse 2s ease-out infinite'
            }}
          />
        );
      })}
    </div>
  );
};

export default PrayerWaveAnimation;
