
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
    // Common
    'home': 'Donate Feels Great',
    'donate': 'Donate',
    'community': 'Community',
    'profile': 'Profile',
    'settings': 'Settings',
    'logout': 'Logout',
    'login': 'Login',
    'language': 'Language',
    'amount': 'Amount',
    'total': 'Total',
    'checkout': 'Checkout',
    'cart': 'Cart',
    'level': 'Level',
    'item_added': 'Added!',
    
    // Navigation sections
    'islamic_life': 'Islamic Life',
    'tools': 'Tools',
    'rewards': 'Rewards',
    'developer': 'Developer',
    'user_login': 'User Login',
    
    // Pages
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
    'leaderboards': 'Leaderboards',
    'sadaqah_coins': 'Sadaqah Coins',
    'my_jannah': 'My Jannah',
    'membership_tiers': 'Membership Tiers',
    'gift_cards': 'Gift Cards',
    'long_term_fundraisers': 'Long-term Fundraisers',
    
    // Homepage content
    'tagline': 'Make a difference today',
    'why_choose_platform': 'Why Choose Donate Feels Great?',
    'platform_description': 'Our platform combines the spiritual reward of giving with engaging features that make charity meaningful and rewarding',
    'gamified_giving': 'Gamified Giving',
    'gamified_giving_desc': 'Earn points, badges, and compete with your community while doing good!',
    'league_tables': 'League Tables',
    'league_tables_desc': 'See how your city, mosque, and community rank in giving!',
    'live_impact': 'Live Impact',
    'live_impact_desc': 'Watch your donations make a real difference in real-time!',
    'community_impact': 'Community Impact',
    'active_donors': 'Active Donors',
    'raised_today': 'Raised Today',
    'cities_competing': 'Cities Competing',
    'satisfaction_rate': 'Satisfaction Rate',
    
    // Messages
    'sign_in_to_participate': 'Sign In to Participate',
    'upgrade_to_premium': 'Upgrade to Premium',
    'become_member': 'Become a Member',
    'test_user_login': 'Test User Login',
    'test_admin_login': 'Test Admin Login',
    'real_login': 'Real Login',
    'sign_out': 'Sign Out'
  },
  ar: {
    // Common
    'home': 'التبرع يشعرك بالرضا',
    'donate': 'تبرع',
    'community': 'المجتمع',
    'profile': 'الملف الشخصي',
    'settings': 'الإعدادات',
    'logout': 'تسجيل الخروج',
    'login': 'تسجيل الدخول',
    'language': 'اللغة',
    'amount': 'المبلغ',
    'total': 'المجموع',
    'checkout': 'الدفع',
    'cart': 'السلة',
    'level': 'المستوى',
    'item_added': 'تمت الإضافة!',
    
    // Navigation sections
    'islamic_life': 'الحياة الإسلامية',
    'tools': 'الأدوات',
    'rewards': 'المكافآت',
    'developer': 'المطور',
    'user_login': 'تسجيل دخول المستخدم',
    
    // Pages
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
    'leaderboards': 'لوحات المتصدرين',
    'sadaqah_coins': 'عملات الصدقة',
    'my_jannah': 'جنتي',
    'membership_tiers': 'مستويات العضوية',
    'gift_cards': 'بطاقات الهدايا',
    'long_term_fundraisers': 'جمع التبرعات طويلة المدى',
    
    // Homepage content
    'tagline': 'اصنع فرقاً اليوم',
    'why_choose_platform': 'لماذا تختار منصة التبرع تشعرك بالرضا؟',
    'platform_description': 'تجمع منصتنا بين الأجر الروحي للعطاء والميزات الجذابة التي تجعل العمل الخيري ذا معنى ومجزياً',
    'gamified_giving': 'العطاء التفاعلي',
    'gamified_giving_desc': 'اكسب النقاط والشارات وتنافس مع مجتمعك أثناء فعل الخير!',
    'league_tables': 'جداول الدوري',
    'league_tables_desc': 'انظر كيف تحتل مدينتك ومسجدك ومجتمعك مرتبة في العطاء!',
    'live_impact': 'التأثير المباشر',
    'live_impact_desc': 'شاهد تبرعاتك تحدث فرقاً حقيقياً في الوقت الفعلي!',
    'community_impact': 'تأثير المجتمع',
    'active_donors': 'المتبرعون النشطون',
    'raised_today': 'تم جمعه اليوم',
    'cities_competing': 'المدن المتنافسة',
    'satisfaction_rate': 'معدل الرضا',
    
    // Messages
    'sign_in_to_participate': 'سجل دخولك للمشاركة',
    'upgrade_to_premium': 'ترقية إلى بريميوم',
    'become_member': 'كن عضواً',
    'test_user_login': 'تسجيل دخول مستخدم تجريبي',
    'test_admin_login': 'تسجيل دخول مدير تجريبي',
    'real_login': 'تسجيل دخول حقيقي',
    'sign_out': 'تسجيل الخروج'
  },
  fr: {
    // Common
    'home': 'Donner Fait du Bien',
    'donate': 'Faire un don',
    'community': 'Communauté',
    'profile': 'Profil',
    'settings': 'Paramètres',
    'logout': 'Déconnexion',
    'login': 'Connexion',
    'language': 'Langue',
    'amount': 'Montant',
    'total': 'Total',
    'checkout': 'Commande',
    'cart': 'Panier',
    'level': 'Niveau',
    'item_added': 'Ajouté!',
    
    // Navigation sections
    'islamic_life': 'Vie Islamique',
    'tools': 'Outils',
    'rewards': 'Récompenses',
    'developer': 'Développeur',
    'user_login': 'Connexion Utilisateur',
    
    // Pages
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
    'leaderboards': 'Classements',
    'sadaqah_coins': 'Pièces Sadaqah',
    'my_jannah': 'Mon Jannah',
    'membership_tiers': 'Niveaux d\'Adhésion',
    'gift_cards': 'Cartes Cadeaux',
    'long_term_fundraisers': 'Collectes de Fonds à Long Terme',
    
    // Homepage content
    'tagline': 'Faites une différence aujourd\'hui',
    'why_choose_platform': 'Pourquoi Choisir Donner Fait du Bien?',
    'platform_description': 'Notre plateforme combine la récompense spirituelle du don avec des fonctionnalités engageantes qui rendent la charité significative et gratifiante',
    'gamified_giving': 'Don Gamifié',
    'gamified_giving_desc': 'Gagnez des points, des badges et entrez en compétition avec votre communauté tout en faisant le bien!',
    'league_tables': 'Tableaux de Classement',
    'league_tables_desc': 'Voyez comment votre ville, mosquée et communauté se classent dans les dons!',
    'live_impact': 'Impact en Direct',
    'live_impact_desc': 'Regardez vos dons faire une vraie différence en temps réel!',
    'community_impact': 'Impact Communautaire',
    'active_donors': 'Donateurs Actifs',
    'raised_today': 'Collecté Aujourd\'hui',
    'cities_competing': 'Villes en Compétition',
    'satisfaction_rate': 'Taux de Satisfaction',
    
    // Messages
    'sign_in_to_participate': 'Connectez-vous pour participer',
    'upgrade_to_premium': 'Passer à Premium',
    'become_member': 'Devenir Membre',
    'test_user_login': 'Connexion Utilisateur Test',
    'test_admin_login': 'Connexion Admin Test',
    'real_login': 'Vraie Connexion',
    'sign_out': 'Déconnexion'
  },
  ur: {
    // Common
    'home': 'عطیہ اچھا لگتا ہے',
    'donate': 'عطیہ',
    'community': 'کمیونٹی',
    'profile': 'پروفائل',
    'settings': 'سیٹنگز',
    'logout': 'لاگ آؤٹ',
    'login': 'لاگ ان',
    'language': 'زبان',
    'amount': 'رقم',
    'total': 'کل',
    'checkout': 'چیک آؤٹ',
    'cart': 'ٹوکری',
    'level': 'سطح',
    'item_added': 'شامل کر دیا گیا!',
    
    // Navigation sections
    'islamic_life': 'اسلامی زندگی',
    'tools': 'اوزار',
    'rewards': 'انعامات',
    'developer': 'ڈیولپر',
    'user_login': 'صارف لاگ ان',
    
    // Pages
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
    'leaderboards': 'لیڈر بورڈز',
    'sadaqah_coins': 'صدقہ کوائنز',
    'my_jannah': 'میری جنت',
    'membership_tiers': 'رکنیت کے درجے',
    'gift_cards': 'تحفہ کارڈز',
    'long_term_fundraisers': 'طویل مدتی فنڈ ریزنگ',
    
    // Homepage content
    'tagline': 'آج فرق کریں',
    'why_choose_platform': 'عطیہ اچھا لگتا ہے کیوں چنیں؟',
    'platform_description': 'ہمارا پلیٹ فارم عطیہ کرنے کے روحانی اجر کو دلچسپ خصوصیات کے ساتھ جوڑتا ہے جو خیرات کو معنی خیز اور مفید بناتا ہے',
    'gamified_giving': 'گیمیفائیڈ عطیہ',
    'gamified_giving_desc': 'پوائنٹس، بیجز کمائیں اور اپنی کمیونٹی کے ساتھ مقابلہ کریں جبکہ نیکی کریں!',
    'league_tables': 'لیگ ٹیبلز',
    'league_tables_desc': 'دیکھیں کہ آپ کا شہر، مسجد اور کمیونٹی عطیات میں کیسے رینک کرتے ہیں!',
    'live_impact': 'لائیو اثرات',
    'live_impact_desc': 'حقیقی وقت میں اپنے عطیات کا حقیقی فرق دیکھیں!',
    'community_impact': 'کمیونٹی کا اثر',
    'active_donors': 'فعال عطیہ کنندگان',
    'raised_today': 'آج اکٹھا کیا گیا',
    'cities_competing': 'مقابلہ کرنے والے شہر',
    'satisfaction_rate': 'اطمینان کی شرح',
    
    // Messages
    'sign_in_to_participate': 'حصہ لینے کے لیے سائن ان کریں',
    'upgrade_to_premium': 'پریمیم میں اپگریڈ کریں',
    'become_member': 'ممبر بنیں',
    'test_user_login': 'ٹیسٹ یوزر لاگ ان',
    'test_admin_login': 'ٹیسٹ ایڈمن لاگ ان',
    'real_login': 'حقیقی لاگ ان',
    'sign_out': 'سائن آؤٹ'
  },
  tr: {
    // Common
    'home': 'Bağış İyi Hissettirir',
    'donate': 'Bağış Yap',
    'community': 'Topluluk',
    'profile': 'Profil',
    'settings': 'Ayarlar',
    'logout': 'Çıkış Yap',
    'login': 'Giriş Yap',
    'language': 'Dil',
    'amount': 'Miktar',
    'total': 'Toplam',
    'checkout': 'Ödeme',
    'cart': 'Sepet',
    'level': 'Seviye',
    'item_added': 'Eklendi!',
    
    // Navigation sections
    'islamic_life': 'İslami Yaşam',
    'tools': 'Araçlar',
    'rewards': 'Ödüller',
    'developer': 'Geliştirici',
    'user_login': 'Kullanıcı Girişi',
    
    // Pages
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
    'leaderboards': 'Lider Tabloları',
    'sadaqah_coins': 'Sadaka Coinleri',
    'my_jannah': 'Cennetim',
    'membership_tiers': 'Üyelik Seviyeleri',
    'gift_cards': 'Hediye Kartları',
    'long_term_fundraisers': 'Uzun Vadeli Bağış Toplama',
    
    // Homepage content
    'tagline': 'Bugün bir fark yaratın',
    'why_choose_platform': 'Neden Bağış İyi Hissettirir\'i Seçmelisiniz?',
    'platform_description': 'Platformumuz, vermenin manevi ödülünü hayır işlerini anlamlı ve ödüllendirici kılan ilgi çekici özelliklerle birleştirir',
    'gamified_giving': 'Oyunlaştırılmış Bağış',
    'gamified_giving_desc': 'İyilik yaparken puan kazanın, rozet toplayın ve topluluğunuzla yarışın!',
    'league_tables': 'Lig Tabloları',
    'league_tables_desc': 'Şehriniz, caminiz ve topluluğunuzun bağışta nasıl sıralandığını görün!',
    'live_impact': 'Canlı Etki',
    'live_impact_desc': 'Bağışlarınızın gerçek zamanlı olarak gerçek bir fark yarattığını izleyin!',
    'community_impact': 'Topluluk Etkisi',
    'active_donors': 'Aktif Bağışçılar',
    'raised_today': 'Bugün Toplanan',
    'cities_competing': 'Yarışan Şehirler',
    'satisfaction_rate': 'Memnuniyet Oranı',
    
    // Messages
    'sign_in_to_participate': 'Katılmak için Giriş Yapın',
    'upgrade_to_premium': 'Premium\'a Yükseltin',
    'become_member': 'Üye Ol',
    'test_user_login': 'Test Kullanıcı Girişi',
    'test_admin_login': 'Test Admin Girişi',
    'real_login': 'Gerçek Giriş',
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
