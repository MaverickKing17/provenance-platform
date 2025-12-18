import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 text-white group">
          <Home className="w-6 h-6 sm:w-8 sm:h-8 stroke-1 group-hover:text-brand-gold transition-colors" />
          <span className="text-lg sm:text-xl font-bold font-serif tracking-tight text-white">Classic Homes</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-brand-offWhite">
          <Link to="/sourcing-hub" className="flex items-center space-x-2 text-brand-gold hover:text-white transition-colors duration-200">
            <LayoutDashboard className="w-4 h-4" />
            <span>Sourcing Hub</span>
          </Link>
          <Link to="/solutions" className="hover:text-brand-gold transition-colors duration-200">Solutions</Link>
          <Link to="/network" className="hover:text-brand-gold transition-colors duration-200">Network</Link>
          <Link to="/provenance" className="hover:text-brand-gold transition-colors duration-200">Provenance</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/sourcing-hub" className="hidden sm:block text-brand-offWhite hover:text-white text-sm font-medium transition-colors">
            Log In
          </Link>
          <Link to="/sourcing-hub" className="bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-darkNavy px-5 py-2 rounded-md text-sm font-medium transition-all duration-300">
            Request Access
          </Link>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};