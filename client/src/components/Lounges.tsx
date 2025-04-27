import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShimmerEffect, AnimatedText } from "./AnimatedEffects";
import PCSpecs from "./PCSpecs";

// Animated screen component to display game titles
function AnimatedScreen({ content, color = "blue" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const colors = {
    blue: "bg-blue-900/30 border-blue-500/50",
    indigo: "bg-indigo-900/30 border-indigo-500/50",
    cyan: "bg-cyan-900/30 border-cyan-500/50",
    purple: "bg-purple-900/30 border-purple-500/50"
  };
  
  useEffect(() => {
    if (!content || content.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [content]);
  
  if (!content || content.length === 0) return null;
  
  return (
    <div className={`relative p-4 overflow-hidden border rounded-lg ${colors[color] || colors.blue} w-full h-24 flex items-center justify-center mt-4 mb-6`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
      <div aria-live="polite" className="text-center">
        <AnimatedText className="text-lg font-bold">
          {content[currentIndex]}
        </AnimatedText>
        <div className="flex justify-center mt-2 space-x-1">
          {content.map((_, idx) => (
            <span 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-blue-500/30'}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

const lounges = [
  {
    id: "playstation",
    name: "PlayStation Lounge",
    description: "Immerse yourself in the latest PlayStation games with friends on comfortable seating and premium displays.",
    imageSrc: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    screenContent: [
      "Demon's Souls", "Gran Turismo 7", "God of War Ragnarök", "Horizon Forbidden West"
    ],
    features: [
      "Latest PlayStation 5 consoles",
      "4K HDR gaming monitors",
      "Comfortable gaming chairs",
      "Extensive game library",
      "Premium sound system"
    ],
    specs: {
      processor: "PlayStation 5",
      gpu: "AMD Radeon RDNA 2",
      ram: "16GB GDDR6",
      monitor: "4K HDR 120Hz",
      extras: "DualSense controllers"
    },
    pricing: [
      { duration: "1 Hour", price: "$10" },
      { duration: "3 Hours", price: "$25" },
      { duration: "6 Hours", price: "$45" },
      { duration: "Day Pass", price: "$70" }
    ],
    color: "indigo",
    accessibility: "Family-friendly environment with accessible seating and controller options for gamers of all abilities."
  },
  {
    id: "nonsmoking",
    name: "Non-Smoking Lounge",
    description: "A clean, smoke-free environment for focused PC gaming with high-performance setups.",
    imageSrc: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    screenContent: [
      "Cyberpunk 2077", "Elden Ring", "Valorant", "Counter-Strike 2"
    ],
    features: [
      "Clean, well-ventilated environment",
      "Premium gaming peripherals",
      "Adjustable gaming stations",
      "Noise-controlled spaces",
      "Dedicated servers for LAN gaming"
    ],
    specs: {
      processor: "Core i7-14700F",
      gpu: "RTX 3070 Ti",
      ram: "32GB DDR5",
      monitor: "240Hz Gaming Monitor",
      extras: "Mechanical RGB keyboards & precision mice"
    },
    pricing: [
      { duration: "1 Hour", price: "$12" },
      { duration: "3 Hours", price: "$30" },
      { duration: "6 Hours", price: "$55" },
      { duration: "Day Pass", price: "$85" }
    ],
    color: "blue",
    accessibility: "Clean air environment ideal for guests with allergies or respiratory sensitivities. Adjustable height desks and ergonomic seating available."
  },
  {
    id: "smoking",
    name: "Smoking Lounge",
    description: "PC gaming with dedicated smoking areas featuring powerful ventilation and premium gaming rigs.",
    imageSrc: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    screenContent: [
      "Diablo IV", "Call of Duty: Modern Warfare", "Fortnite", "Apex Legends"
    ],
    features: [
      "Designated smoking areas",
      "Powerful ventilation system",
      "Premium gaming setups",
      "Collaborative gaming spaces",
      "Drink and snack service"
    ],
    specs: {
      processor: "Core i7-14700F",
      gpu: "RTX 3060 Ti",
      ram: "32GB DDR5",
      monitor: "165Hz Gaming Monitor",
      extras: "Premium gaming peripherals"
    },
    pricing: [
      { duration: "1 Hour", price: "$12" },
      { duration: "3 Hours", price: "$30" },
      { duration: "6 Hours", price: "$55" },
      { duration: "Day Pass", price: "$85" }
    ],
    color: "cyan",
    accessibility: "Dedicated area for smokers with advanced air filtration. Wheelchair accessible and adaptive controls available."
  },
  {
    id: "vip",
    name: "VIP & Streaming",
    description: "Premium experience with top-tier equipment perfect for tournaments, streaming, and professional gaming.",
    imageSrc: "https://images.unsplash.com/photo-1618257181089-5e352f3ab06f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    screenContent: [
      "League of Legends", "Starfield", "Final Fantasy XVI", "OBS Streaming"
    ],
    features: [
      "Private VIP areas",
      "Top-of-the-line hardware",
      "Professional streaming setup",
      "Exclusive services and support",
      "Tournament-ready environment"
    ],
    specs: {
      processor: "Core i9-14900K",
      gpu: "RTX 4090",
      ram: "64GB DDR5",
      monitor: "BENQ 360Hz + 2x 240Hz",
      extras: "Rhode Mic + Sony Camera, Stream Deck"
    },
    pricing: [
      { duration: "1 Hour", price: "$20" },
      { duration: "3 Hours", price: "$50" },
      { duration: "6 Hours", price: "$90" },
      { duration: "Day Pass", price: "$140" }
    ],
    color: "purple",
    accessibility: "Premium accommodations with height-adjustable desks, ergonomic chairs, and professional support staff. Adaptive gaming equipment available upon request."
  }
];

export default function Lounges() {
  const [activeTab, setActiveTab] = useState("playstation");
  const [showModal, setShowModal] = useState(false);
  const [selectedLounge, setSelectedLounge] = useState(lounges[0]);

  const handleShowDetails = (lounge) => {
    setSelectedLounge(lounge);
    setShowModal(true);
  };

  return (
    <section id="lounges" className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold font-montserrat mb-4">
            Our <span className="text-blue-500">Gaming</span> Lounges
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore our specialized gaming environments tailored to different preferences.
            Each lounge offers unique features and premium equipment for an exceptional gaming experience.
          </p>
        </motion.div>

        <Tabs 
          defaultValue="playstation" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 bg-background/50 p-1 mb-8">
            {lounges.map((lounge) => (
              <TabsTrigger 
                key={lounge.id} 
                value={lounge.id}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {lounge.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {lounges.map((lounge) => (
            <TabsContent key={lounge.id} value={lounge.id} className="focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-5 gap-8"
              >
                {/* Image */}
                <Card className="md:col-span-2 overflow-hidden border-0 bg-transparent">
                  <CardContent className="p-0">
                    <ShimmerEffect>
                      <img 
                        src={lounge.imageSrc} 
                        alt={lounge.name} 
                        className="w-full h-96 object-cover rounded-lg"
                      />
                    </ShimmerEffect>
                  </CardContent>
                </Card>

                {/* Content */}
                <Card className="md:col-span-3 bg-black/30 backdrop-blur border border-blue-900/30">
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold font-montserrat mb-4">
                      {lounge.name}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {lounge.description}
                    </p>
                    
                    {lounge.accessibility && (
                      <div className="mb-4">
                        <Badge variant="secondary" className="bg-blue-900/30 text-blue-200 hover:bg-blue-800/50">
                          Accessibility
                        </Badge>
                        <p className="mt-2 text-sm text-gray-400">{lounge.accessibility}</p>
                      </div>
                    )}
                    
                    {lounge.screenContent && (
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-3 text-blue-400">Featured Games</h4>
                        <AnimatedScreen 
                          content={lounge.screenContent} 
                          color={lounge.color} 
                        />
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-3 text-blue-400">Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {lounge.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="text-blue-500">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-blue-400">Specifications</h4>
                      <PCSpecs specs={lounge.specs} className="bg-black/20 p-4 rounded-lg" />
                    </div>

                    {/* Pricing and Reserve Button removed */}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{selectedLounge.name} Details</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-center">
                  Explore the features and specifications of our {selectedLounge.name}.
                </p>
                
                {selectedLounge.screenContent && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Featured Games</h4>
                    <AnimatedScreen 
                      content={selectedLounge.screenContent} 
                      color={selectedLounge.color}
                    />
                  </div>
                )}

                {selectedLounge.accessibility && (
                  <div className="mt-4 bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Accessibility Features</h4>
                    <p className="text-sm text-gray-300">{selectedLounge.accessibility}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}