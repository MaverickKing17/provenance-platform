
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, ShieldCheck, Box, Activity, Database, Globe, ArrowRight, Cpu, 
  FileCheck, Layers, MapPin, TrendingUp, Loader2, CheckCircle2, 
  Clock, ExternalLink, ChevronRight, Fingerprint, ShieldAlert, 
  Scan, Wallet, Leaf, AlertCircle, Sparkles, Lock
} from 'lucide-react';

// Design Constants
const BRAND_NAVY = '#0F172A';
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
  const [token, setToken] = useState<string>('');
  const [activeProject, setActiveProject] = useState<string>('Sterling Residence');
  const [isResolving, setIsResolving] = useState(false);
  const [cotStep, setCotStep] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [isBimScanning, setIsBimScanning] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [passportMinted, setPassportMinted] = useState(false);

  useEffect(() => {
    setToken(getEnv('NEXT_PUBLIC_ALEX_TOKEN'));
  }, []);

  // KILL SWITCH: Resilience Logic
  if (!token) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-brand-darkNavy p-12 border-2 border-dashed border-red-500/20 rounded-[3rem]">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <ShieldAlert size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Predictive Engine Offline</h2>
          <p className="text-sm text-white/40 leading-relaxed uppercase tracking-widest font-bold">
            Institutional Access Token (ALEX_TOKEN) Missing or Expired. Operational perimeter secured.
          </p>
          <div className="pt-4">
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl">
              Initialize Secure Sync
            </button>
          </div>
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
      "Interrogating Xano procurement node...",
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

  const handleMintPassport = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setPassportMinted(true);
    }, 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      
      {/* HEADER HUD: ESG GAUGE & STATS */}
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-4 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between shadow-2xl backdrop-blur-3xl">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">ESG Score</h4>
            <p className="text-4xl font-serif font-bold text-white">98.4</p>
            <p className="text-[10px] text-brand-success font-bold uppercase tracking-widest">Net Positive Heritage</p>
          </div>
          {/* Minimalist ESG Gauge */}
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" 
                className="text-brand-gold" strokeDasharray="251.2" strokeDashoffset="40" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Leaf size={16} className="text-brand-success" />
              <span className="text-[8px] font-black text-white/40 mt-1">124T CO2e</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-6">
          <HUDStat label="Total Assets Under Mgmt" value="$12.4M" icon={<TrendingUp size={16} />} />
          <HUDStat label="Supply Reliability" value="99.2%" icon={<ShieldCheck size={16} />} />
          <HUDStat label="Active Provenance" value="3,102" icon={<Fingerprint size={16} />} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        
        {/* LEFT: SPATIAL BIM VIEWPORT */}
        <div className="col-span-12 lg:col-span-7 bg-[#050B15] border border-white/5 rounded-[3rem] p-10 h-[600px] relative overflow-hidden group shadow-2xl">
           <div className="absolute top-10 left-10 z-10 space-y-2">
              <div className="flex items-center space-x-3">
                 <Scan size={18} className="text-brand-gold animate-pulse" />
                 <h3 className="text-lg font-serif font-bold text-white uppercase tracking-tight">Spatial BIM Viewport</h3>
              </div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Real-time Telemetry Overlay v2.5</p>
           </div>

           {/* 3D Visualizer Simulation */}
           <div className="absolute inset-0 flex items-center justify-center perspective-1000">
              <div className={`relative w-[450px] h-[300px] preserve-3d transition-all duration-1000 ${isBimScanning ? 'scale-110 rotate-x-12 rotate-y--12' : 'rotate-x-6 rotate-y--6'}`}>
                 <div className="absolute inset-0 border border-brand-gold/20 bg-brand-gold/5 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.1)]"></div>
                 {/* Scanning Laser Line */}
                 {isBimScanning && (
                   <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold shadow-[0_0_20px_#D4AF37] animate-[scan_2s_ease-in-out_infinite] z-20"></div>
                 )}
                 {/* Wireframe Mock */}
                 <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 450 300">
                    <path d="M 50,50 L 400,50 L 420,250 L 30,250 Z" stroke="#D4AF37" strokeWidth="1" fill="none" />
                    <path d="M 50,50 L 50,250 M 400,50 L 400,250" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="5 5" />
                 </svg>
              </div>
           </div>

           {/* Status Overlay */}
           {isBimScanning ? (
             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-black/90 backdrop-blur-2xl border border-brand-gold/50 px-8 py-5 rounded-2xl text-center space-y-2 shadow-2xl">
                   <p className="text-xs font-black text-brand-gold uppercase tracking-[0.3em]">Foundation Verified</p>
                   <p className="text-sm font-bold text-white uppercase tracking-widest">Steel Supply 80% Complete</p>
                </div>
             </div>
           ) : (
             <div className="absolute bottom-12 left-12 flex space-x-6">
                {['Sterling Residence', 'Apex Tower', 'Vanguard Park'].map(name => (
                  <button 
                    key={name}
                    onClick={() => handleBimScan(name)}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeProject === name ? 'bg-brand-gold text-brand-darkNavy' : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'}`}
                  >
                    {name}
                  </button>
                ))}
             </div>
           )}
        </div>

        {/* RIGHT: AGENTIC RESOLVE LEDGER */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
           <section className="bg-white/5 border border-white/10 rounded-[3rem] p-10 shadow-2xl flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-brand-gold/10 rounded-2xl">
                       <Cpu size={22} className="text-brand-gold" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white">Active Procurement Cycles</h3>
                 </div>
                 <div className="flex items-center space-x-2 text-[10px] font-black text-brand-gold uppercase tracking-widest">
                    <Activity size={14} className="animate-pulse" />
                    <span>AI Monitoring On</span>
                 </div>
              </div>

              <div className="flex-grow space-y-4">
                 <ProjectRow 
                   name="Sterling Residence" 
                   material="Statuario Venato" 
                   status="Needs Review" 
                   onResolve={handleAIResolve} 
                 />
                 <ProjectRow name="Apex Tower" material="Structural Bronze" status="Verified" />
                 <ProjectRow name="Hudson Estate" material="Italian Marble" status="Optimal" />
              </div>

              {/* WEB3 HOME PASSPORT SECTION */}
              <div className="mt-10 pt-10 border-t border-white/10">
                 <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center space-x-4">
                          <Wallet size={20} className="text-brand-gold" />
                          <h4 className="text-sm font-black text-white uppercase tracking-widest">Digital Asset Vault</h4>
                       </div>
                       <span className="text-[10px] font-mono text-brand-gold/60">v1.2-Web3</span>
                    </div>

                    {passportMinted ? (
                      <div className="flex items-center space-x-6 animate-in zoom-in-95 duration-500">
                         <div className="p-4 bg-brand-success/10 rounded-2xl border border-brand-success/30">
                            <CheckCircle2 size={32} className="text-brand-success" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-white">Global Provenance Minted</p>
                            <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Hash: 0x82...f91a</p>
                         </div>
                      </div>
                    ) : (
                      <button 
                        onClick={handleMintPassport}
                        disabled={isMinting}
                        className="w-full py-5 bg-brand-gold text-brand-darkNavy font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all flex items-center justify-center space-x-3"
                      >
                        {isMinting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        <span>{isMinting ? 'MINTING PROVENANCE...' : 'MINT GLOBAL PROVENANCE'}</span>
                      </button>
                    )}
                 </div>
              </div>
           </section>
        </div>
      </div>

      {/* RESOLVE THOUGHT PROCESS MODAL */}
      {isResolving && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-darkNavy/90 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-brand-navy border border-brand-gold/30 rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-40 animate-[scan_3s_linear_infinite]"></div>
              
              <div className="flex items-center space-x-6 mb-12">
                 <div className="p-5 bg-brand-gold/10 rounded-[2rem] border border-brand-gold/20">
                    <Zap size={32} className="text-brand-gold" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight">AI Resolve: Thought Process</h3>
                    <p className="text-xs text-brand-gold font-bold uppercase tracking-widest mt-1">Autonomous Sourcing Reasoner v4.0</p>
                 </div>
              </div>

              <div className="space-y-6">
                 {[0,1,2,3].map(step => (
                   <div key={step} className={`flex items-center space-x-6 transition-all duration-700 ${cotStep >= step ? 'opacity-100 translate-x-4' : 'opacity-20 translate-x-0'}`}>
                      {cotStep > step ? <CheckCircle2 size={20} className="text-brand-success" /> : <div className="w-5 h-5 border-2 border-white/20 rounded-full"></div>}
                      <span className="text-base font-medium text-white/90">
                        {step === 0 && "Interrogating Xano procurement node..."}
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

      {/* RECOMMENDED SWAP MODAL */}
      {showSwapModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-brand-darkNavy/90 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="w-full max-w-4xl bg-brand-navy border border-brand-gold/30 rounded-[4rem] p-16 shadow-[0_60px_120px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-12">
                 <h3 className="text-3xl font-serif font-bold text-white tracking-tight">Recommended Strategic Swap</h3>
                 <button onClick={() => setShowSwapModal(false)} className="text-white/20 hover:text-white transition-colors">
                    <AlertCircle size={32} />
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-12 items-center">
                 <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-6 opacity-40">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Current Selection</p>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-serif font-bold text-white">Statuario Venato</h4>
                       <p className="text-sm text-brand-gold font-bold uppercase">Lead: 18 Days (Extended)</p>
                    </div>
                 </div>

                 <div className="relative group">
                    <div className="absolute -inset-1 bg-brand-gold/20 blur-2xl rounded-[3rem] group-hover:bg-brand-gold/30 transition-all"></div>
                    <div className="relative bg-brand-darkNavy border-2 border-brand-gold p-10 rounded-[2.5rem] space-y-6 shadow-2xl">
                       <div className="flex justify-between items-start">
                          <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">AI Recommendation</p>
                          <div className="p-2 bg-brand-gold/20 rounded-lg text-brand-gold"><Sparkles size={16} /></div>
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-2xl font-serif font-bold text-white">Vermont Quartzite</h4>
                          <p className="text-sm text-brand-success font-bold uppercase">Lead: 5 Days (Save 13 Days)</p>
                       </div>
                       <button className="w-full py-5 bg-brand-gold text-brand-darkNavy font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all shadow-xl">
                          Authorize Swap Sequence
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
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(300px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const HUDStat: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col justify-between shadow-xl">
    <div className="flex items-center justify-between text-white/30">
      <span className="text-[9px] font-black uppercase tracking-[0.25em]">{label}</span>
      {icon}
    </div>
    <p className="text-2xl font-serif font-bold text-white mt-4">{value}</p>
  </div>
);

const ProjectRow: React.FC<{ name: string; material: string; status: string; onResolve?: () => void }> = ({ name, material, status, onResolve }) => (
  <div className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-all group">
    <div className="flex items-center space-x-6">
      <div className={`w-3 h-3 rounded-full ${status === 'Needs Review' ? 'bg-brand-amber shadow-[0_0_15px_#F59E0B]' : status === 'Verified' ? 'bg-brand-success shadow-[0_0_15px_#10B981]' : 'bg-brand-gold'}`}></div>
      <div>
        <p className="text-sm font-bold text-white leading-tight">{name}</p>
        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{material}</p>
      </div>
    </div>
    {status === 'Needs Review' ? (
      <button 
        onClick={onResolve}
        className="flex items-center space-x-3 px-6 py-3 bg-brand-gold text-brand-darkNavy text-[9px] font-black uppercase tracking-[0.25em] rounded-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
      >
        <Zap size={14} className="fill-brand-darkNavy" />
        <span>AI Resolve</span>
      </button>
    ) : (
      <div className="flex items-center space-x-2 text-[9px] font-bold text-white/40 uppercase tracking-widest">
        <CheckCircle2 size={14} className="text-brand-success" />
        <span>Validated</span>
      </div>
    )}
  </div>
);
