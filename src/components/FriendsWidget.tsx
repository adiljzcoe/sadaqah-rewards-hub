import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Users, UserPlus, Trophy, Flame, Crown, Target, TrendingUp, Star, Zap, Award } from 'lucide-react';

interface LeagueMember {
  name: string;
  level: number;
  streak: number;
  tier: string;
  avatar: string;
  status: string;
  rank: number;
  points: number;
  isUser?: boolean;
}

const FriendsWidget = () => {
  const [leagueMembers] = useState<LeagueMember[]>([
    { name: 'Sarah K.', level: 15, streak: 12, tier: 'gold', avatar: 'SK', status: 'donated today', rank: 46, points: 5890 },
    { name: 'Ahmed R.', level: 11, streak: 5, tier: 'silver', avatar: 'AR', status: '2 days ago', rank: 52, points: 5420 },
    { name: 'Fatima M.', level: 18, streak: 25, tier: 'platinum', avatar: 'FM', status: 'donated today', rank: 23, points: 7250 },
    { name: 'Omar S.', level: 8, streak: 0, tier: 'bronze', avatar: 'OS', status: '1 week ago', rank: 89, points: 3200 },
  ]);

  const userRank = 47;
  const userPoints = 5632;
  
  // Sort members by rank (ascending order)
  const sortedMembers = [...leagueMembers].sort((a, b) => a.rank - b.rank);
  
  // Add user to the sorted list
  const allMembers: LeagueMember[] = [
    ...sortedMembers,
    { name: 'YOU', level: 12, streak: 8, tier: 'gold', avatar: 'YOU', status: 'active', rank: userRank, points: userPoints, isUser: true }
  ].sort((a, b) => a.rank - b.rank);

  const userIndex = allMembers.findIndex(member => member.isUser);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'text-slate-700 bg-slate-50 border-slate-200';
      case 'gold': return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'silver': return 'text-gray-700 bg-gray-50 border-gray-200';
      case 'bronze': return 'text-orange-700 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum': return '💎';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '⭐';
    }
  };

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'from-slate-400 to-slate-600';
      case 'gold': return 'from-amber-400 to-amber-600';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getTierRowBackground = (tier: string, isUser: boolean = false) => {
    if (isUser) {
      return 'bg-gradient-to-r from-purple-50 via-purple-25 to-white border-purple-200/60 shadow-lg transform scale-105';
    }
    switch (tier) {
      case 'platinum': return 'bg-gradient-to-r from-slate-50 via-slate-25 to-white border-slate-200/60 shadow-lg';
      case 'gold': return 'bg-gradient-to-r from-amber-50 via-yellow-25 to-white border-amber-200/60 shadow-lg';
      case 'silver': return 'bg-gradient-to-r from-gray-50 via-gray-25 to-white border-gray-200/60 shadow-md';
      case 'bronze': return 'bg-gradient-to-r from-orange-50 via-orange-25 to-white border-orange-200/60 shadow-md';
      default: return 'bg-gradient-to-r from-gray-50 to-white border-gray-100';
    }
  };

  const getRankBadgeStyle = (tier: string, isUser: boolean = false) => {
    if (isUser) {
      return 'bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg ring-2 ring-purple-300';
    }
    switch (tier) {
      case 'platinum': return 'bg-gradient-to-r from-slate-600 to-slate-800 shadow-lg ring-2 ring-slate-300';
      case 'gold': return 'bg-gradient-to-r from-amber-600 to-yellow-700 shadow-lg ring-2 ring-amber-300';
      case 'silver': return 'bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg ring-2 ring-gray-300';
      case 'bronze': return 'bg-gradient-to-r from-orange-500 to-orange-700 shadow-lg ring-2 ring-orange-300';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 shadow-md';
    }
  };

  const getPointsToBeaten = (currentIndex: number) => {
    if (currentIndex === 0) return null; // First place
    const playerAbove = allMembers[currentIndex - 1];
    const currentPlayer = allMembers[currentIndex];
    return playerAbove.points - currentPlayer.points;
  };

  const getProgressPercentage = (currentIndex: number) => {
    if (currentIndex === 0) return 100; // First place
    const playerAbove = allMembers[currentIndex - 1];
    const currentPlayer = allMembers[currentIndex];
    return Math.min((currentPlayer.points / playerAbove.points) * 100, 100);
  };

  return (
    <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
      {/* Premium Gold Header */}
      <div className="relative p-4 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 overflow-hidden">
        {/* Shiny effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-500/20 animate-glow"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-white flex items-center gap-2 drop-shadow-lg">
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                <Trophy className="h-4 w-4 text-yellow-200" />
              </div>
              League Rankings
            </h3>
            <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium backdrop-blur-sm shadow-lg">
              Gold League
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Premium Member List with Tier-specific Backgrounds */}
        <div className="space-y-3 mb-4">
          {allMembers.map((member, index) => {
            const pointsToBeaten = getPointsToBeaten(index);
            const progressPercentage = getProgressPercentage(index);
            
            return (
              <div key={index} className={`group relative p-3 rounded-xl border hover:shadow-lg transition-all duration-200 ${getTierRowBackground(member.tier, member.isUser)}`}>
                {/* Tier-specific Rank Badge */}
                <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold border-2 border-white ${getRankBadgeStyle(member.tier, member.isUser)}`}>
                  {member.rank}
                </div>

                <div className="flex items-center justify-between ml-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className={`h-8 w-8 ring-2 ${member.isUser ? 'ring-purple-200' : 'ring-amber-200'}`}>
                      <AvatarFallback className={`font-semibold text-white bg-gradient-to-r ${getTierGradient(member.tier)}`}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold text-sm ${member.isUser ? 'text-purple-900' : 'text-gray-900'}`}>
                          {member.name}
                          {member.isUser && (
                            <Badge className="ml-2 bg-purple-500 text-white text-xs font-bold px-2 py-0.5">
                              YOU
                            </Badge>
                          )}
                        </span>
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-amber-50 text-amber-700 border-amber-200">
                          L{member.level}
                        </Badge>
                        {member.streak > 0 && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded-md border border-orange-200">
                            <Flame className="h-3 w-3 text-orange-500" />
                            <span className="text-xs font-medium text-orange-700">{member.streak}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{member.status}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border ${getTierColor(member.tier)}`}>
                      {getTierIcon(member.tier)} {member.tier}
                    </div>
                    <div className="text-sm font-bold text-gray-800 mt-1">
                      {member.points.toLocaleString()} pts
                    </div>
                  </div>
                </div>

                {/* Progress meter for beating the player above (except for first place) */}
                {pointsToBeaten && (
                  <div className="mt-3 space-y-2 ml-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold flex items-center gap-1 ${member.isUser ? 'text-purple-700' : 'text-gray-700'}`}>
                        <TrendingUp className="h-3 w-3" />
                        To beat #{allMembers[index - 1].rank}
                      </span>
                      <span className={`font-bold ${member.isUser ? 'text-purple-600' : 'text-gray-600'}`}>
                        {pointsToBeaten} points needed
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2">
                      <div className={`h-full rounded-full transition-all duration-300 ${member.isUser ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'}`} />
                    </Progress>
                    <div className={`text-xs font-medium text-center ${member.isUser ? 'text-purple-600' : 'text-gray-600'}`}>
                      {Math.round(progressPercentage)}% of the way there!
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Premium Gold Actions */}
        <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-medium py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
          <Trophy className="h-4 w-4 mr-2" />
          View Full Rankings
        </Button>
      </div>
    </Card>
  );
};

export default FriendsWidget;
