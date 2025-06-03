
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
      {/* Ultra-Enhanced CSS for exquisite gold effects */}
      <style>{`
        .memorial-plaque {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .gold-pin {
          background: 
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, transparent 30%),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.7) 0%, transparent 40%),
            linear-gradient(135deg, 
              #DAA520 0%, 
              #FFD700 15%, 
              #FFFACD 25%, 
              #FFE55C 35%, 
              #B8860B 45%, 
              #CD853F 55%,
              #FFD700 65%, 
              #FFFACD 75%, 
              #FFE55C 85%, 
              #DAA520 100%
            );
          background-size: 100% 100%, 100% 100%, 400% 400%;
          box-shadow: 
            0 4px 12px rgba(0,0,0,0.5),
            inset 0 3px 6px rgba(255,255,255,0.9),
            inset 0 -2px 4px rgba(184,134,11,0.8),
            0 0 20px rgba(255,215,0,0.8),
            0 2px 8px rgba(218,165,32,0.6);
          border: 3px solid #B8860B;
          position: relative;
          overflow: hidden;
          animation: royalGoldShimmer 5s ease-in-out infinite;
        }
        
        .gold-pin::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, 
            transparent 35%, 
            rgba(255,255,255,0.95) 50%, 
            transparent 65%
          );
          animation: goldPinGloss 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        
        .gold-plaque {
          background: 
            radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 75%, rgba(255,255,255,0.6) 0%, transparent 40%),
            linear-gradient(135deg, 
              #B8860B 0%, 
              #DAA520 10%, 
              #FFD700 20%, 
              #FFFACD 30%, 
              #FFE55C 40%, 
              #FFA500 50%, 
              #FFE55C 60%, 
              #FFFACD 70%, 
              #FFD700 80%, 
              #DAA520 90%, 
              #B8860B 100%
            );
          background-size: 100% 100%, 100% 100%, 500% 500%;
          box-shadow: 
            inset 0 6px 12px rgba(0,0,0,0.4),
            inset 0 3px 6px rgba(255,255,255,0.9),
            inset 0 -3px 6px rgba(184,134,11,0.8),
            0 0 30px rgba(255,215,0,0.7),
            0 6px 20px rgba(0,0,0,0.3),
            0 2px 8px rgba(218,165,32,0.5);
          border: 4px solid #8B4513;
          position: relative;
          overflow: hidden;
          animation: luxuriousGoldFlow 8s ease-in-out infinite;
        }
        
        .gold-plaque::before {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: 
            conic-gradient(from 0deg at 50% 50%, 
              transparent 0deg, 
              rgba(255,255,255,0.8) 60deg, 
              rgba(255,255,255,0.95) 90deg,
              rgba(255,255,255,0.8) 120deg,
              transparent 180deg,
              transparent 360deg
            );
          animation: magnificentGoldGloss 4s linear infinite;
          pointer-events: none;
        }
        
        .gold-plaque::after {
          content: '';
          position: absolute;
          top: 10%;
          left: 10%;
          right: 10%;
          bottom: 10%;
          background: linear-gradient(45deg, 
            transparent 40%, 
            rgba(255,255,255,0.4) 50%, 
            transparent 60%
          );
          animation: subtleGoldWave 6s ease-in-out infinite reverse;
          pointer-events: none;
          border-radius: inherit;
        }
        
        .marble-texture {
          background: 
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(240,240,240,0.8) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(250,250,250,0.7) 0%, transparent 40%),
            linear-gradient(135deg, 
              #F8F8FF 0%, 
              #F0F8FF 15%, 
              #FFFFFF 30%, 
              #F5F5F5 45%, 
              #E6E6FA 60%, 
              #F0F8FF 75%, 
              #FFFFFF 90%, 
              #F8F8FF 100%
            ),
            linear-gradient(45deg, 
              rgba(220,220,220,0.3) 0%, 
              transparent 25%, 
              rgba(200,200,200,0.2) 50%, 
              transparent 75%
            );
          background-size: 150% 150%, 120% 120%, 100% 100%, 100% 100%, 200% 200%;
          box-shadow: 
            0 15px 50px rgba(0,0,0,0.25),
            inset 0 4px 8px rgba(255,255,255,0.9),
            inset 0 -2px 6px rgba(0,0,0,0.15),
            0 8px 25px rgba(0,0,0,0.1);
          border: 3px solid rgba(255,255,255,0.7);
          position: relative;
          overflow: hidden;
        }
        
        .marble-texture::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(45deg, 
              transparent 30%, 
              rgba(255,255,255,0.5) 45%, 
              rgba(255,255,255,0.8) 50%, 
              rgba(255,255,255,0.5) 55%, 
              transparent 70%
            );
          animation: marbleShine 7s ease-in-out infinite;
          pointer-events: none;
          border-radius: inherit;
        }
        
        @keyframes royalGoldShimmer {
          0%, 100% { 
            background-position: 0% 50%, 0% 0%, 0% 50%;
            filter: brightness(1) saturate(1.4) hue-rotate(0deg);
            transform: scale(1) rotate(0deg);
          }
          25% {
            background-position: 25% 25%, 50% 50%, 25% 25%;
            filter: brightness(1.6) saturate(1.8) hue-rotate(5deg);
            transform: scale(1.08) rotate(2deg);
          }
          50% { 
            background-position: 100% 50%, 100% 100%, 100% 50%;
            filter: brightness(2.2) saturate(2.2) hue-rotate(10deg);
            transform: scale(1.15) rotate(0deg);
          }
          75% {
            background-position: 75% 75%, 25% 75%, 75% 75%;
            filter: brightness(1.6) saturate(1.8) hue-rotate(-5deg);
            transform: scale(1.08) rotate(-2deg);
          }
        }
        
        @keyframes luxuriousGoldFlow {
          0%, 100% { 
            background-position: 0% 50%, 0% 0%, 0% 50%;
            filter: brightness(1.2) saturate(1.6) contrast(1.1);
          }
          33% {
            background-position: 50% 0%, 100% 50%, 50% 0%;
            filter: brightness(1.8) saturate(2.1) contrast(1.3);
          }
          66% { 
            background-position: 100% 100%, 50% 100%, 100% 100%;
            filter: brightness(1.5) saturate(1.9) contrast(1.2);
          }
        }
        
        @keyframes magnificentGoldGloss {
          0% {
            transform: translateX(-150%) translateY(-150%) rotate(0deg);
            opacity: 0;
          }
          25% {
            opacity: 0.6;
          }
          50% {
            transform: translateX(0%) translateY(0%) rotate(180deg);
            opacity: 1;
          }
          75% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(150%) translateY(150%) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes goldPinGloss {
          0%, 100% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          50% {
            transform: translateX(50%) translateY(50%) rotate(45deg);
            opacity: 0.9;
          }
          80% {
            opacity: 0.3;
          }
        }
        
        @keyframes subtleGoldWave {
          0%, 100% {
            transform: translateX(-50%) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateX(50%) rotate(180deg);
            opacity: 0.6;
          }
        }
        
        @keyframes marbleShine {
          0%, 100% {
            transform: translateX(-150%) rotate(45deg);
            opacity: 0;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translateX(50%) rotate(45deg);
            opacity: 0.8;
          }
          75% {
            opacity: 0.3;
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
          background: linear-gradient(135deg, 
            #8B4513, 
            #B8860B, 
            #DAA520, 
            #FFD700, 
            #FFFACD, 
            #FFD700, 
            #DAA520, 
            #B8860B, 
            #8B4513
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: premiumGoldTextShimmer 4s ease-in-out infinite;
          text-shadow: 
            0 2px 4px rgba(184,134,11,0.6),
            0 1px 2px rgba(218,165,32,0.4);
          filter: drop-shadow(0 1px 3px rgba(139,69,19,0.5));
        }
        
        @keyframes premiumGoldTextShimmer {
          0%, 100% { 
            background-position: 0% 50%; 
            filter: brightness(1.2) saturate(1.4);
          }
          25% {
            background-position: 25% 25%;
            filter: brightness(1.6) saturate(1.8);
          }
          50% { 
            background-position: 100% 50%; 
            filter: brightness(2) saturate(2.2);
          }
          75% {
            background-position: 75% 75%;
            filter: brightness(1.6) saturate(1.8);
          }
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
                      {/* Ultra-Enhanced Corner Gold Pins */}
                      <div className="gold-pin absolute top-3 left-3 w-5 h-5 rounded-full"></div>
                      <div className="gold-pin absolute top-3 right-3 w-5 h-5 rounded-full"></div>
                      <div className="gold-pin absolute bottom-3 left-3 w-5 h-5 rounded-full"></div>
                      <div className="gold-pin absolute bottom-3 right-3 w-5 h-5 rounded-full"></div>
                      
                      {/* Ultra-Enhanced Inner Gold Plaque */}
                      <div className="gold-plaque rounded-lg mx-2 my-2 p-4 relative">
                        {/* Memorial Header */}
                        <div className="text-center mb-3">
                          <div className="font-serif text-sm font-bold enhanced-gold-text mb-1">
                            {memorial.honoringOf}
                          </div>
                          <div className="font-serif text-xs enhanced-gold-text font-semibold opacity-90">
                            WE HONOR YOU
                          </div>
                        </div>
                        
                        {/* Donation Information */}
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <span className="text-amber-900 font-medium">
                            Donated by {memorial.user}
                          </span>
                          <div className="flex items-center bg-emerald-100 px-2 py-1 rounded-full border-2 border-emerald-400 shadow-sm">
                            <SimpleGoldCoin size={12} className="mr-1" />
                            <span className="font-bold text-emerald-800">£{memorial.amount}</span>
                          </div>
                        </div>
                        
                        {/* Message */}
                        <div className="bg-amber-50/95 rounded-md px-3 py-2 border-2 border-amber-600 text-center shadow-inner">
                          <div className="text-xs italic text-amber-900 flex items-center justify-center">
                            <Heart className="h-2 w-2 mr-1 text-red-700" />
                            <span className="font-serif">"{memorial.message}"</span>
                            <Heart className="h-2 w-2 ml-1 text-red-700" />
                          </div>
                        </div>
                        
                        {/* Date */}
                        <div className="text-center mt-3">
                          <div className="text-xs font-bold enhanced-gold-text font-serif">
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
