
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings, 
  CheckCircle2, ShieldCheck, ArrowLeft, Filter as FilterIcon, ChevronDown, 
  Sparkles, Eye, History, MessageSquare, Zap, Loader2, X, Database, Globe, 
  ArrowRight, TrendingUp, Fingerprint, Search, SlidersHorizontal, FileText, 
  Activity, Cpu, Lock, MapPin, Clock, ShieldAlert, ArrowUpRight, Image as ImageIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const INITIAL_MATERIALS = [
  {
    id: 1,
    name: 'Calacatta Oro Marble',
    location: 'Carrara, Italy',
    supplier: 'Tuscany Stoneworks',
    matchScore: 94,
    price: 395,
    leadTime: 8,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1200&auto=format&fit=crop',
    tags: ['±0.02mm Tol', 'FSC Certified'],
    risk: 'Low',
    category: 'Natural Stone'
  },
  {
    id: 2,
    name: 'Statuario Venato',
    location: 'Tuscany, Italy',
    supplier: 'Apex Materials',
    matchScore: 91,
    price: 420,
    leadTime: 12,
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1200&auto=format&fit=crop',
    tags: ['LEED Platinum', 'Hand-Picked'],
    risk: 'Medium',
    category: 'Natural Stone'
  },
  {
    id: 3,
    name: 'Arabescato Corchia',
    location: 'Apuan Alps, Italy',
    supplier: 'Global Stone Imports',
    matchScore: 86,
    price: 310,
    leadTime: 6,
    image: 'https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?q=80&w=1200&auto=format&fit=crop',
    tags: ['Net Zero Log', 'High Gloss'],
    risk: 'Low',
    category: 'Natural Stone'
  }
];

