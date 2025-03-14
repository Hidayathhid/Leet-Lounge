import AnimatedSection from "./AnimatedSection";

export default function CallToAction() {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-4xl font-bold font-orbitron mb-6">
            Ready to <span className="text-primary">Level Up</span> Your Gaming?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join us at LEET Gaming Lounge for the ultimate gaming experience. Book your station now!
          </p>
          <button className="bg-primary text-white text-lg px-8 py-4 rounded-lg font-bold hover:bg-accent transition-colors duration-300 animate-pulse">
            Book Your Gaming Session
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}
