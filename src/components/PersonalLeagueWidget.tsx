
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
  
  // Mock nearby competitors
  const nearbyCompetitors = [
    { name: "Sarah K.", points: 5890, rank: 46, ahead: true },
    { name: "David M.", points: 5420, rank: 48, ahead: false },
    { name: "Aisha R.", points: 5380, rank: 49, ahead: false }
  ];

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

      {/* League Progress */}
      {nextLeague && (
        <div className="game-card p-4 mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>{currentLeague.name}</span>
            <span>{nextLeague.name}</span>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <div className="text-center">
            <p className="text-sm font-bold text-gray-700">
              {nextLeague.minPoints - userPoints} points to {nextLeague.name}!
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600 font-semibold">Next reward unlock</span>
            </div>
          </div>
        </div>
      )}

      {/* Nearby Competitors */}
      <div className="game-card p-4 mb-4">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center text-sm">
          <Target className="h-4 w-4 mr-1" />
          Your Competition
        </h4>
        <div className="space-y-2">
          {nearbyCompetitors.map((competitor, index) => (
            <div key={index} className={`flex items-center justify-between p-2 rounded ${
              competitor.ahead ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  competitor.ahead ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {competitor.rank}
                </div>
                <span className="text-sm font-semibold">{competitor.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{competitor.points.toLocaleString()}</div>
                {competitor.ahead ? (
                  <div className="text-xs text-red-600">
                    -{Math.abs(competitor.points - userPoints)} pts
                  </div>
                ) : (
                  <div className="text-xs text-green-600">
                    +{Math.abs(userPoints - competitor.points)} pts
                  </div>
                )}
              </div>
            </div>
          ))}
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
