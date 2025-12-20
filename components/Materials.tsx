
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings, 
  CheckCircle2, ShieldCheck, ArrowLeft, Filter as FilterIcon, ChevronDown, 
  Sparkles, Eye, History, MessageSquare, Zap, Loader2, X, Database, Globe, 
  ArrowRight, TrendingUp, Fingerprint, Search, SlidersHorizontal, FileText, 
  Activity, Cpu, Lock, MapPin, Clock, ShieldAlert, ArrowUpRight
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
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
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
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-brand-gold"></div>
            </div>
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
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0"><span className="text-white text-xs font-bold truncate">V. Sterling</span><span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest font-black">Chief Procurement</span></div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <div className="max-w-[1600px] mx-auto w-full px-12 py-12 space-y-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="space-y-6">
              <Link to="/projects" className="flex items-center space-x-2 text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.2em] hover:text-brand-gold transition-colors mb-4">
                <ArrowLeft size={12} />
                <span>Back to Specs</span>
              </Link>
              <h1 className="text-5xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">AI-Matched Materials</h1>
              <p className="text-brand-mutedGray text-sm max-w-md">Institutional-grade provenance matches for "Sterling Residence." Validated against 1,248 global artisan nodes.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
               {/* CAPITAL ADVANTAGE HUD */}
               <div className="bg-brand-gold/5 border border-brand-gold/20 px-8 py-5 rounded-[2rem] flex items-center space-x-8 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.3em]">Projected Yield Improvement</span>
                    <p className="text-2xl font-mono font-black text-brand-darkNavy">+$842,500 <span className="text-brand-success text-xs font-bold">↑ 18.4%</span></p>
                  </div>
                  <div className="w-px h-8 bg-brand-gold/20"></div>
                  <TrendingUp className="text-brand-gold" size={24} />
               </div>

              <div className="relative group">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border border-brand-navy/10 rounded-xl pl-10 pr-10 py-4 text-xs font-black text-brand-darkNavy appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all shadow-sm uppercase tracking-widest">
                  <option>Best Match</option>
                  <option>Lowest Risk</option>
                  <option>Soonest Delivery</option>
                  <option>Highest Value</option>
                </select>
                <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-gold" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-mutedGray pointer-events-none" />
              </div>
              <button onClick={() => setIsFilterOpen(true)} className="flex items-center space-x-3 px-6 py-4 bg-brand-navy text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                <FilterIcon size={14} />
                <span>Filter Nodes</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredAndSortedMaterials.map((material, idx) => (
              <div key={material.id} className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 group flex flex-col h-full shadow-sm animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex items-center justify-center">
                  {activeGeneratingId === material.id && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-20 bg-brand-darkNavy/80 backdrop-blur-md">
                      <Loader2 size={24} className="text-brand-gold animate-spin" />
                      <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em] animate-pulse">Synthesizing High-Res Spec...</span>
                    </div>
                  )}
                  <img src={material.image} alt={material.name} onLoad={() => setLoadedImages(p => ({ ...p, [material.id]: true }))} className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-[2000ms] ${loadedImages[material.id] ? 'opacity-100' : 'opacity-0'}`} />
                  <div className="absolute top-6 right-6 bg-brand-darkNavy/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-brand-gold/30 shadow-xl z-10">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{material.matchScore}% INTEL MATCH</span>
                  </div>
                  <button onClick={() => generateTexture(material.id, material.name)} className="absolute top-6 left-6 flex items-center space-x-2 bg-white/95 hover:bg-white backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl transition-all group/btn shadow-lg z-10 active:scale-95">
                    <Sparkles size={14} className="text-brand-gold" />
                    <span className="text-[9px] font-black text-brand-darkNavy uppercase tracking-widest">BESPOKE RENDER</span>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-darkNavy/90 via-brand-darkNavy/20 to-transparent pt-16 pb-8 px-10 flex items-center space-x-3 z-10">
                    <ShieldCheck size={18} className="text-brand-gold" />
                    <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.25em]">PROVENANCE SEALED</span>
                  </div>
                </div>

                <div className="p-10 space-y-10 flex-grow flex flex-col">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-serif font-bold text-brand-darkNavy leading-tight tracking-tight">{material.name}</h3>
                      <div className="px-3 py-1 bg-brand-success/5 border border-brand-success/10 rounded-lg flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-success shadow-[0_0_10px_#10B981]"></div>
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
                    <button onClick={() => setActiveAuditId(material.id)} className="w-full bg-white border border-slate-200 text-brand-darkNavy font-black text-[10px] uppercase tracking-[0.25em] py-5 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 shadow-sm transform active:scale-95">
                      <History size={18} className="text-brand-gold opacity-50" />
                      <span>SECURE AUDIT CHAIN</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COMPREHENSIVE INSTITUTIONAL FOOTER */}
          <footer className="mt-24 pt-20 border-t border-slate-200 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
              <div className="space-y-8 col-span-1">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center rounded-sm">
                       <div className="w-5 h-5 bg-brand-gold"></div>
                    </div>
                    <span className="text-xl font-serif font-bold text-brand-darkNavy uppercase tracking-tighter leading-none">Classic Homes</span>
                 </div>
                 <p className="text-xs text-brand-mutedGray leading-relaxed font-medium uppercase tracking-widest max-w-[200px]">Enterprise Procurement Integrity for Global Artisan Sourcing.</p>
                 <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
                    <ShieldCheck size={16} />
                    <span>SOC2 TYPE II COMPLIANT</span>
                 </div>
              </div>
              <div className="space-y-8">
                 <h5 className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.4em]">Corporate Governance</h5>
                 <ul className="space-y-5">
                    <li><FooterLink label="Privacy Sovereign Protocol" to="/privacy-policy" /></li>
                    <li><FooterLink label="Institutional Terms" to="/terms-of-service" /></li>
                    <li><FooterLink label="Boardroom Analytics" to="/analytics" /></li>
                 </ul>
              </div>
              <div className="space-y-8">
                 <h5 className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.4em]">Market Intelligence</h5>
                 <ul className="space-y-5">
                    <li><FooterLink label="Vetted Network Nodes" to="/network" /></li>
                    <li><FooterLink label="Supply Chain Advisory" to="/executive-command" /></li>
                    <li><FooterLink label="Material Provenance Hub" to="/materials" /></li>
                 </ul>
              </div>
              <div className="space-y-10">
                 <h5 className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.4em]">Priority Concierge</h5>
                 <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Dedicated support node active for Q4 Treasury Cycles.</p>
                    <button className="w-full py-4 bg-brand-darkNavy text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-black transition-all shadow-xl">Initialize Bridge</button>
                 </div>
              </div>
            </div>
            <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
               <p className="text-[9px] font-black text-brand-darkNavy uppercase tracking-[0.3em]">&copy; 2025 CLASSIC HOMES MARKETPLACE INC.</p>
               <div className="flex items-center space-x-8">
                  <span className="text-[9px] font-black text-brand-darkNavy uppercase tracking-[0.3em]">Build: v2.5.42-Stable</span>
                  <span className="text-[9px] font-black text-brand-darkNavy uppercase tracking-[0.3em]">Region: GLOBAL-TREASURY-01</span>
               </div>
            </div>
          </footer>
        </div>
      </main>

      {/* FILTER DRAWER */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
           <div className="absolute inset-0 bg-brand-darkNavy/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsFilterOpen(false)}></div>
           <div className="relative w-full max-w-sm bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 p-12 overflow-y-auto">
              <div className="flex items-center justify-between mb-16">
                 <h3 className="text-3xl font-serif font-bold text-brand-darkNavy uppercase tracking-tight">Market Nodes</h3>
                 <button onClick={() => setIsFilterOpen(false)} className="p-3 hover:bg-slate-50 rounded-full transition-colors"><X size={28} /></button>
              </div>
              <div className="space-y-12">
                 <div className="space-y-5">
                    <label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest ml-1">Asset Domains</label>
                    <div className="space-y-3">
                       {['All', 'Natural Stone', 'Sustainable Wood', 'Structural Metal', 'Glazing'].map(cat => (
                         <button key={cat} onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }} className={`w-full flex items-center justify-between px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? 'bg-brand-darkNavy text-white border-brand-darkNavy shadow-xl' : 'bg-slate-50 border-slate-100 text-brand-darkNavy hover:bg-slate-100'}`}>
                           <span>{cat}</span>
                           {activeCategory === cat && <CheckCircle2 size={16} className="text-brand-gold" />}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* PROVENANCE LEDGER MODAL */}
      {activeAuditId && activeAuditMaterial && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-brand-darkNavy/95 backdrop-blur-2xl animate-in fade-in duration-500">
           <div className="w-full max-w-2xl bg-white rounded-[3.5rem] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.8)] relative border border-brand-gold/20">
              <div className="p-12 space-y-12">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-10">
                    <div className="flex items-center space-x-6">
                       <div className="p-5 bg-brand-gold/10 rounded-[1.8rem] border border-brand-gold/20 relative group"><Globe size={32} className="text-brand-gold" /></div>
                       <div>
                          <h3 className="text-2xl font-serif font-bold text-brand-darkNavy uppercase tracking-tight">Provenance Ledger</h3>
                          <span className="text-[9px] font-mono font-bold text-brand-gold uppercase tracking-widest mt-1 block">CH-PROV-{activeAuditId}-NODE-01</span>
                       </div>
                    </div>
                    <button onClick={() => setActiveAuditId(null)} className="p-3 hover:bg-slate-50 rounded-full transition-all"><X size={32} className="text-slate-300" /></button>
                 </div>
                 <div className="relative pl-12 space-y-10">
                    <div className="absolute left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-brand-success via-brand-gold to-slate-100 rounded-full"></div>
                    <AuditStep status="verified" label="Extraction Site Authenticated" time="2025-02-14 09:12 GMT" sub={activeAuditMaterial.location} />
                    <AuditStep status="verified" label="Quality Core Audit" time="2025-02-15 11:45 GMT" sub={activeAuditMaterial.supplier} />
                    <AuditStep status="active" label="Logistics Telemetry" time="LIVE MONITORING" sub="Node Carrara-Terminal-01" />
                 </div>
                 <div className="bg-brand-darkNavy rounded-[2.5rem] p-10 flex items-center justify-between group">
                    <div className="flex items-center space-x-6">
                       <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl flex items-center justify-center"><Fingerprint className="text-brand-gold" size={32} /></div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Auth Verification Signature</p>
                          <p className="text-sm font-mono font-bold text-white uppercase tracking-widest">0x{Math.random().toString(16).slice(2, 12).toUpperCase()}</p>
                       </div>
                    </div>
                    <div className="flex items-center space-x-3 px-5 py-2 bg-brand-success/10 border border-brand-success/30 rounded-xl text-brand-success">
                       <div className="w-2 h-2 rounded-full bg-brand-success shadow-[0_0_10px_#10B981] animate-pulse"></div>
                       <span className="text-[9px] font-black uppercase tracking-widest">Sealed</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-xl shadow-brand-gold/10' : 'text-brand-offWhite/30 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-black uppercase tracking-widest leading-none">{label}</span>
  </Link>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to} className="group flex items-center space-x-3 text-brand-mutedGray hover:text-brand-gold transition-all duration-300">
     <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
     <span className="text-[11px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </Link>
);

const AuditStep: React.FC<{ status: 'verified' | 'active'; label: string; time: string; sub: string }> = ({ status, label, time, sub }) => (
  <div className="relative pl-10">
     <div className={`absolute left-[-26px] top-1 w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center transition-all ${status === 'verified' ? 'bg-brand-success border-brand-success shadow-[0_0_15px_#10B981]' : 'bg-brand-gold border-brand-gold animate-pulse'}`}>
        {status === 'verified' ? <CheckCircle2 size={12} className="text-white" /> : <Zap size={12} className="text-brand-darkNavy fill-brand-darkNavy" />}
     </div>
     <div className="space-y-1">
        <p className="text-sm font-black text-brand-darkNavy uppercase tracking-tight">{label}</p>
        <div className="flex items-center space-x-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
           <span className="bg-slate-100 px-2 py-0.5 rounded">{time}</span>
           <span className="text-brand-gold/60">{sub}</span>
        </div>
     </div>
  </div>
);
