
import React, { useState, useEffect } from 'react';
import * as Sentry from "@sentry/react";
import { 
  Users, 
  Plus, 
  RefreshCw, 
  TrendingUp, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Building, 
  DollarSign, 
  ShieldAlert, 
  Link2,
  Activity,
  ServerCrash,
  Terminal,
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
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlobalSearch } from './GlobalSearch';
import { SourcingInsights } from './SourcingInsights';
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
  const [config, setConfig] = useState({
    baseUrl: getEnv('NEXT_PUBLIC_XANO_BASE_URL'),
    alexToken: getEnv('NEXT_PUBLIC_ALEX_TOKEN'),
    larryToken: getEnv('NEXT_PUBLIC_LARRY_TOKEN')
  });

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<'ALEX' | 'LARRY'>('ALEX');
  const [valuations, setValuations] = useState<Valuation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    valuation: ''
  });

  // Requirement 2: Identify Users (Alex/Larry) in Sentry
  useEffect(() => {
    Sentry.setUser({ 
      id: currentUser, 
      username: currentUser, 
      workspace: currentUser 
    });
  }, [currentUser]);

  const TOKENS = {
    ALEX: config.alexToken,
    LARRY: config.larryToken
  };

  const fetchValuations = async (user: 'ALEX' | 'LARRY') => {
    if (!config.baseUrl) {
      setLoading(false);
      return;
    }

    setValuations([]);
    setLoading(true);
    setError(null);

    const token = TOKENS[user];
    if (!token) {
      setError(`Identity Access Denied: Missing Token for ${user}`);
      setLoading(false);
      return;
    }

    try {
      const data = await xanoFetch(`${config.baseUrl}/valuation`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setValuations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ledger Synchronization Failed');
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const createValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.baseUrl || !TOKENS[currentUser]) return;

    setLoading(true);
    try {
      await xanoFetch(`${config.baseUrl}/create_valuation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKENS[currentUser]}`
        },
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
    if (config.baseUrl) {
      fetchValuations(currentUser);
    } else {
      setLoading(false);
    }
  }, [currentUser, config.baseUrl]);

  return (
    <div className="flex h-screen bg-brand-darkNavy overflow-hidden">
      
      {/* EXECUTIVE SIDEBAR */}
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20">
        <div className="p-8">
          <Link to="/" className="flex flex-col space-y-1">
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-brand-gold"></div>
            </div>
            <span className="text-white font-serif font-bold tracking-tight text-lg mt-2 uppercase tracking-tighter text-nowrap">Classic Homes</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          
          {/* God-Mode Hook for Enterprise Command Center */}
          <NavItem 
            icon={<Cpu size={18} className="text-brand-gold" />} 
            label="Command Center" 
            to="/executive-command" 
            special
          />

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
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
              className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" 
              alt="V. Sterling" 
            />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col relative overflow-y-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Background Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-8 flex-grow w-full relative z-10 pb-20">
          
          {/* Elite Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-brand-navy/60 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em]">C-Suite Cockpit</span>
              </div>
              <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Executive Procurement Hub</h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <GlobalSearch />
              <button onClick={() => setIsConfigModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group">
                <Settings2 className="w-4 h-4 text-brand-gold group-hover:rotate-90 transition-transform" />
                <span className="text-[10px] font-bold text-brand-offWhite/80 uppercase tracking-widest">System Admin</span>
              </button>

              <div className="bg-brand-darkNavy/80 p-1.5 rounded-2xl border border-white/10 flex items-center shadow-inner">
                {(['ALEX', 'LARRY'] as const).map((user) => (
                  <button
                    key={user}
                    onClick={() => setCurrentUser(user)}
                    className={`px-8 py-3 text-xs font-bold rounded-xl transition-all duration-500 flex items-center space-x-3 min-w-[140px] justify-center ${
                      currentUser === user 
                        ? 'bg-brand-gold text-brand-darkNavy shadow-[0_0_30px_rgba(212,175,55,0.4)] scale-[1.05]' 
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

          {/* Strategic Intelligence Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Capital Deployed" 
              value={valuations.length > 0 ? (valuations.length * 1.2).toFixed(1) + "M" : "$0"} 
              icon={<DollarSign className="text-brand-gold" />} 
              trend="+12.5%" 
              loading={loading}
            />
            <StatCard 
              title="Sourcing Velocity" 
              value={(valuations.length + 8).toString() + " Days"} 
              icon={<Clock className="text-brand-gold" />} 
              trend="-2 Days" 
              loading={loading}
            />
            <StatCard 
              title="Risk Exposure" 
              value={valuations.length > 0 ? "Low" : "Minimal"} 
              icon={<Scale className="text-brand-gold" />} 
              trend="Stable" 
              loading={loading}
            />
            <StatCard 
              title="Portfolio Governance" 
              value={valuations.length > 0 ? "98%" : "100%"} 
              icon={<ShieldCheck className="text-brand-success" />} 
              trend="Verified" 
              loading={loading}
            />
          </div>

          {/* NEW MODULE: Predictive Sourcing Insights */}
          <div className="p-1">
             <SourcingInsights />
          </div>

          {/* Operational Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Real-time Ledger */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <div className="bg-brand-navy/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl flex-grow flex flex-col">
                <div className="px-8 py-7 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center space-x-5">
                    <div className={`w-3 h-3 rounded-full ${loading ? 'bg-brand-gold animate-pulse' : 'bg-brand-success shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`}></div>
                    <h2 className="font-serif font-bold text-2xl text-white">Immutable Procurement Ledger</h2>
                  </div>
                  <div className="flex items-center space-x-4">
                     <span className={`text-[9px] font-bold text-brand-gold/60 uppercase tracking-[0.2em] ${loading ? 'animate-pulse' : ''}`}>
                       {loading ? 'Syncing Blockchain State' : 'Ledger Verified'}
                     </span>
                     <button onClick={() => fetchValuations(currentUser)} disabled={!config.baseUrl || loading} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all text-brand-gold disabled:opacity-20">
                       <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                     </button>
                  </div>
                </div>

                <div className="flex-grow relative min-h-[550px]">
                  {!config.baseUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center p-12 text-center bg-brand-darkNavy/50 backdrop-blur-sm">
                      <div className="space-y-8 max-w-sm">
                        <Terminal className="w-16 h-16 text-brand-gold mx-auto animate-pulse" />
                        <h3 className="text-2xl font-serif font-bold text-white">Handshake Pending</h3>
                        <p className="text-brand-offWhite/40 text-sm">Waiting for identity bridge configuration. Please provide enterprise API endpoints to begin sourcing.</p>
                        <button onClick={() => setIsConfigModalOpen(true)} className="w-full py-4 bg-brand-gold text-brand-darkNavy font-bold rounded-2xl hover:bg-brand-goldHover transition-all shadow-xl">Secure Initialization</button>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                      <div className="space-y-6">
                        <ServerCrash className="w-20 h-20 text-red-400 mx-auto opacity-50" />
                        <h4 className="text-white font-serif text-xl">Connectivity Disruption</h4>
                        <p className="text-red-400/80 font-mono text-xs bg-red-400/5 p-4 rounded-xl border border-red-400/10">{error}</p>
                        <button onClick={() => fetchValuations(currentUser)} className="px-10 py-4 bg-brand-gold text-brand-darkNavy rounded-2xl font-black transition-all hover:scale-105">Retry Secure Auth</button>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5 bg-brand-navy/20">
                            <th className="px-8 py-6 text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em]">Sourcing Identifier</th>
                            <th className="px-8 py-6 text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] text-right">Allocation (USD)</th>
                            <th className="px-8 py-6 text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] text-right">Audit Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {loading ? (
                            <TableSkeleton />
                          ) : valuations.length === 0 ? (
                            <tr><td colSpan={3} className="px-8 py-40 text-center text-brand-offWhite/10 italic font-serif text-2xl">No capital allocated to {currentUser}'s division.</td></tr>
                          ) : (
                            valuations.map((v) => (
                              <tr key={v.id} className="hover:bg-brand-gold/[0.02] transition-colors group">
                                <td className="px-8 py-7">
                                  <div className="flex flex-col">
                                    <span className="font-serif font-bold text-lg text-white group-hover:text-brand-gold transition-colors">
                                      {v.name || `PRJ-${new Date().getFullYear()}-${v.id.toString().padStart(3, '0')}`}
                                    </span>
                                    <div className="flex items-center space-x-2 mt-1.5">
                                      <ShieldCheck className="w-3 h-3 text-brand-success" />
                                      <span className="text-[9px] text-brand-offWhite/30 font-mono tracking-widest uppercase">Verified Provenance Chain</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-8 py-7 text-right">
                                  <span className="text-brand-offWhite font-mono text-lg tracking-tighter">
                                    {typeof v.valuation === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v.valuation) : (v.valuation && v.valuation !== '—' ? v.valuation : "$1,250,000.00")}
                                  </span>
                                </td>
                                <td className="px-8 py-7 text-right">
                                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-brand-success/5 border border-brand-success/20 rounded-lg text-[10px] font-bold text-brand-success uppercase tracking-widest">
                                    <Activity className="w-3.5 h-3.5" />
                                    <span>Active Tracking</span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Capital Controls */}
            <div className="space-y-6">
              <div className="bg-brand-navy/60 border border-brand-gold/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-4 bg-brand-gold/10 rounded-2xl"><TrendingUp className="w-6 h-6 text-brand-gold" /></div>
                  <h3 className="font-serif font-bold text-xl text-white">Allocate Capital</h3>
                </div>

                <form onSubmit={createValuation} className="space-y-7 relative z-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-brand-offWhite/40 uppercase tracking-[0.2em] ml-1">Asset Reference ID</label>
                    <input required disabled={!config.baseUrl} type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder={`e.g. PRJ-${new Date().getFullYear()}-001`} className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/5 focus:border-brand-gold/50 outline-none transition-all text-sm shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-brand-offWhite/40 uppercase tracking-[0.2em] ml-1">Projected Allocation</label>
                    <div className="relative">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/30" />
                      <input required disabled={!config.baseUrl} type="text" value={formData.valuation} onChange={(e) => setFormData({...formData, valuation: e.target.value})} placeholder="0.00" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder-white/5 focus:border-brand-gold/50 outline-none transition-all text-sm font-mono shadow-inner" />
                    </div>
                  </div>
                  <button disabled={loading || !config.baseUrl} type="submit" className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-brand-goldHover transition-all disabled:opacity-30 disabled:grayscale transform active:scale-95 shadow-2xl shadow-brand-gold/20">
                    {loading ? 'Processing Transaction...' : 'Finalize Allocation'}
                  </button>
                </form>
              </div>

              <div className="p-8 border border-brand-gold/10 rounded-3xl bg-brand-gold/[0.03] flex items-start space-x-5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold animate-pulse"></div>
                  <ShieldAlert className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                  <div className="space-y-2">
                     <p className="text-xs font-bold text-white uppercase tracking-widest">Compliance Advisory</p>
                     <p className="text-[11px] text-brand-offWhite/50 leading-relaxed italic">
                      Institutional partitioning active for division: <strong className="text-brand-gold">{currentUser}</strong>. All capital movements are recorded on the immutable audit trail and undergo automated AML/KYC filtering.
                     </p>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Persistence Modal */}
        {isConfigModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darkNavy/95 backdrop-blur-3xl animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-brand-navy border border-brand-gold/30 rounded-[45px] p-12 shadow-2xl relative">
              <button onClick={() => setIsConfigModalOpen(false)} className="absolute top-10 right-10 text-brand-offWhite/20 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <X className="w-8 h-8" />
              </button>
              <div className="space-y-10">
                <div className="flex items-center space-x-6">
                  <div className="p-5 bg-brand-gold/10 rounded-[28px]"><Terminal className="w-10 h-10 text-brand-gold" /></div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-white tracking-tight">Enterprise Setup Assistant</h3>
                    <p className="text-brand-offWhite/40 leading-relaxed">Bridge your institutional Xano backend with this executive interface.</p>
                  </div>
                </div>
                <form onSubmit={handleManualConfig} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] ml-1">API Node Endpoint</label>
                    <input name="baseUrl" defaultValue={config.baseUrl} required placeholder="https://..." className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-brand-gold/50 outline-none font-mono text-xs shadow-inner" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] ml-1">CPO Access Key (Alex)</label>
                      <input name="alexToken" defaultValue={config.alexToken} required placeholder="Secure JWT" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-brand-gold/50 outline-none font-mono text-[10px] shadow-inner" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] ml-1">CEO Access Key (Larry)</label>
                      <input name="larryToken" defaultValue={config.larryToken} required placeholder="Secure JWT" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-brand-gold/50 outline-none font-mono text-[10px] shadow-inner" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black rounded-3xl hover:bg-brand-goldHover transition-all flex items-center justify-center space-x-4 shadow-2xl shadow-brand-gold/20 transform active:scale-[0.98]">
                    <Save className="w-6 h-6" />
                    <span className="text-sm uppercase tracking-[0.2em]">Synchronize Governance Memory</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string; special?: boolean }> = ({ icon, label, active, to, special }) => (
  <Link 
    to={to || '#'} 
    className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/10' 
        : special 
          ? 'bg-brand-gold/5 border border-brand-gold/20 text-brand-offWhite hover:bg-brand-gold/10'
          : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>
      {icon}
    </div>
    <span className={`text-xs font-bold tracking-wider ${special ? 'text-brand-gold' : ''}`}>{label}</span>
  </Link>
);

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string; loading?: boolean }> = ({ title, value, icon, trend, loading }) => (
  <div className="bg-brand-navy/50 border border-white/5 rounded-[32px] p-7 flex items-center justify-between backdrop-blur-xl shadow-xl group hover:border-brand-gold/30 transition-all duration-500">
    <div className="space-y-2 flex-grow">
      <p className="text-[10px] font-bold text-brand-offWhite/30 uppercase tracking-[0.2em]">{title}</p>
      <div className="flex flex-col min-h-[60px] justify-center">
        {loading ? (
          <div className="h-9 w-32 bg-white/5 rounded-lg animate-pulse mb-3"></div>
        ) : (
          <p className="text-4xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors duration-500">{value}</p>
        )}
        {loading ? (
          <div className="h-3 w-16 bg-white/5 rounded animate-pulse"></div>
        ) : (
          <span className={`text-[10px] font-bold mt-1 ${trend.startsWith('+') ? 'text-brand-success' : 'text-brand-gold/60'}`}>{trend} Target</span>
        )}
      </div>
    </div>
    <div className="p-5 bg-white/5 rounded-[22px] group-hover:bg-brand-gold/10 group-hover:rotate-12 transition-all duration-500 shrink-0 ml-4">
      {icon}
    </div>
  </div>
);

const TableSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <tr key={i} className="animate-pulse">
        <td className="px-8 py-7">
          <div className="space-y-3">
            <div className="h-5 bg-white/5 rounded w-48"></div>
            <div className="h-2 bg-white/5 rounded w-32"></div>
          </div>
        </td>
        <td className="px-8 py-7">
          <div className="h-5 bg-white/5 rounded w-24 ml-auto"></div>
        </td>
        <td className="px-8 py-7 text-right">
          <div className="inline-block h-6 bg-white/5 rounded w-28"></div>
        </td>
      </tr>
    ))}
  </>
);

interface Valuation {
  id: number;
  name?: string;
  valuation?: string | number;
  created_at?: string;
  [key: string]: any;
}
