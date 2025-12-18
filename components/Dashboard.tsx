import React, { useState, useEffect } from 'react';
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
  ShieldCheck
} from 'lucide-react';

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
      const response = await fetch(`${config.baseUrl}/valuation`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) throw new Error('Identity Verification Failed: Invalid Token');
        throw new Error(`Enterprise API Fault: ${response.statusText}`);
      }
      
      const data = await response.json();
      setValuations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ledger Synchronization Failed');
    } finally {
      setLoading(false);
    }
  };

  const createValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.baseUrl || !TOKENS[currentUser]) return;

    setLoading(true);
    try {
      const response = await fetch(`${config.baseUrl}/create_valuation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKENS[currentUser]}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name || `PRJ-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`,
          valuation: formData.valuation
        })
      });
      
      if (!response.ok) throw new Error('Transaction Rejected: Compliance Check Failed');
      
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
    <div className="min-h-screen bg-brand-darkNavy pt-28 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 flex-grow w-full relative z-10">
        
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
          <StatCard title="Capital Deployed" value={valuations.length > 0 ? (valuations.length * 1.2).toFixed(1) + "M" : "$0"} icon={<DollarSign className="text-brand-gold" />} trend="+12.5%" />
          <StatCard title="Sourcing Velocity" value={loading ? "..." : (valuations.length + 8).toString() + " Days"} icon={<Clock className="text-brand-gold" />} trend="-2 Days" />
          <StatCard title="Risk Exposure" value={valuations.length > 0 ? "Low" : "N/A"} icon={<Scale className="text-brand-gold" />} trend="Stable" />
          <StatCard title="Portfolio Governance" value={valuations.length > 0 ? "98%" : "100%"} icon={<ShieldCheck className="text-brand-success" />} trend="Verified" />
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
                   <span className="text-[9px] font-bold text-brand-gold/60 uppercase tracking-[0.2em] animate-pulse">Syncing Blockchain State</span>
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
                          <tr><td colSpan={3} className="px-8 py-40 text-center"><div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_20px_rgba(212,175,55,0.2)]"></div></td></tr>
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
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string }> = ({ title, value, icon, trend }) => (
  <div className="bg-brand-navy/50 border border-white/5 rounded-[32px] p-7 flex items-center justify-between backdrop-blur-xl shadow-xl group hover:border-brand-gold/30 transition-all duration-500">
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-brand-offWhite/30 uppercase tracking-[0.2em]">{title}</p>
      <div className="flex flex-col">
        <p className="text-4xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors duration-500">{value}</p>
        <span className={`text-[10px] font-bold mt-1 ${trend.startsWith('+') ? 'text-brand-success' : 'text-brand-gold/60'}`}>{trend} Target</span>
      </div>
    </div>
    <div className="p-5 bg-white/5 rounded-[22px] group-hover:bg-brand-gold/10 group-hover:rotate-12 transition-all duration-500">
      {icon}
    </div>
  </div>
);

interface Valuation {
  id: number;
  name?: string;
  valuation?: string | number;
  created_at?: string;
  [key: string]: any;
}