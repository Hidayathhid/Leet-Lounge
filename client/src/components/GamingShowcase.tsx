import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gameCategories, featuredGames } from "@/lib/data";

export default function GamingShowcase() {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let scrollAmount = 0;
    let scrollSpeed = 1;
    let animationFrameId: number;
    let scrollDirection = 1;
    
    const autoScroll = () => {
      if (!carousel) return;
      
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      
      if (scrollAmount >= maxScroll) {
        scrollDirection = -1;
      } else if (scrollAmount <= 0) {
        scrollDirection = 1;
      }
      
      scrollAmount += scrollSpeed * scrollDirection;
      carousel.scrollLeft = scrollAmount;
      
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    
    animationFrameId = requestAnimationFrame(autoScroll);
    
    const handleMouseEnter = () => {
      scrollSpeed = 0;
    };
    
    const handleMouseLeave = () => {
      scrollSpeed = 1;
    };
    
    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section id="games" className="py-20 bg-gradient-to-b from-background to-background/95 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Game <span className="text-blue-500">Library</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our extensive collection of the latest and most popular games across all platforms.
          </motion.p>
        </div>
        
        {/* Featured Games Carousel */}
        <div className="mb-16 overflow-hidden">
          <div ref={carouselRef} className="flex space-x-6 game-carousel">
            {featuredGames.map((game, index) => (
              <div 
                key={index} 
                className="game-item w-80 flex-shrink-0 bg-glass rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-full h-48 object-cover transition-transform duration-500"
                  />
                  {game.badge && (
                    <div className={`absolute top-2 right-2 ${game.badgeColor} rounded-full px-3 py-1 text-xs text-white font-semibold`}>
                      {game.badge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-montserrat font-bold mb-1">{game.name}</h3>
                  <div className="flex items-center mb-2">
                    <i className={`${game.platformIcon} text-gray-400 mr-2`}></i>
                    <span className="text-sm text-gray-300">{game.platform}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Game Categories */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {gameCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-glass rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className={`${category.icon} text-2xl ${category.iconColor} mr-3 icon-hover transition-all duration-300`}></i>
                  <h3 className="text-xl font-montserrat font-bold">{category.name}</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  {category.games.map((game, gameIndex) => (
                    <li key={gameIndex}>{game}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <style jsx>{`
        .game-item:hover img {
          transform: scale(1.05);
        }
        
        .icon-hover:hover {
          transform: scale(1.1);
          color: #3b82f6;
        }
      `}</style>
    </section>
  );
}
