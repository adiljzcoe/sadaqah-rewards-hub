
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, Zap } from 'lucide-react';

const UrgencyIndicator = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 23
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
            <span className="font-bold text-red-700 text-lg">⚡ URGENT: Limited Time Bonus!</span>
          </div>
          
          <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 rounded-lg p-3 mb-3">
            <div className="text-red-800 font-bold text-sm mb-2">
              🎯 DOUBLE IMPACT BONUS - Today Only!
            </div>
            <div className="text-red-700 text-xs">
              Every donation today gets matched by generous sponsors!
            </div>
          </div>

          <div className="flex justify-center space-x-2 mb-3">
            <div className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold">
              <div className="text-xl">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs">HOURS</div>
            </div>
            <div className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold">
              <div className="text-xl">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs">MINS</div>
            </div>
            <div className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold">
              <div className="text-xl">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-xs">SECS</div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-semibold text-red-700">
              Your £200 becomes £400 impact!
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrgencyIndicator;
