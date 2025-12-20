
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  Map as MapIcon, Grid, Filter, Star, ShieldCheck, Globe, 
  TrendingUp, AlertTriangle, MessageSquare, Lock, 
  CheckCircle2, X, Database, ShieldAlert, Activity, 
  Zap, ArrowUpRight, Search, LayoutList, ChevronRight,
  Fingerprint, Server, MoreHorizontal, Image as ImageIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Supplier {
  id: number;
  hash: string;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  risk: 'Stable' | 'Elevated' | 'Critical';
  capacity: number;
  tags: string[];
  image: string;
  coords: { x: number; y: number };
  lastAudit: string;
  exposure: string;
}

const SUPPLIERS: Supplier[] = [
  { id: 1, hash: '0X8B2...9A2F', name: 'Tuscany Stoneworks', location: 'Carrara, Italy', specialty: 'Marble & Travertine', rating: 4.9, risk: 'Stable', capacity: 85, tags: ['ISO 9001'], image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=400&auto=format&fit=crop', coords: { x: 52, y: 35 }, lastAudit: 'Oct 24, 2025', exposure: '$1.2M' },
  { id: 2, hash: '0XC4A...1E1D', name: 'Apex Materials', location: 'New York, USA', specialty: 'Steel & Glass', rating: 4.8, risk: 'Stable', capacity: 40, tags: ['LEED Gold'], image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400&auto=format&fit=crop', coords: { x: 25, y: 38 }, lastAudit: 'Oct 12, 2025', exposure: '$450K' },
  { id: 3, hash: '0XF1E...00D2', name: 'Kyoto Timber Co.', location: 'Kyoto, Japan', specialty: 'Sustainable Wood', rating: 5.0, risk: 'Elevated', capacity: 92, tags: ['FSC Certified'], image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop', coords: { x: 85, y: 42 }, lastAudit: 'Sep 30, 2025', exposure: '$890K' },
  { id: 4, hash: '0X77B...CC1A', name: 'Nordic Slate', location: 'Oslo, Norway', specialty: 'Roofing Slate', rating: 4.7, risk: 'Critical', capacity: 60, tags: ['ISO 14001'], image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&auto=format&fit=crop', coords: { x: 50, y: 18 }, lastAudit: 'Oct 28, 2025', exposure: '$2.1M' }
];

export const Network: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'ledger' | 'grid' | 'map'>('ledger');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const filteredSuppliers = useMemo(() => {
    if (!searchTerm.trim()) return SUPPLIERS;
    return SUPPLIERS.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'Critical': return { text: 'text-red-500', bg: 'bg-red-500', icon: <ShieldAlert className="w-4 h-4 animate-pulse" /> };
      case 'Elevated': return { text: 'text-brand-amber', bg: 'bg-brand-amber', icon: <AlertTriangle className="w-4 h-4" /> };
      default: return { text: 'text-brand-success', bg: 'bg-brand-success', icon: <CheckCircle2 size={16} /> };
    }
  };

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
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size={18} />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Vetted Network" active />
          <NavItem icon={<Settings2 size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest font-black">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <header className="bg-white border-b border-slate-200 px-12 py-10 flex flex-col xl:flex-row items-center justify-between gap-10 sticky top-0 z-40 backdrop-blur-3xl bg-white/90 shadow-sm">
          <div className="space-y-3">
            <h1 className="text-5xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">Global Network Nodes</h1>
            <div className="flex items-center space-x-5 text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">
               <div className="flex items-center space-x-2">
                 <Server size={14} className="text-brand-success" />
                 <span>Sync: 02ms</span>
               </div>
               <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
               <span className="text-brand-mutedGray">Verified Artisan Provenance Matrix</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="relative group w-full sm:w-[400px]">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mutedGray group-focus-within:text-brand-gold transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search nodes, specialties, or ledger hashes..." 
                 className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all shadow-inner font-medium"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="bg-slate-100 p-1.5 rounded-[1.8rem] flex items-center border border-slate-200 shadow-inner">
              <ViewToggle active={viewMode === 'ledger'} onClick={() => setViewMode('ledger')} icon={<LayoutList size={14} />} label="Executive Ledger" />
              <ViewToggle active={viewMode === 'grid'} onClick={() => setViewMode('grid')} icon={<Grid size={14} />} label="Sovereign Grid" />
              <ViewToggle active={viewMode === 'map'} onClick={() => setViewMode('map')} icon={<MapIcon size={14} />} label="Risk Topology" />
            </div>
            <button className="px-10 py-4 bg-brand-darkNavy text-white rounded-xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl active:scale-95">
               Request New Node Audit
            </button>
          </div>
        </header>

        <div className="px-12 py-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
             <MetricHUD icon={<Users size={24} className="text-brand-darkNavy" />} label="Total Sourcing Nodes" value="1,248" sub="Global Registry" />
             <MetricHUD icon={<ShieldCheck size={24} className="text-brand-success" />} label="Compliance Integrity" value="98.4%" sub="SOC2 Certified" />
             <MetricHUD icon={<Activity size={24} className="text-brand-gold" />} label="Network Latency" value="Low" sub="Optimal Flow" />
             <MetricHUD icon={<TrendingUp size={24} className="text-brand-gold" />} label="Market Volatility" value="Minimal" sub="Stable Cycles" />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {viewMode === 'ledger' && (
              <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.3em]">
                      <th className="px-10 py-6">Sovereign Node / Hash</th>
                      <th className="px-10 py-6">Specialization</th>
                      <th className="px-10 py-6">Risk Index</th>
                      <th className="px-10 py-6 text-center">Node Load</th>
                      <th className="px-10 py-6 text-right">Capital Exposure</th>
                      <th className="px-10 py-6 text-right">Last Audit</th>
                      <th className="px-10 py-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSuppliers.map((supplier) => {
                      const riskStyles = getRiskStyles(supplier.risk);
                      const isBroken = imageErrors[supplier.id];
                      return (
                        <tr key={supplier.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                          <td className="px-10 py-8">
                            <div className="flex items-center space-x-5">
                               <div className="relative shrink-0">
                                  <div className="w-12 h-12 rounded-xl border border-slate-100 shadow-sm overflow-hidden bg-slate-50 flex items-center justify-center">
                                    {!isBroken ? (
                                      <img 
                                        src={supplier.image} 
                                        className="w-full h-full object-cover" 
                                        alt={supplier.name} 
                                        onError={() => handleImageError(supplier.id)}
                                      />
                                    ) : (
                                      <div className="flex flex-col items-center justify-center p-1 bg-brand-gold/5 text-brand-gold/40">
                                        <ImageIcon size={16} />
                                        <span className="text-[6px] font-black uppercase mt-1">Node</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 p-0.5 bg-white rounded-full shadow-sm">
                                    <div className={`w-2 h-2 rounded-full ${riskStyles.bg}`}></div>
                                  </div>
                               </div>
                               <div>
                                  <p className="text-base font-bold text-brand-darkNavy group-hover:text-brand-gold transition-colors">{supplier.name}</p>
                                  <p className="text-[9px] font-mono font-bold text-brand-mutedGray uppercase tracking-widest">{supplier.hash}</p>
                               </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex flex-col space-y-1">
                                <span className="text-xs font-black text-brand-darkNavy uppercase tracking-widest">{supplier.specialty}</span>
                                <span className="text-[10px] text-brand-mutedGray font-medium italic">{supplier.location}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] ${riskStyles.text}`}>
                                {riskStyles.icon}
                                <span>{supplier.risk}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex flex-col items-center space-y-2">
                                <span className="text-[10px] font-bold text-brand-darkNavy">{supplier.capacity}%</span>
                                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                   <div className="h-full bg-brand-navy rounded-full" style={{ width: `${supplier.capacity}%` }}></div>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <span className="text-sm font-mono font-bold text-brand-darkNavy">{supplier.exposure}</span>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <span className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">{supplier.lastAudit}</span>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <button className="text-slate-200 hover:text-brand-darkNavy transition-all group-hover:scale-110">
                                <MoreHorizontal size={20} />
                             </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {filteredSuppliers.map((supplier) => {
                  const riskStyles = getRiskStyles(supplier.risk);
                  const isBroken = imageErrors[supplier.id];
                  return (
                    <div key={supplier.id} className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full shadow-sm">
                      <div className="p-10 space-y-10 flex-grow flex flex-col">
                        <div className="flex flex-col items-center space-y-6">
                          <div className="relative group/avatar">
                            <div className="absolute inset-0 bg-brand-gold/10 blur-xl rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                            <div className="relative w-28 h-28 rounded-[2rem] border-4 border-slate-50 group-hover:border-brand-gold/30 transition-all duration-700 shadow-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                              {!isBroken ? (
                                <img 
                                  src={supplier.image} 
                                  alt={supplier.name} 
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(supplier.id)}
                                />
                              ) : (
                                <div className="text-brand-gold/40 flex flex-col items-center">
                                  <ImageIcon size={32} />
                                  <span className="text-[8px] font-black uppercase mt-2">Institution Asset</span>
                                </div>
                              )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100">
                              {riskStyles.icon}
                            </div>
                          </div>
                          <div className="text-center space-y-2">
                            <h3 className="text-3xl font-serif font-bold text-brand-darkNavy leading-tight tracking-tight">{supplier.name}</h3>
                            <div className="flex items-center justify-center space-x-3">
                               <Fingerprint size={12} className="text-brand-gold/60" />
                               <span className="text-[9px] font-mono font-bold text-brand-gold uppercase tracking-widest block">{supplier.hash}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-8 border-y border-slate-50">
                           <div className="space-y-1">
                              <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-[0.3em]">Specialty Node</span>
                              <p className="text-[12px] font-black text-brand-darkNavy uppercase tracking-widest">{supplier.specialty}</p>
                           </div>
                           <div className="flex flex-col items-end space-y-1">
                              <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-[0.3em]">Integrity</span>
                              <div className="flex items-center space-x-1.5"><Star size={14} className="text-brand-gold fill-brand-gold" /><span className="text-xs font-black text-brand-darkNavy">{supplier.rating}</span></div>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10 py-2">
                          <div className="space-y-3">
                             <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Risk Assessment</span>
                             <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${riskStyles.bg} shadow-[0_0_10px_currentColor]`}></div>
                                <span className={`text-[11px] font-black uppercase tracking-widest ${riskStyles.text}`}>{supplier.risk}</span>
                             </div>
                          </div>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center"><span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Active Load</span><span className="text-[10px] font-bold text-brand-darkNavy">{supplier.capacity}%</span></div>
                             <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-brand-navy group-hover:bg-brand-gold transition-colors duration-700" style={{ width: `${supplier.capacity}%` }}></div></div>
                          </div>
                        </div>

                        <div className="pt-10 mt-auto space-y-4">
                          <button className="w-full py-6 bg-brand-gold text-brand-darkNavy text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all shadow-xl shadow-brand-gold/10 flex items-center justify-center space-x-4 transform active:scale-95">
                             <Zap size={18} className="fill-brand-darkNavy" />
                             <span>Initialize Intelligence</span>
                          </button>
                          <button className="w-full py-5 border border-slate-200 text-brand-mutedGray text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 group/audit">
                             <span>Sovereign Ledger Audit</span>
                             <ArrowUpRight size={16} className="opacity-40 group-hover/audit:opacity-100 group-hover/audit:translate-x-1 group-hover/audit:-translate-y-1 transition-all" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {viewMode === 'map' && (
              <div className="h-[700px] bg-brand-darkNavy border border-white/10 rounded-[4rem] relative overflow-hidden shadow-2xl group animate-in zoom-in-95 duration-700">
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                   <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
                </div>
                
                <div className="absolute top-12 left-12 z-20 space-y-4">
                   <div className="flex items-center space-x-5">
                      <div className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl">
                        <Globe size={32} className="text-brand-gold animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-serif font-bold text-white tracking-tight uppercase">Risk Topology Monitor</h3>
                        <p className="text-[11px] font-black text-brand-gold/60 uppercase tracking-[0.3em]">Live Node Synchronization Active</p>
                      </div>
                   </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                   <svg viewBox="0 0 1000 500" className="w-full h-full text-brand-gold/20 fill-none stroke-current">
                      <path d="M50,250 Q200,80 350,250 T650,250 T950,250" strokeWidth="0.5" strokeDasharray="10 5" />
                      <path d="M100,100 L900,100 M100,400 L900,400" strokeWidth="0.2" opacity="0.3" />
                      {filteredSuppliers.map((s) => (
                        <circle key={s.id} cx={`${s.coords.x}%`} cy={`${s.coords.y}%`} r="120" strokeWidth="0.2" opacity="0.1" className="animate-pulse" />
                      ))}
                   </svg>
                </div>

                {filteredSuppliers.map((supplier) => {
                  const riskStyles = getRiskStyles(supplier.risk);
                  return (
                    <div 
                      key={supplier.id} 
                      className="absolute transition-all duration-1000 cursor-pointer" 
                      style={{ left: `${supplier.coords.x}%`, top: `${supplier.coords.y}%` }}
                    >
                      <div className={`absolute -inset-10 rounded-full opacity-20 animate-ping ${riskStyles.bg}`}></div>
                      <div className={`relative p-6 rounded-full border-2 transition-all duration-500 hover:scale-150 shadow-2xl flex items-center justify-center ${riskStyles.bg} border-white/20`}>
                        <Database className="w-6 h-6 text-white" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-brand-darkNavy border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           {supplier.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <footer className="mt-32 pt-20 bg-brand-darkNavy py-24 px-12 relative overflow-hidden shrink-0 border-t border-white/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"></div>
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
            <div className="space-y-10 col-span-1">
               <div className="flex items-center space-x-6 text-white group cursor-pointer">
                  <div className="w-14 h-14 border-2 border-brand-gold flex items-center justify-center rounded-sm group-hover:bg-brand-gold transition-all duration-500">
                     <div className="w-8 h-8 bg-brand-gold group-hover:bg-brand-darkNavy"></div>
                  </div>
                  <span className="text-3xl font-serif font-bold uppercase tracking-tighter">Classic Homes</span>
               </div>
               <p className="text-sm text-brand-offWhite/30 leading-loose font-medium uppercase tracking-widest max-w-[280px]">
                 Enterprise-Grade Procurement Integrity and Global Sourcing Intelligence.
               </p>
               <div className="flex items-center space-x-4 text-brand-success bg-brand-success/5 border border-brand-success/20 px-6 py-3 rounded-2xl w-fit">
                 <ShieldCheck size={20} />
                 <span className="text-[11px] font-black uppercase tracking-[0.2em]">SOC2 TYPE II CERTIFIED</span>
               </div>
            </div>
            <div className="space-y-12">
               <h5 className="text-xs font-black text-brand-gold uppercase tracking-[0.6em] border-b border-white/10 pb-6">Governance</h5>
               <ul className="space-y-8">
                  <li><FooterLink label="Privacy Protocol" to="/privacy-policy" /></li>
                  <li><FooterLink label="Institutional Terms" to="/terms-of-service" /></li>
                  <li><FooterLink label="Reporting Hub" to="/executive-report" /></li>
               </ul>
            </div>
            <div className="space-y-12">
               <h5 className="text-xs font-black text-brand-gold uppercase tracking-[0.6em] border-b border-white/10 pb-6">Intelligence</h5>
               <ul className="space-y-8">
                  <li><FooterLink label="Vetted Topology" to="/network" /></li>
                  <li><FooterLink label="Risk Advisory" to="/executive-command" /></li>
                  <li><FooterLink label="Provenance Audits" to="/materials" /></li>
               </ul>
            </div>
            <div className="space-y-12">
               <h5 className="text-xs font-black text-brand-gold uppercase tracking-[0.6em] border-b border-white/10 pb-6">Concierge Bridge</h5>
               <div className="bg-white/5 border border-white/20 p-10 rounded-[3rem] space-y-8 backdrop-blur-3xl shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
                  <p className="text-base text-slate-300 font-medium leading-relaxed italic opacity-80">
                    "Authorized bridge active for verified Treasury Cycles."
                  </p>
                  <button className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all shadow-xl transform active:scale-95">
                    Initialize Bridge
                  </button>
               </div>
            </div>
          </div>
          <div className="max-w-[1600px] mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 opacity-30">
             <p className="text-[10px] font-black text-white uppercase tracking-[0.5em]">&copy; 2025 CLASSIC HOMES MARKETPLACE INC.</p>
             <div className="flex items-center space-x-12">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Build: v2.5.42-STABLE</span>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Node: GLOBAL-TREASURY-01</span>
             </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-5 px-6 py-4 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-2xl shadow-brand-gold/20 scale-[1.02]' : 'text-brand-offWhite/30 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-black tracking-widest uppercase leading-none">{label}</span>
  </Link>
);

const ViewToggle: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center space-x-3 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${active ? 'bg-white text-brand-darkNavy shadow-2xl scale-[1.05] border border-slate-100' : 'text-brand-mutedGray hover:text-brand-darkNavy'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const MetricHUD: React.FC<{ icon: React.ReactNode; label: string; value: string; sub: string }> = ({ icon, label, value, sub }) => (
  <div className="bg-white p-10 border border-slate-100 rounded-[3rem] shadow-sm flex items-center justify-between group hover:shadow-2xl hover:border-brand-gold/20 transition-all duration-700">
     <div className="space-y-4">
        <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.3em]">{label}</p>
        <div className="space-y-1">
           <p className="text-5xl font-serif font-bold text-brand-darkNavy tracking-tighter group-hover:text-brand-gold transition-colors">{value}</p>
           <p className="text-[10px] font-bold text-brand-mutedGray uppercase tracking-widest opacity-60">{sub}</p>
        </div>
     </div>
     <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.8rem] flex items-center justify-center text-slate-400 group-hover:bg-brand-gold/10 group-hover:text-brand-gold group-hover:rotate-12 transition-all duration-700 shadow-inner">
        {icon}
     </div>
  </div>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to} className="group flex items-center space-x-4 text-brand-offWhite/40 hover:text-brand-gold transition-all duration-300">
     <ArrowUpRight size={14} className="opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
     <span className="text-[12px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </Link>
);
