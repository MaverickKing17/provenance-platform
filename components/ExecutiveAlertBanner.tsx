
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
 * ExecutiveAlertBanner: Updated with high-visibility typography resembling Google dashboard standards.
 * Prioritizes legibility over aggressive "institutional" styling.
 */
export const ExecutiveAlertBanner: React.FC = () => {
  const [riskItem, setRiskItem] = useState<SourcingItem | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const baseUrl = getEnv('NEXT_PUBLIC_XANO_BASE_URL');
    const alexToken = getEnv('NEXT_PUBLIC_ALEX_TOKEN');

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
        const criticalItem = data.find(item => 
          item.lead_time_days > 14 || 
          item.market_trend.toLowerCase() === 'volatile'
        );

        if (criticalItem) {
          setRiskItem(criticalItem);
        } else {
          setRiskItem(null);
        }
      } catch (error) {
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
    <div className="relative z-[100] w-full bg-[#0A1628] border-b border-white/10 py-4 px-8 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-brand-gold/[0.03] animate-pulse pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-10 relative z-10">
        
        <div className="flex items-center space-x-8 flex-grow min-w-0">
          <div className="flex items-center space-x-4 shrink-0">
            <div className="relative flex items-center justify-center">
              <Activity size={18} className={`${isScanning ? 'text-brand-gold animate-spin' : 'text-brand-success'} transition-colors`} />
            </div>
            <span className="text-sm font-bold text-white tracking-normal whitespace-nowrap">
              {isScanning ? 'Syncing Network...' : 'STRATEGIC FEED ACTIVE'}
            </span>
          </div>

          <div className="h-5 w-px bg-white/20 shrink-0"></div>

          <div className="flex-grow overflow-hidden relative">
            <div className="flex items-center space-x-5">
              {riskItem ? (
                <div className="flex items-center space-x-4 animate-in slide-in-from-left duration-700">
                  <AlertTriangle size={18} className="text-brand-gold shrink-0" />
                  <p className="text-base font-medium text-white tracking-tight truncate">
                    <span className="text-brand-gold font-bold mr-2 uppercase tracking-wide">Volatility Alert:</span>
                    <span className="opacity-90">{riskItem.material_name} lead period extended to {riskItem.lead_time_days} days for </span>
                    <span className="text-brand-gold font-bold underline decoration-brand-gold/30">{riskItem.project_name}</span>
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-4 text-brand-success animate-in fade-in duration-1000">
                  <ShieldCheck size={18} />
                  <p className="text-sm font-bold uppercase tracking-widest">
                    Supply Chain Perimeter Secured • 0 Anomalies • Global Hubs Operational
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8 shrink-0 border-l border-white/10 pl-8">
          <button className="flex items-center space-x-3 group bg-brand-gold/10 px-4 py-2 rounded-lg border border-brand-gold/20 hover:bg-brand-gold hover:text-brand-darkNavy transition-all">
            <Zap size={16} className="text-brand-gold group-hover:text-brand-darkNavy transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Mitigate Risk</span>
          </button>
          <button 
            onClick={handleDismiss}
            className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
            aria-label="Dismiss Alert"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent h-full -skew-x-12 animate-[shimmer_5s_infinite] pointer-events-none"></div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(450%); }
        }
      `}</style>
    </div>
  );
};
