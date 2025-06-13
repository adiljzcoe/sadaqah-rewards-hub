
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Users, Trophy, Sparkles, Zap } from 'lucide-react';

const DhikrTab = () => {
  const [selectedDhikr, setSelectedDhikr] = useState('');
  const [count, setCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Mock dhikr data - in real app, this would come from API
  const dhikrOptions = [
    { id: 'subhanallah', text: 'سُبْحَانَ ٱللَّٰهِ', translation: 'SubhanAllah', points: 1, color: 'from-green-400 to-emerald-600' },
    { id: 'alhamdulillah', text: 'ٱلْحَمْدُ لِلَّٰهِ', translation: 'Alhamdulillah', points: 1, color: 'from-blue-400 to-cyan-600' },
    { id: 'allahuakbar', text: 'ٱللَّٰهُ أَكْبَرُ', translation: 'Allahu Akbar', points: 1, color: 'from-purple-400 to-violet-600' },
    { id: 'laahawla', text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ', translation: 'La hawla wa la quwwata illa billah', points: 2, color: 'from-yellow-400 to-orange-600' }
  ];

  const globalStats = {
    totalCount: 2847293,
    todayCount: 12847,
    myRank: 142
  };

  const handleDhikrClick = () => {
    if (selectedDhikr) {
      setCount(prev => prev + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
      console.log('Recording dhikr:', selectedDhikr, count + 1);
      // Here you would call the dhikr API to record the action
    }
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gradient-to-b from-slate-800/20 to-purple-900/20 text-white relative overflow-hidden">
      {/* Celebration particles */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-explosion"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              <Sparkles className="h-6 w-6 text-yellow-300" />
            </div>
          ))}
        </div>
      )}

      {/* Stats section with cosmic design */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-4 border border-green-400/30 backdrop-blur-sm">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent animate-number-pop">
              {globalStats.totalCount.toLocaleString()}
            </div>
            <div className="text-green-200/80 text-sm">Global Today</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-xl p-4 border border-blue-400/30 backdrop-blur-sm">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              #{globalStats.myRank}
            </div>
            <div className="text-blue-200/80 text-sm">My Rank</div>
          </div>
        </div>
      </div>

      {/* Dhikr selection with enhanced design */}
      <ScrollArea className="flex-1 mb-6">
        <div className="space-y-3">
          {dhikrOptions.map((dhikr) => (
            <button
              key={dhikr.id}
              onClick={() => setSelectedDhikr(dhikr.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedDhikr === dhikr.id 
                  ? `bg-gradient-to-r ${dhikr.color} border-white/30 shadow-lg` 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-lg font-bold text-white">{dhikr.translation}</div>
                <Badge className={`bg-gradient-to-r ${dhikr.color} text-white border-0`}>
                  <Zap className="h-3 w-3 mr-1" />
                  +{dhikr.points}
                </Badge>
              </div>
              <div className="text-sm text-white/70 mb-1 font-arabic text-right">{dhikr.text}</div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Counter and action button */}
      <div className="space-y-4">
        {selectedDhikr && (
          <div className="text-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-purple-400/30">
            <div className={`text-4xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent ${showCelebration ? 'animate-bounce-in' : ''}`}>
              {count}
            </div>
            <div className="text-purple-200/80 text-sm">Today's Count</div>
          </div>
        )}
        <Button 
          onClick={handleDhikrClick}
          disabled={!selectedDhikr}
          className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          <Star className="h-5 w-5 mr-2" />
          Record Dhikr
        </Button>
      </div>
    </div>
  );
};

export default DhikrTab;
