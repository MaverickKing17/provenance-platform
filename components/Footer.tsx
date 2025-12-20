
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Linkedin, 
  Twitter, 
  Youtube,
  Instagram,
  Globe,
  ArrowUpRight,
  Database,
  Lock,
  Zap,
  CheckCircle2,
  Activity,
  HeadphonesIcon,
  ChevronRight,
  Server
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-darkNavy text-white font-sans border-t border-white/20 relative overflow-hidden">
      
      {/* INSTITUTIONAL GRID BACKDROP */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
      </div>

      {/* EXECUTIVE ACTION HUD */}
      <div className="border-b border-white/10 relative z-10 bg-black/30">
        <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="space-y-8 max-w-3xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-4 px-6 py-2.5 bg-brand-gold/10 border border-brand-gold/40 rounded-full">
               <Zap size={18} className="text-brand-gold animate-pulse" />
               <span className="text-[12px] font-black text-brand-gold uppercase tracking-[0.4em]">Strategic Deployment Ready</span>
            </div>
            <h2 className="text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.1]">
              De-Risk Your <span className="italic text-brand-gold">Material Portfolio</span>.
            </h2>
            <p className="text-2xl text-slate-400 font-medium leading-relaxed">
              Achieve absolute supply chain certainty with institutional-grade provenance and autonomous sourcing logic.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-auto shrink-0">
            <a 
              href="https://apps.classichomesremodeling.com" 
              className="w-full sm:w-auto px-14 py-7 bg-brand-gold text-brand-darkNavy font-black text-sm uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_30px_70px_rgba(212,175,55,0.35)] transform hover:-translate-y-2 text-center"
            >
              Enter Marketplace
            </a>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-14 py-7 bg-white/5 border border-white/20 text-white font-black text-sm uppercase tracking-[0.4em] rounded-2xl hover:bg-white/10 transition-all text-center backdrop-blur-3xl"
            >
              Contact Boardroom
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION & TRUST MATRIX */}
      <div className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 items-start">
          
          {/* COLUMN 1: CORPORATE IDENTITY */}
          <div className="lg:col-span-4 space-y-16">
            <Link to="/" className="flex items-center space-x-6 text-white group w-fit">
              <div className="w-16 h-16 border-2 border-brand-gold flex items-center justify-center rounded-sm group-hover:bg-brand-gold transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                 <div className="w-10 h-10 bg-brand-gold group-hover:bg-brand-darkNavy"></div>
              </div>
              <span className="text-4xl font-serif font-bold tracking-tighter uppercase leading-none">Classic Homes</span>
            </Link>
            
            <p className="text-slate-300 text-lg font-medium leading-loose uppercase tracking-[0.1em] opacity-80 border-l-2 border-brand-gold/30 pl-8">
              The Global Infrastructure for Luxury Procurement and Vetted Artisan Provenance.
            </p>

            <div className="grid grid-cols-1 gap-8">
              <TrustBadge 
                icon={<ShieldCheck className="w-7 h-7 text-brand-success" />} 
                label="Compliance Standard" 
                value="SOC2 TYPE II CERTIFIED" 
                status="Active"
              />
              <TrustBadge 
                icon={<Lock className="w-7 h-7 text-brand-gold" />} 
                label="Security Architecture" 
                value="AES-256 ZERO KNOWLEDGE" 
                status="Verified"
              />
            </div>
          </div>

          {/* COLUMN 2: GOVERNANCE & INTEL */}
          <div className="lg:col-span-2 space-y-12 lg:pl-4">
            <h3 className="text-[14px] font-black text-brand-gold uppercase tracking-[0.6em] border-b border-white/10 pb-6 mb-2">Governance</h3>
            <ul className="space-y-6">
              <FooterLink label="Privacy Protocol" to="/privacy-policy" />
              <FooterLink label="Institutional Terms" to="/terms-of-service" />
              <FooterLink label="Compliance Center" to="/help" />
              <FooterLink label="System Node Health" to="/sourcing-hub" />
            </ul>
          </div>

          {/* COLUMN 3: MARKET INTELLIGENCE */}
          <div className="lg:col-span-2 space-y-12">
            <h3 className="text-[14px] font-black text-brand-gold uppercase tracking-[0.6em] border-b border-white/10 pb-6 mb-2">Intelligence</h3>
            <ul className="space-y-6">
              <FooterLink label="Blueprint Report" to="/blog" />
              <FooterLink label="Yield Analytics" to="/case-studies" />
              <FooterLink label="Artisan Network" to="/network" />
              <FooterLink label="Silo Integration" to="/partners" />
            </ul>
          </div>

          {/* COLUMN 4: AUTHORIZED LIAISON BRIDGE */}
          <div className="lg:col-span-4">
            <div className="bg-brand-gold/10 border-2 border-brand-gold/30 p-12 rounded-[4rem] space-y-12 backdrop-blur-3xl relative group shadow-2xl">
               <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/20 blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="flex items-center space-x-5">
                  <div className="p-4 bg-brand-darkNavy border border-brand-gold/40 rounded-2xl">
                    <HeadphonesIcon size={28} className="text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-[0.4em]">Executive Liaison</h3>
               </div>

               <p className="text-base text-slate-300 font-medium leading-loose italic">
                 "Authorized support bridge active for verified High-Value Capital Allocations and Strategic Treasury Cycles."
               </p>

               <div className="space-y-6">
                  <div className="flex items-center space-x-4 text-brand-success">
                     <CheckCircle2 size={18} className="animate-pulse" />
                     <span className="text-[11px] font-black uppercase tracking-[0.5em]">Global Concierge Active</span>
                  </div>
                  <button className="w-full py-7 bg-brand-gold text-brand-darkNavy font-black text-xs uppercase tracking-[0.5em] rounded-3xl hover:bg-white transition-all shadow-[0_25px_50px_rgba(212,175,55,0.25)] transform hover:scale-[1.02]">
                     Initialize Bridge
                  </button>
               </div>
            </div>
            
            <div className="flex justify-center lg:justify-end space-x-8 mt-16">
              <SocialIcon icon={<Linkedin className="w-7 h-7" />} href="#" />
              <SocialIcon icon={<Twitter className="w-7 h-7" />} href="#" />
              <SocialIcon icon={<Youtube className="w-7 h-7" />} href="#" />
            </div>
          </div>

        </div>
        
        {/* SYSTEM ANALYTICS BAR */}
        <div className="mt-40 pt-16 border-t border-white/10 flex flex-col xl:flex-row justify-between items-center gap-12">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
               <p className="text-[12px] font-black text-white/40 uppercase tracking-[0.5em]">&copy; {new Date().getFullYear()} CLASSIC HOMES MARKETPLACE INC.</p>
               <div className="flex items-center space-x-12">
                  <div className="flex items-center space-x-4">
                     <Activity size={18} className="text-brand-success" />
                     <span className="text-[12px] font-black text-brand-success uppercase tracking-[0.4em]">Network Optimized</span>
                  </div>
                  <div className="hidden md:block w-px h-6 bg-white/20"></div>
                  <div className="flex items-center space-x-3 text-white/30">
                     <Server size={16} />
                     <span className="text-[11px] font-mono font-bold uppercase tracking-widest">Build Node: v2.5.42-S</span>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center space-x-16 opacity-50 hover:opacity-100 transition-opacity">
               <div className="flex items-center space-x-5">
                  <Globe size={18} className="text-brand-gold" />
                  <span className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Node: GLOBAL-TREASURY-01</span>
               </div>
               <div className="flex items-center space-x-5">
                  <Database size={18} className="text-brand-gold" />
                  <span className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Silo: US-PROD-S1</span>
               </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

