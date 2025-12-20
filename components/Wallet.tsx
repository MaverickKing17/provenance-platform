
import React from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  ArrowUpRight, ArrowDownRight, ShieldCheck, Lock, Globe, TrendingUp, MessageSquare, 
  CreditCard, History, ShieldAlert, Fingerprint, Activity, Zap, ExternalLink,
  Search, FileText, Scale, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRisk } from '../context/RiskContext';

export const WalletPage: React.FC = () => {
  const { tier, isLocked, isDemoMode } = useRisk();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* INSTITUTIONAL SIDEBAR */}
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
          <NavItem icon={<Wallet size={18} />} label="Wallet" active />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Vetted Suppliers" to="/network" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col overflow-y-auto relative">
        
        {/* VIEWPORT HEADER */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-12 py-10 shadow-sm overflow-visible">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">Institutional Wallet</h1>
              <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-success"></span>
                </span>
                <span>Treasury Node Active</span>
                <span className="w-1 h-1 bg-brand-gold/40 rounded-full"></span>
                <span className="text-brand-mutedGray">Verified Liquidity Perimeter</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-brand-mutedGray hover:text-brand-darkNavy transition-all">
                <Search size={20} />
              </button>
              <button 
                disabled={isLocked || isDemoMode}
                className={`px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl flex items-center space-x-3 active:scale-95 ${
                  isLocked || isDemoMode 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/30 opacity-80 cursor-not-allowed' 
                    : 'bg-brand-gold text-brand-darkNavy hover:bg-brand-goldHover shadow-brand-gold/20'
                }`}
              >
                <Zap size={16} className={isLocked || isDemoMode ? '' : 'fill-brand-darkNavy'} />
                <span>{isLocked || isDemoMode ? 'Transfers Restricted' : 'Add Capital Injection'}</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-12 py-12 space-y-12 max-w-[1600px] mx-auto w-full flex-grow">
          
          {/* RISK OVERRIDE ADVISORY */}
          {(isLocked || isDemoMode) && (
            <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[2.5rem] flex items-center space-x-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="p-5 bg-red-500/10 rounded-2xl border border-red-500/20">
                <ShieldAlert className="text-red-500 w-10 h-10 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-red-600 uppercase tracking-tight leading-none">Capital Perimeter Integrity Warning</h4>
                <p className="text-xs text-red-500/70 font-bold uppercase tracking-widest">
                  Strategic holds active on all ESCROW-LEVEL transactions due to Sterling Residence Volatility.
                </p>
                <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-red-500/10">
                   <button className="text-[10px] font-black text-red-600 underline uppercase tracking-widest hover:text-red-800 transition-colors">Review Risk Nodes</button>
                   <span className="text-[10px] text-red-300 font-mono">CODE: SEV-1-FIN-LOCK</span>
                </div>
              </div>
            </div>
          )}

          {/* BALANCE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7 bg-brand-darkNavy rounded-[3rem] p-12 text-white shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 blur-[150px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-gold/20 transition-all duration-1000"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between space-y-16">
                 <div className="flex justify-between items-start">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-brand-offWhite/40 uppercase tracking-[0.4em]">Total Institutional Liquidity</p>
                       <h2 className="text-7xl font-serif font-bold tracking-tighter leading-none">$2,450,000.00</h2>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                       <Globe size={24} className="text-brand-gold" />
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-12 border-t border-white/5">
                    <div className="flex items-center space-x-8">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-brand-offWhite/20 uppercase tracking-widest">Vault ID</p>
                          <p className="text-xs font-mono font-bold text-brand-gold">0x882...A2E9</p>
                       </div>
                       <div className="w-px h-8 bg-white/10"></div>
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-brand-offWhite/20 uppercase tracking-widest">Node Stability</p>
                          <div className="flex items-center space-x-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-success shadow-[0_0_10px_#10B981]"></div>
                             <span className="text-[10px] font-black uppercase tracking-widest">99.9% Optimal</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-brand-success/10 border border-brand-success/20 rounded-xl text-brand-success">
                       <ArrowUpRight size={14} />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">+4.2% FYTD</span>
                    </div>
                 </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl flex flex-col justify-between group hover:border-brand-gold/30 transition-all duration-700">
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.4em]">Active Escrow Protected</p>
                    <Lock size={20} className="text-brand-gold" />
                 </div>
                 <h2 className="text-5xl font-serif font-bold text-brand-darkNavy tracking-tighter">$482,500.00</h2>
                 <p className="text-xs text-brand-mutedGray font-medium leading-relaxed">
                   Currently backing <span className="text-brand-darkNavy font-bold">3 Strategic Artisan Nodes</span> under smart-contract governance.
                 </p>
              </div>

              <div className="pt-8 space-y-4">
                 <button className="w-full flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all group/btn">
                    <div className="flex items-center space-x-4">
                       <div className="p-2 bg-white rounded-lg shadow-sm text-brand-gold"><Database size={16} /></div>
                       <span className="text-[10px] font-black text-brand-darkNavy uppercase tracking-widest">View Active Contracts</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </div>

          {/* RE-ENGINEERED TABLE MODULE */}
          <div className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-2xl animate-in fade-in duration-1000">
            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center space-x-5">
                  <div className="p-4 bg-brand-darkNavy rounded-2xl text-brand-gold"><History size={24} /></div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-brand-darkNavy tracking-tight">Financial Provenance Ledger</h3>
                    <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Immutable Institutional Record v2.5</p>
                  </div>
               </div>
               <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-brand-mutedGray uppercase tracking-widest hover:text-brand-darkNavy transition-all">
                    <Search size={14} />
                    <span>Filter Ledger</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-brand-darkNavy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                    <FileText size={14} className="text-brand-gold" />
                    <span>Download CSV Audit</span>
                  </button>
               </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/70"><tr className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.25em]"><th className="px-10 py-6">Audit ID</th><th className="px-10 py-6">Transaction Type & Node</th><th className="px-10 py-6">Verification Protocol</th><th className="px-10 py-6 text-right">Value (USD)</th><th className="px-10 py-6"></th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  <TransactionRow 
                    id="0XF28A...91D2" 
                    type="Escrow Lock: Tuscany Stoneworks" 
                    status="Verified Integrity" 
                    amount="-$48,250.00" 
                    negative 
                    time="14:12 GMT • Oct 28"
                  />
                  <TransactionRow 
                    id="0X82C1...B042" 
                    type="Institutional Capital Injection" 
                    status="Treasury Settled" 
                    amount="+$150,000.00" 
                    time="09:05 GMT • Oct 25"
                  />
                  <TransactionRow 
                    id="0X991A...E882" 
                    type="Strategic Settlement: Kyoto Timber" 
                    status="Node Finalized" 
                    amount="-$35,000.00" 
                    negative 
                    time="18:30 GMT • Oct 22"
                  />
                  <TransactionRow 
                    id="0XD4B5...22A1" 
                    type="Escrow Release: Apex Materials" 
                    status="Audit Complete" 
                    amount="-$12,400.00" 
                    negative 
                    time="11:45 GMT • Oct 18"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE INSTITUTIONAL FOOTER */}
        <footer className="bg-brand-darkNavy py-20 px-12 border-t border-white/5 relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            
            <div className="space-y-8 col-span-1">
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center rounded-sm">
                     <div className="w-5 h-5 bg-brand-gold"></div>
                  </div>
                  <span className="text-xl font-serif font-bold text-white uppercase tracking-tighter">Classic Homes</span>
               </div>
               <p className="text-xs text-brand-offWhite/40 leading-relaxed font-medium uppercase tracking-widest max-w-[200px]">
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

          <div className="max-w-[1600px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
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
    <span className="text-xs font-bold tracking-wider uppercase tracking-widest">{label}</span>
  </Link>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to} className="group flex items-center space-x-3 text-brand-offWhite/40 hover:text-brand-gold transition-all duration-300">
     <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
     <span className="text-[11px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </Link>
);

