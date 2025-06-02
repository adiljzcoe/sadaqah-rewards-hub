
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star, Moon, Heart, Award } from 'lucide-react';

const IslamicCalendarStats = () => {
  const stats = [
    {
      title: 'Sacred Days This Month',
      value: '8',
      description: 'Special worship opportunities',
      icon: <Calendar className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      textColor: 'text-emerald-700'
    },
    {
      title: 'Fasting Days Ahead',
      value: '3',
      description: 'Upcoming Sunnah fasts',
      icon: <Moon className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      textColor: 'text-blue-700'
    },
    {
      title: 'Community Participation',
      value: '1,247',
      description: 'Muslims following calendar',
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-pink-500 to-rose-500',
      textColor: 'text-pink-700'
    },
    {
      title: 'Completed Observances',
      value: '156',
      description: 'This Islamic year',
      icon: <Award className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      textColor: 'text-yellow-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            <div className={`${stat.color} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className={`text-sm ${stat.textColor}`}>{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IslamicCalendarStats;
