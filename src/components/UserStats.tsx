
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Heart, 
  Star, 
  Flame, 
  Target, 
  Calendar,
  Gift,
  Crown,
  Loader2,
  User
} from 'lucide-react';

interface UserProfile {
  id: string;
  full_name: string;
  total_donated: number;
  donation_count: number;
  jannah_points: number;
  sadaqah_coins: number;
  current_streak: number;
  longest_streak: number;
  last_donation_date: string;
}

const UserStats = () => {
  const { user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      console.log('Fetching user profile stats...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      console.log('Fetched user profile:', data);
      return data as UserProfile;
    },
    enabled: !!user?.id,
  });

  if (!user) {
    return (
      <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
        <CardHeader className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600">
          <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
            <User className="h-4 w-4" />
            Your Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <div className="text-gray-500 mb-3">
            <User className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Sign in to track your impact</p>
          </div>
          <Button size="sm" className="w-full">
            Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
        <CardHeader className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600">
          <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Your Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-xs text-gray-600">Loading your stats...</p>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      icon: Heart,
      label: 'Total Donated',
      value: `£${profile?.total_donated?.toLocaleString() || '0'}`,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Gift,
      label: 'Donations',
      value: profile?.donation_count?.toString() || '0',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Star,
      label: 'Jannah Points',
      value: profile?.jannah_points?.toLocaleString() || '0',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Crown,
      label: 'Sadaqah Coins',
      value: profile?.sadaqah_coins?.toLocaleString() || '0',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${profile?.current_streak || '0'} days`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Target,
      label: 'Best Streak',
      value: `${profile?.longest_streak || '0'} days`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const getStreakBadge = () => {
    const streak = profile?.current_streak || 0;
    if (streak >= 30) return { label: 'Legend', color: 'bg-purple-500' };
    if (streak >= 14) return { label: 'Champion', color: 'bg-gold-500' };
    if (streak >= 7) return { label: 'Consistent', color: 'bg-emerald-500' };
    if (streak >= 3) return { label: 'Building', color: 'bg-blue-500' };
    return null;
  };

  const streakBadge = getStreakBadge();

  return (
    <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
      <CardHeader className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600">
        <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Your Impact
        </CardTitle>
      </CardHeader>

      <CardContent className="p-3">
        {/* User Info */}
        <div className="text-center mb-4 pb-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-900 mb-1">
            {profile?.full_name || 'User'}
          </div>
          {streakBadge && (
            <Badge className={`${streakBadge.color} text-white text-xs`}>
              {streakBadge.label} Giver
            </Badge>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`${stat.bgColor} rounded-lg p-2 text-center`}
            >
              <stat.icon className={`h-4 w-4 ${stat.color} mx-auto mb-1`} />
              <div className="text-xs font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Last Donation */}
        {profile?.last_donation_date && (
          <div className="text-center mb-3 p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
              <Calendar className="h-3 w-3" />
              Last donation: {new Date(profile.last_donation_date).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
            <Heart className="h-3 w-3 mr-1" />
            Donate Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;
