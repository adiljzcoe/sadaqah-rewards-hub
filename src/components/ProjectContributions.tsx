
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, Droplets, Heart, Crown, Target, Star, Trophy, Gift } from 'lucide-react';

const ProjectContributions = () => {
  // Mock user contribution data - would come from API
  const userContributions = {
    mosques: {
      totalSpaces: 47,
      completedMosques: 2,
      currentMosqueProgress: 68, // percentage towards next full mosque
      spacesNeededForNext: 18,
      totalInvested: 4700
    },
    waterWells: {
      totalParts: 23,
      completedWells: 1,
      currentWellProgress: 77, // percentage towards next full well
      partsNeededForNext: 7,
      totalInvested: 1150
    },
    orphanages: {
      totalSpaces: 15,
      completedOrphanages: 0,
      currentOrphanageProgress: 30, // percentage towards next full orphanage
      spacesNeededForNext: 35,
      totalInvested: 1500
    }
  };

  const lifeGoals = [
    {
      title: "First Masjid Builder",
      description: "Fund a complete mosque",
      progress: 68,
      completed: userContributions.mosques.completedMosques >= 1,
      reward: "🕌 Mosque Builder Badge",
      category: "mosque"
    },
    {
      title: "Water Provider",
      description: "Fund a complete water well",
      progress: 77,
      completed: userContributions.waterWells.completedWells >= 1,
      reward: "💧 Well Builder Badge",
      category: "water"
    },
    {
      title: "Child Guardian",
      description: "Fund a complete orphanage",
      progress: 30,
      completed: userContributions.orphanages.completedOrphanages >= 1,
      reward: "👶 Orphan Guardian Badge",
      category: "orphan"
    },
    {
      title: "Community Champion",
      description: "Fund 5 complete projects",
      progress: 60, // (2 + 1 + 0) / 5 * 100
      completed: false,
      reward: "🏆 Champion Crown",
      category: "overall"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Project Progress Overview */}
      <Card className="p-6 hover-lift">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          Your Project Contributions
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Life Impact Tracker
          </Badge>
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Mosques */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 p-6 border-2 border-emerald-200">
            <div className="absolute top-2 right-2 text-4xl opacity-20">🕌</div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Building2 className="h-8 w-8 text-emerald-600" />
                <Badge className="bg-emerald-600 text-white">
                  {userContributions.mosques.completedMosques} Complete
                </Badge>
              </div>
              <h4 className="font-bold text-lg text-emerald-800 mb-2">Mosques</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Prayer Spaces Funded</span>
                  <span className="font-bold">{userContributions.mosques.totalSpaces}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Mosque Progress</span>
                    <span className="font-bold">{userContributions.mosques.currentMosqueProgress}%</span>
                  </div>
                  <Progress value={userContributions.mosques.currentMosqueProgress} className="h-3" />
                  <p className="text-xs text-emerald-700">
                    {userContributions.mosques.spacesNeededForNext} more spaces needed!
                  </p>
                </div>
                <div className="text-xs text-emerald-600 font-semibold">
                  Total Invested: £{userContributions.mosques.totalInvested.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Water Wells */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-cyan-100 p-6 border-2 border-blue-200">
            <div className="absolute top-2 right-2 text-4xl opacity-20">💧</div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Droplets className="h-8 w-8 text-blue-600" />
                <Badge className="bg-blue-600 text-white">
                  {userContributions.waterWells.completedWells} Complete
                </Badge>
              </div>
              <h4 className="font-bold text-lg text-blue-800 mb-2">Water Wells</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Well Parts Funded</span>
                  <span className="font-bold">{userContributions.waterWells.totalParts}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Well Progress</span>
                    <span className="font-bold">{userContributions.waterWells.currentWellProgress}%</span>
                  </div>
                  <Progress value={userContributions.waterWells.currentWellProgress} className="h-3" />
                  <p className="text-xs text-blue-700">
                    {userContributions.waterWells.partsNeededForNext} more parts needed!
                  </p>
                </div>
                <div className="text-xs text-blue-600 font-semibold">
                  Total Invested: £{userContributions.waterWells.totalInvested.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Orphanages */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 p-6 border-2 border-rose-200">
            <div className="absolute top-2 right-2 text-4xl opacity-20">🏠</div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Heart className="h-8 w-8 text-rose-600" />
                <Badge className="bg-rose-600 text-white">
                  {userContributions.orphanages.completedOrphanages} Complete
                </Badge>
              </div>
              <h4 className="font-bold text-lg text-rose-800 mb-2">Orphanages</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Spaces Funded</span>
                  <span className="font-bold">{userContributions.orphanages.totalSpaces}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Orphanage Progress</span>
                    <span className="font-bold">{userContributions.orphanages.currentOrphanageProgress}%</span>
                  </div>
                  <Progress value={userContributions.orphanages.currentOrphanageProgress} className="h-3" />
                  <p className="text-xs text-rose-700">
                    {userContributions.orphanages.spacesNeededForNext} more spaces needed!
                  </p>
                </div>
                <div className="text-xs text-rose-600 font-semibold">
                  Total Invested: £{userContributions.orphanages.totalInvested.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Life Goals Section */}
      <Card className="p-6 hover-lift">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-purple-600" />
          Life Goals & Achievements
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse">
            <Trophy className="h-3 w-3 mr-1" />
            Unlock Rewards
          </Badge>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {lifeGoals.map((goal, index) => (
            <div key={index} className={`relative overflow-hidden rounded-xl p-6 border-2 transition-all duration-300 ${
              goal.completed 
                ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300 ring-2 ring-green-200' 
                : 'bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200 hover:border-purple-300'
            }`}>
              {goal.completed && (
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
                    ✓
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h4 className={`font-bold text-lg ${goal.completed ? 'text-green-800' : 'text-gray-800'}`}>
                    {goal.title}
                  </h4>
                  <p className={`text-sm ${goal.completed ? 'text-green-600' : 'text-gray-600'}`}>
                    {goal.description}
                  </p>
                </div>
                
                {!goal.completed && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-bold">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                  </div>
                )}
                
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  goal.completed 
                    ? 'bg-green-100 border border-green-200' 
                    : 'bg-purple-50 border border-purple-200'
                }`}>
                  <Gift className={`h-4 w-4 ${goal.completed ? 'text-green-600' : 'text-purple-600'}`} />
                  <span className={`text-sm font-semibold ${
                    goal.completed ? 'text-green-700' : 'text-purple-700'
                  }`}>
                    {goal.completed ? 'Unlocked: ' : 'Reward: '}{goal.reward}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivational Call to Action */}
      <Card className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 hover-lift">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl animate-pulse">
              🎯
            </div>
          </div>
          <h3 className="text-2xl font-bold text-purple-800">Keep Building Your Legacy!</h3>
          <p className="text-purple-700 max-w-2xl mx-auto">
            Every donation brings you closer to completing life-changing projects. 
            Your contributions are creating lasting impact across communities worldwide.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-full shadow-md">
              <strong>Next Milestone:</strong> Complete your first mosque!
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md">
              <strong>Impact:</strong> {userContributions.mosques.totalSpaces + userContributions.waterWells.totalParts + userContributions.orphanages.totalSpaces} lives touched
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectContributions;
