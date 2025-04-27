import AnimatedSection from "./AnimatedSection";
import { foodItems, drinkItems } from "@/data/foodMenu";

export default function FoodMenu() {
  return (
    <section id="food" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold font-orbitron mb-4">
            Gaming <span className="text-primary">Fuel</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Keep your energy levels high with our selection of gamer-friendly food and drinks.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatedSection>
            <h3 className="text-2xl font-orbitron font-bold mb-6 flex items-center">
              <i className="fas fa-utensils text-primary mr-3"></i> Food Menu
            </h3>

            <div className="space-y-6">
              {foodItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`${
                    index < foodItems.length - 1 ? "border-b border-gray-200 pb-4" : ""
                  }`}
                >
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h3 className="text-2xl font-orbitron font-bold mb-6 flex items-center">
              <i className="fas fa-glass-cheers text-primary mr-3"></i> Drinks Menu
            </h3>

            <div className="space-y-6">
              {drinkItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`${
                    index < drinkItems.length - 1 ? "border-b border-gray-200 pb-4" : ""
                  }`}
                >
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-12 flex justify-center" delay={0.4}>
          <div className="bg-gray-100 p-6 rounded-lg max-w-lg text-center">
            <h3 className="font-bold text-lg mb-2">Special Deal: Gamer's Combo</h3>
            <p>Get any food item, a drink, and 1 hour of gaming time for a special price!</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
