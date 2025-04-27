import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);
  
  const toggleLanguage = () => {
    setIsChanging(true);
    setTimeout(() => {
      setLanguage(language === 'en' ? 'ar' : 'en');
      setIsChanging(false);
    }, 300);
  };
  
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            disabled={isChanging}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            {t('language')}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}