
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  Search, Filter, FileText, MoreHorizontal, AlertCircle, Clock, ShieldCheck, Globe, TrendingUp, CheckCircle2, Lock, MessageSquare, X, Command, Loader2, Download, Zap, Database, Terminal, Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRisk } from '../context/RiskContext';

const ORDERS_DATA = [
  {
    id: 'ORD-2025-8921',
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

/**
 * High-fidelity utility to highlight matching text for C-suite scannability
 */
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

  // Requirement: Live filtering logic
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

  // Command+K focus logic for C-suite speed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('order-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExportInitiate = () => {
    setIsExporting(true);
    setShowExportHUD(true);
    setExportProgress(0);
    
    const stages = [
      "Aggregating Active Ledger...",
      "Syncing Provenance Nodes...",
      "Applying ESG Audit Layer...",
      "Compiling Boardroom Q4 PDF..."
    ];

    let currentStageIndex = 0;
    const interval = setInterval(() => {
      setExportProgress(prev => {
        const next = prev + 1;
        if (next % 25 === 0 && currentStageIndex < stages.length - 1) {
          currentStageIndex++;
          setExportStage(stages[currentStageIndex]);
        }
        if (next >= 100) {
          clearInterval(interval);
          setExportStage("Synthesis Complete.");
        }
        return next;
      });
    }, 40);

    setExportStage(stages[0]);
  };

  const handleCloseHUD = () => {
    setShowExportHUD(false);
    setIsExporting(false);
    setExportProgress(0);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
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
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size={18} />} label="Orders" active />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Vetted Suppliers" to="/network" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0"><span className="text-white text-xs font-bold truncate">V. Sterling</span><span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest">Chief Procurement</span></div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-y-auto">
        <div className="bg-white border-b border-slate-200 px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-0 z-10 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">Order Management</h1>
            <div className="flex items-center space-x-2 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">
              <span className="flex h-2 w-2 relative mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              <span>Active Pipeline</span><span className="w-1 h-1 bg-brand-gold rounded-full"></span><span className="text-brand-mutedGray">Lifecycle Tracking</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* ENHANCED SEARCH BAR FOR C-SUITE */}
            <div className="relative group flex-grow md:flex-grow-0 min-w-[380px]">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${searchTerm ? 'text-brand-gold scale-110' : 'text-brand-mutedGray opacity-60'}`} />
              <input 
                id="order-search-input"
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders, projects, suppliers..." 
                className={`pl-11 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all shadow-inner placeholder:text-slate-400 font-medium ${searchTerm ? 'border-brand-gold/50 ring-2 ring-brand-gold/10' : ''}`} 
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3">
                {searchTerm && (
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20 animate-in fade-in zoom-in">
                    {filteredOrders.length} FOUND
                  </span>
                )}
                {searchTerm ? (
                  <button onClick={() => setSearchTerm('')} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                    <X size={14} className="text-slate-500" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-black text-brand-mutedGray uppercase tracking-tighter shadow-sm pointer-events-none opacity-60">
                    <Command size={10} />
                    <span>K</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* THE "LIVE" EXPORT BUTTON */}
            <button 
              onClick={handleExportInitiate}
              disabled={isExporting}
              className="flex items-center space-x-3 px-8 py-3.5 bg-brand-gold text-brand-darkNavy rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-goldHover transition-all shadow-xl shadow-brand-gold/20 group active:scale-95 disabled:opacity-50 relative overflow-hidden"
            >
              {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileText className="w-5 h-5 group-hover:rotate-6 transition-transform" />}
              <span>{isExporting ? 'Synthesizing...' : 'Export Report'}</span>
              {isExporting && (
                <div className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300" style={{ width: `${exportProgress}%` }}></div>
              )}
            </button>
          </div>
        </div>

        <div className="px-12 py-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Active Volume" value="$114,150.00" sub="Across 4 active pipelines" icon={<Box className="text-blue-500" />} />
            <StatCard label="Supply Chain Health" value="92%" sub="On-time delivery rate" icon={<TrendingUp className="text-brand-success" />} />
            <StatCard label="Critical Actions" value="2 Pending" sub="1 Risk Flag, 1 Quality Audit" icon={<AlertCircle className="text-brand-amber" />} urgent />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl animate-in fade-in duration-700">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-200">
                  <tr className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">
                    <th className="px-8 py-5">Order & Project</th>
                    <th className="px-8 py-5">Supplier & Items</th>
                    <th className="px-8 py-5">Lifecycle Stage</th>
                    <th className="px-8 py-5">Financial Status</th>
                    <th className="px-8 py-5">Risk Assessment</th>
                    <th className="px-8 py-5 text-right">Total Value</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                        <td className="px-8 py-6 flex flex-col">
                          <span className="text-sm font-bold text-brand-darkNavy group-hover:text-brand-gold transition-colors">
                            <Highlight text={order.id} query={searchTerm} />
                          </span>
                          <span className="text-[11px] text-brand-mutedGray">
                            <Highlight text={order.project} query={searchTerm} />
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-brand-darkNavy">
                              <Highlight text={order.supplier} query={searchTerm} />
                            </span>
                            <span className="text-[11px] text-brand-mutedGray italic">
                              <Highlight text={order.item} query={searchTerm} />
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-2 max-w-[180px]">
                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span className="text-brand-darkNavy uppercase">{order.stage}</span>
                              <span className="text-brand-mutedGray">{order.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-navy rounded-full transition-all duration-1000" style={{ width: `${order.progress}%` }}></div>
                            </div>
                            <div className="flex items-center space-x-1.5 text-[9px] text-brand-mutedGray">
                              <Clock size={10} />
                              <span>Next: {order.nextMilestone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <button 
                            disabled={isLocked}
                            className={`px-3 py-1.5 rounded-md text-[9px] font-black tracking-widest border transition-all ${isLocked ? 'bg-red-500/10 border-red-500/20 text-red-500' : order.financialStatus === 'ESCROW LOCKED' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-brand-darkNavy'}`}
                          >
                            {isLocked ? 'LOCKED: RESOLVE RISK' : order.financialStatus}
                          </button>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`flex items-center space-x-2 text-[10px] font-black tracking-widest uppercase ${order.riskColor}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                            <span>{order.risk}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right font-bold text-sm text-brand-darkNavy">${order.value.toLocaleString()}</td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-slate-300 hover:text-brand-darkNavy p-1 group-hover:scale-110 transition-transform">
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-4 bg-slate-50 rounded-full text-slate-200">
                            <Search size={40} />
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-serif font-bold text-brand-darkNavy">No matching records found</p>
                            <p className="text-xs text-brand-mutedGray uppercase tracking-widest">Refine your institutional search parameters</p>
                          </div>
                          <button onClick={() => setSearchTerm('')} className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] hover:underline">Clear Search</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* INSTITUTIONAL SETTLEMENT FOOTER */}
        <div className="mt-auto bg-brand-darkNavy py-12 px-12 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity duration-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-3">
              <Lock size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Institutional Settlement Channels</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-white uppercase tracking-[0.2em]">
              <Link to="/partners" className="flex items-center space-x-2 hover:text-brand-gold transition-colors">
                <Globe size={14} /> <span>SWIFT / SEPA</span>
              </Link>
              <Link to="/wallet" className="flex items-center space-x-2 hover:text-brand-gold transition-colors">
                <TrendingUp size={14} /> <span>Corporate Treasury</span>
              </Link>
              <Link to="/privacy-policy" className="flex items-center space-x-2 hover:text-brand-gold transition-colors">
                <ShieldCheck size={14} /> <span>Audit Ready</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* EXPORT HUD MODAL - Professional Boardroom Feedback */}
      {showExportHUD && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-darkNavy/90 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-white border border-brand-gold/30 rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold/20 overflow-hidden">
                 <div className="h-full bg-brand-gold shadow-[0_0_20px_#D4AF37] transition-all duration-100 ease-out" style={{ width: `${exportProgress}%` }}></div>
              </div>
              
              <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center space-x-6">
                    <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/30">
                       <Zap size={32} className="text-brand-gold animate-pulse" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-serif font-bold text-brand-darkNavy uppercase tracking-tight">Institutional Synthesis</h3>
                       <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">Boardroom Q4 Audit Report</p>
                    </div>
                 </div>
                 {exportProgress === 100 && (
                   <button onClick={handleCloseHUD} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X size={28} className="text-slate-400" /></button>
                 )}
              </div>

              <div className="space-y-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-black text-brand-darkNavy uppercase tracking-widest">
                       <span>Report Compilation Progress</span>
                       <span>{exportProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-darkNavy transition-all duration-100" style={{ width: `${exportProgress}%` }}></div>
                    </div>
                 </div>

                 <div className="space-y-3 font-mono">
                    <div className="flex items-center space-x-3 text-[10px] text-brand-darkNavy/60 uppercase tracking-widest">
                       <Terminal size={12} />
                       <span>System Log:</span>
                    </div>
                    <div className="h-32 bg-brand-darkNavy p-5 rounded-2xl text-[10px] text-brand-gold/80 font-mono space-y-2 overflow-hidden shadow-inner">
                       <p className="animate-in slide-in-from-left duration-300">>> INITIALIZING DATA HUB...</p>
                       {exportProgress > 25 && <p className="animate-in slide-in-from-left duration-300">>> FETCHING PROVENANCE NODES (4/4)...</p>}
                       {exportProgress > 50 && <p className="animate-in slide-in-from-left duration-300">>> CALCULATING RISK-ADJUSTED MARGINS...</p>}
                       {exportProgress > 75 && <p className="animate-in slide-in-from-left duration-300">>> VERIFYING ESG ESG-TIER COMPLIANCE...</p>}
                       {exportProgress === 100 && <p className="text-brand-success font-black animate-pulse">>> LEDGER SEALED. DOWNLOAD READY.</p>}
                    </div>
                 </div>
              </div>

              <div className="mt-12">
                 {exportProgress < 100 ? (
                   <div className="flex flex-col items-center space-y-4 py-4">
                      <Loader2 size={32} className="text-brand-gold animate-spin" />
                      <span className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.4em] animate-pulse">{exportStage}</span>
                   </div>
                 ) : (
                   <div className="grid grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
                      <button 
                        onClick={() => navigate('/executive-report')}
                        className="flex items-center justify-center space-x-3 py-5 bg-brand-darkNavy text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all shadow-xl"
                      >
                         <ShieldCheck size={18} className="text-brand-gold" />
                         <span>Open Boardroom View</span>
                      </button>
                      <button 
                        onClick={handleCloseHUD}
                        className="flex items-center justify-center space-x-3 py-5 bg-brand-gold text-brand-darkNavy font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-brand-goldHover transition-all shadow-xl"
                      >
                         <Download size={18} />
                         <span>Download PDF</span>
                      </button>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

      <div className="fixed bottom-10 right-10 z-50">
        <div className="bg-brand-gold p-4 rounded-2xl shadow-2xl flex items-center space-x-4 cursor-pointer hover:bg-brand-goldHover transition-all group">
          <div className="w-10 h-10 bg-brand-darkNavy rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <MessageSquare size={20} className="text-brand-gold fill-brand-gold" />
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-[11px] text-brand-darkNavy font-black uppercase tracking-widest">Live Concierge</span>
            <span className="text-[10px] text-brand-darkNavy/70 font-bold">Priority Support</span>
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

const StatCard: React.FC<{ label: string; value: string; sub: string; icon: React.ReactNode; urgent?: boolean }> = ({ label, value, sub, icon, urgent }) => (
  <div className={`bg-white border p-8 rounded-2xl shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 relative group ${urgent ? 'border-brand-amber/20' : 'border-slate-200'}`}>
    <div className="flex items-start justify-between relative z-10">
      <div className="space-y-4">
        <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.25em]">{label}</p>
        <div className="space-y-1">
          <h3 className="text-3xl font-serif font-bold text-brand-darkNavy group-hover:text-brand-gold transition-colors">{value}</h3>
          <p className="text-[11px] font-medium text-brand-mutedGray">{sub}</p>
        </div>
      </div>
      <div className={`p-4 rounded-xl ${urgent ? 'bg-brand-amber/10 text-brand-amber' : 'bg-slate-50 text-slate-400'}`}>{icon}</div>
    </div>
  </div>
);
