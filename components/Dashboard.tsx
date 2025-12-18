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
  ShieldAlert
} from 'lucide-react';

/** 
 * STRICT RULE 1: API URL definition
 * Using the browser-accessible environment variable from Vercel.
 */
const BASE_URL = process.env.NEXT_PUBLIC_XANO_BASE_URL;

/**
 * STRICT RULE 2: Tokens (All Uppercase)
 * Accessing the private tenant tokens via environment variables.
 */
const TOKENS = {
  ALEX: process.env.ALEX_TOKEN || '',
  LARRY: process.env.LARRY_TOKEN || ''
};

type UserKey = keyof typeof TOKENS;

interface Valuation {
  id: number;
  name?: string;
  valuation?: string | number;
  created_at?: string;
  [key: string]: any;
}

export const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserKey>('ALEX');
  const [valuations, setValuations] = useState<Valuation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    valuation: ''
  });

  /**
   * STRICT RULE 3: Client-Side Check
   * Ensuring we handle missing variables gracefully in the browser.
   */
  useEffect(() => {
    if (!BASE_URL) {
      console.log('Xano Base URL is missing from environment variables');
    }
  }, []);

  const fetchValuations = async (user: UserKey) => {
    setValuations([]);
    setLoading(true);
    setError(null);

    if (!BASE_URL) {
      setError("Configuration Error: NEXT_PUBLIC_XANO_BASE_URL is not defined.");
      setLoading(false);
      return;
    }

    const token = TOKENS[user];
    if (!token) {
      const envVarName = user === 'ALEX' ? 'ALEX_TOKEN' : 'LARRY_TOKEN';
      setError(`Configuration Error: ${envVarName} is not defined.`);
      setLoading(false);
      return;
    }

    try {
      // Header Check: Verifying Bearer ${token} format with uppercase tokens
      const response = await fetch(`${BASE_URL}/valuation`, {
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
    
    if (!BASE_URL) {
      setError("Cannot proceed: API Base URL missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/create_valuation`, {
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

  useEffect(() => {
    fetchValuations(currentUser);
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-brand-darkNavy pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Testing Toggle & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-brand-navy/50 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-brand-gold animate-pulse" />
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">Live Testing Environment</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">Sourcing Hub Dashboard</h1>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-bold text-brand-offWhite/40 uppercase tracking-widest text-center md:text-right">Switch Active Tenant</span>
            <div className="bg-brand-darkNavy p-1 rounded-xl border border-white/10 flex items-center shadow-2xl">
              {(Object.keys(TOKENS) as UserKey[]).map((user) => (
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Records" 
            value={valuations.length.toString()} 
            icon={<FileText className="text-brand-gold" />} 
          />
          <StatCard 
            title="Active Procurement Cycles" 
            value={loading ? "..." : "12"} 
            icon={<Building className="text-brand-gold" />} 
          />
          <StatCard 
            title="Avg. Deal Size" 
            value="$4.2M" 
            icon={<TrendingUp className="text-brand-gold" />} 
          />
          <StatCard 
            title="Tenant Verification" 
            value={currentUser === 'ALEX' ? 'Alex' : 'Larry'} 
            icon={<CheckCircle2 className="text-brand-success" />} 
          />
        </div>

        {/* Main Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* List Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-brand-navy/30 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h2 className="font-serif font-bold text-xl text-white">Active Procurement Cycles</h2>
                <div className="flex items-center space-x-3">
                   <span className="text-[10px] font-mono text-brand-offWhite/30">Tenant: {currentUser === 'ALEX' ? 'Alex' : 'Larry'}</span>
                   <button 
                    onClick={() => fetchValuations(currentUser)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-brand-offWhite/40 hover:text-brand-gold"
                    title="Manual Refresh"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-gold' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="min-h-[400px]">
                {error ? (
                  <div className="p-12 text-center space-y-4">
                    <div className="inline-flex p-4 bg-red-500/10 rounded-full">
                      <AlertCircle className="w-12 h-12 text-red-400" />
                    </div>
                    <p className="text-red-400 font-medium px-8 whitespace-pre-wrap text-sm">{error}</p>
                    <button 
                      onClick={() => fetchValuations(currentUser)}
                      className="px-6 py-2 bg-white/5 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
                    >
                      Retry Connection
                    </button>
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
                        {loading && valuations.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="px-6 py-20 text-center">
                              <div className="flex flex-col items-center space-y-3">
                                <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs text-brand-offWhite/40">Synchronizing secure ledger...</span>
                              </div>
                            </td>
                          </tr>
                        ) : valuations.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="px-6 py-20 text-center text-brand-offWhite/20 italic font-light">
                              No records detected for tenant {currentUser === 'ALEX' ? 'Alex' : 'Larry'}.
                            </td>
                          </tr>
                        ) : (
                          valuations.map((v) => (
                            <tr key={v.id} className="hover:bg-white/5 transition-colors group">
                              <td className="px-6 py-4 font-medium text-white">{v.name || 'Unnamed Asset'}</td>
                              <td className="px-6 py-4 text-right text-brand-offWhite font-mono">
                                 {typeof v.valuation === 'number' 
                                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v.valuation)
                                    : v.valuation || '—'}
                              </td>
                              <td className="px-6 py-4 text-right text-brand-offWhite/30 text-[10px] font-mono">
                                {v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}
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

          {/* Action Section */}
          <div className="space-y-6">
            <div className="bg-brand-navy/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-brand-gold/10 rounded-lg">
                  <Plus className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white">New Valuation</h3>
              </div>

              <form onSubmit={createValuation} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-offWhite/50 uppercase tracking-widest">Project Descriptor</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Carrara Marble Import"
                    className="w-full bg-brand-darkNavy border border-white/10 rounded-lg px-4 py-3 text-white placeholder-brand-offWhite/10 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-offWhite/50 uppercase tracking-widest">Financial Valuation</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/40" />
                    <input 
                      required
                      type="text" 
                      value={formData.valuation}
                      onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                      placeholder="1,250,000"
                      className="w-full bg-brand-darkNavy border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-brand-offWhite/10 focus:outline-none focus:border-brand-gold transition-colors text-sm font-mono"
                    />
                  </div>
                </div>
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full py-4 bg-brand-gold text-brand-darkNavy font-bold rounded-lg hover:bg-brand-goldHover transition-all shadow-lg shadow-brand-gold/10 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? 'Processing...' : 'Commit to Tenant Ledger'}
                </button>
              </form>
            </div>

            <div className="p-5 border border-brand-gold/10 rounded-xl bg-brand-gold/5 flex items-start space-x-3">
                <ShieldAlert className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-[10px] text-brand-offWhite/60 leading-relaxed italic">
                  Isolated Sourcing Hub: Actions are contextually bound to <strong>{currentUser === 'ALEX' ? 'Alex' : 'Larry'}'s</strong> private data partition. Verified via OAuth2 Bearer standards.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-brand-navy/40 border border-white/5 rounded-xl p-5 flex items-center justify-between backdrop-blur-md shadow-lg group hover:border-brand-gold/20 transition-colors">
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-brand-offWhite/40 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors">{value}</p>
    </div>
    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-brand-gold/10 transition-colors">
      {icon}
    </div>
  </div>
);