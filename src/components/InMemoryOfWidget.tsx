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
              return [newDonation, ...filtered.slice(0, 1)];
            });
          }, 300);
          
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
    
    // Slower updates for better performance
    intervalId = setInterval(() => {
      const newDonation = generateMemorialDonation();
      updateMemorialFeed(newDonation);
    }, 15000);

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
    <>
      {/* Enhanced CSS for more exquisite gold effects */}
      <style>{`
        .memorial-plaque {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .gold-pin {
          background: linear-gradient(135deg, 
            #ffd700 0%, 
            #ffed4e 15%, 
            #ffffff 25%, 
            #ffd700 35%, 
            #b8860b 50%, 
            #ffd700 65%, 
            #ffffff 75%, 
            #ffed4e 85%, 
            #ffd700 100%
          );
          background-size: 200% 200%;
          box-shadow: 
            0 3px 6px rgba(0,0,0,0.4),
            inset 0 2px 4px rgba(255,255,255,0.8),
            inset 0 -1px 2px rgba(184,134,11,0.6),
            0 0 12px rgba(255,215,0,0.6);
          border: 2px solid #b8860b;
          animation: luxuriousGoldShimmer 4s ease-in-out infinite;
        }
        
        .gold-plaque {
          background: linear-gradient(135deg, 
            #ffd700 0%, 
            #ffed4e 20%, 
            #ffffff 30%, 
            #ffc107 40%, 
            #b8860b 50%, 
            #ffc107 60%, 
            #ffffff 70%, 
            #ffed4e 80%, 
            #ffd700 100%
          );
          background-size: 300% 300%;
          box-shadow: 
            inset 0 4px 8px rgba(0,0,0,0.3),
            inset 0 2px 4px rgba(255,255,255,0.8),
            inset 0 -2px 4px rgba(184,134,11,0.7),
            0 0 20px rgba(255,215,0,0.5),
            0 4px 16px rgba(0,0,0,0.2);
          border: 3px solid #b8860b;
          position: relative;
          overflow: hidden;
          animation: premiumGoldFlow 6s ease-in-out infinite;
        }
        
        .gold-plaque::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, 
            transparent 40%, 
            rgba(255,255,255,0.8) 50%, 
            transparent 60%
          );
          animation: goldGlossWave 3s ease-in-out infinite;
          pointer-events: none;
        }
        
        .marble-texture {
          background: 
            linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #ffffff 50%, #e9ecef 75%, #f8f9fa 100%),
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.9) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0%, transparent 60%);
          box-shadow: 
            0 12px 40px rgba(0,0,0,0.2),
            inset 0 2px 4px rgba(255,255,255,0.8),
            inset 0 -1px 3px rgba(0,0,0,0.1);
          border: 2px solid rgba(255,255,255,0.5);
          position: relative;
        }
        
        .marble-texture::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(255,255,255,0.3) 50%, 
            transparent 70%
          );
          animation: marbleShine 5s ease-in-out infinite;
          pointer-events: none;
          border-radius: inherit;
        }
        
        @keyframes luxuriousGoldShimmer {
          0%, 100% { 
            background-position: 0% 50%;
            filter: brightness(1) saturate(1.2);
            transform: scale(1);
          }
          25% {
            background-position: 25% 25%;
            filter: brightness(1.4) saturate(1.6);
            transform: scale(1.05);
          }
          50% { 
            background-position: 100% 50%;
            filter: brightness(1.8) saturate(2);
            transform: scale(1.1);
          }
          75% {
            background-position: 75% 75%;
            filter: brightness(1.4) saturate(1.6);
            transform: scale(1.05);
          }
        }
        
        @keyframes premiumGoldFlow {
          0%, 100% { 
            background-position: 0% 50%;
            filter: brightness(1) saturate(1.3);
          }
          33% {
            background-position: 50% 0%;
            filter: brightness(1.5) saturate(1.8);
          }
          66% { 
            background-position: 100% 100%;
            filter: brightness(1.2) saturate(1.5);
          }
        }
        
        @keyframes goldGlossWave {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes marbleShine {
          0%, 100% {
            transform: translateX(-100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            transform: translateX(0%) rotate(45deg);
            opacity: 0.6;
          }
          100% {
            transform: translateX(100%) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        
        .memorial-enter {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .memorial-exit {
          animation: fadeOut 0.3s ease-in forwards;
        }
        
        .enhanced-gold-text {
          color: #2c1810;
          text-shadow: 
            2px 2px 0px #8b6914,
            3px 3px 0px #ffd700,
            4px 4px 0px #b8860b,
            5px 5px 6px rgba(0,0,0,0.8);
          font-weight: 900;
          letter-spacing: 0.5px;
        }
        
        .readable-dark-text {
          color: #1a202c;
          text-shadow: 
            1px 1px 0px #ffffff,
            2px 2px 0px rgba(255,255,255,0.8),
            3px 3px 4px rgba(0,0,0,0.6);
          font-weight: 800;
        }
        
        .message-text {
          color: #2d1b0a;
          text-shadow: 
            1px 1px 0px #ffffff,
            2px 2px 0px rgba(255,255,255,0.9),
            3px 3px 4px rgba(0,0,0,0.5);
          font-weight: 700;
          font-style: italic;
        }
        
        .date-text {
          color: #1a365d;
          text-shadow: 
            1px 1px 0px #ffd700,
            2px 2px 0px #b8860b,
            3px 3px 4px rgba(0,0,0,0.6);
          font-weight: 900;
          letter-spacing: 0.3px;
        }
        
        @keyframes goldTextShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <Card className="p-4 sm:p-6 bg-white border border-gray-200 shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center text-gray-900">
            <Heart className="h-5 w-5 mr-2 text-pink-600" />
            Honoring
          </h3>
          <p className="text-sm text-gray-600">Honoring loved ones through charitable giving</p>
        </div>

        {/* Single Column Layout */}
        <div className="space-y-6">
          {/* Live Honoring Feed */}
          <div>
            <div className="flex items-center mb-4">
              <MessageCircle className="h-4 w-4 mr-2 text-blue-600" />
              <h4 className="font-semibold text-gray-800">Live Honoring Feed</h4>
            </div>
            
            <div className="space-y-3 min-h-[240px]">
              {getDisplayItems().map((memorial, index) => (
                <div
                  key={memorial.id}
                  className={`memorial-plaque relative ${
                    memorial.isPlaceholder 
                      ? 'opacity-0 pointer-events-none h-24' 
                      : memorial.isExiting 
                        ? 'memorial-exit' 
                        : 'memorial-enter'
                  }`}
                  style={{ 
                    minHeight: memorial.isPlaceholder ? '96px' : '120px'
                  }}
                >
                  {!memorial.isPlaceholder && (
                    <div className="marble-texture rounded-lg p-4 relative overflow-hidden">
                      {/* Enhanced Corner Gold Pins */}
                      <div className="gold-pin absolute top-3 left-3 w-4 h-4 rounded-full"></div>
                      <div className="gold-pin absolute top-3 right-3 w-4 h-4 rounded-full"></div>
                      <div className="gold-pin absolute bottom-3 left-3 w-4 h-4 rounded-full"></div>
                      <div className="gold-pin absolute bottom-3 right-3 w-4 h-4 rounded-full"></div>
                      
                      {/* Enhanced Inner Gold Plaque */}
                      <div className="gold-plaque rounded-lg mx-2 my-2 p-4 relative">
                        {/* Memorial Header */}
                        <div className="text-center mb-3">
                          <div className="font-serif text-base font-black enhanced-gold-text mb-1">
                            {memorial.honoringOf}
                          </div>
                          <div className="font-serif text-xs enhanced-gold-text font-black opacity-95 tracking-wider">
                            WE HONOR YOU
                          </div>
                        </div>
                        
                        {/* Donation Information */}
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <span className="readable-dark-text text-xs font-bold">
                            Donated by {memorial.user}
                          </span>
                          <div className="flex items-center bg-emerald-100 px-2 py-1 rounded-full border-2 border-emerald-400 shadow-sm">
                            <SimpleGoldCoin size={12} className="mr-1" />
                            <span className="font-black text-emerald-800 text-xs">£{memorial.amount}</span>
                          </div>
                        </div>
                        
                        {/* Message */}
                        <div className="bg-amber-50/95 rounded-md px-3 py-2 border-2 border-amber-600 text-center shadow-inner">
                          <div className="text-xs flex items-center justify-center">
                            <Heart className="h-2 w-2 mr-1 text-red-700" />
                            <span className="font-serif message-text">"{memorial.message}"</span>
                            <Heart className="h-2 w-2 ml-1 text-red-700" />
                          </div>
                        </div>
                        
                        {/* Date */}
                        <div className="text-center mt-3">
                          <div className="text-xs font-serif date-text">
                            {new Date(memorial.timestamp).toLocaleDateString('en-GB')}
                          </div>
                        </div>
                      </div>
                    </div>
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
                  className={`flex items-center justify-between p-3 rounded-lg border ${getRankColor(memorial.rank)} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(memorial.rank)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-sm truncate">
                        {memorial.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {memorial.donations} donations
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
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
                <div className="text-lg sm:text-xl font-bold text-purple-700">
                  £{topMemorials.reduce((sum, memorial) => sum + memorial.amount, 0).toLocaleString()}
                </div>
                <div className="text-xs text-purple-600">Total Honoring Donations</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-pink-700">
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
    </>
  );
};

export default InMemoryOfWidget;
