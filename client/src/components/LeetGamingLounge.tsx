import { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Lounges from "./Lounges";
import GamingShowcase from "./GamingShowcase";
import FoodDrinks from "./FoodDrinks";
import News from "./News";
import Faq from "./Faq";
import Contact from "./Contact";
import Footer from "./Footer";
import BackToTop from "./ui/back-to-top";
import { motion } from "framer-motion";

export default function LeetGamingLounge() {
  useEffect(() => {
    document.title = "LEET Gaming Lounge";
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.75) {
          section.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div 
      className="font-roboto text-foreground bg-background min-h-screen overflow-x-hidden bg-translucent-logo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero />
      <Lounges />
      <GamingShowcase />
      <FoodDrinks />
      <News />
      <Faq />
      <Contact />
      <Footer />
      <BackToTop />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-translucent-logo {
          position: relative;
        }

        .bg-translucent-logo::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(59, 130, 246, 0.05);
          background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.05;
          z-index: -1;
          pointer-events: none;
        }

        section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .bg-glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .bg-glass-dark {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
        }

        html {
          scroll-behavior: smooth;
        }
      ` }} />
    </motion.div>
  );
}
