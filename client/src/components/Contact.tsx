import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      await apiRequest('POST', '/api/contact', formData);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll respond shortly.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                    (555) 123-4567
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
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                    <i className="fab fa-facebook-f text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                    <i className="fab fa-discord text-2xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">
                    <i className="fab fa-twitch text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="bg-glass rounded-xl overflow-hidden shadow-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-montserrat font-bold mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-gray-700 rounded-lg p-3 text-foreground focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-gray-700 rounded-lg p-3 text-foreground focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-background/50 border border-gray-700 rounded-lg p-3 text-foreground focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-background/50 border border-gray-700 rounded-lg p-3 text-foreground focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 w-full md:w-auto disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
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
            Join us at <span className="font-semibold">LEET Gaming Lounge</span> for the ultimate gaming experience. Book your station now!
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="#" className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block">
              Book Now
            </a>
            <a href="#contact" className="bg-background hover:bg-background/80 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
