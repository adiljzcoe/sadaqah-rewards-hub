
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, ArrowUp, Users, Target, Zap } from 'lucide-react';
import { getUserLeague, getNextLeague, getLeagueProgress } from '@/utils/leagueSystem';

const PersonalLeagueWidget = () => {
  const userPoints = 5632;
  const userRank = 47;
  const cityRank = 15;
  const city = "London";
  
  const currentLeague = getUserLeague(userPoints);
  const nextLeague = getNextLeague(userPoints);
  const progress = getLeagueProgress(userPoints);
  
  return (
    <Card className="p-6 game-card">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center justify-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your League Standing
          </span>
        </h3>
        
        {/* Current League */}
        <div className={`relative inline-block p-4 rounded-xl bg-gradient-to-r ${currentLeague.gradient} text-white mb-4 shadow-lg`}>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl">{currentLeague.icon}</span>
            <span className="font-bold text-lg">{currentLeague.name}</span>
          </div>
          <div className="text-3xl font-black">{userPoints.toLocaleString()}</div>
          <div className="text-sm opacity-90">points</div>
        </div>
      </div>

      {/* Personal Rankings */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="game-card p-3 text-center">
          <div className="text-lg font-bold text-emerald-600">#{userRank}</div>
          <div className="text-xs text-gray-600 font-semibold">Your Rank</div>
        </div>
        <div className="game-card p-3 text-center">
          <div className="text-lg font-bold text-blue-600">#{cityRank}</div>
          <div className="text-xs text-gray-600 font-semibold">In {city}</div>
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="game-card p-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="text-center">
          <h4 className="font-bold text-orange-800 mb-2 flex items-center justify-center">
            <Zap className="h-4 w-4 mr-1" />
            Weekly Challenge
          </h4>
          <p className="text-sm font-bold text-orange-700 mb-2">
            Make 3 more donations to beat Sarah K!
          </p>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
            <Trophy className="h-3 w-3 mr-1" />
            +500 Bonus Points
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default PersonalLeagueWidget;
