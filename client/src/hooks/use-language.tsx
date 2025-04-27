import { createContext, useState, useContext, ReactNode, useCallback, useEffect } from "react";

type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.lounges': 'Lounges',
    'nav.games': 'Games',
    'nav.food': 'Food',
    'nav.news': 'News',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero section
    'hero.title': 'Welcome to LEET Gaming Lounge',
    'hero.subtitle': 'In LEET you can become a hero!',
    'hero.explore': 'Explore Lounges',
    
    // Lounges
    'lounges.title': 'Our Gaming Lounges',
    'lounges.description': 'Explore our specialized gaming environments tailored to different preferences. Each lounge offers unique features and premium equipment for an exceptional gaming experience.',
    'lounges.playstation': 'PlayStation Lounge',
    'lounges.smoking': 'Smoking Lounge',
    'lounges.nonsmoking': 'Non-Smoking Lounge',
    'lounges.vip': 'VIP & Streaming Lounge',
    'lounges.features': 'Features',
    'lounges.specs': 'Specifications',
    
    // Games
    'games.title': 'Game Library',
    'games.description': 'Explore our extensive collection of the latest games across all platforms.',
    
    // Food
    'food.title': 'Gaming Fuel',
    'food.description': 'Keep your energy levels high with our selection of gamer-friendly food and drinks.',
    'food.menu': 'Food Menu',
    'food.drinks': 'Drinks Menu',
    'food.special': 'Special Deal: Gamer\'s Combo',
    'food.combo.desc': 'Get any food item, a drink, and 1 hour of gaming time for a special price!',
    
    // News
    'news.title': 'Latest News & Updates',
    'news.description': 'Stay up-to-date with the latest happenings at LEET Gaming Lounge, including tournaments, special offers, and new gaming experiences.',
    'news.all': 'All',
    'news.news': 'News',
    'news.events': 'Events',
    'news.tournaments': 'Tournaments',
    'news.offers': 'Offers',
    'news.readmore': 'Read More',
    'news.readless': 'Read Less',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.description': 'Find answers to common questions about our gaming lounge.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.description': 'Get in touch with us for bookings, inquiries, or to plan your next gaming session.',
    'contact.location': 'Our Location',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Hours',
    'contact.follow': 'Follow Us',
    'contact.address': 'SAHAB TOWER, Salem Al Mubarak St, Salmiya',
    'contact.viewmap': 'View on Maps',
    
    // Footer
    'footer.rights': 'All Rights Reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Language
    'language': 'العربية',
    
    // Admin
    'admin.title': 'Admin Portal',
    'admin.dashboard': 'Dashboard',
    'admin.stations': 'Stations',
    'admin.bookings': 'Bookings',
    'admin.news': 'News Management',
    'admin.logout': 'Logout',
    'admin.login': 'Login',
    'admin.register': 'Register',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.lounges': 'الصالات',
    'nav.games': 'الألعاب',
    'nav.food': 'الطعام',
    'nav.news': 'الأخبار',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'الإدارة',
    
    // Hero section
    'hero.title': 'مرحبًا بك في صالة LEET للألعاب',
    'hero.subtitle': 'في LEET يمكنك أن تصبح بطلاً!',
    'hero.explore': 'استكشف الصالات',
    
    // Lounges
    'lounges.title': 'صالات الألعاب لدينا',
    'lounges.description': 'استكشف بيئات الألعاب المتخصصة لدينا المصممة لتناسب الاحتياجات المختلفة. توفر كل صالة ميزات فريدة ومعدات متميزة لتجربة لعب استثنائية.',
    'lounges.playstation': 'صالة بلايستيشن',
    'lounges.smoking': 'صالة المدخنين',
    'lounges.nonsmoking': 'صالة غير المدخنين',
    'lounges.vip': 'صالة كبار الشخصيات والبث',
    'lounges.features': 'المميزات',
    'lounges.specs': 'المواصفات',
    
    // Games
    'games.title': 'مكتبة الألعاب',
    'games.description': 'استكشف مجموعتنا الواسعة من أحدث الألعاب على جميع المنصات.',
    
    // Food
    'food.title': 'وقود اللاعبين',
    'food.description': 'حافظ على مستويات طاقتك عالية مع مجموعة الطعام والمشروبات المناسبة للاعبين.',
    'food.menu': 'قائمة الطعام',
    'food.drinks': 'قائمة المشروبات',
    'food.special': 'عرض خاص: وجبة اللاعب',
    'food.combo.desc': 'احصل على أي وجبة طعام ومشروب وساعة من وقت اللعب بسعر خاص!',
    
    // News
    'news.title': 'أحدث الأخبار والتحديثات',
    'news.description': 'ابق على اطلاع بأحدث الأحداث في صالة LEET للألعاب، بما في ذلك البطولات والعروض الخاصة وتجارب الألعاب الجديدة.',
    'news.all': 'الكل',
    'news.news': 'الأخبار',
    'news.events': 'الفعاليات',
    'news.tournaments': 'البطولات',
    'news.offers': 'العروض',
    'news.readmore': 'قراءة المزيد',
    'news.readless': 'قراءة أقل',
    
    // FAQ
    'faq.title': 'الأسئلة الشائعة',
    'faq.description': 'ابحث عن إجابات للأسئلة الشائعة حول صالة الألعاب لدينا.',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.description': 'تواصل معنا للحجوزات والاستفسارات، أو لتخطيط جلسة ألعاب قادمة.',
    'contact.location': 'موقعنا',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.hours': 'ساعات العمل',
    'contact.follow': 'تابعنا',
    'contact.address': 'برج السحاب، شارع سالم المبارك، السالمية',
    'contact.viewmap': 'عرض على الخريطة',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    
    // Language
    'language': 'English',
    
    // Admin
    'admin.title': 'بوابة الإدارة',
    'admin.dashboard': 'لوحة التحكم',
    'admin.stations': 'المحطات',
    'admin.bookings': 'الحجوزات',
    'admin.news': 'إدارة الأخبار',
    'admin.logout': 'تسجيل الخروج',
    'admin.login': 'تسجيل الدخول',
    'admin.register': 'تسجيل جديد',
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  
  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add appropriate font classes
    if (language === 'ar') {
      document.documentElement.classList.add('font-arabic');
      document.documentElement.classList.remove('font-english');
    } else {
      document.documentElement.classList.add('font-english');
      document.documentElement.classList.remove('font-arabic');
    }
  }, [language]);
  
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  }, []);
  
  // Initialize language from localStorage if available
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferred-language') as Language;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'ar')) {
      setLanguageState(storedLanguage);
    }
  }, []);
  
  // Translation function
  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);
  
  const isRTL = language === 'ar';
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}