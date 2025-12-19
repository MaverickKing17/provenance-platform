import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Activity } from 'lucide-react';

interface SourcingItem {
  id: number;
  material_name: string;
  lead_time_days: number;
  market_trend: string;
  project_name: string;
}

/**
 * ExecutiveAlertBanner: A high-fidelity risk monitoring component for the C-Suite.
 * Connects to Xano backend to identify volatility in the supply chain.
 */
export const ExecutiveAlertBanner: React.FC = () => {
  const [riskItem, setRiskItem] = useState<SourcingItem | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_XANO_BASE_URL;
    const alexToken = process.env.NEXT_PUBLIC_ALEX_TOKEN;

    if (!baseUrl) {
      console.log('Alert System: Waiting for environment sync');
      return;
    }

    // Check if dismissed for current session
    const dismissed = sessionStorage.getItem('executive_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    const fetchRisks = async () => {
      try {
        const response = await fetch(`${baseUrl}/sourcing_inventory`, {
          headers: {
            'Authorization': `Bearer ${alexToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) return;

        const data: SourcingItem[] = await response.json();
        
        // Trigger Condition: lead_time_days > 14 OR market_trend is 'volatile'
        const criticalItem = data.find(item => 
          item.lead_time_days > 14 || 
          item.market_trend.toLowerCase() === 'volatile'
        );

        if (criticalItem) {
          setRiskItem(criticalItem);
        }
      } catch (error) {
        // Silently fail as per enterprise resilience guidelines
        console.error('Executive Risk Feed Interrupted');
      }
    };

    fetchRisks();
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('executive_banner_dismissed', 'true');
  };

  if (!riskItem || isDismissed) return null;

  const isCritical = riskItem.lead_time_days > 21 || riskItem.market_trend.toLowerCase() === 'volatile';
  const textColor = isCritical ? '#B22222' : '#D4AF37'; // Crimson for high volatility, Gold for standard risk

  return (
    <div className="relative z-[60] w-full bg-[#1A1A1A] border-b border-white/5 py-3 px-6 animate-in slide-in-from-top duration-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        
        {/* Risk Signal */}
        <div className="flex items-center space-x-4 flex-grow min-w-0">
          <div className="flex items-center space-x-2 shrink-0">
            <div className="relative">
              <Activity size={12} className="text-brand-success animate-pulse" />
              <div className="absolute inset-0 bg-brand-success/20 blur-sm rounded-full animate-ping"></div>
            </div>
            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Live Monitoring</span>
          </div>

          <div className="h-3 w-px bg-white/10 shrink-0 hidden sm:block"></div>

          <p className="text-[11px] font-bold tracking-wide truncate" style={{ color: textColor }}>
            <span className="mr-2">⚠️</span>
            <span className="uppercase tracking-widest mr-2">Strategic Risk:</span>
            {riskItem.material_name} lead time has increased to {riskItem.lead_time_days} days. 
            Project <span className="italic">{riskItem.project_name}</span> margin at risk.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6 shrink-0">
          <button 
            onClick={handleDismiss}
            className="group flex items-center space-x-2 text-[10px] font-black text-white/30 uppercase tracking-widest hover:text-white transition-all"
          >
            <span>Dismiss</span>
            <X size={14} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
    </div>
  );
};
