
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  script: 'latin' | 'arabic' | 'cyrillic';
}

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, fallback?: string) => string;
  temporaryLanguage: Language | null;
  setTemporaryLanguage: (language: Language | null) => void;
  availableLanguages: Language[];
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr', script: 'latin' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl', script: 'arabic' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', direction: 'rtl', script: 'arabic' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', direction: 'ltr', script: 'latin' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', direction: 'ltr', script: 'latin' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', direction: 'ltr', script: 'latin' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', direction: 'rtl', script: 'arabic' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', direction: 'ltr', script: 'latin' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr', script: 'latin' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', direction: 'ltr', script: 'latin' },
];

// Basic translations - in a real app, this would come from a translation service
const translations: Record<string, Record<string, string>> = {
  en: {
    'dua_wall': 'Du\'a Wall',
    'make_donation': 'Make a Donation',
    'community_prayers': 'Community Du\'as',
    'say_ameen': 'Say Ameen',
    'from_community': 'From the community',
    'translated_from': 'Translated from',
    'view_original': 'View original',
  },
  ar: {
    'dua_wall': 'جدار الدعاء',
    'make_donation': 'تبرع',
    'community_prayers': 'دعاء المجتمع',
    'say_ameen': 'قل آمين',
    'from_community': 'من المجتمع',
    'translated_from': 'مترجم من',
    'view_original': 'عرض الأصل',
  },
  ur: {
    'dua_wall': 'دعا کی دیوار',
    'make_donation': 'عطیہ کریں',
    'community_prayers': 'کمیونٹی کی دعائیں',
    'say_ameen': 'آمین کہیں',
    'from_community': 'کمیونٹی سے',
    'translated_from': 'سے ترجمہ',
    'view_original': 'اصل دیکھیں',
  },
  id: {
    'dua_wall': 'Dinding Do\'a',
    'make_donation': 'Berdonasi',
    'community_prayers': 'Do\'a Komunitas',
    'say_ameen': 'Ucapkan Amin',
    'from_community': 'Dari komunitas',
    'translated_from': 'Diterjemahkan dari',
    'view_original': 'Lihat asli',
  },
  ms: {
    'dua_wall': 'Dinding Doa',
    'make_donation': 'Buat Derma',
    'community_prayers': 'Doa Komuniti',
    'say_ameen': 'Kata Amin',
    'from_community': 'Dari komuniti',
    'translated_from': 'Diterjemah dari',
    'view_original': 'Lihat asal',
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [temporaryLanguage, setTemporaryLanguage] = useState<Language | null>(null);

  // Auto-detect language based on browser locale
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const detectedLang = languages.find(lang => lang.code === browserLang);
    if (detectedLang) {
      setCurrentLanguage(detectedLang);
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language.code);
    
    // Update document direction and font
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  };

  const translate = (key: string, fallback?: string): string => {
    const activeLanguage = temporaryLanguage || currentLanguage;
    return translations[activeLanguage.code]?.[key] || fallback || key;
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      setLanguage,
      translate,
      temporaryLanguage,
      setTemporaryLanguage,
      availableLanguages: languages,
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
