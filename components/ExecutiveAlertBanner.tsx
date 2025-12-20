
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Activity, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
 * ExecutiveAlertBanner: Updated for C-Suite "Forced Visibility".
 * Permanent persistence logic based on backend risk states.
 * Replaces dismissal with an 'Acknowledge & Investigate' protocol.
 */
export const ExecutiveAlertBanner: React.FC = () => {
  const navigate = useNavigate();
  const [riskItem, setRiskItem] = useState<SourcingItem | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const baseUrl = getEnv('NEXT_PUBLIC_XANO_BASE_URL');
    const alexToken = getEnv('NEXT_PUBLIC_ALEX_TOKEN');

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
        // Priority logic: find volatile first, then high lead time
        const criticalItem = data.find(item => 
          item.market_trend.toLowerCase() === 'volatile' ||
          item.lead_time_days > 14
        );

        if (criticalItem) {
          setRiskItem(criticalItem);
        } else {
          setRiskItem(null);
        }
      } catch (error) {
        // Fallback for demo stability: Simulate a high-risk volatile alert
        setRiskItem({
          id: 0,
          material_name: 'Statuario Venato',
          lead_time_days: 18,
          market_trend: 'Volatile',
          project_name: 'Sterling Residence'
        });
      } finally {
        setTimeout(() => setIsScanning(false), 800);
      }
    };

    fetchRisks();
    // Refresh risk data every 60 seconds for live telemetry
    const interval = setInterval(fetchRisks, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = () => {
    setIsPulsing(true);
    // Visual confirmation "pulse" before navigation
    setTimeout(() => {
      setIsPulsing(false);
      navigate('/executive-command');
    }, 600);
  };

  // If no risk and not scanning, show standard secure perimeter
  if (!riskItem && !isScanning) {
    return (
      <div className="relative z-[100] w-full bg-brand-darkNavy border-b border-brand-success/20 py-3 px-8 shadow-lg overflow-hidden transition-all duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6 relative z-10">
          <ShieldCheck size={16} className="text-brand-success" />
          <p className="text-[10px] font-black text-brand-success uppercase tracking-[0.3em]">
            Supply Chain Perimeter Secured • 0 Strategic Anomalies • All Nodes Optimal
          </p>
        </div>
      </div>
    );
  }

  const isVolatile = riskItem?.market_trend.toLowerCase() === 'volatile';
  const bgColor = isVolatile ? '#B22222' : '#D4AF37'; // Deep Crimson vs Golden Amber
  const labelText = isVolatile ? 'CRITICAL STRATEGIC RISK' : 'OPERATIONAL DELAY ALERT';

  return (
    <div 
      className={`relative z-[100] w-full py-4 px-8 shadow-2xl overflow-hidden transition-all duration-700 ease-in-out border-b border-black/10 ${isPulsing ? 'scale-[1.01] brightness-125' : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)' }}>
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-10 relative z-10">
        
        <div className="flex items-center space-x-8 flex-grow min-w-0">
          <div className="flex items-center space-x-4 shrink-0">
            <div className="bg-white/10 p-2 rounded-lg">
              <Activity size={20} className={`text-white ${isScanning ? 'animate-spin' : ''}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] leading-none mb-1">
                {isScanning ? 'Syncing Network...' : 'INSTUTIONAL TELEMETRY'}
              </span>
              <span className="text-xs font-black text-white uppercase tracking-widest leading-none">
                {labelText}
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/20 shrink-0"></div>

          <div className="flex-grow overflow-hidden">
            <div className="flex items-center space-x-5">
              {riskItem && (
                <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left-4 duration-700">
                  <AlertTriangle size={20} className="text-white shrink-0 animate-pulse" />
                  <p className="text-lg font-sans font-black text-white tracking-tight truncate uppercase italic">
                    {riskItem.material_name} <span className="text-white/60 font-medium">|</span> {riskItem.lead_time_days} DAY HOLD <span className="text-white/60 font-medium">|</span> PROJECT: {riskItem.project_name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center shrink-0">
          <button 
            onClick={handleAcknowledge}
            className="flex items-center space-x-4 group bg-white text-brand-darkNavy px-8 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-darkNavy hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transform active:scale-95"
          >
            <span>Acknowledge & Investigate</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent h-full -skew-x-12 animate-[shimmer_3s_infinite] pointer-events-none"></div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </div>
  );
};
