
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileUp, 
  PenTool, 
  Award, 
  CheckCircle2, 
  Building2, 
  Fingerprint, 
  Cpu, 
  Lock, 
  Globe, 
  ChevronRight, 
  Loader2, 
  Info,
  X,
  FileText,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRisk } from '../context/RiskContext';

export const SupplierOnboarding: React.FC = () => {
  const { triggerOnboardingNotification } = useRisk();
  const [kyvData, setKyvData] = useState({ companyName: '', taxId: '', category: 'Natural Stone' });
  const [files, setFiles] = useState<File[]>([]);
  const [isSigned, setIsSigned] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVetted, setIsVetted] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'preparing' | 'uploading' | 'complete'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFormComplete = kyvData.companyName.length > 2 && kyvData.taxId.length > 5;
  const isUploadComplete = files.length > 0;
  const isGovernanceComplete = isSigned;

  const canVerify = isFormComplete && isUploadComplete && isGovernanceComplete;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      setUploadStatus('preparing');
      // Simulate IPFS Preparation
      setTimeout(() => setUploadStatus('complete'), 2000);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate Xano backend validation & Trigger Global Onboarding Completion
    setTimeout(() => {
      setIsVerifying(false);
      setIsVetted(true);
      
      // Trigger the "Victory Lap" for the CEO
      triggerOnboardingNotification({
        supplier_name: kyvData.companyName || "Artisan Stone Lab",
        material_category: kyvData.category,
        compliance_score: 98,
        project_relevance: `New Node fills structural marble gap in Sterling Residence (+12% yield).`
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans selection:bg-brand-gold selection:text-brand-darkNavy flex">
      {/* MINIMALIST DARK SIDEBAR */}
      <aside className="w-20 lg:w-72 bg-[#050505] border-r border-white/5 flex flex-col shrink-0 z-20">
        <div className="p-8">
           <Link to="/" className="flex items-center space-x-4">
              <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center rounded-sm">
                <div className="w-5 h-5 bg-brand-gold"></div>
              </div>
              <span className="hidden lg:block text-xl font-serif font-bold tracking-tighter uppercase">Classic Homes</span>
           </Link>
        </div>
        <nav className="flex-grow px-4 mt-8 space-y-4">
           <NavItem icon={<LayoutDashboard size={20} />} label="Sourcing Hub" to="/sourcing-hub" />
           <NavItem icon={<Award size={20} />} label="Compliance Portal" active />
        </nav>
        <div className="p-8 border-t border-white/5 opacity-40">
           <Fingerprint className="text-brand-gold mx-auto lg:mx-0" />
        </div>
      </aside>

      <main className="flex-grow flex flex-col relative overflow-y-auto">
        {/* TOP STATUS BAR */}
        <header className="sticky top-0 z-30 bg-[#0A0A0B]/90 backdrop-blur-3xl border-b border-white/5 px-12 py-8 flex items-center justify-between">
           <div className="space-y-1">
              <h1 className="text-3xl font-serif font-bold tracking-tight">Supplier Onboarding</h1>
              <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Strategic Material Provenance Intake</p>
           </div>

           {/* VETTED BADGE */}
           <div className={`flex items-center space-x-6 px-8 py-4 rounded-2xl border transition-all duration-1000 ${isVetted ? 'bg-brand-gold text-brand-darkNavy border-brand-gold shadow-[0_0_40px_rgba(212,175,55,0.2)]' : 'bg-white/5 border-white/10 text-white/20'}`}>
              <div className="flex flex-col items-end">
                 <span className="text-[10px] font-black uppercase tracking-widest leading-none">Status</span>
                 <span className="text-sm font-black uppercase tracking-[0.2em] mt-1">{isVetted ? 'VETTED' : 'PENDING'}</span>
              </div>
              <Award className={`w-8 h-8 ${isVetted ? 'animate-pulse' : ''}`} />
           </div>
        </header>

        <div className="max-w-6xl mx-auto w-full px-12 py-16 space-y-20 relative z-10">
           
           {/* SECTION 1: KYV FORM */}
           <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center space-x-6 mb-12">
                 <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl border border-brand-gold/30 flex items-center justify-center">
                    <Building2 className="text-brand-gold" size={28} />
                 </div>
                 <div>
                    <h2 className="text-2xl font-serif font-bold tracking-tight">1. Know Your Vendor (KYV)</h2>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-1">Identity & Sourcing Classification</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/[0.02] border border-white/5 p-12 rounded-[3rem] shadow-2xl backdrop-blur-xl">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Company Legal Name</label>
                    <input 
                      type="text" 
                      value={kyvData.companyName}
                      onChange={e => setKyvData({...kyvData, companyName: e.target.value})}
                      placeholder="Artisan Entity Ref..." 
                      className="w-full bg-[#050505] border border-white/10 rounded-2xl px-6 py-5 text-brand-gold font-bold outline-none focus:border-brand-gold/50 shadow-inner"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Tax Identification Number (TIN/VAT)</label>
                    <input 
                      type="text" 
                      value={kyvData.taxId}
                      onChange={e => setKyvData({...kyvData, taxId: e.target.value})}
                      placeholder="Verified Hash..." 
                      className="w-full bg-[#050505] border border-white/10 rounded-2xl px-6 py-5 text-brand-gold font-bold outline-none focus:border-brand-gold/50 shadow-inner font-mono"
                    />
                 </div>
                 <div className="space-y-4 md:col-span-2">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-1">Specialized Material Domain</label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                       {['Natural Stone', 'Structural Metal', 'Sustainable Wood', 'Bespoke Glazing'].map(cat => (
                         <button 
                           key={cat}
                           onClick={() => setKyvData({...kyvData, category: cat})}
                           className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${kyvData.category === cat ? 'bg-brand-gold text-brand-darkNavy border-brand-gold shadow-lg shadow-brand-gold/10' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                         >
                           {cat}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
           </section>

           {/* SECTION 2: PROVENANCE UPLOAD */}
           <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <div className="flex items-center space-x-6 mb-12">
                 <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl border border-brand-gold/30 flex items-center justify-center">
                    <FileUp className="text-brand-gold" size={28} />
                 </div>
                 <div>
                    <h2 className="text-2xl font-serif font-bold tracking-tight">2. Provenance Intake Zone</h2>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-1">4K Spec & Home Passport Preparation</p>
                 </div>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-[3rem] p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-700 group ${uploadStatus === 'complete' ? 'border-brand-success bg-brand-success/5' : 'border-white/10 hover:border-brand-gold/40 hover:bg-white/5'}`}
              >
                 <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                 
                 <div className="mb-8 p-6 bg-brand-gold/5 rounded-full border border-brand-gold/20 group-hover:scale-110 transition-transform">
                    {uploadStatus === 'complete' ? <CheckCircle2 size={48} className="text-brand-success" /> : <FileText size={48} className="text-brand-gold" />}
                 </div>
                 
                 {uploadStatus === 'idle' && (
                   <div className="space-y-4">
                      <h4 className="text-2xl font-serif font-bold text-white italic">Initialize Metadata Stream</h4>
                      <p className="text-xs text-white/30 uppercase tracking-[0.3em]">Upload ISO Certs (PDF) & 4K Material Textures (JPG/RAW)</p>
                   </div>
                 )}

                 {uploadStatus === 'preparing' && (
                   <div className="space-y-6">
                      <Loader2 className="w-12 h-12 text-brand-gold animate-spin mx-auto" />
                      <div className="space-y-2">
                        <p className="text-xs font-black text-brand-gold uppercase tracking-[0.4em] animate-pulse">Hashing to IPFS (Home Passport)...</p>
                        <div className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                           <div className="h-full bg-brand-gold w-3/4 shadow-[0_0_15px_#D4AF37]"></div>
                        </div>
                      </div>
                   </div>
                 )}

                 {uploadStatus === 'complete' && (
                   <div className="space-y-2">
                      <h4 className="text-2xl font-serif font-bold text-brand-success uppercase tracking-tighter">Chain Ready</h4>
                      <p className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">{files.length} ASSETS ENCRYPTED & STAGED</p>
                   </div>
                 )}
              </div>
           </section>

           {/* SECTION 3: GOVERNANCE */}
           <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="flex items-center space-x-6 mb-12">
                 <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl border border-brand-gold/30 flex items-center justify-center">
                    <PenTool className="text-brand-gold" size={28} />
                 </div>
                 <div>
                    <h2 className="text-2xl font-serif font-bold tracking-tight">3. Governance Master Agreement</h2>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-1">Smart Contract Escrow & AI Risk Consent</p>
                 </div>
              </div>

              <div className="bg-[#050505] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                 <div className="p-12 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-gold/20 text-sm text-white/50 leading-loose space-y-6 font-medium">
                    <p className="text-brand-gold uppercase font-black text-[10px] tracking-widest">Master Service Protocol v2025.4</p>
                    <p>
                      This Master Service Agreement ("Agreement") governs the relationship between Classic Homes Marketplace Inc. and the Supplier. 
                      By executing this signature, the Supplier agrees to the automated Smart Contract Escrow settlement logic. 
                      Payments are released only upon verification of material provenance via the Home Passport IPFS node.
                    </p>
                    <p>
                      The Supplier further consents to real-time AI Risk Monitoring. Our predictive engine (A-CORE 2.5) will ingest logistics telemetry, 
                      market volatility data, and node load to ensure institutional-grade delivery certainty. Any anomalies detected will trigger 
                      an immediate capital hold within the treasury perimeter until resolution is verified.
                    </p>
                    <p>
                      Compliance with SOC2 Type II and ESG provenance standards is mandatory. Failure to provide verified chain-of-custody data 
                      will result in node suspension and forfeiture of high-fidelity sourcing priority.
                    </p>
                 </div>
                 
                 <div className="p-12 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                       <button 
                         onClick={() => setIsSigned(!isSigned)}
                         className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${isSigned ? 'bg-brand-gold border-brand-gold text-brand-darkNavy' : 'bg-white/5 border-white/10 text-transparent'}`}
                       >
                          <CheckCircle2 size={20} />
                       </button>
                       <span className="text-xs font-bold text-white/60 uppercase tracking-widest">I Execute this Ledger Agreement</span>
                    </div>

                    <button 
                      disabled={!isSigned}
                      className={`px-12 py-5 rounded-xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center space-x-4 shadow-xl ${isSigned ? 'bg-brand-gold text-brand-darkNavy hover:bg-white scale-105' : 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'}`}
                    >
                       <PenTool size={18} />
                       <span>Finalize Click-to-Sign</span>
                    </button>
                 </div>
              </div>
           </section>

           {/* FINAL ACTION */}
           <section className="pt-20 border-t border-white/5 text-center space-y-12">
              <div className="max-w-2xl mx-auto space-y-4">
                 <h3 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">Perimeter Authorization</h3>
                 <p className="text-sm text-white/40 leading-relaxed uppercase tracking-[0.2em]">
                    Once submitted, our AI Governance Engine will cross-reference your identity against 1,248 global artisan nodes for final verification.
                 </p>
              </div>

              <div className="flex flex-col items-center space-y-8">
                 <button 
                   onClick={handleVerify}
                   disabled={!canVerify || isVerifying || isVetted}
                   className={`relative px-20 py-8 rounded-[2rem] font-black text-sm uppercase tracking-[0.6em] transition-all duration-700 group overflow-hidden ${canVerify && !isVetted ? 'bg-white text-brand-darkNavy hover:bg-brand-gold shadow-[0_40px_100px_rgba(255,255,255,0.1)]' : 'bg-white/5 text-white/10 cursor-not-allowed'}`}
                 >
                    {isVerifying && (
                       <div className="absolute inset-0 bg-brand-darkNavy flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                       </div>
                    )}
                    {isVetted ? (
                      <div className="flex items-center space-x-4 text-brand-success">
                        <CheckCircle2 size={24} />
                        <span>System Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-6">
                        <Zap size={20} className="fill-brand-darkNavy" />
                        <span>Initialize Executive Audit</span>
                      </div>
                    )}
                 </button>

                 {!canVerify && !isVetted && (
                   <div className="flex items-center space-x-4 text-[10px] font-black text-brand-gold/40 uppercase tracking-widest animate-pulse">
                      <Lock size={12} />
                      <span>Authorization Blocked: All Segments Required</span>
                   </div>
                 )}
              </div>
           </section>
        </div>

        {/* INSTITUTIONAL FOOTER */}
        <footer className="mt-auto bg-[#050505] py-12 px-12 border-t border-white/5 opacity-30 flex items-center justify-between">
           <div className="flex items-center space-x-8 text-[10px] font-black text-white uppercase tracking-[0.4em]">
              <span>&copy; 2025 CLASSIC HOMES MARKETPLACE INC.</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span>PROVENANCE PROTOCOL: 0X77B...CC1A</span>
           </div>
           <div className="flex items-center space-x-6 text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">
              <Globe size={14} />
              <span>US-PROD-NODES-01</span>
           </div>
        </footer>
      </main>

      {/* BACKGROUND LUXURY AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.05)_0%,_transparent_60%)]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-gold/5 blur-[150px] rounded-full"></div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link to={to || '#'} className={`flex items-center lg:space-x-5 justify-center lg:justify-start px-5 py-5 rounded-2xl transition-all duration-500 group ${active ? 'bg-brand-gold text-brand-darkNavy shadow-xl shadow-brand-gold/20 scale-[1.05]' : 'text-white/30 hover:bg-white/5 hover:text-white'}`}>
    <div className={`${active ? 'text-brand-darkNavy' : 'text-white/20 group-hover:text-brand-gold'} transition-colors`}>{icon}</div>
    <span className="hidden lg:block text-xs font-black tracking-widest uppercase">{label}</span>
  </Link>
);
