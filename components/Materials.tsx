
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
  Filter,
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
  Fingerprint
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
    risk: 'Low'
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
    risk: 'Medium'
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
    risk: 'Low'
  }
];

export const Materials: React.FC = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [activeGeneratingId, setActiveGeneratingId] = useState<number | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<number | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [sortBy, setSortBy] = useState('Best Match');

  const sortedMaterials = useMemo(() => {
    let result = [...materials];
    if (sortBy === 'Lowest Risk') {
      result.sort((a, b) => (a.risk === 'Low' ? -1 : 1));
    } else if (sortBy === 'Soonest Delivery') {
      result.sort((a, b) => a.leadTime - b.leadTime);
    }
    return result;
  }, [materials, sortBy]);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // LIVE ACTION: Generate Texture using Gemini 2.5 Flash Image
  const generateTexture = async (id: number, name: string) => {
    setActiveGeneratingId(id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: `High resolution, seamless 4K texture of ${name}. Architectural macro photography, luxury interior design material sample, realistic veining and lighting.` }] }],
      });

      let newUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          newUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }

      if (newUrl) {
        setMaterials(prev => prev.map(m => m.id === id ? { ...m, image: newUrl } : m));
        setLoadedImages(prev => ({ ...prev, [id]: false })); // Force reload
      }
    } catch (error) {
      console.error("AI Generation Fault:", error);
      // Fallback: Random unsplash to keep UI live
      const random = Math.floor(Math.random() * 1000);
      const fallback = `https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop&sig=${random}`;
      setMaterials(prev => prev.map(m => m.id === id ? { ...m, image: fallback } : m));
    } finally {
      setActiveGeneratingId(null);
    }
  };

  // LIVE ACTION: Generate Custom Material using Gemini 3 Flash
  const synthesizeMaterial = async () => {
    if (!customPrompt) return;
    setIsSynthesizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a luxury construction material spec based on this request: "${customPrompt}". 
        Return ONLY a JSON object with: name, location, supplier (fake name), matchScore (number 80-99), price (number), leadTime (number weeks), tags (array of 2 strings).`,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '{}');
      const newMaterial = {
        id: Date.now(),
        name: data.name || 'Custom Artisan Stone',
        location: data.location || 'Global Sourcing Hub',
        supplier: data.supplier || 'AI Vetted Artisan',
        matchScore: data.matchScore || 98,
        price: data.price || 450,
        leadTime: data.leadTime || 14,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', // Default high-end placeholder
        tags: data.tags || ['AI Synthesized', 'Exotic Spec'],
        risk: 'Low'
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

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      
      {/* EXECUTIVE SIDEBAR */}
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20">
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="space-y-2">
              <Link to="/projects" className="flex items-center space-x-2 text-[10px] font-bold text-brand-mutedGray uppercase tracking-[0.2em] hover:text-brand-gold transition-colors mb-4">
                <ArrowLeft size={12} />
                <span>Back to Specs</span>
              </Link>
              <h1 className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight">AI-Matched Materials</h1>
              <p className="text-brand-mutedGray text-sm">{sortedMaterials.length} matches found based on technical specifications.</p>
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
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-brand-navy/10 rounded-md text-xs font-bold text-brand-darkNavy hover:bg-slate-50 transition-all shadow-sm">
                <Filter size={14} />
                <span>Filter Results</span>
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedMaterials.map((material, idx) => (
              <div 
                key={material.id} 
                className="bg-white border border-brand-navy/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-700 group flex flex-col h-full shadow-sm animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                
                {/* Visual Preview */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex items-center justify-center">
                  {(!loadedImages[material.id] || activeGeneratingId === material.id) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-20 bg-brand-darkNavy/80 backdrop-blur-md">
                      <Loader2 size={24} className="text-brand-gold animate-spin" />
                      <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em] animate-pulse">
                        {activeGeneratingId === material.id ? 'Neural Sculpting Texture...' : 'Authenticating Sample...'}
                      </span>
                      {activeGeneratingId === material.id && (
                        <div className="w-40 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                           <div className="h-full bg-brand-gold animate-[shimmer_2s_infinite]"></div>
                        </div>
                      )}
                    </div>
                  )}
                  <img 
                    src={material.image} 
                    alt={material.name} 
                    onLoad={() => handleImageLoad(material.id)}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms] ${loadedImages[material.id] && activeGeneratingId !== material.id ? 'opacity-100' : 'opacity-0'}`} 
                  />
                  
                  {/* AI Overlays */}
                  <div className="absolute top-4 right-4 bg-brand-darkNavy/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-brand-gold/30 shadow-xl z-10">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{material.matchScore}% MATCH</span>
                  </div>
                  
                  <button 
                    onClick={() => generateTexture(material.id, material.name)}
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

                {/* Content */}
                <div className="p-8 space-y-8 flex-grow flex flex-col">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-brand-darkNavy leading-tight">{material.name}</h3>
                      <span className="text-[10px] text-brand-mutedGray font-black uppercase tracking-widest whitespace-nowrap">{material.location}</span>
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
                      className="w-full bg-brand-gold hover:bg-brand-goldHover text-brand-darkNavy font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-md transition-all flex items-center justify-center space-x-3 shadow-lg shadow-brand-gold/10 group/vis transform active:scale-95"
                    >
                      <span>Proceed to Visualization</span>
                      <Eye size={16} className="group-hover/vis:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setIsAuditModalOpen(material.id)}
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

      {/* CUSTOM GENERATION MODAL */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-darkNavy/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="w-full max-w-xl bg-white rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden border border-brand-gold/30">
              <button 
                onClick={() => setIsCustomModalOpen(false)}
                className="absolute top-8 right-8 text-brand-mutedGray hover:text-brand-darkNavy transition-colors"
              >
                 <X size={32} />
              </button>
              
              <div className="flex items-center space-x-6 mb-10">
                 <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/30">
                    <Sparkles size={32} className="text-brand-gold" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-serif font-bold text-brand-darkNavy uppercase tracking-tight">AI Sourcing Protocol</h3>
                    <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">Synthesize Global Artisan Benchmarks</p>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest ml-1">Describe Target Material</label>
                   <textarea 
                     value={customPrompt}
                     onChange={(e) => setCustomPrompt(e.target.value)}
                     placeholder="e.g. Rare blue sodalite from the Andes with specific gold-infused silicate patterns..."
                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm font-medium outline-none focus:border-brand-gold/50 min-h-[140px] transition-all resize-none shadow-inner"
                   />
                 </div>

                 <button 
                   onClick={synthesizeMaterial}
                   disabled={isSynthesizing || !customPrompt}
                   className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-[12px] uppercase tracking-[0.4em] rounded-2xl hover:bg-brand-darkNavy hover:text-white transition-all shadow-2xl flex items-center justify-center space-x-4 disabled:opacity-50"
                 >
                    {isSynthesizing ? <Loader2 size={24} className="animate-spin" /> : <Database size={20} />}
                    <span>{isSynthesizing ? 'SCANNING GLOBAL NODES...' : 'INITIALIZE SYNTHESIS'}</span>
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* AUDIT CHAIN MODAL */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-darkNavy/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-brand-darkNavy border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="p-12 space-y-10">
                 <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <div className="flex items-center space-x-5">
                       <div className="p-4 bg-brand-gold/10 rounded-2xl">
                          <Globe size={28} className="text-brand-gold" />
                       </div>
                       <div>
                          <h3 className="text-xl font-serif font-bold text-white uppercase tracking-tight">Provenance Ledger</h3>
                          <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">Sovereign Node Verification</p>
                       </div>
                    </div>
                    <button onClick={() => setIsAuditModalOpen(null)}><X className="text-white/20 hover:text-white transition-colors" size={32} /></button>
                 </div>

                 <div className="space-y-6">
                    <AuditStep status="verified" label="Quarry extraction verified (Carrara Node)" time="2025-01-10 08:24 GMT" />
                    <AuditStep status="verified" label="Laser-mapping scan successful (±0.01mm)" time="2025-01-11 14:12 GMT" />
                    <AuditStep status="active" label="Logistics chain encrypted (Suez Alternative)" time="LIVE STREAMING" />
                    <AuditStep status="pending" label="Final site delivery audit" time="EST: 4 WEEKS" />
                 </div>

                 <div className="bg-white/5 border border-white/5 p-8 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                       <Fingerprint className="text-brand-gold/40" size={32} />
                       <div className="text-[10px] font-mono text-white/30 leading-relaxed uppercase tracking-widest">
                          Audit ID: 0x82c...91ad0b<br />
                          Block: 18,294,002
                       </div>
                    </div>
                    <div className="flex items-center space-x-2 text-brand-success">
                       <ShieldCheck size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest">CHAIN SECURED</span>
                    </div>
                 </div>
              </div>
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
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-md' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-bold tracking-wide">{label}</span>
  </Link>
);

const AuditStep: React.FC<{ status: 'verified' | 'active' | 'pending'; label: string; time: string }> = ({ status, label, time }) => (
  <div className="flex items-start space-x-6 group">
     <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 ${status === 'verified' ? 'bg-brand-success border-brand-success shadow-[0_0_10px_#10B981]' : status === 'active' ? 'bg-brand-gold border-brand-gold animate-pulse shadow-[0_0_10px_#D4AF37]' : 'bg-transparent border-white/20'}`}></div>
        <div className="w-0.5 h-12 bg-white/10 mt-2"></div>
     </div>
     <div className="space-y-1">
        <p className={`text-sm font-bold uppercase tracking-tight ${status === 'pending' ? 'text-white/20' : 'text-white'}`}>{label}</p>
        <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{time}</p>
     </div>
  </div>
);
