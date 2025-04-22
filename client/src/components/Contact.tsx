import { motion } from "framer-motion";

export default function Contact() {

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-background/95 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-montserrat font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contact <span className="text-blue-500">Us</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get in touch with us for bookings, inquiries, or to plan your next gaming session.
          </motion.p>
        </div>
        
        <div className="flex justify-center">
          {/* Contact Information */}
          <motion.div 
            className="bg-glass rounded-xl overflow-hidden shadow-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-montserrat font-bold mb-6">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-blue-500 text-2xl mt-1 mr-4"></i>
                <div>
                  <h4 className="font-semibold mb-1">Our Location</h4>
                  <p className="text-gray-300">
                    SAHAB TOWER, Salem Al Mubarak St, Salmiya
                  </p>
                  <a href="https://maps.app.goo.gl/igGfbgdLoQUAcM7F7" target="_blank" className="text-blue-400 hover:text-blue-500 transition-colors duration-300 inline-flex items-center mt-2">
                    View on Maps <i className="fas fa-external-link-alt ml-2"></i>
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-phone-alt text-blue-500 text-2xl mt-1 mr-4"></i>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-300">
                    +965 69982790
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-envelope text-blue-500 text-2xl mt-1 mr-4"></i>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:info@leetgaming.com" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    info@leetgaming.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="far fa-clock text-blue-500 text-2xl mt-1 mr-4"></i>
                <div>
                  <h4 className="font-semibold mb-1">Hours</h4>
                  <p className="text-gray-300">
                    Everyday 24/7
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/leetkw/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                    <i className="fab fa-facebook-f text-2xl"></i>
                  </a>
                  <a href="https://www.instagram.com/leet.kw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a href="https://discord.gg/leetkw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                    <i className="fab fa-discord text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          

        </div>
        
        {/* Google Maps */}
        <motion.div 
          className="mt-16 rounded-xl overflow-hidden shadow-lg h-96"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <iframe 
            src="https://maps.google.com/maps?q=SAHAB+TOWER,+Salem+Al+Mubarak+St,+Salmiya&z=15&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
      
      {/* Call to Action */}
      <div id="booking" className="py-16 bg-blue-500 relative mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-white">Ready to <span className="text-background">Level Up</span> Your Gaming?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join us at <span className="font-semibold">LEET Gaming Lounge</span> for the ultimate gaming experience. In LEET you can become a hero!
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="#contact" className="bg-background hover:bg-background/80 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
