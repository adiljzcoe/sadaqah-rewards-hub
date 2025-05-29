
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Clock, Users } from 'lucide-react';

interface DonationActivity {
  id: string;
  donor: string;
  amount: number;
  currency: string;
  cause: string;
  location: string;
  timestamp: Date;
  emoji: string;
}

const LiveFeed = () => {
  const [activities, setActivities] = useState<DonationActivity[]>([
    {
      id: '1',
      donor: 'Ahmad M.',
      amount: 50,
      currency: '£',
      cause: 'Hot Meals for Orphans',
      location: 'Gaza',
      timestamp: new Date(Date.now() - 30000),
      emoji: '🍽️'
    },
    {
      id: '2',
      donor: 'Anonymous',
      amount: 100,
      currency: '£',
      cause: 'Water Well Project',
      location: 'Bangladesh',
      timestamp: new Date(Date.now() - 60000),
      emoji: '💧'
    },
    {
      id: '3',
      donor: 'Fatima S.',
      amount: 25,
      currency: '£',
      cause: 'Emergency Relief',
      location: 'Syria',
      timestamp: new Date(Date.now() - 90000),
      emoji: '🏥'
    },
    {
      id: '4',
      donor: 'Mohammed K.',
      amount: 200,
      currency: '£',
      cause: 'Orphan Education',
      location: 'Palestine',
      timestamp: new Date(Date.now() - 120000),
      emoji: '📚'
    }
  ]);

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Heart className="h-5 w-5 mr-2 text-red-500 animate-pulse-slow" />
          Live Donation Feed
        </h3>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <Users className="h-3 w-3 mr-1" />
          1,247 active
        </Badge>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-islamic-green-50 to-transparent rounded-lg hover:from-islamic-green-100 transition-colors border-l-4 border-islamic-green-500"
          >
            <div className="text-2xl">{activity.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-islamic-green-800">{activity.donor}</span>
                <span className="text-sm text-gray-500">donated</span>
                <span className="font-bold text-sadaqah-gold-600">
                  {activity.currency}{activity.amount}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {activity.cause}
                <span className="flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {activity.location}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatTimeAgo(activity.timestamp)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          💚 Together we've raised <span className="font-bold text-islamic-green-600">£50,000</span> today
        </p>
      </div>
    </Card>
  );
};

export default LiveFeed;
