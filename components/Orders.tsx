
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  Search, FileText, MoreHorizontal, AlertCircle, Clock, Globe, TrendingUp, Lock, 
  X, Loader2, Download, Zap, ShieldCheck,
  CheckCircle2, Activity, Database
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
    riskColor: 'text-red-600',
    value: 18500.00
  }
];

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

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
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden font-sans">
      {/* AUTHORITATIVE SIDEBAR */}
      <aside className="w-72 bg-brand-darkNavy flex flex-col border-r border-white/10 shadow-2xl z-20 shrink-0">
        <div className="p-10">
          <Link to="/" className="flex items-center space-x-5 text-white group">
            <div className="w-12 h-12 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-6 h-6 bg-brand-gold"></div>
            </div>
            <span className="text-2xl font-serif font-bold tracking-tighter uppercase">Classic Homes</span>
          </Link>
        </div>
        <nav className="flex-grow px-6 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/sourcing-hub" />
          <NavItem icon={<Layers size={20} />} label="Projects" to="/projects" />
          <NavItem icon={<ShoppingBag size={20} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size={20} />} label="Executive Orders" active />
          <NavItem icon={<Wallet size={20} />} label="Treasury" to="/wallet" />
          <NavItem icon={<BarChart3 size={20} />} label="Intelligence" to="/analytics" />
          <NavItem icon={<Users size={20} />} label="Supply Nodes" to="/network" />
        </nav>
        <div className="p-8 border-t border-white/5 bg-black/20">
          <div className="flex items-center space-x-4">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-brand-gold shadow-xl" alt="Executive" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-sm font-black uppercase tracking-widest truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-gold font-black uppercase tracking-[0.2em]">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* COMMAND VIEWPORT */}
      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-300 px-12 py-10 flex flex-col xl:flex-row items-center justify-between gap-10 shadow-sm">
          <div className="space-y-3">
            <h1 className="text-5xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">Order Governance</h1>
            <div className="flex items-center space-x-5 text-[11px] font-black text-brand-gold uppercase tracking-[0.3em]">
               <div className="flex items-center space-x-2">
                 <Activity size={16} className="text-brand-success animate-pulse" />
                 <span>Pipeline Active</span>
               </div>
               <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
               <span className="text-slate-500">Global Material Provenance Tracking</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="relative group w-full sm:w-[450px]">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-gold transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search Executive Records..." 
                 className="w-full pl-14 pr-8 py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-base font-bold text-brand-darkNavy focus:bg-white focus:border-brand-gold outline-none transition-all shadow-inner"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button 
              onClick={handleExportInitiate}
              className="px-12 py-5 bg-brand-darkNavy text-white rounded-xl text-xs font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-2xl flex items-center space-x-4 active:scale-95"
            >
              <FileText className="w-5 h-5 text-brand-gold" />
              <span>Synthesize Report</span>
            </button>
          </div>
        </header>

        <div className="px-12 py-12 space-y-12 w-full max-w-[1700px] mx-auto">
          
          {/* HIGH-LEVEL KPI HUD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <StatCard 
              label="Active Allocation" 
              value="$114,150.00" 
              sub="Across 4 Verified Sourcing Nodes" 
              icon={<Box className="text-blue-600" />} 
            />
            <StatCard 
              label="Supply Chain Performance" 
              value="92.4%" 
              sub="Historical Delivery On-Time" 
              icon={<TrendingUp className="text-brand-success" />} 
            />
            <StatCard 
              label="Critical Oversight" 
              value="2 Alerts" 
              sub="Risk Anomalies Detected" 
              icon={<AlertCircle className="text-red-500" />} 
              urgent 
            />
          </div>

          {/* MAIN ORDER LEDGER */}
          <div className="bg-white border-2 border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-300">
                  <tr className="text-[11px] font-black text-slate-600 uppercase tracking-[0.3em]">
                    <th className="px-12 py-8">Order & Ledger Hash</th>
                    <th className="px-12 py-8">Supplier & Asset</th>
                    <th className="px-12 py-8">Lifecycle Node</th>
                    <th className="px-12 py-8">Settlement Status</th>
                    <th className="px-12 py-8">Risk Tier</th>
                    <th className="px-12 py-8 text-right">Allocation (USD)</th>
                    <th className="px-12 py-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-all duration-300 group">
                      <td className="px-12 py-10">
                        <div className="space-y-2">
                          <p className="text-lg font-black text-brand-darkNavy group-hover:text-brand-gold transition-colors">{order.id}</p>
                          <p className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded w-fit tracking-widest">{order.hash}</p>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="space-y-2">
                          <p className="text-sm font-black text-brand-darkNavy uppercase tracking-widest">{order.supplier}</p>
                          <p className="text-sm text-slate-500 font-medium italic">{order.item}</p>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="space-y-4 max-w-[220px]">
                          <div className="flex justify-between items-center text-[11px] font-black">
                             <span className="text-brand-darkNavy uppercase tracking-widest">{order.stage}</span>
                             <span className="text-slate-500 font-mono">{order.progress}%</span>
                          </div>
                          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                             <div className="h-full bg-brand-darkNavy rounded-full transition-all duration-1000" style={{ width: `${order.progress}%` }}></div>
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                             <Clock size={12} className="text-brand-gold" />
                             <span>{order.nextMilestone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className={`px-5 py-3 rounded-xl text-[10px] font-black tracking-[0.2em] border-2 text-center inline-block ${
                          order.financialStatus === 'ESCROW LOCKED' ? 'bg-blue-50 border-blue-200 text-blue-700' : 
                          order.financialStatus === 'PAID' ? 'bg-brand-success/10 border-brand-success/20 text-brand-success' :
                          'bg-slate-50 border-slate-200 text-brand-darkNavy'
                        }`}>
                          {order.financialStatus}
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className={`flex items-center space-x-3 text-xs font-black tracking-[0.2em] uppercase ${order.riskColor}`}>
                           <div className="w-3 h-3 rounded-full bg-current shadow-[0_0_15px_currentColor] animate-pulse"></div>
                           <span>{order.risk}</span>
                        </div>
                      </td>
                      <td className="px-12 py-10 text-right">
                        <p className="text-2xl font-mono font-black text-brand-darkNavy tracking-tighter">
                          ${order.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-12 py-10 text-right">
                         <button className="p-3 text-slate-300 hover:text-brand-darkNavy hover:bg-slate-100 rounded-full transition-all">
                            <MoreHorizontal size={24} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS FOOTER */}
        <footer className="mt-20 border-t border-slate-200 bg-white py-12 px-12">
          <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
             <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  <ShieldCheck size={20} className="text-brand-success" />
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Institutional Compliance: SOC2 Type II</span>
                </div>
                <div className="w-px h-6 bg-slate-200"></div>
                <div className="flex items-center space-x-4">
                  <Database size={20} className="text-brand-gold" />
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Ledger Node: Global-East-01</span>
                </div>
             </div>
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
               &copy; {new Date().getFullYear()} CLASSIC HOMES MARKETPLACE INC. • CONFIDENTIAL BOARDROOM DATA
             </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-5 px-6 py-5 rounded-2xl transition-all duration-300 group ${
    active ? 'bg-brand-gold text-brand-darkNavy shadow-2xl scale-[1.02]' : 'text-slate-400 hover:bg-white/5 hover:text-white'
  }`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-slate-500 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-sm font-black uppercase tracking-widest">{label}</span>
  </Link>
);

const StatCard: React.FC<{ label: string; value: string; sub: string; icon: React.ReactNode; urgent?: boolean }> = ({ label, value, sub, icon, urgent }) => (
  <div className={`bg-white border-2 p-12 rounded-[3.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${
    urgent ? 'border-red-200 bg-red-50/10' : 'border-slate-200'
  }`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
    <div className="relative z-10 space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.4em]">{label}</p>
        <div className={`p-4 rounded-2xl transition-all group-hover:rotate-12 ${
          urgent ? 'bg-red-100 text-red-600 shadow-lg shadow-red-200' : 'bg-slate-100 text-slate-400'
        }`}>
          {React.cloneElement(icon as React.ReactElement, { size: 28 })}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-6xl font-serif font-bold text-brand-darkNavy tracking-tighter leading-none group-hover:text-brand-gold transition-colors">{value}</h3>
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mt-4">{sub}</p>
      </div>
    </div>
  </div>
);
