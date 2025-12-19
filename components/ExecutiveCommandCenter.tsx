
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Box, 
  Activity, 
  Database, 
  Globe, 
  ArrowRight, 
  Cpu, 
  FileCheck, 
  Layers,
  MapPin,
  TrendingUp,
  Loader2,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Institutional Configuration
const BG_CHARCOAL = '#1A1A1A';
const BRAND_GOLD = '#D4AF37';

interface MaterialAsset {
  id: string;
  name: string;
  zone: string;
  status: 'DELAYED' | 'OPTIMAL' | 'VERIFIED';
  leadTime: number;
  carbonScore: number;
  txHash: string;
  location: string;
}

const MOCK_ASSETS: MaterialAsset[] = [
  { 
    id: 'ASSET-001', 
    name: 'Carrara Marble', 
    zone: 'Master Suite - Floor 2', 
    status: 'DELAYED', 
    leadTime: 22, 
    carbonScore: 88, 
    txHash: '0x71c...a92f',
    location: 'Carrara, Italy'
  },
  { 
    id: 'ASSET-002', 
    name: 'Sustainable Teak', 
    zone: 'Executive Terrace', 
    status: 'OPTIMAL', 
    leadTime: 8, 
    carbonScore: 96, 
    txHash: '0x3f2...b10c',
    location: 'Surabaya, Indonesia'
  },
  { 
    id: 'ASSET-003', 
    name: 'Structural Bronze', 
    zone: 'Grand Atrium', 
    status: 'VERIFIED', 
    leadTime: 12, 
    carbonScore: 74, 
    txHash: '0x9a1...e45d',
    location: 'Birmingham, UK'
  }
];

