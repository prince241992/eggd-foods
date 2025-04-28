
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-100 to-pink-100 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-display">Egg'd <span className="mx-1">Foods</span></h3>
            <p className="text-gray-600">Your go-to virtual restaurant for the most epic egg creations! Serving up mind-blowing flavors straight to your doorstep. 🍳✨</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-pink-500">Home</Link></li>
              <li><Link to="/menu" className="text-gray-600 hover:text-pink-500">Our Menu</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-pink-500">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-pink-500">Contact</Link></li>
              <li><Link to="/delivery-signin" className="text-gray-600 hover:text-pink-500">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pink-500">Omelettes</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500">Bhurji</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500">Main Course</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500">Bread & Rice</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
            <div className="text-gray-600">
              <h5 className="font-display text-lg bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mb-2">Egg'd Foods</h5>
              <address className="not-italic">
                <p>Near Radission Hotel</p>
                <p>Vijaynagar, Indore</p>
                <p className="mt-2">Email: contactus@eggsfoods.com</p>
                <p>Phone: 9898116290</p>
              </address>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cream-200 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Egg'd Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
