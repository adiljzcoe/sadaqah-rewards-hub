import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Users, Heart, Share2, Volume2, Sparkles, Zap, Star, Gift, Trophy, Flame, Target, Crown, Award } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';
import EpicDonationButton from './EpicDonationButton';

interface DonationActivity {
  id: string | number;
  user: string;
  amount?: number;
  finalAmount?: number;
  emoji: string;
  timestamp: Date | string;
  onBehalfOf?: string;
  note?: string;
  streak?: number;
  multiplier?: number;
  category?: string;
  coins?: number;
  title?: string;
}

const LiveVideo = () => {
  const [recentDonations, setRecentDonations] = useState<DonationActivity[]>([]);
  const [userCoins, setUserCoins] = useState(1250);
  const [userPoints, setUserPoints] = useState(5632);
  const [userLevel, setUserLevel] = useState(12);
  const [floatingCoins, setFloatingCoins] = useState<any[]>([]);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [fakeDonations, setFakeDonations] = useState<DonationActivity[]>([]);
  const [userBadges, setUserBadges] = useState<string[]>(['first-donor', 'streak-master']);
  const [dailyStreak, setDailyStreak] = useState(5);
  const [weeklyStreak, setWeeklyStreak] = useState(2);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [epicNotification, setEpicNotification] = useState<DonationActivity | null>(null);
  const [dedicationFeed, setDedicationFeed] = useState<DonationActivity[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<DonationActivity[]>([]);

  // Rotating emojis for each category
  const categoryEmojis = {
    food: ['🍽️', '🍞', '🥘', '🍲', '🥗', '🍚', '🥙', '🌮'],
    water: ['💧', '🚰', '⛲', '🌊', '💦', '🪣', '🚿'],
    shelter: ['🏠', '🏘️', '🏡', '🛖', '⛺', '🏕️', '🏰'],
    education: ['📚', '📖', '🎓', '✏️', '🖊️', '📝', '🌍', '💻', '🔬'],
    medicine: ['💊', '🏥', '🩺', '💉', '🧬', '⚕️', '🏨'],
    comfort: ['🧸', '🎁', '💝', '🤗', '❤️', '🌟', '🎀']
  };

  const [currentEmojis, setCurrentEmojis] = useState({
    food: categoryEmojis.food[0],
    water: categoryEmojis.water[0],
    shelter: categoryEmojis.shelter[0],
    education: categoryEmojis.education[0],
    medicine: categoryEmojis.medicine[0],
    comfort: categoryEmojis.comfort[0]
  });

  const quickDonations = [
    { 
      key: 'food', 
      label: 'Hot Meal', 
      coins: 50, 
      impact: 'Feed 1 family', 
      color: 'from-orange-400 to-red-500',
      category: 'food'
    },
    { 
      key: 'water', 
      label: 'Clean Water', 
      coins: 25, 
      impact: 'Water for 1 day', 
      color: 'from-blue-400 to-cyan-500',
      category: 'water'
    },
    { 
      key: 'shelter', 
      label: 'Shelter', 
      coins: 100, 
      impact: 'Safe night', 
      color: 'from-green-400 to-emerald-600',
      category: 'shelter'
    },
    { 
      key: 'education', 
      label: 'Education', 
      coins: 30, 
      impact: 'School supplies', 
      color: 'from-purple-400 to-violet-600',
      category: 'education'
    },
    { 
      key: 'medicine', 
      label: 'Medicine', 
      coins: 75, 
      impact: 'Medical aid', 
      color: 'from-pink-400 to-rose-500',
      category: 'medicine'
    },
    { 
      key: 'comfort', 
      label: 'Comfort', 
      coins: 20, 
      impact: 'Child care', 
      color: 'from-yellow-400 to-amber-500',
      category: 'comfort'
    }
  ];

  const badges = {
    'first-donor': { name: 'First Steps', icon: '🎯', color: 'from-blue-400 to-blue-600' },
    'streak-master': { name: 'Streak Master', icon: '🔥', color: 'from-orange-400 to-red-600' },
    'generous-heart': { name: 'Generous Heart', icon: '💖', color: 'from-pink-400 to-rose-600' },
    'level-up': { name: 'Rising Star', icon: '⭐', color: 'from-yellow-400 to-amber-600' },
    'weekly-warrior': { name: 'Weekly Warrior', icon: '⚡', color: 'from-purple-400 to-violet-600' }
  };

  const affirmations = [
    'You are so generous! 💖',
    'Your kindness is amazing! ✨',
    'What a beautiful heart! 🌟',
    'You\'re making a real difference! 🙌',
    'Your compassion inspires others! 💫',
    'Such a generous soul! 🤲',
    'You are truly blessed! 🌈',
    'Your charity is beautiful! 💝',
    'Allah will reward your kindness! 🤲',
    'You have a golden heart! 💛'
  ];

  const fakeUsers = [
    'Ahmad M.', 'Sarah K.', 'Omar R.', 'Fatima S.', 'Yusuf A.', 'Aisha B.', 'Hassan M.', 'Khadija L.',
    'Ali T.', 'Zainab H.', 'Ibrahim K.', 'Maryam N.', 'Abdullah R.', 'Hafsa M.', 'Anonymous'
  ];

  // Rotate emojis every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojis(prev => {
        const newEmojis = { ...prev };
        Object.keys(categoryEmojis).forEach(category => {
          const emojis = categoryEmojis[category];
          const currentIndex = emojis.indexOf(prev[category]);
          const nextIndex = (currentIndex + 1) % emojis.length;
          newEmojis[category] = emojis[nextIndex];
        });
        return newEmojis;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update displayed messages when donations change
  useEffect(() => {
    const allMessages = [...recentDonations, ...fakeDonations, ...dedicationFeed]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 4);
    
    setDisplayedMessages(allMessages);
  }, [recentDonations, fakeDonations, dedicationFeed]);

  // Generate fake donations every 3-8 seconds
  useEffect(() => {
    const generateFakeDonation = () => {
      const randomDonation = quickDonations[Math.floor(Math.random() * quickDonations.length)];
      const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      const randomMultiplier = Math.random() > 0.7 ? 2 : 1;
      
      const fakeDonation = {
        id: Date.now() + Math.random(),
        user: randomUser,
        ...randomDonation,
        emoji: currentEmojis[randomDonation.category],
        finalAmount: randomDonation.coins * randomMultiplier,
        timestamp: new Date(),
        streak: Math.floor(Math.random() * 5) + 1,
        multiplier: randomMultiplier
      };

      setFakeDonations(prev => [fakeDonation, ...prev.slice(0, 4)]);
      
      const coinId = Date.now() + Math.random();
      const newCoin = {
        id: coinId,
        x: Math.random() * 60 + 20,
        y: Math.random() * 40 + 30,
        emoji: fakeDonation.emoji,
        coins: fakeDonation.finalAmount,
        multiplier: 1
      };
      
      setFloatingCoins(prev => [...prev, newCoin]);
      
      setTimeout(() => {
        setFakeDonations(prev => prev.filter(d => d.id !== fakeDonation.id));
      }, 12000);
      
      setTimeout(() => {
        setFloatingCoins(prev => prev.filter(coin => coin.id !== coinId));
      }, 2000);
    };

    generateFakeDonation();
    
    const interval = setInterval(() => {
      generateFakeDonation();
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, [currentEmojis]);

  // Generate fake dedication donations
  useEffect(() => {
    const generateDedicationDonation = () => {
      const dedications = [
        { onBehalfOf: 'Father', note: 'May Allah grant him Jannah. He taught me the value of giving.' },
        { onBehalfOf: 'Prophet Muhammad (PBUH)', note: 'Following his example of compassion and charity.' },
        { onBehalfOf: 'Mother', note: 'For all her sacrifices and unconditional love.' },
        { onBehalfOf: 'Grandmother', note: 'She always fed the poor before herself.' },
        { onBehalfOf: 'All Muslims', note: 'May Allah unite us in good deeds.' },
        { onBehalfOf: 'Deceased loved one', note: 'May this sadaqah reach them as a blessing.' },
        { onBehalfOf: 'Friend', note: 'In gratitude for their friendship and support.' },
        { onBehalfOf: 'Brother', note: 'He inspires me to be better every day.' }
      ];

      const randomDedication = dedications[Math.floor(Math.random() * dedications.length)];
      const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      const randomDonation = quickDonations[Math.floor(Math.random() * quickDonations.length)];
      
      const dedicationDonation = {
        id: Date.now() + Math.random(),
        user: randomUser,
        amount: randomDonation.coins,
        emoji: currentEmojis[randomDonation.category],
        onBehalfOf: randomDedication.onBehalfOf,
        note: randomDedication.note,
        timestamp: new Date()
      };

      setDedicationFeed(prev => [dedicationDonation, ...prev.slice(0, 2)]);
      
      setTimeout(() => {
        setDedicationFeed(prev => prev.filter(d => d.id !== dedicationDonation.id));
      }, 15000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance of dedication donation
        generateDedicationDonation();
      }
    }, Math.random() * 8000 + 5000);

    return () => clearInterval(interval);
  }, [currentEmojis]);

  const calculateLevel = (points: number) => {
    return Math.floor(points / 500) + 1;
  };

  const checkForBadges = (newStreak: number, newLevel: number, newPoints: number) => {
    const newBadges = [...userBadges];
    
    if (newStreak >= 5 && !newBadges.includes('streak-master')) {
      newBadges.push('streak-master');
    }
    if (newStreak >= 10 && !newBadges.includes('weekly-warrior')) {
      newBadges.push('weekly-warrior');
    }
    if (newLevel >= 15 && !newBadges.includes('level-up')) {
      newBadges.push('level-up');
    }
    if (newPoints >= 10000 && !newBadges.includes('generous-heart')) {
      newBadges.push('generous-heart');
    }
    
    setUserBadges(newBadges);
  };

  const showRandomAffirmation = () => {
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(randomAffirmation);
    setShowAffirmation(true);
    
    setTimeout(() => {
      setShowAffirmation(false);
    }, 3000);
  };

  const createFloatingCoin = (donation: any) => {
    const coinId = Date.now() + Math.random();
    const newCoin = {
      id: coinId,
      x: Math.random() * 60 + 20,
      y: Math.random() * 40 + 30,
      emoji: currentEmojis[donation.category],
      coins: donation.coins,
      multiplier: multiplier
    };
    
    setFloatingCoins(prev => [...prev, newCoin]);
    
    setTimeout(() => {
      setFloatingCoins(prev => prev.filter(coin => coin.id !== coinId));
    }, 2000);
  };

  const triggerCelebration = () => {
    setCelebrationMode(true);
    setPulseEffect(true);
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const celebCoin = {
          id: Date.now() + i,
          x: Math.random() * 60 + 20,
          y: Math.random() * 60 + 20,
          emoji: ['🎉', '🔥', '⭐', '🏆', '💎', '🎯'][Math.floor(Math.random() * 6)],
          coins: '+' + (10 * multiplier),
          multiplier: 1
        };
        setFloatingCoins(prev => [...prev, celebCoin]);
      }, i * 80);
    }
    
    setTimeout(() => {
      setCelebrationMode(false);
      setPulseEffect(false);
    }, 2500);
  };

  const handleQuickDonate = (donation: any) => {
    if (userCoins >= donation.coins) {
      const finalAmount = donation.coins * multiplier;
      const pointsGained = finalAmount * 10;
      const newCoins = userCoins - donation.coins;
      const newPoints = userPoints + pointsGained;
      const newLevel = calculateLevel(newPoints);
      const newStreak = streakCount + 1;
      
      setUserCoins(newCoins);
      setUserPoints(newPoints);
      setUserLevel(newLevel);
      setStreakCount(newStreak);
      
      if (newLevel > userLevel) {
        triggerCelebration();
      }
      
      if (newStreak > 0 && newStreak % 3 === 0) {
        setMultiplier(prev => Math.min(prev + 0.5, 3));
        triggerCelebration();
      }
      
      checkForBadges(newStreak, newLevel, newPoints);
      createFloatingCoin(donation);
      showRandomAffirmation();
      
      const newDonation = {
        id: Date.now(),
        user: 'You',
        ...donation,
        emoji: currentEmojis[donation.category],
        finalAmount,
        timestamp: new Date(),
        streak: newStreak
      };
      
      setRecentDonations(prev => [newDonation, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        setRecentDonations(prev => prev.filter(d => d.id !== newDonation.id));
      }, 12000);
    }
  };

  const handleEpicDonation = (donation: DonationActivity) => {
    setEpicNotification(donation);
    
    // Create massive celebration effect
    triggerCelebration();
    
    // Add massive floating coins
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const epicCoin = {
          id: Date.now() + i + Math.random(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          emoji: donation.emoji,
          coins: `+${donation.amount}`,
          multiplier: 1
        };
        setFloatingCoins(prev => [...prev, epicCoin]);
      }, i * 100);
    }
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setEpicNotification(null);
    }, 5000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStreakCount(0);
      setMultiplier(1);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [streakCount]);

  const formatTimeAgo = (timestamp: Date | string) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes < 1) return '';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* User Stats Header - Above Video */}
      <div className="bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl border border-white/10 rounded-t-xl p-3 md:p-4">
        <div className="flex items-center justify-between gap-2">
          {/* Left side - Stats */}
          <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
            {/* User Stats Row */}
            <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-xl rounded-lg px-3 py-2 border border-white/10 min-w-0 overflow-hidden flex-1">
              {/* Points */}
              <div className="flex items-center text-purple-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer flex-shrink-0">
                <Star className="h-4 w-4 mr-1 text-purple-400" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{userPoints.toLocaleString()}</span>
              </div>
              
              <div className="w-px h-4 bg-white/30 flex-shrink-0"></div>
              
              {/* Coins */}
              <div className="flex items-center text-amber-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer flex-shrink-0">
                <SimpleGoldCoin size={14} className="mr-1" />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">{userCoins.toLocaleString()}</span>
              </div>
              
              <div className="w-px h-4 bg-white/30 flex-shrink-0"></div>
              
              {/* Level */}
              <div className="flex items-center text-blue-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1.5 rounded border border-blue-400/20 flex-shrink-0">
                <Crown className="h-4 w-4 mr-1 text-yellow-400" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Lv.{userLevel}</span>
              </div>
              
              {/* Streak */}
              {streakCount > 0 && (
                <>
                  <div className="w-px h-4 bg-white/30 flex-shrink-0"></div>
                  <div className="flex items-center text-orange-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer bg-gradient-to-r from-orange-500/10 to-red-500/10 px-3 py-1.5 rounded border border-orange-400/20 flex-shrink-0">
                    <Flame className="h-4 w-4 mr-1 text-orange-400 animate-pulse" />
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">{streakCount}x{multiplier}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right side - Top Up Button */}
          <Button className="bg-gradient-to-r from-amber-500/30 to-yellow-600/30 hover:from-amber-600/40 hover:to-yellow-700/40 text-white shadow-lg px-3 py-2 text-xs font-bold rounded-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group backdrop-blur-xl border border-white/20 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Gift className="h-3 w-3 mr-1 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Top Up</span>
            <span className="sm:hidden">+</span>
            <Sparkles className="h-3 w-3 ml-1 animate-pulse" />
          </Button>
        </div>

        {/* Compact Level Progress Bar */}
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-white/70 mb-1">
            <span>Level {userLevel}</span>
            <span>{userPoints % 500}/500 XP</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(userPoints % 500) / 500 * 100}%` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="relative w-full aspect-video bg-gray-900 overflow-hidden rounded-b-xl">
        {/* Mock Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
            alt="Gaza Relief Video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5"></div>
          
          {/* Video overlay elements */}
          <div className="absolute bottom-4 left-4 bg-black/10 backdrop-blur-md rounded px-2 py-1 border border-white/10">
            <div className="flex items-center text-white text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              00:15:42
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-md rounded px-2 py-1 text-white text-xs border border-white/10">
            HD 1080p
          </div>
        </div>

        {/* Epic Donation Notification - Ultra transparent */}
        {epicNotification && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-pink-900/5 backdrop-blur-sm z-60 flex items-center justify-center animate-fade-in">
            <div className="text-center text-white bg-black/5 backdrop-blur-xl rounded-2xl p-4 md:p-8 border border-white/10 mx-4 max-w-xs md:max-w-md">
              <div className="text-4xl md:text-6xl mb-2 md:mb-4 animate-bounce">{epicNotification.emoji}</div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                EPIC DONATION!
              </div>
              <div className="text-sm md:text-2xl font-bold mb-2 md:mb-4">
                {epicNotification.user} just air-dropped a massive {epicNotification.title}!
              </div>
              <div className="flex items-center justify-center text-lg md:text-xl font-semibold">
                <SimpleGoldCoin size={20} className="mr-2" />
                {epicNotification.amount} Sadaqah Coins
              </div>
              <div className="text-sm md:text-lg mt-2 opacity-90">
                Everyone in the community can see this amazing generosity! 🎉
              </div>
            </div>
          </div>
        )}

        {/* Positive Affirmation - Ultra transparent */}
        {showAffirmation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce mx-4">
            <div className="bg-gradient-to-r from-pink-500/25 to-purple-600/25 text-white px-4 md:px-6 py-2 md:py-3 rounded-2xl text-sm md:text-lg font-bold shadow-xl border-2 border-white/25 backdrop-blur-xl max-w-xs text-center">
              {currentAffirmation}
            </div>
          </div>
        )}

        {/* Celebration overlay - Ultra transparent */}
        {celebrationMode && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-amber-500/5 animate-pulse z-40 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎉</div>
            </div>
          </div>
        )}

        {/* Floating coins */}
        {floatingCoins.map((coin) => (
          <div
            key={coin.id}
            className="absolute pointer-events-none z-50 animate-bounce"
            style={{
              left: `${Math.min(Math.max(coin.x, 5), 85)}%`,
              top: `${Math.min(Math.max(coin.y, 10), 80)}%`,
              animation: 'floatUp 2s ease-out forwards'
            }}
          >
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400/30 to-amber-500/30 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg backdrop-blur-xl border border-white/20">
              <span className="text-sm md:text-lg">{coin.emoji}</span>
              <span>+{coin.coins * coin.multiplier}</span>
              <Sparkles className="h-3 w-3 animate-spin" />
            </div>
          </div>
        ))}

        {/* All donation buttons at bottom */}
        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 z-60 flex justify-center items-center px-2 py-2 max-w-[90%] overflow-hidden">
          <div className="flex space-x-1 justify-center max-w-full overflow-x-auto scrollbar-hide">
            {/* Regular donation buttons */}
            {quickDonations.map((donation, index) => (
              <button
                key={donation.key}
                onClick={() => handleQuickDonate(donation)}
                disabled={userCoins < donation.coins}
                className={`
                  group relative w-10 h-10 md:w-12 md:h-12 rounded-xl shadow-lg
                  bg-gradient-to-br ${donation.color}
                  hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-300 border-2 border-white/40 flex-shrink-0
                  ${userCoins >= donation.coins ? 'hover:shadow-2xl hover:border-white/60 hover:rotate-3' : ''}
                `}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
                <div className="relative h-full flex flex-col items-center justify-center text-white z-10">
                  <div className="text-sm md:text-lg mb-0.5 group-hover:scale-125 transition-transform animate-pulse">
                    {currentEmojis[donation.category]}
                  </div>
                  <div className="flex items-center text-[8px] md:text-[10px] font-bold">
                    <SimpleGoldCoin size={6} className="mr-0.5" />
                    {donation.coins}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 rounded-xl border-2 border-white/25 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
              </button>
            ))}

            {/* Epic donation button - same size as others */}
            <button
              onClick={() => {
                const epicDonation = {
                  id: Date.now(),
                  user: 'You',
                  amount: 1000,
                  emoji: '🎁',
                  timestamp: new Date(),
                  title: 'Epic Gift Package'
                };
                handleEpicDonation(epicDonation);
              }}
              className="group relative w-10 h-10 md:w-12 md:h-12 rounded-xl shadow-lg bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40 flex-shrink-0 hover:shadow-2xl hover:border-white/60"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white z-10">
                <div className="text-sm md:text-lg mb-0.5 group-hover:scale-125 transition-transform animate-pulse">
                  🎁
                </div>
                <div className="flex items-center text-[8px] md:text-[10px] font-bold">
                  <SimpleGoldCoin size={6} className="mr-0.5" />
                  1000
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-xl border-2 border-white/25 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Donation Messages Feed */}
      <div className="bg-gradient-to-r from-slate-800/95 via-blue-800/95 to-purple-800/95 backdrop-blur-xl border-t border-white/10 p-3 md:p-4 rounded-b-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm flex items-center">
            <Heart className="h-4 w-4 mr-2 text-red-400" />
            Recent Donations
          </h3>
          <div className="flex items-center text-xs text-white/70">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Live
          </div>
        </div>
        
        <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
          {displayedMessages.length === 0 ? (
            <div className="text-white/60 text-sm text-center py-2">
              No recent donations
            </div>
          ) : (
            displayedMessages.map((message) => (
              <div key={message.id} className="flex items-center justify-between bg-white/5 rounded-lg p-2 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <span className="text-lg flex-shrink-0">{message.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium text-sm truncate">
                        {message.user}
                      </span>
                      {message.onBehalfOf && (
                        <span className="text-white/70 text-xs">
                          for {message.onBehalfOf}
                        </span>
                      )}
                    </div>
                    {message.note && (
                      <div className="text-white/60 text-xs mt-1 truncate">
                        "{message.note}"
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="flex items-center text-yellow-400 font-bold text-sm">
                    <SimpleGoldCoin size={12} className="mr-1" />
                    {message.finalAmount || message.amount}
                  </div>
                  {message.streak && message.streak > 1 && (
                    <div className="flex items-center text-orange-400 text-xs">
                      <Flame className="h-3 w-3 mr-1" />
                      {message.streak}x
                    </div>
                  )}
                  <span className="text-white/50 text-xs">
                    {formatTimeAgo(message.timestamp)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translateY(-40px) scale(1.3) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.8) rotate(360deg);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LiveVideo;
