import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Assuming you are using react-i18next

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      <div className="container mx-auto px-4 z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('hero.title', { defaultValue: 'Welcome to <span className="text-blue-500">LEET</span> Gaming Lounge' })}
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('hero.subtitle', { defaultValue: '"In gaming LEET or l33t or 1337 refers to someone who is really good and skilled at playing"' })}
        </motion.p>

        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('hero.ready', { defaultValue: 'Ready to <span className="text-blue-500">Level Up</span> Your Gaming?'})}
        </motion.h2>

        <motion.p 
          className="text-gray-400 text-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {t('hero.join', { defaultValue: 'Join us at <span className="text-blue-400 font-semibold">LEET Gaming Lounge</span> for the ultimate gaming experience.'})}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a href="#booking" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            {t('hero.bookNow', { defaultValue: 'Book Your Station Now'})}
          </a>
        </motion.div>
      </div>
    </section>
  );
}