
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, UserPlus, Trophy, Flame, Crown, Target, TrendingUp, Star, Zap, Award } from 'lucide-react';

const FriendsWidget = () => {
  const [leagueMembers] = useState([
    { name: 'Sarah K.', level: 15, streak: 12, tier: 'gold', avatar: 'SK', status: 'donated today', rank: 46 },
    { name: 'Ahmed R.', level: 11, streak: 5, tier: 'silver', avatar: 'AR', status: '2 days ago', rank: 52 },
    { name: 'Fatima M.', level: 18, streak: 25, tier: 'platinum', avatar: 'FM', status: 'donated today', rank: 23 },
    { name: 'Omar S.', level: 8, streak: 0, tier: 'bronze', avatar: 'OS', status: '1 week ago', rank: 89 },
  ]);

  const userRank = 47;
  const membersAhead = leagueMembers.filter(f => f.rank < userRank).length;
  const membersBehind = leagueMembers.filter(f => f.rank > userRank).length;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'text-purple-700 bg-gradient-to-r from-purple-100 to-purple-200';
      case 'gold': return 'text-amber-700 bg-gradient-to-r from-amber-100 to-yellow-200';
      case 'silver': return 'text-gray-700 bg-gradient-to-r from-gray-100 to-slate-200';
      case 'bronze': return 'text-orange-700 bg-gradient-to-r from-orange-100 to-amber-200';
      default: return 'text-gray-600 bg-gray-100';
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
      case 'platinum': return 'from-purple-500 to-indigo-600';
      case 'gold': return 'from-amber-400 to-yellow-500';
      case 'silver': return 'from-gray-400 to-slate-500';
      case 'bronze': return 'from-orange-400 to-amber-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <Card className="p-0 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 border-2 border-purple-200/30 shadow-xl">
      {/* Header Section with Premium Look */}
      <div className="relative p-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Trophy className="h-6 w-6" />
            </div>
            <span className="bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
              Your League
            </span>
          </h3>
          
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-white/20 to-white/10 text-white border-white/30 text-lg px-4 py-2 font-bold backdrop-blur-sm">
              🏆 Gold League
            </Badge>
            <div className="flex items-center gap-1 text-yellow-100">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-semibold">Elite Status</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-200/50 hover:scale-105 transition-transform duration-200">
            <div className="text-2xl font-black text-emerald-600 mb-1">{membersBehind}</div>
            <div className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Behind You
            </div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 border-2 border-red-200/50 hover:scale-105 transition-transform duration-200">
            <div className="text-2xl font-black text-red-600 mb-1">{membersAhead}</div>
            <div className="text-xs font-bold text-red-700 flex items-center justify-center gap-1">
              <Target className="h-3 w-3" />
              To Beat
            </div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-200/50 hover:scale-105 transition-transform duration-200">
            <div className="text-2xl font-black text-blue-600 mb-1">{leagueMembers.filter(f => f.status === 'donated today').length}</div>
            <div className="text-xs font-bold text-blue-700 flex items-center justify-center gap-1">
              <Zap className="h-3 w-3" />
              Active Today
            </div>
          </div>
        </div>

        {/* Enhanced League Members List */}
        <div className="space-y-3 mb-6">
          {leagueMembers.map((member, index) => (
            <div key={index} className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              member.rank < userRank ? 'border-red-200 bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100' : 
              member.rank > userRank ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100' : 
              'border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50'
            }`}>
              {/* Rank Badge */}
              <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg ${
                member.rank < userRank ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' : 
                member.rank > userRank ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' : 
                'bg-gradient-to-r from-gray-500 to-slate-600 text-white'
              }`}>
                #{member.rank}
              </div>

              <div className="flex items-center justify-between ml-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                    <AvatarFallback className={`font-bold text-white bg-gradient-to-r ${getTierGradient(member.tier)}`}>
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-800">{member.name}</span>
                      <Badge variant="outline" className="text-xs bg-white/50">L{member.level}</Badge>
                      {member.streak > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-full">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span className="text-xs font-bold text-orange-600">{member.streak}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">{member.status}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-bold px-3 py-2 rounded-xl shadow-sm ${getTierColor(member.tier)}`}>
                    {getTierIcon(member.tier)} {member.tier}
                  </div>
                  {member.rank < userRank ? (
                    <div className="text-xs text-red-600 font-bold mt-1 flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Ahead of you
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Behind you
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white font-bold py-3 rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-amber-300/50">
            <Target className="h-5 w-5 mr-2" />
            View Full League Rankings
          </Button>
          
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 border-2 border-purple-200/50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-purple-800 text-lg">Platinum League Awaits!</span>
            </div>
            <p className="text-sm font-bold text-purple-700 mb-2">
              🏆 Unlock exclusive rewards & premium benefits
            </p>
            <div className="text-xs text-purple-600 font-medium">
              Compete with the elite • Double rewards • VIP status
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FriendsWidget;
