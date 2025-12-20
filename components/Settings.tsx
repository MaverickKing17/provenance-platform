
import React from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  ShieldCheck, Lock, Globe, Key, User, Terminal, CheckCircle2, FlaskConical,
  Database, Activity, Fingerprint, ShieldAlert, Cpu, History, ArrowUpRight,
  Shield, Server, Cloud, Smartphone, Zap, Eye, Save, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRisk } from '../context/RiskContext';

export const SettingsPage: React.FC = () => {
  const { isDemoMode, setDemoMode } = useRisk();

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
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Suppliers" to="/network" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" active />
        </nav>
        
        {/* STRATEGIC SIMULATION OVERRIDE */}
        <div className="mt-auto px-6 py-8 border-t border-white/5 bg-black/20">
          <div className="space-y-4">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] ml-1">System Overrides</span>
            <div 
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${isDemoMode ? 'bg-brand-gold/10 border-brand-gold/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
              onClick={() => setDemoMode(!isDemoMode)}
            >
              <div className="flex items-center space-x-3">
                <FlaskConical size={16} className={isDemoMode ? "text-brand-gold animate-pulse" : "text-white/20"} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Simulation Mode</span>
                  <span className="text-[8px] text-white/30 uppercase mt-1">Tier-2 Volatility</span>
                </div>
              </div>
              <div className={`w-8 h-4 rounded-full transition-colors relative ${isDemoMode ? 'bg-brand-gold' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-brand-darkNavy rounded-full transition-all ${isDemoMode ? 'left-[18px]' : 'left-0.5'}`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest font-black">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CONFIGURATION PERIMETER */}
      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <header className="bg-white border-b border-slate-200 px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8 sticky top-0 z-30 shadow-sm backdrop-blur-xl bg-white/90">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none uppercase tracking-tighter">Sovereign Protocol Settings</h1>
            <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
              <ShieldCheck size={14} className="text-brand-success" />
              <span>Governance Active</span>
              <span className="w-1 h-1 bg-brand-gold/40 rounded-full"></span>
              <span className="text-brand-mutedGray">SOC2 Real-time compliance monitoring</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl mr-4">
               <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest leading-none mb-1">Last Config Sync</span>
                  <span className="text-xs font-mono font-bold text-brand-darkNavy tracking-tighter">02:42:15 GMT</span>
               </div>
               <Activity size={18} className="text-brand-success animate-pulse" />
            </div>
            <button className="px-10 py-4 bg-brand-darkNavy text-white rounded-xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl shadow-brand-darkNavy/20 transform active:scale-95 flex items-center space-x-3">
              <Save size={16} className="text-brand-gold" />
              <span>Commit Changes</span>
            </button>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto w-full px-12 py-12">
          {/* TELEMETRY HUD */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <MetricHUD icon={<Shield size={20} />} label="Security Perimeter" value="AES-256-GCM" status="Hardened" />
            <MetricHUD icon={<Fingerprint size={20} />} label="Auth Protocol" value="OIDC + MFA" status="Secured" />
            <MetricHUD icon={<Server size={20} />} label="Region Latency" value="12ms" status="Optimal" />
            <MetricHUD icon={<History size={20} />} label="Audit Consistency" value="100.0%" status="Verified" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-12">
              
              {/* DOMAIN 1: IDENTITY */}
              <section className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center space-x-6 mb-12 border-b border-slate-50 pb-8">
                  <div className="p-4 bg-brand-darkNavy rounded-2xl text-brand-gold"><User size={28} /></div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">Identity & Governance</h3>
                    <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest mt-2">Manage Institutional C-Suite Credentials</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.3em] ml-1">Executive Display Name</label>
                    <input type="text" defaultValue="Vance Sterling" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold text-brand-darkNavy focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.3em] ml-1">Organizational Title</label>
                    <input type="text" defaultValue="Chief Procurement Officer" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold text-brand-darkNavy focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div className="space-y-3 col-span-2">
                    <label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.3em] ml-1">Institutional Email Perimeter</label>
                    <div className="relative">
                      <input type="email" defaultValue="v.sterling@classichomes.ai" disabled className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-mono font-bold text-slate-400 cursor-not-allowed" />
                      <Lock size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>
                </div>
              </section>

              {/* DOMAIN 2: INFRASTRUCTURE */}
              <section className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center space-x-6 mb-12 border-b border-slate-50 pb-8">
                  <div className="p-4 bg-brand-darkNavy rounded-2xl text-brand-gold"><Key size={28} /></div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-brand-darkNavy tracking-tight leading-none">Intelligence Bridges</h3>
                    <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest mt-2">API Infrastructure & External Data Nodes</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <IntegrationCard 
                    icon={<Database size={20} />} 
                    title="Xano Backend Protocol" 
                    sub="Primary Ledger Environment: Production-US-West" 
                    status="Connected" 
                    type="success"
                  />
                  <IntegrationCard 
                    icon={<Cloud size={20} />} 
                    title="Oracle Treasury Feed" 
                    sub="Awaiting institutional API handshake..." 
                    status="Incomplete" 
                    type="warning"
                  />
                  <IntegrationCard 
                    icon={<Smartphone size={20} />} 
                    title="Duo MFA Synchronization" 
                    sub="Device ID: 0x882...a2e9 (Sterling-Primary)" 
                    status="Verified" 
                    type="success"
                  />
                </div>
              </section>

            </div>

            <div className="lg:col-span-4 space-y-10">
              {/* DOMAIN 3: AUDIT TRAIL */}
              <section className="bg-brand-darkNavy rounded-[3rem] p-10 text-white shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50"></div>
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-xl font-serif font-bold uppercase tracking-tight">Configuration Ledger</h3>
                   <History size={20} className="text-brand-gold" />
                </div>
                <div className="space-y-8 relative z-10">
                   <AuditItem time="10:42 AM" action="MFA Policy Update" user="V. Sterling" />
                   <AuditItem time="09:15 AM" action="Xano Node Sync" user="System Root" />
                   <AuditItem time="Yesterday" action="API Key Rotation" user="V. Sterling" />
                   <AuditItem time="Oct 28" action="New Admin Authorized" user="Executive Board" />
                </div>
                <button className="w-full mt-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center space-x-3 transition-all group">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em]">Full Sovereignty Report</span>
                   <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </button>
              </section>

              {/* PRIVACY SHIELD MODULE */}
              <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-[3rem] p-10 space-y-8 shadow-2xl">
                 <div className="flex items-center space-x-4">
                    <ShieldAlert className="text-brand-gold" size={24} />
                    <span className="text-[11px] font-black text-brand-darkNavy uppercase tracking-[0.3em]">Data Residency Tier</span>
                 </div>
                 <p className="text-xs text-brand-mutedGray leading-relaxed font-medium">
                   Your workspace data is pinned to <span className="text-brand-darkNavy font-black underline">US-WEST-S1</span>. No PII is exposed to cross-regional sourcing nodes.
                 </p>
                 <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-brand-gold">
                    <span>Zero-Knowledge Enabled</span>
                    <CheckCircle2 size={14} />
                 </div>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE INSTITUTIONAL FOOTER */}
          <footer className="mt-32 pt-20 border-t border-slate-200 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
              <div className="space-y-8 col-span-1">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center rounded-sm">
                       <div className="w-5 h-5 bg-brand-gold"></div>
                    </div>
                    <span className="text-xl font-serif font-bold text-brand-darkNavy uppercase tracking-tighter leading-none">Classic Homes</span>
                 </div>
                 <p className="text-xs text-brand-mutedGray leading-relaxed font-medium uppercase tracking-widest max-w-[200px]">Enterprise Procurement Integrity for Global Artisan Sourcing.</p>
                 <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
                    <ShieldCheck size={16} />
                    <span>SOC2 TYPE II COMPLIANT</span>
                 </div>
              </div>
              <div className="space-y-8">
                 <h5 className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.4em]">Corporate Governance</h5>
                 <ul className="space-y-5">
                    <li><FooterLink label="Privacy Sovereign Protocol" to="/privacy-policy" /></li>
                    <li><FooterLink label="Institutional Terms" to="/terms-of-service" /></li>
                    <li><FooterLink label="System Status Console" to="/sourcing-hub" /></li>
                 </ul>
              </div>
              <div className="space-y-8">
                 <h5 className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.4em]">Resource Access</h5>
                 <ul className="space-y-5">
                    <li><FooterLink label="Artisan Network Nodes" to="/network" /></li>
                    <li><FooterLink label="Executive Command Center" to="/executive-command" /></li>
                    <li><FooterLink label="Financial Settlement Hub" to="/wallet" /></li>
                 </ul>
              </div>
              <div className="space-y-10">
                 <h5 className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.4em]">Support Bridge</h5>
                 <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Dedicated concierge bridge active for Treasury Cycles.</p>
                    <button className="w-full py-4 bg-brand-darkNavy text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-black transition-all shadow-xl">Contact Analyst</button>
                 </div>
              </div>
            </div>
            <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
               <p className="text-[9px] font-black text-brand-darkNavy uppercase tracking-[0.3em]">&copy; 2025 CLASSIC HOMES MARKETPLACE INC.</p>
               <div className="flex items-center space-x-8 text-[9px] font-black text-brand-darkNavy uppercase tracking-[0.3em]">
                  <span>Build Node: v2.5.42-Stable</span>
                  <span>Environment: US-PROD-01</span>
               </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-xl shadow-brand-gold/10' : 'text-brand-offWhite/30 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-black uppercase tracking-widest">{label}</span>
  </Link>
);

