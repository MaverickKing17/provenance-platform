
import React, { useState } from 'react';
import { ShieldCheck, Globe, Lock, Search, Scan, Database, Activity, CheckCircle2, Tablet, Cpu, Layers, Fingerprint, ShieldAlert, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-brand-darkNavy pt-24 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{
               backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
               backgroundSize: '60px 60px',
               maskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)'
             }}>
        </div>
        <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-brand-gold/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10 py-16">
        
        {/* Left Content: Executive Summary */}
        <div className="w-full lg:w-2/5 z-10 flex flex-col justify-center space-y-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold"></span>
              </span>
              <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">Verified Workspace Sync Active</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-sans font-black text-white leading-[1.05] tracking-tight">
                The Global <br />
                <span className="text-brand-gold">Marketplace</span><br />
                <span className="text-white/95">for Artisans.</span>
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl text-brand-offWhite/80 max-w-lg font-normal leading-relaxed">
              Consolidate your luxury supply chain into a single, high-fidelity procurement interface. De-risk material sourcing with institutional-grade provenance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6">
            <a href="https://apps.classichomesremodeling.com" className="w-full sm:w-auto px-12 py-5 bg-brand-gold text-brand-darkNavy rounded-lg font-bold text-sm uppercase tracking-[0.2em] hover:bg-brand-goldHover transition-all duration-500 shadow-[0_20px_40px_rgba(212,175,55,0.25)] transform hover:-translate-y-1 text-center">
              Request Executive Access
            </a>
            <button className="w-full sm:w-auto px-12 py-5 border border-white/30 text-white rounded-lg font-bold text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-center">
              View Case Studies
            </button>
          </div>
        </div>

        {/* Right Content: Boardroom Architectural Scene */}
        <div className="w-full lg:w-3/5 relative flex items-center justify-center py-24">
          
          <div className="relative w-full max-w-[800px] perspective-1000">
            <div className="relative transform rotate-x-[15deg] rotate-y-[-5deg] transition-all duration-1000 hover:rotate-x-[12deg] hover:rotate-y-[-2deg] preserve-3d">
              
              {/* Table Surface / Shadow Base */}
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[130%] h-48 bg-black/60 blur-[120px] rounded-full -z-10"></div>
              
              {/* Architectural Model Pedestal */}
              <div className="relative bg-[#111111] rounded-2xl border-b-[20px] border-[#050505] p-2 shadow-[0_60px_120px_rgba(0,0,0,0.9)]">
                 <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 relative overflow-hidden">
                    
                    {/* Pedestal Under-Lighting */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-brand-gold shadow-[0_0_40px_#D4AF37] opacity-60 animate-pulse"></div>

                    {/* MAIN IMAGE CONTAINER */}
                    <div className="relative rounded-lg overflow-hidden aspect-video bg-[#050505]">
                      
                      {/* Image Loading State / Placeholder */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
                         <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center space-y-6">
                            <div className="w-14 h-14 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin"></div>
                            <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.4em] animate-pulse">Initializing Visualization...</span>
                         </div>
                      </div>

                      {/* Fallback Blueprint Pattern (Shows if image fails) */}
                      {imageError && (
                        <div className="absolute inset-0 opacity-40" 
                             style={{
                               backgroundImage: 'linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)',
                               backgroundSize: '20px 20px'
                             }}>
                        </div>
                      )}

                      <img 
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop" 
                        className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-90 contrast-[1.2] grayscale-[0.1]' : 'opacity-0'}`}
                        alt="Ultra-Luxury Modern Villa Rendering"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => {
                          setImageError(true);
                          setImageLoaded(true);
                        }}
                      />
                      
                      {/* Technical Overlays */}
                      <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-60" viewBox="0 0 800 450">
                        <path d="M 320,180 L 150,80 H 50" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="6 4" />
                        <circle cx="320" cy="180" r="5" fill="#D4AF37" className="animate-pulse" />
                        
                        <path d="M 640,240 L 700,120 H 750" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="6 4" />
                        <circle cx="640" cy="240" r="5" fill="#D4AF37" className="animate-pulse" />

                        <path d="M 450,300 L 500,380 H 600" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="6 4" />
                        <circle cx="450" cy="300" r="5" fill="#D4AF37" className="animate-pulse" />
                      </svg>

                      {/* CALLOUT CARDS: ENHANCED LUXURY SAMPLES */}
                      <div className="absolute top-[30px] left-[20px] z-30 animate-in slide-in-from-left duration-1000 group/sample">
                         <div className="flex bg-brand-darkNavy/95 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-hover/sample:scale-105 transition-transform duration-500">
                            <div className="w-20 h-20 rounded-xl overflow-hidden border border-brand-gold/30 shrink-0 shadow-inner">
                               <img 
                                 src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop" 
                                 className="w-full h-full object-cover scale-110 group-hover/sample:scale-125 transition-transform duration-1000"
                                 alt="Carrara Sample"
                               />
                            </div>
                            <div className="pl-5 pr-4 py-2 flex flex-col justify-center">
                               <span className="text-sm font-bold text-white block">Carrara Marble (IT)</span>
                               <span className="text-[10px] text-brand-gold font-bold uppercase tracking-[0.2em] mt-2 block">Verified Provenance</span>
                            </div>
                         </div>
                      </div>

                      <div className="absolute top-[80px] right-[25px] z-30 animate-in slide-in-from-right duration-1000 delay-300 group/sample">
                         <div className="flex flex-row-reverse bg-brand-darkNavy/95 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-hover/sample:scale-105 transition-transform duration-500">
                            <div className="w-20 h-20 rounded-xl overflow-hidden border border-brand-gold/30 shrink-0 shadow-inner">
                               <img 
                                 src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop" 
                                 className="w-full h-full object-cover scale-110 group-hover/sample:scale-125 transition-transform duration-1000"
                                 alt="Teak Sample"
                               />
                            </div>
                            <div className="pr-5 pl-4 py-2 flex flex-col justify-center text-right">
                               <span className="text-sm font-bold text-white block">Sustainable Teak</span>
                               <span className="text-[10px] text-brand-gold font-bold uppercase tracking-[0.2em] mt-2 block">FSC Gold Certified</span>
                            </div>
                         </div>
                      </div>

                      <div className="absolute bottom-8 right-10 z-30">
                         <div className="bg-black/85 border border-white/10 p-6 rounded-2xl backdrop-blur-3xl flex flex-col space-y-4 min-w-[240px] shadow-2xl">
                            <div className="flex justify-between items-center text-[11px] font-bold text-brand-gold uppercase tracking-[0.25em]">
                               <span>Project Assets</span>
                               <span>$12.4M</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-brand-gold w-3/4 shadow-[0_0_15px_#D4AF37]"></div>
                            </div>
                            <div className="flex items-center space-x-3">
                               <CheckCircle2 size={16} className="text-brand-success" />
                               <span className="text-xs font-bold text-white/90 uppercase tracking-widest">Compliance Active</span>
                            </div>
                         </div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* COMMAND TABLET */}
              <div className="absolute -bottom-20 -left-20 z-50 transform -rotate-12 translate-z-[120px] group/tablet transition-all duration-700 hover:-rotate-6 hover:scale-110 hover:translate-z-[160px]">
                 <div className="bg-[#0A1628]/98 border border-brand-gold/40 rounded-[3rem] p-12 w-[400px] shadow-[0_60px_150px_rgba(0,0,0,1)] backdrop-blur-3xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50 animate-[scan_3s_linear_infinite] blur-sm"></div>
                    
                    <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8 relative z-10">
                       <div className="flex items-center space-x-5">
                          <div className="p-3 bg-brand-gold/10 rounded-xl">
                             <ShieldCheck size={26} className="text-brand-gold" />
                          </div>
                          <div>
                             <span className="block text-[11px] font-bold text-brand-gold uppercase tracking-[0.25em] leading-none mb-1.5">Audit Node</span>
                             <span className="block text-sm font-bold text-white uppercase tracking-widest">Institutional Bridge</span>
                          </div>
                       </div>
                       <div className="flex space-x-3">
                          <div className="w-3 h-3 rounded-full bg-brand-success shadow-[0_0_20px_#10B981]"></div>
                       </div>
                    </div>

                    <div className="space-y-10 relative z-10">
                       <div className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5">
                          <div>
                             <span className="block text-[10px] font-bold text-brand-offWhite/30 uppercase tracking-[0.2em] mb-1.5">Material Integrity</span>
                             <span className="text-lg font-bold text-white uppercase tracking-tight">99.8% VERIFIED</span>
                          </div>
                          <Fingerprint size={28} className="text-brand-gold/40" />
                       </div>

                       <button className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_20px_50px_rgba(212,175,55,0.25)] flex items-center justify-center space-x-4 group/btn">
                          <Zap size={20} className="fill-brand-darkNavy group-hover/btn:scale-125 transition-transform" />
                          <span>Finalize Project Audit</span>
                       </button>
                    </div>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FOOTER SYSTEM STATUS BAR */}
      <div className="w-full bg-black/95 border-t border-brand-gold/20 backdrop-blur-3xl py-10 relative z-50">
         <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center space-x-12">
               <div className="flex items-center space-x-5">
                  <div className="w-3.5 h-3.5 rounded-full bg-brand-success shadow-[0_0_25px_#10B981] animate-pulse"></div>
                  <span className="text-base font-bold text-white tracking-normal uppercase">System Ready: Workspace Sync Active</span>
               </div>
               <div className="w-px h-8 bg-white/20 hidden md:block"></div>
               <div className="flex items-center space-x-5">
                  <span className="text-xs font-bold text-white/70 uppercase tracking-[0.15em] whitespace-nowrap">
                    Build Verified
                  </span>
                  <span className="px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-md text-xs font-bold text-brand-gold uppercase tracking-widest shadow-inner">
                    0x71e...trmt/api/v2.5
                  </span>
               </div>
            </div>
            <div className="flex items-center space-x-14 text-sm font-bold text-brand-gold uppercase tracking-wider">
               <span className="flex items-center space-x-4 group cursor-pointer hover:text-white transition-colors">
                  <Cpu size={20} />
                  <span>AI Engine Core</span>
               </span>
               <span className="flex items-center space-x-4 group cursor-pointer hover:text-white transition-colors">
                  <Layers size={20} />
                  <span>Global Hub</span>
               </span>
            </div>
         </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-50px) scaleX(1); opacity: 0; }
          20% { opacity: 0.4; }
          50% { transform: translateY(180px) scaleX(1.2); opacity: 0.6; }
          80% { opacity: 0.4; }
          100% { transform: translateY(350px) scaleX(1); opacity: 0; }
        }
      `}</style>

    </section>
  );
};
