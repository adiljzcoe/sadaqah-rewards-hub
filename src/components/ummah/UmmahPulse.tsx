
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  BookOpen, 
  Coins, 
  Moon, 
  Star,
  Globe,
  Activity,
  TrendingUp,
  Zap,
  Award
} from 'lucide-react';
import { useSpiritualActivities } from '@/hooks/useSpiritualActivities';
import { useToast } from '@/hooks/use-toast';

interface VibeLevel {
  level: number;
  description: string;
  color: string;
  bgColor: string;
}

interface SpiritualActivity {
  id: string;
  emoji: string;
  description: string;
  tag: string;
  color: string;
  trending: boolean;
  count: number;
  lastUpdated: Date;
  jannahPointsAwarded: number;
  type: string;
}

const UmmahPulse = () => {
  const { activities, totalParticipants, recordSpiritualActivity } = useSpiritualActivities();
  const [vibeLevel, setVibeLevel] = useState<VibeLevel>({ level: 75, description: 'High Spiritual Energy', color: 'text-green-600', bgColor: 'bg-green-100' });
  const [mockActivities, setMockActivities] = useState<SpiritualActivity[]>([]);
  const { toast } = useToast();

  // Generate mock activities with all required properties
  useEffect(() => {
    const generateMockActivities = (): SpiritualActivity[] => {
      const baseActivities = [
        { emoji: '🤲', description: '152 souls praying together', tag: 'PrayTogether', type: 'prayer', points: 50 },
        { emoji: '📖', description: '89 reading Quran now', tag: 'QuranReading', type: 'quran', points: 30 },
        { emoji: '💰', description: '43 giving charity', tag: 'CharityFlow', type: 'charity', points: 75 },
        { emoji: '🌅', description: '267 fasting today', tag: 'FastingStrong', type: 'fasting', points: 100 },
        { emoji: '🕌', description: '78 visiting mosques', tag: 'MosqueVisit', type: 'prayer', points: 40 },
        { emoji: '🤝', description: '125 helping others', tag: 'GoodDeeds', type: 'charity', points: 60 }
      ];

      return baseActivities.map((activity, index) => ({
        id: `activity-${index}`,
        emoji: activity.emoji,
        description: activity.description,
        tag: activity.tag,
        color: index % 2 === 0 ? 'text-green-600' : 'text-blue-600',
        trending: Math.random() > 0.5,
        count: Math.floor(Math.random() * 200) + 50,
        lastUpdated: new Date(Date.now() - Math.random() * 300000), // Random time within last 5 minutes
        jannahPointsAwarded: activity.points,
        type: activity.type
      }));
    };

    setMockActivities(generateMockActivities());

    // Update activities periodically
    const interval = setInterval(() => {
      setMockActivities(generateMockActivities());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const calculateVibeLevel = (activities: SpiritualActivity[]) => {
    const total = activities.reduce((sum, activity) => sum + activity.count, 0);
    const level = Math.min(100, Math.max(20, (total / 10) + Math.random() * 20));
    
    if (level >= 80) {
      return { level, description: 'Mashallah! Peak Spiritual Energy', color: 'text-green-600', bgColor: 'bg-green-100' };
    } else if (level >= 60) {
      return { level, description: 'High Spiritual Activity', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    } else if (level >= 40) {
      return { level, description: 'Steady Spiritual Flow', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    } else {
      return { level, description: 'Growing Spiritual Energy', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    }
  };

  useEffect(() => {
    if (mockActivities.length > 0) {
      setVibeLevel(calculateVibeLevel(mockActivities));
    }
  }, [mockActivities]);

  const getVibeIcon = () => {
    if (vibeLevel.level >= 80) return <Heart className="h-6 w-6 animate-pulse" fill="currentColor" />;
    if (vibeLevel.level >= 60) return <Star className="h-6 w-6 animate-pulse" />;
    return <Activity className="h-6 w-6" />;
  };

  const handleJoinActivity = (activity: SpiritualActivity) => {
    // Record the spiritual activity and award Jannah points
    recordSpiritualActivity(activity.type, activity.jannahPointsAwarded);
    
    toast({
      title: `Joined ${activity.tag} activity! 🌟`,
      description: `You're now part of the global ${activity.type} community. Keep up the blessed work!`,
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'prayer': return <Heart className="h-4 w-4" />;
      case 'dhikr': return <Moon className="h-4 w-4" />;
      case 'quran': return <BookOpen className="h-4 w-4" />;
      case 'charity': return <Coins className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 text-white border-0 overflow-hidden">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
        <CardTitle className="flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Globe className="h-6 w-6 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Ummah Pulse</h2>
            <p className="text-sm text-purple-200">Live Spiritual Activity & Jannah Points Integration</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Vibe Meter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={vibeLevel.color}>
                {getVibeIcon()}
              </div>
              <span className="font-semibold">{vibeLevel.description}</span>
            </div>
            <Badge className={`${vibeLevel.bgColor} ${vibeLevel.color} border-0`}>
              {Math.round(vibeLevel.level)}% Energy
            </Badge>
          </div>
          
          <div className="relative">
            <Progress 
              value={vibeLevel.level} 
              className="h-3 bg-white/20"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/30 via-blue-400/30 to-purple-400/30 animate-pulse" />
          </div>
          
          <div className="text-center text-sm text-purple-200">
            {totalParticipants.toLocaleString()} souls connected in worship right now
          </div>
        </div>

        {/* Live Activities with Jannah Points */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-400 animate-pulse" />
            Real-time Spiritual Activities
          </h3>
          
          <div className="grid gap-3">
            {mockActivities.slice(0, 6).map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-white">{activity.description}</p>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                        #{activity.tag}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-purple-200">
                      <span>Updated {Math.floor((Date.now() - activity.lastUpdated.getTime()) / 1000)}s ago</span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        +{activity.jannahPointsAwarded} Jannah Points
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {activity.trending && (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  )}
                  <div className="text-right">
                    <Badge className="bg-white/20 text-white border-0 mb-1">
                      {activity.count}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleJoinActivity(activity)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs px-2 py-1 h-auto"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jannah Points Integration Info */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-yellow-400" />
            <span className="font-bold text-yellow-100">Jannah Points System</span>
          </div>
          <p className="text-sm text-yellow-200 mb-3">
            Join real-time spiritual activities and earn Jannah points! Each activity type awards different points based on its spiritual value.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-yellow-300">🤲 Prayer:</span>
              <span className="text-white font-semibold">50 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-300">💰 Charity:</span>
              <span className="text-white font-semibold">75 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-300">📖 Qur'an:</span>
              <span className="text-white font-semibold">30 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-300">🌅 Fasting:</span>
              <span className="text-white font-semibold">100 pts</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-3 pt-4 border-t border-white/20">
          <p className="text-purple-200">Join the global spiritual energy and earn blessed rewards!</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 border-0">
              <Heart className="h-4 w-4 mr-1" />
              Start Dhikr (+25 pts)
            </Button>
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <BookOpen className="h-4 w-4 mr-1" />
              Read Qur'an (+30 pts)
            </Button>
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Coins className="h-4 w-4 mr-1" />
              Give Charity (+75 pts)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UmmahPulse;
