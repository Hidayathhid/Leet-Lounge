import { createContext, ReactNode, useContext, useState, useCallback, useEffect } from 'react';


type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

type TranslationDictionary = Record<string, string>;

// Define translations for English
const enTranslations: TranslationDictionary = {
  // Navigation
  'nav.home': 'Home',
  'nav.lounges': 'Lounges',
  'nav.games': 'Games',
  'nav.food': 'Food & Drinks',
  'nav.news': 'News & Updates',
  'nav.faq': 'FAQ',
  'nav.contact': 'Contact',
  'nav.admin': 'Admin',
  
  // Hero section
  'hero.imageAlt': 'Gaming Background',
  'hero.title': 'Welcome to LEET Gaming Lounge',
  'hero.subtitle': 'In gaming LEET or 133t or 1337 refers to someone who is really good and skilled at playing',
  'hero.ready': 'Ready to Level Up Your Gaming?',
  'hero.join': 'Join us at LEET Gaming Lounge for the ultimate gaming experience',
  
  // Lounges section
  'lounges.title': 'Our Gaming Lounges',
  'lounges.subtitle': 'Choose your perfect gaming environment',
  'lounges.playstation': 'PlayStation Lounge',
  'lounges.playstation.desc': 'Dedicated console gaming area with the latest PlayStation consoles and games',
  'lounges.smoking': 'Smoking Lounge',
  'lounges.smoking.desc': 'PC gaming area where smoking is permitted',
  'lounges.nonsmoking': 'Non-Smoking Lounge',
  'lounges.nonsmoking.desc': 'Clean air PC gaming environment for maximum comfort',
  'lounges.vip': 'VIP & Streaming Lounge',
  'lounges.vip.desc': 'Premium gaming experience with high-end equipment for content creators',
  
  // Games section
  'games.title': 'Our Game Library',
  'games.subtitle': 'All popular titles available',
  
  // Food & Drinks
  'food.title': 'Food & Drinks',
  'food.subtitle': 'Fuel your gaming session',
  'food.category.main': 'Main Dishes',
  'food.category.snacks': 'Snacks',
  'food.category.drinks': 'Drinks',
  
  // News section
  'news.title': 'News & Updates',
  'news.subtitle': 'Stay up to date with the latest from LEET',
  'news.readmore': 'Read More',
  'news.category.all': 'All',
  'news.category.news': 'News',
  'news.category.events': 'Events',
  'news.category.offers': 'Offers',
  'news.category.tournaments': 'Tournaments',
  
  // FAQ section
  'faq.title': 'Frequently Asked Questions',
  'faq.subtitle': 'Everything you need to know about LEET Gaming Lounge',
  
  // Contact section
  'contact.title': 'Contact Us',
  'contact.subtitle': 'Get in touch with our team',
  'contact.form.name': 'Name',
  'contact.form.email': 'Email',
  'contact.form.message': 'Message',
  'contact.form.submit': 'Send Message',
  'contact.phone': '+965 69982790',
  'contact.email': 'info@leetgaming.com',
  'contact.address': 'Kuwait City, Kuwait',
  
  // Footer
  'footer.rights': 'All Rights Reserved',
  'footer.social': 'Follow Us',
  
  // Admin
  'admin.login': 'Login',
  'admin.username': 'Username',
  'admin.password': 'Password',
  'admin.register': 'Register',
  
  // Language
  'language.switch': 'Switch Language',
};

