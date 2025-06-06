
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Heart, Clock, Moon, Sparkles, Plus, Users, Building } from 'lucide-react';
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
        <div className="fixed left-4 bottom-4 z-40">
          <Button
            variant="ghost"
            className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-white shadow-2xl border-4 border-white/30 hover:scale-110 transition-all duration-500 hover:shadow-3xl backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-transparent to-orange-200/20 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 w-1/3 animate-[shine_3s_ease-in-out_infinite] rounded-full"></div>
            
            <div className="relative flex flex-col items-center justify-center">
              <Star className="h-5 w-5 mb-0.5 drop-shadow-lg" />
              <span className="text-xs font-bold drop-shadow-md">JP's</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 flex flex-col h-full [&>button]:hidden">
        
        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-4 space-y-4 h-full">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 rounded-2xl p-4 shadow-xl border border-yellow-300/50">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-white mr-2" />
                <h2 className="text-xl font-bold text-white drop-shadow-md">JP's (Jannah Points)</h2>
              </div>
              <p className="text-sm text-yellow-100/90 drop-shadow-sm">Earn heavenly rewards through spiritual activities</p>
              <div className="mt-3 text-center">
                <span className="text-lg font-bold text-white drop-shadow-md">
                  {totalParticipants.toLocaleString()} believers earning JP's
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg mb-3 text-center">Quick JP's</h3>
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
                    <div className="text-xs text-white/80">+{action.points} JP's</div>
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
              to="/my-ummah"
              onClick={handleLinkClick}
              className="flex items-center p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <Users className="h-5 w-5 mr-3" />
              <span className="text-sm">My Ummah</span>
            </Link>
            <Link
              to="/my-masjid"
              onClick={handleLinkClick}
              className="flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <Building className="h-5 w-5 mr-3" />
              <span className="text-sm">My Masjid</span>
            </Link>
            <Link
              to="/leaderboards"
              onClick={handleLinkClick}
              className="flex items-center p-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <Star className="h-5 w-5 mr-3" />
              <span className="text-sm">JP's Leaderboards</span>
            </Link>
          </div>
        </div>

        {/* Keep existing keyframes styles */}
        <style>{`
          @keyframes shine {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(400%) skewX(-12deg); }
          }
        `}</style>
      </SheetContent>
    </Sheet>
  );
};

export default SpiritualActivitiesMenu;
