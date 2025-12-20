
import React, { useState } from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Wallet, BarChart3, Users, Settings2, 
  Map as MapIcon, Grid, Filter, Star, ExternalLink, ShieldCheck, Globe, 
  ArrowRight, TrendingUp, AlertTriangle, Box, MessageSquare, Lock, 
  CheckCircle2, X, Send, Loader2, ChevronDown, ShieldAlert, Maximize2, 
  Activity, Zap, MapPin, ArrowUpRight, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlobalSearch } from './GlobalSearch';

interface Supplier {
  id: number;
  hash: string;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  risk: string;
  capacity: number;
  tags: string[];
  image: string;
  coords: { x: number; y: number };
}

const SUPPLIERS: Supplier[] = [
  { id: 1, hash: '0X8B2...9A2F', name: 'Tuscany Stoneworks', location: 'Carrara, Italy', specialty: 'Marble & Travertine', rating: 4.9, risk: 'Low Risk', capacity: 85, tags: ['ISO 9001', 'Fair Trade'], image: 'https://images.unsplash.com/photo-1599557288647-73d8b8e0539f?q=80&w=400&auto=format&fit=crop', coords: { x: 52, y: 35 } },
  { id: 2, hash: '0XC4A...1E1D', name: 'Apex Materials', location: 'New York, USA', specialty: 'Steel & Glass', rating: 4.8, risk: 'Low Risk', capacity: 40, tags: ['LEED Gold', 'Made in USA'], image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop', coords: { x: 25, y: 38 } },
  { id: 3, hash: '0XF1E...00D2', name: 'Kyoto Timber Co.', location: 'Kyoto, Japan', specialty: 'Sustainable Wood', rating: 5.0, risk: 'Medium Risk', capacity: 92, tags: ['FSC Certified', 'Carb Compliant'], image: 'https://images.unsplash.com/photo-1582234373447-28023367f16d?q=80&w=400&auto=format&fit=crop', coords: { x: 85, y: 42 } },
  { id: 4, hash: '0X77B...CC1A', name: 'Nordic Slate', location: 'Oslo, Norway', specialty: 'Roofing Slate', rating: 4.7, risk: 'High Risk', capacity: 60, tags: ['Nordic Swan', 'ISO 14001'], image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&auto=format&fit=crop', coords: { x: 50, y: 18 } }
];

export const Network: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [hoveredSupplier, setHoveredSupplier] = useState<Supplier | null>(null);

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'High Risk': return { border: 'border-red-500/40', text: 'text-red-500', bg: 'bg-red-500', icon: <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" /> };
      case 'Medium Risk': return { border: 'border-brand-amber/40', text: 'text-brand-amber', bg: 'bg-brand-amber', icon: <AlertTriangle className="w-4 h-4 text-brand-amber animate-bounce-slow" /> };
      default: return { border: 'border-slate-100', text: 'text-brand-success', bg: 'bg-brand-success', icon: <CheckCircle2 size={16} className="text-brand-success" /> };
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
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
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size(18) />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size(18) />} label="Vetted Suppliers" active />
          <NavItem icon={<Settings2 size(18) />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0"><span className="text-white text-xs font-bold truncate">V. Sterling</span><span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest font-black">Chief Procurement</span></div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <div className="bg-white border-b border-slate-200 px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-0 z-30 shadow-sm">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">Global Network Nodes</h1>
            <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
               <span>Verified Partnerships</span><span className="w-1 h-1 bg-brand-gold rounded-full"></span><span className="text-brand-mutedGray">Sovereign Supply Audit</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <GlobalSearch />
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center shadow-inner border border-slate-200">
              <button onClick={() => setViewMode('grid')} className={`flex items-center space-x-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-white text-brand-darkNavy shadow-lg scale-[1.02]' : 'text-brand-mutedGray hover:text-brand-darkNavy'}`}>
                <Grid size={14} /><span>Node Grid</span>
              </button>
              <button onClick={() => setViewMode('map')} className={`flex items-center space-x-3 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-brand-gold text-brand-darkNavy shadow-lg scale-[1.02]' : 'text-brand-mutedGray hover:text-brand-darkNavy'}`}>
                <MapIcon size={14} /><span>Risk Map</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col min-h-0">
          {viewMode === 'grid' ? (
            <div className="px-12 py-12 space-y-12 animate-in fade-in duration-500 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 <div className="bg-white p-8 border border-slate-100 rounded-[2.5rem] shadow-sm flex items-center justify-between group hover:shadow-xl transition-all"><div className="space-y-2"><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Active Artisan Nodes</p><p className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight">1,248</p></div><div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:rotate-12 transition-transform"><Users size={28} /></div></div>
                 <div className="bg-white p-8 border border-slate-100 rounded-[2.5rem] shadow-sm flex items-center justify-between group hover:shadow-xl transition-all"><div className="space-y-2"><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Avg. Integrity Score</p><p className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight">98.4%</p></div><div className="w-14 h-14 bg-brand-success/10 rounded-2xl flex items-center justify-center text-brand-success group-hover:rotate-12 transition-transform"><ShieldCheck size={28} /></div></div>
                 <div className="bg-white p-8 border border-slate-100 rounded-[2.5rem] shadow-sm flex items-center justify-between group hover:shadow-xl transition-all"><div className="space-y-2"><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Aggregate Volatility</p><p className="text-4xl font-serif font-bold text-brand-success tracking-tight">MINIMAL</p></div><div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:rotate-12 transition-transform"><TrendingUp size={28} /></div></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {SUPPLIERS.map((supplier) => {
                  const riskStyles = getRiskStyles(supplier.risk);
                  return (
                    <div key={supplier.id} className={`bg-white border ${riskStyles.border} rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full shadow-sm`}>
                      <div className="p-10 space-y-8 flex-grow flex flex-col">
                        <div className="flex flex-col items-center space-y-5">
                          <div className="relative"><img src={supplier.image} alt={supplier.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 group-hover:border-brand-gold/20 transition-all duration-700 shadow-inner" /><div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md">{riskStyles.icon}</div></div>
                          <div className="text-center space-y-1"><h3 className="text-2xl font-serif font-bold text-brand-darkNavy leading-tight tracking-tight">{supplier.name}</h3><span className="text-[9px] font-mono font-bold text-brand-gold uppercase tracking-widest block">{supplier.hash}</span></div>
                        </div>
                        <div className="flex items-center justify-between py-6 border-y border-slate-50"><span className="text-[11px] font-black text-brand-darkNavy uppercase tracking-[0.15em]">{supplier.specialty}</span><div className="flex items-center space-x-1.5"><Star size={14} className="text-brand-gold fill-brand-gold" /><span className="text-xs font-black text-brand-darkNavy">{supplier.rating}</span></div></div>
                        <div className="grid grid-cols-2 gap-8 py-2">
                          <div className="space-y-2"><span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Risk Perimeter</span><div className="flex items-center space-x-2"><div className={`w-2 h-2 rounded-full ${riskStyles.bg}`}></div><span className={`text-[10px] font-black uppercase tracking-widest ${riskStyles.text}`}>{supplier.risk.split(' ')[0]}</span></div></div>
                          <div className="space-y-2"><div className="flex justify-between items-center"><span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Node Load</span><span className="text-[10px] font-bold text-brand-darkNavy">{supplier.capacity}%</span></div><div className="h-1.5 bg-slate-50 rounded-full overflow-hidden mt-1"><div className="h-full bg-brand-navy" style={{ width: `${supplier.capacity}%` }}></div></div></div>
                        </div>
                        <div className="pt-8 mt-auto space-y-4">
                          <button className="w-full py-5 bg-brand-gold text-brand-darkNavy text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-brand-goldHover transition-all shadow-xl shadow-brand-gold/10 flex items-center justify-center space-x-3 transform active:scale-95"><MessageSquare size={16} className="fill-brand-darkNavy" /><span>Request Intelligence</span></button>
                          <button className="w-full py-4 border border-slate-200 text-brand-mutedGray text-[9px] font-black uppercase tracking-[0.25em] rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 group/audit"><span>View Sovereign Audit</span><ArrowUpRight size={14} className="opacity-40 group-hover/audit:opacity-100" /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex-grow relative bg-[#050B15] overflow-hidden animate-in zoom-in-95 duration-700 flex flex-col">
              <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                 <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                 <svg className="w-full h-full text-brand-gold/10 fill-none" viewBox="0 0 1000 500">
                    <path d="M50,150 Q200,80 350,180 T650,150 T950,250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
                    <circle cx="200" cy="180" r="120" stroke="currentColor" strokeWidth="0.25" opacity="0.5" />
                 </svg>
              </div>
              <div className="relative w-full h-[calc(100vh-140px)] cursor-crosshair">
                 {SUPPLIERS.map((supplier) => {
                   const riskStyles = getRiskStyles(supplier.risk);
                   return (
                     <div key={supplier.id} className="absolute transition-all duration-700 z-10" style={{ left: `${supplier.coords.x}%`, top: `${supplier.coords.y}%` }} onMouseEnter={() => setHoveredSupplier(supplier)} onMouseLeave={() => setHoveredSupplier(null)}>
                        <div className={`absolute -inset-8 rounded-full opacity-20 animate-ping ${riskStyles.bg}`}></div>
                        <div className={`relative p-5 rounded-full cursor-pointer border-2 transition-all duration-500 hover:scale-125 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center ${riskStyles.bg} ${riskStyles.border}`}>
                           <Database className="w-6 h-6 text-white" />
                        </div>
                     </div>
                   );
                 })}
              </div>
            </div>
          )}
        </div>

        {/* INSTITUTIONAL FOOTER */}
        <footer className="bg-brand-darkNavy py-20 px-12 relative overflow-hidden shrink-0 border-t border-white/5">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            <div className="space-y-8 col-span-1">
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center rounded-sm"><div className="w-5 h-5 bg-brand-gold"></div></div>
                  <span className="text-xl font-serif font-bold text-white uppercase tracking-tighter">Classic Homes</span>
               </div>
               <p className="text-xs text-brand-offWhite/30 leading-relaxed font-medium uppercase tracking-widest max-w-[200px]">Enterprise-Grade Procurement Integrity and Global Sourcing Hub.</p>
               <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]"><ShieldCheck size={16} /><span>SOC2 TYPE II COMPLIANT</span></div>
            </div>
            <div className="space-y-8">
               <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Corporate Governance</h5>
               <ul className="space-y-5">
                  <li><FooterLink label="Privacy Sovereign Protocol" to="/privacy-policy" /></li>
                  <li><FooterLink label="Institutional Service Terms" to="/terms-of-service" /></li>
                  <li><FooterLink label="Boardroom Reporting Hub" to="/executive-report" /></li>
               </ul>
            </div>
            <div className="space-y-8">
               <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Market Intelligence</h5>
               <ul className="space-y-5">
                  <li><FooterLink label="Vetted Artisan Topology" to="/network" /></li>
                  <li><FooterLink label="Supply Chain Risk Advisory" to="/executive-command" /></li>
                  <li><FooterLink label="Material Provenance Audits" to="/materials" /></li>
               </ul>
            </div>
            <div className="space-y-10">
               <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Priority Concierge</h5>
               <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                  <p className="text-xs text-brand-offWhite/60 font-medium leading-relaxed">System Ready: Dedicated support node active for Q4 Treasury Cycles.</p>
                  <button className="w-full py-4 bg-brand-gold text-brand-darkNavy font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-xl transform active:scale-95">Initialize Bridge</button>
               </div>
            </div>
          </div>
          <div className="max-w-[1600px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-20">
             <p className="text-[9px] font-black text-white uppercase tracking-[0.3em]">&copy; 2025 CLASSIC HOMES MARKETPLACE INC.</p>
             <div className="flex items-center space-x-8">
                <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Build Node: v2.5.42-Stable</span>
                <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Region: GLOBAL-TREASURY-01</span>
             </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/10' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-bold tracking-wider uppercase tracking-widest leading-none">{label}</span>
  </Link>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to} className="group flex items-center space-x-3 text-brand-offWhite/40 hover:text-brand-gold transition-all duration-300">
     <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
     <span className="text-[11px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </Link>
);
