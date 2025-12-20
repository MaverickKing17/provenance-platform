
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Box,
  Wallet, 
  BarChart3, 
  Users, 
  Settings, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  Filter as FilterIcon,
  ChevronDown,
  Sparkles,
  Eye,
  History,
  MessageSquare,
  Zap,
  Loader2,
  X,
  Database,
  Globe,
  ArrowRight,
  TrendingUp,
  Fingerprint,
  Search,
  SlidersHorizontal,
  FileText
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
  
  // Modals & UI States
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeAuditId, setActiveAuditId] = useState<number | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  
  // Logic States
  const [customPrompt, setCustomPrompt] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [sortBy, setSortBy] = useState('Best Match');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredAndSortedMaterials = useMemo(() => {
    let result = materials.filter(m => activeCategory === 'All' || m.category === activeCategory);
    
    if (sortBy === 'Lowest Risk') {
      result.sort((a, b) => (a.risk === 'Low' ? -1 : 1));
    } else if (sortBy === 'Soonest Delivery') {
      result.sort((a, b) => a.leadTime - b.leadTime);
    } else if (sortBy === 'Highest Value') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [materials, sortBy, activeCategory]);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const generateTexture = async (id: number, name: string) => {
    setActiveGeneratingId(id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: `High resolution, seamless architectural macro texture of ${name}. Luxury interior design sample, realistic lighting, fine detail.` }] }],
      });

      let newUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          newUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }

      if (newUrl) {
        setMaterials(prev => prev.map(m => m.id === id ? { ...m, image: newUrl } : m));
        setLoadedImages(prev => ({ ...prev, [id]: false }));
      }
    } catch (error) {
      console.error("AI Generation Fault:", error);
    } finally {
      setActiveGeneratingId(null);
    }
  };

  const synthesizeMaterial = async () => {
    if (!customPrompt) return;
    setIsSynthesizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Synthesize a luxury construction material spec for: "${customPrompt}". 
        Return JSON with: name, location, supplier, matchScore (80-99), price (300-1500), leadTime (4-20 weeks), tags (2 strings), category.`,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '{}');
      const newMaterial = {
        id: Date.now(),
        name: data.name || 'Bespoke Artisan Material',
        location: data.location || 'Global Hub',
        supplier: data.supplier || 'Vetted Sourcing Node',
        matchScore: data.matchScore || 95,
        price: data.price || 500,
        leadTime: data.leadTime || 10,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
        tags: data.tags || ['AI Synthesized', 'Exotic Spec'],
        risk: 'Low',
        category: data.category || 'Specialty'
      };

      setMaterials(prev => [newMaterial, ...prev]);
      setIsCustomModalOpen(false);
      setCustomPrompt('');
    } catch (error) {
      console.error("Synthesis Fault:", error);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const activeAuditMaterial = materials.find(m => m.id === activeAuditId);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      
      {/* SIDEBAR */}
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
          <NavItem icon={<Box size={18} />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Suppliers" to="/network" />
          <NavItem icon={<Settings size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full px-12 py-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="space-y-2">
              <Link to="/projects" className="flex items-center space-x-2 text-[10px] font-bold text-brand-mutedGray uppercase tracking-[0.2em] hover:text-brand-gold transition-colors mb-4">
                <ArrowLeft size={12} />
                <span>Back to Specs</span>
              </Link>
              <h1 className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight">AI-Matched Materials</h1>
              <p className="text-brand-mutedGray text-sm">Reviewing {filteredAndSortedMaterials.length} high-fidelity matches for "Sterling Residence."</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-brand-navy/10 rounded-md pl-10 pr-10 py-2.5 text-xs font-bold text-brand-darkNavy appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all shadow-sm"
                >
                  <option>Best Match</option>
                  <option>Lowest Risk</option>
                  <option>Soonest Delivery</option>
                  <option>Highest Value</option>
                </select>
                <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-gold" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-mutedGray pointer-events-none" />
              </div>
              <button 
                onClick={() => setIsCustomModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-2.5 bg-brand-gold text-brand-darkNavy text-xs font-black uppercase tracking-widest rounded-md hover:bg-brand-goldHover transition-all shadow-lg shadow-brand-gold/10 transform active:scale-95"
              >
                <Sparkles size={14} />
                <span>Generate Custom</span>
              </button>
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-brand-navy/10 rounded-md text-xs font-bold text-brand-darkNavy hover:bg-slate-50 transition-all shadow-sm relative"
              >
                <FilterIcon size={14} />
                <span>Filter Results</span>
                {activeCategory !== 'All' && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-gold rounded-full border border-white"></span>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedMaterials.map((material, idx) => (
              <div 
                key={material.id} 
                className="bg-white border border-brand-navy/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-700 group flex flex-col h-full shadow-sm animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex items-center justify-center">
                  {(!loadedImages[material.id] || activeGeneratingId === material.id) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-20 bg-brand-darkNavy/80 backdrop-blur-md">
                      <Loader2 size={24} className="text-brand-gold animate-spin" />
                      <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em] animate-pulse">
                        {activeGeneratingId === material.id ? 'Neural Sculpting Texture...' : 'Authenticating Node...'}
                      </span>
                    </div>
                  )}
                  <img 
                    src={material.image} 
                    alt={material.name} 
                    onLoad={() => handleImageLoad(material.id)}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms] ${loadedImages[material.id] && activeGeneratingId !== material.id ? 'opacity-100' : 'opacity-0'}`} 
                  />
                  <div className="absolute top-4 right-4 bg-brand-darkNavy/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-brand-gold/30 shadow-xl z-10">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{material.matchScore}% MATCH</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); generateTexture(material.id, material.name); }}
                    disabled={activeGeneratingId !== null}
                    className="absolute top-4 left-4 flex items-center space-x-2 bg-white/95 hover:bg-white backdrop-blur-xl border border-white/20 px-4 py-2 rounded-md transition-all group/btn shadow-lg z-10 active:scale-95 disabled:opacity-50"
                  >
                    <Sparkles size={12} className="text-brand-gold group-hover/btn:rotate-12 transition-transform" />
                    <span className="text-[9px] font-black text-brand-darkNavy uppercase tracking-widest">GENERATE TEXTURE</span>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-darkNavy/90 via-brand-darkNavy/40 to-transparent pt-12 pb-4 px-6 flex items-center space-x-2 z-10">
                    <ShieldCheck size={14} className="text-brand-gold" />
                    <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">PROVENANCE VERIFIED</span>
                  </div>
                </div>

                <div className="p-8 space-y-8 flex-grow flex flex-col">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-brand-darkNavy leading-tight">{material.name}</h3>
                      <span className="text-[10px] text-brand-mutedGray font-black uppercase tracking-widest">{material.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <span className="text-[11px] font-medium text-brand-mutedGray">{material.supplier}</span>
                       <div className="flex items-center space-x-1.5 px-1.5 py-0.5 bg-brand-success/5 border border-brand-success/10 rounded">
                          <CheckCircle2 size={10} className="text-brand-success" />
                          <span className="text-[8px] font-black text-brand-success uppercase tracking-widest">VERIFIED</span>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-100">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Price Point</span>
                      <p className="text-lg font-bold text-brand-darkNavy">${material.price}<span className="text-xs text-brand-mutedGray font-normal"> /sq ft</span></p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Lead Period</span>
                      <p className="text-lg font-bold text-brand-darkNavy">{material.leadTime}<span className="text-xs text-brand-mutedGray font-normal"> weeks</span></p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-auto">
                    <button 
                      onClick={() => navigate('/executive-command')}
                      className="w-full bg-brand-gold hover:bg-brand-goldHover text-brand-darkNavy font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-md transition-all flex items-center justify-center space-x-3 shadow-lg group/vis transform active:scale-95"
                    >
                      <span>Proceed to Visualization</span>
                      <Eye size={16} className="group-hover/vis:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setActiveAuditId(material.id)}
                      className="w-full bg-white border border-brand-darkNavy/10 text-brand-darkNavy font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-md hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 shadow-sm transform active:scale-95"
                    >
                      <History size={16} className="text-brand-mutedGray" />
                      <span>View Audit Chain</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* FILTER DRAWER */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
           <div className="absolute inset-0 bg-brand-darkNavy/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsFilterOpen(false)}></div>
           <div className="relative w-full max-w-sm bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 p-12 overflow-y-auto">
              <div className="flex items-center justify-between mb-12">
                 <h3 className="text-2xl font-serif font-bold text-brand-darkNavy uppercase tracking-tight">Marketplace Filters</h3>
                 <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-slate-50 rounded-full"><X size={24} /></button>
              </div>
              
              <div className="space-y-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Product Categories</label>
                    <div className="space-y-3">
                       {['All', 'Natural Stone', 'Sustainable Wood', 'Structural Metal', 'Glazing'].map(cat => (
                         <button 
                           key={cat}
                           onClick={() => setActiveCategory(cat)}
                           className={`w-full flex items-center justify-between px-6 py-4 rounded-xl text-xs font-bold transition-all border ${activeCategory === cat ? 'bg-brand-darkNavy text-white border-brand-darkNavy' : 'bg-slate-50 border-slate-100 text-brand-darkNavy hover:bg-slate-100'}`}
                         >
                           <span>{cat}</span>
                           {activeCategory === cat && <CheckCircle2 size={14} className="text-brand-gold" />}
                         </button>
                       ))}
                    </div>
                 </div>
                 
                 <div className="pt-8 border-t border-slate-100">
                    <button onClick={() => { setActiveCategory('All'); setIsFilterOpen(false); }} className="w-full py-5 bg-slate-100 text-brand-darkNavy text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all">Clear All Parameters</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* PROVENANCE LEDGER (AUDIT CHAIN) */}
      {activeAuditId && activeAuditMaterial && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-brand-darkNavy/90 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-white border border-brand-gold/20 rounded-[3rem] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.6)] relative">
              <div className="p-12 space-y-10">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                    <div className="flex items-center space-x-5">
                       <div className="p-4 bg-brand-gold/10 rounded-2xl">
                          <Globe size={28} className="text-brand-gold" />
                       </div>
                       <div>
                          <h3 className="text-xl font-serif font-bold text-brand-darkNavy uppercase tracking-tight">Provenance Ledger</h3>
                          <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">Chain: {activeAuditMaterial.name}</p>
                       </div>
                    </div>
                    <button onClick={() => setActiveAuditId(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X size={32} /></button>
                 </div>

                 <div className="space-y-6">
                    <AuditStep status="verified" label={`Extraction Site Verified: ${activeAuditMaterial.location}`} time="2025-02-14 09:12 GMT" />
                    <AuditStep status="verified" label={`Quality Audit Completed by ${activeAuditMaterial.supplier}`} time="2025-02-15 11:45 GMT" />
                    <AuditStep status="active" label="Logistics Transit Monitored via IoT-Node" time="LIVE TELEMETRY" />
                    <AuditStep status="pending" label="Institutional Settlement Pending Receipt" time={`EST: ${activeAuditMaterial.leadTime} WEEKS`} />
                 </div>

                 <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                       <Fingerprint className="text-brand-gold/40" size={32} />
                       <div className="text-[10px] font-mono text-brand-mutedGray leading-relaxed uppercase tracking-widest">
                          Audit ID: 0x{Math.random().toString(16).slice(2, 8).toUpperCase()}...{activeAuditId}<br />
                          Block: {Math.floor(Math.random() * 100000) + 18000000}
                       </div>
                    </div>
                    <div className="flex items-center space-x-2 text-brand-success">
                       <ShieldCheck size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest">LEDGER SEALED</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* EXECUTIVE CONCIERGE MODAL */}
      {isConciergeOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-brand-darkNavy/80 backdrop-blur-lg animate-in fade-in duration-300">
           <div className="w-full max-w-lg bg-white border border-brand-gold/30 rounded-[3rem] p-12 shadow-[0_60px_120px_rgba(0,0,0,1)] relative overflow-hidden">
              <button onClick={() => setIsConciergeOpen(false)} className="absolute top-8 right-8 text-brand-mutedGray hover:text-brand-darkNavy"><X size={32} /></button>
              <div className="flex items-center space-x-6 mb-10">
                 <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/30">
                    <MessageSquare size={32} className="text-brand-gold" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-serif font-bold text-brand-darkNavy uppercase tracking-tight">Executive Concierge</h3>
                    <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">Encrypted Priority Gateway</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-sm font-medium text-brand-darkNavy leading-relaxed">
                       Welcome back, Director Sterling. Your priority support line is active. How may we assist with your Q4 procurement cycles today?
                    </p>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    <button className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-left">
                       <div className="flex items-center space-x-4">
                          <SlidersHorizontal size={18} className="text-brand-gold" />
                          <span className="text-xs font-bold text-brand-darkNavy">Adjust Sourcing Parameters</span>
                       </div>
                       <ChevronDown size={16} className="-rotate-90 text-slate-300" />
                    </button>
                    <button className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-left">
                       <div className="flex items-center space-x-4">
                          <FileText size={18} className="text-brand-gold" />
                          <span className="text-xs font-bold text-brand-darkNavy">Request Custom Audit Node</span>
                       </div>
                       <ChevronDown size={16} className="-rotate-90 text-slate-300" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* CONCIERGE BUTTON */}
      <div className="fixed bottom-10 right-10 z-50">
         <div 
           onClick={() => setIsConciergeOpen(true)}
           className="bg-brand-darkNavy p-3 rounded-2xl border border-brand-gold/30 shadow-2xl flex items-center space-x-4 cursor-pointer hover:scale-105 transition-all group"
         >
            <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
               <MessageSquare size={20} className="fill-brand-darkNavy text-brand-darkNavy" />
            </div>
            <div className="pr-4">
               <span className="block text-[10px] text-brand-gold font-black uppercase tracking-widest leading-none mb-1">Concierge</span>
               <span className="block text-xs text-white/60 font-medium">Priority Support</span>
            </div>
         </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/10' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-bold tracking-wider">{label}</span>
  </Link>
);

const AuditStep: React.FC<{ status: 'verified' | 'active' | 'pending'; label: string; time: string }> = ({ status, label, time }) => (
  <div className="flex items-start space-x-6 group">
     <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 ${status === 'verified' ? 'bg-brand-success border-brand-success shadow-[0_0_10px_#10B981]' : status === 'active' ? 'bg-brand-gold border-brand-gold animate-pulse shadow-[0_0_10px_#D4AF37]' : 'bg-transparent border-slate-200'}`}></div>
        <div className="w-px h-12 bg-slate-100 mt-2"></div>
     </div>
     <div className="space-y-1">
        <p className={`text-sm font-bold uppercase tracking-tight ${status === 'pending' ? 'text-slate-300' : 'text-brand-darkNavy'}`}>{label}</p>
        <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{time}</p>
     </div>
  </div>
);
