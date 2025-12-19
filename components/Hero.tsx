
import React, { useState } from 'react';
import { ShieldCheck, Globe, Lock, Search, Scan, Database, Activity, CheckCircle2, Tablet, Cpu, Layers } from 'lucide-react';

export const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-brand-darkNavy pt-20 overflow-hidden">
      
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10 py-12">
        
        {/* Left Content: Executive Summary */}
        <div className="w-full lg:w-2/5 z-10 flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Verified Workspace Sync Active</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-semibold text-white leading-[1.1] tracking-tight">
                The Global <br />
                <span className="text-brand-gold italic">Marketplace</span><br />
                <span className="text-white/90">for Artisans.</span>
              </h1>
            </div>
            
            <p className="text-lg sm:text-xl text-brand-offWhite/70 max-w-md font-normal leading-relaxed">
              Consolidate your luxury supply chain into a single, high-fidelity procurement interface. De-risk material sourcing with institutional-grade provenance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-4">
            <a href="https://apps.classichomesremodeling.com" className="w-full sm:w-auto px-10 py-5 bg-brand-gold text-brand-darkNavy rounded-sm font-black text-[11px] uppercase tracking-[0.25em] hover:bg-brand-goldHover transition-all duration-500 shadow-[0_20px_40px_rgba(212,175,55,0.15)] transform hover:-translate-y-1 text-center">
              Request Executive Access
            </a>
            <button className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white rounded-sm font-black text-[11px] uppercase tracking-[0.25em] hover:bg-white/5 transition-all text-center">
              View Case Studies
            </button>
          </div>
        </div>

        {/* Right Content: Boardroom Architectural Scene */}
        <div className="w-full lg:w-3/5 relative flex items-center justify-center py-20">
          
          <div className="relative w-full max-w-[700px] perspective-1000">
            <div className="relative transform rotate-x-[15deg] rotate-y-[-5deg] transition-all duration-1000 hover:rotate-x-[12deg] hover:rotate-y-[-2deg] preserve-3d">
              
              {/* Table Surface / Shadow Base */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-black/60 blur-[100px] rounded-full -z-10"></div>
              
              {/* Architectural Model Pedestal */}
              <div className="relative bg-[#111111] rounded-xl border-b-[16px] border-[#050505] p-1.5 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                 <div className="bg-[#1a1a1a] p-3 rounded-lg border border-white/5 relative overflow-hidden">
                    
                    {/* Pedestal Under-Lighting */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold shadow-[0_0_30px_#D4AF37] opacity-60 animate-pulse"></div>

                    {/* MAIN IMAGE CONTAINER */}
                    <div className="relative rounded-md overflow-hidden aspect-video bg-[#050505]">
                      
                      {/* Image Loading State / Placeholder */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
                         <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin"></div>
                            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] animate-pulse">Initializing Visualization...</span>
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
                        {/* Improved points to match the more complex luxury home image */}
                        <path d="M 320,180 L 150,80 H 50" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="5 3" />
                        <circle cx="320" cy="180" r="4" fill="#D4AF37" className="animate-pulse" />
                        
                        <path d="M 640,240 L 700,120 H 750" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="5 3" />
                        <circle cx="640" cy="240" r="4" fill="#D4AF37" className="animate-pulse" />

                        <path d="M 450,300 L 500,380 H 600" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="5 3" />
                        <circle cx="450" cy="300" r="4" fill="#D4AF37" className="animate-pulse" />
                      </svg>

                      {/* CALLOUT CARDS: ENHANCED LUXURY SAMPLES */}
                      {/* Carrara Marble Callout */}
                      <div className="absolute top-[25px] left-[15px] z-30 animate-in slide-in-from-left duration-1000 group/sample">
                         <div className="flex bg-brand-darkNavy/90 backdrop-blur-2xl border border-white/10 p-2 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover/sample:scale-105 transition-transform duration-500">
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-brand-gold/30 shrink-0 shadow-inner">
                               <img 
                                 src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop" 
                                 className="w-full h-full object-cover scale-110 group-hover/sample:scale-125 transition-transform duration-1000"
                                 alt="Carrara Sample"
                               />
                            </div>
                            <div className="pl-4 pr-3 py-1 flex flex-col justify-center">
                               <span className="text-[11px] font-sans font-bold text-white block">Carrara Marble (IT)</span>
                               <span className="text-[8px] text-brand-gold font-black uppercase tracking-[0.2em] mt-1 block">Verified Provenance</span>
                               <div className="mt-2 flex space-x-1">
                                  {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-brand-gold/30"></div>)}
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Sustainable Teak Callout */}
                      <div className="absolute top-[70px] right-[20px] z-30 animate-in slide-in-from-right duration-1000 delay-300 group/sample">
                         <div className="flex flex-row-reverse bg-brand-darkNavy/90 backdrop-blur-2xl border border-white/10 p-2 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover/sample:scale-105 transition-transform duration-500">
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-brand-gold/30 shrink-0 shadow-inner">
                               <img 
                                 src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop" 
                                 className="w-full h-full object-cover scale-110 group-hover/sample:scale-125 transition-transform duration-1000"
                                 alt="Teak Sample"
                               />
                            </div>
                            <div className="pr-4 pl-3 py-1 flex flex-col justify-center text-right">
                               <span className="text-[11px] font-sans font-bold text-white block">Sustainable Teak</span>
                               <span className="text-[8px] text-brand-gold font-black uppercase tracking-[0.2em] mt-1 block">FSC Gold Certified</span>
                               <div className="mt-2 flex space-x-1 justify-end">
                                  {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-brand-gold/30"></div>)}
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="absolute bottom-6 right-8 z-30">
                         <div className="bg-black/80 border border-white/10 p-5 rounded-2xl backdrop-blur-2xl flex flex-col space-y-3 min-w-[200px] shadow-2xl">
                            <div className="flex justify-between items-center text-[10px] font-black text-brand-gold uppercase tracking-[0.25em]">
                               <span>Project Assets</span>
                               <span>$12.4M</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-brand-gold w-3/4 shadow-[0_0_10px_#D4AF37]"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                               <CheckCircle2 size={14} className="text-brand-success" />
                               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Compliance Active</span>
                            </div>
                         </div>
                      </div>

                      {/* Branding in Corner */}
                      <div className="absolute top-8 right-10 text-right z-30 opacity-60">
                         <div className="text-white font-sans font-bold text-base tracking-tight leading-none uppercase">Classic Homes</div>
                         <div className="text-[9px] font-black text-brand-gold uppercase tracking-[0.4em] mt-1.5">Marketplace</div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* FLOATING COMMAND TABLET */}
              <div className="absolute -bottom-16 -left-16 z-50 transform -rotate-12 translate-z-[80px] group/tablet transition-all duration-700 hover:-rotate-6 hover:scale-105">
                 <div className="bg-[#111827]/95 border border-white/10 rounded-[2rem] p-8 w-[320px] shadow-[0_50px_100px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                       <Tablet size={20} className="text-brand-gold" />
                       <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500/40 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-brand-gold/40 animate-pulse delay-75"></div>
                          <div className="w-2 h-2 rounded-full bg-brand-success shadow-[0_0_10px_#10B981]"></div>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-brand-offWhite/30 uppercase tracking-[0.2em]">Procurement Stream</span>
                          <span className="text-[10px] font-mono text-brand-gold">SECURE_SYNC</span>
                       </div>
                       <div className="space-y-2">
                          <div className="h-1.5 bg-white/5 rounded-full"></div>
                          <div className="h-1.5 bg-white/5 rounded-full w-2/3"></div>
                       </div>
                       <button className="w-full py-4 bg-brand-gold text-brand-darkNavy font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-xl shadow-brand-gold/10">
                          Confirm Project Hash
                       </button>
                    </div>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FOOTER SYSTEM STATUS BAR */}
      <div className="w-full bg-black/80 border-t border-brand-gold/10 backdrop-blur-2xl py-8 relative z-50">
         <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-10">
               <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-success shadow-[0_0_15px_#10B981] animate-pulse"></div>
                  <span className="text-[11px] font-sans text-white font-semibold tracking-[0.3em] uppercase">System Ready: Workspace Sync Active</span>
               </div>
               <div className="w-px h-6 bg-white/10 hidden md:block"></div>
               <span className="text-[11px] font-mono text-brand-offWhite/20 uppercase tracking-[0.25em] truncate max-w-[400px]">
                 Build Verified: 0x71e...trmt/api/v2.5
               </span>
            </div>
            <div className="flex items-center space-x-10 text-[11px] font-black text-brand-gold uppercase tracking-[0.4em]">
               <span className="flex items-center space-x-3 group cursor-pointer hover:text-white transition-colors">
                  <Cpu size={16} />
                  <span>AI Engine Core</span>
               </span>
               <span className="flex items-center space-x-3 group cursor-pointer hover:text-white transition-colors">
                  <Layers size={16} />
                  <span>Global Hub</span>
               </span>
               <div className="w-5 h-5 text-white/10 rotate-45 border-r-2 border-t-2 border-current"></div>
            </div>
         </div>
      </div>

    </section>
  );
};
