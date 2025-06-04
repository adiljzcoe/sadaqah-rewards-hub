
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Trophy, Medal, Star, Users, TrendingUp, Loader2 } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  full_name: string;
  avatar_url: string;
  total_donated: number;
  donation_count: number;
  jannah_points: number;
  current_streak: number;
}

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'donations' | 'points' | 'streaks'>('donations');

  const { data: users, isLoading } = useQuery({
    queryKey: ['leaderboard', activeTab],
    queryFn: async () => {
      console.log('Fetching leaderboard data...');
      
      let orderBy = 'total_donated';
      if (activeTab === 'points') orderBy = 'jannah_points';
      if (activeTab === 'streaks') orderBy = 'current_streak';

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, total_donated, donation_count, jannah_points, current_streak')
        .not('full_name', 'is', null)
        .order(orderBy, { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
      }

      console.log('Fetched leaderboard:', data);
      return data as LeaderboardUser[];
    },
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
  };

  const getDisplayValue = (user: LeaderboardUser) => {
    switch (activeTab) {
      case 'donations':
        return `£${user.total_donated?.toLocaleString() || '0'}`;
      case 'points':
        return `${user.jannah_points?.toLocaleString() || '0'} pts`;
      case 'streaks':
        return `${user.current_streak || '0'} days`;
      default:
        return '0';
    }
  };

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'donations': return 'Total Donated';
      case 'points': return 'Jannah Points';
      case 'streaks': return 'Donation Streak';
      default: return '';
    }
  };

  return (
    <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
      <CardHeader className="p-3 bg-gradient-to-r from-emerald-600 to-blue-600">
        <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Community Leaders
        </CardTitle>
      </CardHeader>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { key: 'donations', label: 'Donations', icon: TrendingUp },
          { key: 'points', label: 'Points', icon: Star },
          { key: 'streaks', label: 'Streaks', icon: Crown }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 px-2 py-2 text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
              activeTab === tab.key
                ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-3 w-3" />
            {tab.label}
          </button>
        ))}
      </div>

      <CardContent className="p-3">
        {isLoading ? (
          <div className="text-center py-6">
            <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-emerald-600" />
            <p className="text-xs text-gray-600">Loading leaderboard...</p>
          </div>
        ) : users && users.length > 0 ? (
          <div className="space-y-2">
            {users.map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                  index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex items-center justify-center w-6 h-6">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                    {user.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt={user.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-emerald-600">
                        {user.full_name?.charAt(0) || '?'}
                      </span>
                    )}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-xs truncate">
                      {user.full_name || 'Anonymous'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.donation_count || 0} donations
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-emerald-600 text-xs">
                    {getDisplayValue(user)}
                  </div>
                  {index < 3 && (
                    <Badge variant="outline" className="text-xs mt-1">
                      Top {index + 1}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Users className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-700 mb-1">No data yet</h3>
            <p className="text-xs text-gray-500">
              Be the first to donate and appear on the leaderboard!
            </p>
          </div>
        )}

        <div className="mt-3 pt-2 border-t border-gray-100">
          <Button variant="outline" size="sm" className="w-full text-xs">
            View Full Leaderboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
