import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 text-white group">
          <Home className="w-6 h-6 sm:w-8 sm:h-8 stroke-1 group-hover:text-brand-gold transition-colors" />
          <span className="text-lg sm:text-xl font-bold font-serif tracking-tight">Classic Homes</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-brand-offWhite">
          <Link to="/solutions" className="hover:text-brand-gold transition-colors duration-200">Solutions</Link>
          <Link to="/network" className="hover:text-brand-gold transition-colors duration-200">Network</Link>
          <Link to="/provenance" className="hover:text-brand-gold transition-colors duration-200">Provenance</Link>
          <Link to="/enterprise" className="hover:text-brand-gold transition-colors duration-200">Enterprise</Link>
        </div>

        <div className="flex items-center space-x-4">
          <a href="https://apps.classichomesremodeling.com" className="hidden sm:block text-brand-offWhite hover:text-white text-sm font-medium transition-colors">
            Log In
          </a>
          <a href="https://apps.classichomesremodeling.com" className="bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-darkNavy px-5 py-2 rounded-md text-sm font-medium transition-all duration-300">
            Request Access
          </a>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};