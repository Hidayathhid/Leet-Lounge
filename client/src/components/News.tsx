import { motion } from "framer-motion";

// Sample news data structure
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  category: "news" | "event" | "offer" | "tournament";
}

// Initial sample news items
export const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "New Gaming Stations Installed",
    content: "We're excited to announce that we've upgraded our gaming stations with the latest RTX 4090 GPUs for ultimate gaming performance!",
    date: "April 15, 2025",
    category: "news"
  },
  {
    id: 2,
    title: "Weekend Tournament: Valorant",
    content: "Join our Valorant tournament this weekend! Registration open now. Great prizes for winners!",
    date: "April 20, 2025",
    category: "tournament"
  },
  {
    id: 3,
    title: "Late Night Gaming Special",
    content: "Enjoy 50% off on all gaming stations every weekday from 11 PM to 5 AM!",
    date: "April 18, 2025",
    category: "offer"
  }
];

export default function News() {
  return (
    <section id="news" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            News & <span className="text-blue-500">Updates</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stay updated with the latest news, tournaments, and special offers from LEET Gaming Lounge
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialNews.map((item) => (
            <motion.div
              key={item.id}
              className="bg-glass rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.category === "news" ? "bg-blue-500/20 text-blue-400" :
                    item.category === "tournament" ? "bg-purple-500/20 text-purple-400" :
                    item.category === "offer" ? "bg-green-500/20 text-green-400" :
                    "bg-amber-500/20 text-amber-400"
                  }`}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.content}</p>
                <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-300 inline-flex items-center">
                  Read more <i className="fas fa-chevron-right ml-2 text-xs"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 inline-block">
            View All Updates
          </a>
        </motion.div>
      </div>
    </section>
  );
}