import React from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  ShieldCheck, Lock, Globe, Key, User, Bell, Database, CheckCircle2, MessageSquare, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
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
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Vetted Suppliers" to="/network" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" active />
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
            <h1 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">System Settings</h1>
            <div className="flex items-center space-x-2 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]"><span>Governance & Security</span><span className="w-1 h-1 bg-brand-gold rounded-full"></span><span className="text-brand-success">SOC2 Active</span></div>
          </div>
          <button className="px-6 py-3 bg-brand-navy text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg">Save Configuration</button>
        </div>

        <div className="px-12 py-10 space-y-10 max-w-5xl">
          <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center space-x-4 mb-8 border-b border-slate-50 pb-6"><div className="p-3 bg-slate-50 rounded-xl text-brand-navy"><User size={20} /></div><div><h3 className="font-serif font-bold text-brand-darkNavy text-lg">Identity & Authorization</h3><p className="text-xs text-brand-mutedGray uppercase tracking-widest font-bold">Manage C-Suite Credentials</p></div></div>
            <div className="grid grid-cols-2 gap-8"><div className="space-y-2"><label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Full Display Name</label><input type="text" defaultValue="Vance Sterling" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" /></div><div className="space-y-2"><label className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Job Title</label><input type="text" defaultValue="Chief Procurement Officer" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold" /></div></div>
          </section>

          <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center space-x-4 mb-8 border-b border-slate-50 pb-6"><div className="p-3 bg-slate-50 rounded-xl text-brand-navy"><Key size={20} /></div><div><h3 className="font-serif font-bold text-brand-darkNavy text-lg">API & Integrations</h3><p className="text-xs text-brand-mutedGray uppercase tracking-widest font-bold">Institutional Data Bridges</p></div></div>
            <div className="space-y-6"><div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl"><div><p className="text-xs font-bold text-brand-darkNavy">Xano Backend Bridge</p><p className="text-[10px] text-brand-mutedGray">Active Connection: Production-Node-01</p></div><div className="flex items-center space-x-2 text-brand-success text-[10px] font-black uppercase tracking-widest"><CheckCircle2 size={14} /><span>Connected</span></div></div><div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl"><div><p className="text-xs font-bold text-brand-darkNavy">Oracle Treasury Feed</p><p className="text-[10px] text-brand-mutedGray">Last sync: 12 minutes ago</p></div><div className="flex items-center space-x-2 text-brand-success text-[10px] font-black uppercase tracking-widest"><CheckCircle2 size={14} /><span>Connected</span></div></div></div>
          </section>
        </div>

        <div className="mt-auto bg-brand-darkNavy py-12 px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
            <div className="flex items-center space-x-3"><Lock size={14} className="text-brand-gold" /><span className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Institutional Settlement Channels</span></div>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-white uppercase tracking-[0.2em]"><span className="flex items-center space-x-2"><Globe size={14} /> <span>SWIFT / SEPA</span></span><span className="flex items-center space-x-2"><TrendingUp size={14} /> <span>Corporate Treasury</span></span><span className="flex items-center space-x-2"><ShieldCheck size={14} /> <span>Audit Ready</span></span></div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/10' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-bold tracking-wider">{label}</span>
  </Link>
);