export const Materials: React.FC = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [activeGeneratingId, setActiveGeneratingId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeAuditId, setActiveAuditId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('Best Match');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredAndSortedMaterials = useMemo(() => {
    let result = materials.filter(m => activeCategory === 'All' || m.category === activeCategory);
    if (sortBy === 'Lowest Risk') result.sort((a, b) => (a.risk === 'Low' ? -1 : 1));
    else if (sortBy === 'Soonest Delivery') result.sort((a, b) => a.leadTime - b.leadTime);
    else if (sortBy === 'Highest Value') result.sort((a, b) => b.price - a.price);
    return result;
  }, [materials, sortBy, activeCategory]);

  const generateTexture = async (id: number, name: string) => {
    setActiveGeneratingId(id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: `High resolution macro texture of ${name}. Realistic luxury interior design sample.` }] }],
      });
      let newUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) newUrl = `data:image/png;base64,${part.inlineData.data}`;
      }
      if (newUrl) setMaterials(prev => prev.map(m => m.id === id ? { ...m, image: newUrl } : m));
    } finally {
      setActiveGeneratingId(null);
    }
  };

  const activeAuditMaterial = materials.find(m => m.id === activeAuditId);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20 shrink-0">
        <div className="p-8">
          <Link to="/" className="flex flex-col space-y-1">
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm"><div className="w-4 h-4 bg-brand-gold"></div></div>
            <span className="text-white font-serif font-bold tracking-tight text-lg mt-2 uppercase tracking-tighter">Classic Homes</span>
          </Link>
        </div>
        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/sourcing-hub" />
          <NavItem icon={<Layers size={18} />} label="Projects" to="/projects" />
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" active />
          <NavItem icon={<Box size={18} />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Suppliers" to="/network" />
          <NavItem icon={<Settings size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0"><span className="text-white text-xs font-bold truncate">V. Sterling</span><span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest font-black">Chief Procurement</span></div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <div className="max-w-[1600px] mx-auto w-full px-12 py-12 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="space-y-6">
              <Link to="/projects" className="flex items-center space-x-2 text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.2em] hover:text-brand-gold transition-colors mb-4"><ArrowLeft size={12} /><span>Back to Specs</span></Link>
              <h1 className="text-5xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">AI-Matched Materials</h1>
              <p className="text-brand-mutedGray text-sm max-w-md">Institutional-grade provenance matches for "Sterling Residence." Validated against 1,248 global artisan nodes.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
               <div className="bg-brand-gold/5 border border-brand-gold/20 px-8 py-5 rounded-[2rem] flex items-center space-x-8 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.3em]">Projected Yield Improvement</span>
                    <p className="text-2xl font-mono font-black text-brand-darkNavy">+$842,500 <span className="text-brand-success text-xs font-bold">↑ 18.4%</span></p>
                  </div>
                  <TrendingUp className="text-brand-gold" size={24} />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredAndSortedMaterials.map((material, idx) => {
              const isBroken = imageErrors[material.id];
              return (
                <div key={material.id} className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-700 group flex flex-col h-full shadow-sm animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 flex items-center justify-center">
                    {activeGeneratingId === material.id && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-20 bg-brand-darkNavy/80 backdrop-blur-md">
                        <Loader2 size={24} className="text-brand-gold animate-spin" />
                        <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em] animate-pulse">Synthesizing High-Res Spec...</span>
                      </div>
                    )}
                    
                    {!isBroken ? (
                      <img 
                        src={material.image} 
                        alt={material.name} 
                        onLoad={() => setLoadedImages(p => ({ ...p, [material.id]: true }))} 
                        onError={() => {
                          setImageErrors(p => ({ ...p, [material.id]: true }));
                          setLoadedImages(p => ({ ...p, [material.id]: true }));
                        }}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-[2000ms] ${loadedImages[material.id] ? 'opacity-100' : 'opacity-0'}`} 
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-brand-gold/20">
                        <ImageIcon size={48} />
                        <span className="text-[10px] font-black uppercase mt-4 tracking-widest">Asset Unreachable</span>
                      </div>
                    )}

                    {!loadedImages[material.id] && !isBroken && (
                       <div className="absolute inset-0 bg-slate-100 animate-pulse"></div>
                    )}

                    <div className="absolute top-6 right-6 bg-brand-darkNavy/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-brand-gold/30 shadow-xl z-10">
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">{material.matchScore}% INTEL MATCH</span>
                    </div>
                  </div>

                  <div className="p-10 space-y-10 flex-grow flex flex-col">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-serif font-bold text-brand-darkNavy leading-tight tracking-tight">{material.name}</h3>
                        <div className="px-3 py-1 bg-brand-success/5 border border-brand-success/10 rounded-lg flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-success"></div>
                          <span className="text-[8px] font-black text-brand-success uppercase tracking-widest">Active Node</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-brand-mutedGray">
                        <MapPin size={12} className="text-brand-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{material.location} • {material.supplier}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 py-8 border-y border-slate-100">
                      <div className="space-y-2">
                        <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Allocation Basis</span>
                        <p className="text-2xl font-mono font-bold text-brand-darkNavy">${material.price}<span className="text-xs text-brand-mutedGray font-normal"> /sq ft</span></p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Settlement Period</span>
                        <p className="text-2xl font-mono font-bold text-brand-darkNavy">{material.leadTime}<span className="text-xs text-brand-mutedGray font-normal"> weeks</span></p>
                      </div>
                    </div>

                    <div className="space-y-4 mt-auto">
                      <button onClick={() => navigate('/executive-command', { state: { activeMaterial: material } })} className="w-full bg-brand-gold hover:bg-brand-goldHover text-brand-darkNavy font-black text-[12px] uppercase tracking-[0.3em] py-6 rounded-3xl transition-all flex items-center justify-center space-x-4 shadow-2xl transform active:scale-95 group/vis">
                        <span>INITIALIZE VISUALIZATION</span>
                        <Eye size={20} className="group-hover/vis:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-xl shadow-brand-gold/10' : 'text-brand-offWhite/30 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-black uppercase tracking-widest leading-none">{label}</span>
  </Link>
);
