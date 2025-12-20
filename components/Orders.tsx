
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  Search, FileText, MoreHorizontal, AlertCircle, Clock, Globe, TrendingUp, Lock, 
  MessageSquare, X, Command, Loader2, Download, Zap, Terminal, ShieldCheck,
  ChevronRight, ArrowUpRight, CheckCircle2, Database
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRisk } from '../context/RiskContext';

const ORDERS_DATA = [
  {
    id: 'ORD-2025-8921',
    hash: '0X8B2...9A2F',
    project: 'Sterling Residence',
    supplier: 'Tuscany Stoneworks',
    item: 'Calacatta Oro Marble (Bookmatched)',
    stage: 'Fabrication',
    progress: 65,
    nextMilestone: 'Quality Audit (Nov 02)',
    financialStatus: 'ESCROW LOCKED',
    risk: 'LOW RISK',
    riskColor: 'text-brand-success',
    value: 48250.00
  },
  {
    id: 'ORD-2025-8920',
    hash: '0XC4A...1E1D',
    project: 'Apex Tower Penthouse',
    supplier: 'Nordic Glass Solutions',
    item: 'Structural Glazing Units',
    stage: 'Intl. Logistics',
    progress: 80,
    nextMilestone: 'Customs Clearance (Oct 30)',
    financialStatus: 'LC RELEASED',
    risk: 'MEDIUM RISK',
    riskColor: 'text-brand-amber',
    value: 12400.00
  },
  {
    id: 'ORD-2025-8815',
    hash: '0XF1E...00D2',
    project: 'Vanguard Estate',
    supplier: 'Kyoto Timber Co.',
    item: 'Reclaimed Teak Flooring',
    stage: 'Delivered',
    progress: 100,
    nextMilestone: 'Installation Ready',
    financialStatus: 'PAID',
    risk: 'STABLE',
    riskColor: 'text-brand-success',
    value: 35000.00
  },
  {
    id: 'ORD-2025-8742',
    hash: '0X77B...CC1A',
    project: 'Sterling Residence',
    supplier: 'Global Steel Works',
    item: 'Architectural Bronze Trim',
    stage: 'Production Queue',
    progress: 15,
    nextMilestone: 'Production Start (Nov 05)',
    financialStatus: 'DEPOSIT PAID',
    risk: 'HIGH RISK',
    riskColor: 'text-red-500',
    value: 18500.00
  }
];

