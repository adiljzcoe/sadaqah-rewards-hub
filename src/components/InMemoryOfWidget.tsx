import React, { useState, useEffect } from 'react';
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

  const memorialMessages = [
    { person: 'Father', messages: ['I love you baba', 'Miss you every day', 'Your teachings guide me', 'Forever in my heart'] },
    { person: 'Mother', messages: ['I love you mama', 'Thank you for everything', 'Your love lives on', 'Missing your hugs'] },
    { person: 'Prophet Muhammad (PBUH)', messages: ['Following your example', 'Peace be upon you', 'Your mercy inspires us', 'Grateful for your guidance'] },
    { person: 'Grandmother', messages: ['Love you nani', 'Your prayers protect us', 'Missing your stories', 'Your wisdom lives on'] },
    { person: 'Grandfather', messages: ['Love you nana', 'Your strength inspires me', 'Missing your advice', 'Thank you for everything'] },
    { person: 'All Muslims', messages: ['May Allah unite us', 'For the ummah', 'Together in faith', 'One community'] },
    { person: 'Deceased loved one', messages: ['Until we meet again', 'Your memory lives on', 'In loving memory', 'Forever remembered'] },
    { person: 'Sister', messages: ['Miss you so much', 'You were my best friend', 'Love you forever', 'Your smile lives on'] },
    { person: 'Brother', messages: ['My hero always', 'Miss our talks', 'You taught me strength', 'Love you bro'] }
  ];

  const fakeUsers = [
    'Ahmad M.', 'Sarah K.', 'Omar R.', 'Fatima S.', 'Yusuf A.', 'Aisha B.', 'Hassan M.', 'Khadija L.',
    'Ali T.', 'Zainab H.', 'Ibrahim K.', 'Maryam N.', 'Abdullah R.', 'Hafsa M.', 'Layla A.', 'Amara J.'
  ];

  const donationAmounts = [25, 50, 75, 100, 150, 200, 250, 300];

  // Generate memorial donations
  useEffect(() => {
    const generateMemorialDonation = () => {
      const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      const randomMemorial = memorialMessages[Math.floor(Math.random() * memorialMessages.length)];
      const randomMessage = randomMemorial.messages[Math.floor(Math.random() * randomMemorial.messages.length)];
      const randomAmount = donationAmounts[Math.floor(Math.random() * donationAmounts.length)];
      
      const memorialDonation = {
        id: Date.now() + Math.random(),
        user: randomUser,
        honoringOf: randomMemorial.person,
        message: randomMessage,
        amount: randomAmount,
        timestamp: new Date(),
        isExiting: false
      };

      setMemorialFeed(prev => {
        const newFeed = [memorialDonation, ...prev.slice(0, 2)];
        return newFeed;
      });
      
      // Update leaderboard
      setTopMemorials(prev => prev.map(memorial => 
        memorial.name === randomMemorial.person 
          ? { ...memorial, amount: memorial.amount + randomAmount, donations: memorial.donations + 1 }
          : memorial
      ).sort((a, b) => b.amount - a.amount).map((memorial, index) => ({ ...memorial, rank: index + 1 })));
      
      // Mark oldest item for exit after 8 seconds, remove after 10 seconds
      setTimeout(() => {
        setMemorialFeed(prev => prev.map(item => 
          item.id === memorialDonation.id ? { ...item, isExiting: true } : item
        ));
      }, 8000);

      setTimeout(() => {
        setMemorialFeed(prev => prev.filter(d => d.id !== memorialDonation.id));
      }, 10000);
    };

    // Generate initial donation
    generateMemorialDonation();
    
    const interval = setInterval(() => {
      generateMemorialDonation();
    }, Math.random() * 6000 + 4000);

    return () => clearInterval(interval);
  }, []);

  // Ensure we always have exactly 3 items to display
  const getDisplayItems = () => {
    const items = [...memorialFeed];
    while (items.length < 3) {
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
    return items.slice(0, 3);
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
        {/* Live Honoring Feed - Memorial Bronze Plaques */}
        <div>
          <div className="flex items-center mb-4">
            <MessageCircle className="h-4 w-4 mr-2 text-blue-600" />
            <h4 className="font-semibold text-gray-800">Live Honoring Feed</h4>
          </div>
          
          <div className="space-y-4 min-h-[360px]">
            {getDisplayItems().map((memorial, index) => (
              <div
                key={memorial.id}
                className={`transition-all duration-500 ease-in-out ${
                  memorial.isPlaceholder 
                    ? 'opacity-0 pointer-events-none' 
                    : memorial.isExiting 
                      ? 'opacity-0 transform scale-95' 
                      : 'opacity-100 transform scale-100 animate-fade-in'
                } ${
                  memorial.isPlaceholder 
                    ? 'bg-gray-50 border border-gray-100' 
                    : 'bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-700'
                } rounded-xl border-4 border-amber-800 shadow-2xl relative overflow-hidden`}
                style={{ 
                  minHeight: '120px',
                  transitionDelay: memorial.isExiting ? '0ms' : `${index * 100}ms`,
                  boxShadow: memorial.isPlaceholder ? '' : '0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}
              >
                {!memorial.isPlaceholder && (
                  <>
                    {/* Bronze Memorial Plaque Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 rounded-lg opacity-95" />
                    
                    {/* Metallic Shine Effect */}
                    <div 
                      className="absolute inset-0 opacity-40 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.3) 55%, transparent 75%)',
                        animation: 'shine 4s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Brushed Metal Texture */}
                    <div 
                      className="absolute inset-0 opacity-20 rounded-lg"
                      style={{
                        background: 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)'
                      }}
                    />
                    
                    {/* Memorial Plaque Content */}
                    <div className="relative p-6 z-10">
                      {/* Memorial Header */}
                      <div className="text-center mb-4">
                        <div className="font-serif text-xs font-bold text-amber-900 mb-2 tracking-[0.2em] uppercase">
                          Memorial Plaque
                        </div>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-900 to-transparent mx-auto mb-3" />
                        <div className="font-serif text-lg font-bold text-amber-900 mb-2 tracking-wide">
                          {memorial.honoringOf}
                        </div>
                        <div className="font-serif text-sm text-amber-900 font-semibold tracking-wider">
                          WE HONOR YOU
                        </div>
                      </div>
                      
                      {/* Donation Information */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xs text-amber-900 font-medium">
                          Donated by {memorial.user}
                        </div>
                        <div className="flex items-center bg-gradient-to-r from-emerald-100 to-green-200 px-3 py-1.5 rounded-full border-2 border-emerald-400 shadow-md">
                          <SimpleGoldCoin size={16} className="mr-1.5" />
                          <span className="text-sm font-bold text-emerald-800">£{memorial.amount}</span>
                        </div>
                      </div>
                      
                      {/* Message in Bronze Frame */}
                      <div className="bg-gradient-to-r from-yellow-200/90 to-amber-200/90 rounded-lg px-4 py-3 border-2 border-amber-800 shadow-inner backdrop-blur-sm mb-3">
                        <div className="text-sm italic text-amber-900 text-center font-medium flex items-center justify-center">
                          <Heart className="h-3 w-3 mr-2 text-red-700" />
                          <span className="font-serif">"{memorial.message}"</span>
                          <Heart className="h-3 w-3 ml-2 text-red-700" />
                        </div>
                      </div>
                      
                      {/* Date Stamp */}
                      <div className="text-center">
                        <div className="inline-block bg-amber-800/20 px-3 py-1 rounded border border-amber-800">
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

                    {/* Metallic Shine Animation */}
                    <style>{`
                      @keyframes shine {
                        0% {
                          transform: translateX(-100%) translateY(-100%) rotate(30deg);
                        }
                        25% {
                          transform: translateX(50%) translateY(50%) rotate(30deg);
                        }
                        50% {
                          transform: translateX(100%) translateY(100%) rotate(30deg);
                        }
                        75% {
                          transform: translateX(150%) translateY(150%) rotate(30deg);
                        }
                        100% {
                          transform: translateX(300%) translateY(300%) rotate(30deg);
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
