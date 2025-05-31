import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Users, Heart, Share2, Volume2, Sparkles, Zap, Star, Gift, Trophy, Flame, Target, Crown, Award } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';
import EpicDonationButton from './EpicDonationButton';

const LiveVideo = () => {
  const [recentDonations, setRecentDonations] = useState([]);
  const [userCoins, setUserCoins] = useState(1250);
  const [userPoints, setUserPoints] = useState(5632);
  const [userLevel, setUserLevel] = useState(12);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [fakeDonations, setFakeDonations] = useState([]);
  const [userBadges, setUserBadges] = useState(['first-donor', 'streak-master']);
  const [dailyStreak, setDailyStreak] = useState(5);
  const [weeklyStreak, setWeeklyStreak] = useState(2);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [epicNotification, setEpicNotification] = useState(null);
  const [dedicationFeed, setDedicationFeed] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);

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
      .slice(0, 3);
    
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

  const calculateLevel = (points) => {
    return Math.floor(points / 500) + 1;
  };

  const checkForBadges = (newStreak, newLevel, newPoints) => {
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

  const createFloatingCoin = (donation) => {
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

  const handleQuickDonate = (donation) => {
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

  const handleEpicDonation = (donation) => {
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

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* User Stats Header - Above Video */}
      <div className="bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl border border-white/10 rounded-t-xl p-3 md:p-4">
        <div className="flex items-center justify-between gap-2">
          {/* Left side - Stats */}
          <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
            {/* Live Badge */}
            <Badge className="bg-red-500/30 hover:bg-red-600/40 text-white shadow-lg px-2 py-1 animate-pulse backdrop-blur-xl border border-white/20 flex-shrink-0 text-xs">
              <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-ping"></div>
              LIVE
            </Badge>

            {/* User Stats Row */}
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-xl rounded-lg px-2 py-1.5 border border-white/10 min-w-0 overflow-hidden">
              {/* Points */}
              <div className="flex items-center text-purple-300 text-xs font-bold hover:scale-110 transition-transform cursor-pointer flex-shrink-0">
                <Star className="h-3 w-3 mr-1 text-purple-400" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{userPoints.toLocaleString()}</span>
              </div>
              
              <div className="w-px h-3 bg-white/30 flex-shrink-0"></div>
              
              {/* Coins */}
              <div className="flex items-center text-amber-300 text-xs font-bold hover:scale-110 transition-transform cursor-pointer flex-shrink-0">
                <SimpleGoldCoin size={12} className="mr-1" />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">{userCoins.toLocaleString()}</span>
              </div>
              
              <div className="w-px h-3 bg-white/30 flex-shrink-0"></div>
              
              {/* Level */}
              <div className="flex items-center text-blue-300 text-xs font-bold hover:scale-110 transition-transform cursor-pointer bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-2 py-1 rounded border border-blue-400/20 flex-shrink-0">
                <Crown className="h-3 w-3 mr-1 text-yellow-400" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Lv.{userLevel}</span>
              </div>
              
              {/* Streak */}
              {streakCount > 0 && (
                <>
                  <div className="w-px h-3 bg-white/30 flex-shrink-0"></div>
                  <div className="flex items-center text-orange-300 text-xs font-bold hover:scale-110 transition-transform cursor-pointer bg-gradient-to-r from-orange-500/10 to-red-500/10 px-2 py-1 rounded border border-orange-400/20 flex-shrink-0">
                    <Flame className="h-3 w-3 mr-1 text-orange-400 animate-pulse" />
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

        {/* Level Progress Bar */}
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-white/70 mb-1">
            <span>Level {userLevel}</span>
            <span>{userPoints % 500}/500 XP</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(userPoints % 500) / 500 * 100}%` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* User Badges */}
        <div className="flex items-center space-x-1 mt-2">
          {userBadges.slice(0, 4).map((badgeKey) => {
            const badge = badges[badgeKey];
            return (
              <div
                key={badgeKey}
                className={`w-6 h-6 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center text-xs shadow-lg border-2 border-white/30 hover:scale-110 transition-transform cursor-pointer backdrop-blur-sm flex-shrink-0`}
                title={badge.name}
              >
                {badge.icon}
              </div>
            );
          })}
          {userBadges.length > 4 && (
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-400/30 to-gray-600/30 flex items-center justify-center text-xs text-white font-bold shadow-lg border-2 border-white/30 backdrop-blur-sm flex-shrink-0">
              +{userBadges.length - 4}
            </div>
          )}
        </div>
      </div>

      {/* Video Section */}
      <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
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

        {/* Viewers count - top left */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center bg-black/20 backdrop-blur-xl rounded-lg px-3 py-2 shadow-xl border border-white/10">
            <Users className={`h-4 w-4 mr-2 text-green-400 ${pulseEffect ? 'animate-pulse' : ''}`} />
            <span className="text-white font-bold">1,247</span>
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

        {/* Donation buttons at bottom - Heavily constrained */}
        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 z-60 flex justify-center items-center px-2 py-2 max-w-[90%] overflow-hidden">
          {/* Regular donation buttons - Much smaller and more constrained */}
          <div className="flex space-x-1 justify-center max-w-full overflow-x-auto scrollbar-hide">
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
          </div>

          {/* Epic donation button - More constrained */}
          <div className="flex items-center flex-shrink-0 ml-2">
            <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
            <div className="ml-2 max-w-[80px] md:max-w-[100px]">
              <EpicDonationButton onEpicDonation={handleEpicDonation} />
            </div>
          </div>
        </div>
      </div>

      {/* Donation Messages Display - New smooth section below video */}
      <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-x border-white/10 py-3 min-h-[60px] flex items-center">
        <div className="w-full px-4">
          <div className="space-y-2">
            {displayedMessages.map((donation, index) => (
              <div
                key={donation.id || index}
                className="flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-green-600/10 text-white px-3 py-2 rounded-lg text-sm font-medium border border-emerald-400/20 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <span className="text-lg animate-pulse flex-shrink-0">{donation.emoji}</span>
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="font-bold flex-shrink-0">
                      {donation.user === 'You' ? 'You' : donation.user}
                    </span>
                    <span className="text-emerald-300 flex-shrink-0">helped with</span>
                    <div className="flex items-center bg-white/15 rounded px-2 py-1 flex-shrink-0">
                      <SimpleGoldCoin size={12} className="mr-1" />
                      <span className="font-bold">{donation.finalAmount || donation.amount}</span>
                    </div>
                    {donation.onBehalfOf && (
                      <>
                        <span className="text-purple-300 flex-shrink-0">for</span>
                        <span className="font-semibold text-purple-200 truncate">{donation.onBehalfOf}</span>
                      </>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {Math.floor((Date.now() - new Date(donation.timestamp).getTime()) / 1000)}s ago
                </span>
              </div>
            ))}
            {displayedMessages.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-4">
                Be the first to help! 💝
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom controls section - Better constrained */}
      <div className="bg-gradient-to-r from-gray-800/25 via-gray-700/25 to-gray-800/25 py-2 md:py-4 px-2 md:px-4 rounded-b-xl border-t border-gray-600/25 backdrop-blur-xl overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 md:space-x-4 min-w-0">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2 hover:scale-110 transition-transform flex-shrink-0">
              <Volume2 className="h-4 w-4" />
            </Button>
            <div className="text-sm text-emerald-400 flex items-center space-x-2 font-medium min-w-0">
              <div className="flex items-center bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-400/20 hover:scale-105 transition-transform cursor-pointer backdrop-blur-sm flex-shrink-0">
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">5,850</span>
                <span className="text-xs ml-1 opacity-80 text-emerald-300 hidden sm:inline">coins</span>
              </div>
              <span className="text-gray-300 text-xs hidden md:inline">donated in last hour</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="bg-gray-700/10 border-gray-500/25 text-white hover:bg-gray-600/25 hover:scale-105 transition-all px-2 py-1 hover:border-blue-400 backdrop-blur-sm text-xs">
              <Share2 className="h-3 w-3 mr-1" />
              <span className="hidden lg:inline">Share & Earn 50</span>
              <span className="lg:hidden">Share</span>
            </Button>
            
            <Button variant="outline" size="sm" className="bg-gray-700/10 border-gray-500/25 text-white hover:bg-gray-600/25 hover:scale-105 transition-all relative px-2 py-1 hover:border-pink-400 backdrop-blur-sm text-xs">
              <Heart className="h-3 w-3 mr-1" />
              Follow
              <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[8px] px-1 animate-pulse">
                +25
              </Badge>
            </Button>
          </div>
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
