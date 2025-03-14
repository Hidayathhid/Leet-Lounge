import { motion } from "framer-motion";
import { facilities } from "@/lib/data";

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 bg-gradient-to-b from-background/95 to-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-blue-500">Facilities</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience premium gaming amenities designed for comfort and performance.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: 0.3,
            staggerChildren: 0.1
          }}
        >
          {facilities.map((facility, index) => (
            <motion.div 
              key={index}
              className="bg-glass rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img 
                src={facility.image} 
                alt={facility.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className={`${facility.icon} text-2xl text-blue-500 mr-3 icon-hover transition-all duration-300`}></i>
                  <h3 className="text-xl font-montserrat font-bold">{facility.name}</h3>
                </div>
                <p className="text-gray-300">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <style jsx>{`
        .icon-hover:hover {
          transform: scale(1.1);
          color: #3b82f6;
        }
      `}</style>
    </section>
  );
}
