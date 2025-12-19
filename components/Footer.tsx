
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Linkedin, 
  Twitter, 
  MapPin,
  Phone
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-white font-sans border-t border-white/10">
      
      {/* Pre-Footer Section (Conversion) */}
      <div className="border-b border-white/10 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-sans font-semibold tracking-tight text-white leading-tight">
              De-Risk Your Next Project.
            </h2>
            <p className="text-2xl md:text-3xl font-sans font-medium text-white/80 tracking-tight">
              Achieve Digital Certainty.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto">
            <a 
              href="https://apps.classichomesremodeling.com" 
              className="w-full sm:w-auto px-10 py-5 bg-brand-gold text-brand-darkNavy font-bold rounded-lg hover:bg-brand-goldHover transition-all text-center whitespace-nowrap shadow-xl shadow-brand-gold/20 transform hover:-translate-y-1"
            >
              Request a Custom Demo
            </a>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 hover:border-white transition-all text-center whitespace-nowrap"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-white group w-fit">
              <Building2 className="w-8 h-8 stroke-1 text-brand-gold" />
              <span className="text-2xl font-serif font-bold tracking-tight">Classic Homes</span>
            </Link>
            
            <p className="text-brand-offWhite/90 font-medium tracking-wide">
              Verified Provenance. <br />Digital Certainty.
            </p>

            {/* SOC 2 Badge Placeholder */}
            <div className="inline-flex items-center px-3 py-2 border border-white/15 rounded bg-white/5 space-x-2">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                <span className="text-xs font-bold tracking-widest text-brand-offWhite">SOC 2 TYPE II COMPLIANT</span>
            </div>

            {/* Address / Contact Placeholder */}
            <div className="space-y-3 pt-4 text-sm text-brand-offWhite/60">
                <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                    <span className="leading-relaxed">100 Enterprise Way, Suite 500<br/>San Francisco, CA 94105</span>
                </div>
                <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>+1 (888) 555-0123</span>
                </div>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-serif font-bold text-white mb-6 tracking-wide">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">Home</Link></li>
              <li><Link to="/about-us" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">Careers</Link></li>
              <li><Link to="/partners" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">Partners</Link></li>
            </ul>
          </div>

          {/* Column 3: Insights */}
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-6 tracking-wide">Insights</h3>
            <ul className="space-y-4">
              <li><Link to="/blog" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">The Blueprint Hub</Link></li>
              <li><Link to="/case-studies" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">Case Studies</Link></li>
              <li><Link to="/help" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">FAQ / Help Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Trust */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-serif font-bold text-white mb-6 tracking-wide">Trust</h3>
            <ul className="space-y-4 mb-8">
              <li><Link to="/privacy-policy" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-brand-offWhite/70 hover:text-brand-gold transition-colors text-sm">Cookie Preferences</Link></li>
            </ul>
            
            <div className="mt-auto pt-6 border-t border-white/10 md:border-none md:pt-0">
               <div className="flex space-x-6">
                 <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-brand-offWhite/50 hover:text-brand-gold transition-colors">
                    <Linkedin className="w-5 h-5" />
                 </a>
                 <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-brand-offWhite/50 hover:text-brand-gold transition-colors">
                    <Twitter className="w-5 h-5" />
                 </a>
               </div>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-offWhite/40">
            <p>&copy; {new Date().getFullYear()} Classic Homes Marketplace Inc. All rights reserved.</p>
            <p>Designed for Enterprise Excellence.</p>
        </div>
      </div>
    </footer>
  );
};
