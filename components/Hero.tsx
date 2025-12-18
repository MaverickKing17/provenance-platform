import React from 'react';
import { ShieldCheck, BarChart3, Globe, Lock, Search, Scan, Database } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-brand-navy pt-20 pb-12 overflow-hidden">
      
      {/* Background Dynamic Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Technical Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
               backgroundSize: '40px 40px',
               maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
             }}>
        </div>

        {/* Rotating Geometric Elements */}
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full border border-brand-gold/5 border-dashed animate-spin" style={{ animationDuration: '120s' }}></div>
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full border border-brand-offWhite/5 animate-spin" style={{ animationDuration: '90s', animationDirection: 'reverse' }}></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full border border-brand-gold/5 border-dotted animate-spin" style={{ animationDuration: '150s' }}></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-navy/80 blur-[100px] rounded-full z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-darkNavy/50 border border-brand-gold/20 backdrop-blur-sm w-fit">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              <span className="text-xs font-medium text-brand-gold uppercase tracking-wider">Enterprise V 2.0 Live</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif text-white leading-[1.1]">
              Verified Provenance. <br />
              <span className="text-brand-offWhite/90">Digital Certainty.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-brand-offWhite/80 max-w-xl font-light leading-relaxed">
              The first AI-driven sourcing platform for enterprise luxury construction. We connect verified global artisans with top-tier contractors through immutable Web3 provenance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <a href="https://apps.classichomesremodeling.com" className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-black rounded-md font-semibold text-base hover:bg-brand-goldHover transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transform hover:-translate-y-0.5 text-center">
              Secure Executive Demo
            </a>
            <div className="flex items-center space-x-4 text-sm text-brand-offWhite/60 px-2">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-brand-gold" />
                SOC2 Type II
              </span>
              <span className="flex items-center">
                <Lock className="w-4 h-4 mr-1.5 text-brand-gold" />
                Web3 Verified
              </span>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="pt-8 border-t border-white/10 mt-8">
            <p className="text-xs text-brand-mutedGray uppercase tracking-widest mb-4 font-medium">Trusted by industry leaders</p>
            <div className="flex flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
               <span className="text-lg font-serif italic font-bold">A&O</span>
               <span className="text-lg font-sans font-black tracking-tighter">BUILD.CORP</span>
               <span className="text-lg font-serif font-medium">LuxeSpace</span>
               <span className="text-lg font-mono font-bold">K/D/A</span>
            </div>
          </div>
        </div>

        {/* Right Visual (Photorealistic 3D Material Showcase) */}
        <div className="w-full lg:w-1/2 relative z-0 mt-12 lg:mt-0 perspective-1000 group/scene">
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] sm:aspect-square md:aspect-[4/3] lg:aspect-square transform rotate-y-[-8deg] rotate-x-[8deg] group-hover/scene:rotate-y-0 group-hover/scene:rotate-x-0 transition-transform duration-1000 ease-out preserve-3d">
                
                {/* Backplate / Atmospheric Glow */}
                <div className="absolute inset-0 bg-brand-gold/15 transform translate-z-[-60px] rounded-2xl blur-[120px] transition-opacity duration-700 opacity-40 group-hover/scene:opacity-70"></div>

                {/* Main Interface Card */}
                <div className="absolute inset-0 bg-brand-darkNavy/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
                    
                    {/* UI Header */}
                    <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
                        <div className="flex items-center space-x-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-success shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse"></div>
                             <span className="text-[10px] font-mono text-brand-offWhite/60 tracking-[0.2em] uppercase">Auth_Session :: Active</span>
                        </div>
                        <div className="flex items-center space-x-4 opacity-40">
                           <Database className="w-4 h-4" />
                           <Search className="w-4 h-4" />
                        </div>
                    </div>

                    {/* High-Fidelity Material Viewport */}
                    <div className="relative flex-grow w-full bg-[#030712] overflow-hidden group/product">
                         {/* Precision Grid */}
                         <div className="absolute inset-0 opacity-10" 
                              style={{
                                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                                  backgroundSize: '20px 20px'
                              }}>
                         </div>
                         
                         {/* Cinematic Lighting Vignette */}
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#030712_100%)] z-10"></div>

                         {/* The Material Sample (Floating 3D Object) */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 transition-all duration-700 transform group-hover/product:scale-105">
                            
                            {/* PHOTOREALISTIC SHADOWS */}
                            {/* Contact Occlusion Shadow (Sharp) */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/90 blur-lg rounded-[100%] transform rotate-12 transition-transform duration-700 group-hover/product:scale-110"></div>
                            {/* Soft Environmental Shadow */}
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/60 blur-[40px] rounded-[100%] transform rotate-12 transition-transform duration-700 opacity-60"></div>

                            {/* Material Slab */}
                            <div className="relative w-full h-full bg-slate-300 rounded-xl overflow-hidden transform rotate-12 group-hover/product:rotate-6 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20">
                                
                                {/* Texture Layer (Marble) */}
                                <div className="absolute inset-0 bg-white">
                                  <img 
                                    src="https://images.unsplash.com/photo-1599557288647-73d8b8e0539f?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Marble Sample"
                                    className="w-full h-full object-cover opacity-95 contrast-[1.2] brightness-[0.95]"
                                  />
                                </div>

                                {/* LIGHTING MODEL LAYERS */}
                                
                                {/* 1. Key Light (Soft directional glow from top-left) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent z-10"></div>
                                
                                {/* 2. Fill Light (Subtle warmth from bottom-right) */}
                                <div className="absolute inset-0 bg-gradient-to-tl from-brand-gold/[0.08] via-transparent to-transparent z-10"></div>

                                {/* 3. Specular Highlight (The 'Shine' that responds to movement) */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-1000 z-20 pointer-events-none transform translate-x-[-50%] group-hover/product:translate-x-[50%] transition-transform"></div>

                                {/* 4. Rim Lighting (Crisp edge highlight) */}
                                <div className="absolute inset-0 border-t-2 border-l-2 border-white/40 z-30 rounded-xl"></div>
                                <div className="absolute inset-0 border-b-2 border-r-2 border-black/20 z-30 rounded-xl"></div>

                                {/* 5. Ambient Occlusion / Inner Shadow */}
                                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] z-40"></div>

                                {/* Procedural Noise/Grain for Realism */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-50" 
                                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                                </div>

                                {/* Technical Marker */}
                                <div className="absolute bottom-4 right-4 z-[60]">
                                  <div className="bg-brand-darkNavy/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-mono text-brand-gold/90 shadow-xl">
                                    LOT_993-A_CERT
                                  </div>
                                </div>
                            </div>
                         </div>

                         {/* AI Scanline Overlay */}
                         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.4)] opacity-0 group-hover/scene:opacity-100 transition-opacity duration-500 animate-[scan_3s_linear_infinite] z-50"></div>
                         
                         {/* AR Viewport Targets */}
                         <div className="absolute top-10 left-10 w-6 h-6 border-l border-t border-brand-gold/40 rounded-tl-sm"></div>
                         <div className="absolute top-10 right-10 w-6 h-6 border-r border-t border-brand-gold/40 rounded-tr-sm"></div>
                         <div className="absolute bottom-10 left-10 w-6 h-6 border-l border-b border-brand-gold/40 rounded-bl-sm"></div>
                         <div className="absolute bottom-10 right-10 w-6 h-6 border-r border-b border-brand-gold/40 rounded-br-sm"></div>
                    </div>

                    {/* Metadata Analytics Footer */}
                    <div className="h-28 bg-white/[0.03] backdrop-blur-3xl border-t border-white/5 p-6 grid grid-cols-3 gap-6">
                        <div className="flex flex-col justify-center border-r border-white/5">
                            <span className="text-[9px] text-brand-offWhite/40 uppercase tracking-[0.25em] mb-1.5 font-black">Provenance</span>
                            <span className="text-sm font-bold text-white tracking-tight">Carrara, IT</span>
                        </div>
                        <div className="flex flex-col justify-center border-r border-white/5">
                            <span className="text-[9px] text-brand-offWhite/40 uppercase tracking-[0.25em] mb-1.5 font-black">Density</span>
                            <span className="text-sm font-bold text-brand-gold tracking-tight">2.71 g/cm³</span>
                        </div>
                         <div className="flex flex-col justify-center">
                            <span className="text-[9px] text-brand-offWhite/40 uppercase tracking-[0.25em] mb-1.5 font-black">Audit</span>
                            <div className="flex items-center space-x-2 text-brand-success">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span className="text-sm font-bold tracking-tight">SECURE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating HUD Elements */}
                 <div className="absolute -right-8 top-1/4 bg-brand-navy border border-brand-gold/30 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transform translate-z-40 animate-pulse-slow hidden lg:flex items-center space-x-4 z-[100]">
                     <div className="bg-brand-gold/10 p-2 rounded-xl">
                         <Scan className="w-5 h-5 text-brand-gold" />
                     </div>
                     <div className="flex flex-col pr-2">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">AI Structural Sync</span>
                         <span className="text-[9px] text-brand-gold font-mono uppercase">99.2% Accuracy</span>
                     </div>
                 </div>

                 <div className="absolute -left-12 bottom-1/3 bg-brand-darkNavy/80 border border-white/10 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transform translate-z-60 hidden lg:flex items-center space-x-4 z-[100]">
                     <div className="bg-blue-500/10 p-2 rounded-xl">
                         <Globe className="w-5 h-5 text-blue-400" />
                     </div>
                     <div className="flex flex-col pr-2">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Logistics Core</span>
                         <span className="text-[9px] text-brand-offWhite/50 font-mono uppercase">Emission Verified</span>
                     </div>
                 </div>
            </div>
          
          {/* Chromatic Aberration / Lens Blur Effect Behind */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)] blur-[120px] rounded-full pointer-events-none opacity-50"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(400%); opacity: 0; }
        }
      `}} />
    </section>
  );
};