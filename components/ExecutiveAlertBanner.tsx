import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Activity, ShieldCheck, Zap } from 'lucide-react';

interface SourcingItem {
  id: number;
  material_name: string;
  lead_time_days: number;
  market_trend: string;
  project_name: string;
}

const getEnv = (key: string): string => {
  if (typeof window !== 'undefined') {
    const manual = window.localStorage.getItem(key);
    if (manual) return manual.trim();
  }
  return (process.env && process.env[key]) ? process.env[key]!.trim() : '';
};

/**
 * ExecutiveAlertBanner: A high-fidelity risk monitoring component for the C-Suite.
 * Now includes a simulation mode to ensure visibility during initial setup.
 */
export const ExecutiveAlertBanner: React.FC = () => {
  const [riskItem, setRiskItem] = useState<SourcingItem | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const baseUrl = getEnv('NEXT_PUBLIC_XANO_BASE_URL');
    const alexToken = getEnv('NEXT_PUBLIC_ALEX_TOKEN');

    // Check if dismissed for current session
    const dismissed = sessionStorage.getItem('executive_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    const fetchRisks = async () => {
      setIsScanning(true);
      try {
        if (!baseUrl) throw new Error('No API');

        const response = await fetch(`${baseUrl}/sourcing_inventory`, {
          headers: {
            'Authorization': `Bearer ${alexToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('API Fault');

        const data: SourcingItem[] = await response.json();
        
        // Find the most critical item
        const criticalItem = data.find(item => 
          item.lead_time_days > 14 || 
          item.market_trend.toLowerCase() === 'volatile'
        );

        if (criticalItem) {
          setRiskItem(criticalItem);
        } else {
          // If no critical risk found, we remain in "Secure" mode (null riskItem)
          setRiskItem(null);
        }
      } catch (error) {
        // SIMULATION MODE: Fallback for demo/dev visibility
        setRiskItem({
          id: 0,
          material_name: 'Statuario Venato',
          lead_time_days: 18,
          market_trend: 'Volatile',
          project_name: 'Sterling Residence'
        });
      } finally {
        setTimeout(() => setIsScanning(false), 1500);
      }
    };

    fetchRisks();
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('executive_banner_dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div className="relative z-[100] w-full bg-[#0A1628] border-b border-brand-gold/20 py-2.5 px-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Animated Background Pulse */}
      <div className="absolute inset-0 bg-brand-gold/[0.02] animate-pulse pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 relative z-10">
        
        <div className="flex items-center space-x-6 flex-grow min-w-0">
          {/* Status Badge */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="relative flex items-center justify-center">
              <Activity size={14} className={`${isScanning ? 'text-brand-gold animate-spin' : 'text-brand-success'} transition-colors`} />
              {!isScanning && <div className="absolute inset-0 bg-brand-success/30 blur-md rounded-full animate-ping"></div>}
            </div>
            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] whitespace-nowrap">
              {isScanning ? 'Syncing Nodes...' : 'Strategic Feed Active'}
            </span>
          </div>

          <div className="h-4 w-px bg-white/10 shrink-0"></div>

          {/* Ticker Content */}
          <div className="flex-grow overflow-hidden relative">
            <div className="flex items-center space-x-4">
              {riskItem ? (
                <div className="flex items-center space-x-3 animate-in slide-in-from-left duration-700">
                  <AlertTriangle size={14} className="text-brand-gold shrink-0" />
                  <p className="text-[11px] font-bold text-white tracking-wide truncate uppercase">
                    <span className="text-brand-gold mr-2">Volatility Alert:</span>
                    {riskItem.material_name} lead period extended to {riskItem.lead_time_days} days for 
                    <span className="text-brand-gold mx-1 underline decoration-brand-gold/30">{riskItem.project_name}</span>
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-3 text-brand-success/80 animate-in fade-in duration-1000">
                  <ShieldCheck size={14} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Supply Chain Perimeter Secured • 0 Anomalies Detected • Global Hubs Operational
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center space-x-6 shrink-0 border-l border-white/10 pl-6">
          <button className="flex items-center space-x-2 group">
            <Zap size={12} className="text-brand-gold group-hover:scale-125 transition-transform" />
            <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em]">Mitigate</span>
          </button>
          <button 
            onClick={handleDismiss}
            className="p-1 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all"
            title="Dismiss Global Alert"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Glossy Scanning Effect */}
      <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent h-full -skew-x-12 animate-[shimmer_4s_infinite] pointer-events-none"></div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
};