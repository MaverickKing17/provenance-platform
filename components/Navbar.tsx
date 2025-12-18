import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, LayoutDashboard, Globe, Layers, Box } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 text-white group">
          <Home className="w-6 h-6 sm:w-8 sm:h-8 stroke-1 group-hover:text-brand-gold transition-colors" />
          <span className="text-lg sm:text-xl font-bold font-serif tracking-tight text-white uppercase">Classic Homes</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-brand-offWhite/80">
          <Link to="/sourcing-hub" className="flex items-center space-x-2 hover:text-brand-gold transition-colors duration-200">
            <LayoutDashboard className="w-4 h-4" />
            <span>Sourcing Hub</span>
          </Link>
          <Link to="/projects" className="flex items-center space-x-2 hover:text-brand-gold transition-colors duration-200">
            <Layers className="w-4 h-4" />
            <span>Projects</span>
          </Link>
          <Link to="/orders" className="flex items-center space-x-2 text-brand-gold hover:text-white transition-colors duration-200">
            <Box className="w-4 h-4" />
            <span>Orders</span>
          </Link>
          <Link to="/network" className="flex items-center space-x-2 hover:text-brand-gold transition-colors duration-200">
            <Globe className="w-4 h-4" />
            <span>Vetted Network</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/sourcing-hub" className="hidden sm:block text-brand-offWhite/60 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors">
            Identity Portal
          </Link>
          <Link to="/projects" className="bg-brand-gold text-brand-darkNavy px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-brand-goldHover transition-all duration-300 shadow-lg shadow-brand-gold/20">
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