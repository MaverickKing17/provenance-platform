
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Wallet, 
  BarChart3, 
  Users, 
  Settings2, 
  Map as MapIcon, 
  Grid,
  Filter, 
  Star, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Box,
  MessageSquare,
  Lock,
  CheckCircle2,
  X,
  Send,
  Loader2,
  ChevronDown,
  ShieldAlert,
  Maximize2,
  Activity,
  Zap,
  // Fix: Added missing MapPin import
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlobalSearch } from './GlobalSearch';

interface Supplier {
  id: number;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  risk: string;
  capacity: number;
  tags: string[];
  image: string;
  coords: { x: number; y: number }; // Percentage coords for abstract map
}

const SUPPLIERS: Supplier[] = [
  {
    id: 1,
    name: 'Tuscany Stoneworks',
    location: 'Carrara, Italy',
    specialty: 'Marble & Travertine',
    rating: 4.9,
    risk: 'Low Risk',
    capacity: 85,
    tags: ['ISO 9001', 'Fair Trade'],
    image: 'https://images.unsplash.com/photo-1599557288647-73d8b8e0539f?q=80&w=400&auto=format&fit=crop',
    coords: { x: 52, y: 35 }
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
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop',
    coords: { x: 25, y: 38 }
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
    image: 'https://images.unsplash.com/photo-1582234373447-28023367f16d?q=80&w=400&auto=format&fit=crop',
    coords: { x: 85, y: 42 }
  },
  {
    id: 4,
    name: 'Nordic Slate',
    location: 'Oslo, Norway',
    specialty: 'Roofing Slate',
    rating: 4.7,
    risk: 'High Risk',
    capacity: 60,
    tags: ['Nordic Swan', 'ISO 14001'],
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&auto=format&fit=crop',
    coords: { x: 50, y: 18 }
  }
];

const MOCK_PROJECTS = [
  'Sterling Residence',
  'Hudson Estate',
  'Apex Tower Penthouse',
  'Vanguard Corporate Center'
];

