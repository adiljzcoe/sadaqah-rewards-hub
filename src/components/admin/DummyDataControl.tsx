
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useDummyData } from '@/hooks/useDummyData';
import { 
  Activity, 
  Users, 
  Heart, 
  BarChart3, 
  Zap, 
  TrendingUp,
  Database,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const DummyDataControl = () => {
  const { 
    isDummyDataEnabled, 
    toggleDummyData, 
    isToggling, 
    liveActivities 
  } = useDummyData();

  const sections = [
    {
      id: 'live_feed',
      name: 'Live Activity Feed',
      description: 'Show real-time donation and registration activities',
      icon: Activity,
      color: 'text-green-600',
      impact: 'High FOMO impact - creates urgency and social proof'
    },
    {
      id: 'leaderboard',
      name: 'Donation Leaderboard',
      description: 'Display top donors and achievements',
      icon: Users,
      color: 'text-blue-600',
      impact: 'Encourages competition and larger donations'
    },
    {
      id: 'recent_donations',
      name: 'Recent Donations',
      description: 'Show latest donation activities',
      icon: Heart,
      color: 'text-red-600',
      impact: 'Social proof and donation momentum'
    },
    {
      id: 'statistics',
      name: 'Platform Statistics',
      description: 'Overall platform metrics and counters',
      icon: BarChart3,
      color: 'text-purple-600',
      impact: 'Trust building and scale demonstration'
    },
    {
      id: 'trending',
      name: 'Trending Campaigns',
      description: 'Popular and urgent campaigns',
      icon: TrendingUp,
      color: 'text-orange-600',
      impact: 'Drives traffic to specific campaigns'
    },
    {
      id: 'user_activity',
      name: 'User Registrations',
      description: 'New user sign-ups and activity',
      icon: Zap,
      color: 'text-yellow-600',
      impact: 'Shows growing community and trust'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Dummy Data Control Center
          </CardTitle>
          <CardDescription>
            Control which sections display dummy data to create an active, engaging experience.
            Toggle sections on/off to manage the FOMO effect and social proof.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {sections.map((section) => {
              const isEnabled = isDummyDataEnabled(section.id);
              const IconComponent = section.icon;
              
              return (
                <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3 flex-1">
                    <IconComponent className={`h-5 w-5 mt-1 ${section.color}`} />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={section.id} className="font-medium cursor-pointer">
                          {section.name}
                        </Label>
                        {isEnabled ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {section.impact}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id={section.id}
                    checked={isEnabled}
                    onCheckedChange={(checked) => 
                      toggleDummyData({ section: section.id, enabled: checked })
                    }
                    disabled={isToggling}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Live Activity Monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Activity Monitor
            {isDummyDataEnabled('live_feed') && (
              <Badge className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                Live
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Real-time view of generated dummy activities (last 10 activities)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isDummyDataEnabled('live_feed') ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <div className="text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>Live feed is disabled</p>
                <p className="text-sm">Enable "Live Activity Feed" to see dummy activities</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {liveActivities.slice(0, 10).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                  <div className="flex items-center gap-2">
                    {activity.type === 'donation' && <Heart className="h-4 w-4 text-red-500" />}
                    {activity.type === 'registration' && <Users className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'achievement' && <Zap className="h-4 w-4 text-yellow-500" />}
                    {activity.type === 'milestone' && <TrendingUp className="h-4 w-4 text-purple-500" />}
                    <span className="font-medium">{activity.user_name}</span>
                    {activity.type === 'donation' && (
                      <span>donated £{activity.amount} to {activity.charity_name}</span>
                    )}
                    {activity.type === 'registration' && (
                      <span>joined from {activity.location}</span>
                    )}
                    {activity.type === 'achievement' && (
                      <span>earned "{activity.achievement_name}"</span>
                    )}
                    {activity.type === 'milestone' && (
                      <span>helped reach £{activity.amount} milestone for {activity.charity_name}</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {liveActivities.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Waiting for activities... (they appear every 5-20 seconds)
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Bulk operations for dummy data management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                sections.forEach(section => {
                  toggleDummyData({ section: section.id, enabled: true });
                });
              }}
              disabled={isToggling}
              size="sm"
            >
              Enable All Sections
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                sections.forEach(section => {
                  toggleDummyData({ section: section.id, enabled: false });
                });
              }}
              disabled={isToggling}
              size="sm"
            >
              Disable All Sections
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            💡 Tip: Enable "Live Activity Feed" and "Recent Donations" for maximum FOMO effect
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DummyDataControl;
