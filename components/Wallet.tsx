import React from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  ArrowUpRight, ArrowDownRight, ShieldCheck, Lock, Globe, TrendingUp, MessageSquare, CreditCard, History
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const WalletPage: React.FC = () => {
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
          <NavItem icon={<Wallet size={18} />} label="Wallet" active />
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
            <h1 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">Institutional Wallet</h1>
            <div className="flex items-center space-x-2 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]"><span>Capital Reserves</span><span className="w-1 h-1 bg-brand-gold rounded-full"></span><span className="text-brand-success">Liquidity Active</span></div>
          </div>
          <button className="px-6 py-3 bg-brand-gold text-brand-darkNavy rounded-lg text-xs font-black uppercase tracking-widest hover:bg-brand-goldHover transition-all shadow-lg shadow-brand-gold/10">Add Capital</button>
        </div>

        <div className="px-12 py-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-darkNavy rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden group">
              <p className="text-[10px] font-black text-brand-offWhite/40 uppercase tracking-[0.25em] mb-4">Total Liquidity</p>
              <h2 className="text-4xl font-serif font-bold">$2,450,000.00</h2>
              <div className="mt-8 flex items-center space-x-4"><div className="flex items-center space-x-1 px-2 py-0.5 bg-brand-success/20 border border-brand-success/30 rounded text-[9px] font-black text-brand-success"><ArrowUpRight size={10} /><span>+4.2% Growth</span></div><span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest">Verified Vault ID: 0x882...A2</span></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <div><p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.25em] mb-4">Escrow Holdings</p><h2 className="text-4xl font-serif font-bold text-brand-darkNavy">$482,500.00</h2></div>
              <div className="mt-6 flex items-center space-x-2 text-brand-mutedGray text-xs"><Lock size={14} /><span>Funds locked in 3 active procurement smart contracts</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between"><h3 className="font-serif font-bold text-brand-darkNavy text-lg">Recent Ledger Activity</h3><History className="w-5 h-5 text-slate-300" /></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50"><tr className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest"><th className="px-8 py-4">Transaction ID</th><th className="px-8 py-4">Type</th><th className="px-8 py-4">Status</th><th className="px-8 py-4 text-right">Amount</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  <TransactionRow id="TX-8921-A" type="Escrow Lock (Tuscany Stone)" status="Verified" amount="-$48,250.00" negative />
                  <TransactionRow id="TX-8812-B" type="Capital Injection" status="Settled" amount="+$150,000.00" />
                  <TransactionRow id="TX-8740-C" type="Payment Settlement (Kyoto)" status="Settled" amount="-$35,000.00" negative />
                </tbody>
              </table>
            </div>
          </div>
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

const TransactionRow: React.FC<{ id: string; type: string; status: string; amount: string; negative?: boolean }> = ({ id, type, status, amount, negative }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-8 py-6 text-xs font-mono text-brand-darkNavy">{id}</td>
    <td className="px-8 py-6 text-xs font-bold text-slate-600">{type}</td>
    <td className="px-8 py-6"><span className="px-2 py-1 bg-brand-success/10 text-brand-success text-[9px] font-black uppercase rounded">{status}</span></td>
    <td className={`px-8 py-6 text-right font-bold text-xs ${negative ? 'text-red-500' : 'text-brand-success'}`}>{amount}</td>
  </tr>
);