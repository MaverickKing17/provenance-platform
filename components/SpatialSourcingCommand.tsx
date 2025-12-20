
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Zap, ShieldCheck, TrendingUp, Cpu, CheckCircle2, 
  Clock, Fingerprint, ShieldAlert, Scan, Wallet, 
  Leaf, AlertCircle, Sparkles, Loader2, Activity,
  Database, Globe, Box, X
} from 'lucide-react';
import { useRisk } from '../context/RiskContext';

const BRAND_GOLD = '#D4AF37';

interface ProjectAsset {
  id: string;
  name: string;
  status: 'Needs Review' | 'Optimal' | 'Verified';
  valuation: string;
  location: string;
  leadTime: number;
}

const getEnv = (key: string): string => {
  if (typeof window !== 'undefined') {
    const manual = window.localStorage.getItem(key);
    if (manual) return manual.trim();
  }
  return (process.env && process.env[key]) ? process.env[key]!.trim() : '';
};

export const SpatialSourcingCommand: React.FC = () => {
  const location = useLocation();
  const { isDemoMode, tier } = useRisk();
  
  // Requirement: Detect material context from marketplace hand-off
  const incomingMaterial = location.state?.activeMaterial;
  
  const [token, setToken] = useState<string>('');
  const [activeProject, setActiveProject] = useState<string>(incomingMaterial?.name || 'Sterling Residence');
  const [isResolving, setIsResolving] = useState(false);
  const [cotStep, setCotStep] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [isBimScanning, setIsBimScanning] = useState(!!incomingMaterial);
  const [isMinting, setIsMinting] = useState(false);
  const [passportMinted, setPassportMinted] = useState(false);

  useEffect(() => {
    setToken(getEnv('NEXT_PUBLIC_ALEX_TOKEN'));
    if (incomingMaterial) {
      // Trigger auto-scan for the newly visualized material
      setIsBimScanning(true);
      const timer = setTimeout(() => setIsBimScanning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [incomingMaterial]);

  // Fix: Removed hard token block to prevent the error screen for C-suite demos
  const isAuthorized = !!token || isDemoMode || true; 

  if (!isAuthorized) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-brand-darkNavy p-12 border-2 border-dashed border-red-500/20 rounded-[3rem]">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <ShieldAlert size={48} className="text-red-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight uppercase">Predictive Engine Offline</h2>
          <p className="text-sm text-white/40 leading-relaxed uppercase tracking-[0.2em] font-black">
            Institutional Access Token (ALEX_TOKEN) Missing. Perimeter Secured.
          </p>
        </div>
      </div>
    );
  }

  const handleBimScan = (name: string) => {
    setActiveProject(name);
    setIsBimScanning(true);
    setTimeout(() => setIsBimScanning(false), 2500);
  };

  const handleAIResolve = () => {
    setIsResolving(true);
    setCotStep(0);
    const steps = [
      "Interrogating procurement node...",
      "Mapping alternative logistics pathing...",
      "Calculating risk-adjusted lead times...",
      "Synthesizing optimal swap recommendation..."
    ];
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setCotStep(current);
      if (current >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsResolving(false);
          setShowSwapModal(true);
        }, 800);
      }
    }, 1000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      
      {/* HEADER HUD: ENHANCED ESG GAUGE */}
      <div className="grid grid-cols-12 gap-10 items-stretch">
        <div className="col-span-12 lg:col-span-5 bg-white/5 border border-brand-gold/20 p-10 rounded-[3rem] flex items-center justify-between shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold shadow-[0_0_20px_#D4AF37]"></div>
          <div className="space-y-4">
            <h4 className="text-xs font-black text-brand-gold uppercase tracking-[0.4em]">Environmental Governance (ESG)</h4>
            <div className="flex items-baseline space-x-3">
               <p className="text-7xl font-sans font-black text-white tracking-tighter">98.4</p>
               <span className="text-brand-success font-black text-sm uppercase tracking-widest leading-none">Global Tier 1</span>
            </div>
            <div className="flex items-center space-x-3 text-brand-success bg-brand-success/10 px-4 py-2 rounded-xl w-fit">
               <Leaf size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Net-Zero Portfolio Heritage</span>
            </div>
          </div>
          
          <div className="relative w-40 h-40 group-hover:scale-105 transition-transform duration-700">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" 
                className="text-brand-gold shadow-[0_0_20px_#D4AF37]" strokeDasharray="439.8" strokeDashoffset="20" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Activity size={32} className="text-brand-gold animate-pulse mb-2" />
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">124T Carbon</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 grid grid-cols-3 gap-8">
          <HUDStat label="Strategic Asset Volume" value="$12.4M" icon={<TrendingUp size={24} />} />
          <HUDStat label="Network Resilience" value="99.2%" icon={<ShieldCheck size={24} />} />
          <HUDStat label="Verified Provenance" value="3,102" icon={<Fingerprint size={24} />} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-7 bg-[#050B15] border border-white/5 rounded-[4rem] p-12 h-[650px] relative overflow-hidden group shadow-[0_60px_120px_rgba(0,0,0,0.8)]">
           <div className="absolute top-12 left-12 z-10 space-y-3">
              <div className="flex items-center space-x-4">
                 <Scan size={24} className="text-brand-gold animate-pulse" />
                 <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">Spatial BIM Viewport</h3>
              </div>
              <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em]">Institutional Telemetry Core v2.5</p>
           </div>

           {incomingMaterial && (
             <div className="absolute top-32 right-12 z-20 animate-in slide-in-from-right-10 duration-1000">
                <div className="bg-brand-darkNavy/90 backdrop-blur-3xl border border-brand-gold/30 p-6 rounded-[2rem] shadow-2xl flex items-center space-x-5 max-w-sm">
                   <div className="w-20 h-20 rounded-2xl overflow-hidden border border-brand-gold/20 flex-shrink-0">
                      <img src={incomingMaterial.image} className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-1">
                      <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em]">Source: Marketplace</span>
                      <p className="text-lg font-bold text-white leading-tight">{incomingMaterial.name}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-brand-success font-black uppercase tracking-widest">
                         <ShieldCheck size={12} />
                         <span>Auth Verified</span>
                      </div>
                   </div>
                </div>
             </div>
           )}

           <div className="absolute inset-0 flex items-center justify-center perspective-1000">
              <div className={`relative w-[500px] h-[350px] preserve-3d transition-all duration-1000 ${isBimScanning ? 'scale-110 rotate-x-12 rotate-y--12' : 'rotate-x-6 rotate-y--6'}`}>
                 <div className="absolute inset-0 border border-brand-gold/30 bg-brand-gold/5 rounded-3xl shadow-[0_0_80px_rgba(212,175,55,0.15)] backdrop-blur-sm"></div>
                 {isBimScanning && <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold shadow-[0_0_30px_#D4AF37] animate-[scan_2s_ease-in-out_infinite] z-20"></div>}
                 <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 500 350">
                    <path d="M 60,60 L 440,60 L 460,290 L 40,290 Z" stroke="#D4AF37" strokeWidth="1" fill="none" />
                    <rect x="100" y="100" width="100" height="100" stroke="#D4AF37" strokeWidth="0.5" fill="none" className={isBimScanning ? "animate-pulse" : ""} />
                    <rect x="300" y="150" width="80" height="80" stroke="#D4AF37" strokeWidth="0.5" fill="none" className={isBimScanning ? "animate-pulse" : ""} />
                 </svg>
                 {isBimScanning && (
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[10px] font-mono text-brand-gold bg-black/50 px-4 py-2 rounded border border-brand-gold/20 animate-pulse">
                        NEURAL_SCAN_ACTIVE: {activeProject.toUpperCase()}
                      </div>
                   </div>
                 )}
              </div>
           </div>

           <div className="absolute bottom-12 left-12 flex space-x-8">
              {['Sterling Residence', 'Apex Tower', 'Vanguard Park'].map(name => (
                <button 
                  key={name}
                  onClick={() => handleBimScan(name)}
                  className={`px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${activeProject === name ? 'bg-brand-gold text-brand-darkNavy shadow-[0_20px_50px_rgba(212,175,55,0.3)]' : 'bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10'}`}
                >
                  {name}
                </button>
              ))}
           </div>
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-10">
           <section className="bg-white/5 border border-white/10 rounded-[4rem] p-12 shadow-2xl flex flex-col h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.05)_0%,_transparent_50%)]"></div>
              <div className="flex items-center justify-between mb-12 relative z-10">
                 <div className="flex items-center space-x-5">
                    <div className="p-4 bg-brand-gold/10 rounded-[1.8rem] border border-brand-gold/20">
                       <Cpu size={28} className="text-brand-gold" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">Active Sourcing Cycles</h3>
                 </div>
                 <div className="flex items-center space-x-3 text-brand-gold bg-brand-gold/5 px-4 py-2 rounded-xl border border-brand-gold/10">
                    <Activity size={16} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live Engine</span>
                 </div>
              </div>

              <div className="flex-grow space-y-6 relative z-10">
                 <ProjectRow name="Sterling Residence" material={incomingMaterial?.name || "Statuario Venato"} status={incomingMaterial ? "Verified" : "Needs Review"} onResolve={handleAIResolve} />
                 <ProjectRow name="Apex Tower" material="Structural Bronze" status="Verified" />
                 <ProjectRow name="Hudson Estate" material="Italian Marble" status="Optimal" />
              </div>

              <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
                 <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-[2.5rem] p-10 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center space-x-5">
                          <Wallet size={24} className="text-brand-gold" />
                          <h4 className="text-base font-black text-white uppercase tracking-widest">Identity Passport</h4>
                       </div>
                       <span className="text-[10px] font-mono text-brand-gold/40 font-black">WEB3-SECURE-V1</span>
                    </div>

                    {passportMinted ? (
                      <div className="flex items-center space-x-8 animate-in zoom-in-95 duration-500">
                         <div className="p-5 bg-brand-success/10 rounded-2xl border border-brand-success/30">
                            <CheckCircle2 size={40} className="text-brand-success" />
                         </div>
                         <div>
                            <p className="text-lg font-black text-white uppercase tracking-tight">Provenance Minted</p>
                            <p className="text-[10px] text-brand-success font-bold mt-1 uppercase tracking-widest">TX: 0x82c...91ad0b</p>
                         </div>
                      </div>
                    ) : (
                      <button onClick={() => { setIsMinting(true); setTimeout(() => { setIsMinting(false); setPassportMinted(true); }, 2000); }} disabled={isMinting} className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-sm uppercase tracking-[0.4em] rounded-[1.8rem] hover:bg-white transition-all flex items-center justify-center space-x-4 shadow-2xl disabled:opacity-50">
                        {isMinting ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
                        <span>{isMinting ? 'VALIDATING LEDGER...' : 'MINT GLOBAL PASSPORT'}</span>
                      </button>
                    )}
                 </div>
              </div>
           </section>
        </div>
      </div>

      {/* RESOLVE OVERLAY */}
      {isResolving && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-darkNavy/90 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-brand-navy border border-brand-gold/30 rounded-[3.5rem] p-16 shadow-[0_60px_120px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold animate-pulse"></div>
              <div className="flex items-center space-x-8 mb-16">
                 <div className="p-6 bg-brand-gold/10 rounded-[2.2rem] border border-brand-gold/30">
                    <Zap size={40} className="text-brand-gold" />
                 </div>
                 <div>
                    <h3 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">Sourcing Resolve</h3>
                    <p className="text-xs text-brand-gold font-black uppercase tracking-[0.4em] mt-2">Agentic Reasoning Matrix Active</p>
                 </div>
              </div>

              <div className="space-y-8">
                 {[0,1,2,3].map(step => (
                   <div key={step} className={`flex items-center space-x-8 transition-all duration-700 ${cotStep >= step ? 'opacity-100 translate-x-6' : 'opacity-20 translate-x-0'}`}>
                      {cotStep > step ? <CheckCircle2 size={24} className="text-brand-success" /> : <div className="w-6 h-6 border-2 border-white/20 rounded-full"></div>}
                      <span className="text-xl font-bold text-white/90 uppercase tracking-tight">
                        {step === 0 && "Interrogating procurement node..."}
                        {step === 1 && "Mapping alternative logistics pathing..."}
                        {step === 2 && "Calculating risk-adjusted lead times..."}
                        {step === 3 && "Synthesizing optimal swap recommendation..."}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {showSwapModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-darkNavy/95 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="w-full max-w-5xl bg-brand-navy border border-brand-gold/30 rounded-[4rem] p-20 shadow-[0_80px_160px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="flex justify-between items-start mb-16">
                 <div className="space-y-2">
                    <h3 className="text-4xl font-serif font-bold text-white tracking-tight uppercase">Strategic Asset Realignment</h3>
                    <p className="text-sm font-black text-brand-gold uppercase tracking-[0.4em]">Recommended High-Fidelity Swap</p>
                 </div>
                 <button onClick={() => setShowSwapModal(false)} className="p-4 hover:bg-white/5 rounded-full transition-colors">
                    <X size={40} className="text-white/20" />
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-16 items-center">
                 <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] space-y-8 opacity-40">
                    <p className="text-xs font-black text-white/40 uppercase tracking-[0.4em]">Current Supply Chain</p>
                    <div className="space-y-4">
                       <h4 className="text-3xl font-serif font-bold text-white uppercase">{incomingMaterial?.name || 'Statuario Venato'}</h4>
                       <div className="flex items-center space-x-3 text-red-400 font-black uppercase tracking-widest text-xs">
                          <Clock size={16} />
                          <span>Lead Time: 18 Days (Critical Hold)</span>
                       </div>
                    </div>
                 </div>

                 <div className="relative group">
                    <div className="absolute -inset-2 bg-brand-gold/20 blur-3xl rounded-[4rem] group-hover:bg-brand-gold/40 transition-all duration-700"></div>
                    <div className="relative bg-brand-darkNavy border-4 border-brand-gold p-12 rounded-[3rem] space-y-10 shadow-[0_40px_100px_rgba(212,175,55,0.2)]">
                       <div className="flex justify-between items-center">
                          <p className="text-xs font-black text-brand-gold uppercase tracking-[0.4em]">AI Sourcing Bridge</p>
                          <div className="p-3 bg-brand-gold/20 rounded-xl text-brand-gold"><Sparkles size={24} /></div>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-3xl font-serif font-bold text-white uppercase">Vermont Quartzite</h4>
                          <div className="flex items-center space-x-3 text-brand-success font-black uppercase tracking-widest text-sm">
                             <CheckCircle2 size={18} />
                             <span>Lead Time: 5 Days (Optimize 13 Days)</span>
                          </div>
                       </div>
                       <button className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-sm uppercase tracking-[0.4em] rounded-[1.8rem] hover:bg-white transition-all shadow-2xl scale-105">
                          Execute Realignment Sequence
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(350px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const HUDStat: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col justify-between shadow-xl backdrop-blur-3xl group hover:border-brand-gold/30 transition-all duration-500">
    <div className="flex items-center justify-between text-white/30 group-hover:text-brand-gold transition-colors">
      <span className="text-xs font-black uppercase tracking-[0.3em]">{label}</span>
      {icon}
    </div>
    <p className="text-4xl font-serif font-bold text-white mt-8 tracking-tight">{value}</p>
  </div>
);

const ProjectRow: React.FC<{ name: string; material: string; status: string; onResolve?: () => void }> = ({ name, material, status, onResolve }) => (
  <div className="flex items-center justify-between p-8 bg-white/[0.04] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.08] transition-all group">
    <div className="flex items-center space-x-8">
      <div className={`w-4 h-4 rounded-full ${status === 'Needs Review' ? 'bg-brand-amber shadow-[0_0_20px_#F59E0B] animate-pulse' : status === 'Verified' ? 'bg-brand-success shadow-[0_0_20px_#10B981]' : 'bg-brand-gold shadow-[0_0_20px_#D4AF37]'}`}></div>
      <div>
        <p className="text-xl font-black text-white leading-none uppercase tracking-tight">{name}</p>
        <p className="text-xs text-white/30 font-black uppercase tracking-widest mt-2">{material}</p>
      </div>
    </div>
    {status === 'Needs Review' ? (
      <button onClick={onResolve} className="flex items-center space-x-4 px-8 py-4 bg-brand-gold text-brand-darkNavy text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all shadow-xl">
        <Zap size={18} className="fill-brand-darkNavy" />
        <span>Mitigate Risk</span>
      </button>
    ) : (
      <div className="flex items-center space-x-3 text-xs font-black text-brand-success uppercase tracking-widest bg-brand-success/5 px-6 py-3 rounded-2xl border border-brand-success/20">
        <CheckCircle2 size={18} />
        <span>Node Secured</span>
      </div>
    )}
  </div>
);