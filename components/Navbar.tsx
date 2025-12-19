
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, LayoutDashboard, Globe, Layers, Box, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 text-white group">
          <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center rounded-sm group-hover:bg-brand-gold transition-all duration-500">
            <div className="w-5 h-5 bg-brand-gold group-hover:bg-brand-darkNavy"></div>
          </div>
          <span className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white uppercase tracking-tighter">Classic Homes</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-brand-offWhite">
          <Link to="/sourcing-hub" className="flex items-center space-x-2.5 hover:text-brand-gold transition-colors duration-200">
            <LayoutDashboard className="w-5 h-5" />
            <span>Sourcing Hub</span>
          </Link>
          <Link to="/projects" className="flex items-center space-x-2.5 hover:text-brand-gold transition-colors duration-200">
            <Layers className="w-5 h-5" />
            <span>Projects</span>
          </Link>
          <Link to="/orders" className="flex items-center space-x-2.5 hover:text-brand-gold transition-colors duration-200">
            <Box className="w-5 h-5" />
            <span>Orders</span>
          </Link>
          <Link to="/network" className="flex items-center space-x-2.5 hover:text-brand-gold transition-colors duration-200">
            <Globe className="w-5 h-5" />
            <span>Vetted Network</span>
          </Link>
          <div className="w-px h-5 bg-white/20 mx-2"></div>
          <button className="flex items-center space-x-2.5 hover:text-brand-gold transition-colors duration-200 group">
             <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
             <span className="text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100">Global Search</span>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/sourcing-hub" className="hidden lg:block text-brand-offWhite/70 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">
            Identity Portal
          </Link>
          <Link to="/projects" className="bg-brand-gold text-brand-darkNavy px-8 py-3.5 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-brand-goldHover transition-all duration-300 shadow-xl shadow-brand-gold/30">
            Request Access
          </Link>
          <button className="md:hidden text-white">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>
    </nav>
  );
};
