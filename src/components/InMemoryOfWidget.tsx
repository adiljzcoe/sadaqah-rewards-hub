
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Crown, Users, MessageCircle, Trophy, Star, Gift } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';

const InMemoryOfWidget = () => {
  const [memorialFeed, setMemorialFeed] = useState([]);
  const [topMemorials, setTopMemorials] = useState([
    { name: 'Prophet Muhammad (PBUH)', amount: 15420, donations: 234, rank: 1 },
    { name: 'Father', amount: 12850, donations: 189, rank: 2 },
    { name: 'Mother', amount: 11650, donations: 156, rank: 3 },
    { name: 'Grandmother', amount: 8920, donations: 143, rank: 4 },
    { name: 'All Muslims', amount: 7340, donations: 98, rank: 5 },
    { name: 'Deceased loved one', amount: 6180, donations: 87, rank: 6 },
    { name: 'Grandfather', amount: 5420, donations: 76, rank: 7 },
    { name: 'Sister', amount: 4890, donations: 65, rank: 8 }
  ]);

  // Memoize static data to prevent unnecessary re-renders
  const memorialMessages = useMemo(() => [
    { person: 'Father', messages: ['I love you baba', 'Miss you every day', 'Your teachings guide me', 'Forever in my heart'] },
    { person: 'Mother', messages: ['I love you mama', 'Thank you for everything', 'Your love lives on', 'Missing your hugs'] },
    { person: 'Prophet Muhammad (PBUH)', messages: ['Following your example', 'Peace be upon you', 'Your mercy inspires us', 'Grateful for your guidance'] },
    { person: 'Grandmother', messages: ['Love you nani', 'Your prayers protect us', 'Missing your stories', 'Your wisdom lives on'] },
    { person: 'Grandfather', messages: ['Love you nana', 'Your strength inspires me', 'Missing your advice', 'Thank you for everything'] },
    { person: 'All Muslims', messages: ['May Allah unite us', 'For the ummah', 'Together in faith', 'One community'] },
    { person: 'Deceased loved one', messages: ['Until we meet again', 'Your memory lives on', 'In loving memory', 'Forever remembered'] },
    { person: 'Sister', messages: ['Miss you so much', 'You were my best friend', 'Love you forever', 'Your smile lives on'] },
    { person: 'Brother', messages: ['My hero always', 'Miss our talks', 'You taught me strength', 'Love you bro'] }
  ], []);

  const fakeUsers = useMemo(() => [
    'Ahmad M.', 'Sarah K.', 'Omar R.', 'Fatima S.', 'Yusuf A.', 'Aisha B.', 'Hassan M.', 'Khadija L.',
    'Ali T.', 'Zainab H.', 'Ibrahim K.', 'Maryam N.', 'Abdullah R.', 'Hafsa M.', 'Layla A.', 'Amara J.'
  ], []);

  const donationAmounts = useMemo(() => [25, 50, 75, 100, 150, 200, 250, 300], []);

  // Optimized memorial generation function
  const generateMemorialDonation = useCallback(() => {
    const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
    const randomMemorial = memorialMessages[Math.floor(Math.random() * memorialMessages.length)];
    const randomMessage = randomMemorial.messages[Math.floor(Math.random() * randomMemorial.messages.length)];
    const randomAmount = donationAmounts[Math.floor(Math.random() * donationAmounts.length)];
    
    return {
      id: Date.now() + Math.random(),
      user: randomUser,
      honoringOf: randomMemorial.person,
      message: randomMessage,
      amount: randomAmount,
      timestamp: new Date(),
      isExiting: false
    };
  }, [fakeUsers, memorialMessages, donationAmounts]);

  // Generate memorial donations with better performance
  useEffect(() => {
    let intervalId;
    let timeoutId;

    const updateMemorialFeed = (newDonation) => {
      setMemorialFeed(prev => {
        if (prev.length >= 2) {
          const updatedFeed = prev.map((item, index) => 
            index === prev.length - 1 ? { ...item, isExiting: true } : item
          );
          
          timeoutId = setTimeout(() => {
            setMemorialFeed(current => {
              const filtered = current.filter(item => !item.isExiting);
              return [newDonation, ...filtered.slice(0, 1)]; // Keep only 1 old item max
            });
          }, 500); // Reduced animation time
          
          return updatedFeed;
        } else {
          return [newDonation, ...prev];
        }
      });
      
      // Update leaderboard more efficiently
      setTopMemorials(prev => {
        const updated = [...prev];
        const index = updated.findIndex(memorial => memorial.name === newDonation.honoringOf);
        if (index !== -1) {
          updated[index] = {
            ...updated[index],
            amount: updated[index].amount + newDonation.amount,
            donations: updated[index].donations + 1
          };
        }
        return updated.sort((a, b) => b.amount - a.amount).map((memorial, i) => ({ ...memorial, rank: i + 1 }));
      });
    };

    // Generate initial donations
    const initial1 = generateMemorialDonation();
    updateMemorialFeed(initial1);
    
    timeoutId = setTimeout(() => {
      const initial2 = generateMemorialDonation();
      updateMemorialFeed(initial2);
    }, 1000);
    
    // Slower, less frequent updates for better mobile performance
    intervalId = setInterval(() => {
      const newDonation = generateMemorialDonation();
      updateMemorialFeed(newDonation);
    }, 12000); // Increased from 8 seconds

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [generateMemorialDonation]);

  // Ensure we always have exactly 2 items to display
  const getDisplayItems = () => {
    const items = [...memorialFeed];
    while (items.length < 2) {
      items.push({
        id: `placeholder-${items.length}`,
        user: '',
        honoringOf: '',
        message: '',
        amount: 0,
        timestamp: new Date(),
        isPlaceholder: true,
        isExiting: false
      });
    }
    return items.slice(0, 2);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2: return <Trophy className="h-4 w-4 text-gray-400" />;
      case 3: return <Star className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 2: return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
      case 3: return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center text-gray-900">
          <Heart className="h-5 w-5 mr-2 text-pink-600" />
          Honoring
        </h3>
        <p className="text-sm text-gray-600">Honoring loved ones through charitable giving</p>
      </div>

      {/* Single Column Layout */}
      <div className="space-y-6">
        {/* Live Honoring Feed - Memorial Limestone/Marble Plaques */}
        <div>
          <div className="flex items-center mb-4">
            <MessageCircle className="h-4 w-4 mr-2 text-blue-600" />
            <h4 className="font-semibold text-gray-800">Live Honoring Feed</h4>
          </div>
          
          <div className="space-y-4 min-h-[280px]">
            {getDisplayItems().map((memorial, index) => (
              <div
                key={memorial.id}
                className={`transition-all duration-800 ease-in-out ${
                  memorial.isPlaceholder 
                    ? 'opacity-0 pointer-events-none' 
                    : memorial.isExiting 
                      ? 'opacity-0 transform scale-95' 
                      : 'opacity-100 transform scale-100'
                } ${
                  memorial.isPlaceholder 
                    ? 'bg-gray-50 border border-gray-100' 
                    : 'bg-gradient-to-br from-gray-100 via-stone-100 to-gray-200'
                } rounded-xl shadow-2xl relative overflow-hidden`}
                style={{ 
                  minHeight: '130px',
                  transitionDelay: memorial.isExiting ? '0ms' : `${index * 200}ms`,
                  boxShadow: memorial.isPlaceholder ? '' : '0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)'
                }}
              >
                {!memorial.isPlaceholder && (
                  <>
                    {/* Limestone/Marble Outer Frame */}
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-gray-100 to-stone-300 rounded-xl" />
                    
                    {/* Marble Texture Effect */}
                    <div 
                      className="absolute inset-0 opacity-40 rounded-xl"
                      style={{
                        background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.6) 0%, transparent 50%)'
                      }}
                    />

                    {/* Limestone Grain Texture */}
                    <div 
                      className="absolute inset-0 opacity-20 rounded-xl"
                      style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px), repeating-linear-gradient(-45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)'
                      }}
                    />

                    {/* Enhanced Gold Pins with Better Positioning */}
                    {/* Corner Pins */}
                    <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 shadow-lg border-2 border-amber-800" style={{ animation: 'gold-gloss 4s ease-in-out infinite' }} />
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 shadow-lg border-2 border-amber-800" style={{ animation: 'gold-gloss 4s ease-in-out infinite 0.5s' }} />
                    <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 shadow-lg border-2 border-amber-800" style={{ animation: 'gold-gloss 4s ease-in-out infinite 1s' }} />
                    <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 shadow-lg border-2 border-amber-800" style={{ animation: 'gold-gloss 4s ease-in-out infinite 1.5s' }} />
                    
                    {/* Side Pins */}
                    <div className="absolute top-1/2 left-1.5 transform -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 shadow-lg border-2 border-amber-800" style={{ animation: 'gold-gloss 4s ease-in-out infinite 2s' }} />
                    <div className="absolute top-1/2 right-1.5 transform -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 shadow-lg border-2 border-amber-800" style={{ animation: 'gold-gloss 4s ease-in-out infinite 2.5s' }} />

                    {/* Pin Highlights */}
                    <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-gradient-to-br from-white to-yellow-200 opacity-90" />
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-white to-yellow-200 opacity-90" />
                    <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-gradient-to-br from-white to-yellow-200 opacity-90" />
                    <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-white to-yellow-200 opacity-90" />
                    <div className="absolute top-1/2 left-1.5 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-white to-yellow-200 opacity-90" />
                    <div className="absolute top-1/2 right-1.5 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-white to-yellow-200 opacity-90" />
                    
                    {/* Inner Gold Plaque */}
                    <div className="absolute inset-4 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-lg shadow-inner border-2 border-amber-700" style={{ animation: 'gold-plaque-gloss 6s ease-in-out infinite' }}>
                      {/* Gold Plaque Shine Effect */}
                      <div 
                        className="absolute inset-0 opacity-30 rounded-lg"
                        style={{
                          background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 60%, transparent 80%)',
                          animation: 'gold-shine 8s ease-in-out infinite'
                        }}
                      />
                      
                      {/* Gold Texture */}
                      <div 
                        className="absolute inset-0 opacity-25 rounded-lg"
                        style={{
                          background: 'repeating-linear-gradient(90deg, transparent, transparent 0.5px, rgba(255,255,255,0.1) 0.5px, rgba(255,255,255,0.1) 1px)'
                        }}
                      />

                      {/* Memorial Plaque Content */}
                      <div className="relative p-4 z-10 h-full flex flex-col justify-center">
                        {/* Memorial Header */}
                        <div className="text-center mb-3">
                          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-900 to-transparent mx-auto mb-2" />
                          <div className="font-serif text-base font-bold text-amber-900 mb-1 tracking-wide">
                            {memorial.honoringOf}
                          </div>
                          <div className="font-serif text-xs text-amber-900 font-semibold tracking-wider">
                            WE HONOR YOU
                          </div>
                        </div>
                        
                        {/* Donation Information */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs text-amber-900 font-medium">
                            Donated by {memorial.user}
                          </div>
                          <div className="flex items-center bg-gradient-to-r from-emerald-100 to-green-200 px-2 py-1 rounded-full border border-emerald-500 shadow-md">
                            <SimpleGoldCoin size={14} className="mr-1" />
                            <span className="text-xs font-bold text-emerald-800">£{memorial.amount}</span>
                          </div>
                        </div>
                        
                        {/* Message in Enhanced Frame */}
                        <div className="bg-gradient-to-r from-yellow-100/95 to-amber-100/95 rounded-md px-3 py-2 border border-amber-800 shadow-inner backdrop-blur-sm mb-2 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-md" />
                          <div className="text-xs italic text-amber-900 text-center font-medium flex items-center justify-center relative z-10">
                            <Heart className="h-2.5 w-2.5 mr-1.5 text-red-800" />
                            <span className="font-serif">"{memorial.message}"</span>
                            <Heart className="h-2.5 w-2.5 ml-1.5 text-red-800" />
                          </div>
                        </div>
                        
                        {/* Date Stamp */}
                        <div className="text-center">
                          <div className="inline-block bg-amber-800/20 px-2 py-0.5 rounded border border-amber-800 shadow-inner">
                            <div className="text-xs font-bold text-amber-900 font-serif">
                              {new Date(memorial.timestamp).toLocaleDateString('en-GB', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Gold Gloss Animation Styles */}
                    <style>{`
                      @keyframes gold-gloss {
                        0%, 100% {
                          box-shadow: 0 0 8px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.6);
                          filter: brightness(1);
                        }
                        50% {
                          box-shadow: 0 0 16px rgba(255, 215, 0, 0.8), inset 0 2px 4px rgba(255,255,255,0.9);
                          filter: brightness(1.3);
                        }
                      }
                      
                      @keyframes gold-plaque-gloss {
                        0%, 100% {
                          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), 0 0 12px rgba(255, 215, 0, 0.3);
                          filter: brightness(1) saturate(1);
                        }
                        50% {
                          box-shadow: inset 0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(255, 215, 0, 0.6);
                          filter: brightness(1.2) saturate(1.3);
                        }
                      }
                      
                      @keyframes gold-shine {
                        0% {
                          transform: translateX(-150%) translateY(-150%) rotate(45deg);
                          opacity: 0;
                        }
                        15% {
                          opacity: 1;
                        }
                        35% {
                          transform: translateX(0%) translateY(0%) rotate(45deg);
                          opacity: 1;
                        }
                        50% {
                          transform: translateX(75%) translateY(75%) rotate(45deg);
                          opacity: 0.8;
                        }
                        70% {
                          transform: translateX(150%) translateY(150%) rotate(45deg);
                          opacity: 0.4;
                        }
                        100% {
                          transform: translateX(200%) translateY(200%) rotate(45deg);
                          opacity: 0;
                        }
                      }
                    `}</style>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Most Honored */}
        <div>
          <div className="flex items-center mb-4">
            <Trophy className="h-4 w-4 mr-2 text-yellow-600" />
            <h4 className="font-semibold text-gray-800">Top 5 Most Honored</h4>
          </div>
          
          <div className="space-y-3">
            {topMemorials.slice(0, 5).map((memorial) => (
              <div
                key={memorial.name}
                className={`flex items-center justify-between p-4 rounded-lg border ${getRankColor(memorial.rank)} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(memorial.rank)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">
                      {memorial.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {memorial.donations} donations
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center font-bold text-emerald-700">
                    <SimpleGoldCoin size={14} className="mr-1" />
                    <span className="text-sm">£{memorial.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memorial Statistics */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-purple-700">
                £{topMemorials.reduce((sum, memorial) => sum + memorial.amount, 0).toLocaleString()}
              </div>
              <div className="text-xs text-purple-600">Total Honoring Donations</div>
            </div>
            <div>
              <div className="text-xl font-bold text-pink-700">
                {topMemorials.reduce((sum, memorial) => sum + memorial.donations, 0)}
              </div>
              <div className="text-xs text-pink-600">Honoring Acts</div>
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600 italic">
              "And whoever saves a life, it is as if he has saved all of mankind" - Quran 5:32
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InMemoryOfWidget;
