
import React, { useState } from 'react';
import { AlertTriangle, Activity, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRisk } from '../context/RiskContext';

export const ExecutiveAlertBanner: React.FC = () => {
  const navigate = useNavigate();
  const { tier, color, label, showAIHedging, isLoading, isDemoMode } = useRisk();
  const [isPulsing, setIsPulsing] = useState(false);

  // Requirement: Banner must be fixed/undismissable if tier 1 or 2
  const isHighRisk = tier === 1 || tier === 2 || isDemoMode;

  const handleAcknowledge = () => {
    setIsPulsing(true);
    setTimeout(() => {
      setIsPulsing(false);
      navigate('/executive-command');
    }, 600);
  };

  if (tier >= 4 && !isLoading && !isDemoMode) {
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

  // Demo Mode overrides
  const displayLabel = isDemoMode ? 'VOLATILITY ALERT' : `${label} RISK ADVISORY`;
  const displayMessage = isDemoMode ? '18-Day Delay Detected in Sterling Residence' : 'Critical Supply Node Failure | Action Required to Release Capital Hold';

  return (
    <div 
      className={`z-[100] w-full py-4 px-8 shadow-2xl overflow-hidden transition-all duration-700 ease-in-out border-b border-black/20 ${isHighRisk ? 'sticky top-0' : 'relative'} ${isPulsing ? 'scale-[1.01] brightness-125' : ''}`}
      style={{ backgroundColor: isDemoMode ? '#FF4F00' : color }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)' }}>
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-10 relative z-10">
        <div className="flex items-center space-x-8 flex-grow min-w-0">
          <div className="flex items-center space-x-5 shrink-0">
            <div className="bg-white/20 p-2.5 rounded-xl border border-white/30 backdrop-blur-md">
              <Activity size={22} className={`text-white ${isLoading ? 'animate-spin' : ''}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-white uppercase tracking-[0.25em] leading-none mb-1.5 opacity-80">
                Institutional Telemetry
              </span>
              <span className="text-[13px] font-black text-white uppercase tracking-[0.15em] leading-none">
                {displayLabel}
              </span>
            </div>
          </div>

          <div className="h-10 w-px bg-white/30 shrink-0"></div>

          <div className="flex-grow overflow-hidden">
            <div className="flex items-center space-x-6">
              <AlertTriangle size={24} className="text-white shrink-0 animate-pulse" />
              <p className="text-lg lg:text-xl font-sans font-black text-white tracking-tight truncate uppercase italic">
                {displayMessage}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5 shrink-0">
          {(showAIHedging || isDemoMode) && (
            <button className="flex items-center space-x-3 bg-white/20 border border-white/40 text-white px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/30 transition-all backdrop-blur-sm">
              <Sparkles size={16} />
              <span>AI Hedging</span>
            </button>
          )}
          <button 
            onClick={handleAcknowledge}
            className="flex items-center space-x-4 group bg-white text-brand-darkNavy px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-darkNavy hover:text-white transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.25)] transform hover:scale-[1.02] active:scale-95"
          >
            <span>Investigate</span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent h-full -skew-x-12 animate-[shimmer_3s_infinite] pointer-events-none"></div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </div>
  );
};
