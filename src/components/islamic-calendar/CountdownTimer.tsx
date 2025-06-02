
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  event: {
    id: string;
    title: string;
    description: string;
    countdown?: number;
    color: string;
    icon: string;
    type: string;
  };
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: event.countdown || 0,
    hours: Math.floor(Math.random() * 24),
    minutes: Math.floor(Math.random() * 60),
    seconds: Math.floor(Math.random() * 60)
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;
  const isToday = timeLeft.days === 0;

  return (
    <Card className={cn(
      "bg-white/10 backdrop-blur-sm border-white/20 text-white transition-all duration-300",
      isUrgent && "animate-pulse",
      isToday && "ring-2 ring-yellow-400"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{event.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{event.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {event.type}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-xl font-bold">{timeLeft.days}</div>
            <div className="text-xs opacity-80">Days</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs opacity-80">Hours</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs opacity-80">Min</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-xl font-bold">{timeLeft.seconds}</div>
            <div className="text-xs opacity-80">Sec</div>
          </div>
        </div>

        {isToday && (
          <div className="mt-3 text-center">
            <Badge className="bg-yellow-400 text-yellow-900 animate-bounce">
              🌟 Today is the day! 🌟
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
