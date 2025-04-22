import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import { NewsItem, initialNews } from "@/data/newsItems";

export default function News() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  
  const filteredNews = activeCategory === "all" 
    ? initialNews 
    : initialNews.filter(item => item.category === activeCategory);

  return (
    <section id="news" className="py-20 bg-background">
      <AnimatedSection className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-montserrat mb-4">
            Latest <span className="text-blue-500">News</span> & Updates
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay up-to-date with the latest happenings at LEET Gaming Lounge, including tournaments, special offers, and new gaming experiences.
          </p>
        </div>
        
        <div className="flex justify-center mb-8 space-x-4">
          <Button 
            variant={activeCategory === "all" ? "default" : "outline"} 
            onClick={() => setActiveCategory("all")}
            className="rounded-full"
          >
            All
          </Button>
          <Button 
            variant={activeCategory === "news" ? "default" : "outline"} 
            onClick={() => setActiveCategory("news")}
            className="rounded-full"
          >
            News
          </Button>
          <Button 
            variant={activeCategory === "event" ? "default" : "outline"} 
            onClick={() => setActiveCategory("event")}
            className="rounded-full"
          >
            Events
          </Button>
          <Button 
            variant={activeCategory === "tournament" ? "default" : "outline"} 
            onClick={() => setActiveCategory("tournament")}
            className="rounded-full"
          >
            Tournaments
          </Button>
          <Button 
            variant={activeCategory === "offer" ? "default" : "outline"} 
            onClick={() => setActiveCategory("offer")}
            className="rounded-full"
          >
            Offers
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-glass overflow-hidden h-full flex flex-col">
                {item.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.category === "news" ? "bg-blue-500/20 text-blue-400" :
                      item.category === "tournament" ? "bg-purple-500/20 text-purple-400" :
                      item.category === "offer" ? "bg-green-500/20 text-green-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  
                  <p className="text-gray-300 mb-4 flex-1">
                    {expandedItem === item.id 
                      ? item.content 
                      : item.content.length > 120 
                        ? `${item.content.substring(0, 120)}...` 
                        : item.content
                    }
                  </p>
                  
                  {item.content.length > 120 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                      className="mt-auto self-start"
                    >
                      {expandedItem === item.id ? "Read Less" : "Read More"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}