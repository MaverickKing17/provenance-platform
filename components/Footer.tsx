
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Linkedin, 
  Twitter, 
  Youtube,
  Instagram,
  MapPin,
  Phone,
  Globe,
  ArrowUpRight,
  Database,
  Lock,
  Zap,
  CheckCircle2,
  FileText,
  Activity
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-darkNavy text-white font-sans border-t border-white/5 relative overflow-hidden">
      
      {/* GLOBAL NODE NETWORK BACKDROP */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <svg className="w-full h-full text-brand-gold fill-none" viewBox="0 0 1200 400">
           <path d="M100,200 Q300,100 500,250 T900,150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
           <circle cx="100" cy="200" r="4" fill="currentColor" />
           <circle cx="500" cy="250" r="4" fill="currentColor" />
           <circle cx="900" cy="150" r="4" fill="currentColor" />
        </svg>
      </div>

      {/* STRATEGIC ALIGNMENT (PRE-FOOTER) */}
      <div className="border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
               <Zap size={14} className="text-brand-gold animate-pulse" />
               <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">Capital Optimization Ready</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]">
              De-Risk Your <span className="italic text-brand-gold">Global Portfolio</span>.
            </h2>
            <p className="text-xl text-brand-offWhite/40 font-medium leading-relaxed">
              Achieve digital certainty and institutional-grade material provenance with the Classic Homes Intelligence Bridge.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto shrink-0">
            <a 
              href="https://apps.classichomesremodeling.com" 
              className="w-full sm:w-auto px-12 py-6 bg-brand-gold text-brand-darkNavy font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all duration-500 shadow-[0_20px_50px_rgba(212,175,55,0.25)] transform hover:-translate-y-1 text-center"
            >
              Request Boardroom Demo
            </a>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-12 py-6 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-white/10 transition-all text-center backdrop-blur-xl"
            >
              Initialize Liaison
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN INSTITUTIONAL LEDGER */}
      <div className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* COLUMN 1: SOVEREIGN IDENTITY */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="flex items-center space-x-4 text-white group w-fit">
              <div className="w-12 h-12 border-2 border-brand-gold flex items-center justify-center rounded-sm group-hover:bg-brand-gold transition-all duration-500">
                 <div className="w-6 h-6 bg-brand-gold group-hover:bg-brand-darkNavy"></div>
              </div>
              <span className="text-3xl font-serif font-bold tracking-tighter uppercase">Classic Homes</span>
            </Link>
            
            <div className="space-y-6">
               <p className="text-brand-offWhite/30 text-sm font-medium uppercase tracking-[0.2em] leading-loose max-w-[280px]">
                 Enterprise Procurement Integrity and Global Artisan Sourcing Matrix.
               </p>
               
               <div className="flex flex-col space-y-4 pt-4">
                  <div className="flex items-center space-x-4">
                     <div className="p-3 bg-brand-success/10 border border-brand-success/20 rounded-xl">
                        <ShieldCheck className="w-5 h-5 text-brand-success" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Audit Status</span>
                        <span className="text-[11px] font-bold text-brand-success uppercase tracking-widest">SOC2 TYPE II COMPLIANT</span>
                     </div>
                  </div>
                  <div className="flex items-center space-x-4">
                     <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded-xl">
                        <Lock className="w-5 h-5 text-brand-gold" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Data Sovereignty</span>
                        <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest">AES-256 ZERO KNOWLEDGE</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* COLUMN 2: CORPORATE GOVERNANCE */}
          <div className="lg:col-span-2 lg:pl-8 space-y-10">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-40">Governance</h3>
            <ul className="space-y-6">
              <FooterLink label="Privacy Sovereign Protocol" to="/privacy-policy" />
              <FooterLink label="Institutional Service Terms" to="/terms-of-service" />
              <FooterLink label="Regulatory Compliance Hub" to="/help" />
              <FooterLink label="System Node Health" to="/sourcing-hub" />
            </ul>
          </div>

          {/* COLUMN 3: MARKET INTELLIGENCE */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-40">Intelligence</h3>
            <ul className="space-y-6">
              <FooterLink label="The Blueprint Report" to="/blog" />
              <FooterLink label="Capital Yield Studies" to="/case-studies" />
              <FooterLink label="Artisan Network Topology" to="/network" />
              <FooterLink label="Strategic Partner Bridge" to="/partners" />
            </ul>
          </div>

          {/* COLUMN 4: PRIORITY CONCIERGE BRIDGE */}
          <div className="lg:col-span-4 flex flex-col h-full space-y-10">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-40 text-center lg:text-left">Authorized Liaison</h3>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-8 backdrop-blur-xl relative group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="space-y-4">
                  <p className="text-xs text-brand-offWhite/60 font-medium leading-relaxed italic">
                    "Authorized support node active for High-Value Capital Allocations and Treasury Cycles."
                  </p>
                  <div className="flex items-center space-x-3 text-brand-success">
                     <CheckCircle2 size={14} className="animate-pulse" />
                     <span className="text-[9px] font-black uppercase tracking-widest">Global Concierge Standby</span>
                  </div>
               </div>
               <button className="w-full py-5 bg-brand-darkNavy text-white border border-white/10 font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-brand-gold hover:text-brand-darkNavy transition-all shadow-xl group-hover:scale-[1.02]">
                  Contact Boardroom Liaison
               </button>
            </div>
            
            <div className="flex justify-center lg:justify-end space-x-8 pt-4">
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="https://linkedin.com" />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} href="https://twitter.com" />
              <SocialIcon icon={<Youtube className="w-5 h-5" />} href="https://youtube.com" />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} href="https://instagram.com" />
            </div>
          </div>

        </div>
        
        {/* SOVEREIGN LEDGER FOOTER BAR */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
               <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} Classic Homes Marketplace Inc.</p>
               <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                     <Activity size={12} className="text-brand-success" />
                     <span className="text-[9px] font-black text-brand-success uppercase tracking-widest">Network Optimized</span>
                  </div>
                  <div className="w-px h-3 bg-white/10 hidden md:block"></div>
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Build Node: v2.5.42-Stable</span>
               </div>
            </div>
            
            <div className="flex items-center space-x-10">
               <div className="flex items-center space-x-3 opacity-30 hover:opacity-100 transition-opacity cursor-default">
                  <Globe size={14} className="text-brand-gold" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Region: GLOBAL-TREASURY-01</span>
               </div>
               <div className="flex items-center space-x-3 opacity-30 hover:opacity-100 transition-opacity cursor-default">
                  <Database size={14} className="text-brand-gold" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Verified Environment: US-PROD-S1</span>
               </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <li>
    <Link to={to} className="group flex items-center space-x-3 text-brand-offWhite/40 hover:text-brand-gold transition-all duration-300">
      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{label}</span>
    </Link>
  </li>
);

const SocialIcon: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-offWhite/20 hover:text-brand-gold hover:scale-110 transition-all duration-300 p-2 bg-white/[0.03] border border-white/5 rounded-xl">
    {icon}
  </a>
);
