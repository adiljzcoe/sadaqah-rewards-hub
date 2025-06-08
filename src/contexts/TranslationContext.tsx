
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TranslationContextType {
  currentLanguage: string;
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    islamic_life: 'Islamic Life',
    tools: 'Tools',
    donate: 'Donate',
    community: 'Community',
    rewards: 'Rewards',
    developer: 'Developer',
    user_login: 'User Login',
    language: 'Language',
    checkout: 'Checkout',
    become_member: 'Become a Member',
    
    // Islamic Life
    islamic_calendar: 'Islamic Calendar',
    ramadan_calendar: 'Ramadan Calendar',
    adhan_community: 'Adhan Community',
    live_tv: 'Live TV',
    dhikr_community: 'Dhikr Community',
    
    // Tools
    prayer_times: 'Prayer Times',
    quran_reader: 'Quran Reader',
    zakat_calculator: 'Zakat Calculator',
    dua_wall: 'Dua Wall',
    
    // Donate
    active_campaigns: 'Active Campaigns',
    build_mosque: 'Build Mosque',
    water_wells: 'Water Wells',
    orphanages: 'Orphanages',
    qurbani: 'Qurbani',
    
    // Community
    masjid_community: 'Masjid Community',
    my_ummah: 'My Ummah',
    leaderboards: 'Leaderboards',
    
    // Rewards
    sadaqah_coins: 'Sadaqah Coins',
    my_jannah: 'My Jannah',
    membership_tiers: 'Membership Tiers',
    gift_cards: 'Gift Cards',
    
    // Auth
    sign_out: 'Sign Out',
    test_user_login: 'Test User Login',
    test_admin_login: 'Test Admin Login',
    real_login: 'Real Login',
    
    // Hero section
    why_choose_title: 'Why Choose Donate Feels Great?',
    why_choose_subtitle: 'Our platform combines the spiritual reward of giving with engaging features that make charity meaningful and rewarding',
    
    // Features
    gamified_giving: 'Gamified Giving',
    gamified_giving_desc: 'Earn points, badges, and compete with your community while doing good!',
    league_tables: 'League Tables',
    league_tables_desc: 'See how your city, mosque, and community rank in giving!',
    live_impact: 'Live Impact',
    live_impact_desc: 'Watch your donations make a real difference in real-time!',
    
    // Stats
    community_impact: 'Community Impact',
    active_donors: 'Active Donors',
    raised_today: 'Raised Today',
    cities_competing: 'Cities Competing',
    satisfaction_rate: 'Satisfaction Rate',
    
    // Tabs
    long_term_fundraisers: 'Long-term Fundraisers',
    
    // Live feed
    live_impact_feed: 'Live Impact Feed',
    real_time_activity: 'Real-time activity across the platform',
    live_now: 'Live Now',
    all: 'All',
    donations: 'Donations',
    honoring: 'Honoring',
    jannah: 'Jannah',
    awards: 'Awards',
    updates: 'Updates',
    messages: 'Messages'
  }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en];
    console.log(`Translation for '${key}' in '${currentLanguage}':`, translation);
    return translation || key;
  };

  return (
    <TranslationContext.Provider value={{ 
      currentLanguage, 
      language: currentLanguage,
      setLanguage, 
      t 
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};
