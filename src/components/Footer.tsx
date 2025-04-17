
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cream-100 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 font-display">SweetHub</h3>
            <p className="text-gray-600">Serving authentic Indian sweets and snacks from our cloud kitchen to your doorstep.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-sweet-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-sweet-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-sweet-600">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-sweet-600">Home</Link></li>
              <li><Link to="/menu" className="text-gray-600 hover:text-sweet-600">Our Menu</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-sweet-600">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-sweet-600">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sweet-600">Sweets</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sweet-600">Snacks</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sweet-600">Gift Boxes</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sweet-600">Seasonal Specials</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
            <address className="not-italic text-gray-600">
              <p>123 Flavor Street</p>
              <p>Tasteville, TX 75001</p>
              <p className="mt-2">Email: hello@sweethub.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-cream-200 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SweetHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
