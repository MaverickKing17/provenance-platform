
import React from 'react';
import { 
  ArrowLeft, ShieldCheck, TrendingUp, 
  Zap, Globe, Lock, CheckCircle2, Printer,
  FileText, Activity, Layers, Scale, Database,
  Fingerprint, Award, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExecutiveReport: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const reportDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[#0A1628] pt-16 pb-32 px-4 sm:px-6 lg:px-8 selection:bg-brand-gold selection:text-brand-darkNavy font-sans">
      {/* Background HUD Ambience (Hidden on Print) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden print:hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.08)_0%,_transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* Navigation & Actions (Hidden on Print) */}
        <div className="flex items-center justify-between print:hidden">
          <Link to="/analytics" className="inline-flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] hover:text-white transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Analytics Hub</span>
          </Link>
          <div className="flex items-center space-x-6">
             <div className="flex items-center space-x-3 text-[10px] font-black text-white/40 uppercase tracking-widest">
                <Lock size={14} className="text-brand-success" />
                <span>Encrypted Session Active</span>
             </div>
             <button 
               onClick={handlePrint} 
               className="flex items-center space-x-3 px-8 py-4 bg-brand-gold text-brand-darkNavy font-black text-[11px] uppercase tracking-[0.25em] rounded-xl hover:bg-white transition-all shadow-2xl shadow-brand-gold/20 active:scale-95"
             >
                <Printer size={16} />
                <span>Export Boardroom Briefing</span>
             </button>
          </div>
        </div>

        {/* THE DOCUMENT CANVAS */}
        <div className="bg-white text-brand-darkNavy shadow-[0_80px_160px_rgba(0,0,0,0.6)] overflow-hidden print:shadow-none print:m-0 print:p-0 relative border border-white/5">
          
          {/* Institutional Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] rotate-[-35deg] text-[120px] font-black uppercase tracking-[0.5em] select-none whitespace-nowrap">
            Classic Homes Classified
          </div>

          {/* DOCUMENT HEADER: Authority & Brand */}
          <header className="bg-brand-darkNavy text-white p-20 relative overflow-hidden border-b-8 border-brand-gold">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="space-y-10 flex-grow">
                  <div className="flex items-center space-x-4">
                     <div className="px-4 py-1 bg-brand-gold text-brand-darkNavy text-[10px] font-black uppercase tracking-[0.4em]">Confidential</div>
                     <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Report Ref: CH-QPR-2025-042-S</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[0.95]">
                      Sourcing Performance <br />
                      <span className="text-brand-gold">Intelligence Briefing</span>
                    </h1>
                    <p className="text-brand-offWhite/40 text-[11px] font-black uppercase tracking-[0.5em] mt-6">Fiscal Quarter Four / Year End 2025</p>
                  </div>

                  <div className="pt-10 flex items-center space-x-12">
                     <div className="space-y-1">
                        <span className="text-[9px] font-black text-brand-gold uppercase tracking-widest opacity-60">Prepared For:</span>
                        <p className="text-sm font-bold uppercase tracking-widest">Executive Boardroom (E-Suite)</p>
                     </div>
                     <div className="w-px h-10 bg-white/10"></div>
                     <div className="space-y-1">
                        <span className="text-[9px] font-black text-brand-gold uppercase tracking-widest opacity-60">Release Date:</span>
                        <p className="text-sm font-bold uppercase tracking-widest">{reportDate}</p>
                     </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end shrink-0">
                   <div className="w-24 h-24 border-2 border-brand-gold flex items-center justify-center rounded-sm mb-6 bg-brand-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                      <div className="w-12 h-12 bg-brand-gold"></div>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xl font-serif font-bold tracking-tighter">Classic Homes</p>
                      <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.3em]">Marketplace Integrity Node</p>
                   </div>
                   
                   {/* Verification Seal */}
                   <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-4">
                      <Fingerprint size={28} className="text-brand-gold/50" />
                      <div className="text-left">
                        <span className="block text-[8px] font-black text-white/30 uppercase tracking-widest">Ledger Proof</span>
                        <span className="block text-[10px] font-mono text-brand-gold font-bold">SHA-256 Verified</span>
                      </div>
                   </div>
                </div>
             </div>
          </header>

          <div className="p-20 space-y-24">
            
            {/* EXECUTIVE SUMMARY: NARRATIVE FOCUS */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4 border-l-4 border-brand-gold pl-10">
                     <h2 className="text-[11px] font-black text-brand-gold uppercase tracking-[0.5em] mb-6">Strategic Delta</h2>
                     <p className="text-2xl font-serif font-bold text-brand-darkNavy leading-snug">
                       Institutional yield improved by <span className="text-brand-success underline decoration-brand-success/30 underline-offset-8">18.4%</span> through AI-matched artisan node realignment and predictive logistics optimization.
                     </p>
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                     <p className="text-lg text-slate-600 leading-relaxed font-normal first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-brand-darkNavy first-letter:mr-3 first-letter:float-left">
                       The Q4 procurement cycle was characterized by extreme market volatility in natural stone sectors. Despite these macro pressures, the Classic Homes marketplace successfully de-risked $12.4M in deployed capital. Our proprietary spatial sourcing engine mitigated 18-day potential delays at the Sterling Residence project, preserving an estimated $240k in holding costs.
                     </p>
                     <p className="text-lg text-slate-600 leading-relaxed font-normal">
                       Supply chain nodes remain 99.98% optimal. Capital efficiency has outperformed the standard industry market index by 12 points, primarily driven by tokenized escrow releases and verified material provenance.
                     </p>
                  </div>
               </div>
            </section>

            {/* HIGH-IMPACT KPIS: DATA MODULES */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <DataModule 
                label="Total Capital Sourced" 
                value="$12.42M" 
                subValue="98.2% Allocation Efficiency" 
                trend="+12.5% vs Q3" 
                icon={<Database size={20} />} 
              />
              <DataModule 
                label="Net Risk Exposure" 
                value="Minimal" 
                subValue="Tier 1 Institutional Shield" 
                trend="Stable" 
                icon={<Scale size={20} />} 
              />
              <DataModule 
                label="Asset Yield Premium" 
                value="+18.4%" 
                subValue="$842k Realized Recovery" 
                trend="Above Index" 
                icon={<TrendingUp size={20} />} 
                highlight 
              />
            </section>

            {/* PERFORMANCE DEPTH: CORE METRICS */}
            <section className="space-y-12">
              <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                 <div className="flex items-center space-x-5">
                    <div className="p-4 bg-slate-50 rounded-2xl text-brand-darkNavy"><Activity size={24} /></div>
                    <div>
                       <h2 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">Core Performance Metrics</h2>
                       <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest font-bold">Verified Operational Output</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-brand-success uppercase tracking-[0.3em] bg-brand-success/5 px-4 py-2 rounded-full border border-brand-success/10 flex items-center space-x-2">
                       <CheckCircle2 size={12} />
                       <span>Audit Complete</span>
                    </span>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-10">
                   <MetricRow label="Sourcing Match Accuracy" percentage={94} icon={<Zap size={16} />} />
                   <MetricRow label="Provenance Chain Integrity" percentage={99} icon={<ShieldCheck size={16} />} />
                   <MetricRow label="ESG Compliance Rating" percentage={98} icon={<Award size={16} />} />
                   <MetricRow label="Logistics Latency Reduction" percentage={82} icon={<Globe size={16} />} />
                </div>
                <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-[3rem] p-12 space-y-8 flex flex-col justify-center">
                   <h4 className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.4em] mb-4 text-center">Quarterly ESG Impact</h4>
                   <div className="flex items-center justify-center py-6">
                      <div className="relative w-48 h-48 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="80" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                            <circle cx="96" cy="96" r="80" stroke="#D4AF37" strokeWidth="12" strokeDasharray="502" strokeDashoffset="10" fill="none" strokeLinecap="round" />
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-serif font-bold">98%</span>
                            <span className="text-[9px] font-black uppercase text-brand-mutedGray tracking-widest">Net Positive</span>
                         </div>
                      </div>
                   </div>
                   <p className="text-center text-xs text-slate-500 font-medium leading-relaxed italic">
                     "Our commitment to sustainable artisan sourcing has generated 124 Tons of verified carbon offsets this period."
                   </p>
                </div>
              </div>
            </section>

            {/* COMPLIANCE & RISK: PERIMETER STATUS */}
            <section className="space-y-12">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-8">
                 <div className="p-4 bg-slate-50 rounded-2xl text-brand-darkNavy"><Lock size={24} /></div>
                 <div>
                    <h2 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">Institutional Governance</h2>
                    <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest font-bold">Compliance Node Security Protocol</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="p-12 border-2 border-slate-100 rounded-[3rem] space-y-8 group hover:border-brand-gold/30 transition-all duration-700 hover:shadow-2xl">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                          <Globe size={24} className="text-brand-gold" />
                          <span className="text-sm font-black text-brand-darkNavy uppercase tracking-widest">Global Node Sync</span>
                       </div>
                       <span className="px-3 py-1 bg-brand-success/10 text-brand-success text-[9px] font-black uppercase tracking-widest rounded">Optimal</span>
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed font-normal">
                      99.98% of provenance chains verified via sovereign node infrastructure across 1,248 active global nodes. Transactional partitioning protocols remain uncompromised.
                    </p>
                    <div className="pt-4 flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] cursor-pointer hover:underline">
                      <span>View Node Topology</span>
                      <ChevronRight size={14} />
                    </div>
                 </div>
                 
                 <div className="p-12 bg-brand-darkNavy text-white rounded-[3rem] space-y-8 shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                          <ShieldCheck size={24} className="text-brand-gold" />
                          <span className="text-sm font-black uppercase tracking-widest">SOC2 TYPE II Audit</span>
                       </div>
                       <span className="px-3 py-1 bg-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded">Validated</span>
                    </div>
                    <p className="text-lg text-brand-offWhite/60 leading-relaxed font-normal">
                      Full institutional compliance verified for Q4 data sovereignty. All capital allocation streams executed under smart-contract governance for multi-million dollar procurement cycles.
                    </p>
                    <div className="pt-4 flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">
                      <span>Download Audit Evidence</span>
                      <ChevronRight size={14} />
                    </div>
                 </div>
              </div>
            </section>
          </div>

          <footer className="bg-slate-50 px-20 py-16 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-12">
             <div className="flex items-center space-x-6">
                <div className="w-12 h-12 border-2 border-brand-darkNavy/20 flex items-center justify-center rounded-sm">
                   <div className="w-6 h-6 bg-brand-darkNavy"></div>
                </div>
                <div className="space-y-1">
                  <span className="block text-xs font-black text-brand-darkNavy uppercase tracking-[0.3em]">Classic Homes Marketplace</span>
                  <span className="block text-[9px] font-bold text-brand-mutedGray uppercase tracking-widest">Institutional Integrity Division</span>
                </div>
             </div>
             
             <div className="flex flex-col items-center md:items-end space-y-2">
                <p className="text-[10px] font-bold text-brand-mutedGray uppercase tracking-[0.2em] italic">
                  Verified Institutional Record CH-QPR-2025-Q4-BOARDROOM
                </p>
                <div className="flex items-center space-x-6">
                   <span className="text-[9px] font-black text-brand-darkNavy/30 uppercase tracking-[0.4em]">Confidential</span>
                   <span className="text-[9px] font-black text-brand-darkNavy/30 uppercase tracking-[0.4em]">Proprietary Metrics</span>
                </div>
             </div>
          </footer>
        </div>
        
        {/* Post-Document Signature (Hidden on Print) */}
        <div className="text-center py-10 print:hidden space-y-4">
           <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">This document is for intended recipients only.</p>
           <div className="flex justify-center space-x-10 text-[9px] font-bold text-brand-gold uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer transition-colors">Request Boardroom Access</span>
              <span className="hover:text-white cursor-pointer transition-colors">Review Master MSA</span>
              <span className="hover:text-white cursor-pointer transition-colors">Global Node Map</span>
           </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .min-h-screen { padding: 0 !important; margin: 0 !important; background: white !important; }
          .max-w-\[1100px\] { max-width: 100% !important; margin: 0 !important; }
          @page { margin: 1cm; size: auto; }
          .print\:hidden { display: none !important; }
          .rounded-\[2\.5rem\], .rounded-\[3rem\], .rounded-\[3\.5rem\], .rounded-\[4rem\] { border-radius: 0 !important; }
          .shadow-\[0_80px_160px_rgba\(0\,0\,0\,0\.6\)\], .shadow-\[0_40px_100px_rgba\(0\,0\,0\,0\.3\)\] { box-shadow: none !important; }
          header { -webkit-print-color-adjust: exact; background-color: #0A1628 !important; color: white !important; }
          .bg-brand-darkNavy { background-color: #0A1628 !important; }
          .text-brand-gold { color: #D4AF37 !important; }
          .bg-brand-gold { background-color: #D4AF37 !important; }
          .bg-slate-50 { background-color: #F8FAFC !important; }
          .border-b-8 { border-bottom-width: 8px !important; }
          * { -webkit-print-color-adjust: exact; }
        }
        @keyframes glint {
          0% { left: -150%; }
          100% { left: 250%; }
        }
      `}</style>
    </div>
  );
};

const DataModule: React.FC<{ label: string; value: string; subValue: string; trend: string; icon: React.ReactNode; highlight?: boolean }> = ({ label, value, subValue, trend, icon, highlight }) => (
  <div className={`p-10 border transition-all duration-500 rounded-[3rem] ${highlight ? 'bg-brand-darkNavy text-white border-brand-darkNavy shadow-2xl scale-105' : 'bg-white text-brand-darkNavy border-slate-100 hover:border-brand-gold/30'}`}>
     <div className="flex items-center justify-between mb-8">
        <div className={`p-4 rounded-2xl ${highlight ? 'bg-white/5 text-brand-gold' : 'bg-slate-50 text-brand-mutedGray'}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${highlight ? 'bg-brand-success/20 text-brand-success' : 'bg-brand-success/5 text-brand-success'}`}>
          {trend}
        </span>
     </div>
     <div className="space-y-2">
        <p className={`text-[10px] font-black uppercase tracking-[0.4em] leading-none mb-4 ${highlight ? 'text-white/40' : 'text-brand-mutedGray'}`}>{label}</p>
        <h3 className="text-5xl font-serif font-bold tracking-tight">{value}</h3>
        <p className={`text-[11px] font-bold uppercase tracking-widest leading-none mt-4 ${highlight ? 'text-brand-gold' : 'text-brand-darkNavy/40'}`}>{subValue}</p>
     </div>
  </div>
);

const MetricRow: React.FC<{ label: string; percentage: number; icon: React.ReactNode }> = ({ label, percentage, icon }) => (
  <div className="space-y-4 group">
     <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
           <div className="text-brand-gold group-hover:rotate-12 transition-transform">{icon}</div>
           <span className="text-xs font-black text-brand-darkNavy uppercase tracking-[0.2em]">{label}</span>
        </div>
        <span className="text-sm font-bold text-brand-darkNavy font-mono">{percentage}%</span>
     </div>
     <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand-darkNavy rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(26,42,68,0.2)]" 
          style={{ width: `${percentage}%` }}
        ></div>
     </div>
  </div>
);