// Define translations for Arabic
const arTranslations: TranslationDictionary = {
  // Navigation
  'nav.home': 'الرئيسية',
  'nav.lounges': 'صالات الألعاب',
  'nav.games': 'الألعاب',
  'nav.food': 'الطعام والمشروبات',
  'nav.news': 'الأخبار والتحديثات',
  'nav.faq': 'الأسئلة الشائعة',
  'nav.contact': 'اتصل بنا',
  'nav.admin': 'المسؤول',
  
  // Hero section
  'hero.imageAlt': 'خلفية الألعاب',
  'hero.title': 'مرحباً بكم في صالة ليت للألعاب',
  'hero.subtitle': 'في عالم الألعاب، ليت أو 133t أو 1337 تشير إلى شخص ماهر وبارع في اللعب',
  'hero.ready': 'هل أنت مستعد للارتقاء بمستوى ألعابك؟',
  'hero.join': 'انضم إلينا في صالة ليت للألعاب للحصول على أفضل تجربة ألعاب',
  
  // Lounges section
  'lounges.title': 'صالات الألعاب لدينا',
  'lounges.subtitle': 'اختر بيئة الألعاب المثالية',
  'lounges.playstation': 'صالة بلايستيشن',
  'lounges.playstation.desc': 'منطقة مخصصة لألعاب وحدات التحكم مع أحدث أجهزة بلايستيشن والألعاب',
  'lounges.smoking': 'صالة التدخين',
  'lounges.smoking.desc': 'منطقة ألعاب الكمبيوتر حيث يُسمح بالتدخين',
  'lounges.nonsmoking': 'صالة منع التدخين',
  'lounges.nonsmoking.desc': 'بيئة ألعاب كمبيوتر بهواء نظيف لأقصى قدر من الراحة',
  'lounges.vip': 'صالة كبار الشخصيات والبث',
  'lounges.vip.desc': 'تجربة ألعاب متميزة مع معدات متطورة لمنشئي المحتوى',
  
  // Games section
  'games.title': 'مكتبة الألعاب لدينا',
  'games.subtitle': 'جميع الألعاب الشهيرة متوفرة',
  
  // Food & Drinks
  'food.title': 'الطعام والمشروبات',
  'food.subtitle': 'غذِّ جلسة الألعاب الخاصة بك',
  'food.category.main': 'الأطباق الرئيسية',
  'food.category.snacks': 'الوجبات الخفيفة',
  'food.category.drinks': 'المشروبات',
  
  // News section
  'news.title': 'الأخبار والتحديثات',
  'news.subtitle': 'ابق على اطلاع بأحدث أخبار ليت',
  'news.readmore': 'اقرأ المزيد',
  'news.category.all': 'الكل',
  'news.category.news': 'أخبار',
  'news.category.events': 'فعاليات',
  'news.category.offers': 'عروض',
  'news.category.tournaments': 'بطولات',
  
  // FAQ section
  'faq.title': 'الأسئلة المتكررة',
  'faq.subtitle': 'كل ما تحتاج لمعرفته عن صالة ليت للألعاب',
  
  // Contact section
  'contact.title': 'اتصل بنا',
  'contact.subtitle': 'تواصل مع فريقنا',
  'contact.form.name': 'الاسم',
  'contact.form.email': 'البريد الإلكتروني',
  'contact.form.message': 'الرسالة',
  'contact.form.submit': 'إرسال الرسالة',
  'contact.phone': '+965 69982790',
  'contact.email': 'info@leetgaming.com',
  'contact.address': 'مدينة الكويت، الكويت',
  
  // Footer
  'footer.rights': 'جميع الحقوق محفوظة',
  'footer.social': 'تابعنا',
  
  // Admin
  'admin.login': 'تسجيل الدخول',
  'admin.username': 'اسم المستخدم',
  'admin.password': 'كلمة المرور',
  'admin.register': 'التسجيل',
  
  // Language
  'language.switch': 'تغيير اللغة',
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const NewsContext = createContext<{
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;
}>({ news: [], setNews: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const isRTL = language === 'ar';
  
  // Update HTML attributes when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.classList.remove('font-english', 'font-arabic');
    document.documentElement.classList.add(isRTL ? 'font-arabic' : 'font-english');
  }, [language, isRTL]);
  
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);
  
  const t = useCallback((key: string): string => {
    const translations = language === 'en' ? enTranslations : arTranslations;
    return (translations as Record<string, string>)[key] || key;
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}