const TrustBadge: React.FC<{ icon: React.ReactNode; label: string; value: string; status: string }> = ({ icon, label, value, status }) => (
  <div className="flex items-center space-x-6 bg-white/5 border border-white/10 p-7 rounded-3xl group hover:border-brand-gold/40 transition-all duration-500">
    <div className="p-4 bg-brand-darkNavy rounded-2xl border border-white/10 group-hover:border-brand-gold/30 transition-all shadow-xl">
      {icon}
    </div>
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-3">
        <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">{label}</span>
        <span className="text-[9px] font-black text-brand-success uppercase tracking-widest bg-brand-success/10 px-2 py-0.5 rounded">{status}</span>
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-white group-hover:text-brand-gold transition-colors">{value}</span>
    </div>
  </div>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <li>
    <Link 
      to={to} 
      className="group flex items-center space-x-4 text-brand-offWhite hover:text-brand-gold transition-all duration-300 py-1"
    >
      <div className="w-3 h-[2px] bg-brand-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"></div>
      <span className="text-[16px] font-black uppercase tracking-[0.2em]">{label}</span>
    </Link>
  </li>
);

const SocialIcon: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
  <a href={href} className="text-white/30 hover:text-brand-gold hover:scale-110 transition-all duration-300 p-4 bg-white/5 border border-white/10 rounded-2xl">
    {icon}
  </a>
);
