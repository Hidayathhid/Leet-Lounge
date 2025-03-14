import { motion } from "framer-motion";
import PCSpecs from "./PCSpecs";
import { lounges } from "@/lib/data";

export default function Lounges() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="lounges" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Gaming <span className="text-blue-500">Lounges</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience gaming like never before in our specialized gaming environments, each designed for different preferences.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {lounges.map((lounge, index) => (
            <motion.div 
              key={index}
              className="bg-glass rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2"
              variants={itemVariants}
            >
              <img 
                src={lounge.image} 
                alt={lounge.name} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className={`${lounge.icon} text-2xl ${lounge.iconColor} mr-3 icon-hover transition-all duration-300`}></i>
                  <h3 className="text-xl font-montserrat font-bold">{lounge.name}</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  {lounge.description}
                </p>
                {lounge.specs && (
                  <PCSpecs specs={lounge.specs} className="mb-4" />
                )}
                <a href="#" className="text-blue-400 hover:text-blue-500 transition-colors duration-300 inline-flex items-center">
                  Learn more <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center">
          <a href="#booking" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block">
            View Pricing & Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
