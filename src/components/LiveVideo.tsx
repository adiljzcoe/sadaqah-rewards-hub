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

      setFakeDonations(prev => [fakeDonation, ...prev.slice(0, 3)]);
      
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
      }, 6000);
      
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
      }, 8000);
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
      <div className="relative w-full aspect-video bg-gray-900 rounded-t-xl overflow-hidden">
        {/* Mock Video Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
            alt="Gaza Relief Video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5"></div>
          
          {/* Fake video overlay elements to make it look like a video */}
          <div className="absolute bottom-4 left-4 bg-black/10 backdrop-blur-md rounded px-2 py-1 border border-white/10">
            <div className="flex items-center text-white text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              00:15:42
            </div>
          </div>
          
          {/* Video quality indicator */}
          <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-md rounded px-2 py-1 text-white text-xs border border-white/10">
            HD 1080p
          </div>
        </div>

        {/* Epic Donation Notification - Ultra transparent */}
        {epicNotification && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-pink-900/5 backdrop-blur-sm z-60 flex items-center justify-center animate-fade-in">
            <div className="text-center text-white bg-black/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-6xl mb-4 animate-bounce">{epicNotification.emoji}</div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                EPIC DONATION!
              </div>
              <div className="text-2xl font-bold mb-4">
                {epicNotification.user} just air-dropped a massive {epicNotification.title}!
              </div>
              <div className="flex items-center justify-center text-xl font-semibold">
                <SimpleGoldCoin size={24} className="mr-2" />
                {epicNotification.amount} Sadaqah Coins
              </div>
              <div className="text-lg mt-2 opacity-90">
                Everyone in the community can see this amazing generosity! 🎉
              </div>
            </div>
          </div>
        )}

        {/* Top overlay with stats - Ultra transparent */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10">
          <div className="flex justify-between items-start">
            <Badge className="bg-red-500/25 hover:bg-red-600/30 text-white shadow-lg px-3 py-2 animate-pulse backdrop-blur-xl border border-white/10">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
              LIVE
            </Badge>

            <div className="flex items-center space-x-3 bg-black/5 backdrop-blur-xl rounded-xl p-3 shadow-xl border border-white/10">
              <div className="flex items-center text-white text-sm font-medium hover:scale-110 transition-transform cursor-pointer">
                <Users className={`h-4 w-4 mr-2 ${pulseEffect ? 'animate-pulse text-green-400' : ''}`} />
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-bold">1,247</span>
              </div>
              
              <div className="w-px h-4 bg-white/30"></div>
              <div className="flex items-center text-purple-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer">
                <Star className="h-4 w-4 mr-1 text-purple-400" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{userPoints}</span>
              </div>
              
              <div className="w-px h-4 bg-white/30"></div>
              <div className="flex items-center text-amber-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer">
                <SimpleGoldCoin size={18} className="mr-2" />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">{userCoins}</span>
              </div>
              
              <div className="w-px h-4 bg-white/30"></div>
              <div className="flex items-center text-blue-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer bg-gradient-to-r from-blue-500/5 to-purple-500/5 px-2 py-1 rounded-lg border border-blue-400/20">
                <Crown className="h-3 w-3 mr-1 text-yellow-400" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Lv.{userLevel}
                </span>
              </div>
              
              {streakCount > 0 && (
                <>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div className="flex items-center text-purple-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer bg-gradient-to-r from-orange-500/5 to-red-500/5 px-2 py-1 rounded-lg border border-orange-400/20">
                    <Flame className="h-3 w-3 mr-1 text-orange-400 animate-pulse" />
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      {streakCount}x{multiplier}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* User Badges Display */}
        <div className="absolute top-16 left-4 z-20 flex space-x-2">
          {userBadges.slice(0, 3).map((badgeKey) => {
            const badge = badges[badgeKey];
            return (
              <div
                key={badgeKey}
                className={`w-8 h-8 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center text-sm shadow-lg border-2 border-white/25 hover:scale-110 transition-transform cursor-pointer backdrop-blur-sm`}
                title={badge.name}
              >
                {badge.icon}
              </div>
            );
          })}
          {userBadges.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400/25 to-gray-600/25 flex items-center justify-center text-xs text-white font-bold shadow-lg border-2 border-white/25 backdrop-blur-sm">
              +{userBadges.length - 3}
            </div>
          )}
        </div>

        <div className="absolute top-20 right-4 z-30">
          <Button className="bg-gradient-to-r from-amber-500/25 to-yellow-600/25 hover:from-amber-600/30 hover:to-yellow-700/30 text-white shadow-lg px-4 py-2 text-sm font-bold rounded-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group backdrop-blur-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Gift className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            Top Up Sadaqah Coins
            <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
          </Button>
        </div>

        {/* Positive Affirmation - Ultra transparent */}
        {showAffirmation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-pink-500/25 to-purple-600/25 text-white px-6 py-3 rounded-2xl text-lg font-bold shadow-xl border-2 border-white/25 backdrop-blur-xl">
              {currentAffirmation}
            </div>
          </div>
        )}

        {/* Recent donations feed - Ultra transparent */}
        <div className="absolute left-4 top-32 space-y-2 z-20 max-w-sm">
          {[...recentDonations, ...fakeDonations].slice(0, 4).map((donation) => (
            <div
              key={donation.id}
              className="bg-gradient-to-r from-emerald-500/25 to-green-600/25 text-white px-3 py-2 rounded-2xl text-sm font-medium flex items-center space-x-2 animate-slide-in-left shadow-xl border-2 border-emerald-300/25 hover:scale-105 transition-transform max-w-full backdrop-blur-xl"
            >
              <span className="text-lg animate-bounce flex-shrink-0">{donation.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">
                  {donation.user === 'You' ? 'You helped' : `${donation.user} helped`} with {donation.label}!
                </div>
                <div className="text-xs opacity-90 flex items-center space-x-1">
                  <span className="truncate">{donation.finalAmount} sadaqah coins • Streak {donation.streak}</span>
                  {donation.multiplier > 1 && <Star className="h-3 w-3 text-yellow-300 animate-pulse flex-shrink-0" />}
                </div>
              </div>
              <div className="flex flex-col items-center bg-white/10 rounded-lg p-1 flex-shrink-0">
                <Star className="h-3 w-3 text-yellow-300 animate-pulse" />
                <span className="text-[10px]">+{Math.floor(donation.finalAmount * 10)} pts</span>
              </div>
            </div>
          ))}
        </div>

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
              left: `${Math.min(Math.max(coin.x, 10), 80)}%`,
              top: `${Math.min(Math.max(coin.y, 10), 80)}%`,
              animation: 'floatUp 2s ease-out forwards'
            }}
          >
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400/30 to-amber-500/30 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-xl border border-white/20">
              <span className="text-lg">{coin.emoji}</span>
              <span>+{coin.coins * coin.multiplier}</span>
              <Sparkles className="h-3 w-3 animate-spin" />
            </div>
          </div>
        ))}

        {/* Donation buttons at bottom - Ultra transparent glass effect */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-60">
          <div className="flex justify-center items-center space-x-4 bg-gray-800/10 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-gray-600/25">
            {/* Regular donation buttons */}
            <div className="flex space-x-2">
              {quickDonations.map((donation, index) => (
                <button
                  key={donation.key}
                  onClick={() => handleQuickDonate(donation)}
                  disabled={userCoins < donation.coins}
                  className={`
                    group relative w-16 h-16 rounded-2xl shadow-lg
                    bg-gradient-to-br ${donation.color}
                    hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-300 border-2 border-white/25 backdrop-blur-sm
                    ${userCoins >= donation.coins ? 'hover:shadow-2xl hover:border-white/50 hover:rotate-3' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    opacity: '0.25'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
                  <div className="relative h-full flex flex-col items-center justify-center text-white z-10">
                    <div className="text-xl mb-1 group-hover:scale-125 transition-transform animate-pulse">
                      {currentEmojis[donation.category]}
                    </div>
                    <div className="flex items-center text-xs font-bold">
                      <SimpleGoldCoin size={12} className="mr-1" />
                      {donation.coins}
                    </div>
                    <div className="text-[8px] opacity-80">sadaqah coins</div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/25 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                </button>
              ))}
            </div>

            {/* Epic donation button */}
            <div className="flex items-center">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/25 to-transparent mx-2"></div>
              <EpicDonationButton onEpicDonation={handleEpicDonation} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom controls section - Ultra transparent glass effect */}
      <div className="bg-gradient-to-r from-gray-800/25 via-gray-700/25 to-gray-800/25 py-6 px-8 rounded-b-xl border-t border-gray-600/25 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2 hover:scale-110 transition-transform">
              <Volume2 className="h-5 w-5" />
            </Button>
            <div className="text-sm text-emerald-400 flex items-center space-x-4 font-medium">
              <div className="flex items-center bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-400/20 hover:scale-105 transition-transform cursor-pointer backdrop-blur-sm">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">5,850</span>
                <span className="text-xs ml-1 opacity-80 text-emerald-300">sadaqah coins</span>
              </div>
              <span className="text-gray-300">donated in last hour</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="bg-gray-700/10 border-gray-500/25 text-white hover:bg-gray-600/25 hover:scale-105 transition-all px-4 py-2 hover:border-blue-400 backdrop-blur-sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share & Earn 50 Sadaqah Coins
            </Button>
            
            <Button variant="outline" size="sm" className="bg-gray-700/10 border-gray-500/25 text-white hover:bg-gray-600/25 hover:scale-105 transition-all relative px-4 py-2 hover:border-pink-400 backdrop-blur-sm">
              <Heart className="h-4 w-4 mr-2" />
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
        
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100%) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LiveVideo;
