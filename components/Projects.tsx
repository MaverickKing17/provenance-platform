
import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, Layers, ShoppingBag, Box, Wallet, BarChart3, Users, Settings2, 
  FileUp, ShieldCheck, Cpu, CheckCircle2, Globe, TrendingUp, ArrowRight, Zap, 
  Terminal, Activity, Scan, Info, ChevronRight, Lock, Database, Search, 
  Loader2, Sparkles, Fingerprint
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRisk } from '../context/RiskContext';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { tier, color, isDemoMode } = useRisk();
  const [activeProject, setActiveProject] = useState('Sterling Residence');
  const [materialCategory, setMaterialCategory] = useState('Natural Stone');
  const [isScanning, setIsScanning] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateAIScan = () => {
    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          navigate('/materials');
        }, 1200);
      }
    }, 40);
  };

  return (
    <div className="flex h-screen bg-brand-darkNavy overflow-hidden font-sans selection:bg-brand-gold selection:text-brand-darkNavy">
      
      {/* ELITE SIDEBAR */}
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20 shrink-0">
        <div className="p-8">
          <Link to="/" className="flex flex-col space-y-1">
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-brand-gold"></div>
            </div>
            <span className="text-white font-serif font-bold tracking-tight text-lg mt-2 uppercase tracking-tighter">Classic Homes</span>
          </Link>
        </div>
        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/sourcing-hub" />
          <NavItem icon={<Layers size={18} />} label="Projects" active />
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size={18} />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" to="/analytics" />
          <NavItem icon={<Users size={18} />} label="Vetted Suppliers" to="/network" />
          <NavItem icon={<Settings2 size={18} />} label="Settings" to="/settings" />
        </nav>
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" alt="V. Sterling" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest font-black">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* COMMAND VIEWPORT */}
      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none"></div>
        
        {/* INSTITUTIONAL HEADER */}
        <header className="sticky top-0 z-40 bg-brand-darkNavy/80 backdrop-blur-3xl border-b border-white/5 px-12 py-10 shadow-sm overflow-visible">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-serif font-bold text-white tracking-tight leading-none">Intake Authorization</h1>
              <div className="flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-success"></span>
                </span>
                <span>Neural Core Standby</span>
                <span className="w-1 h-1 bg-brand-gold/40 rounded-full"></span>
                <span className="text-brand-offWhite/30">Secure Specification Channel</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
               <div className="hidden lg:flex items-center space-x-6 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Active Procurement Tier</span>
                     <span className="text-sm font-mono font-bold text-white tracking-tighter">EXECUTIVE-S1</span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div className="flex items-center space-x-2">
                     <Lock size={14} className="text-brand-gold" />
                     <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">Encrypted</span>
                  </div>
               </div>
            </div>
          </div>
        </header>

        <div className="px-12 py-16 space-y-12 max-w-[1400px] mx-auto w-full relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* STEP 1: CONTEXT CONFIGURATION */}
            <div className="lg:col-span-4 space-y-8">
               <section className="bg-white/5 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="flex items-center space-x-4 mb-10">
                    <div className="w-10 h-10 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-serif font-bold italic">1</div>
                    <h3 className="text-brand-offWhite font-black uppercase tracking-[0.2em] text-[11px]">Identity & Context</h3>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Asset Reference</label>
                      <div className="relative group/input">
                        <select 
                          value={activeProject}
                          onChange={(e) => setActiveProject(e.target.value)}
                          className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-6 py-5 text-white font-bold outline-none focus:border-brand-gold/50 appearance-none shadow-inner transition-all"
                        >
                          <option>Sterling Residence</option>
                          <option>Apex Tower Penthouse</option>
                          <option>Hudson Estate</option>
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold rotate-90" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Material Domain</label>
                      <div className="relative group/input">
                        <select 
                          value={materialCategory}
                          onChange={(e) => setMaterialCategory(e.target.value)}
                          className="w-full bg-brand-darkNavy border border-white/10 rounded-2xl px-6 py-5 text-white font-bold outline-none focus:border-brand-gold/50 appearance-none shadow-inner transition-all"
                        >
                          <option>Natural Stone</option>
                          <option>Sustainable Hardwoods</option>
                          <option>Structural Metal</option>
                          <option>Strategic Glazing</option>
                        </select>
                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                     <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                        <span className="text-white/20">Market Node Health</span>
                        <span className="text-brand-success">98.2% Optimal</span>
                     </div>
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-success w-[98.2%] shadow-[0_0_10px_#10B981]"></div>
                     </div>
                  </div>
               </section>

               {/* COMPLIANCE HUD */}
               <section className="bg-brand-gold/5 border border-brand-gold/20 rounded-[3rem] p-10 space-y-6 shadow-2xl">
                  <div className="flex items-center space-x-4">
                    <ShieldCheck className="text-brand-gold" size={24} />
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Governance Protocols</span>
                  </div>
                  <div className="space-y-4">
                    <ComplianceRow label="SOC2 Type II Active" />
                    <ComplianceRow label="ESG Provenance Audit Ready" />
                    <ComplianceRow label="Zero-Knowledge Channel" />
                  </div>
               </section>
            </div>

            {/* STEP 2: THE INGESTION APERTURE */}
            <div className="lg:col-span-8">
               <section className="bg-white/5 border border-white/10 rounded-[4rem] p-12 shadow-[0_60px_150px_rgba(0,0,0,0.7)] backdrop-blur-3xl relative h-full flex flex-col overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent opacity-50 animate-pulse"></div>
                  
                  <div className="flex items-center justify-between mb-12 relative z-10">
                    <div className="flex items-center space-x-6">
                      <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/20">
                         <Scan size={28} className="text-brand-gold animate-pulse" />
                      </div>
                      <div>
                         <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">Intelligence Intake</h3>
                         <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mt-1">Spatial Spec Verification Engine</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex-grow relative border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center transition-all duration-700 cursor-pointer overflow-hidden ${
                      isScanning 
                        ? 'border-brand-gold bg-brand-gold/5 shadow-[inset_0_0_100px_rgba(212,175,55,0.1)]' 
                        : 'border-white/10 hover:border-brand-gold/40 hover:bg-white/5'
                    }`}
                  >
                    <input type="file" ref={fileInputRef} className="hidden" onChange={simulateAIScan} />
                    
                    {/* Background Scanning Animation */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                    
                    {isScanning ? (
                      <div className="space-y-12 w-full max-w-lg relative z-10">
                        <div className="relative">
                          <div className="absolute -inset-10 bg-brand-gold/10 blur-[80px] rounded-full animate-pulse-slow"></div>
                          <Cpu className="w-20 h-20 text-brand-gold mx-auto animate-spin" />
                        </div>
                        <div className="space-y-6">
                           <div className="flex justify-between items-end mb-2">
                              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] animate-pulse">Analyzing Logical Geometry...</span>
                              <span className="text-xl font-mono font-black text-white">{uploadProgress}%</span>
                           </div>
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                              <div className="h-full bg-brand-gold shadow-[0_0_25px_#D4AF37] transition-all duration-300 ease-out" style={{ width: `${uploadProgress}%` }}></div>
                           </div>
                        </div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Cross-Referencing Global Artisan Network</p>
                      </div>
                    ) : (
                      <div className="space-y-10 group-hover:scale-105 transition-transform duration-700 relative z-10 p-12">
                        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                           <div className="absolute inset-0 border border-brand-gold/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                           <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                           <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl border border-brand-gold/30 flex items-center justify-center shadow-2xl">
                             <FileUp className="w-10 h-10 text-brand-gold" />
                           </div>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-3xl font-serif font-bold text-white tracking-tight leading-none italic">Secure Aperture Active</h4>
                           <p className="text-xs text-white/40 font-medium uppercase tracking-[0.3em]">Drop PDF, BIM, Revit, or CAD Specifications</p>
                        </div>
                        <button className="px-12 py-5 bg-white text-brand-darkNavy rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-gold transition-all shadow-2xl active:scale-95">
                           Initialize Uplink
                        </button>
                      </div>
                    )}

                    {/* Laser Scan Animation Layer */}
                    {isScanning && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold shadow-[0_0_30px_#D4AF37] animate-[scanning-laser_3s_infinite] opacity-50 z-20"></div>
                    )}
                  </div>

                  <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5 relative z-10">
                     <div className="flex items-center space-x-6 opacity-40">
                        <Globe size={18} className="text-brand-gold" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Verified Region: US-WEST-TREASURY</span>
                     </div>
                     <button 
                       onClick={() => navigate('/materials')}
                       className="group flex items-center space-x-4 px-12 py-6 bg-brand-gold text-brand-darkNavy font-black text-[12px] uppercase tracking-[0.4em] rounded-[2rem] hover:bg-white transition-all shadow-[0_20px_60px_rgba(212,175,55,0.3)] transform hover:-translate-y-1 active:scale-95"
                     >
                        <ShieldCheck size={20} className="fill-brand-darkNavy" />
                        <span>Authorize Sourcing Sequence</span>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                     </button>
                  </div>
               </section>
            </div>
          </div>

          {/* TELEMETRY FOOTER */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <MetricHUD icon={<Activity size={16} />} label="Model Latency" value="12ms" color="text-brand-success" />
             <MetricHUD icon={<Database size={16} />} label="Network Nodes" value="1,248" color="text-brand-gold" />
             <MetricHUD icon={<Zap size={16} />} label="AI Reasoning" value="A-CORE 2.5" color="text-brand-gold" />
             <MetricHUD icon={<Lock size={16} />} label="Data Silo" percentage={100} color="text-brand-success" />
          </div>
        </div>

        {/* SETTLEMENT FOOTER */}
        <div className="mt-auto bg-black/40 py-12 px-12 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
           <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-4">
                 <Lock className="w-4 h-4 text-brand-gold" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Institutional Settlement Bridge Active</span>
              </div>
              <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black text-white uppercase tracking-widest">
                 <Link to="/partners" className="hover:text-brand-gold transition-colors">SWIFT/SEPA HUB</Link>
                 <Link to="/wallet" className="hover:text-brand-gold transition-colors">TREASURY NODE</Link>
                 <Link to="/executive-report" className="hover:text-brand-gold transition-colors">BOARDROOM ACCESS</Link>
              </div>
           </div>
        </div>
      </main>

      <style>{`
        @keyframes scanning-laser {
          0% { transform: translateY(-50px); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(500px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link 
    to={to || '#'} 
    className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-brand-gold text-brand-darkNavy shadow-xl shadow-brand-gold/10' 
        : 'text-brand-offWhite/30 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>
      {icon}
    </div>
    <span className="text-xs font-black uppercase tracking-widest">{label}</span>
  </Link>
);

const ComplianceRow: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center space-x-3 group cursor-default">
    <CheckCircle2 size={14} className="text-brand-success group-hover:scale-125 transition-transform" />
    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>
  </div>
);

const MetricHUD: React.FC<{ icon: React.ReactNode; label: string; value?: string; percentage?: number; color: string }> = ({ icon, label, value, percentage, color }) => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all backdrop-blur-xl">
     <div className="flex items-center space-x-4">
        <div className="text-white/20 group-hover:text-brand-gold transition-colors">{icon}</div>
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{label}</span>
     </div>
     {value ? (
       <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{value}</span>
     ) : (
       <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-brand-success" style={{ width: `${percentage}%` }}></div>
       </div>
     )}
  </div>
);
