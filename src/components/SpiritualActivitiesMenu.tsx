
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Heart, Clock, Moon, Sparkles, X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSpiritualActivities } from '@/hooks/useSpiritualActivities';

const SpiritualActivitiesMenu = () => {
  const [open, setOpen] = useState(false);
  const { activities, totalParticipants, recordSpiritualActivity } = useSpiritualActivities();

  const handleActivityClick = (activityType: string, points: number) => {
    recordSpiritualActivity(activityType, points);
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const quickActions = [
    { name: 'Read Quran', path: '/quran-reader', icon: BookOpen, points: 30, color: 'from-emerald-500 to-green-600', activityType: 'quran' },
    { name: 'Make Dhikr', path: '/dhikr-community', icon: Sparkles, points: 25, color: 'from-blue-500 to-indigo-600', activityType: 'dhikr' },
    { name: 'Prayer Times', path: '/namaz-times', icon: Clock, points: 50, color: 'from-purple-500 to-pink-600', activityType: 'prayer' },
    { name: 'Make Dua', path: '/dua-wall', icon: Heart, points: 20, color: 'from-rose-500 to-pink-600', activityType: 'dua' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40">
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-green-600 text-white shadow-xl border-2 border-white/20 hover:scale-110 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
          >
            <div className="relative">
              <Star className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 flex flex-col h-full [&>button]:hidden">
        
        {/* Floating Close Button - Top Right */}
        <div className="absolute top-2 right-2 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105 shadow-md"
          >
            <X className="h-4 w-4 text-white/90" />
          </Button>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-4 space-y-4 h-full">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 rounded-2xl p-4 shadow-xl border border-yellow-300/50">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-white mr-2" />
                <h2 className="text-xl font-bold text-white drop-shadow-md">Jannah Points</h2>
              </div>
              <p className="text-sm text-yellow-100/90 drop-shadow-sm">Earn rewards through spiritual activities</p>
              <div className="mt-3 text-center">
                <span className="text-lg font-bold text-white drop-shadow-md">
                  {totalParticipants.toLocaleString()} believers active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg mb-3 text-center">Quick Actions</h3>
            {quickActions.map((action, index) => (
              <div key={index} className="group">
                <Link
                  to={action.path}
                  onClick={() => handleActivityClick(action.activityType, action.points)}
                  className={`flex items-center p-3 rounded-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r ${action.color} shadow-lg group-hover:shadow-2xl`}
                >
                  <div className="rounded-lg p-2 bg-white/20 mr-3 backdrop-blur-sm">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{action.name}</div>
                    <div className="text-xs text-white/80">+{action.points} points</div>
                  </div>
                  <Plus className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
                </Link>
              </div>
            ))}
          </div>

          {/* Live Activity Feed */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg mb-3 text-center">Live Community</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {activities.slice(0, 6).map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{activity.emoji}</span>
                      <div>
                        <div className="text-white text-xs font-medium leading-tight">
                          {activity.description}
                        </div>
                        <Badge className={`text-xs mt-1 ${activity.color} bg-white/20 border-white/30`}>
                          #{activity.tag}
                        </Badge>
                      </div>
                    </div>
                    {activity.trending && (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
                        <span className="text-xs text-green-400 font-medium">Live</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Links */}
          <div className="space-y-2 pt-4 border-t border-white/20">
            <Link
              to="/my-jannah"
              onClick={handleLinkClick}
              className="flex items-center p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <Moon className="h-5 w-5 mr-3" />
              <span className="text-sm">View My Jannah</span>
            </Link>
            <Link
              to="/leaderboards"
              onClick={handleLinkClick}
              className="flex items-center p-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <Star className="h-5 w-5 mr-3" />
              <span className="text-sm">Community Leaderboards</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SpiritualActivitiesMenu;
