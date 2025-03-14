import AnimatedSection from "./AnimatedSection";
import { games } from "@/data/games";

export default function GameLibrary() {
  return (
    <section id="games" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold font-orbitron mb-4">
            Game <span className="text-primary">Library</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Enjoy our extensive collection of the latest titles across all platforms.
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" delay={0.3}>
          {games.map((game, index) => (
            <div 
              key={index} 
              className="game-card bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-orbitron font-bold">{game.title}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded mr-2">
                    {game.genre}
                  </span>
                  <span className="text-xs bg-gray-200 text-dark px-2 py-1 rounded">
                    {game.platforms}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection className="text-center mt-12" delay={0.5}>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-accent transition-colors duration-300">
            View All Games
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}
