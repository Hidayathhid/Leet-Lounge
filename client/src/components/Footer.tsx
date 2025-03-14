import LeetLogo from "./icons/LeetLogo";

export default function Footer() {
  return (
    <footer className="bg-background/95 py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <LeetLogo size={40} />
              <h1 className="text-2xl font-montserrat font-bold text-foreground">
                <span className="text-blue-500">LEET</span> Gaming
              </h1>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate destination for gamers looking for a premium gaming experience with top-notch equipment and a vibrant community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Home</a></li>
              <li><a href="#lounges" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Gaming Lounges</a></li>
              <li><a href="#games" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Game Library</a></li>
              <li><a href="#food" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Food & Drinks</a></li>
              <li><a href="#facilities" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Facilities</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6 text-foreground">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">PC Gaming</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">PlayStation Gaming</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">VIP Experience</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Streaming Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Tournament Hosting</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">Private Events</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-montserrat font-bold mb-6 text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-blue-500 mt-1 mr-3"></i>
                <span className="text-gray-400">SAHAB TOWER, Salem Al Mubarak St, Salmiya</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-blue-500 mt-1 mr-3"></i>
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-blue-500 mt-1 mr-3"></i>
                <a href="mailto:info@leetgaming.com" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">info@leetgaming.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LEET Gaming Lounge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