export const Network: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [hoveredSupplier, setHoveredSupplier] = useState<Supplier | null>(null);

  const handleRequestQuote = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsQuoteModalOpen(true);
    setQuoteSuccess(false);
  };

  const submitQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setQuoteSuccess(true);
      setTimeout(() => {
        setIsQuoteModalOpen(false);
        setQuoteSuccess(false);
      }, 2000);
    }, 1500);
  };

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'High Risk':
        return {
          border: 'border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.1)]',
          text: 'text-red-500',
          bg: 'bg-red-500',
          icon: <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
        };
      case 'Medium Risk':
        return {
          border: 'border-brand-amber/40 shadow-[0_0_20px_rgba(245,158,11,0.1)]',
          text: 'text-brand-amber',
          bg: 'bg-brand-amber',
          icon: <AlertTriangle className="w-4 h-4 text-brand-amber animate-bounce-slow" />
        };
      default:
        return {
          border: 'border-slate-100',
          text: 'text-brand-success',
          bg: 'bg-brand-success',
          icon: <CheckCircle2 size={16} className="text-brand-success" />
        };
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* EXECUTIVE SIDEBAR */}
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20">
        <div className="p-8">
          <Link to="/" className="flex flex-col space-y-1">
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-brand-gold"></div>
            </div>
            <span className="text-white font-serif font-bold tracking-tight text-lg mt-2 uppercase tracking-tighter text-nowrap">Classic Homes</span>
          </Link>
        </div>
        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/sourcing-hub" />
          <NavItem icon={<Layers size={18} />} label="Projects" to="/projects" />
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size={18} />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Vetted Suppliers" active />
          <NavItem icon={<Settings2 size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
              className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" 
              alt="V. Sterling" 
            />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-grow flex flex-col overflow-y-auto relative">
        {/* TOP BAR SEARCH & ACTIONS */}
        <div className="bg-white border-b border-slate-200 px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-0 z-30 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">Vetted Global Network</h1>
            <div className="flex items-center space-x-2 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">
               <span>Verified Partnerships</span>
               <span className="w-1 h-1 bg-brand-gold rounded-full"></span>
               <span className="text-brand-mutedGray">Risk-Adjusted Portfolio</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 w-full md:w-auto">
            <GlobalSearch />
            
            {/* VIEW TOGGLE CONTROL - Segmented HUD Style */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center shadow-inner border border-slate-200">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white text-brand-darkNavy shadow-md scale-[1.02]' 
                    : 'text-brand-mutedGray hover:text-brand-darkNavy'
                }`}
              >
                <Grid size={14} />
                <span>Grid</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  viewMode === 'map' 
                    ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/20 scale-[1.02]' 
                    : 'text-brand-mutedGray hover:text-brand-darkNavy'
                }`}
              >
                <MapIcon size={14} />
                <span>Risk Map</span>
              </button>
            </div>

            <button className="flex items-center justify-center p-2.5 bg-brand-navy text-white rounded-lg hover:bg-brand-darkNavy transition-all shadow-lg shadow-brand-navy/10">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-grow flex flex-col min-h-0">
          {viewMode === 'grid' ? (
            <div className="px-12 py-12 space-y-12 animate-in fade-in duration-500">
              {/* NETWORK INTELLIGENCE STATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Verified Artisans</p><p className="text-3xl font-serif font-bold text-brand-darkNavy">1,248</p></div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500"><Users size={24} /></div>
                 </div>
                 <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Avg. Trust Score</p><p className="text-3xl font-serif font-bold text-brand-darkNavy">98.4%</p></div>
                    <div className="w-12 h-12 bg-brand-success/10 rounded-xl flex items-center justify-center text-brand-success"><ShieldCheck size={24} /></div>
                 </div>
                 <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between">
                    <div><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Aggregated Risk</p><p className="text-3xl font-serif font-bold text-brand-success">MINIMAL</p></div>
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><TrendingUp size={24} /></div>
                 </div>
              </div>

              {/* SUPPLIER MARKETPLACE GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {SUPPLIERS.map((supplier) => {
                  const riskStyles = getRiskStyles(supplier.risk);
                  return (
                    <div key={supplier.id} className={`bg-white border ${riskStyles.border} rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full relative`}>
                      {(supplier.risk === 'Medium Risk' || supplier.risk === 'High Risk') && (
                        <div className="absolute top-4 left-4 z-10"><div className={`p-1.5 rounded-full ${supplier.risk === 'High Risk' ? 'bg-red-50' : 'bg-brand-amber/10'} border border-current`}>{riskStyles.icon}</div></div>
                      )}
                      <div className="p-8 space-y-6 flex-grow flex flex-col">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col items-center space-y-4 w-full">
                            <div className="relative">
                              <img src={supplier.image} alt={supplier.name} className="w-20 h-20 rounded-full object-cover border-2 border-brand-gold/10 group-hover:border-brand-gold transition-colors duration-500" />
                              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md">{riskStyles.icon}</div>
                            </div>
                            <div className="text-center">
                              <h3 className="text-xl font-serif font-bold text-brand-darkNavy tracking-tight leading-tight">{supplier.name}</h3>
                              <p className="text-[10px] text-brand-mutedGray font-black uppercase tracking-[0.2em] mt-1">{supplier.location}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-4 border-y border-slate-50">
                          <span className="text-[11px] font-bold text-brand-darkNavy uppercase tracking-wider">{supplier.specialty}</span>
                          <div className="flex items-center space-x-1.5"><Star size={12} className="text-brand-gold fill-brand-gold" /><span className="text-xs font-black text-brand-darkNavy">{supplier.rating}</span></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-2">
                          <div className="space-y-2 border-r border-slate-100 pr-2">
                            <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Risk Index</span>
                            <div className="flex items-center space-x-1.5"><div className={`w-1.5 h-1.5 rounded-full ${riskStyles.bg}`}></div><span className={`text-[10px] font-black uppercase tracking-tight ${riskStyles.text}`}>{supplier.risk.split(' ')[0]}</span></div>
                          </div>
                          <div className="space-y-2 pl-2">
                            <div className="flex justify-between items-center"><span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Capacity</span><span className="text-[10px] font-bold text-brand-darkNavy">{supplier.capacity}%</span></div>
                            <div className="h-1 bg-slate-50 rounded-full overflow-hidden mt-1"><div className={`h-full transition-all duration-1000 ${supplier.capacity > 80 ? 'bg-brand-amber' : 'bg-brand-navy'}`} style={{ width: `${supplier.capacity}%` }}></div></div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">{supplier.tags.map((tag) => (<span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-black text-brand-mutedGray uppercase tracking-tighter">{tag}</span>))}</div>
                        <div className="pt-6 mt-auto space-y-3">
                          <button onClick={() => handleRequestQuote(supplier)} className="w-full py-4 bg-brand-gold text-brand-darkNavy text-[10px] font-black uppercase tracking-[0.2em] rounded-md hover:bg-brand-goldHover transition-all duration-300 shadow-lg shadow-brand-gold/10 flex items-center justify-center space-x-2 transform active:scale-95"><MessageSquare size={14} className="fill-brand-darkNavy" /><span>Request Quote</span></button>
                          <button className="w-full py-3.5 border border-slate-200 text-brand-mutedGray text-[9px] font-black uppercase tracking-[0.2em] rounded-md hover:bg-slate-50 hover:text-brand-darkNavy transition-all duration-300 flex items-center justify-center space-x-2 group/btn"><span>View Audit History</span><ExternalLink size={12} className="opacity-40 group-hover/btn:opacity-100" /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ENHANCED RISK MAP VIEW - Dark HUD Theme */
            <div className="flex-grow relative bg-[#050B15] overflow-hidden animate-in zoom-in-95 duration-700 flex flex-col">
              
              {/* Abstract High-Tech Map Background */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                 <div className="absolute inset-0" style={{ 
                   backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.05) 1px, transparent 0)', 
                   backgroundSize: '30px 30px' 
                 }}></div>
                 <svg className="w-full h-full text-brand-gold/10 fill-none" viewBox="0 0 1000 500">
                    <path d="M50,150 Q200,80 350,180 T650,150 T950,250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
                    <path d="M100,350 Q300,300 500,400 T900,350" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
                    <circle cx="200" cy="180" r="120" stroke="currentColor" strokeWidth="0.25" opacity="0.5" />
                    <circle cx="750" cy="250" r="180" stroke="currentColor" strokeWidth="0.25" opacity="0.5" />
                    <circle cx="450" cy="350" r="100" stroke="currentColor" strokeWidth="0.25" opacity="0.5" />
                 </svg>
              </div>

              {/* Institutional HUD HUD Indicators */}
              <div className="absolute top-12 left-12 z-20 space-y-6">
                 <div className="bg-[#0A1628]/90 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl space-y-5 shadow-2xl min-w-[280px]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                       <div className="flex items-center space-x-3">
                          <Globe className="text-brand-gold w-5 h-5 animate-pulse" />
                          <span className="text-[11px] font-black text-white uppercase tracking-[0.25em]">Chain Resilience</span>
                       </div>
                       <div className="w-2 h-2 rounded-full bg-brand-success shadow-[0_0_10px_#10B981]"></div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <span className="text-[9px] font-black text-brand-offWhite/30 uppercase tracking-widest">Global Stability Index</span>
                          <span className="text-lg font-serif font-bold text-white">92.4</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-gold w-[92.4%] shadow-[0_0_10px_#D4AF37]"></div>
                       </div>
                       <div className="grid grid-cols-2 gap-4 pt-2">
                          <LegendItem color="bg-brand-success" label="Secure Nodes" />
                          <LegendItem color="bg-brand-amber" label="Critical Watch" />
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center space-x-4">
                    <div className="bg-brand-navy/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-brand-gold/20 flex items-center space-x-3">
                       <Activity size={14} className="text-brand-gold" />
                       <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Scan Rate: 1.2Hz</span>
                    </div>
                    <div className="bg-brand-navy/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 flex items-center space-x-3">
                       <Zap size={14} className="text-brand-success" />
                       <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">AI Forecast On</span>
                    </div>
                 </div>
              </div>

              {/* Supply Chain Node Markers */}
              <div className="relative w-full h-[calc(100vh-140px)] cursor-crosshair">
                 {SUPPLIERS.map((supplier) => {
                   const riskStyles = getRiskStyles(supplier.risk);
                   const isHovered = hoveredSupplier?.id === supplier.id;
                   
                   return (
                     <div 
                       key={supplier.id}
                       className="absolute transition-all duration-700 z-10"
                       style={{ left: `${supplier.coords.x}%`, top: `${supplier.coords.y}%` }}
                       onMouseEnter={() => setHoveredSupplier(supplier)}
                       onMouseLeave={() => setHoveredSupplier(null)}
                     >
                        {/* Interactive Range Rings */}
                        <div className={`absolute -inset-10 border border-current opacity-[0.05] rounded-full scale-150 animate-pulse transition-all ${riskStyles.text} ${isHovered ? 'scale-[2] opacity-10' : ''}`}></div>
                        <div className={`absolute -inset-6 rounded-full opacity-20 animate-ping ${riskStyles.bg}`}></div>
                        
                        {/* High-Fidelity HUD Marker */}
                        <div className={`relative p-3 rounded-full cursor-pointer border-2 transition-all duration-500 hover:scale-125 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center ${riskStyles.bg} ${riskStyles.border} ${isHovered ? 'ring-4 ring-white/10' : ''}`}>
                           {supplier.risk === 'Low Risk' ? <ShieldCheck className="w-5 h-5 text-white" /> : 
                            supplier.risk === 'Medium Risk' ? <AlertTriangle className="w-5 h-5 text-white" /> : 
                            <ShieldAlert className="w-5 h-5 text-white" />}
                           
                           {/* Pulse Dot */}
                           <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                        </div>

                        {/* Interactive Data Terminal (on hover) */}
                        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-6 transition-all duration-500 transform ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
                           <div className="bg-brand-darkNavy/95 backdrop-blur-3xl rounded-[2rem] border border-white/10 w-[300px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden">
                              <div className="p-7 space-y-6">
                                 <div className="flex items-center space-x-4">
                                    <div className="relative">
                                       <img src={supplier.image} className="w-14 h-14 rounded-2xl object-cover border border-white/10" alt={supplier.name} />
                                       <div className={`absolute -bottom-1 -right-1 p-1 rounded-full bg-white shadow-xl scale-75`}>{riskStyles.icon}</div>
                                    </div>
                                    <div>
                                       <h4 className="text-sm font-black text-white leading-none mb-1.5">{supplier.name}</h4>
                                       <div className="flex items-center space-x-2">
                                          <MapPin size={10} className="text-brand-gold" />
                                          <span className="text-[9px] text-brand-offWhite/40 uppercase tracking-[0.2em] font-bold">{supplier.location}</span>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-6 pt-5 border-t border-white/5">
                                    <div className="space-y-1">
                                       <span className="text-[9px] font-black text-brand-offWhite/20 uppercase tracking-widest">Throughput</span>
                                       <div className="flex items-center space-x-2">
                                          <TrendingUp size={12} className="text-brand-success" />
                                          <span className="text-sm font-bold text-white">{supplier.capacity}%</span>
                                       </div>
                                    </div>
                                    <div className="space-y-1">
                                       <span className="text-[9px] font-black text-brand-offWhite/20 uppercase tracking-widest">Asset Rating</span>
                                       <div className="flex items-center space-x-2">
                                          <Star size={12} className="text-brand-gold fill-brand-gold" />
                                          <span className="text-sm font-bold text-white">{supplier.rating} / 5.0</span>
                                       </div>
                                    </div>
                                 </div>

                                 <button 
                                   onClick={(e) => { e.stopPropagation(); handleRequestQuote(supplier); }}
                                   className="w-full py-4 bg-brand-gold text-brand-darkNavy text-[10px] font-black uppercase tracking-[0.25em] rounded-xl hover:bg-white transition-all flex items-center justify-center space-x-3 shadow-xl shadow-brand-gold/5"
                                 >
                                    <MessageSquare size={14} className="fill-brand-darkNavy" />
                                    <span>Execute RFP Sequence</span>
                                 </button>
                              </div>
                           </div>
                           {/* Stem decoration */}
                           <div className="w-4 h-4 bg-brand-darkNavy border-r border-b border-white/10 rotate-45 mx-auto -mt-2"></div>
                        </div>
                     </div>
                   );
                 })}
              </div>

              {/* Map Information Footer - HUD Style */}
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="bg-[#0A1628]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-10">
                   <div className="flex items-center space-x-12">
                      <div className="flex flex-col space-y-2">
                         <span className="text-[9px] font-black text-brand-offWhite/20 uppercase tracking-[0.3em]">Institutional Feed</span>
                         <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 rounded-full bg-brand-success shadow-[0_0_10px_#10B981]"></div>
                            <span className="text-sm font-bold text-white">Supply Chain Verified: 1,248 Nodes Active</span>
                         </div>
                      </div>
                      <div className="hidden lg:block w-px h-12 bg-white/10"></div>
                      <div className="hidden lg:flex flex-col space-y-2">
                         <span className="text-[9px] font-black text-brand-offWhite/20 uppercase tracking-[0.3em]">Critical Anomalies</span>
                         <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-sm font-bold text-red-400">1 Logistical Hold (Nordic-Hub)</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center space-x-6">
                      <div className="text-right hidden sm:block">
                         <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Risk Analysis API v4</p>
                         <p className="text-[9px] text-brand-offWhite/30 uppercase tracking-widest mt-1">Last Update: 04:12 GMT</p>
                      </div>
                      <button className="flex items-center space-x-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.25em] hover:bg-white/10 hover:border-brand-gold transition-all group shadow-xl">
                         <Maximize2 size={16} className="text-brand-gold group-hover:scale-110 transition-transform" />
                         <span>Full Spatial Intelligence</span>
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SETTLEMENT FOOTER - Luxury Persistence */}
        <div className="bg-brand-darkNavy py-12 px-12 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity duration-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center space-x-3">
                <Lock size={14} className="text-brand-gold" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Institutional Settlement Channels</span>
             </div>
             <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-white uppercase tracking-[0.2em]">
                <span className="flex items-center space-x-2"><Globe size={14} /> <span>SWIFT / SEPA</span></span>
                <span className="flex items-center space-x-2"><TrendingUp size={14} /> <span>Corporate Treasury</span></span>
                <span className="flex items-center space-x-2"><ShieldCheck size={14} /> <span>Letter of Credit</span></span>
                <span className="flex items-center space-x-2"><ArrowRight size={14} /> <span>Smart Contract</span></span>
             </div>
          </div>
        </div>
      </main>

      {/* QUOTE REQUEST MODAL */}
      {isQuoteModalOpen && selectedSupplier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darkNavy/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-slate-100 transform animate-in slide-in-from-bottom-8 duration-500">
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brand-darkNavy flex items-center justify-center text-brand-gold"><Lock size={20} /></div>
                <div>
                   <h3 className="text-lg font-serif font-bold text-brand-darkNavy">Institutional Quote Dispatch</h3>
                   <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Supplier: {selectedSupplier.name}</p>
                </div>
              </div>
              <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} className="text-brand-mutedGray" /></button>
            </div>

            <form onSubmit={submitQuoteRequest} className="p-8 space-y-6">
              {quoteSuccess ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-brand-success/10 rounded-full flex items-center justify-center text-brand-success"><CheckCircle2 size={32} /></div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-serif font-bold text-brand-darkNavy">Dispatch Successful</h4>
                    <p className="text-sm text-brand-mutedGray">RFP-2025-Q1 sequence has been initiated with {selectedSupplier.name}.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Project Association</label>
                    <div className="relative">
                      <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-brand-darkNavy outline-none appearance-none focus:ring-1 focus:ring-brand-gold transition-all">
                        <option value="">Select Target Project...</option>
                        {MOCK_PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mutedGray pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Scope Specifications</label>
                    <textarea placeholder="Detail the materials, quantities, and delivery milestones required..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-brand-darkNavy outline-none focus:ring-1 focus:ring-brand-gold transition-all min-h-[120px] resize-none"></textarea>
                  </div>
                  <div className="p-4 bg-brand-gold/5 rounded-xl border border-brand-gold/20 flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <p className="text-[10px] text-brand-darkNavy font-medium leading-relaxed uppercase tracking-tight">By dispatching this request, you initiate a secure communication channel through the Classic Homes Enterprise Bridge.</p>
                  </div>
                  <button disabled={isSending} type="submit" className="w-full py-5 bg-brand-darkNavy text-white text-xs font-black uppercase tracking-[0.25em] rounded-xl hover:bg-black transition-all shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50">
                    {isSending ? (<><Loader2 size={16} className="animate-spin text-brand-gold" /><span>Encrypting Message...</span></>) : (<><Send size={16} className="text-brand-gold" /><span>Dispatch RFP Sequence</span></>)}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* CONCIERGE */}
      <div className="fixed bottom-10 right-10 z-50">
         <div className="bg-brand-darkNavy p-3 rounded-2xl border border-brand-gold/30 shadow-2xl flex items-center space-x-4 cursor-pointer hover:scale-105 transition-all group">
            <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
               <MessageSquare size={20} className="fill-brand-darkNavy text-brand-darkNavy" />
            </div>
            <div className="pr-4">
               <span className="block text-[10px] text-brand-gold font-black uppercase tracking-widest leading-none mb-1 text-nowrap">Concierge</span>
               <span className="block text-xs text-white/60 font-medium text-nowrap">Priority Support</span>
            </div>
         </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link 
    to={to || '#'} 
    className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/10' 
        : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>
      {icon}
    </div>
    <span className="text-xs font-bold tracking-wider">{label}</span>
  </Link>
);

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center space-x-3">
    <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
    <span className="text-[10px] font-black text-brand-offWhite/40 uppercase tracking-widest">{label}</span>
  </div>
);
