
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Heart, Send, Sparkles, Users } from 'lucide-react';

const DuaTab = () => {
  const [newDua, setNewDua] = useState('');
  const [showSubmitEffect, setShowSubmitEffect] = useState(false);

  // Mock dua data - in real app, this would come from API
  const globalDuas = [
    { 
      id: '1', 
      text: 'May Allah grant ease to all those struggling', 
      author: 'Anonymous', 
      ameens: 234, 
      timeAgo: '2m ago',
      gradient: 'from-green-400/20 to-emerald-600/20'
    },
    { 
      id: '2', 
      text: 'Grant us strength in our faith and good health', 
      author: 'Believer123', 
      ameens: 156, 
      timeAgo: '5m ago',
      gradient: 'from-blue-400/20 to-cyan-600/20'
    },
    { 
      id: '3', 
      text: 'Protect our families and guide us on the right path', 
      author: 'ServantOfAllah', 
      ameens: 89, 
      timeAgo: '8m ago',
      gradient: 'from-purple-400/20 to-violet-600/20'
    }
  ];

  const handleSubmitDua = () => {
    if (newDua.trim()) {
      setShowSubmitEffect(true);
      setTimeout(() => setShowSubmitEffect(false), 1500);
      console.log('Submitting dua:', newDua);
      // Here you would call the dua API to submit the dua
      setNewDua('');
    }
  };

  const handleAmeen = (duaId: string) => {
    console.log('Saying Ameen to dua:', duaId);
    // Here you would call the API to record the Ameen and award points
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gradient-to-b from-slate-800/20 to-blue-900/20 text-white relative overflow-hidden">
      {/* Submit effect */}
      {showSubmitEffect && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold animate-slide-in-bounce shadow-xl">
            <Sparkles className="inline h-5 w-5 mr-2" />
            Dua Submitted! +5 Points
          </div>
        </div>
      )}

      {/* Global stats */}
      <div className="mb-6">
        <div className="text-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-purple-400/30">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            1,247
          </div>
          <div className="text-purple-200/80 text-sm flex items-center justify-center">
            <Users className="h-4 w-4 mr-1" />
            Global Duas Today
          </div>
        </div>
      </div>
        
      {/* Dua submission */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Input
            placeholder="Write your dua..."
            value={newDua}
            onChange={(e) => setNewDua(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-purple-400 focus:ring-purple-400/20"
          />
        </div>
        <Button 
          onClick={handleSubmitDua}
          disabled={!newDua.trim()}
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Send className="h-4 w-4 mr-2" />
          Submit Dua (+5 points)
        </Button>
      </div>

      {/* Global duas feed */}
      <ScrollArea className="flex-1">
        <div className="space-y-3">
          {globalDuas.map((dua) => (
            <div key={dua.id} className={`p-4 border border-white/10 rounded-xl bg-gradient-to-r ${dua.gradient} backdrop-blur-sm hover:border-white/20 transition-all duration-300`}>
              <div className="text-sm mb-3 text-white/90 leading-relaxed">{dua.text}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-white/70 font-medium">{dua.author}</span>
                  <span className="text-xs text-white/50">{dua.timeAgo}</span>
                </div>
                <Button
                  onClick={() => handleAmeen(dua.id)}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Heart className="h-3 w-3 mr-1" />
                  Ameen ({dua.ameens})
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DuaTab;
