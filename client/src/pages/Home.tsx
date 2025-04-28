import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Lounges from "@/components/Lounges";
import GameLibrary from "@/components/GameLibrary";
import FoodMenu from "@/components/FoodMenu";
import Facilities from "@/components/Facilities";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  // Set document title
  useEffect(() => {
    document.title = "LEET Gaming Lounge";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Translucent Logo */}
      <div 
        className="bg-translucent" 
        style={{ 
          backgroundImage: `url('/images/leet main.jpeg')` 
        }}
      />
      
      <Navbar />
      <Hero />
      <Lounges />
      <GameLibrary />
      <FoodMenu />
      <Facilities />
      <Faq />
      <Contact />
      <CallToAction />
      <Footer />
      
      {/* Floating Booking Button (Mobile Only) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-accent transition-colors">
          <i className="fas fa-calendar-alt"></i>
        </button>
      </div>
    </div>
  );
}
