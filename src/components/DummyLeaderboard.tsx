
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useDummyData } from '@/hooks/useDummyData';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

const DummyLeaderboard = () => {
  const { isDummyDataEnabled, generateDummyLeaderboard } = useDummyData();

  if (!isDummyDataEnabled('leaderboard')) {
    return null;
  }

  const leaderboard = generateDummyLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2: return <Medal className="h-4 w-4 text-gray-400" />;
      case 3: return <Award className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'border-l-yellow-500 bg-yellow-50';
      case 2: return 'border-l-gray-400 bg-gray-50';
      case 3: return 'border-l-amber-600 bg-amber-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Donors This Month
          <Badge variant="secondary" className="ml-auto">
            Live Rankings
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {leaderboard.map((donor, index) => (
            <div 
              key={donor.id} 
              className={`flex items-center gap-3 p-3 border-l-4 rounded-lg ${getRankColor(donor.rank)}`}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(donor.rank)}
              </div>
              
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-sm bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {getInitials(donor.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{donor.name}</span>
                  {donor.streak > 7 && (
                    <Badge variant="outline" className="text-xs">
                      🔥 {donor.streak} day streak
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>£{donor.total_donated.toLocaleString()}</span>
                  <span>{donor.jannah_points} points</span>
                </div>
              </div>
              
              {donor.rank <= 3 && (
                <div className="text-right">
                  <div className="text-xs font-medium text-muted-foreground">
                    {donor.rank === 1 ? '🥇 Champion' : 
                     donor.rank === 2 ? '🥈 Hero' : '🥉 Star'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <p className="text-sm text-center text-blue-700">
            💫 Join the leaderboard! Your next donation could put you in the top 10
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DummyLeaderboard;
