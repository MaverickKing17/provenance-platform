
import React from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  Download, ChevronDown, TrendingUp, Leaf, ArrowUpRight, Info, MessageSquare, 
  Globe, ShieldCheck, Lock, Target, FileText, Activity, Zap, Cpu, MousePointer2,
  ExternalLink, ArrowRight, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRisk } from '../context/RiskContext';

export const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const { tier, color, label, isDemoMode } = useRisk();

  return (
    <div className="flex h-screen bg-brand-darkNavy overflow-hidden font-sans selection:bg-brand-gold selection:text-brand-darkNavy">
      
      {/* ELITE SIDEBAR */}
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
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" active />
          <NavItem icon={<Users size={18} />} label="Vetted Suppliers" to="/network" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest font-black">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* COMMAND VIEWPORT */}
      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* INSTITUTIONAL HEADER */}
        <header className="sticky top-0 z-40 bg-brand-darkNavy/80 backdrop-blur-3xl border-b border-white/5 px-12 py-10 shadow-sm overflow-visible">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-serif font-bold text-white tracking-tight leading-none">Intelligence Command</h1>
              <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-success"></span>
                </span>
                <span>Analytic Core Active</span>
                <span className="w-1 h-1 bg-brand-gold/40 rounded-full"></span>
                <span className="text-brand-offWhite/30">Verified Sourcing Yield</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
               <div className="hidden lg:flex items-center space-x-6 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Global Sourcing Index</span>
                     <span className="text-sm font-mono font-bold text-white tracking-tighter">94.2 <span className="text-brand-success text-xs">↑</span></span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 rounded-full bg-brand-success shadow-[0_0_10px_#10B981]"></div>
                     <span className="text-[10px] font-black text-brand-success uppercase tracking-widest">Optimized</span>
                  </div>
               </div>

               <button 
                 onClick={() => navigate('/executive-report')}
                 className="flex items-center space-x-4 px-10 py-4 bg-brand-gold text-brand-darkNavy rounded-xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-white transition-all shadow-2xl shadow-brand-gold/20 active:scale-95 group"
               >
                 <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                 <span>Synthesize Executive Briefing</span>
               </button>
            </div>
          </div>
        </header>

        <div className="px-12 py-12 space-y-12 max-w-[1600px] mx-auto w-full">
          
          {/* TOP KPI HUD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <KPIModule 
              icon={<TrendingUp size={24} />} 
              label="Realized Capital Yield" 
              value="$842,500" 
              trend="+18.4%" 
              highlight 
              subLabel="FYTD Sourcing Advantage"
            />
            <KPIModule 
              icon={<Target size={24} />} 
              label="Perimeter Risk Delta" 
              value="-4.2%" 
              trend="Favorable" 
              subLabel="Mitigated Supply Latency"
            />
            <KPIModule 
              icon={<Leaf size={24} />} 
              label="ESG Finality Score" 
              value="98.4" 
              trend="AAA Grade" 
              subLabel="Verified Carbon Offsets"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* SOURCING ALPHA MATRIX */}
            <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-[4rem] p-12 shadow-[0_60px_120px_rgba(0,0,0,0.4)] backdrop-blur-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="flex items-center justify-between mb-16 relative z-10">
                  <div className="space-y-1">
                     <h3 className="text-2xl font-serif font-bold text-white tracking-tight">Institutional Yield Analytics</h3>
                     <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Predictive Spend vs. Verified Provenance</p>
                  </div>
                  <div className="flex items-center space-x-8">
                     <Legend color="bg-brand-gold" label="Actual Yield" />
                     <Legend color="bg-white/10 border border-white/20" label="Market Index" />
                  </div>
               </div>

               <div className="h-96 relative mt-10 px-8">
                  <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-white/5">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-white/5 border-dashed"></div>)}
                  </div>
                  <div className="absolute inset-0 flex items-end justify-around px-12">
                     {[
                       { m: 'Jan', v: 82 }, { m: 'Feb', v: 65 }, { m: 'Mar', v: 88 },
                       { m: 'Apr', v: 72 }, { m: 'May', v: 94 }, { m: 'Jun', v: 78 }, { m: 'Jul', v: 98 },
                     ].map((data, idx) => (
                       <div key={idx} className="relative group/bar w-16 flex flex-col items-center">
                          <div className="w-full flex items-end justify-center space-x-1 h-full">
                             <div className="w-4 bg-brand-gold/20 rounded-t-sm group-hover/bar:bg-brand-gold/40 transition-all duration-700" style={{ height: `${data.v - 15}%` }}></div>
                             <div className="w-6 bg-brand-gold rounded-t-lg shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover/bar:scale-y-105 transition-all duration-500" style={{ height: `${data.v}%` }}></div>
                          </div>
                          <span className="absolute -bottom-10 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{data.m}</span>
                       </div>
                     ))}
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none">
                    <path d="M 120,80 L 250,110 L 380,70 L 510,130 L 640,90 L 770,60 L 900,40" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 6" />
                  </svg>
               </div>

               <div className="mt-24 p-8 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group/audit">
                  <div className="flex items-center space-x-6">
                     <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/20"><Activity size={24} className="text-brand-gold" /></div>
                     <div>
                        <p className="text-sm font-bold text-white tracking-tight">Institutional Recovery Insight</p>
                        <p className="text-xs text-white/40 leading-relaxed font-medium mt-1">
                          Consolidated bulk procurement via AI-Matched nodes recovered <span className="text-brand-success font-black">$242k</span> in logistics variance this cycle.
                        </p>
                     </div>
                  </div>
                  <button className="flex items-center space-x-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                     <span>Audit Details</span>
                     <ChevronRight size={14} className="group-hover/audit:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>

            {/* CAPITAL ALLOCATION RADAR */}
            <div className="lg:col-span-4 space-y-10">
               <section className="bg-brand-darkNavy border border-white/10 rounded-[4rem] p-12 shadow-2xl flex flex-col h-full relative overflow-hidden group">
                  <div className="mb-12">
                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight">Asset Distribution</h3>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-2">Concentrated Market Exposure</p>
                  </div>
                  
                  <div className="relative flex items-center justify-center py-10 scale-110 group-hover:scale-125 transition-transform duration-1000">
                    <svg className="w-64 h-64 transform -rotate-90">
                      <circle cx="128" cy="128" r="110" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 8" fill="none" className="opacity-10" />
                      <circle cx="128" cy="128" r="100" stroke="#050B15" strokeWidth="30" fill="none" />
                      <circle cx="128" cy="128" r="100" stroke="#D4AF37" strokeWidth="30" strokeDasharray="314.15" strokeDashoffset="0" fill="none" className="opacity-100 shadow-[0_0_30px_#D4AF37]" />
                      <circle cx="128" cy="128" r="100" stroke="#10B981" strokeWidth="30" strokeDasharray="157" strokeDashoffset="-314.15" fill="none" />
                      <circle cx="128" cy="128" r="100" stroke="#FFFFFF" strokeWidth="30" strokeDasharray="100" strokeDashoffset="-471.15" fill="none" className="opacity-20" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                       <span className="text-4xl font-serif font-bold text-white">45%</span>
                       <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] text-center">Natural<br/>Stone</span>
                    </div>
                  </div>

                  <div className="mt-12 space-y-4">
                     <AllocationRow color="bg-brand-gold" label="Artisan Stone Nodes" value="45.2%" />
                     <AllocationRow color="bg-brand-success" label="Sustainable Hardwoods" value="24.8%" />
                     <AllocationRow color="bg-white/20" label="Strategic Glazing" value="18.1%" />
                     <AllocationRow color="bg-white/5 border border-white/10" label="Structural Metal" value="11.9%" />
                  </div>
                  
                  <div className="pt-10 mt-auto border-t border-white/5">
                     <button className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center space-x-3 transition-all group/btn">
                        <Lock size={16} className="text-brand-gold" />
                        <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">Rebalance Risk Perimeter</span>
                     </button>
                  </div>
               </section>
            </div>
          </div>

          {/* RISK TELEMETRY FOOTER */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <MetricHUD icon={<Globe size={16} />} label="Global Node Sync" value="Optimal" color="text-brand-success" />
             <MetricHUD icon={<ShieldCheck size={16} />} label="Compliance Audit" value="Verified" color="text-brand-success" />
             <MetricHUD icon={<Zap size={16} />} label="Logistics Latency" value="12ms" color="text-brand-gold" />
             <MetricHUD icon={<Cpu size={16} />} label="ML Model Health" value="AAA Grade" color="text-brand-gold" />
          </div>
        </div>

        {/* COMPREHENSIVE INSTITUTIONAL FOOTER */}
        <footer className="bg-black/40 py-20 px-12 border-t border-white/5 relative overflow-hidden shrink-0 mt-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            
            <div className="space-y-8 col-span-1">
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center rounded-sm">
                     <div className="w-5 h-5 bg-brand-gold"></div>
                  </div>
                  <span className="text-xl font-serif font-bold text-white uppercase tracking-tighter">Classic Homes</span>
               </div>
               <p className="text-xs text-brand-offWhite/30 leading-relaxed font-medium uppercase tracking-widest max-w-[200px]">
                 Enterprise-Grade Procurement Integrity and Global Sourcing.
               </p>
               <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
                  <ShieldCheck size={16} />
                  <span>SOC2 TYPE II COMPLIANT</span>
               </div>
            </div>

            <div className="space-y-8">
               <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Corporate Governance</h5>
               <ul className="space-y-5">
                  <li><FooterLink label="Privacy Sovereign Protocol" to="/privacy-policy" /></li>
                  <li><FooterLink label="Institutional Terms of Service" to="/terms-of-service" /></li>
                  <li><FooterLink label="Boardroom Reporting Hub" to="/executive-report" /></li>
                  <li><FooterLink label="Data Partitioning Controls" to="/settings" /></li>
               </ul>
            </div>

            <div className="space-y-8">
               <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Market Intelligence</h5>
               <ul className="space-y-5">
                  <li><FooterLink label="Vetted Artisan Network" to="/network" /></li>
                  <li><FooterLink label="Real-time Sourcing Matrix" to="/analytics" /></li>
                  <li><FooterLink label="Supply Chain Risk Advisory" to="/executive-command" /></li>
                  <li><FooterLink label="Material Provenance Audits" to="/materials" /></li>
               </ul>
            </div>

            <div className="space-y-10">
               <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Priority Concierge</h5>
               <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                  <p className="text-xs text-brand-offWhite/60 font-medium leading-relaxed">
                    Dedicated support node active for Q4 Treasury Cycles.
                  </p>
                  <button className="w-full py-4 bg-brand-gold text-brand-darkNavy font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-xl transform active:scale-95">
                    Initialize Bridge
                  </button>
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

const KPIModule: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string; subLabel: string; highlight?: boolean }> = ({ icon, label, value, trend, subLabel, highlight }) => (
  <div className={`p-10 border transition-all duration-700 rounded-[3.5rem] relative overflow-hidden group hover:scale-[1.02] ${highlight ? 'bg-white text-brand-darkNavy border-white shadow-[0_40px_100px_rgba(0,0,0,0.5)]' : 'bg-white/5 text-white border-white/10 hover:border-brand-gold/40'}`}>
     <div className="flex items-center justify-between mb-10 relative z-10">
        <div className={`p-4 rounded-2xl ${highlight ? 'bg-brand-darkNavy text-brand-gold shadow-lg shadow-brand-gold/10' : 'bg-white/5 text-brand-gold border border-white/10'}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${highlight ? 'bg-brand-success/10 text-brand-success' : 'bg-brand-success/20 text-brand-success'}`}>
          {trend}
        </span>
     </div>
     <div className="space-y-2 relative z-10">
        <p className={`text-[10px] font-black uppercase tracking-[0.4em] leading-none mb-4 ${highlight ? 'text-brand-darkNavy/40' : 'text-white/40'}`}>{label}</p>
        <h3 className="text-5xl font-serif font-bold tracking-tighter leading-none">{value}</h3>
        <p className={`text-[11px] font-bold uppercase tracking-widest leading-none mt-6 ${highlight ? 'text-brand-darkNavy/60' : 'text-brand-gold'}`}>{subLabel}</p>
     </div>
     {highlight && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>}
  </div>
);

