
import React from 'react';
import Header from '@/components/Header';
import IslamicCalendarGrid from '@/components/islamic-calendar/IslamicCalendarGrid';
import IslamicCalendarStats from '@/components/islamic-calendar/IslamicCalendarStats';
import CelebrationEffects from '@/components/islamic-calendar/CelebrationEffects';
import { Toaster } from '@/components/ui/toaster';
import { Calendar, Star, Sparkles } from 'lucide-react';

const IslamicCalendar = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Add celebration effects to the main page too */}
      <CelebrationEffects />
      
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section with celebration elements */}
        <div className="text-center mb-12 relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full animate-traditional-glow">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Islamic Calendar
            </h1>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full animate-pulse">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Stay connected with the sacred rhythm of Islamic months and never miss a blessed day. 
            Each date brings unique opportunities for worship, reflection, and community celebration.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full animate-celebration-bounce">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Sacred Days</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full animate-celebration-bounce" style={{ animationDelay: '0.2s' }}>
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Live Countdowns</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full animate-celebration-bounce" style={{ animationDelay: '0.4s' }}>
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Beautiful Celebrations</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <IslamicCalendarStats />

        {/* Main Calendar Grid */}
        <IslamicCalendarGrid />

        {/* Enhanced Beautiful Quote Section with celebration elements */}
        <div className="mt-16 text-center relative">
          <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background celebration pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-yellow-300 rounded-full animate-ping" />
              <div className="absolute top-8 right-8 w-6 h-6 border-2 border-pink-300 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-8 w-10 h-10 border-2 border-green-300 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute bottom-8 right-4 w-8 h-8 border-2 border-blue-300 rounded-full animate-bounce" />
            </div>
            
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                "And it is He who created the heavens and earth in truth. 
                And the day He says 'Be,' and it is, His word is the truth."
              </h3>
              <p className="text-lg opacity-90">- Quran 6:73</p>
              <div className="mt-6 flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-300 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default IslamicCalendar;
