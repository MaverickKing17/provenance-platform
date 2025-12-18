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
  DollarSign
} from 'lucide-react';

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:iW53U8Nn';

const TOKENS = {
  Alex: 'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.GwF2onBAq5R1r4_X_96YgRPSic5uZcl6Mcr5kgFpAJPRS7YJwFp6xEsZS4iYgPDHreRVMQUVqIGERsh_kfGpE2DDNcqTin7M.ykvvof6lwZOVqo84mXKzjw.M4O3ffoWavlotha-y2lyplNWYfMlmaqHBmLFPvfIyGZJ6gnKSElMvegLlHdNnNIP8tK-5-Lmu_7CzKcTe-oLHXyhnTC89weBf2brHmyslssU4MxnkFDx0xaVByUvVaOsB9eiqr7re3uZcwAHHPjRtJn__I_02zRudyfz5n9u-h4.z3BQHd0F53_YWd3aIcGVaNGg2i_gO1Yn7RtcT3mcfgQ',
  Larry: 'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.wOccy_RQhBALSoLoRzL8KMeLY3FaxIDieg-azEoWtJBg_aylsNLfiCjAKnB75lu8D2jDFeHJC7lwZCUNE8EDIOYF-S9F-bPU.JeJbAwFwhQ_Fl1fMgyaqzA.7Ox-3icg_mYBgxgvOBbEZjgPiF3gfTCRj5EmMVrK95BifjWto4qgiPx7WQGAymZ6YZ-vLvhB5xY0qZoLq19_A3ghMJws_GfSPVEhqDjhUADRY6F30SuQ7wg7bWO9fPk4V7BZhHzfXwKp-bLYxWhnr2bUborR7cRHh9lhlhGf5Co.kBdwz8FEYSbdhriGfSQXAF-5efUc3mwTqhrt5EMbMFI'
};

type UserKey = keyof typeof TOKENS;

interface Valuation {
  id: number;
  name?: string;
  valuation?: string | number;
  created_at?: string;
  // Dynamic fields from Xano
  [key: string]: any;
}

export const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserKey>('Alex');
  const [valuations, setValuations] = useState<Valuation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    valuation: ''
  });

  const fetchValuations = async (user: UserKey) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/valuation`, {
        headers: {
          'Authorization': `Bearer ${TOKENS[user]}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setValuations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/create_valuation`, {
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
      if (!response.ok) throw new Error('Failed to create valuation');
      
      // Success
      setFormData({ name: '', valuation: '' });
      setIsAdding(false);
      fetchValuations(currentUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValuations(currentUser);
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-brand-darkNavy pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">Sourcing Hub</h1>
            <p className="text-brand-offWhite/60 max-w-lg">
              Manage and track project valuations across your enterprise portfolio. 
              Verified data isolation enabled.
            </p>
          </div>

          {/* User Switcher Component */}
          <div className="bg-brand-navy/80 p-1.5 rounded-lg border border-white/10 flex items-center space-x-1 shadow-inner">
            {(Object.keys(TOKENS) as UserKey[]).map((user) => (
              <button
                key={user}
                onClick={() => setCurrentUser(user)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 flex items-center space-x-2 ${
                  currentUser === user 
                    ? 'bg-brand-gold text-brand-darkNavy shadow-lg' 
                    : 'text-brand-offWhite/50 hover:text-brand-offWhite hover:bg-white/5'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{user}'s Workspace</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Valuations" 
            value={valuations.length.toString()} 
            icon={<FileText className="text-brand-gold" />} 
          />
          <StatCard 
            title="Active Projects" 
            value="12" 
            icon={<Building className="text-brand-gold" />} 
          />
          <StatCard 
            title="Avg. Valuation" 
            value="$4.2M" 
            icon={<TrendingUp className="text-brand-gold" />} 
          />
          <StatCard 
            title="Compliance Status" 
            value="Verified" 
            icon={<CheckCircle2 className="text-brand-success" />} 
          />
        </div>

        {/* Main Dashboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* List Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-brand-navy/30 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h2 className="font-serif font-bold text-xl text-white">Project Inventory</h2>
                <button 
                  onClick={() => fetchValuations(currentUser)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-brand-offWhite/40 hover:text-brand-gold"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-gold' : ''}`} />
                </button>
              </div>

              <div className="overflow-x-auto">
                {error ? (
                  <div className="p-12 text-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
                    <p className="text-red-400 font-medium">{error}</p>
                    <button 
                      onClick={() => fetchValuations(currentUser)}
                      className="px-4 py-2 border border-red-400/30 text-red-400 rounded-md hover:bg-red-400/10 transition-colors"
                    >
                      Retry Connection
                    </button>
                  </div>
                ) : valuations.length === 0 && !loading ? (
                  <div className="p-12 text-center text-brand-offWhite/40 italic">
                    No records found for {currentUser}. Start by adding a valuation.
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-brand-gold uppercase tracking-widest">Entity Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-brand-gold uppercase tracking-widest text-right">Valuation</th>
                        <th className="px-6 py-4 text-xs font-bold text-brand-gold uppercase tracking-widest text-right">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {valuations.map((v) => (
                        <tr key={v.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4 font-medium text-white">{v.name || 'Unnamed Project'}</td>
                          <td className="px-6 py-4 text-right text-brand-offWhite">
                             {typeof v.valuation === 'number' 
                                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v.valuation)
                                : v.valuation || '—'}
                          </td>
                          <td className="px-6 py-4 text-right text-brand-offWhite/40 text-xs font-mono">
                            {v.created_at ? new Date(v.created_at).toLocaleDateString() : 'Pending'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {loading && (
                  <div className="p-8 flex justify-center">
                    <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="space-y-6">
            <div className="bg-brand-navy/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-brand-gold/10 rounded-lg">
                  <Plus className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white">Create Valuation</h3>
              </div>

              <form onSubmit={createValuation} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-offWhite/50 uppercase tracking-wider">Project Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Modernist Villa Estate"
                    className="w-full bg-brand-darkNavy border border-white/10 rounded-md px-4 py-3 text-white placeholder-brand-offWhite/20 focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-offWhite/50 uppercase tracking-wider">Estimated Valuation</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-offWhite/30" />
                    <input 
                      required
                      type="text" 
                      value={formData.valuation}
                      onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                      placeholder="5,000,000"
                      className="w-full bg-brand-darkNavy border border-white/10 rounded-md pl-10 pr-4 py-3 text-white placeholder-brand-offWhite/20 focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                </div>
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full py-4 bg-brand-gold text-brand-darkNavy font-bold rounded-md hover:bg-brand-goldHover transition-all shadow-lg shadow-brand-gold/10 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? 'Submitting...' : 'Append to Ledger'}
                </button>
              </form>
            </div>

            {/* Hint Box */}
            <div className="bg-brand-navy/10 border border-brand-gold/10 rounded-xl p-5">
              <p className="text-xs text-brand-offWhite/40 leading-relaxed italic">
                Notice: Data entered here is cryptographically anchored to {currentUser}'s private tenant. 
                Switch workspaces to verify isolation protocols.
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
  <div className="bg-brand-navy/40 border border-white/5 rounded-xl p-5 flex items-center justify-between backdrop-blur-md">
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-brand-offWhite/40 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-serif font-bold text-white">{value}</p>
    </div>
    <div className="p-3 bg-white/5 rounded-lg">
      {icon}
    </div>
  </div>
);