
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Star, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IslamicCalendarEventProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'prayer' | 'fasting' | 'celebration' | 'worship' | 'pilgrimage';
    significance: 'high' | 'medium' | 'low';
    countdown?: number;
    isToday?: boolean;
    isUpcoming?: boolean;
    color: string;
    icon: string;
    gregorianDate: Date;
  };
}

const IslamicCalendarEvent: React.FC<IslamicCalendarEventProps> = ({ event }) => {
  const getTypeIcon = () => {
    switch (event.type) {
      case 'prayer': return <Star className="h-5 w-5" />;
      case 'fasting': return <Moon className="h-5 w-5" />;
      case 'celebration': return <Sun className="h-5 w-5" />;
      case 'worship': return <Calendar className="h-5 w-5" />;
      case 'pilgrimage': return <Clock className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getSignificanceColor = () => {
    switch (event.significance) {
      case 'high': return 'border-l-red-500 bg-gradient-to-r from-red-50 to-rose-50';
      case 'medium': return 'border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50';
      case 'low': return 'border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50';
      default: return 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50';
    }
  };

  const formatCountdown = (days: number) => {
    if (days === 0) return "Today!";
    if (days === 1) return "Tomorrow";
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.floor(days / 7)} weeks`;
    return `${Math.floor(days / 30)} months`;
  };

  const isPast = event.countdown !== undefined && event.countdown < 0;
  const daysUntil = event.countdown || 0;

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border-l-4",
      getSignificanceColor(),
      event.isToday && "ring-2 ring-yellow-400 shadow-xl animate-pulse",
      event.isUpcoming && "ring-1 ring-blue-400",
      isPast && "opacity-60"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-full text-white",
              event.color
            )}>
              {getTypeIcon()}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="text-xs text-gray-500">
                {event.gregorianDate.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          {event.countdown !== undefined && !isPast && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {formatCountdown(daysUntil)}
            </Badge>
          )}
          
          {isPast && (
            <Badge variant="outline" className="bg-gray-100 text-gray-500">
              Past
            </Badge>
          )}
        </div>

        <p className="text-gray-700 mb-4">{event.description}</p>

        <div className="flex items-center justify-between">
          <Badge 
            variant={event.isToday ? "default" : "secondary"}
            className={cn(
              "capitalize",
              event.isToday && "bg-gradient-to-r from-yellow-400 to-orange-400 text-white animate-bounce"
            )}
          >
            {event.type.replace('_', ' ')}
          </Badge>
          
          {event.isToday && (
            <span className="text-lg font-bold text-yellow-600 animate-bounce">
              🌟 Today! 🌟
            </span>
          )}
          
          {event.isUpcoming && !event.isToday && (
            <span className="text-sm font-medium text-blue-600">
              🔔 Coming Soon
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicCalendarEvent;
