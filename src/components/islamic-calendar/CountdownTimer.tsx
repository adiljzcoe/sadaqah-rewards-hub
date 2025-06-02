
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
    gregorianDate: Date;
  };
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetTime = event.gregorianDate.getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [event.gregorianDate]);

  const isToday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;

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

        {isToday ? (
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-300 animate-bounce">
              🌟 TODAY! 🌟
            </div>
            <p className="text-sm opacity-90 mt-2">The blessed day is here!</p>
          </div>
        ) : (
          <>
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

            <div className="mt-3 text-center">
              <p className="text-sm opacity-90">
                {event.gregorianDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
