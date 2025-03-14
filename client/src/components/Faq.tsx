import { useState } from "react";
import { motion } from "framer-motion";
import { faqItems } from "@/lib/data";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked <span className="text-blue-500">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to common questions about our gaming lounge.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {faqItems.map((item, index) => (
              <div key={index} className="bg-glass rounded-xl overflow-hidden shadow-lg">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 focus:outline-none transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-montserrat font-bold">{item.question}</h3>
                    <i className={`fas fa-chevron-down text-blue-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}></i>
                  </div>
                </button>
                <div 
                  className={`px-6 pb-6 transition-all duration-300 ${openIndex === index ? 'block' : 'hidden'}`}
                >
                  <p className="text-gray-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
