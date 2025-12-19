
import React from 'react';
import { 
  ArrowLeft, Download, ShieldCheck, TrendingUp, 
  Target, Zap, FileText, Globe, Lock, Leaf, 
  BarChart3, CheckCircle2, MapPin, Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExecutiveReport: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-darkNavy pt-24 pb-32 px-4 sm:px-6 lg:px-8 selection:bg-brand-gold selection:text-brand-darkNavy">
      {/* Background HUD Ambience (Visible on Screen, Hidden on Print) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden print:hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.05)_0%,_transparent_60%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Navigation & Controls (Hidden on Print) */}
        <div className="flex items-center justify-between print:hidden">
          <Link to="/analytics" className="inline-flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] hover:text-white transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Analytics Hub</span>
          </Link>
          <div className="flex items-center space-x-4">
             <button onClick={handlePrint} className="flex items-center space-x-3 px-8 py-4 bg-brand-gold text-brand-darkNavy font-black text-[11px] uppercase tracking-[0.25em] rounded-xl hover:bg-white transition-all shadow-2xl shadow-brand-gold/10">
                <Printer size={16} />
                <span>Generate Boardroom PDF</span>
             </button>
          </div>
        </div>

        {/* THE REPORT CANVAS (The A4 PDF Template) */}
        <div id="report-to-pdf" className="bg-white text-brand-darkNavy rounded-[2.5rem] shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
          
          {/* Header & Executive Summary */}
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
                   <p className="text-sm font-bold text-white mt-1">Corporate Headquarters: SF / TOK / LDN</p>
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
            
            {/* Section 2: Capital Optimization */}
            <section className="space-y-10">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
                 <div className="p-4 bg-slate-50 rounded-2xl text-brand-darkNavy"><TrendingUp size={24} /></div>
                 <div>
                    <h2 className="text-2xl font-serif font-bold text-brand-darkNavy">Capital Optimization & Hedging</h2>
                    <p className="text-xs text-brand-mutedGray uppercase tracking-widest font-bold">Financial Sourcing Efficacy</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="space-y-8">
                    <p className="text-lg text-slate-600 leading-relaxed font-sans">
                      During the Q4 market volatility window, our <strong className="text-brand-darkNavy">AI-Prescriptive Hedging</strong> engine successfully navigated the 15% surge in Italian natural stone pricing. 
                    </p>
                    <div className="p-8 bg-brand-gold/5 border-l-4 border-brand-gold rounded-r-2xl space-y-4">
                       <h4 className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.2em]">Realized Optimization</h4>
                       <div className="flex items-end space-x-4">
                          <span className="text-4xl font-serif font-bold text-brand-darkNavy">$1.2M</span>
                          <span className="text-sm font-bold text-brand-success mb-1">TOTAL COST AVOIDANCE</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* Visual Representation of Optimization */}
                 <div className="bg-slate-50 p-10 rounded-[2.5rem] relative overflow-hidden border border-slate-100 shadow-inner">
                    <div className="space-y-6">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Original Projected Spend</span>
                          <span className="text-sm font-bold text-slate-400">$4.52M</span>
                       </div>
                       <div className="h-4 bg-slate-200 rounded-full w-full"></div>
                       
                       <div className="flex justify-between items-end pt-4">
                          <span className="text-[10px] font-black text-brand-darkNavy uppercase tracking-widest">Optimized Realized Spend</span>
                          <span className="text-sm font-bold text-brand-darkNavy">$3.32M</span>
                       </div>
                       <div className="h-8 bg-brand-darkNavy rounded-full w-[73%] flex items-center justify-end px-4 shadow-xl">
                          <Zap size={14} className="text-brand-gold fill-brand-gold" />
                       </div>
                       <p className="text-[9px] text-brand-mutedGray italic text-center pt-4 uppercase tracking-[0.2em] font-black">26.5% Efficiency Gain realized via AI Routing</p>
                    </div>
                 </div>
              </div>
            </section>

            {/* Section 3: Risk Mitigation Ledger */}
            <section className="space-y-10">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
                 <div className="p-4 bg-slate-50 rounded-2xl text-brand-darkNavy"><ShieldCheck size={24} /></div>
                 <div>
                    <h2 className="text-2xl font-serif font-bold text-brand-darkNavy">Risk Mitigation & Interventions</h2>
                    <p className="text-xs text-brand-mutedGray uppercase tracking-widest font-bold">AI Resolve Audit Ledger</p>
                 </div>
              </div>

              <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50"><tr className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest"><th className="px-8 py-5">Identified Project</th><th className="px-8 py-5">Inherent Risk</th><th className="px-8 py-5">Strategic Intervention</th><th className="px-8 py-5 text-right">Margin Saved</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                       <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6 font-bold text-brand-darkNavy">Sterling Residence</td>
                          <td className="px-8 py-6"><span className="text-[10px] font-black text-red-500 uppercase">18-Day Sourcing Delay</span></td>
                          <td className="px-8 py-6 text-sm">Autonomous swap to pre-vetted local artisan node.</td>
                          <td className="px-8 py-6 text-right font-black text-brand-success">4.2%</td>
                       </tr>
                       <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6 font-bold text-brand-darkNavy">Apex Tower</td>
                          <td className="px-8 py-6"><span className="text-[10px] font-black text-brand-amber uppercase">Logistics Log-Jam (Tuscany)</span></td>
                          <td className="px-8 py-6 text-sm">Escrow rerouting to alternative carrier via SEPA bridge.</td>
                          <td className="px-8 py-6 text-right font-black text-brand-success">2.8%</td>
                       </tr>
                       <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6 font-bold text-brand-darkNavy">Hudson Estate</td>
                          <td className="px-8 py-6"><span className="text-[10px] font-black text-blue-500 uppercase">Spec Discrepancy (Marble)</span></td>
                          <td className="px-8 py-6 text-sm">BIM automated verification & on-site correction.</td>
                          <td className="px-8 py-6 text-right font-black text-brand-success">1.5%</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
            </section>

            {/* Section 4: Institutional Governance */}
            <section className="space-y-10">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
                 <div className="p-4 bg-slate-50 rounded-2xl text-brand-darkNavy"><Lock size={24} /></div>
                 <div>
                    <h2 className="text-2xl font-serif font-bold text-brand-darkNavy">Institutional Governance</h2>
                    <p className="text-xs text-brand-mutedGray uppercase tracking-widest font-bold">Polygon Ledger Audit Verification</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="p-8 bg-brand-darkNavy rounded-3xl text-white space-y-4 shadow-xl border border-white/5">
                    <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.3em]">Tokenized Volume</p>
                    <p className="text-3xl font-serif font-bold">$4.2M USD</p>
                    <div className="pt-4 flex items-center space-x-2">
                       <Globe size={14} className="text-brand-gold" />
                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Polygon Sourcing Node</span>
                    </div>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-3xl space-y-4">
                    <p className="text-[9px] font-black text-brand-mutedGray uppercase tracking-[0.3em]">Compliance Rating</p>
                    <p className="text-3xl font-serif font-bold text-brand-darkNavy">100%</p>
                    <div className="pt-4 flex items-center space-x-2">
                       <CheckCircle2 size={14} className="text-brand-success" />
                       <span className="text-[10px] font-bold text-brand-mutedGray uppercase tracking-widest">Audit-Ready Protocol</span>
                    </div>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-3xl space-y-4">
                    <p className="text-[9px] font-black text-brand-mutedGray uppercase tracking-[0.3em]">Data Sovereignty</p>
                    <p className="text-3xl font-serif font-bold text-brand-darkNavy">SECURED</p>
                    <div className="pt-4 flex items-center space-x-2">
                       <ShieldCheck size={14} className="text-brand-gold" />
                       <span className="text-[10px] font-bold text-brand-mutedGray uppercase tracking-widest">SOC2 TYPE II Certified</span>
                    </div>
                 </div>
              </div>
            </section>
          </div>

          {/* Institutional Footer */}
          <footer className="bg-slate-50 px-16 py-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border border-brand-darkNavy/20 flex items-center justify-center rounded-sm">
                   <div className="w-4 h-4 bg-brand-darkNavy"></div>
                </div>
                <span className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.3em]">Classic Homes Marketplace</span>
             </div>
             <p className="text-[10px] font-bold text-brand-mutedGray uppercase tracking-[0.2em] italic">
               Verified by Classic Homes Marketplace – Institutional Grade Sourcing.
             </p>
             <div className="text-[9px] font-mono text-brand-mutedGray">
               REF: CH-QPR-2025-Q4-SENTRY-ACTIVE
             </div>
          </footer>
        </div>

        {/* Post-Report Call to Action (Hidden on Print) */}
        <div className="bg-brand-gold/5 border border-brand-gold/20 p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 print:hidden">
           <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-white">Share Intelligence</h3>
              <p className="text-sm text-brand-offWhite/60">Securely transmit this brief to board members via the immutable portal.</p>
           </div>
           <button className="px-10 py-5 bg-brand-gold text-brand-darkNavy font-black text-[11px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-2xl">
              Dispatch to Board Members
           </button>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .min-h-screen { padding: 0 !important; margin: 0 !important; background: white !important; }
          #report-to-pdf { box-shadow: none !important; margin: 0 !important; width: 100% !important; }
          .max-w-5xl { max-width: 100% !important; }
          @page { margin: 0; }
        }
      `}</style>
    </div>
  );
};
