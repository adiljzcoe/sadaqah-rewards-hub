
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

  return (
    <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
      {/* Premium Gold Header */}
      <div className="relative p-6 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 overflow-hidden">
        {/* Shiny effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-500/20 animate-glow"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 drop-shadow-lg">
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                <Trophy className="h-4 w-4 text-yellow-200" />
              </div>
              League Rankings
            </h3>
            <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium backdrop-blur-sm shadow-lg">
              Gold League
            </Badge>
          </div>
          
          <div className="text-xs text-yellow-100 font-medium drop-shadow">
            Your current position in the community
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Stats with Gold Accents */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200/50 shadow-sm">
            <div className="text-lg font-bold text-amber-800 mb-1">{membersBehind}</div>
            <div className="text-xs text-amber-600 font-medium">Behind You</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200/50 shadow-sm">
            <div className="text-lg font-bold text-amber-800 mb-1">{membersAhead}</div>
            <div className="text-xs text-amber-600 font-medium">To Beat</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200/50 shadow-sm">
            <div className="text-lg font-bold text-amber-800 mb-1">{leagueMembers.filter(f => f.status === 'donated today').length}</div>
            <div className="text-xs text-amber-600 font-medium">Active Today</div>
          </div>
        </div>

        {/* Premium Member List */}
        <div className="space-y-3 mb-6">
          {leagueMembers.map((member, index) => (
            <div key={index} className="group relative p-4 bg-white rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-200">
              {/* Gold Rank Badge */}
              <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                {member.rank}
              </div>

              <div className="flex items-center justify-between ml-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 ring-2 ring-amber-200">
                    <AvatarFallback className={`font-semibold text-white bg-gradient-to-r ${getTierGradient(member.tier)}`}>
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{member.name}</span>
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
                  {member.rank < userRank ? (
                    <div className="text-xs text-amber-600 mt-1 font-medium">
                      Ahead of you
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                      Behind you
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Gold Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-medium py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
            <Trophy className="h-4 w-4 mr-2" />
            View Full Rankings
          </Button>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200/50 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg shadow-sm">
                <Crown className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-amber-800 text-sm">Unlock Platinum League</div>
                <div className="text-xs text-amber-600">Exclusive rewards await</div>
              </div>
            </div>
            <div className="text-xs text-amber-700 font-medium">
              Compete with elite donors • Premium benefits • VIP status
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FriendsWidget;
