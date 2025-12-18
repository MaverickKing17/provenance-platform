import React from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, Download, 
  ChevronDown, TrendingUp, Leaf, ArrowUpRight, Info, MessageSquare, Globe, ShieldCheck, Lock, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Analytics: React.FC = () => {
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
          <NavItem icon={<Box size={18} />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" active />
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
            <h1 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">Financial Performance</h1>
            <div className="flex items-center space-x-2 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]"><span>Sourcing Intelligence</span><span className="w-1 h-1 bg-brand-gold rounded-full"></span><span className="text-brand-success">Optimized Yield</span></div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-brand-navy/10 rounded-lg text-xs font-bold text-brand-darkNavy hover:bg-slate-50 transition-all shadow-sm group">
              <Download className="w-4 h-4 text-brand-mutedGray group-hover:text-brand-darkNavy" /><span>Export Report</span>
            </button>
            <div className="flex items-center space-x-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-brand-darkNavy cursor-pointer">
              <span className="text-brand-mutedGray uppercase tracking-widest text-[9px]">View:</span><span>FY 2025 Consolidated</span><ChevronDown className="w-4 h-4 text-brand-mutedGray" />
            </div>
          </div>
        </div>

        <div className="px-12 py-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <KPI icon={<TrendingUp />} label="Realized Savings" value="$842,500" trend="+12%" highlight />
            <KPI icon={<Target />} label="Budget Variance" value="-4.2%" trend="Under Target" />
            <KPI icon={<Leaf />} label="ESG Carbon Offset" value="124 Tons" trend="Net Positive" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-10 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <div className="space-y-1"><h3 className="text-xl font-serif font-bold text-brand-darkNavy">Spend Management</h3><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Actual vs. Predictive Simulation</p></div>
                <div className="flex items-center space-x-6">
                  <Legend color="bg-brand-darkNavy" label="Actual" />
                  <Legend color="border border-brand-gold" label="Budget" />
                  <Legend color="bg-brand-gold/30" label="AI Projection" />
                </div>
              </div>
              <div className="flex-grow h-80 relative mt-4">
                <div className="absolute inset-0 flex flex-col justify-between py-2">{[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-slate-100 border-dashed"></div>)}</div>
                <div className="absolute inset-0 flex items-end justify-around px-8">
                  {[
                    { m: 'Jan', a: 80, b: 75, p: 78 }, { m: 'Feb', a: 65, b: 70, p: 72 }, { m: 'Mar', a: 50, b: 55, p: 54 },
                    { m: 'Apr', a: 60, b: 58, p: 62 }, { m: 'May', a: 55, b: 52, p: 58 }, { m: 'Jun', a: 58, b: 60, p: 65 }, { m: 'Jul', a: 72, b: 68, p: 75 },
                  ].map((data, idx) => (
                    <div key={idx} className="relative group w-12 flex flex-col items-center">
                      <div className="w-full flex items-end justify-center space-x-0.5 h-full">
                        <div className="w-4 bg-brand-darkNavy rounded-t-sm transition-all duration-700 hover:bg-brand-gold" style={{ height: `${data.a}%` }}></div>
                        <div className="w-2 bg-brand-gold/20 rounded-t-sm" style={{ height: `${data.p}%` }}></div>
                      </div>
                      <span className="absolute -bottom-8 text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">{data.m}</span>
                    </div>
                  ))}
                </div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none"><path d="M 120,60 L 250,75 L 380,140 L 510,130 L 640,160 L 770,150 L 900,100" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" /></svg>
              </div>
              <div className="mt-20 p-6 bg-slate-50 border-l-4 border-brand-gold rounded-r-xl flex items-start space-x-4"><Info className="w-5 h-5 text-brand-gold mt-0.5" /><p className="text-xs text-brand-darkNavy">"Strategic bulk procurement in Q2 led to a <span className="font-bold">14% positive variance</span>, effectively optimizing global logistics overhead."</p></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
               <div className="mb-10"><h3 className="text-xl font-serif font-bold text-brand-darkNavy">Capital Allocation</h3><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Institutional Exposure Breakdown</p></div>
               <div className="relative flex items-center justify-center py-10">
                  <svg className="w-64 h-64 transform -rotate-90"><circle cx="128" cy="128" r="100" stroke="#F1F5F9" strokeWidth="24" fill="none" /><circle cx="128" cy="128" r="100" stroke="#1A2A44" strokeWidth="24" strokeDasharray="282.7" strokeDashoffset="0" fill="none" /><circle cx="128" cy="128" r="100" stroke="#D4AF37" strokeWidth="24" strokeDasharray="157" strokeDashoffset="-282.7" fill="none" /><circle cx="128" cy="128" r="100" stroke="#94A3B8" strokeWidth="24" strokeDasharray="125.6" strokeDashoffset="-439.7" fill="none" /></svg>
                  <div className="absolute flex flex-col items-center"><span className="text-3xl font-serif font-bold text-brand-darkNavy">45%</span><span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest text-center">Concentrated:<br/>Natural Stone</span></div>
               </div>
               <div className="mt-8 space-y-4">
                  <AllocationRow color="bg-brand-navy" label="Natural Stone" value="45%" />
                  <AllocationRow color="bg-brand-gold" label="Hardwoods" value="25%" />
                  <AllocationRow color="bg-slate-400" label="Structural Steel" value="20%" />
                  <AllocationRow color="bg-slate-200" label="Glass & Glazing" value="10%" />
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const KPI: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string; highlight?: boolean }> = ({ icon, label, value, trend, highlight }) => (
  <div className={`p-8 rounded-2xl border ${highlight ? 'bg-brand-darkNavy text-white border-white/10 shadow-2xl' : 'bg-white text-brand-darkNavy border-slate-200 shadow-sm'} relative overflow-hidden group`}>
    <p className={`text-[10px] font-black uppercase tracking-[0.25em] mb-4 ${highlight ? 'text-brand-offWhite/40' : 'text-brand-mutedGray'}`}>{label}</p>
    <div className="flex items-end space-x-4"><h2 className="text-4xl font-serif font-bold">{value}</h2><div className={`flex items-center px-2 py-0.5 rounded text-[9px] font-black border ${highlight ? 'bg-brand-success/20 border-brand-success/30 text-brand-success' : 'bg-slate-50 border-slate-200 text-brand-mutedGray'}`}><span>{trend}</span></div></div>
    <div className={`absolute top-6 right-8 p-3 rounded-xl ${highlight ? 'bg-white/5' : 'bg-slate-50'} group-hover:rotate-12 transition-transform`}>{icon}</div>
  </div>
);

const Legend: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center space-x-2"><div className={`w-3 h-3 rounded-sm ${color}`}></div><span className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">{label}</span></div>
);

const AllocationRow: React.FC<{ color: string; label: string; value: string }> = ({ color, label, value }) => (
  <div className="flex items-center justify-between py-2 group cursor-default">
    <div className="flex items-center space-x-3"><div className={`w-2 h-2 rounded-full ${color} group-hover:scale-125 transition-transform`}></div><span className="text-[11px] font-bold text-brand-darkNavy uppercase tracking-wider">{label}</span></div>
    <span className="text-xs font-black text-brand-darkNavy">{value}</span>
  </div>
);

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/10' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-bold tracking-wider">{label}</span>
  </Link>
);