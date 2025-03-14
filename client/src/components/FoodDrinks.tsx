import { motion } from "framer-motion";
import { foodItems, drinkItems } from "@/lib/data";

export default function FoodDrinks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="food" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Food & <span className="text-blue-500">Drinks</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Fuel your gaming sessions with our selection of gamer-friendly food and refreshing beverages.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <motion.h3 
              className="text-2xl font-montserrat font-bold mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <i className="fas fa-utensils text-blue-500 mr-3"></i> Food Menu
            </motion.h3>
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {foodItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-glass rounded-xl p-4 flex"
                  variants={itemVariants}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-montserrat font-semibold mb-1">{item.name}</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      {item.description}
                    </p>
                    <p className="text-blue-500 font-semibold">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div>
            <motion.h3 
              className="text-2xl font-montserrat font-bold mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <i className="fas fa-glass-cheers text-blue-500 mr-3"></i> Drinks Menu
            </motion.h3>
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {drinkItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-glass rounded-xl p-4 flex"
                  variants={itemVariants}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-montserrat font-semibold mb-1">{item.name}</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      {item.description}
                    </p>
                    <p className="text-blue-500 font-semibold">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