const AllocationRow: React.FC<{ color: string; label: string; value: string }> = ({ color, label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 group/row cursor-default">
    <div className="flex items-center space-x-4">
      <div className={`w-2.5 h-2.5 rounded-full ${color} group-hover/row:scale-125 transition-transform duration-500 shadow-[0_0_10px_currentColor]`}></div>
      <span className="text-[11px] font-bold text-white/70 uppercase tracking-widest group-hover/row:text-white transition-colors">{label}</span>
    </div>
    <span className="text-xs font-mono font-bold text-white tracking-widest">{value}</span>
  </div>
);

const MetricHUD: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all">
     <div className="flex items-center space-x-4">
        <div className="text-white/20 group-hover:text-brand-gold transition-colors">{icon}</div>
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{label}</span>
     </div>
     <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{value}</span>
  </div>
);

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-xl shadow-brand-gold/10' : 'text-brand-offWhite/30 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-black uppercase tracking-widest leading-none">{label}</span>
  </Link>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to} className="group flex items-center space-x-3 text-brand-offWhite/30 hover:text-brand-gold transition-all duration-300">
     <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
     <span className="text-[11px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </Link>
);

const Legend: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center space-x-3">
    <div className={`w-3 h-3 rounded-full ${color}`}></div>
    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{label}</span>
  </div>
);