export const ExecutiveCommandCenter: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<MaterialAsset>(MOCK_ASSETS[0]);
  const [isResolving, setIsResolving] = useState(false);
  const [cotStep, setCotStep] = useState(0);
  const [showRfq, setShowRfq] = useState(false);

  // Chain of Thought Logic
  const startResolution = () => {
    setIsResolving(true);
    setCotStep(0);
    const steps = [
      "Analyzing global market volatility index...",
      "Identifying proximal backup suppliers in Xano database...",
      "Evaluating logistic pathing for 15% faster transit...",
      "Generating Request for Quote (RFQ) package..."
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setCotStep(current);
      if (current >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsResolving(false);
          setShowRfq(true);
        }, 1000);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans flex flex-col">
      
      {/* HEADER: COCKPIT STATUS */}
      <header className="px-12 py-8 border-b border-white/5 flex items-center justify-between backdrop-blur-3xl sticky top-0 z-50 bg-[#1A1A1A]/80">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 border-2 border-[#D4AF37] flex items-center justify-center rounded-sm">
            <div className="w-6 h-6 bg-[#D4AF37]"></div>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-tight uppercase">Master Executive Command</h1>
            <div className="flex items-center space-x-3 mt-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Institutional Hub Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-12">
          <div className="text-right">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Global Sourcing Index</p>
            <p className="text-lg font-mono font-bold text-white">94.2 <span className="text-brand-success text-xs">↑</span></p>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <div className="flex items-center space-x-4">
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <Activity size={18} className="text-[#D4AF37]" />
             </div>
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <Database size={18} className="text-white/40" />
             </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-12 grid grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: 3D DIGITAL TWIN & ESG */}
        <div className="col-span-12 lg:col-span-5 space-y-10">
          
          {/* MODULE 3: DIGITAL TWIN / BIM INTEGRATION */}
          <section className="bg-black/40 border border-white/5 rounded-3xl p-8 h-[450px] relative overflow-hidden flex flex-col group">
            <div className="absolute top-8 left-8 z-10">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">3D Spatial View</h3>
               <p className="text-[10px] text-white/40 mt-1">BIM Integrated Overlay v4.0</p>
            </div>

            <div className="absolute top-8 right-8 z-10 flex flex-col items-end space-y-2">
               <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white/60 uppercase tracking-widest">
                  Active Zone: <span className="text-white">{selectedAsset.zone}</span>
               </div>
               <div className="flex items-center space-x-2 text-[10px] font-black text-brand-success uppercase tracking-widest">
                  <Globe size={10} />
                  <span>Sync Validated</span>
               </div>
            </div>

            {/* Simulated BIM Canvas */}
            <div className="flex-grow flex items-center justify-center perspective-1000 mt-10">
               <div className="relative w-80 h-80 preserve-3d rotate-x-10 rotate-y--10 transition-transform duration-1000 group-hover:rotate-x-0 group-hover:rotate-y-0">
                  {/* Wireframe Planes */}
                  <div className="absolute inset-0 border border-[#D4AF37]/20 bg-[#D4AF37]/5 rounded-xl translate-z--80"></div>
                  <div className="absolute inset-0 border border-white/10 bg-white/[0.02] rounded-xl translate-z-0"></div>
                  <div className="absolute inset-0 border border-[#D4AF37]/40 bg-[#D4AF37]/10 rounded-xl translate-z-50 flex items-center justify-center">
                      <div className="p-4 border border-[#D4AF37] bg-black/60 backdrop-blur-md rounded-lg text-center animate-pulse">
                         <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">Material Locked</span>
                         <p className="text-[8px] text-white/60 mt-1">{selectedAsset.name}</p>
                      </div>
                  </div>
                  {/* Decorative Axis Lines */}
                  <div className="absolute top-1/2 left-[-10%] right-[-10%] h-px bg-white/5"></div>
                  <div className="absolute left-1/2 top-[-10%] bottom-[-10%] w-px bg-white/5"></div>
               </div>
            </div>

            <div className="mt-auto flex items-center justify-between">
               <div className="flex space-x-2">
                  {[1,2,3,4].map(i => <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>)}
               </div>
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Spatial-State: Verified</span>
            </div>
          </section>

          {/* MODULE 4: ESG & CARBON SCORECARD */}
          <section className="bg-white/5 border border-white/5 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center space-x-3">
                  <Layers size={18} className="text-[#D4AF37]" />
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Sustainability Index</h3>
               </div>
               <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Green Heritage Rating</span>
            </div>

            <div className="space-y-8">
              {MOCK_ASSETS.map((asset) => (
                <div key={asset.id} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{asset.name}</p>
                      <p className="text-[9px] text-white/20 mt-0.5">{asset.location}</p>
                    </div>
                    <span className={`text-lg font-serif font-bold ${asset.id === selectedAsset.id ? 'text-[#D4AF37]' : 'text-white'}`}>
                      {asset.carbonScore}<span className="text-[10px] text-white/30 ml-1">/100</span>
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D4AF37] transition-all duration-1000 shadow-[0_0_10px_#D4AF37]" 
                      style={{ width: `${asset.carbonScore}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: RESOLVE ENGINE & LEDGER */}
        <div className="col-span-12 lg:col-span-7 space-y-10">
          
          {/* MODULE 1: AGENTIC SOURCING (THE RESOLVE ENGINE) */}
          <section className="bg-white/5 border border-[#D4AF37]/20 rounded-3xl p-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                   <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">Risk Mitigation Panel</h3>
                   <p className="text-2xl font-serif font-bold text-white leading-tight">Autonomous Conflict Resolution</p>
                </div>
                <div className="p-4 bg-[#D4AF37]/10 rounded-2xl">
                   <Zap size={24} className="text-[#D4AF37]" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-4">
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Detection Status</p>
                   <div className="flex items-center space-x-3">
                      <Clock className="text-brand-amber w-5 h-5 animate-pulse" />
                      <span className="text-sm font-bold text-white">Supply Chain Hold Detected</span>
                   </div>
                   <p className="text-[11px] text-white/60 leading-relaxed italic">
                      "{selectedAsset.name} shipment from {selectedAsset.location} currently shows a {selectedAsset.leadTime} day lead period extension."
                   </p>
                </div>

                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
                   <button 
                     onClick={startResolution}
                     disabled={isResolving}
                     className="w-full py-5 bg-[#D4AF37] text-[#1A1A1A] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all flex items-center justify-center space-x-3 shadow-[0_20px_40px_rgba(212,175,55,0.1)] disabled:opacity-50"
                   >
                     {isResolving ? <Loader2 className="animate-spin" size={16} /> : <Cpu size={16} />}
                     <span>{isResolving ? 'Resolving Conflict...' : 'AI: Resolve Conflict'}</span>
                   </button>
                </div>
             </div>

             {/* Chain of Thought UI Overlay */}
             {isResolving && (
               <div className="animate-in fade-in duration-500 space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                     <Activity size={12} className="text-[#D4AF37]" />
                     <span className="text-[9px] font-black text-white uppercase tracking-widest">Chain of Thought Feed</span>
                  </div>
                  {[0,1,2,3].map(step => (
                    <div key={step} className={`flex items-center space-x-3 transition-opacity duration-500 ${cotStep >= step ? 'opacity-100' : 'opacity-20'}`}>
                       {cotStep > step ? <CheckCircle2 size={12} className="text-brand-success" /> : <div className="w-3 h-3 border border-white/20 rounded-full"></div>}
                       <span className="text-[11px] font-medium text-white/80">
                         {step === 0 && "Analyzing global market volatility index..."}
                         {step === 1 && "Identifying proximal backup suppliers in Xano database..."}
                         {step === 2 && "Evaluating logistic pathing for 15% faster transit..."}
                         {step === 3 && "Generating Request for Quote (RFQ) package..."}
                       </span>
                    </div>
                  ))}
               </div>
             )}

             {showRfq && (
               <div className="animate-in slide-in-from-bottom-4 duration-500 bg-brand-success/5 border border-brand-success/20 p-6 rounded-2xl flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-4">
                     <FileCheck size={20} className="text-brand-success" />
                     <div>
                        <p className="text-xs font-bold text-white">RFQ Draft Synthesized</p>
                        <p className="text-[10px] text-white/40">Sent to backup suppliers in Massa, Italy for approval.</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => setShowRfq(false)}
                    className="px-6 py-2 bg-brand-success/20 text-brand-success text-[10px] font-black uppercase tracking-widest rounded hover:bg-brand-success hover:text-white transition-all"
                  >
                    Review RFQ
                  </button>
               </div>
             )}
          </section>

          {/* MODULE 2: IMMUTABLE LEDGER (WEB3 HOME PASSPORT) */}
          <section className="bg-white/5 border border-white/5 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
             <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center space-x-3">
                   <ShieldCheck size={20} className="text-[#D4AF37]" />
                   <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Digital Provenance Ledger</h3>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-brand-success/10 border border-brand-success/20 rounded text-[9px] font-black text-brand-success uppercase tracking-[0.2em]">
                   <TrendingUp size={12} />
                   <span>Ledger Height: 18,294</span>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                         <th className="px-8 py-5 text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Asset Identity</th>
                         <th className="px-8 py-5 text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Provenance Status</th>
                         <th className="px-8 py-5 text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Chain Record</th>
                         <th className="px-8 py-5 text-right"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {MOCK_ASSETS.map((asset) => (
                        <tr 
                          key={asset.id} 
                          onClick={() => setSelectedAsset(asset)}
                          className={`group cursor-pointer transition-all duration-300 ${selectedAsset.id === asset.id ? 'bg-[#D4AF37]/5' : 'hover:bg-white/[0.02]'}`}
                        >
                           <td className="px-8 py-6">
                              <div className="flex flex-col">
                                 <span className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{asset.name}</span>
                                 <span className="text-[9px] text-white/30 uppercase tracking-widest mt-1">{asset.zone}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex items-center space-x-3">
                                 <div className={`w-2 h-2 rounded-full ${asset.status === 'OPTIMAL' ? 'bg-brand-success' : asset.status === 'DELAYED' ? 'bg-brand-amber animate-pulse' : 'bg-[#D4AF37]'}`}></div>
                                 <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{asset.status}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex items-center space-x-2 text-brand-gold/60">
                                 <ExternalLink size={12} />
                                 <span className="text-[10px] font-mono tracking-tighter">{asset.txHash}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#1A1A1A] hover:border-[#D4AF37] transition-all">
                                 Mint Certificate
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             <div className="p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                <span>Validated by Polygon Governance Node</span>
                <span className="flex items-center space-x-3">
                   <Box size={10} />
                   <span>Home Passport v2.1</span>
                </span>
             </div>
          </section>
        </div>
      </main>

      {/* FOOTER: GOD MODE PERSISTENCE */}
      <footer className="px-12 py-8 border-t border-white/5 bg-black/40 flex items-center justify-between">
         <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
               <MapPin size={14} className="text-[#D4AF37]" />
               <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em]">Fleet Monitoring: Carrara -> SF</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex items-center space-x-3 text-brand-success">
               <Activity size={14} />
               <span className="text-[10px] font-black uppercase tracking-[0.25em]">Telemetry Stream Stable</span>
            </div>
         </div>
         <button className="flex items-center space-x-3 group">
            <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-[0.4em] transition-colors">Generate Executive Report</span>
            <ArrowRight size={16} className="text-[#D4AF37] group-hover:translate-x-2 transition-transform" />
         </button>
      </footer>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer ${active ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-[#1A1A1A]' : 'text-white/30 group-hover:text-[#D4AF37]'} transition-colors`}>{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </div>
);
