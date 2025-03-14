import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeetLogo from "./icons/LeetLogo";
import { Link } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LeetLogo size={40} />
          <h1 className="text-2xl font-montserrat font-bold">
            <span className="text-blue-500">LEET</span> Gaming
          </h1>
        </motion.div>
        
        {/* Desktop Menu */}
        <motion.div 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="#home" className="text-foreground hover:text-blue-500 transition-colors duration-300">Home</a>
          <a href="#lounges" className="text-foreground hover:text-blue-500 transition-colors duration-300">Lounges</a>
          <a href="#games" className="text-foreground hover:text-blue-500 transition-colors duration-300">Games</a>
          <a href="#food" className="text-foreground hover:text-blue-500 transition-colors duration-300">Food & Drinks</a>
          <a href="#facilities" className="text-foreground hover:text-blue-500 transition-colors duration-300">Facilities</a>
          <a href="#faq" className="text-foreground hover:text-blue-500 transition-colors duration-300">FAQ</a>
          <a href="#contact" className="text-foreground hover:text-blue-500 transition-colors duration-300">Contact</a>
          <Link href="/admin" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center">
            <i className="fas fa-user-shield mr-2"></i> Admin
          </Link>
        </motion.div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground text-2xl focus:outline-none"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-glass-dark ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-blue-500 transition-colors duration-300">Home</a>
          <a href="#lounges" onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-blue-500 transition-colors duration-300">Lounges</a>
          <a href="#games" onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-blue-500 transition-colors duration-300">Games</a>
          <a href="#food" onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-blue-500 transition-colors duration-300">Food & Drinks</a>
          <a href="#facilities" onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-blue-500 transition-colors duration-300">Facilities</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-blue-500 transition-colors duration-300">FAQ</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-blue-500 transition-colors duration-300">Contact</a>
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center w-fit">
            <i className="fas fa-user-shield mr-2"></i> Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
