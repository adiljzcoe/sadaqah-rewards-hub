
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  en: {
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
    active_campaigns: 'Active Campaigns',
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
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, t }}>
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
