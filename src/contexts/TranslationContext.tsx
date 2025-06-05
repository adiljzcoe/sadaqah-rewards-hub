
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr' | 'ur' | 'tr';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    'membership': 'Membership',
    'sadaqah_coins': 'Sadaqah Coins',
    'my_jannah': 'My Jannah',
    'leaderboards': 'Leaderboards',
    'upgrade_to_premium': 'Upgrade to Premium',
    'sign_in_to_participate': 'Sign In to Participate',
    'become_member': 'Become a Member',
    
    // Home page
    'why_choose_donate': 'Why Choose Donate Feels Great?',
    'platform_description': 'Our platform combines the spiritual reward of giving with engaging features that make charity meaningful and rewarding',
    'gamified_giving': 'Gamified Giving',
    'gamified_description': 'Earn points, badges, and compete with your community while doing good!',
    'league_tables': 'League Tables',
    'league_description': 'See how your city, mosque, and community rank in giving!',
    'live_impact': 'Live Impact',
    'live_impact_description': 'Watch your donations make a real difference in real-time!',
    'community_impact': 'Community Impact',
    'active_donors': 'Active Donors',
    'raised_today': 'Raised Today',
    'cities_competing': 'Cities Competing',
    'satisfaction_rate': 'Satisfaction Rate',
    
    // Live TV
    'live_islamic_content': 'Live Islamic Content',
    'continuous_islamic_content': 'Continuous Islamic content with automatic Athan interruptions',
    
    // Navigation
    'home': 'Home',
    'islamic_life': 'Islamic Life',
    'tools': 'Tools',
    'rewards': 'Rewards',
    'community': 'Community',
    'islamic_calendar': 'Islamic Calendar',
    'ramadan_calendar': 'Ramadan Calendar',
    'adhan_community': 'Adhan Community',
    'live_tv': 'Live TV',
    'dhikr_community': 'Dhikr Community',
    'prayer_times': 'Prayer Times',
    'quran_reader': 'Quran Reader',
    'zakat_calculator': 'Zakat Calculator',
    'dua_wall': 'Dua Wall',
    'active_campaigns': 'Active Campaigns',
    'build_mosque': 'Build a Mosque',
    'water_wells': 'Water Wells',
    'orphanages': 'Orphanages',
    'qurbani': 'Qurbani',
    'masjid_community': 'Masjid Community',
    'my_ummah': 'My Ummah',
    'membership_tiers': 'Membership Tiers',
    'gift_cards': 'Gift Cards',
    
    // Common
    'language': 'Language',
    'donate': 'Donate',
    'profile': 'Profile',
    'settings': 'Settings',
    'logout': 'Logout',
    'login': 'Login',
    'sign_out': 'Sign Out'
  },
  ar: {
    // Header
    'membership': 'العضوية',
    'sadaqah_coins': 'عملات الصدقة',
    'my_jannah': 'جنتي',
    'leaderboards': 'لوحات المتصدرين',
    'upgrade_to_premium': 'ترقية إلى بريميوم',
    'sign_in_to_participate': 'سجل دخولك للمشاركة',
    'become_member': 'كن عضواً',
    
    // Home page
    'why_choose_donate': 'لماذا تختار التبرع يشعر بالسعادة؟',
    'platform_description': 'تجمع منصتنا بين الثواب الروحي للعطاء والميزات الجذابة التي تجعل العمل الخيري ذا معنى ومجزٍ',
    'gamified_giving': 'العطاء التلعيبي',
    'gamified_description': 'اكسب النقاط والشارات وتنافس مع مجتمعك أثناء فعل الخير!',
    'league_tables': 'جداول الدوري',
    'league_description': 'شاهد كيف تصنف مدينتك ومسجدك ومجتمعك في العطاء!',
    'live_impact': 'التأثير المباشر',
    'live_impact_description': 'شاهد تبرعاتك تحدث فرقاً حقيقياً في الوقت الفعلي!',
    'community_impact': 'تأثير المجتمع',
    'active_donors': 'المتبرعون النشطون',
    'raised_today': 'تم جمعه اليوم',
    'cities_competing': 'المدن المتنافسة',
    'satisfaction_rate': 'معدل الرضا',
    
    // Live TV
    'live_islamic_content': 'محتوى إسلامي مباشر',
    'continuous_islamic_content': 'محتوى إسلامي مستمر مع انقطاعات تلقائية للأذان',
    
    // Navigation
    'home': 'الرئيسية',
    'islamic_life': 'الحياة الإسلامية',
    'tools': 'الأدوات',
    'rewards': 'المكافآت',
    'community': 'المجتمع',
    'islamic_calendar': 'التقويم الإسلامي',
    'ramadan_calendar': 'تقويم رمضان',
    'adhan_community': 'مجتمع الأذان',
    'live_tv': 'البث المباشر',
    'dhikr_community': 'مجتمع الذكر',
    'prayer_times': 'أوقات الصلاة',
    'quran_reader': 'قارئ القرآن',
    'zakat_calculator': 'حاسبة الزكاة',
    'dua_wall': 'جدار الدعاء',
    'active_campaigns': 'الحملات النشطة',
    'build_mosque': 'بناء مسجد',
    'water_wells': 'آبار المياه',
    'orphanages': 'دور الأيتام',
    'qurbani': 'القرباني',
    'masjid_community': 'مجتمع المسجد',
    'my_ummah': 'أمتي',
    'membership_tiers': 'مستويات العضوية',
    'gift_cards': 'بطاقات الهدايا',
    
    // Common
    'language': 'اللغة',
    'donate': 'تبرع',
    'profile': 'الملف الشخصي',
    'settings': 'الإعدادات',
    'logout': 'تسجيل الخروج',
    'login': 'تسجيل الدخول',
    'sign_out': 'تسجيل الخروج'
  },
  fr: {
    // Header
    'membership': 'Adhésion',
    'sadaqah_coins': 'Pièces Sadaqah',
    'my_jannah': 'Mon Jannah',
    'leaderboards': 'Classements',
    'upgrade_to_premium': 'Passer à Premium',
    'sign_in_to_participate': 'Connectez-vous pour participer',
    'become_member': 'Devenir Membre',
    
    // Home page
    'why_choose_donate': 'Pourquoi choisir Donner fait du bien ?',
    'platform_description': 'Notre plateforme combine la récompense spirituelle du don avec des fonctionnalités engageantes qui rendent la charité significative et gratifiante',
    'gamified_giving': 'Don Gamifié',
    'gamified_description': 'Gagnez des points, des badges et rivalisez avec votre communauté tout en faisant le bien !',
    'league_tables': 'Tableaux de Classement',
    'league_description': 'Voyez comment votre ville, votre mosquée et votre communauté se classent dans les dons !',
    'live_impact': 'Impact en Direct',
    'live_impact_description': 'Regardez vos dons faire une vraie différence en temps réel !',
    'community_impact': 'Impact Communautaire',
    'active_donors': 'Donateurs Actifs',
    'raised_today': 'Collecté Aujourd\'hui',
    'cities_competing': 'Villes en Compétition',
    'satisfaction_rate': 'Taux de Satisfaction',
    
    // Live TV
    'live_islamic_content': 'Contenu Islamique en Direct',
    'continuous_islamic_content': 'Contenu islamique continu avec interruptions automatiques d\'Adhan',
    
    // Navigation
    'home': 'Accueil',
    'islamic_life': 'Vie Islamique',
    'tools': 'Outils',
    'rewards': 'Récompenses',
    'community': 'Communauté',
    'islamic_calendar': 'Calendrier Islamique',
    'ramadan_calendar': 'Calendrier du Ramadan',
    'adhan_community': 'Communauté Adhan',
    'live_tv': 'TV en Direct',
    'dhikr_community': 'Communauté Dhikr',
    'prayer_times': 'Heures de Prière',
    'quran_reader': 'Lecteur du Coran',
    'zakat_calculator': 'Calculateur de Zakat',
    'dua_wall': 'Mur des Duas',
    'active_campaigns': 'Campagnes Actives',
    'build_mosque': 'Construire une Mosquée',
    'water_wells': 'Puits d\'Eau',
    'orphanages': 'Orphelinats',
    'qurbani': 'Qurbani',
    'masjid_community': 'Communauté de la Mosquée',
    'my_ummah': 'Ma Oummah',
    'membership_tiers': 'Niveaux d\'Adhésion',
    'gift_cards': 'Cartes Cadeaux',
    
    // Common
    'language': 'Langue',
    'donate': 'Faire un don',
    'profile': 'Profil',
    'settings': 'Paramètres',
    'logout': 'Déconnexion',
    'login': 'Connexion',
    'sign_out': 'Déconnexion'
  },
  ur: {
    // Header
    'membership': 'رکنیت',
    'sadaqah_coins': 'صدقہ کوائنز',
    'my_jannah': 'میری جنت',
    'leaderboards': 'لیڈر بورڈز',
    'upgrade_to_premium': 'پریمیم میں اپگریڈ کریں',
    'sign_in_to_participate': 'حصہ لینے کے لیے سائن ان کریں',
    'become_member': 'ممبر بنیں',
    
    // Home page
    'why_choose_donate': 'ڈونیٹ فیلز گریٹ کیوں منتخب کریں؟',
    'platform_description': 'ہمارا پلیٹ فارم دینے کے روحانی اجر کو دلچسپ خصوصیات کے ساتھ ملاتا ہے جو خیرات کو بامعنی اور فائدہ مند بناتا ہے',
    'gamified_giving': 'گیمیفائیڈ گیونگ',
    'gamified_description': 'نیکی کرتے وقت پوائنٹس، بیجز کمائیں اور اپنی کمیونٹی کے ساتھ مقابلہ کریں!',
    'league_tables': 'لیگ ٹیبلز',
    'league_description': 'دیکھیں کہ آپ کا شہر، مسجد، اور کمیونٹی دینے میں کیسے درجہ بندی کرتے ہیں!',
    'live_impact': 'لائیو امپیکٹ',
    'live_impact_description': 'اپنے عطیات کو حقیقی وقت میں حقیقی فرق کرتے دیکھیں!',
    'community_impact': 'کمیونٹی امپیکٹ',
    'active_donors': 'فعال ڈونرز',
    'raised_today': 'آج اکٹھا کیا گیا',
    'cities_competing': 'مقابلہ کرنے والے شہر',
    'satisfaction_rate': 'اطمینان کی شرح',
    
    // Live TV
    'live_islamic_content': 'لائیو اسلامی مواد',
    'continuous_islamic_content': 'خودکار اذان کی مداخلت کے ساتھ مسلسل اسلامی مواد',
    
    // Navigation
    'home': 'گھر',
    'islamic_life': 'اسلامی زندگی',
    'tools': 'اوزار',
    'rewards': 'انعامات',
    'community': 'کمیونٹی',
    'islamic_calendar': 'اسلامی کیلنڈر',
    'ramadan_calendar': 'رمضان کیلنڈر',
    'adhan_community': 'اذان کمیونٹی',
    'live_tv': 'لائیو ٹی وی',
    'dhikr_community': 'ذکر کمیونٹی',
    'prayer_times': 'نماز کے اوقات',
    'quran_reader': 'قرآن ریڈر',
    'zakat_calculator': 'زکوٰۃ کیلکولیٹر',
    'dua_wall': 'دعا وال',
    'active_campaigns': 'فعال مہمات',
    'build_mosque': 'مسجد بنائیں',
    'water_wells': 'پانی کے کنویں',
    'orphanages': 'یتیم خانے',
    'qurbani': 'قربانی',
    'masjid_community': 'مسجد کمیونٹی',
    'my_ummah': 'میری امت',
    'membership_tiers': 'رکنیت کے درجے',
    'gift_cards': 'تحفہ کارڈز',
    
    // Common
    'language': 'زبان',
    'donate': 'عطیہ',
    'profile': 'پروفائل',
    'settings': 'سیٹنگز',
    'logout': 'لاگ آؤٹ',
    'login': 'لاگ ان',
    'sign_out': 'سائن آؤٹ'
  },
  tr: {
    // Header
    'membership': 'Üyelik',
    'sadaqah_coins': 'Sadaka Coinleri',
    'my_jannah': 'Cennetim',
    'leaderboards': 'Lider Tabloları',
    'upgrade_to_premium': 'Premium\'a Yükseltin',
    'sign_in_to_participate': 'Katılmak için Giriş Yapın',
    'become_member': 'Üye Ol',
    
    // Home page
    'why_choose_donate': 'Neden Bağış Yapmak Harika Hissettiriyor?',
    'platform_description': 'Platformumuz vermenin manevi ödülünü, hayırseverliği anlamlı ve ödüllendirici kılan ilgi çekici özelliklerle birleştirir',
    'gamified_giving': 'Oyunlaştırılmış Bağış',
    'gamified_description': 'İyilik yaparken puan, rozet kazanın ve topluluğunuzla yarışın!',
    'league_tables': 'Lig Tabloları',
    'league_description': 'Şehriniz, caminiz ve topluluğunuzun bağışta nasıl sıralandığını görün!',
    'live_impact': 'Canlı Etki',
    'live_impact_description': 'Bağışlarınızın gerçek zamanlı olarak gerçek bir fark yarattığını izleyin!',
    'community_impact': 'Topluluk Etkisi',
    'active_donors': 'Aktif Bağışçılar',
    'raised_today': 'Bugün Toplanan',
    'cities_competing': 'Yarışan Şehirler',
    'satisfaction_rate': 'Memnuniyet Oranı',
    
    // Live TV
    'live_islamic_content': 'Canlı İslami İçerik',
    'continuous_islamic_content': 'Otomatik Ezan kesintileri ile sürekli İslami içerik',
    
    // Navigation
    'home': 'Ana Sayfa',
    'islamic_life': 'İslami Yaşam',
    'tools': 'Araçlar',
    'rewards': 'Ödüller',
    'community': 'Topluluk',
    'islamic_calendar': 'İslami Takvim',
    'ramadan_calendar': 'Ramazan Takvimi',
    'adhan_community': 'Ezan Topluluğu',
    'live_tv': 'Canlı TV',
    'dhikr_community': 'Zikir Topluluğu',
    'prayer_times': 'Namaz Vakitleri',
    'quran_reader': 'Kuran Okuyucu',
    'zakat_calculator': 'Zekat Hesaplayıcı',
    'dua_wall': 'Dua Duvarı',
    'active_campaigns': 'Aktif Kampanyalar',
    'build_mosque': 'Cami İnşa Et',
    'water_wells': 'Su Kuyuları',
    'orphanages': 'Yetimhaneler',
    'qurbani': 'Kurban',
    'masjid_community': 'Cami Topluluğu',
    'my_ummah': 'Ümmetim',
    'membership_tiers': 'Üyelik Seviyeleri',
    'gift_cards': 'Hediye Kartları',
    
    // Common
    'language': 'Dil',
    'donate': 'Bağış Yap',
    'profile': 'Profil',
    'settings': 'Ayarlar',
    'logout': 'Çıkış Yap',
    'login': 'Giriş Yap',
    'sign_out': 'Çıkış Yap'
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  const isRTL = language === 'ar' || language === 'ur';

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </TranslationContext.Provider>
  );
};
