import React from 'react';
import { ShieldCheck, BarChart3, Globe, Lock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-brand-navy pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
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
            <button className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-black rounded-md font-semibold text-base hover:bg-brand-goldHover transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transform hover:-translate-y-0.5">
              Secure Executive Demo
            </button>
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

        {/* Right Visual (3D Dashboard Placeholder) */}
        <div className="w-full lg:w-1/2 relative z-0 mt-12 lg:mt-0 perspective-1000">
          <div className="relative w-full aspect-[4/3] rounded-xl bg-brand-darkNavy border border-brand-offWhite/10 shadow-2xl overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out group">
            {/* Dashboard Header */}
            <div className="h-10 border-b border-brand-offWhite/10 bg-brand-navy/50 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            
            {/* Dashboard Content Grid */}
            <div className="p-6 grid grid-cols-12 gap-4 h-full bg-gradient-to-br from-brand-darkNavy to-brand-navy">
              {/* Sidebar */}
              <div className="col-span-3 space-y-3 hidden sm:block">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 rounded bg-brand-offWhite/5 w-full animate-pulse" style={{animationDelay: `${i * 100}ms`}}></div>
                ))}
              </div>
              
              {/* Main Chart Area */}
              <div className="col-span-12 sm:col-span-9 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-6 w-32 bg-brand-offWhite/10 rounded"></div>
                  <div className="h-8 w-24 bg-brand-gold/20 border border-brand-gold/30 rounded text-brand-gold text-xs flex items-center justify-center">Verified</div>
                </div>
                
                {/* Chart Graphic Placeholder */}
                <div className="h-48 w-full bg-brand-offWhite/5 rounded border border-brand-offWhite/5 relative overflow-hidden flex items-end px-4 space-x-2 pb-4">
                   {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-brand-gold/20 to-brand-gold/60 rounded-t" style={{height: `${h}%`}}></div>
                   ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="h-24 rounded bg-brand-offWhite/5 border border-brand-offWhite/5 p-4">
                      <div className="w-8 h-8 rounded bg-brand-gold/20 mb-2 flex items-center justify-center">
                         <Globe className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div className="h-2 w-16 bg-brand-offWhite/20 rounded"></div>
                   </div>
                   <div className="h-24 rounded bg-brand-offWhite/5 border border-brand-offWhite/5 p-4">
                      <div className="w-8 h-8 rounded bg-brand-gold/20 mb-2 flex items-center justify-center">
                         <BarChart3 className="w-4 h-4 text-brand-gold" />
                      </div>
                      <div className="h-2 w-16 bg-brand-offWhite/20 rounded"></div>
                   </div>
                </div>
              </div>
            </div>

            {/* Subtle Overlay Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/5 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};