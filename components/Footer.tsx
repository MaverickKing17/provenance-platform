
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
  HeadphonesIcon
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-darkNavy text-white font-sans border-t border-white/10 relative overflow-hidden">
      
      {/* GLOBAL NODE NETWORK BACKDROP - REFINED FOR CLARITY */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
      </div>

      {/* STRATEGIC CONVERSION HUD */}
      <div className="border-b border-white/5 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-3 px-5 py-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full">
               <Zap size={16} className="text-brand-gold animate-pulse" />
               <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.4em]">Institutional Performance Ready</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
              De-Risk Your <span className="italic text-brand-gold">Supply Chain</span>.
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            <a 
              href="https://apps.classichomesremodeling.com" 
              className="w-full sm:w-auto px-12 py-6 bg-brand-gold text-brand-darkNavy font-black text-sm uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all duration-500 shadow-[0_25px_60px_rgba(212,175,55,0.3)] transform hover:-translate-y-1 text-center"
            >
              Enter Marketplace
            </a>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-12 py-6 bg-white/5 border border-white/20 text-white font-black text-sm uppercase tracking-[0.3em] rounded-xl hover:bg-white/10 transition-all text-center backdrop-blur-3xl"
            >
              Contact Boardroom
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION MATRIX */}
      <div className="max-w-7xl mx-auto px-8 py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 items-start">
          
          {/* COLUMN 1: IDENTITY & TRUST ANCHOR */}
          <div className="lg:col-span-4 space-y-12">
            <Link to="/" className="flex items-center space-x-5 text-white group w-fit">
              <div className="w-14 h-14 border-2 border-brand-gold flex items-center justify-center rounded-sm group-hover:bg-brand-gold transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                 <div className="w-8 h-8 bg-brand-gold group-hover:bg-brand-darkNavy"></div>
              </div>
              <span className="text-4xl font-serif font-bold tracking-tighter uppercase leading-none">Classic Homes</span>
            </Link>
            
            <p className="text-slate-300 text-base font-medium leading-relaxed max-w-sm uppercase tracking-widest opacity-60">
              The Sovereign Architecture for Luxury Procurement and Global Artisan Provenance.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-4">
              <TrustBadge 
                icon={<ShieldCheck className="w-6 h-6 text-brand-success" />} 
                label="Compliance Status" 
                value="SOC2 TYPE II CERTIFIED" 
                color="text-brand-success"
              />
              <TrustBadge 
                icon={<Lock className="w-6 h-6 text-brand-gold" />} 
                label="Data Protocol" 
                value="AES-256 ZERO KNOWLEDGE" 
                color="text-brand-gold"
              />
            </div>
          </div>

          {/* COLUMN 2: CORPORATE GOVERNANCE */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-xs font-black text-brand-gold uppercase tracking-[0.5em] border-b border-white/10 pb-4">Governance</h3>
            <ul className="space-y-6">
              <FooterLink label="Privacy Sovereign" to="/privacy-policy" />
              <FooterLink label="Institutional Terms" to="/terms-of-service" />
              <FooterLink label="Compliance Hub" to="/help" />
              <FooterLink label="Node Health Status" to="/sourcing-hub" />
            </ul>
          </div>

          {/* COLUMN 3: STRATEGIC INTELLIGENCE */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-xs font-black text-brand-gold uppercase tracking-[0.5em] border-b border-white/10 pb-4">Intelligence</h3>
            <ul className="space-y-6">
              <FooterLink label="Blueprint Reports" to="/blog" />
              <FooterLink label="Yield Analytics" to="/case-studies" />
              <FooterLink label="Artisan Topology" to="/network" />
              <FooterLink label="Strategic Partners" to="/partners" />
            </ul>
          </div>

          {/* COLUMN 4: AUTHORIZED CONCIERGE BRIDGE */}
          <div className="lg:col-span-4">
            <div className="bg-brand-gold/5 border border-brand-gold/20 p-10 rounded-[3rem] space-y-10 backdrop-blur-3xl relative group shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-darkNavy border border-brand-gold/40 rounded-xl">
                    <HeadphonesIcon size={24} className="text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-[0.3em]">Authorized Liaison</h3>
               </div>

               <p className="text-sm text-slate-300 font-medium leading-loose italic">
                 "Our dedicated bridge is active for verified High-Value Capital Allocations and Strategic Treasury Cycles."
               </p>

               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-brand-success">
                     <CheckCircle2 size={16} className="animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em]">Concierge Standby Active</span>
                  </div>
                  <button className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)]">
                     Contact Command
                  </button>
               </div>
            </div>
            
            <div className="flex justify-center lg:justify-end space-x-6 mt-12">
              <SocialIcon icon={<Linkedin className="w-6 h-6" />} href="#" />
              <SocialIcon icon={<Twitter className="w-6 h-6" />} href="#" />
              <SocialIcon icon={<Youtube className="w-6 h-6" />} href="#" />
            </div>
          </div>

        </div>
        
        {/* FINAL SYSTEM BAR */}
        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col xl:flex-row justify-between items-center gap-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
               <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} CLASSIC HOMES MARKETPLACE INC.</p>
               <div className="flex items-center space-x-10">
                  <div className="flex items-center space-x-3">
                     <Activity size={14} className="text-brand-success" />
                     <span className="text-[11px] font-black text-brand-success uppercase tracking-[0.3em]">Network Optimized</span>
                  </div>
                  <div className="hidden md:block w-px h-4 bg-white/10"></div>
                  <span className="text-[11px] font-mono font-bold text-white/20 uppercase tracking-widest">Build Node: v2.5.42-STABLE</span>
               </div>
            </div>
            
            <div className="flex items-center space-x-12 opacity-40 hover:opacity-100 transition-opacity">
               <div className="flex items-center space-x-4">
                  <Globe size={16} className="text-brand-gold" />
                  <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Region: GLOBAL-TREASURY-01</span>
               </div>
               <div className="flex items-center space-x-4">
                  <Database size={16} className="text-brand-gold" />
                  <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Silo: US-PROD-S1</span>
               </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

const TrustBadge: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
  <div className="flex items-center space-x-5 bg-white/5 border border-white/10 p-5 rounded-2xl group hover:border-brand-gold/30 transition-all duration-500">
    <div className="p-3 bg-brand-darkNavy rounded-xl border border-white/5 group-hover:border-brand-gold/20 transition-all">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">{label}</span>
      <span className={`text-xs font-black uppercase tracking-widest ${color}`}>{value}</span>
    </div>
  </div>
);

const FooterLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <li>
    <Link to={to} className="group flex items-center space-x-4 text-slate-300 hover:text-brand-gold transition-all duration-300">
      <div className="w-1.5 h-px bg-brand-gold/40 group-hover:w-4 transition-all duration-500"></div>
      <span className="text-[13px] font-bold uppercase tracking-[0.2em]">{label}</span>
    </Link>
  </li>
);

const SocialIcon: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
  <a href={href} className="text-white/20 hover:text-brand-gold hover:scale-110 transition-all duration-300 p-3 bg-white/5 border border-white/10 rounded-xl">
    {icon}
  </a>
);
