
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Coins, MapPin, Clock, Sparkles, Moon, Sun } from 'lucide-react';
import DhikrTab from './floating-widget/DhikrTab';
import DuaTab from './floating-widget/DuaTab';
import DonateTab from './floating-widget/DonateTab';
import JannahTab from './floating-widget/JannahTab';
import { useAuth } from '@/hooks/useAuth';

const FloatingTabWidget = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState('dhikr');
  const [glowIntensity, setGlowIntensity] = useState(0);
  const { user } = useAuth();

  // Celestial glow animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'dhikr': return <Star className="h-4 w-4" />;
      case 'dua': return <Moon className="h-4 w-4" />;
      case 'donate': return <Heart className="h-4 w-4" />;
      case 'jannah': return <Sparkles className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Celestial background glow */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-blue-900/10 to-transparent pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center bottom, 
            rgba(139, 92, 246, ${0.1 + Math.sin(glowIntensity * 0.1) * 0.05}), 
            rgba(59, 130, 246, ${0.05 + Math.cos(glowIntensity * 0.08) * 0.03}), 
            transparent 70%)`
        }}
      />
      
      <Card className={`relative bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-blue-900/95 backdrop-blur-xl border-0 shadow-2xl transition-all duration-500 ease-out ${
        isMinimized ? 'mx-auto w-20 h-20 rounded-full mb-4' : 'w-full h-96 rounded-none'
      }`}>
        
        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className="h-3 w-3 text-yellow-300/60" />
            </div>
          ))}
        </div>

        {isMinimized ? (
          <button 
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center text-4xl hover:scale-110 transition-all duration-300 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg hover:shadow-xl animate-glow"
          >
            🕌
          </button>
        ) : (
          <div className="h-full flex flex-col">
            {/* Header with celestial design */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-gradient-to-r from-purple-800/30 to-blue-800/30">
              <div className="flex items-center space-x-2">
                <div className="animate-float">
                  <Sun className="h-5 w-5 text-yellow-300" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-200 to-purple-200 bg-clip-text text-transparent">
                  Islamic Actions
                </h3>
                <div className="animate-float" style={{ animationDelay: '1s' }}>
                  <Moon className="h-4 w-4 text-blue-200" />
                </div>
              </div>
              <button 
                onClick={() => setIsMinimized(true)}
                className="text-white/70 hover:text-white hover:scale-110 transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-full p-2"
              >
                ✕
              </button>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              {/* Enhanced tab navigation */}
              <TabsList className="grid w-full grid-cols-4 h-16 bg-gradient-to-r from-slate-800/50 to-purple-800/50 border-b border-white/10">
                <TabsTrigger 
                  value="dhikr" 
                  className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-1">
                    {getTabIcon('dhikr')}
                    <span>Dhikr</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="dua" 
                  className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-1">
                    {getTabIcon('dua')}
                    <span>Dua</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="donate" 
                  className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-1">
                    {getTabIcon('donate')}
                    <span>Donate</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="jannah" 
                  className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-1">
                    {getTabIcon('jannah')}
                    <span>Jannah</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              {/* Tab content with enhanced styling */}
              <div className="flex-1 overflow-hidden bg-gradient-to-b from-slate-800/30 to-purple-900/30">
                <TabsContent value="dhikr" className="h-full m-0 p-0">
                  <DhikrTab />
                </TabsContent>
                <TabsContent value="dua" className="h-full m-0 p-0">
                  <DuaTab />
                </TabsContent>
                <TabsContent value="donate" className="h-full m-0 p-0">
                  <DonateTab />
                </TabsContent>
                <TabsContent value="jannah" className="h-full m-0 p-0">
                  <JannahTab />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}

        {/* Celestial border glow */}
        <div className="absolute inset-0 rounded-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full animate-glow" />
        </div>
      </Card>
    </div>
  );
};

export default FloatingTabWidget;
