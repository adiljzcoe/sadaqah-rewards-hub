
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Zap, Crown, Gift } from 'lucide-react';
import { achievements, checkAchievements, type Achievement } from '@/utils/streakSystem';
import { useToast } from '@/hooks/use-toast';

const AchievementSystem = () => {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
  const [recentlyEarned, setRecentlyEarned] = useState<Achievement[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userAchievements') || '[]');
    setUserAchievements(saved);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300 shadow-purple-200';
      case 'legendary': return 'border-yellow-300 shadow-yellow-200';
      default: return 'border-gray-300';
    }
  };

  const earnedCount = userAchievements.length;
  const totalCount = achievements.length;
  const progressPercentage = (earnedCount / totalCount) * 100;

  const recentAchievements = userAchievements
    .filter(a => a.earnedDate)
    .sort((a, b) => new Date(b.earnedDate!).getTime() - new Date(a.earnedDate!).getTime())
    .slice(0, 3);

  return (
    <Card className="p-6 game-card">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Achievements
          </span>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            {earnedCount}/{totalCount}
          </Badge>
        </h3>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-700 mb-3 text-sm flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            Recently Earned
          </h4>
          <div className="space-y-2">
            {recentAchievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`flex items-center gap-3 p-3 rounded-lg border-2 ${getRarityBorder(achievement.rarity)} bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white hover-lift`}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-sm">{achievement.title}</div>
                  <div className="text-xs opacity-90">{achievement.description}</div>
                </div>
                <Badge className="bg-white/20 text-white">
                  +{achievement.points}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievement Categories */}
      <div className="space-y-4">
        {['streak', 'donation', 'special', 'social'].map(type => {
          const typeAchievements = achievements.filter(a => a.type === type);
          const typeEarned = userAchievements.filter(a => a.type === type).length;
          
          return (
            <div key={type} className="game-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold text-gray-700 capitalize flex items-center gap-2">
                  {type === 'streak' && <Zap className="h-4 w-4 text-orange-500" />}
                  {type === 'donation' && <Gift className="h-4 w-4 text-green-500" />}
                  {type === 'special' && <Star className="h-4 w-4 text-purple-500" />}
                  {type === 'social' && <Crown className="h-4 w-4 text-blue-500" />}
                  {type} Achievements
                </h5>
                <Badge variant="outline">
                  {typeEarned}/{typeAchievements.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {typeAchievements.slice(0, 4).map((achievement) => {
                  const isEarned = userAchievements.some(a => a.id === achievement.id);
                  return (
                    <div 
                      key={achievement.id} 
                      className={`p-2 rounded-lg border text-center transition-all ${
                        isEarned 
                          ? `border-2 ${getRarityBorder(achievement.rarity)} bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white` 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="text-lg mb-1">{achievement.icon}</div>
                      <div className="text-xs font-bold">{achievement.title}</div>
                      {isEarned && (
                        <Badge className="bg-white/20 text-white text-xs mt-1">
                          Earned!
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AchievementSystem;
