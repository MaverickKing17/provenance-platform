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

          {/* Trust Signals (Subtle below hero) */}
          <div className="pt-8 border-t border-white/10 mt-8">
            <p className="text-xs text-brand-mutedGray uppercase tracking-widest mb-4 font-medium">Trusted by industry leaders</p>
            <div className="flex flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholder Logos (Text based for simplicity as per instructions using font styles) */}
               <span className="text-lg font-serif italic font-bold">A&O</span>
               <span className="text-lg font-sans font-black tracking-tighter">BUILD.CORP</span>
               <span className="text-lg font-serif font-medium">LuxeSpace</span>
               <span className="text-lg font-mono font-bold">K/D/A</span>
            </div>
          </div>
        </div>

        {/* Right Visual (3D Product Showcase) */}
        <div className="w-full lg:w-1/2 relative z-0 mt-12 lg:mt-0 perspective-1000 group/scene">
            {/* The Floating Container */}
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] sm:aspect-square md:aspect-[4/3] lg:aspect-square transform rotate-y-[-6deg] rotate-x-[6deg] group-hover/scene:rotate-y-0 group-hover/scene:rotate-x-0 transition-transform duration-1000 ease-out preserve-3d">
                
                {/* Backplate / Glow */}
                <div className="absolute inset-0 bg-brand-gold/10 transform translate-z-[-40px] rounded-2xl blur-3xl transition-opacity duration-500 opacity-60"></div>

                {/* Main Interface Card */}
                <div className="absolute inset-0 bg-brand-darkNavy/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                    
                    {/* UI Header */}
                    <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/5">
                        <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-brand-success shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
                             <span className="text-xs font-mono text-brand-offWhite/70 tracking-widest uppercase">Live_Feed :: Asset_8829</span>
                        </div>
                        <div className="flex items-center space-x-4">
                           <Database className="w-4 h-4 text-brand-offWhite/30" />
                           <Search className="w-4 h-4 text-brand-offWhite/30" />
                        </div>
                    </div>

                    {/* Viewport Area */}
                    <div className="relative flex-grow w-full bg-[#0F172A] overflow-hidden group/product">
                         {/* Background Grid */}
                         <div className="absolute inset-0 opacity-20" 
                              style={{
                                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                                  backgroundSize: '40px 40px'
                              }}>
                         </div>
                         
                         {/* Vignette */}
                         <div className="absolute inset-0 bg-gradient-to-t from-brand-darkNavy via-transparent to-brand-darkNavy/50"></div>

                         {/* The Material Sample (Floating 3D Object simulated) */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 transition-all duration-700 transform group-hover/product:scale-105">
                            
                            {/* Material Slab */}
                            <div className="relative w-full h-full bg-slate-200 rounded-lg shadow-2xl overflow-hidden transform rotate-12 group-hover/product:rotate-6 transition-all duration-700 ease-in-out border-[1px] border-white/20">
                                {/* Texture Image (Marble) */}
                                <div className="absolute inset-0 bg-white">
                                  <img 
                                    src="https://images.unsplash.com/photo-1599557288647-73d8b8e0539f?q=80&w=800&auto=format&fit=crop" 
                                    alt="Marble Sample"
                                    className="w-full h-full object-cover opacity-90 contrast-110"
                                  />
                                </div>
                                
                                {/* Specular Highlight / Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-700 z-10"></div>
                                
                                {/* Inner Shadow */}
                                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] z-20"></div>

                                {/* Label on Sample */}
                                <div className="absolute bottom-4 right-4 z-30">
                                  <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded text-[10px] font-mono text-white/80">
                                    Lot: #993-A
                                  </div>
                                </div>
                            </div>

                            {/* Shadow under the slab */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/60 blur-xl rounded-[100%] transform rotate-12 transition-transform duration-700 group-hover/product:rotate-6 group-hover/product:scale-90"></div>
                         </div>

                         {/* Scanning Effect Overlay */}
                         <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.6)] animate-pulse opacity-0 group-hover/scene:opacity-100 transition-opacity duration-500 top-1/2"></div>
                         
                         {/* AR Markers */}
                         <div className="absolute top-12 left-12 w-8 h-8 border-l-2 border-t-2 border-brand-gold/30 rounded-tl"></div>
                         <div className="absolute top-12 right-12 w-8 h-8 border-r-2 border-t-2 border-brand-gold/30 rounded-tr"></div>
                         <div className="absolute bottom-12 left-12 w-8 h-8 border-l-2 border-b-2 border-brand-gold/30 rounded-bl"></div>
                         <div className="absolute bottom-12 right-12 w-8 h-8 border-r-2 border-b-2 border-brand-gold/30 rounded-br"></div>
                    </div>

                    {/* Footer: Metadata */}
                    <div className="h-24 bg-brand-navy/50 backdrop-blur-md border-t border-white/5 p-5 grid grid-cols-3 gap-px">
                        <div className="flex flex-col justify-center px-4 border-r border-white/5">
                            <span className="text-[10px] text-brand-mutedGray uppercase tracking-wider mb-1">Origin</span>
                            <span className="text-sm font-semibold text-white">Carrara, IT</span>
                        </div>
                        <div className="flex flex-col justify-center px-4 border-r border-white/5">
                            <span className="text-[10px] text-brand-mutedGray uppercase tracking-wider mb-1">Purity</span>
                            <span className="text-sm font-semibold text-brand-gold">99.8% Grade A</span>
                        </div>
                         <div className="flex flex-col justify-center px-4">
                            <span className="text-[10px] text-brand-mutedGray uppercase tracking-wider mb-1">Verification</span>
                            <div className="flex items-center space-x-1 text-brand-success">
                              <ShieldCheck className="w-3 h-3" />
                              <span className="text-sm font-semibold">Passed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating "Smart" Badges */}
                 <div className="absolute -right-6 top-16 bg-brand-navy border border-brand-gold/20 p-3 rounded-lg shadow-xl shadow-black/50 backdrop-blur-xl transform translate-z-10 animate-pulse-slow hidden sm:flex items-center space-x-3 z-50">
                     <div className="bg-brand-gold/10 p-1.5 rounded-md">
                         <Scan className="w-4 h-4 text-brand-gold" />
                     </div>
                     <div className="flex flex-col">
                         <span className="text-xs font-bold text-white tracking-wide">AI Analysis</span>
                         <span className="text-[9px] text-brand-gold font-mono">Structure: Intact</span>
                     </div>
                 </div>

                 <div className="absolute -left-6 bottom-28 bg-brand-navy border border-white/10 p-3 rounded-lg shadow-xl shadow-black/50 backdrop-blur-xl transform translate-z-20 hidden sm:flex items-center space-x-3 z-50">
                     <div className="bg-brand-success/10 p-1.5 rounded-md">
                         <Globe className="w-4 h-4 text-brand-success" />
                     </div>
                     <div className="flex flex-col">
                         <span className="text-xs font-bold text-white tracking-wide">Net Zero</span>
                         <span className="text-[9px] text-brand-mutedGray font-mono">Verified Logistics</span>
                     </div>
                 </div>
            </div>
          
          {/* Decorative Background Elements behind the 3D card */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};