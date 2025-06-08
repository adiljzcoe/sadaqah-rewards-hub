import React, { memo, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Award, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import { useThrottle } from '@/hooks/usePerformanceOptimization';
import OptimizedImage from '@/components/common/OptimizedImage';

interface DonationActivity {
  id: string;
  userName: string;
  mosqueName: string;
  location: string;
  prayerSpaces: number;
  amount: number;
  jannahPoints: number;
  timestamp: string;
  avatarColor: string;
  flag: string;
}

// Memoized donation item component
const DonationItem = memo(({ 
  activity, 
  index, 
  getTimeAgo, 
  getRowColor 
}: {
  activity: DonationActivity;
  index: number;
  getTimeAgo: (timestamp: string) => string;
  getRowColor: (index: number) => string;
}) => {
  const { trackMetrics } = usePerformanceMonitoring('DonationItem');

  const formattedAmount = useMemo(() => `£${activity.amount}`, [activity.amount]);
  const formattedPoints = useMemo(() => activity.jannahPoints.toLocaleString(), [activity.jannahPoints]);
  const timeAgo = useMemo(() => getTimeAgo(activity.timestamp), [activity.timestamp, getTimeAgo]);

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${getRowColor(index)} transform transition-all duration-700 hover:scale-[1.02] hover:shadow-xl ${
        index === 0 ? 'animate-fade-in scale-105 shadow-lg ring-2 ring-emerald-200' : ''
      }`}
      onMouseEnter={() => trackMetrics({ componentCount: 1 })}
    >
      {index === 0 && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      )}
      
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${activity.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white`}>
              {activity.userName.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-bold text-gray-800 text-lg">{activity.userName}</span>
                <span className="text-gray-600 font-medium">just funded</span>
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold px-3 py-1 shadow-md rounded-full">
                  🕌 {activity.prayerSpaces} prayer space{activity.prayerSpaces > 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="flex items-center space-x-2 bg-white/70 rounded-full px-3 py-1.5 shadow-sm">
                  <Building2 className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold text-sm">{activity.mosqueName}</span>
                </div>
                
                <div className="flex items-center space-x-1 bg-white/70 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-lg">{activity.flag}</span>
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span className="text-sm font-medium">{activity.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            <div className="flex items-center justify-end space-x-3">
              <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-full px-4 py-2 shadow-sm">
                <span className="font-bold text-emerald-700 text-lg">{formattedAmount}</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                ⏰ {timeAgo}
              </span>
            </div>
            
            <div className="flex items-center justify-end space-x-2">
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full px-4 py-2 shadow-sm border border-yellow-200">
                <Award className="h-4 w-4 text-yellow-600 inline mr-1" />
                <span className="text-sm font-bold text-yellow-700">
                  ✨ +{formattedPoints} Jannah Points
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

DonationItem.displayName = 'DonationItem';

const OptimizedLiveDonationFeed: React.FC = () => {
  const { trackMetrics, measureRenderTime } = usePerformanceMonitoring('LiveDonationFeed');
  const throttledTrack = useThrottle((metrics: any) => trackMetrics(metrics), 1000);

  // Memoized helper functions
  const getTimeAgo = useMemo(() => (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  }, []);

  const getRowColor = useMemo(() => (index: number) => {
    if (index % 2 === 1) {
      return 'from-blue-50 via-sky-50 to-cyan-50';
    }
    
    const colors = [
      'from-emerald-50 via-green-50 to-teal-50',
      'from-purple-50 via-violet-50 to-indigo-50',
      'from-rose-50 via-pink-50 to-red-50',
      'from-amber-50 via-yellow-50 to-orange-50'
    ];
    return colors[Math.floor(index / 2) % colors.length];
  }, []);

  // Optimized mock data - only create once
  const activities = useMemo(() => [
    {
      id: '1',
      userName: 'Ahmed K.',
      mosqueName: 'Al-Noor Mosque',
      location: 'Gaza, Palestine',
      prayerSpaces: 2,
      amount: 300,
      jannahPoints: 3000,
      timestamp: new Date(Date.now() - 30000).toISOString(),
      avatarColor: 'from-emerald-500 to-green-400',
      flag: '🇵🇸'
    },
    {
      id: '2',
      userName: 'Sarah M.',
      mosqueName: 'Masjid Al-Rahman',
      location: 'Aleppo, Syria',
      prayerSpaces: 1,
      amount: 150,
      jannahPoints: 1500,
      timestamp: new Date(Date.now() - 120000).toISOString(),
      avatarColor: 'from-blue-500 to-cyan-400',
      flag: '🇸🇾'
    },
    {
      id: '3',
      userName: 'Omar R.',
      mosqueName: 'General Mosque Pool',
      location: 'Western Locations',
      prayerSpaces: 3,
      amount: 240,
      jannahPoints: 2400,
      timestamp: new Date(Date.now() - 180000).toISOString(),
      avatarColor: 'from-purple-500 to-violet-400',
      flag: '🌍'
    },
    {
      id: '4',
      userName: 'Fatima A.',
      mosqueName: 'Community Mosque',
      location: 'Karachi, Pakistan',
      prayerSpaces: 1,
      amount: 150,
      jannahPoints: 1500,
      timestamp: new Date(Date.now() - 240000).toISOString(),
      avatarColor: 'from-rose-500 to-pink-400',
      flag: '🇵🇰'
    },
    {
      id: '5',
      userName: 'Ali H.',
      mosqueName: 'Baitul Hidayah',
      location: 'Dhaka, Bangladesh',
      prayerSpaces: 2,
      amount: 284,
      jannahPoints: 2840,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      avatarColor: 'from-orange-500 to-amber-400',
      flag: '🇧🇩'
    }
  ], []);

  // Track performance on mount
  React.useEffect(() => {
    const endMeasure = measureRenderTime();
    throttledTrack({ componentCount: activities.length });
    return endMeasure;
  }, [activities.length, measureRenderTime, throttledTrack]);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <div className="relative">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          ✨ Live Donation Activity
        </h3>
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
          🔴 LIVE
        </Badge>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <DonationItem
            key={activity.id}
            activity={activity}
            index={index}
            getTimeAgo={getTimeAgo}
            getRowColor={getRowColor}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-emerald-100 via-green-100 to-teal-100 p-6 rounded-xl border-2 border-emerald-200 shadow-lg">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Users className="h-5 w-5 text-emerald-600" />
            <span className="text-lg font-bold text-emerald-700">
              🎉 Join {activities.length * 47} donors who funded prayer spaces today!
            </span>
          </div>
          <p className="text-emerald-600 font-medium">
            🌟 Every prayer space you fund earns Jannah Points and brings communities closer to Allah ☪️
          </p>
          <div className="mt-3 text-sm text-emerald-500 font-medium">
            💫 Start your legacy with just one prayer space!
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OptimizedLiveDonationFeed);
