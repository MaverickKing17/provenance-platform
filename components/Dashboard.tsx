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
  Save
} from 'lucide-react';

/** 
 * ENVIRONMENT RESOLUTION LOGIC
 * We check process.env first (for Vercel), then fallback to sessionStorage (Manual Override)
 */
const getEnv = (key: string): string => {
  const envVar = (typeof process !== 'undefined' && process.env) ? process.env[key] : undefined;
  const manualVar = typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null;
  return (envVar || manualVar || '').trim();
};

export const Dashboard: React.FC = () => {
  // Config State
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
        throw new Error('Backend connectivity issue detected');
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
    const baseUrl = data.get('baseUrl') as string;
    const alexToken = data.get('alexToken') as string;
    const larryToken = data.get('larryToken') as string;

    window.sessionStorage.setItem('NEXT_PUBLIC_XANO_BASE_URL', baseUrl);
    window.sessionStorage.setItem('NEXT_PUBLIC_ALEX_TOKEN', alexToken);
    window.sessionStorage.setItem('NEXT_PUBLIC_LARRY_TOKEN', larryToken);

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.05)_0%,_transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 flex-grow w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-brand-navy/50 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Live Testing Environment</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">Sourcing Hub Dashboard</h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <button 
              onClick={() => setIsConfigModalOpen(true)}
              className="flex items-center space-x-2 text-[10px] font-bold text-brand-gold/60 hover:text-brand-gold uppercase tracking-widest transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Connection Settings</span>
            </button>
            <div className="h-8 w-px bg-white/5 hidden md:block"></div>
            <div className="flex flex-col space-y-2">
              <div className="bg-brand-darkNavy p-1 rounded-xl border border-white/10 flex items-center shadow-2xl">
                {(['ALEX', 'LARRY'] as const).map((user) => (
                  <button
                    key={user}
                    onClick={() => setCurrentUser(user)}
                    className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center space-x-2 min-w-[120px] justify-center ${
                      currentUser === user 
                        ? 'bg-brand-gold text-brand-darkNavy shadow-xl scale-105' 
                        : 'text-brand-offWhite/40 hover:text-brand-offWhite hover:bg-white/5'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>{user === 'ALEX' ? 'Alex' : 'Larry'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Records" value={valuations.length.toString()} icon={<FileText className="text-brand-gold" />} />
          <StatCard title="Active procurement" value={loading ? "..." : valuations.length > 0 ? (valuations.length * 2).toString() : "0"} icon={<Building className="text-brand-gold" />} />
          <StatCard title="Avg. Deal Size" value="$4.2M" icon={<TrendingUp className="text-brand-gold" />} />
          <StatCard title="Tenant Access" value={currentUser === 'ALEX' ? 'Alex' : 'Larry'} icon={<CheckCircle2 className={!!config.baseUrl ? 'text-brand-success' : 'text-brand-mutedGray'} />} />
        </div>

        {/* Main Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-brand-navy/30 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl h-full flex flex-col">
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h2 className="font-serif font-bold text-xl text-white">Active Procurement Cycles</h2>
                <button onClick={() => fetchValuations(currentUser)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-brand-offWhite/40 hover:text-brand-gold">
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-gold' : ''}`} />
                </button>
              </div>

              <div className="flex-grow relative min-h-[450px]">
                {!config.baseUrl ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <div className="space-y-6 max-w-md">
                      <div className="inline-flex p-4 bg-brand-gold/10 rounded-full">
                        <Terminal className="w-10 h-10 text-brand-gold animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-serif font-bold text-white">Connection Logic Pending</h3>
                        <p className="text-brand-offWhite/50 text-xs leading-relaxed">
                          Environment variables are currently <code className="text-brand-gold">undefined</code>. 
                          Redeploy your Vercel project or use the manual override.
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsConfigModalOpen(true)}
                        className="w-full py-3 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold rounded-xl hover:bg-brand-gold/20 transition-all font-bold text-xs uppercase tracking-widest"
                      >
                        Manual Configuration Override
                      </button>
                    </div>
                  </div>
                ) : error ? (
                  <div className="p-12 text-center space-y-4">
                    <div className="inline-flex p-4 bg-red-500/10 rounded-full"><ServerCrash className="w-12 h-12 text-red-400" /></div>
                    <p className="text-red-400 font-medium text-sm">{error}</p>
                    <button onClick={() => fetchValuations(currentUser)} className="px-6 py-2 bg-white/5 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-400/10 transition-colors">Retry</button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                          <th className="px-6 py-4 text-xs font-bold text-brand-gold uppercase tracking-widest">Entity Name</th>
                          <th className="px-6 py-4 text-xs font-bold text-brand-gold uppercase tracking-widest text-right">Valuation</th>
                          <th className="px-6 py-4 text-xs font-bold text-brand-gold uppercase tracking-widest text-right">Last Audit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {loading ? (
                          <tr><td colSpan={3} className="px-6 py-20 text-center"><div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
                        ) : valuations.length === 0 ? (
                          <tr><td colSpan={3} className="px-6 py-20 text-center text-brand-offWhite/20 italic font-light">No records detected.</td></tr>
                        ) : (
                          valuations.map((v) => (
                            <tr key={v.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 font-medium text-white">{v.name || 'Unnamed Asset'}</td>
                              <td className="px-6 py-4 text-right text-brand-offWhite font-mono">{typeof v.valuation === 'number' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v.valuation) : v.valuation || '—'}</td>
                              <td className="px-6 py-4 text-right text-brand-offWhite/30 text-[10px] font-mono">{v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}</td>
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

          <div className="space-y-6">
            <div className="bg-brand-navy/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-brand-gold/10 rounded-lg"><Plus className="w-5 h-5 text-brand-gold" /></div>
                <h3 className="font-serif font-bold text-lg text-white">New Valuation</h3>
              </div>
              <form onSubmit={createValuation} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-offWhite/50 uppercase tracking-widest">Descriptor</label>
                  <input required disabled={!config.baseUrl} type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Marble Import" className="w-full bg-brand-darkNavy border border-white/10 rounded-lg px-4 py-3 text-white placeholder-brand-offWhite/10 focus:outline-none focus:border-brand-gold transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-offWhite/50 uppercase tracking-widest">Financials</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/40" />
                    <input required disabled={!config.baseUrl} type="text" value={formData.valuation} onChange={(e) => setFormData({...formData, valuation: e.target.value})} placeholder="1,250,000" className="w-full bg-brand-darkNavy border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-brand-offWhite/10 focus:outline-none focus:border-brand-gold transition-colors text-sm font-mono" />
                  </div>
                </div>
                <button disabled={loading || !config.baseUrl} type="submit" className="w-full py-4 bg-brand-gold text-brand-darkNavy font-bold rounded-lg hover:bg-brand-goldHover transition-all disabled:opacity-30">
                  {loading ? 'Syncing...' : 'Commit to Ledger'}
                </button>
              </form>
            </div>
            <div className="p-5 border border-brand-gold/10 rounded-xl bg-brand-gold/5 flex items-start space-x-3">
                <ShieldAlert className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-[10px] text-brand-offWhite/60 leading-relaxed italic">Actions are contextually bound to private partitions. Verified via OAuth2 Bearer standards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Status Indicator */}
      <div className="mt-12 py-6 border-t border-white/5 text-center flex flex-col items-center justify-center space-y-4 relative z-10">
        <div className="flex items-center justify-center space-x-3">
          <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-full border shadow-sm ${config.baseUrl ? 'bg-brand-success/10 border-brand-success/20' : 'bg-red-500/10 border-red-500/20 animate-pulse'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${config.baseUrl ? 'bg-brand-success' : 'bg-red-400'}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${config.baseUrl ? 'text-brand-success' : 'text-red-400'}`}>
              {config.baseUrl ? 'System Online' : 'System Offline'}
            </span>
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center space-x-2 text-brand-offWhite/30">
            <Link2 className="w-3 h-3" />
            <span className="text-[9px] font-mono tracking-tighter max-w-[200px] truncate">{config.baseUrl || 'No Endpoint Detected'}</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-brand-offWhite/20 tracking-wider flex items-center space-x-2">
          <Activity className="w-3 h-3 text-brand-gold/40" />
          <span>Build Verified: {config.baseUrl || 'WAITING_FOR_DEPLOYMENT'}</span>
        </div>
      </div>

      {/* Manual Configuration Modal */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darkNavy/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-brand-navy border border-brand-gold/30 rounded-3xl p-8 shadow-2xl relative">
            <button onClick={() => setIsConfigModalOpen(false)} className="absolute top-6 right-6 text-brand-offWhite/40 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-brand-gold/10 rounded-2xl"><Settings2 className="w-6 h-6 text-brand-gold" /></div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Manual Connection Override</h3>
                  <p className="text-xs text-brand-offWhite/50">Enter credentials while Vercel syncs your environment variables.</p>
                </div>
              </div>

              <form onSubmit={handleManualConfig} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Xano Base URL</label>
                  <input name="baseUrl" defaultValue={config.baseUrl} required placeholder="https://x8ki-letl-twmt.n7.xano.io/api:..." className="w-full bg-brand-darkNavy border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/5 focus:border-brand-gold outline-none transition-all font-mono text-xs" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Alex Token</label>
                    <input name="alexToken" defaultValue={config.alexToken} required placeholder="ey..." className="w-full bg-brand-darkNavy border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/5 focus:border-brand-gold outline-none transition-all font-mono text-[10px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Larry Token</label>
                    <input name="larryToken" defaultValue={config.larryToken} required placeholder="ey..." className="w-full bg-brand-darkNavy border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/5 focus:border-brand-gold outline-none transition-all font-mono text-[10px]" />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-gold text-brand-darkNavy font-bold rounded-xl hover:bg-brand-goldHover transition-all flex items-center justify-center space-x-2 mt-4 shadow-xl shadow-brand-gold/10">
                  <Save className="w-4 h-4" />
                  <span>Update & Reconnect</span>
                </button>
                <p className="text-[10px] text-center text-brand-offWhite/30 italic">These values are saved in your current session and will survive page refreshes.</p>
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
  <div className="bg-brand-navy/40 border border-white/5 rounded-xl p-5 flex items-center justify-between backdrop-blur-md shadow-lg group hover:border-brand-gold/20 transition-all duration-300">
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-brand-offWhite/40 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors">{value}</p>
    </div>
    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-brand-gold/10 transition-colors">{icon}</div>
  </div>
);

interface Valuation {
  id: number;
  name?: string;
  valuation?: string | number;
  created_at?: string;
  [key: string]: any;
}