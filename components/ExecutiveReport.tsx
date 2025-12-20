
import React from 'react';
import { 
  ArrowLeft, ShieldCheck, TrendingUp, 
  Zap, Globe, Lock, CheckCircle2, Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExecutiveReport: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-darkNavy pt-24 pb-32 px-4 sm:px-6 lg:px-8 selection:bg-brand-gold selection:text-brand-darkNavy">
      {/* Background HUD Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden print:hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.05)_0%,_transparent_60%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between print:hidden">
          <Link to="/analytics" className="inline-flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] hover:text-white transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Analytics Hub</span>
          </Link>
          <div className="flex items-center space-x-4">
             <button onClick={handlePrint} className="flex items-center space-x-3 px-8 py-4 bg-brand-gold text-brand-darkNavy font-black text-[11px] uppercase tracking-[0.25em] rounded-xl hover:bg-white transition-all shadow-2xl shadow-brand-gold/10">
                <Printer size={16} />
                <span>Export Boardroom QPR</span>
             </button>
          </div>
        </div>

        {/* THE REPORT CANVAS */}
        <div className="bg-white text-brand-darkNavy rounded-[2.5rem] shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
          
          <header className="bg-brand-darkNavy text-white p-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full"></div>
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30">
                     <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                     <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Institutional Briefing No. 42-Q4</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
                    Sourcing Intelligence <br />
                    <span className="text-brand-gold">Performance: Q4 2025</span>
                  </h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="w-16 h-16 border-2 border-brand-gold flex items-center justify-center rounded-sm mb-4">
                      <div className="w-8 h-8 bg-brand-gold"></div>
                   </div>
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Classic Homes Marketplace</p>
                </div>
             </div>

             <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">Total Sourcing Vol.</p>
                   <p className="text-3xl font-serif font-bold">$12.4M USD</p>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">Capital Efficiency</p>
                   <p className="text-3xl font-serif font-bold">+18.4%</p>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">Institutional Score</p>
                   <p className="text-3xl font-serif font-bold">AAA-GRADE</p>
                </div>
             </div>
          </header>

          <div className="p-16 space-y-20">
            
            {/* Boardroom Requirements Section */}
            <section className="space-y-10">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
                 <div className="p-4 bg-slate-50 rounded-2xl text-brand-darkNavy"><TrendingUp size={24} /></div>
                 <div>
                    <h2 className="text-2xl font-serif font-bold text-brand-darkNavy">Quarterly Performance Metrics</h2>
                    <p className="text-xs text-brand-mutedGray uppercase tracking-widest font-bold">Verified Operational Output</p>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                 <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.3em] mb-4">Total Spend</p>
                    <p className="text-3xl font-serif font-bold text-brand-darkNavy">$4.52M</p>
                 </div>
                 <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.3em] mb-4">Tokenized Volume</p>
                    <p className="text-3xl font-serif font-bold text-brand-darkNavy">$4.2M</p>
                 </div>
                 <div className="p-8 bg-brand-gold/10 rounded-3xl border border-brand-gold/20">
                    <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-4">Efficiency Gain</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-serif font-bold text-brand-darkNavy">4.2%</p>
                      <Zap size={20} className="text-brand-gold fill-brand-gold" />
                    </div>
                    <p className="text-[8px] font-black text-brand-gold uppercase tracking-widest mt-2">Via AI-Resolved Conflicts</p>
                 </div>
              </div>
            </section>

            <section className="space-y-10">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
                 <div className="p-4 bg-slate-50 rounded-2xl text-brand-darkNavy"><Lock size={24} /></div>
                 <div>
                    <h2 className="text-2xl font-serif font-bold text-brand-darkNavy">Governance & Compliance</h2>
                    <p className="text-xs text-brand-mutedGray uppercase tracking-widest font-bold">Institutional Security Protocol</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="p-10 border border-slate-200 rounded-3xl space-y-6">
                    <div className="flex items-center space-x-4">
                       <Globe size={20} className="text-brand-gold" />
                       <span className="text-[10px] font-black text-brand-darkNavy uppercase tracking-widest">Global Node Sync</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">99.98% of provenance chains verified via sovereign node infrastructure across 1,248 active global nodes.</p>
                 </div>
                 <div className="p-10 border border-slate-200 rounded-3xl space-y-6">
                    <div className="flex items-center space-x-4">
                       <CheckCircle2 size={20} className="text-brand-success" />
                       <span className="text-[10px] font-black text-brand-darkNavy uppercase tracking-widest">Audit Readiness</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">Full SOC2 Type II compliance verified for Q4 data sovereignty and transactional partitioning protocols.</p>
                 </div>
              </div>
            </section>
          </div>

          <footer className="bg-slate-50 px-16 py-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border border-brand-darkNavy/20 flex items-center justify-center rounded-sm">
                   <div className="w-4 h-4 bg-brand-darkNavy"></div>
                </div>
                <span className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.3em]">Classic Homes Marketplace</span>
             </div>
             <p className="text-[10px] font-bold text-brand-mutedGray uppercase tracking-[0.2em] italic">
               Verified Institutional Record CH-QPR-2025-Q4
             </p>
          </footer>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .min-h-screen { padding: 0 !important; margin: 0 !important; background: white !important; }
          .max-w-5xl { max-width: 100% !important; }
          @page { margin: 1cm; }
          .print\:hidden { display: none !important; }
          .rounded-\[2\.5rem\] { border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
};
