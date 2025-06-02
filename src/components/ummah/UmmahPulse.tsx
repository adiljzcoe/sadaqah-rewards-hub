
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  BookOpen, 
  Users, 
  Coins, 
  HandHeart, 
  Moon, 
  Star,
  Globe,
  Activity,
  TrendingUp
} from 'lucide-react';

interface SpiritualActivity {
  id: string;
  type: 'prayer' | 'dhikr' | 'quran' | 'charity' | 'dua' | 'fasting' | 'learning';
  description: string;
  count: number;
  emoji: string;
  color: string;
  lastUpdated: Date;
  trending: boolean;
}

interface VibeLevel {
  level: number;
  description: string;
  color: string;
  bgColor: string;
}

const UmmahPulse = () => {
  const [activities, setActivities] = useState<SpiritualActivity[]>([]);
  const [vibeLevel, setVibeLevel] = useState<VibeLevel>({ level: 75, description: 'High Spiritual Energy', color: 'text-green-600', bgColor: 'bg-green-100' });
  const [totalParticipants, setTotalParticipants] = useState(0);

  const spiritualActivities = [
    { type: 'prayer', emoji: '🤲', baseCount: 150, variance: 50, color: 'text-green-600' },
    { type: 'dhikr', emoji: '🌙', baseCount: 80, variance: 30, color: 'text-blue-600' },
    { type: 'quran', emoji: '📖', baseCount: 60, variance: 25, color: 'text-purple-600' },
    { type: 'charity', emoji: '💰', baseCount: 40, variance: 20, color: 'text-orange-600' },
    { type: 'dua', emoji: '🤲', baseCount: 120, variance: 40, color: 'text-indigo-600' },
    { type: 'fasting', emoji: '🌅', baseCount: 25, variance: 15, color: 'text-yellow-600' },
    { type: 'learning', emoji: '🎓', baseCount: 35, variance: 15, color: 'text-pink-600' }
  ];

  const getActivityDescription = (type: string, count: number) => {
    const descriptions = {
      prayer: [
        `${count} believers just finished prayer`,
        `${count} hearts connected in salah`,
        `${count} souls in communion with Allah`
      ],
      dhikr: [
        `${count} people are making dhikr`,
        `${count} hearts remembering Allah`,
        `${count} tongues reciting His names`
      ],
      quran: [
        `${count} reading Qur'an`,
        `${count} souls absorbing divine guidance`,
        `${count} hearts with the Book of Allah`
      ],
      charity: [
        `${count} people just gave charity`,
        `${count} hearts opened for giving`,
        `${count} hands extended in generosity`
      ],
      dua: [
        `${count} making du'a right now`,
        `${count} hearts calling upon Allah`,
        `${count} voices raised in supplication`
      ],
      fasting: [
        `${count} fasting for Allah`,
        `${count} souls purifying through fasting`,
        `${count} hearts strengthening faith`
      ],
      learning: [
        `${count} learning about Islam`,
        `${count} minds seeking knowledge`,
        `${count} hearts growing in wisdom`
      ]
    };
    
    const options = descriptions[type as keyof typeof descriptions] || [`${count} engaging in worship`];
    return options[Math.floor(Math.random() * options.length)];
  };

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

  const generateActivities = () => {
    const newActivities: SpiritualActivity[] = [];
    let total = 0;

    spiritualActivities.forEach((template, index) => {
      const count = template.baseCount + Math.floor(Math.random() * template.variance);
      const isTrending = Math.random() > 0.7;
      
      total += count;
      
      newActivities.push({
        id: `${template.type}_${Date.now()}_${index}`,
        type: template.type as any,
        description: getActivityDescription(template.type, count),
        count,
        emoji: template.emoji,
        color: template.color,
        lastUpdated: new Date(),
        trending: isTrending
      });
    });

    // Sort by count descending and add some randomness
    newActivities.sort((a, b) => b.count - a.count);
    
    setActivities(newActivities);
    setTotalParticipants(total);
    setVibeLevel(calculateVibeLevel(newActivities));
  };

  useEffect(() => {
    // Initial generation
    generateActivities();

    // Update every 3-5 seconds for live feel
    const interval = setInterval(() => {
      generateActivities();
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  const getVibeIcon = () => {
    if (vibeLevel.level >= 80) return <Heart className="h-6 w-6 animate-pulse" fill="currentColor" />;
    if (vibeLevel.level >= 60) return <Star className="h-6 w-6 animate-pulse" />;
    return <Activity className="h-6 w-6" />;
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
            <p className="text-sm text-purple-200">Live Spiritual Activity Across the Globe</p>
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

        {/* Live Activities */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-400 animate-pulse" />
            Real-time Spiritual Activities
          </h3>
          
          <div className="grid gap-3">
            {activities.slice(0, 6).map((activity) => (
              <div 
                key={activity.id}
                className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.emoji}</span>
                  <div>
                    <p className="font-medium text-white">{activity.description}</p>
                    <p className="text-xs text-purple-200">
                      Updated {Math.floor((Date.now() - activity.lastUpdated.getTime()) / 1000)}s ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {activity.trending && (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  )}
                  <Badge className="bg-white/20 text-white border-0">
                    {activity.count}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-3 pt-4 border-t border-white/20">
          <p className="text-purple-200">Join the global spiritual energy!</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 border-0">
              <Heart className="h-4 w-4 mr-1" />
              Join Prayer
            </Button>
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <BookOpen className="h-4 w-4 mr-1" />
              Read Qur'an
            </Button>
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Coins className="h-4 w-4 mr-1" />
              Give Charity
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UmmahPulse;
