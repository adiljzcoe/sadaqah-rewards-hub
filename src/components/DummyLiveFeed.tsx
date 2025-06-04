
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDummyData } from '@/hooks/useDummyData';
import { Heart, Users, Zap, TrendingUp, MapPin } from 'lucide-react';

const DummyLiveFeed = () => {
  const { liveActivities, isDummyDataEnabled } = useDummyData();

  if (!isDummyDataEnabled('live_feed')) {
    return null;
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'donation': return <Heart className="h-4 w-4 text-red-500" />;
      case 'registration': return <Users className="h-4 w-4 text-blue-500" />;
      case 'achievement': return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'milestone': return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case 'donation':
        return `donated £${activity.amount} to ${activity.charity_name}`;
      case 'registration':
        return `joined our community`;
      case 'achievement':
        return `earned "${activity.achievement_name}"`;
      case 'milestone':
        return `helped reach £${activity.amount} milestone`;
      default:
        return 'performed an action';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Activity
          <Badge variant="secondary" className="ml-auto">
            {liveActivities.length} recent
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="max-h-80 overflow-y-auto space-y-2">
          {liveActivities.slice(0, 15).map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{activity.user_name}</span>
                  <span className="text-sm text-muted-foreground">
                    {getActivityText(activity)}
                  </span>
                </div>
                {activity.location && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.location}</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {getTimeAgo(activity.timestamp)}
              </div>
            </div>
          ))}
        </div>
        
        {liveActivities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-2" />
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DummyLiveFeed;
