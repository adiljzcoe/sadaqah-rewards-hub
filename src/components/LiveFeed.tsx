
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Clock, Users, Zap } from 'lucide-react';

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
    <Card className="p-6 game-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mr-3 shadow-lg">
            <Heart className="h-5 w-5 text-white animate-subtle-pulse" />
          </div>
          <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Live Donation Feed
          </span>
        </h3>
        <Badge className="gel-button bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold px-4 py-2">
          <Users className="h-4 w-4 mr-2" />
          1,247 active
        </Badge>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="leaderboard-item animate-gentle-fade"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-2xl shadow-lg animate-subtle-pulse">
                {activity.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-bold text-gray-800">{activity.donor}</span>
                  <span className="text-sm text-gray-600 font-medium">donated</span>
                  <div className="jannah-counter text-lg px-3 py-1">
                    {activity.currency}{activity.amount}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {activity.cause}
                </div>
                <div className="flex items-center text-xs font-semibold text-gray-500">
                  <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                  {activity.location}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 flex items-center mb-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeAgo(activity.timestamp)}
                </div>
                <div className="gold-coin w-8 h-8 flex items-center justify-center text-xs">
                  <Zap className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 game-card p-4 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl text-center relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm font-bold text-emerald-800">
            💚 Together we've raised <span className="jannah-counter text-lg px-3 py-1 mx-1">£50,000</span> today
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent animate-shimmer"></div>
      </div>
    </Card>
  );
};

export default LiveFeed;