const TransactionRow: React.FC<{ id: string; type: string; status: string; amount: string; negative?: boolean; time: string }> = ({ id, type, status, amount, negative, time }) => (
  <tr className="hover:bg-slate-50/80 transition-all group cursor-pointer border-l-4 border-transparent hover:border-brand-gold">
    <td className="px-10 py-8">
      <div className="flex flex-col space-y-1.5">
         <span className="text-[11px] font-mono font-black text-brand-darkNavy tracking-tighter bg-slate-100 px-2.5 py-1 rounded w-fit">{id}</span>
         <span className="text-[9px] font-bold text-brand-mutedGray uppercase tracking-widest">{time}</span>
      </div>
    </td>
    <td className="px-10 py-8">
      <div className="flex items-center space-x-4">
         <div className={`p-2.5 rounded-xl ${negative ? 'bg-red-50 text-red-400' : 'bg-brand-success/10 text-brand-success'}`}>
           {negative ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
         </div>
         <span className="text-sm font-black text-brand-darkNavy group-hover:text-brand-gold transition-colors">{type}</span>
      </div>
    </td>
    <td className="px-10 py-8">
      <div className="flex items-center space-x-3">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-success shadow-[0_0_10px_#10B981]"></div>
        <span className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.2em]">{status}</span>
      </div>
    </td>
    <td className={`px-10 py-8 text-right font-mono font-black text-base tracking-tighter ${negative ? 'text-brand-darkNavy' : 'text-brand-success'}`}>
      {amount}
    </td>
    <td className="px-10 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
       <button className="p-3 bg-white border border-slate-200 rounded-xl hover:border-brand-gold transition-all shadow-sm">
          <ExternalLink size={14} className="text-brand-gold" />
       </button>
    </td>
  </tr>
);

const ChevronRight = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);