const Highlight: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() 
          ? <span key={i} className="bg-brand-gold/20 text-brand-darkNavy font-black px-0.5 rounded-sm shadow-[0_0_8px_rgba(212,175,55,0.2)]">{part}</span> 
          : part
      )}
    </>
  );
};

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { isLocked } = useRisk();
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStage, setExportStage] = useState('');
  const [showExportHUD, setShowExportHUD] = useState(false);

  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return ORDERS_DATA;
    const lowerQuery = searchTerm.toLowerCase();
    return ORDERS_DATA.filter(order => 
      order.id.toLowerCase().includes(lowerQuery) ||
      order.project.toLowerCase().includes(lowerQuery) ||
      order.supplier.toLowerCase().includes(lowerQuery) ||
      order.item.toLowerCase().includes(lowerQuery)
    );
  }, [searchTerm]);

  const handleExportInitiate = () => {
    setIsExporting(true);
    setShowExportHUD(true);
    setExportProgress(0);
    const stages = ["Aggregating Ledger...", "Syncing Provenance...", "Applying ESG Audit...", "Compiling Boardroom PDF..."];
    let currentStageIndex = 0;
    const interval = setInterval(() => {
      setExportProgress(prev => {
        const next = prev + 1;
        if (next % 25 === 0 && currentStageIndex < stages.length - 1) currentStageIndex++;
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 40);
    setExportStage(stages[0]);
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
          <NavItem icon={<Box size={18} />} label="Orders" active />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Suppliers" to="/network" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0"><span className="text-white text-xs font-bold truncate">V. Sterling</span><span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest font-black">Chief Procurement</span></div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-12 py-10 shadow-sm overflow-visible">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-2">
              <h1 className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">Order Management</h1>
              <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold"></span>
                </span>
                <span>Active Pipeline</span>
                <span className="w-1 h-1 bg-brand-gold/40 rounded-full"></span>
                <span className="text-brand-mutedGray">Institutional Lifecycle Tracking</span>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center gap-5 justify-end">
              <div className="relative group w-full max-w-md">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${searchTerm ? 'text-brand-gold scale-110' : 'text-brand-mutedGray opacity-60'}`} />
                <input id="order-search-input" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search records, projects, suppliers..." className={`pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all shadow-inner font-medium`} />
              </div>
              <button onClick={handleExportInitiate} disabled={isExporting} className="whitespace-nowrap flex items-center space-x-3 px-8 py-4 bg-brand-gold text-brand-darkNavy rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-goldHover transition-all shadow-xl shadow-brand-gold/20 shrink-0">
                {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileText className="w-5 h-5" />}
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-12 py-12 space-y-12 max-w-[1600px] mx-auto w-full flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard label="Active Volume" value="$114,150.00" sub="Across 4 active pipelines" icon={<Box className="text-blue-500" />} />
            <StatCard label="Supply Chain Health" value="92%" sub="On-time delivery rate" icon={<TrendingUp className="text-brand-success" />} />
            <StatCard label="Critical Actions" value="2 Pending" sub="1 Risk Flag, 1 Quality Audit" icon={<AlertCircle className="text-brand-amber" />} urgent />
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in duration-1000">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/70 border-b border-slate-200">
                  <tr className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.25em]"><th className="px-10 py-6">Order & Ledger Hash</th><th className="px-10 py-6">Supplier & Item Details</th><th className="px-10 py-6">Lifecycle Node</th><th className="px-10 py-6">Financial Tier</th><th className="px-10 py-6">Risk Assessment</th><th className="px-10 py-6 text-right">Value (USD)</th><th className="px-10 py-6"></th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                      <td className="px-10 py-8">
                        <div className="flex flex-col space-y-1.5">
                          <span className="text-sm font-black text-brand-darkNavy group-hover:text-brand-gold transition-colors"><Highlight text={order.id} query={searchTerm} /></span>
                          <span className="text-[10px] font-mono font-bold text-brand-mutedGray uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded w-fit">{order.hash}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs font-bold text-brand-darkNavy uppercase tracking-widest">{order.supplier}</span>
                          <span className="text-[11px] text-brand-mutedGray italic font-medium">{order.item}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="space-y-3 max-w-[180px]">
                          <div className="flex justify-between items-center text-[10px] font-black"><span className="text-brand-darkNavy uppercase tracking-widest">{order.stage}</span><span className="text-brand-mutedGray font-mono">{order.progress}%</span></div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-brand-navy rounded-full" style={{ width: `${order.progress}%` }}></div></div>
                          <div className="flex items-center space-x-1.5 text-[9px] font-bold text-brand-mutedGray uppercase tracking-widest"><Clock size={10} className="text-brand-gold" /><span>{order.nextMilestone}</span></div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <button className={`px-4 py-2 rounded-lg text-[9px] font-black tracking-[0.15em] border transition-all ${order.financialStatus === 'ESCROW LOCKED' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-brand-darkNavy'}`}>
                          {order.financialStatus}
                        </button>
                      </td>
                      <td className="px-10 py-8">
                        <div className={`flex items-center space-x-2 text-[10px] font-black tracking-[0.2em] uppercase ${order.riskColor}`}><div className="w-2 h-2 rounded-full bg-current shadow-[0_0_10px_currentColor]"></div><span>{order.risk}</span></div>
                      </td>
                      <td className="px-10 py-8 text-right"><span className="font-mono font-black text-sm text-brand-darkNavy">${order.value.toLocaleString()}</span></td>
                      <td className="px-10 py-8 text-right"><button className="text-slate-300 hover:text-brand-darkNavy transition-transform group-hover:scale-110"><MoreHorizontal size={20} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
               <p className="text-xs text-brand-offWhite/30 leading-relaxed font-medium uppercase tracking-widest max-w-[200px]">Enterprise Procurement Integrity and Global Sourcing.</p>
               <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]"><ShieldCheck size={16} /><span>SOC2 TYPE II COMPLIANT</span></div>
            </div>
            <div className="space-y-8">
               <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Corporate Governance</h5>
               <ul className="space-y-5">
                  <li><FooterLink label="Privacy Sovereign Protocol" to="/privacy-policy" /></li>
                  <li><FooterLink label="Institutional Terms of Service" to="/terms-of-service" /></li>
                  <li><FooterLink label="Data Partitioning Controls" to="/settings" /></li>
               </ul>
            </div>
            <div className="space-y-8">
               <h5 className="text-[10px) font-black text-white uppercase tracking-[0.4em]">Market Intelligence</h5>
               <ul className="space-y-5">
                  <li><FooterLink label="Vetted Artisan Network" to="/network" /></li>
                  <li><FooterLink label="Real-time Sourcing Matrix" to="/analytics" /></li>
                  <li><FooterLink label="Material Provenance Audits" to="/materials" /></li>
               </ul>
            </div>
            <div className="space-y-10">
               <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Priority Concierge</h5>
               <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                  <p className="text-xs text-brand-offWhite/60 font-medium leading-relaxed">Dedicated support node active for Q4 Treasury Cycles.</p>
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

      {showExportHUD && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-darkNavy/90 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-white border border-brand-gold/30 rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold/20 overflow-hidden"><div className="h-full bg-brand-gold shadow-[0_0_20px_#D4AF37] transition-all duration-100 ease-out" style={{ width: `${exportProgress}%` }}></div></div>
              <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center space-x-6">
                    <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/30"><Zap size={32} className="text-brand-gold animate-pulse" /></div>
                    <div><h3 className="text-2xl font-serif font-bold text-brand-darkNavy uppercase tracking-tight">Institutional Synthesis</h3><p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">Boardroom Q4 Audit Report</p></div>
                 </div>
                 {exportProgress === 100 && <button onClick={() => setShowExportHUD(false)} className="p-2 hover:bg-slate-50 rounded-full"><X size={28} className="text-slate-400" /></button>}
              </div>
              <div className="space-y-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100 font-mono">
                 <div className="h-40 bg-brand-darkNavy p-6 rounded-2xl text-[10px] text-brand-gold/80 space-y-2 overflow-hidden shadow-inner">
                    <p className="animate-in slide-in-from-left duration-300">{'>> INITIALIZING DATA HUB...'}</p>
                    {exportProgress > 25 && <p className="animate-in slide-in-from-left duration-300">{'>> FETCHING PROVENANCE NODES...'}</p>}
                    {exportProgress > 50 && <p className="animate-in slide-in-from-left duration-300">{'>> CALCULATING RISK MARGINS...'}</p>}
                    {exportProgress === 100 && <p className="text-brand-success font-black animate-pulse">{'>> LEDGER SEALED. DOWNLOAD READY.'}</p>}
                 </div>
              </div>
              <div className="mt-12 flex justify-center">
                 {exportProgress < 100 ? (
                   <div className="flex flex-col items-center space-y-4"><Loader2 size={32} className="text-brand-gold animate-spin" /><span className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.4em] animate-pulse">{exportStage}</span></div>
                 ) : (
                   <div className="grid grid-cols-2 gap-6 w-full animate-in zoom-in-95 duration-500">
                      <button onClick={() => navigate('/executive-report')} className="flex items-center justify-center space-x-3 py-5 bg-brand-darkNavy text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all shadow-xl"><ShieldCheck size={18} className="text-brand-gold" /><span>Open Boardroom View</span></button>
                      <button onClick={() => setShowExportHUD(false)} className="flex items-center justify-center space-x-3 py-5 bg-brand-gold text-brand-darkNavy font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-brand-goldHover transition-all shadow-xl"><Download size={18} /><span>Download PDF</span></button>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/10' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-bold tracking-wider uppercase tracking-[0.1em]">{label}</span>
  </Link>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to} className="group flex items-center space-x-3 text-brand-offWhite/40 hover:text-brand-gold transition-all duration-300">
     <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
     <span className="text-[11px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </Link>
);

const StatCard: React.FC<{ label: string; value: string; sub: string; icon: React.ReactNode; urgent?: boolean }> = ({ label, value, sub, icon, urgent }) => (
  <div className={`bg-white border p-10 rounded-[2.5rem] shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 relative group ${urgent ? 'border-brand-gold/20' : 'border-slate-200'}`}>
    <div className="flex items-start justify-between relative z-10">
      <div className="space-y-6">
        <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.3em] leading-none">{label}</p>
        <div className="space-y-2">
          <h3 className="text-4xl font-serif font-bold text-brand-darkNavy group-hover:text-brand-gold transition-colors tracking-tighter leading-none">{value}</h3>
          <p className="text-[11px] font-bold text-brand-mutedGray uppercase tracking-widest leading-none mt-2">{sub}</p>
        </div>
      </div>
      <div className={`p-5 rounded-2xl shrink-0 transition-all group-hover:rotate-12 ${urgent ? 'bg-brand-gold/10 text-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]' : 'bg-slate-50 text-slate-400'}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 28 })}
      </div>
    </div>
  </div>
);
