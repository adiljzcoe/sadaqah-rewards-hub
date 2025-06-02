
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Bell } from 'lucide-react';

interface IslamicCalendarEventProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    countdown: number;
    type: string;
    significance: string;
    color: string;
    icon: string;
    isToday: boolean;
    isUpcoming: boolean;
    slug: string;
  };
}

const IslamicCalendarEvent: React.FC<IslamicCalendarEventProps> = ({ event }) => {
  const getCountdownText = () => {
    if (event.countdown === 0) return 'Today!';
    if (event.countdown === 1) return 'Tomorrow';
    if (event.countdown > 0) return `${event.countdown} days`;
    return 'Past';
  };

  const getCountdownColor = () => {
    if (event.countdown === 0) return 'text-yellow-600 font-bold';
    if (event.countdown <= 7) return 'text-orange-600 font-semibold';
    if (event.countdown <= 30) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${
      event.isToday ? 'ring-2 ring-yellow-400 shadow-lg' : 
      event.isUpcoming ? 'border-orange-300' : ''
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="text-6xl">{event.icon}</div>
      </div>

      <CardHeader className="relative">
        <div className="flex items-start justify-between mb-2">
          <Badge 
            variant="outline" 
            className={`${event.color} text-white border-0 font-medium`}
          >
            {event.type}
          </Badge>
          {event.isToday && (
            <Badge className="bg-yellow-500 text-white animate-pulse">
              🌟 Today
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-xl mb-2 line-clamp-2">
          {event.title}
        </CardTitle>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className={`flex items-center gap-1 ${getCountdownColor()}`}>
            <Clock className="h-4 w-4" />
            <span>{getCountdownText()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {event.significance} significance
          </Badge>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            
            <Button asChild size="sm" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
              <Link to={`/islamic-calendar/${event.slug}`}>
                <span>Celebrate</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicCalendarEvent;
