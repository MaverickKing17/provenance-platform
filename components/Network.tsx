import React, { useState } from 'react';
import { 
  Search, 
  Map as MapIcon, 
  Filter, 
  Star, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const SUPPLIERS = [
  {
    id: 1,
    name: 'Tuscany Stoneworks',
    location: 'Carrara, Italy',
    specialty: 'Marble & Travertine',
    rating: 4.9,
    risk: 'Low Risk',
    capacity: 85,
    tags: ['ISO 9001', 'Fair Trade'],
    image: 'https://images.unsplash.com/photo-1599557288647-73d8b8e0539f?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Apex Materials',
    location: 'New York, USA',
    specialty: 'Steel & Glass',
    rating: 4.8,
    risk: 'Low Risk',
    capacity: 40,
    tags: ['LEED Gold', 'Made in USA'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Kyoto Timber Co.',
    location: 'Kyoto, Japan',
    specialty: 'Sustainable Wood',
    rating: 5.0,
    risk: 'Medium Risk',
    capacity: 92,
    tags: ['FSC Certified', 'Carb Compliant'],
    image: 'https://images.unsplash.com/photo-1582234373447-28023367f16d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Nordic Slate',
    location: 'Oslo, Norway',
    specialty: 'Roofing Slate',
    rating: 4.7,
    risk: 'Low Risk',
    capacity: 60,
    tags: ['Nordic Swan', 'ISO 14001'],
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=200&auto=format&fit=crop'
  }
];

export const Network: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-brand-offWhite pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Executive Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight">Vetted Global Network</h1>
            <div className="flex items-center space-x-3 text-brand-gold font-bold text-[10px] uppercase tracking-[0.2em]">
              <span>Strategic Partners</span>
              <span className="w-1 h-1 bg-brand-gold rounded-full"></span>
              <span>Risk-Adjusted Portfolio</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-brand-navy/10 rounded-md text-sm font-medium text-brand-navy hover:bg-brand-navy hover:text-white transition-all shadow-sm">
              <MapIcon className="w-4 h-4" />
              <span>Risk Map</span>
            </button>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mutedGray group-focus-within:text-brand-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search institutional suppliers..." 
                className="pl-11 pr-4 py-2.5 bg-white border border-brand-navy/10 rounded-md text-sm w-full lg:w-80 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Global Marketplace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUPPLIERS.map((supplier) => (
            <div key={supplier.id} className="bg-white border border-brand-navy/5 rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-6 space-y-6">
                
                {/* Supplier Identity */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={supplier.image} alt={supplier.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold/20" />
                    <div className="flex flex-col">
                      <h3 className="font-serif font-bold text-brand-darkNavy group-hover:text-brand-gold transition-colors">{supplier.name}</h3>
                      <p className="text-[10px] text-brand-mutedGray uppercase tracking-widest">{supplier.location}</p>
                    </div>
                  </div>
                  <button className="text-brand-gold/40 hover:text-brand-gold transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* Core Metrics */}
                <div className="flex items-center justify-between py-3 border-y border-brand-navy/5">
                  <span className="text-xs font-medium text-brand-navy/60">{supplier.specialty}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-brand-gold fill-brand-gold" />
                    <span className="text-xs font-bold text-brand-navy">{supplier.rating}</span>
                  </div>
                </div>

                {/* Risk & Capacity (Executive View) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-brand-mutedGray uppercase tracking-widest">Risk Profile</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${supplier.risk === 'Low Risk' ? 'bg-brand-success' : 'bg-brand-amber'}`}></div>
                      <span className="text-[11px] font-bold text-brand-navy">{supplier.risk}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-brand-mutedGray uppercase tracking-widest">Capacity Load</span>
                      <span className="text-[9px] font-mono text-brand-navy">{supplier.capacity}%</span>
                    </div>
                    <div className="h-1 bg-brand-navy/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${supplier.capacity > 80 ? 'bg-brand-amber' : 'bg-brand-success'}`}
                        style={{ width: `${supplier.capacity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2">
                  {supplier.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-brand-navy/5 rounded text-[8px] font-bold text-brand-navy/60 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Settlement Footer */}
        <div className="mt-20 pt-12 border-t border-brand-navy/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-brand-navy" />
              <span className="text-[10px] font-bold text-brand-navy uppercase tracking-[0.2em]">Institutional Settlement Channels</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold text-brand-navy uppercase tracking-widest">
               <span className="flex items-center space-x-2"><Globe className="w-3 h-3" /> <span>SWIFT / SEPA</span></span>
               <span className="flex items-center space-x-2"><TrendingUp className="w-3 h-3" /> <span>Corporate Treasury</span></span>
               <span className="flex items-center space-x-2"><ShieldCheck className="w-3 h-3" /> <span>Letter of Credit</span></span>
               <span className="flex items-center space-x-2"><ArrowRight className="w-3 h-3" /> <span>Escrow & Smart Contract</span></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};