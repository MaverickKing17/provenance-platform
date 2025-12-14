import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Linkedin, 
  Twitter, 
  Instagram, 
  LayoutGrid, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-darkNavy text-brand-lightGray border-t border-white/5">
      
      {/* Trusted By Section (Above columns) */}
      <div className="border-b border-white/5 bg-brand-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-sm font-semibold text-brand-mutedGray mb-8 uppercase tracking-widest">Trusted by Leading Firms</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Placeholder Logos */}
            {['Architek', 'ConstructOne', 'Velox', 'Empire', 'Struxure', 'OmniPlan'].map((name) => (
              <div key={name} className="h-8 flex items-center justify-center w-full">
                <span className="text-xl font-serif font-bold tracking-tight text-white">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-white">
              <Building2 className="w-6 h-6 stroke-[1.5]" />
              <span className="text-xl font-bold font-serif">Classic Homes</span>
            </div>
            <p className="text-brand-mutedGray text-sm leading-relaxed">
              The premier enterprise sourcing platform for luxury construction. We connect verified global artisans with top-tier contractors through AI-driven matching and immutable Web3 provenance.
            </p>
            
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 group cursor-help">
                <ShieldCheck className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium border-b border-dashed border-brand-mutedGray/50 hover:border-brand-gold transition-colors">SOC2 Type II Compliant</span>
              </div>
              <div className="flex items-center space-x-2 group cursor-help">
                <Cpu className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium border-b border-dashed border-brand-mutedGray/50 hover:border-brand-gold transition-colors">AI Bias-Free Vetting</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-success/10 border border-brand-success/20">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
                </span>
                <span className="text-xs font-semibold text-brand-success tracking-wide">System Operational</span>
              </div>
            </div>
          </div>

          {/* Column 2: Trust & Compliance */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Lock className="w-5 h-5 text-brand-mutedGray" />
              <h3 className="text-white font-semibold tracking-wide">Trust & Compliance</h3>
            </div>
            <ul className="space-y-4">
              {[
                { label: 'Terms of Service', href: '/terms-of-service' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Security Policy', href: '/security-policy' },
                { label: 'AI Ethics Statement', href: '/ai-ethics', badge: 'Essential', badgeColor: 'text-brand-amber border-brand-amber/30 bg-brand-amber/10' },
                { label: 'Web3 Provenance Policy', href: '/web3-provenance' },
                { label: 'Supplier Vetting Standards', href: '/vetting-standards' },
                { label: 'Data Protection & GDPR', href: '/gdpr' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.href} className="text-sm text-brand-mutedGray hover:text-white transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                    {link.badge && (
                      <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Resources */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="w-5 h-5 text-brand-mutedGray" />
              <h3 className="text-white font-semibold tracking-wide">Company & Resources</h3>
            </div>
            <ul className="space-y-4">
              {[
                { label: 'About Us / Our Story', href: '/about-us' },
                { label: 'Careers', href: '/careers', badge: "We're Hiring", badgeColor: 'text-brand-success border-brand-success/30 bg-brand-success/10' },
                { label: 'Press & Newsroom', href: '/press' },
                { label: 'Investor Relations', href: '/investors' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Industry Insights Blog', href: '/blog' },
                { label: 'ROI Calculator', href: '/roi-calculator' },
                { label: 'Help Center', href: '/help' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.href} className="text-sm text-brand-mutedGray hover:text-white transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                    {link.badge && (
                      <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${link.badgeColor}`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
               <li className="mt-4">
                  <Link to="/schedule-demo" className="inline-flex items-center text-brand-gold hover:text-white transition-colors text-sm font-semibold group">
                    Schedule Demo <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
               </li>
            </ul>
          </div>

          {/* Column 4: Platform */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <LayoutGrid className="w-5 h-5 text-brand-mutedGray" />
              <h3 className="text-white font-semibold tracking-wide">Platform</h3>
            </div>
            <ul className="space-y-4">
              {[
                { label: 'Sourcing Hub', href: '/sourcing-hub' },
                { label: 'Active Projects', href: '/active-projects' },
                { label: 'Supplier Network', href: '/supplier-network' },
                { label: 'Pricing & Plans', href: '/pricing' },
                { label: 'API Documentation', href: '/api-docs', highlight: true },
                { label: 'Integration Partners', href: '/integrations' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.href} className={`text-sm ${link.highlight ? 'text-brand-offWhite font-medium' : 'text-brand-mutedGray'} hover:text-white transition-colors duration-200 flex items-center group`}>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <button className="w-full px-4 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-darkNavy rounded-md text-sm font-medium transition-all duration-300">
                  Request Demo
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-brand-mutedGray text-center md:text-left">
            <span className="opacity-80">© 2024 Classic Homes Marketplace Inc. All rights reserved.</span>
            <span className="hidden sm:inline mx-2 text-brand-gold/50">•</span>
            <span className="opacity-60 block sm:inline mt-1 sm:mt-0">"Trust & Transparency" in Luxury Sourcing.</span>
          </div>
          
          <div className="flex items-center space-x-6">
             <Link to="/linkedin" className="text-brand-mutedGray hover:text-brand-gold transition-colors duration-300 transform hover:scale-110">
               <Linkedin className="w-5 h-5" />
             </Link>
             <Link to="/twitter" className="text-brand-mutedGray hover:text-brand-gold transition-colors duration-300 transform hover:scale-110">
               <Twitter className="w-5 h-5" />
             </Link>
             <Link to="/instagram" className="text-brand-mutedGray hover:text-brand-gold transition-colors duration-300 transform hover:scale-110">
               <Instagram className="w-5 h-5" />
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};