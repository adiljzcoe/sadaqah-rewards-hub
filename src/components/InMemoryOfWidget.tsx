
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
        timestamp: new Date()
      };

      setMemorialFeed(prev => [memorialDonation, ...prev.slice(0, 4)]);
      
      // Update leaderboard
      setTopMemorials(prev => prev.map(memorial => 
        memorial.name === randomMemorial.person 
          ? { ...memorial, amount: memorial.amount + randomAmount, donations: memorial.donations + 1 }
          : memorial
      ).sort((a, b) => b.amount - a.amount).map((memorial, index) => ({ ...memorial, rank: index + 1 })));
      
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

      {/* Mobile: Single Column Layout */}
      <div className="block lg:flex">
        {/* Memorial Feed - Full width on mobile, 2/3 on desktop */}
        <div className="w-full lg:w-2/3 lg:pr-4">
          <div className="flex items-center mb-3">
            <MessageCircle className="h-4 w-4 mr-2 text-blue-600" />
            <h4 className="font-semibold text-gray-800">Live Honoring Feed</h4>
          </div>
          
          <div className="space-y-3">
            {memorialFeed.map((memorial) => (
              <div
                key={memorial.id}
                className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3 animate-fade-in"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">
                      {memorial.user} donated honoring <span className="font-bold text-purple-700">{memorial.honoringOf}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <SimpleGoldCoin size={14} className="mr-1" />
                      <span className="text-sm font-bold text-emerald-600">£{memorial.amount}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {new Date(memorial.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                </div>
                
                <div className="bg-white/50 rounded-lg px-3 py-2 border border-purple-200">
                  <div className="text-sm italic text-gray-700 flex items-center">
                    <Heart className="h-3 w-3 mr-1 text-pink-500" />
                    "{memorial.message}"
                  </div>
                </div>
              </div>
            ))}
            
            {memorialFeed.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Heart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Honoring donations will appear here</p>
              </div>
            )}
          </div>

          {/* Memorial Statistics */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-700">
                  £{topMemorials.reduce((sum, memorial) => sum + memorial.amount, 0).toLocaleString()}
                </div>
                <div className="text-xs text-purple-600">Total Honoring Donations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-700">
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

        {/* Leaderboard & Ad Space - Full width on mobile, 1/3 on desktop */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:pl-4 lg:border-l lg:border-gray-200">
          {/* Memorial Leaderboard */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Trophy className="h-4 w-4 mr-2 text-yellow-600" />
              <h4 className="font-semibold text-gray-800">Most Honored</h4>
              <Badge className="ml-2 bg-yellow-100 text-yellow-800 text-xs">Top 5</Badge>
            </div>
            
            <div className="space-y-2">
              {topMemorials.slice(0, 5).map((memorial) => (
                <div
                  key={memorial.name}
                  className={`flex items-center justify-between p-2 rounded-lg border ${getRankColor(memorial.rank)} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-6 h-6">
                      {getRankIcon(memorial.rank)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-xs">
                        {memorial.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {memorial.donations} donations
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center font-bold text-emerald-700">
                      <SimpleGoldCoin size={12} className="mr-1" />
                      <span className="text-xs">£{memorial.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Space */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-dashed border-pink-200 rounded-lg p-4 text-center">
              <div className="text-pink-600 mb-2">💝</div>
              <h5 className="font-semibold text-gray-800 text-sm mb-2">Honoring Gifts</h5>
              <p className="text-xs text-gray-600 mb-3">Honor loved ones with a lasting impact</p>
              <button className="bg-pink-600 text-white px-3 py-1 rounded text-xs hover:bg-pink-700 transition-colors">
                Start Honoring
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-dashed border-purple-200 rounded-lg p-4 text-center">
              <div className="text-purple-600 mb-2">🕊️</div>
              <h5 className="font-semibold text-gray-800 text-sm mb-2">Peace Fund</h5>
              <p className="text-xs text-gray-600 mb-3">Dedicated to peaceful causes worldwide</p>
              <button className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors">
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InMemoryOfWidget;
