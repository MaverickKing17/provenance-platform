
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
      <header className="px-12 py-10 border-b border-white/10 flex items-center justify-between backdrop-blur-3xl sticky top-0 z-50 bg-[#1A1A1A]/90">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 border-2 border-[#D4AF37] flex items-center justify-center rounded-sm">
            <div className="w-6 h-6 bg-[#D4AF37]"></div>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight text-white leading-none">
              Master Executive Command
            </h1>
            <div className="flex items-center space-x-3 mt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Institutional Hub Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-12">
          <div className="text-right">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Sourcing Index</p>
            <p className="text-2xl font-mono font-bold text-white">94.2 <span className="text-brand-success text-sm">↑</span></p>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <Activity size={20} className="text-[#D4AF37]" />
             </div>
             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <Database size={20} className="text-white/40" />
             </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-12 grid grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: 3D DIGITAL TWIN & ESG */}
        <div className="col-span-12 lg:col-span-5 space-y-10">
          
          {/* MODULE 3: DIGITAL TWIN / BIM INTEGRATION */}
          <section className="bg-black/40 border border-white/10 rounded-[2rem] p-10 h-[500px] relative overflow-hidden flex flex-col group shadow-2xl">
            <div className="absolute top-10 left-10 z-10">
               <h3 className="text-lg font-serif font-bold text-white">3D Spatial Intelligence</h3>
               <p className="text-xs text-white/40 mt-1">BIM Integrated Overlay v4.0</p>
            </div>

            <div className="absolute top-10 right-10 z-10 flex flex-col items-end space-y-2">
               <div className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                  Active Zone: <span className="text-[#D4AF37]">{selectedAsset.zone}</span>
               </div>
               <div className="flex items-center space-x-2 text-xs font-bold text-brand-success uppercase tracking-wider">
                  <Globe size={14} />
                  <span>Sync Validated</span>
               </div>
            </div>

            {/* Simulated BIM Canvas */}
            <div className="flex-grow flex items-center justify-center perspective-1000 mt-16">
               <div className="relative w-80 h-80 preserve-3d rotate-x-10 rotate-y--10 transition-transform duration-1000 group-hover:rotate-x-0 group-hover:rotate-y-0">
                  <div className="absolute inset-0 border border-[#D4AF37]/20 bg-[#D4AF37]/5 rounded-2xl translate-z--80"></div>
                  <div className="absolute inset-0 border border-white/10 bg-white/[0.02] rounded-2xl translate-z-0"></div>
                  <div className="absolute inset-0 border border-[#D4AF37]/40 bg-[#D4AF37]/10 rounded-2xl translate-z-50 flex items-center justify-center">
                      <div className="p-6 border border-[#D4AF37] bg-black/80 backdrop-blur-xl rounded-2xl text-center animate-pulse shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                         <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Material Locked</span>
                         <p className="text-sm text-white/90 font-medium mt-2">{selectedAsset.name}</p>
                      </div>
                  </div>
                  <div className="absolute top-1/2 left-[-15%] right-[-15%] h-px bg-white/10"></div>
                  <div className="absolute left-1/2 top-[-15%] bottom-[-15%] w-px bg-white/10"></div>
               </div>
            </div>

            <div className="mt-auto flex items-center justify-between">
               <div className="flex space-x-3">
                  {[1,2,3,4].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-[#D4AF37]' : 'bg-white/20'}`}></div>)}
               </div>
               <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">State: PROVISIONED</span>
            </div>
          </section>

          {/* MODULE 4: ESG & CARBON SCORECARD */}
          <section className="bg-white/5 border border-white/10 rounded-[2rem] p-10 shadow-xl">
            <div className="flex items-center justify-between mb-10">
               <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-gold/10 rounded-xl">
                    <Layers size={22} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white">Sustainability Index</h3>
               </div>
               <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Heritage Rating</span>
            </div>

            <div className="space-y-10">
              {MOCK_ASSETS.map((asset) => (
                <div key={asset.id} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold text-white leading-none">{asset.name}</p>
                      <p className="text-xs text-white/40 mt-1">{asset.location}</p>
                    </div>
                    <span className={`text-2xl font-serif font-bold ${asset.id === selectedAsset.id ? 'text-[#D4AF37]' : 'text-white'}`}>
                      {asset.carbonScore}<span className="text-xs text-white/30 ml-1 font-sans">/100</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D4AF37] transition-all duration-1000 shadow-[0_0_15px_#D4AF37]" 
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
          <section className="bg-white/5 border border-[#D4AF37]/30 rounded-[2rem] p-12 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             
             <div className="flex items-center justify-between mb-12 relative z-10">
                <div className="space-y-2">
                   <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">Risk Mitigation Panel</h3>
                   <p className="text-3xl font-serif font-bold text-white leading-tight">Autonomous Conflict Resolution</p>
                </div>
                <div className="p-5 bg-[#D4AF37]/20 rounded-[1.5rem] border border-[#D4AF37]/20">
                   <Zap size={32} className="text-[#D4AF37]" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 relative z-10">
                <div className="bg-black/60 border border-white/10 p-8 rounded-3xl space-y-6">
                   <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Detection Status</p>
                   <div className="flex items-center space-x-4">
                      <div className="p-2 bg-brand-amber/10 rounded-lg">
                        <Clock className="text-brand-amber w-6 h-6 animate-pulse" />
                      </div>
                      <span className="text-lg font-bold text-white">Supply Hold Detected</span>
                   </div>
                   <p className="text-sm text-white/60 leading-relaxed italic border-l-2 border-[#D4AF37]/30 pl-4">
                      "{selectedAsset.name} shipment from {selectedAsset.location} currently shows a {selectedAsset.leadTime} day lead period extension."
                   </p>
                </div>

                <div className="bg-black/40 border border-white/10 p-8 rounded-3xl flex flex-col justify-center">
                   <button 
                     onClick={startResolution}
                     disabled={isResolving}
                     className="w-full py-6 bg-[#D4AF37] text-[#1A1A1A] font-bold text-sm uppercase tracking-wider rounded-2xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 shadow-2xl disabled:opacity-50"
                   >
                     {isResolving ? <Loader2 className="animate-spin" size={20} /> : <Cpu size={20} />}
                     <span>{isResolving ? 'Resolving Conflict...' : 'AI: Resolve Conflict'}</span>
                   </button>
                </div>
             </div>

             {isResolving && (
               <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-5 pt-8 border-t border-white/10 relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                     <Activity size={14} className="text-[#D4AF37]" />
                     <span className="text-xs font-bold text-white uppercase tracking-wider">Chain of Thought Feed</span>
                  </div>
                  {[0,1,2,3].map(step => (
                    <div key={step} className={`flex items-center space-x-4 transition-all duration-500 ${cotStep >= step ? 'opacity-100 translate-x-2' : 'opacity-20 translate-x-0'}`}>
                       {cotStep > step ? <CheckCircle2 size={16} className="text-brand-success" /> : <div className="w-4 h-4 border-2 border-white/20 rounded-full"></div>}
                       <span className="text-sm font-medium text-white/90">
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
               <div className="animate-in slide-in-from-bottom-8 duration-500 bg-brand-success/10 border border-brand-success/30 p-8 rounded-3xl flex items-center justify-between mt-8 relative z-10 shadow-xl">
                  <div className="flex items-center space-x-5">
                     <div className="p-3 bg-brand-success/20 rounded-xl">
                        <FileCheck size={24} className="text-brand-success" />
                     </div>
                     <div>
                        <p className="text-base font-bold text-white">RFQ Draft Synthesized</p>
                        <p className="text-xs text-white/50 mt-1">Institutional sequence ready for approval.</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => setShowRfq(false)}
                    className="px-8 py-3 bg-brand-success/20 text-brand-success text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-success hover:text-white transition-all shadow-lg"
                  >
                    Review RFQ
                  </button>
               </div>
             )}
          </section>

          {/* MODULE 2: IMMUTABLE LEDGER (WEB3 HOME PASSPORT) */}
          <section className="bg-white/5 border border-white/10 rounded-[2rem] flex flex-col overflow-hidden shadow-2xl">
             <div className="p-10 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
                <div className="flex items-center space-x-4">
                   <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                      <ShieldCheck size={22} className="text-[#D4AF37]" />
                   </div>
                   <h3 className="text-xl font-serif font-bold text-white">Digital Provenance Ledger</h3>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 bg-brand-success/10 border border-brand-success/20 rounded-full text-xs font-bold text-brand-success uppercase tracking-wider">
                   <TrendingUp size={16} />
                   <span>Ledger: 18,294H</span>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                         <th className="px-10 py-6 text-xs font-bold text-white/40 uppercase tracking-widest">Asset Identity</th>
                         <th className="px-10 py-6 text-xs font-bold text-white/40 uppercase tracking-widest">Provenance Status</th>
                         <th className="px-10 py-6 text-xs font-bold text-white/40 uppercase tracking-widest">Chain Record</th>
                         <th className="px-10 py-6"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {MOCK_ASSETS.map((asset) => (
                        <tr 
                          key={asset.id} 
                          onClick={() => setSelectedAsset(asset)}
                          className={`group cursor-pointer transition-all duration-300 ${selectedAsset.id === asset.id ? 'bg-[#D4AF37]/10' : 'hover:bg-white/[0.02]'}`}
                        >
                           <td className="px-10 py-8">
                              <div className="flex flex-col">
                                 <span className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">{asset.name}</span>
                                 <span className="text-xs text-white/40 mt-1 uppercase tracking-wide">{asset.zone}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex items-center space-x-3">
                                 <div className={`w-2.5 h-2.5 rounded-full ${asset.status === 'OPTIMAL' ? 'bg-brand-success shadow-[0_0_10px_#10B981]' : asset.status === 'DELAYED' ? 'bg-brand-amber animate-pulse shadow-[0_0_10px_#F59E0B]' : 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]'}`}></div>
                                 <span className="text-xs font-bold text-white/80 uppercase tracking-wider">{asset.status}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex items-center space-x-3 text-white/40 group-hover:text-[#D4AF37] transition-colors">
                                 <ExternalLink size={14} />
                                 <span className="text-xs font-mono tracking-tight">{asset.txHash}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#1A1A1A] hover:border-[#D4AF37] transition-all shadow-lg">
                                 Mint Certificate
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             <div className="p-8 bg-white/[0.01] border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
                <span>Validated by Polygon Governance Node</span>
                <span className="flex items-center space-x-4">
                   <Box size={14} />
                   <span>Home Passport v2.1</span>
                </span>
             </div>
          </section>
        </div>
      </main>

      {/* FOOTER: GOD MODE PERSISTENCE */}
      <footer className="px-12 py-10 border-t border-white/10 bg-black/60 flex items-center justify-between backdrop-blur-3xl">
         <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-4">
               <MapPin size={18} className="text-[#D4AF37]" />
               <span className="text-xs font-bold text-white/60 uppercase tracking-widest">
                Fleet Monitoring: Carrara {"->"} San Francisco
               </span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex items-center space-x-4">
               <div className="relative flex items-center justify-center">
                  <Activity size={18} className="text-brand-success" />
                  <div className="absolute inset-0 bg-brand-success/20 blur-md rounded-full animate-ping"></div>
               </div>
               <span className="text-xs font-bold text-white uppercase tracking-widest">
                Telemetry Stream Active (Latency: 12ms)
               </span>
            </div>
         </div>
         <button className="flex items-center space-x-4 group bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all shadow-xl">
            <span className="text-xs font-bold text-white/80 group-hover:text-white uppercase tracking-widest transition-colors">Generate Executive Report</span>
            <ArrowRight size={20} className="text-[#D4AF37] group-hover:translate-x-2 transition-transform" />
         </button>
      </footer>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group cursor-pointer ${active ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-[#1A1A1A]' : 'text-white/30 group-hover:text-[#D4AF37]'} transition-colors`}>{icon}</div>
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
  </div>
);
