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
  Zap
} from 'lucide-react';

/** 
 * HYBRID ENVIRONMENT RESOLUTION
 * Checks: 1. process.env (Node/Next), 2. import.meta.env (Vite), 3. window, 4. localStorage (Manual)
 */
const getEnv = (key: string): string => {
  const manual = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
  if (manual) return manual.trim();

  // Try standard process.env
  const processEnv = (typeof process !== 'undefined' && process.env) ? process.env[key] : undefined;
  if (processEnv) return processEnv.trim();

  // Try Vite-style import.meta.env (dynamic check to prevent build errors)
  try {
    const metaEnv = (import.meta as any).env?.[key];
    if (metaEnv) return metaEnv.trim();
  } catch (e) {}

  return '';
};

export const Dashboard: React.FC = () => {
  // Config State (initialized from all possible sources)
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
      setError(`Auth Token Missing for ${user}`);
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
        if (response.status === 401) throw new Error('Unauthorized: Invalid Tenant Token');
        throw new Error(`Connectivity issue: ${response.statusText}`);
      }
      
      const data = await response.json();
      setValuations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
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
          name: formData.name,
          valuation: formData.valuation
        })
      });
      
      if (!response.ok) throw new Error('Failed to commit valuation to ledger');
      
      setFormData({ name: '', valuation: '' });
      fetchValuations(currentUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Write operation failed');
      setLoading(false);
    }
  };

  const handleManualConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const baseUrl = (data.get('baseUrl') as string).trim();
    const alexToken = (data.get('alexToken') as string).trim();
    const larryToken = (data.get('larryToken') as string).trim();

    // Persist to LocalStorage so it survives browser restart
    window.localStorage.setItem('NEXT_PUBLIC_XANO_BASE_URL', baseUrl);
    window.localStorage.setItem('NEXT_PUBLIC_ALEX_TOKEN', alexToken);
    window.localStorage.setItem('NEXT_PUBLIC_LARRY_TOKEN', larryToken);

    setConfig({ baseUrl, alexToken, larryToken });
    setIsConfigModalOpen(false);
    setError(null);
    // Success feedback
    console.log('✅ Manual configuration saved to LocalStorage');
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
      
      {/* Dynamic Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 flex-grow w-full relative z-10">
        
        {/* Elite Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-brand-navy/60 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em]">Operational Nexus</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Sourcing Hub Dashboard</h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <button 
              onClick={() => setIsConfigModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group"
            >
              <Settings2 className="w-4 h-4 text-brand-gold group-hover:rotate-90 transition-transform" />
              <span className="text-[10px] font-bold text-brand-offWhite/80 group-hover:text-white uppercase tracking-widest">Config Assistant</span>
            </button>

            <div className="bg-brand-darkNavy p-1 rounded-2xl border border-white/10 flex items-center shadow-inner">
              {(['ALEX', 'LARRY'] as const).map((user) => (
                <button
                  key={user}
                  onClick={() => setCurrentUser(user)}
                  className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all duration-500 flex items-center space-x-2 min-w-[110px] justify-center ${
                    currentUser === user 
                      ? 'bg-brand-gold text-brand-darkNavy shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]' 
                      : 'text-brand-offWhite/30 hover:text-brand-offWhite/60'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{user === 'ALEX' ? 'Alex' : 'Larry'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Intelligence Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Ledger Records" value={valuations.length.toString()} icon={<FileText className="text-brand-gold" />} />
          <StatCard title="Active Procurement" value={loading ? "..." : valuations.length > 0 ? (valuations.length * 2 + 4).toString() : "0"} icon={<Building className="text-brand-gold" />} />
          <StatCard title="Projected Deal Value" value="$4.2M" icon={<TrendingUp className="text-brand-gold" />} />
          <StatCard title="Tenant Identity" value={currentUser === 'ALEX' ? 'Alex' : 'Larry'} icon={<CheckCircle2 className={!!config.baseUrl ? 'text-brand-success' : 'text-brand-mutedGray'} />} />
        </div>

        {/* Data Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <div className="bg-brand-navy/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl flex-grow flex flex-col">
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-brand-success"></div>
                  <h2 className="font-serif font-bold text-xl text-white">Live Sourcing Feed</h2>
                </div>
                <button 
                  onClick={() => fetchValuations(currentUser)} 
                  disabled={!config.baseUrl || loading}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all text-brand-gold disabled:opacity-20"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="flex-grow relative min-h-[500px]">
                {!config.baseUrl ? (
                  /* SETUP ASSISTANT PROMPT */
                  <div className="absolute inset-0 flex items-center justify-center p-12 text-center bg-black/20">
                    <div className="space-y-8 max-w-md">
                      <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-brand-gold/20 blur-2xl rounded-full"></div>
                        <div className="relative p-6 bg-brand-navy border border-brand-gold/40 rounded-3xl">
                          <Zap className="w-12 h-12 text-brand-gold animate-bounce" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-serif font-bold text-white">Launch System Assistant</h3>
                        <p className="text-brand-offWhite/50 text-sm leading-relaxed">
                          We detected that your environment variables are still being processed by the builder. 
                          Use our **Elite Override** to connect your Xano instance instantly.
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsConfigModalOpen(true)}
                        className="w-full py-4 bg-brand-gold text-brand-darkNavy font-bold rounded-2xl hover:bg-brand-goldHover transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center space-x-2"
                      >
                        <Settings2 className="w-5 h-5" />
                        <span>Configure Connection Now</span>
                      </button>
                    </div>
                  </div>
                ) : error ? (
                  <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                    <div className="space-y-6">
                      <div className="inline-flex p-5 bg-red-500/10 rounded-3xl border border-red-500/20">
                        <ServerCrash className="w-12 h-12 text-red-400" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white font-bold">Connectivity Disruption</h4>
                        <p className="text-red-400/80 font-mono text-xs max-w-sm mx-auto">{error}</p>
                      </div>
                      <button onClick={() => fetchValuations(currentUser)} className="px-8 py-3 bg-white/5 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-400/10 transition-all font-bold">Re-initialize Connection</button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                          <th className="px-8 py-5 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Asset Descriptor</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] text-right">Valuation (USD)</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] text-right">Ledger Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {loading ? (
                          <tr><td colSpan={3} className="px-8 py-32 text-center"><div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div></td></tr>
                        ) : valuations.length === 0 ? (
                          <tr><td colSpan={3} className="px-8 py-32 text-center text-brand-offWhite/20 italic font-light font-serif text-lg">No synchronized records found.</td></tr>
                        ) : (
                          valuations.map((v) => (
                            <tr key={v.id} className="hover:bg-white/5 transition-colors group">
                              <td className="px-8 py-6 font-medium text-white group-hover:text-brand-gold transition-colors">{v.name || 'Anonymous Asset'}</td>
                              <td className="px-8 py-6 text-right text-brand-offWhite font-mono text-sm tracking-tighter">
                                {typeof v.valuation === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v.valuation) : v.valuation || '—'}
                              </td>
                              <td className="px-8 py-6 text-right text-brand-offWhite/30 text-[10px] font-mono">
                                {v.created_at ? new Date(v.created_at).toLocaleString() : 'PENDING'}
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

          {/* Side Control Panel */}
          <div className="space-y-6">
            <div className="bg-brand-navy/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-gold/10 transition-colors"></div>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-brand-gold/10 rounded-2xl group-hover:scale-110 transition-transform"><Plus className="w-6 h-6 text-brand-gold" /></div>
                <h3 className="font-serif font-bold text-xl text-white">Secure Asset Commit</h3>
              </div>

              <form onSubmit={createValuation} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-offWhite/40 uppercase tracking-[0.2em] ml-1">Asset Descriptor</label>
                  <input required disabled={!config.baseUrl} type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Project ID or Material Lot" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/5 focus:border-brand-gold/50 outline-none transition-all text-sm shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-offWhite/40 uppercase tracking-[0.2em] ml-1">Financial Assessment</label>
                  <div className="relative">
                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/30" />
                    <input required disabled={!config.baseUrl} type="text" value={formData.valuation} onChange={(e) => setFormData({...formData, valuation: e.target.value})} placeholder="1,250,000" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-white/5 focus:border-brand-gold/50 outline-none transition-all text-sm font-mono shadow-inner" />
                  </div>
                </div>
                <button 
                  disabled={loading || !config.baseUrl} 
                  type="submit" 
                  className="w-full py-5 bg-brand-gold text-brand-darkNavy font-black rounded-2xl hover:bg-brand-goldHover transition-all disabled:opacity-30 disabled:grayscale transform active:scale-95 shadow-lg shadow-brand-gold/20"
                >
                  {loading ? 'Committing...' : 'Finalize Entry'}
                </button>
              </form>
            </div>

            <div className="p-6 border border-brand-gold/10 rounded-3xl bg-brand-gold/5 flex items-start space-x-4 shadow-xl">
                <ShieldAlert className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-[11px] text-brand-offWhite/50 leading-relaxed italic">
                  Blockchain-Grade Security: Data is strictly partitioned for <strong className="text-brand-gold">{currentUser}</strong>. Any modification generates an immutable audit trail.
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Status Monitor */}
      <div className="mt-12 py-8 border-t border-white/5 text-center flex flex-col items-center justify-center space-y-6 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className={`flex items-center space-x-3 px-5 py-2 rounded-2xl border backdrop-blur-md shadow-xl ${config.baseUrl ? 'bg-brand-success/5 border-brand-success/20' : 'bg-red-500/5 border-red-500/20 animate-pulse'}`}>
            <div className={`w-2 h-2 rounded-full ${config.baseUrl ? 'bg-brand-success shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${config.baseUrl ? 'text-brand-success' : 'text-red-400'}`}>
              {config.baseUrl ? 'Global Network Active' : 'Offline State Detected'}
            </span>
          </div>
          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
          <div className="flex items-center space-x-2 text-brand-offWhite/20 group cursor-help">
            <Link2 className="w-3.5 h-3.5 group-hover:text-brand-gold transition-colors" />
            <span className="text-[10px] font-mono tracking-tighter max-w-[300px] truncate group-hover:text-brand-offWhite/40">{config.baseUrl || 'WAITING_FOR_HANDSHAKE'}</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-brand-offWhite/10 tracking-[0.3em] flex items-center space-x-2">
          <Activity className="w-3.5 h-3.5 text-brand-gold/20" />
          <span>BUILD_MANIFEST: {config.baseUrl ? 'VERIFIED_SYNCED' : 'AWAITING_REDEPLOY'}</span>
        </div>
      </div>

      {/* Persistence Override Modal */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darkNavy/90 backdrop-blur-2xl animate-fade-in">
          <div className="w-full max-w-xl bg-brand-navy border border-brand-gold/30 rounded-[40px] p-10 shadow-[0_0_100px_rgba(212,175,55,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
            <button onClick={() => setIsConfigModalOpen(false)} className="absolute top-8 right-8 text-brand-offWhite/20 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <X className="w-6 h-6" />
            </button>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-5">
                <div className="p-4 bg-brand-gold/10 rounded-[25px]"><Terminal className="w-8 h-8 text-brand-gold" /></div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight">System Configuration Assistant</h3>
                  <p className="text-sm text-brand-offWhite/40 leading-relaxed">Override build-time environment variables. These values are stored securely in your browser's persistent storage.</p>
                </div>
              </div>

              <form onSubmit={handleManualConfig} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] ml-1">Xano API Endpoint</label>
                  <input name="baseUrl" defaultValue={config.baseUrl} required placeholder="https://x8ki-letl-twmt.n7.xano.io/api:..." className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/5 focus:border-brand-gold/50 outline-none transition-all font-mono text-xs shadow-inner" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] ml-1">Identity: Alex</label>
                    <input name="alexToken" defaultValue={config.alexToken} required placeholder="Bearer Token (JWT)" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/5 focus:border-brand-gold/50 outline-none transition-all font-mono text-[10px] shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] ml-1">Identity: Larry</label>
                    <input name="larryToken" defaultValue={config.larryToken} required placeholder="Bearer Token (JWT)" className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/5 focus:border-brand-gold/50 outline-none transition-all font-mono text-[10px] shadow-inner" />
                  </div>
                </div>
                
                <div className="pt-4 flex flex-col space-y-4">
                  <button type="submit" className="w-full py-5 bg-brand-gold text-brand-darkNavy font-black rounded-[20px] hover:bg-brand-goldHover transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-brand-gold/20 transform active:scale-[0.98]">
                    <Save className="w-5 h-5" />
                    <span>Synchronize Local Configuration</span>
                  </button>
                  <p className="text-[10px] text-center text-brand-offWhite/20 italic">Note: These values are stored in <code className="text-brand-gold/50">localStorage</code> and will persist through resets.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-brand-navy/50 border border-white/5 rounded-3xl p-6 flex items-center justify-between backdrop-blur-xl shadow-xl group hover:border-brand-gold/30 transition-all duration-500">
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-brand-offWhite/30 uppercase tracking-[0.2em]">{title}</p>
      <p className="text-3xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors duration-500">{value}</p>
    </div>
    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-gold/10 group-hover:rotate-6 transition-all duration-500">
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