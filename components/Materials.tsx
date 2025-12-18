import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Wallet, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  Filter,
  ChevronDown,
  Sparkles,
  Eye,
  History,
  MessageSquare,
  Zap,
  Box
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MATCHED_MATERIALS = [
  {
    id: 1,
    name: 'Calacatta Oro Marble',
    location: 'Carrara, Italy',
    supplier: 'Tuscany Stoneworks',
    matchScore: 94,
    price: 395,
    leadTime: 8,
    image: 'https://images.unsplash.com/photo-1599557288647-73d8b8e0539f?q=80&w=800&auto=format&fit=crop',
    tags: ['±0.02mm Tol', 'FSC Certified']
  },
  {
    id: 2,
    name: 'Statuario Venato',
    location: 'Tuscany, Italy',
    supplier: 'Apex Materials',
    matchScore: 91,
    price: 420,
    leadTime: 12,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    tags: ['LEED Platinum', 'Hand-Picked']
  },
  {
    id: 3,
    name: 'Arabescato Corchia',
    location: 'Apuan Alps, Italy',
    supplier: 'Global Stone Imports',
    matchScore: 86,
    price: 310,
    leadTime: 6,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    tags: ['Net Zero Log', 'High Gloss']
  }
];

export const Materials: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      
      {/* EXECUTIVE SIDEBAR */}
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20">
        <div className="p-8">
          <Link to="/" className="flex flex-col space-y-1">
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-brand-gold"></div>
            </div>
            <span className="text-white font-serif font-bold tracking-tight text-lg mt-2 uppercase">Classic Homes</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/sourcing-hub" />
          <NavItem icon={<Layers size={18} />} label="Projects" to="/projects" />
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" active />
          <NavItem icon={<Box size={18} />} label="Orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" />
          <NavItem icon={<Users size={18} />} label="Suppliers" to="/network" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50" alt="V. Sterling" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest">Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full px-12 py-12">
          
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="space-y-2">
              <Link to="/projects" className="flex items-center space-x-2 text-[10px] font-bold text-brand-mutedGray uppercase tracking-[0.2em] hover:text-brand-gold transition-colors mb-4">
                <ArrowLeft size={12} />
                <span>Back to Specs</span>
              </Link>
              <h1 className="text-4xl font-serif font-bold text-brand-darkNavy">AI-Matched Materials</h1>
              <p className="text-brand-mutedGray text-sm">3 high-fidelity matches found based on your technical specifications.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <select className="bg-white border border-brand-navy/10 rounded-md pl-10 pr-10 py-2.5 text-xs font-bold text-brand-darkNavy appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all">
                  <option>Best Match</option>
                  <option>Lowest Risk</option>
                  <option>Soonest Delivery</option>
                </select>
                <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-gold" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-mutedGray pointer-events-none" />
              </div>
              <button className="flex items-center space-x-2 px-6 py-2.5 bg-brand-gold text-brand-darkNavy text-xs font-black uppercase tracking-widest rounded-md hover:bg-brand-goldHover transition-all shadow-lg shadow-brand-gold/10">
                <Sparkles size={14} />
                <span>Generate Custom</span>
              </button>
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-brand-navy/10 rounded-md text-xs font-bold text-brand-darkNavy hover:bg-slate-50 transition-all">
                <Filter size={14} />
                <span>Filter Results</span>
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MATCHED_MATERIALS.map((material) => (
              <div key={material.id} className="bg-white border border-brand-navy/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                
                {/* Visual Preview */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={material.image} alt={material.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkNavy/80 via-transparent to-transparent opacity-60"></div>
                  
                  {/* AI Overlays */}
                  <div className="absolute top-4 right-4 bg-brand-darkNavy/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-brand-gold/30">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{material.matchScore}% Match</span>
                  </div>
                  
                  <button className="absolute top-4 left-4 flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-md transition-all group/btn">
                    <Sparkles size={12} className="text-brand-gold group-hover/btn:rotate-12 transition-transform" />
                    <span className="text-[9px] font-bold text-white uppercase tracking-widest">Generate Texture</span>
                  </button>

                  <div className="absolute bottom-4 left-6 flex items-center space-x-2">
                    <ShieldCheck size={14} className="text-brand-gold" />
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Provenance Verified</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-brand-darkNavy">{material.name}</h3>
                      <span className="text-[10px] text-brand-mutedGray font-medium uppercase tracking-widest">{material.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <span className="text-[11px] text-brand-mutedGray">{material.supplier}</span>
                       <CheckCircle2 size={12} className="text-brand-success" />
                       <span className="text-[9px] font-bold text-brand-success uppercase tracking-widest">Verified</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-100">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-brand-mutedGray uppercase tracking-widest">Price</span>
                      <p className="text-lg font-bold text-brand-darkNavy">${material.price}<span className="text-xs text-brand-mutedGray font-normal"> /sq ft</span></p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-brand-mutedGray uppercase tracking-widest">Lead Time</span>
                      <p className="text-lg font-bold text-brand-darkNavy">{material.leadTime}<span className="text-xs text-brand-mutedGray font-normal"> weeks</span></p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-brand-gold hover:bg-brand-goldHover text-brand-darkNavy font-black text-xs uppercase tracking-[0.15em] py-4 rounded-md transition-all flex items-center justify-center space-x-3">
                      <span>Proceed to Visualization</span>
                      <Eye size={16} />
                    </button>
                    <button className="w-full bg-white border border-brand-darkNavy text-brand-darkNavy font-black text-xs uppercase tracking-[0.15em] py-4 rounded-md hover:bg-slate-50 transition-all flex items-center justify-center space-x-3">
                      <History size={16} />
                      <span>View Details & Chain</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* FLOATING ACTION */}
      <div className="fixed bottom-10 right-10">
         <div className="bg-brand-darkNavy p-3 rounded-2xl border border-brand-gold/30 shadow-2xl flex items-center space-x-4 cursor-pointer hover:scale-105 transition-all group">
            <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center">
               <MessageSquare size={20} className="fill-brand-darkNavy text-brand-darkNavy" />
            </div>
            <div className="pr-4">
               <span className="block text-[10px] text-brand-gold font-black uppercase tracking-widest">Concierge</span>
               <span className="block text-xs text-white/60">Live Assistance</span>
            </div>
         </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'}`}>{icon}</div>
    <span className="text-xs font-bold tracking-wide">{label}</span>
  </Link>
);