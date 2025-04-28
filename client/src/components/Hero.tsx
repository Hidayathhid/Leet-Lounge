import { motion } from "framer-motion";
import LeetLogo from "./icons/LeetLogo";

export default function Hero() {
  return (
    <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/leet main.jpeg"
          style={{ objectFit: 'cover', objectPosition: 'center' }} 
          alt="Gaming Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div 
          className="flex items-center justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LeetLogo size={64} className="mr-4" />
          <h1 className="text-4xl md:text-6xl font-montserrat font-extrabold text-foreground">
            Welcome to <span className="text-blue-500">LEET</span> Gaming Lounge
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          "In gaming LEET or 133t or 1337 refers to someone who is really good and skilled at playing"
        </motion.p>
        
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold mb-6">
            Ready to <span className="text-blue-500">Level Up</span> Your Gaming?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join us at <span className="text-blue-400 font-semibold">LEET Gaming Lounge</span> for the ultimate gaming experience.
          </p>
          <a href="#booking" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block">
            Book Your Station Now
          </a>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <a href="#lounges" className="text-white opacity-80 hover:opacity-100 transition-opacity animate-bounce inline-block">
            <i className="fas fa-chevron-down text-2xl"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
