
import React from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  Search, Filter, FileText, MoreHorizontal, AlertCircle, Clock, ShieldCheck, Globe, TrendingUp, CheckCircle2, Lock, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

export const Orders: React.FC = () => {
  const { isLocked } = useRisk();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
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
        <div className="bg-white border-b border-slate-200 px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-0 z-10 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">Order Management</h1>
            <div className="flex items-center space-x-2 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]"><span>Active Pipeline</span><span className="w-1 h-1 bg-brand-gold rounded-full"></span><span className="text-brand-mutedGray">Lifecycle Tracking</span></div>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative group flex-grow md:flex-grow-0"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mutedGray" /><input type="text" placeholder="Search orders, contracts..." className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full md:w-80 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all" /></div>
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-brand-gold text-brand-darkNavy rounded-lg text-xs font-black uppercase tracking-widest hover:bg-brand-goldHover transition-all shadow-lg shadow-brand-gold/10"><FileText className="w-4 h-4" /><span>Export Report</span></button>
          </div>
        </div>

        <div className="px-12 py-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Active Volume" value="$114,150.00" sub="Across 4 active pipelines" icon={<Box className="text-blue-500" />} />
            <StatCard label="Supply Chain Health" value="92%" sub="On-time delivery rate" icon={<TrendingUp className="text-brand-success" />} />
            <StatCard label="Critical Actions" value="2 Pending" sub="1 Risk Flag, 1 Quality Audit" icon={<AlertCircle className="text-brand-amber" />} urgent />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-200"><tr className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest"><th className="px-8 py-5">Order & Project</th><th className="px-8 py-5">Supplier & Items</th><th className="px-8 py-5">Lifecycle Stage</th><th className="px-8 py-5">Financial Status</th><th className="px-8 py-5">Risk Assessment</th><th className="px-8 py-5 text-right">Total Value</th><th className="px-8 py-5"></th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {ORDERS_DATA.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                      <td className="px-8 py-6 flex flex-col"><span className="text-sm font-bold text-brand-darkNavy group-hover:text-brand-gold transition-colors">{order.id}</span><span className="text-[11px] text-brand-mutedGray">{order.project}</span></td>
                      <td className="px-8 py-6"><div className="flex flex-col"><span className="text-xs font-bold text-brand-darkNavy">{order.supplier}</span><span className="text-[11px] text-brand-mutedGray italic">{order.item}</span></div></td>
                      <td className="px-8 py-6"><div className="space-y-2 max-w-[180px]"><div className="flex justify-between items-center text-[10px] font-bold"><span className="text-brand-darkNavy uppercase">{order.stage}</span><span className="text-brand-mutedGray">{order.progress}%</span></div><div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-brand-navy rounded-full transition-all duration-1000" style={{ width: `${order.progress}%` }}></div></div><div className="flex items-center space-x-1.5 text-[9px] text-brand-mutedGray"><Clock size={10} /><span>Next: {order.nextMilestone}</span></div></div></td>
                      <td className="px-8 py-6">
                        <button 
                          disabled={isLocked}
                          className={`px-3 py-1.5 rounded-md text-[9px] font-black tracking-widest border transition-all ${isLocked ? 'bg-red-500/10 border-red-500/20 text-red-500' : order.financialStatus === 'ESCROW LOCKED' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-brand-darkNavy'}`}
                        >
                          {isLocked ? 'LOCKED: RESOLVE RISK' : order.financialStatus}
                        </button>
                      </td>
                      <td className="px-8 py-6"><div className={`flex items-center space-x-2 text-[10px] font-black tracking-widest uppercase ${order.riskColor}`}><div className="w-1.5 h-1.5 rounded-full bg-current"></div><span>{order.risk}</span></div></td>
                      <td className="px-8 py-6 text-right font-bold text-sm text-brand-darkNavy">${order.value.toLocaleString()}</td>
                      <td className="px-8 py-6 text-right"><button className="text-slate-300 hover:text-brand-darkNavy p-1"><MoreHorizontal size={20} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SETTLEMENT FOOTER - Functional Links Updated */}
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
      <div className="fixed bottom-10 right-10 z-50"><div className="bg-brand-gold p-4 rounded-2xl shadow-2xl flex items-center space-x-4 cursor-pointer hover:bg-brand-goldHover transition-all group"><div className="w-10 h-10 bg-brand-darkNavy rounded-xl flex items-center justify-center"><MessageSquare size={20} className="text-brand-gold" /></div><div className="flex flex-col pr-2"><span className="text-[11px] text-brand-darkNavy font-black uppercase tracking-widest">Live Concierge</span><span className="text-[10px] text-brand-darkNavy/70 font-bold">Priority Support</span></div></div></div>
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
    <div className="flex items-start justify-between relative z-10"><div className="space-y-4"><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.25em]">{label}</p><div className="space-y-1"><h3 className="text-3xl font-serif font-bold text-brand-darkNavy group-hover:text-brand-gold transition-colors">{value}</h3><p className="text-[11px] font-medium text-brand-mutedGray">{sub}</p></div></div><div className={`p-4 rounded-xl ${urgent ? 'bg-brand-amber/10 text-brand-amber' : 'bg-slate-50 text-slate-400'}`}>{icon}</div></div>
  </div>
);
