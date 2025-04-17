
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-4 bg-white/95 sticky top-0 z-50 shadow-sm backdrop-blur-sm">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold font-display text-sweet-700">egg'd<span className="text-spice-600">foods</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-800 hover:text-sweet-600 transition-colors">Home</Link>
          <Link to="/menu" className="font-medium text-gray-800 hover:text-sweet-600 transition-colors">Menu</Link>
          <Link to="/about" className="font-medium text-gray-800 hover:text-sweet-600 transition-colors">About</Link>
          <Link to="/contact" className="font-medium text-gray-800 hover:text-sweet-600 transition-colors">Contact</Link>
          <Button className="bg-sweet-600 hover:bg-sweet-700">Order Now</Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 hover:text-sweet-600 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="font-medium text-gray-800 hover:text-sweet-600 transition-colors">Home</Link>
            <Link to="/menu" className="font-medium text-gray-800 hover:text-sweet-600 transition-colors">Menu</Link>
            <Link to="/about" className="font-medium text-gray-800 hover:text-sweet-600 transition-colors">About</Link>
            <Link to="/contact" className="font-medium text-gray-800 hover:text-sweet-600 transition-colors">Contact</Link>
            <Button className="bg-sweet-600 hover:bg-sweet-700 w-full">Order Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
