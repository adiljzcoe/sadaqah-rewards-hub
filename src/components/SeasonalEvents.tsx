
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Gift, Star, Crown, Timer } from 'lucide-react';

const SeasonalEvents = () => {
  const currentEvent = {
    name: "Winter Warmth Challenge",
    description: "Help families stay warm this winter",
    icon: "❄️",
    timeLeft: "5 days, 12 hours",
    progress: 65,
    target: "1000 donations",
    current: 650,
    rewards: [
      { tier: "Bronze", requirement: 5, reward: "Winter Helper Badge", earned: true },
      { tier: "Silver", requirement: 10, reward: "500 Bonus Points", earned: true },
      { tier: "Gold", requirement: 20, reward: "Exclusive Winter Crown", earned: false },
      { tier: "Platinum", requirement: 50, reward: "5x Multiplier for 1 week", earned: false }
    ],
    userProgress: 12
  };

  const upcomingEvents = [
    { name: "Ramadan Giving Month", icon: "🌙", startDate: "March 2024", description: "30 days of blessed giving" },
    { name: "Earth Day Eco Challenge", icon: "🌍", startDate: "April 2024", description: "Environmental charity focus" }
  ];

  return (
    <Card className="p-6 game-card">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Seasonal Events
          </span>
        </h3>
      </div>

      {/* Current Event */}
      <div className="game-card p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{currentEvent.icon}</div>
          <h4 className="font-bold text-lg text-blue-800">{currentEvent.name}</h4>
          <p className="text-sm text-blue-600 mb-2">{currentEvent.description}</p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-orange-600">
            <Timer className="h-4 w-4" />
            {currentEvent.timeLeft} left
          </div>
        </div>

        {/* Community Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Community Progress</span>
            <span>{currentEvent.current}/{currentEvent.target.split(' ')[0]}</span>
          </div>
          <Progress value={currentEvent.progress} className="h-3" />
          <p className="text-xs text-center text-gray-600 mt-1">
            {currentEvent.progress}% towards {currentEvent.target}
          </p>
        </div>

        {/* Personal Progress & Rewards */}
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{currentEvent.userProgress}</div>
            <div className="text-sm text-gray-600 font-semibold">Your Donations</div>
          </div>

          {/* Reward Tiers */}
          <div className="space-y-2">
            {currentEvent.rewards.map((reward, index) => (
              <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                reward.earned ? 'bg-green-100 border border-green-200' : 
                currentEvent.userProgress >= reward.requirement ? 'bg-yellow-100 border border-yellow-200' :
                'bg-gray-100 border border-gray-200'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    reward.tier === 'Bronze' ? 'bg-orange-200 text-orange-800' :
                    reward.tier === 'Silver' ? 'bg-gray-200 text-gray-800' :
                    reward.tier === 'Gold' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-purple-200 text-purple-800'
                  }`}>
                    {reward.requirement}
                  </div>
                  <span className="text-sm font-semibold">{reward.reward}</span>
                </div>
                {reward.earned ? (
                  <Badge className="bg-green-500 text-white text-xs">Earned!</Badge>
                ) : currentEvent.userProgress >= reward.requirement ? (
                  <Badge className="bg-yellow-500 text-white text-xs">Claim!</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {reward.requirement - currentEvent.userProgress} more
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h4 className="font-bold text-gray-700 mb-3 text-sm flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          Coming Soon
        </h4>
        <div className="space-y-2">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <span className="text-2xl">{event.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-sm text-gray-800">{event.name}</div>
                <div className="text-xs text-gray-600">{event.description}</div>
              </div>
              <Badge variant="outline" className="text-xs">
                {event.startDate}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SeasonalEvents;
