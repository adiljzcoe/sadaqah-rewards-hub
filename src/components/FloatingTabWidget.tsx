
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Coins, MapPin, Clock } from 'lucide-react';
import DhikrTab from './floating-widget/DhikrTab';
import DuaTab from './floating-widget/DuaTab';
import DonateTab from './floating-widget/DonateTab';
import JannahTab from './floating-widget/JannahTab';
import { useAuth } from '@/hooks/useAuth';

const FloatingTabWidget = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState('dhikr');
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 mb-4">
      <Card className={`bg-white/95 backdrop-blur-sm shadow-2xl border-0 transition-all duration-300 ${
        isMinimized ? 'w-16 h-16' : 'w-96 h-80'
      }`}>
        {isMinimized ? (
          <button 
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center text-2xl hover:bg-gray-50 rounded-lg"
          >
            🕌
          </button>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-2 border-b">
              <h3 className="text-sm font-semibold text-gray-700">Islamic Actions</h3>
              <button 
                onClick={() => setIsMinimized(true)}
                className="text-gray-500 hover:text-gray-700 text-xs"
              >
                ✕
              </button>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-4 h-12">
                <TabsTrigger value="dhikr" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Dhikr
                </TabsTrigger>
                <TabsTrigger value="dua" className="text-xs">
                  🤲
                  Dua
                </TabsTrigger>
                <TabsTrigger value="donate" className="text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  Donate
                </TabsTrigger>
                <TabsTrigger value="jannah" className="text-xs">
                  <Coins className="h-3 w-3 mr-1" />
                  Jannah
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="dhikr" className="h-full m-0">
                  <DhikrTab />
                </TabsContent>
                <TabsContent value="dua" className="h-full m-0">
                  <DuaTab />
                </TabsContent>
                <TabsContent value="donate" className="h-full m-0">
                  <DonateTab />
                </TabsContent>
                <TabsContent value="jannah" className="h-full m-0">
                  <JannahTab />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FloatingTabWidget;
