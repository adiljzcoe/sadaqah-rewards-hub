
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Trophy } from 'lucide-react';

export const LiveDonationFeed = () => {
  const mockActivities = [
    {
      id: 1,
      user: 'Ahmad K.',
      action: 'donated',
      amount: '£25',
      cause: 'Water Wells',
      time: '2 mins ago',
      type: 'donation'
    },
    {
      id: 2,
      user: 'Sarah M.',
      action: 'earned',
      achievement: 'Weekly Champion',
      time: '5 mins ago',
      type: 'achievement'
    },
    {
      id: 3,
      user: 'Mosque Community',
      action: 'reached',
      milestone: '£10,000 this month',
      time: '8 mins ago',
      type: 'milestone'
    }
  ];

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {mockActivities.map((activity) => (
        <Card key={activity.id} className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{activity.user}</span>
                  <span className="text-gray-600">{activity.action}</span>
                  {activity.type === 'donation' && (
                    <>
                      <Badge variant="outline" className="text-emerald-600">
                        <Heart className="w-3 h-3 mr-1" />
                        {activity.amount}
                      </Badge>
                      <span className="text-gray-600">to {activity.cause}</span>
                    </>
                  )}
                  {activity.type === 'achievement' && (
                    <Badge variant="outline" className="text-yellow-600">
                      <Star className="w-3 h-3 mr-1" />
                      {activity.achievement}
                    </Badge>
                  )}
                  {activity.type === 'milestone' && (
                    <Badge variant="outline" className="text-purple-600">
                      <Trophy className="w-3 h-3 mr-1" />
                      {activity.milestone}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
