
import React from 'react';
import { SpatialSourcingCommand } from './SpatialSourcingCommand';
import { 
  Activity, 
  Database, 
  Globe, 
  ArrowRight, 
  Cpu, 
  ShieldCheck,
  Settings2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExecutiveCommandCenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans flex flex-col selection:bg-brand-gold selection:text-brand-darkNavy">
      
      {/* HEADER: COCKPIT STATUS */}
      <header className="px-12 py-10 border-b border-white/10 flex items-center justify-between backdrop-blur-3xl sticky top-0 z-50 bg-[#0F172A]/90">
        <div className="flex items-center space-x-6">
          <Link to="/" className="w-12 h-12 border-2 border-brand-gold flex items-center justify-center rounded-sm hover:bg-brand-gold transition-all group">
            <div className="w-6 h-6 bg-brand-gold group-hover:bg-brand-darkNavy"></div>
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight text-white leading-none uppercase tracking-tighter">
              Executive Command Center
            </h1>
            <div className="flex items-center space-x-3 mt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">Institutional Hub Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-12">
          <div className="text-right">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Sourcing Index</p>
            <p className="text-2xl font-mono font-bold text-white tracking-tighter">94.2 <span className="text-brand-success text-sm">↑</span></p>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div className="flex items-center space-x-4">
             <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <Activity size={20} className="text-brand-gold" />
             </button>
             <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
                <Settings2 size={20} className="text-white/40" />
             </button>
          </div>
        </div>
      </header>

      <main className="flex-grow p-12 max-w-[1600px] mx-auto w-full">
         <SpatialSourcingCommand />
      </main>

      {/* FOOTER: GOD MODE PERSISTENCE */}
      <footer className="px-12 py-10 border-t border-white/10 bg-black/80 flex items-center justify-between backdrop-blur-3xl">
         <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-4">
               <Globe size={18} className="text-brand-gold" />
               <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.25em]">
                Verified Provenance Stream Active
               </span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flex items-center space-x-4">
               <ShieldCheck size={18} className="text-brand-success" />
               <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.25em]">
                System Health: Optimal (SOC2-v4)
               </span>
            </div>
         </div>
         <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <span className="text-[11px] font-sans font-bold text-white/70 uppercase tracking-[0.15em]">
                Institutional Reference
              </span>
              <span className="px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-md text-[10px] font-sans font-black text-brand-gold uppercase tracking-widest shadow-inner">
                0x71e...api/v2.5
              </span>
            </div>
            <button className="flex items-center space-x-4 group bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all shadow-xl">
               <span className="text-[10px] font-black text-white/80 group-hover:text-white uppercase tracking-[0.25em] transition-colors">Generate Executive Report</span>
               <ArrowRight size={20} className="text-brand-gold group-hover:translate-x-2 transition-transform" />
            </button>
         </div>
      </footer>
    </div>
  );
};
