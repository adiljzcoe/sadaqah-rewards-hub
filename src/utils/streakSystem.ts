
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastDonationDate: string;
  streakFreeze: boolean;
  streakFreezeCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'streak' | 'donation' | 'social' | 'special' | 'seasonal';
  requirement: number;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

export const achievements: Achievement[] = [
  // Streak Achievements
  { id: 'first_donation', title: 'First Steps', description: 'Made your first donation', icon: '🎯', type: 'donation', requirement: 1, earned: false, rarity: 'common', points: 10 },
  { id: 'streak_3', title: 'Getting Started', description: '3 day donation streak', icon: '🔥', type: 'streak', requirement: 3, earned: false, rarity: 'common', points: 50 },
  { id: 'streak_7', title: 'Week Warrior', description: '7 day donation streak', icon: '⚡', type: 'streak', requirement: 7, earned: false, rarity: 'rare', points: 100 },
  { id: 'streak_30', title: 'Monthly Master', description: '30 day donation streak', icon: '🏆', type: 'streak', requirement: 30, earned: false, rarity: 'epic', points: 500 },
  { id: 'streak_100', title: 'Centurion', description: '100 day donation streak', icon: '👑', type: 'streak', requirement: 100, earned: false, rarity: 'legendary', points: 2000 },
  
  // Daily Achievements
  { id: 'morning_donor', title: 'Early Bird', description: 'Donated before 9 AM', icon: '🌅', type: 'special', requirement: 1, earned: false, rarity: 'common', points: 25 },
  { id: 'night_owl', title: 'Night Owl', description: 'Donated after 10 PM', icon: '🌙', type: 'special', requirement: 1, earned: false, rarity: 'common', points: 25 },
  { id: 'weekend_warrior', title: 'Weekend Warrior', description: 'Donated on weekend', icon: '🎉', type: 'special', requirement: 1, earned: false, rarity: 'common', points: 30 },
  
  // Amount Achievements
  { id: 'big_heart', title: 'Big Heart', description: 'Donated £100+ in single donation', icon: '💝', type: 'donation', requirement: 100, earned: false, rarity: 'rare', points: 200 },
  { id: 'generous_soul', title: 'Generous Soul', description: 'Donated £500+ total', icon: '💎', type: 'donation', requirement: 500, earned: false, rarity: 'epic', points: 300 },
  
  // Social Achievements
  { id: 'influencer', title: 'Influencer', description: 'Inspired 5 friends to donate', icon: '⭐', type: 'social', requirement: 5, earned: false, rarity: 'rare', points: 150 },
  { id: 'community_leader', title: 'Community Leader', description: 'Top 10 in your city', icon: '👑', type: 'social', requirement: 10, earned: false, rarity: 'epic', points: 400 },
];

export const getStreakData = (): StreakData => {
  const saved = localStorage.getItem('donationStreak');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastDonationDate: '',
    streakFreeze: false,
    streakFreezeCount: 3
  };
};

export const calculateStreakBonus = (streakCount: number): number => {
  // Base streak bonus points
  let bonus = 0;
  
  if (streakCount >= 100) {
    bonus = 500; // Legendary streak bonus
  } else if (streakCount >= 30) {
    bonus = 200; // Epic streak bonus
  } else if (streakCount >= 7) {
    bonus = 50; // Rare streak bonus
  } else if (streakCount >= 3) {
    bonus = 25; // Common streak bonus
  } else if (streakCount >= 1) {
    bonus = 10; // Basic streak bonus
  }
  
  // Additional multiplier for very long streaks
  if (streakCount > 30) {
    bonus += Math.floor(streakCount / 10) * 10;
  }
  
  return bonus;
};

export const updateStreak = (): { streakData: StreakData; jannahPointsEarned: number } => {
  const today = new Date().toDateString();
  const streakData = getStreakData();
  const lastDate = new Date(streakData.lastDonationDate).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  let jannahPointsEarned = 0;
  
  if (lastDate === today) {
    // Already donated today, no change
    return { streakData, jannahPointsEarned };
  } else if (lastDate === yesterday) {
    // Continuing streak
    streakData.currentStreak += 1;
    streakData.longestStreak = Math.max(streakData.longestStreak, streakData.currentStreak);
    
    // Award Jannah points for maintaining streak
    jannahPointsEarned = calculateStreakBonus(streakData.currentStreak);
  } else if (streakData.streakFreeze && streakData.streakFreezeCount > 0) {
    // Use streak freeze
    streakData.streakFreezeCount -= 1;
    streakData.streakFreeze = false;
    
    // Award reduced points for using freeze
    jannahPointsEarned = Math.floor(calculateStreakBonus(streakData.currentStreak) * 0.5);
  } else {
    // Streak broken, start over
    streakData.currentStreak = 1;
    
    // Award basic points for new start
    jannahPointsEarned = calculateStreakBonus(1);
  }
  
  streakData.lastDonationDate = today;
  localStorage.setItem('donationStreak', JSON.stringify(streakData));
  
  // Update user's total Jannah points
  const currentPoints = parseInt(localStorage.getItem('jannahPoints') || '5632');
  const newPoints = currentPoints + jannahPointsEarned;
  localStorage.setItem('jannahPoints', newPoints.toString());
  
  return { streakData, jannahPointsEarned };
};

export const checkAchievements = (userStats: any): Achievement[] => {
  const earned: Achievement[] = [];
  const savedAchievements = JSON.parse(localStorage.getItem('userAchievements') || '[]');
  const streakData = getStreakData();
  
  achievements.forEach(achievement => {
    const alreadyEarned = savedAchievements.find((a: Achievement) => a.id === achievement.id);
    if (alreadyEarned) return;
    
    let shouldEarn = false;
    const now = new Date();
    
    switch (achievement.id) {
      case 'first_donation':
        shouldEarn = userStats.totalDonations >= 1;
        break;
      case 'streak_3':
      case 'streak_7':
      case 'streak_30':
      case 'streak_100':
        shouldEarn = streakData.currentStreak >= achievement.requirement;
        break;
      case 'morning_donor':
        shouldEarn = now.getHours() < 9;
        break;
      case 'night_owl':
        shouldEarn = now.getHours() >= 22;
        break;
      case 'weekend_warrior':
        shouldEarn = now.getDay() === 0 || now.getDay() === 6;
        break;
      case 'big_heart':
        shouldEarn = userStats.lastDonationAmount >= 100;
        break;
      case 'generous_soul':
        shouldEarn = userStats.totalAmount >= 500;
        break;
    }
    
    if (shouldEarn) {
      const earnedAchievement = { ...achievement, earned: true, earnedDate: new Date().toISOString() };
      earned.push(earnedAchievement);
      savedAchievements.push(earnedAchievement);
    }
  });
  
  localStorage.setItem('userAchievements', JSON.stringify(savedAchievements));
  return earned;
};
