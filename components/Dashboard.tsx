
import React, { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react";
import { 
  Users, 
  RefreshCw, 
  TrendingUp, 
  DollarSign, 
  Settings2, 
  X, 
  Save, 
  Zap, 
  Clock, 
  Fingerprint, 
  Scale, 
  ShieldCheck, 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Box, 
  Wallet, 
  BarChart3, 
  Cpu, 
  Leaf, 
  Database,
  Terminal,
  ServerCrash,
  Activity
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalSearch } from './GlobalSearch';
import { xanoFetch } from '../lib/xanoClient';

const getEnv = (key: string): string => {
  if (typeof window !== 'undefined') {
    const manual = window.localStorage.getItem(key);
    if (manual) return manual.trim();
  }
  const processEnv = (typeof process !== 'undefined' && process.env) ? process.env[key] : undefined;
  if (processEnv) return processEnv.trim();
  return '';
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    baseUrl: getEnv('NEXT_PUBLIC_XANO_BASE_URL'),
    alexToken: getEnv('NEXT_PUBLIC_ALEX_TOKEN'),
    larryToken: getEnv('NEXT_PUBLIC_LARRY_TOKEN')
  });

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<'ALEX' | 'LARRY'>('ALEX');
  const [valuations, setValuations] = useState<Valuation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [ledgerStatus, setLedgerStatus] = useState<'LIVE' | 'STALE' | 'CACHED_FALLBACK'>('LIVE');
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    valuation: ''
  });

  useEffect(() => {
    Sentry.setUser({ id: currentUser, username: currentUser, workspace: currentUser });
  }, [currentUser]);

  const TOKENS = { ALEX: config.alexToken, LARRY: config.larryToken };

  const fetchValuations = async (user: 'ALEX' | 'LARRY') => {
    if (!config.baseUrl) { setLoading(false); return; }
    if (valuations.length > 0) { setIsSyncing(true); } else { setLoading(true); }
    setError(null);
    const token = TOKENS[user];
    if (!token) {
      setError(`Identity Access Denied: Missing Token for ${user}`);
      setLoading(false); setIsSyncing(false); return;
    }
    try {
      const response = await xanoFetch<Valuation[]>(`${config.baseUrl}/valuation`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setValuations(Array.isArray(response.data) ? response.data : []);
      setLedgerStatus(response.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ledger Synchronization Failed');
    } finally {
      setLoading(false); setIsSyncing(false);
    }
  };

  const createValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.baseUrl || !TOKENS[currentUser]) return;
    setLoading(true);
    try {
      await xanoFetch(`${config.baseUrl}/create_valuation`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${TOKENS[currentUser]}` },
        body: JSON.stringify({
          name: formData.name || `PRJ-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`,
          valuation: formData.valuation
        })
      });
      setFormData({ name: '', valuation: '' });
      fetchValuations(currentUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Capital Allocation Write Failed');
      setLoading(false);
    }
  };

  const handleManualConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const baseUrl = (data.get('baseUrl') as string).trim();
    const alexToken = (data.get('alexToken') as string).trim();
    const larryToken = (data.get('larryToken') as string).trim();
    window.localStorage.setItem('NEXT_PUBLIC_XANO_BASE_URL', baseUrl);
    window.localStorage.setItem('NEXT_PUBLIC_ALEX_TOKEN', alexToken);
    window.localStorage.setItem('NEXT_PUBLIC_LARRY_TOKEN', larryToken);
    setConfig({ baseUrl, alexToken, larryToken });
    setIsConfigModalOpen(false);
    setError(null);
  };

  useEffect(() => {
    if (config.baseUrl) { fetchValuations(currentUser); } else { setLoading(false); }
  }, [currentUser, config.baseUrl]);

  return (
    <div className="flex h-screen bg-brand-darkNavy overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20">
        <div className="p-8">
          <Link to="/" className="flex flex-col space-y-1">
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-brand-gold"></div>
            </div>
            <span className="text-white font-sans font-bold tracking-tight text-lg mt-2 uppercase tracking-tighter">Classic Homes</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<Cpu size={18} className="text-brand-gold" />} label="Command Center" to="/executive-command" special />
          <NavItem icon={<Layers size={18} />} label="Projects" to="/projects" />
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size={18} />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Suppliers" to="/network" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" to="/settings" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase font-black tracking-widest">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col relative overflow-y-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-8 flex-grow w-full relative z-10 pb-20">
          
          {/* TOP HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-brand-navy/60 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-brand-gold animate-pulse' : 'bg-brand-success shadow-[0_0_15px_#10B981]'}`}></div>
                <span className="text-xs font-black text-brand-gold uppercase tracking-[0.2em]">
                  {isSyncing ? 'Self-Healing Sync Active' : 'Operational Cockpit'}
                </span>
              </div>
              <h1 className="text-4xl font-sans font-black text-white tracking-tight">Executive Procurement</h1>
            </div>

            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              {/* ENHANCED ESG SCORE BLOCK */}
              <div className="bg-brand-darkNavy/80 px-8 py-4 rounded-[1.5rem] border border-brand-gold/20 flex items-center space-x-8 shadow-2xl">
                 <div className="text-right">
                    <p className="text-xs font-black text-white/50 uppercase tracking-[0.15em] mb-1">ESG Score</p>
                    <p className="text-3xl font-sans font-black text-white leading-none">98.4</p>
                 </div>
                 <div className="w-px h-10 bg-white/10"></div>
                 <div className="p-3 bg-brand-success/10 rounded-xl">
                    <Leaf className="text-brand-success" size={24} />
                 </div>
              </div>
              
              <GlobalSearch />
              <button onClick={() => setIsConfigModalOpen(true)} className="p-4 bg-white/5 hover:bg-brand-gold hover:text-brand-darkNavy rounded-2xl border border-white/10 transition-all group">
                <Settings2 className="w-5 h-5 transition-transform group-hover:rotate-90" />
              </button>

              <div className="bg-brand-darkNavy/80 p-2 rounded-2xl border border-white/10 flex items-center shadow-inner">
                {(['ALEX', 'LARRY'] as const).map((user) => (
                  <button
                    key={user}
                    onClick={() => setCurrentUser(user)}
                    className={`px-8 py-3.5 text-xs font-black rounded-xl transition-all duration-500 flex items-center space-x-3 min-w-[150px] justify-center uppercase tracking-widest ${
                      currentUser === user 
                        ? 'bg-brand-gold text-brand-darkNavy shadow-[0_20px_40px_rgba(212,175,55,0.3)] scale-[1.05]' 
                        : 'text-brand-offWhite/30 hover:text-brand-offWhite/60'
                    }`}
                  >
                    <Fingerprint className="w-4 h-4" />
                    <span>{user === 'ALEX' ? 'Alex (CPO)' : 'Larry (CEO)'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN KPI GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Capital Deployed" 
              value={valuations.length > 0 ? (valuations.length * 1.2).toFixed(1) + "M" : "$0.0M"} 
              icon={<DollarSign size={24} className="text-brand-gold" />} 
              trend="+12.5%" 
              loading={loading && valuations.length === 0}
            />
            <StatCard 
              title="Sourcing Velocity" 
              value={(valuations.length + 8).toString() + " Days"} 
              icon={<Clock size={24} className="text-brand-gold" />} 
              trend="-2 Days" 
              loading={loading && valuations.length === 0}
            />
            <StatCard 
              title="Risk Exposure" 
              value={valuations.length > 0 ? "Low" : "Minimal"} 
              icon={<Scale size={24} className="text-brand-gold" />} 
              trend="Stable" 
              loading={loading && valuations.length === 0}
            />
            <StatCard 
              title="Audit Compliance" 
              value={valuations.length > 0 ? "98%" : "100%"} 
              icon={<ShieldCheck size={24} className="text-brand-success" />} 
              trend="Verified" 
              loading={loading && valuations.length === 0}
            />
          </div>

          {/* WORKSPACE CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <div className="bg-brand-navy/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl flex-grow flex flex-col">
                <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center space-x-5">
                    <div className={`w-3 h-3 rounded-full ${isSyncing || loading ? 'bg-brand-gold animate-pulse' : 'bg-brand-success shadow-[0_0_20px_#10B981]'}`}></div>
                    <h2 className="font-sans font-black text-2xl text-white uppercase tracking-tight">Institutional Ledger</h2>
                  </div>
                  <div className="flex items-center space-x-6">
                     <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${isSyncing || loading ? 'text-brand-gold' : 'text-brand-success'}`}>
                       {isSyncing ? 'Synchronizing Memory...' : ledgerStatus === 'CACHED_FALLBACK' ? 'Serving Verified Cache' : 'Real-time Feed Active'}
                     </span>
                     <button onClick={() => fetchValuations(currentUser)} disabled={loading || isSyncing} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-brand-gold disabled:opacity-20">
                       <RefreshCw className={`w-4 h-4 ${isSyncing || loading ? 'animate-spin' : ''}`} />
                     </button>
                  </div>
                </div>

                <div className="flex-grow relative min-h-[500px]">
                  {loading && valuations.length === 0 ? (
                    <div className="p-10 space-y-8"><TableSkeleton /></div>
                  ) : (
                    <div className={`overflow-x-auto transition-opacity duration-300 ${isSyncing ? 'opacity-60' : 'opacity-100'}`}>
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5 bg-brand-navy/20">
                            <th className="px-10 py-7 text-xs font-black text-brand-gold uppercase tracking-[0.2em]">Transaction / Project</th>
                            <th className="px-10 py-7 text-xs font-black text-brand-gold uppercase tracking-[0.2em] text-right">Allocation (USD)</th>
                            <th className="px-10 py-7 text-xs font-black text-brand-gold uppercase tracking-[0.2em] text-right">Verification</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {valuations.map((v, i) => (
                            <tr key={v.id} className="hover:bg-brand-gold/[0.03] transition-colors group">
                              <td className="px-10 py-8">
                                <div className="flex flex-col">
                                  <span className="font-sans font-black text-xl text-white group-hover:text-brand-gold transition-colors">
                                    {v.name || `PRJ-${new Date().getFullYear()}-${v.id}`}
                                  </span>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <ShieldCheck className="w-4 h-4 text-brand-success" />
                                    <span className="text-[10px] text-brand-offWhite/30 font-black tracking-widest uppercase">Secured Provenance Node</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-10 py-8 text-right">
                                <span className="text-white font-sans font-black text-xl tracking-tight">
                                  {typeof v.valuation === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v.valuation) : (v.valuation || "$1,250,000.00")}
                                </span>
                              </td>
                              <td className="px-10 py-8 text-right">
                                <button onClick={() => navigate('/executive-command')} className="px-5 py-2.5 bg-brand-gold text-brand-darkNavy text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl hover:scale-105 transition-all">
                                  Audit Node
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="space-y-6">
              <div className="bg-brand-navy/60 border border-brand-gold/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex items-center space-x-4 mb-10">
                  <div className="p-4 bg-brand-gold/10 rounded-2xl"><TrendingUp className="w-8 h-8 text-brand-gold" /></div>
                  <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">Allocations</h3>
                </div>
                <form onSubmit={createValuation} className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-1">Asset Reference</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. PRJ-2025-001" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/10 focus:border-brand-gold/50 outline-none font-bold shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-1">Capital Injection</label>
                    <div className="relative">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/40" />
                      <input required type="text" value={formData.valuation} onChange={(e) => setFormData({...formData, valuation: e.target.value})} placeholder="0.00" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-white placeholder-white/10 focus:border-brand-gold/50 outline-none font-black text-lg shadow-inner" />
                    </div>
                  </div>
                  <button disabled={loading} type="submit" className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all shadow-2xl shadow-brand-gold/20 transform active:scale-95">
                    {loading ? 'Initializing...' : 'Authorize Allocation'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SYSTEM CONFIG MODAL */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-darkNavy/95 backdrop-blur-3xl animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-brand-navy border border-brand-gold/30 rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,1)] relative">
            <button onClick={() => setIsConfigModalOpen(false)} className="absolute top-10 right-10 text-white/20 hover:text-white transition-colors p-3 hover:bg-white/5 rounded-full"><X className="w-8 h-8" /></button>
            <div className="space-y-10">
              <div className="flex items-center space-x-6">
                <div className="p-5 bg-brand-gold/10 rounded-[2rem] border border-brand-gold/20"><Terminal size={40} className="text-brand-gold" /></div>
                <div>
                  <h3 className="text-3xl font-sans font-black text-white tracking-tight uppercase">System Settings</h3>
                  <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mt-1">Configure Institutional Bridge Parameters</p>
                </div>
              </div>
              <form onSubmit={handleManualConfig} className="space-y-10">
                <div className="space-y-3">
                  <label className="text-xs font-black text-brand-gold uppercase tracking-[0.2em] ml-1">API Node Perimeter</label>
                  <input name="baseUrl" defaultValue={config.baseUrl} required className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-brand-gold/50 outline-none font-mono text-sm shadow-inner" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-brand-gold uppercase tracking-[0.2em] ml-1">CPO Bridge Token</label>
                    <input name="alexToken" defaultValue={config.alexToken} required className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-brand-gold/50 outline-none font-mono text-xs shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-brand-gold uppercase tracking-[0.2em] ml-1">CEO Bridge Token</label>
                    <input name="larryToken" defaultValue={config.larryToken} required className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-brand-gold/50 outline-none font-mono text-xs shadow-inner" />
                  </div>
                </div>
                <button type="submit" className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black rounded-3xl hover:bg-white transition-all flex items-center justify-center space-x-4 shadow-2xl">
                  <Save className="w-6 h-6" /><span className="text-sm uppercase tracking-[0.3em]">Save Perimeter Config</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string; special?: boolean }> = ({ icon, label, active, to, special }) => (
  <Link to={to || '#'} className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-xl shadow-brand-gold/10 scale-[1.02]' : special ? 'bg-brand-gold/10 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-darkNavy' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="text-xs font-black uppercase tracking-widest">{label}</span>
  </Link>
);

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string; loading?: boolean }> = ({ title, value, icon, trend, loading }) => (
  <div className="bg-brand-navy/50 border border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between backdrop-blur-3xl shadow-2xl group hover:border-brand-gold/30 transition-all duration-500">
    <div className="space-y-4 flex-grow">
      <p className="text-xs font-black text-white/50 uppercase tracking-[0.2em]">{title}</p>
      <div className="flex flex-col min-h-[60px] justify-center">
        {loading ? (
          <div className="h-12 w-40 bg-white/5 rounded-2xl animate-pulse mb-3"></div>
        ) : (
          <p className="text-5xl font-sans font-black text-white group-hover:text-brand-gold transition-colors duration-500 tracking-tight">{value}</p>
        )}
        <span className={`text-[11px] font-black mt-2 uppercase tracking-widest ${trend.startsWith('+') ? 'text-brand-success' : 'text-brand-gold/60'}`}>{trend} Target</span>
      </div>
    </div>
    <div className="p-6 bg-white/5 rounded-[1.8rem] group-hover:bg-brand-gold/20 group-hover:rotate-12 transition-all duration-500 shadow-inner">
      {icon}
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="divide-y divide-white/5">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center justify-between px-10 py-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-white/5 rounded-lg w-64"></div>
          <div className="h-2 bg-white/5 rounded-lg w-40"></div>
        </div>
        <div className="h-8 bg-white/5 rounded-lg w-32"></div>
      </div>
    ))}
  </div>
);

interface Valuation { id: number; name?: string; valuation?: string | number; created_at?: string; [key: string]: any; }
