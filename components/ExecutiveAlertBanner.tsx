
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
      className={`z-[100] w-full py-4 px-8 shadow-2xl overflow-hidden transition-all duration-700 ease-in-out border-b border-black/10 ${isHighRisk ? 'sticky top-0' : 'relative'} ${isPulsing ? 'scale-[1.01] brightness-125' : ''}`}
      style={{ backgroundColor: isDemoMode ? '#FF4F00' : color }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)' }}>
      </div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-10 relative z-10">
        <div className="flex items-center space-x-8 flex-grow min-w-0">
          <div className="flex items-center space-x-4 shrink-0">
            <div className="bg-white/10 p-2 rounded-lg">
              <Activity size={20} className={`text-white ${isLoading ? 'animate-spin' : ''}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] leading-none mb-1">
                INSTUTIONAL TELEMETRY
              </span>
              <span className="text-xs font-black text-white uppercase tracking-widest leading-none">
                {displayLabel}
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/20 shrink-0"></div>

          <div className="flex-grow overflow-hidden">
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left-4 duration-700">
                <AlertTriangle size={20} className="text-white shrink-0 animate-pulse" />
                <p className="text-lg font-sans font-black text-white tracking-tight truncate uppercase italic">
                  {displayMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          {(showAIHedging || isDemoMode) && (
            <button className="flex items-center space-x-3 bg-white/10 border border-white/30 text-white px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/20 transition-all">
              <Sparkles size={14} />
              <span>AI Hedging</span>
            </button>
          )}
          <button 
            onClick={handleAcknowledge}
            className="flex items-center space-x-4 group bg-white text-brand-darkNavy px-8 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-darkNavy hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transform active:scale-95"
          >
            <span>Acknowledge & Investigate</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
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