const MetricHUD: React.FC<{ icon: React.ReactNode; label: string; value: string; status: string }> = ({ icon, label, value, status }) => (
  <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between group hover:border-brand-gold/30 transition-all">
     <div className="flex items-center justify-between text-brand-mutedGray group-hover:text-brand-gold transition-colors mb-6">
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">{label}</span>
        {icon}
     </div>
     <div className="space-y-1">
        <p className="text-xl font-mono font-bold text-brand-darkNavy tracking-tighter">{value}</p>
        <span className="text-[8px] font-black text-brand-success uppercase tracking-widest">{status}</span>
     </div>
  </div>
);

const IntegrationCard: React.FC<{ icon: React.ReactNode; title: string; sub: string; status: string; type: 'success' | 'warning' }> = ({ icon, title, sub, status, type }) => (
  <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-slate-100 transition-all group/card">
    <div className="flex items-center space-x-6">
       <div className="p-3 bg-white rounded-xl shadow-sm group-hover/card:text-brand-gold transition-colors">{icon}</div>
       <div>
          <p className="text-sm font-bold text-brand-darkNavy uppercase tracking-tight">{title}</p>
          <p className="text-[10px] text-brand-mutedGray font-medium mt-1">{sub}</p>
       </div>
    </div>
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${type === 'success' ? 'bg-brand-success/10 border-brand-success/20 text-brand-success' : 'bg-brand-amber/10 border-brand-amber/20 text-brand-amber'}`}>
       <div className={`w-1.5 h-1.5 rounded-full ${type === 'success' ? 'bg-brand-success shadow-[0_0_10px_#10B981]' : 'bg-brand-amber animate-pulse shadow-[0_0_10px_#F59E0B]'}`}></div>
       <span>{status}</span>
    </div>
  </div>
);

const AuditItem: React.FC<{ time: string; action: string; user: string }> = ({ time, action, user }) => (
  <div className="flex items-start space-x-4 group/item">
     <div className="w-px h-12 bg-white/10 group-hover/item:bg-brand-gold/30 transition-colors mt-1 relative">
        <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-white/20 group-hover/item:bg-brand-gold transition-colors"></div>
     </div>
     <div className="space-y-1">
        <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">{action}</p>
        <div className="flex items-center space-x-3 text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">
           <span>{time}</span>
           <span className="w-1 h-1 bg-white/10 rounded-full"></span>
           <span className="text-brand-gold/60">{user}</span>
        </div>
     </div>
  </div>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to} className="group flex items-center space-x-3 text-brand-mutedGray hover:text-brand-gold transition-all duration-300">
     <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
     <span className="text-[11px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </Link>
);
