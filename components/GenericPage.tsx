
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, Globe, TrendingUp, Cpu, 
  FileText, Users, Lock, ChevronRight, Briefcase, 
  Award, Scale, Database, Zap, Sparkles, Building2,
  MessageSquare, Mail, Phone, MapPin, Search
} from 'lucide-react';

interface PageContent {
  eyebrow: string;
  title: string;
  lead: string;
  sections: {
    heading: string;
    body: string;
    icon?: React.ReactNode;
  }[];
  sidebar?: {
    label: string;
    value: string;
  }[];
}

export const GenericPage: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.substring(1);

  const contentMap: Record<string, PageContent> = {
    'about-us': {
      eyebrow: 'Institutional Heritage',
      title: 'The Architecture of Operational Certainty',
      lead: 'Classic Homes was founded on a singular premise: that luxury at scale requires more than just vision—it requires absolute supply chain integrity.',
      sections: [
        { heading: 'Our Mandate', body: 'We empower the world’s most ambitious builders to de-risk their material procurement through a combination of proprietary AI and an exclusive, vetted artisan network.', icon: <Award className="text-brand-gold" /> },
        { heading: 'The $10M+ Benchmark', body: 'Every line of code in our platform is optimized to support the high-stakes environment of ultra-luxury construction, where a single day of delay impacts millions in capital allocation.', icon: <TrendingUp className="text-brand-gold" /> },
        { heading: 'Vetted Global Reach', body: 'Our footprint spans from the marble quarries of Carrara to the timber hubs of Kyoto, ensuring that "Global Provenance" is a verified metric, not just a marketing claim.', icon: <Globe className="text-brand-gold" /> }
      ],
      sidebar: [
        { label: 'Founded', value: '2018' },
        { label: 'Capital Deployed', value: '$2.4B+' },
        { label: 'Network Reliability', value: '99.98%' }
      ]
    },
    'careers': {
      eyebrow: 'Elite Talent',
      title: 'Join the Artisans of Logic',
      lead: 'We are seeking the top 1% of engineering and procurement minds to build the future of autonomous sourcing.',
      sections: [
        { heading: 'Engineering Excellence', body: 'Work at the intersection of Spatial Intelligence and Agentic AI. We don’t just build software; we build the OS for the global luxury supply chain.', icon: <Cpu className="text-brand-gold" /> },
        { heading: 'Institutional Culture', body: 'Classic Homes operates with a boardroom mentality: high autonomy, extreme ownership, and a commitment to precision over volume.', icon: <ShieldCheck className="text-brand-gold" /> }
      ],
      sidebar: [
        { label: 'Global Offices', value: 'SF, London, Tokyo' },
        { label: 'Retention Rate', value: '94%' },
        { label: 'Annual R&D', value: '$45M' }
      ]
    },
    'partners': {
      eyebrow: 'Strategic Ecosystem',
      title: 'Institutional Synergy',
      lead: 'We partner with the world’s leading financial institutions and logistics providers to create a frictionless procurement bridge.',
      sections: [
        { heading: 'Financial Integration', body: 'Seamlessly connect with Oracle Treasury and SWIFT/SEPA channels for automated capital movement and escrow management.', icon: <Database className="text-brand-gold" /> },
        { heading: 'The Vetted Network', body: 'Our partners undergo a rigorous 42-point audit, covering everything from financial stability to ESG compliance and material provenance.', icon: <ShieldCheck className="text-brand-gold" /> }
      ]
    },
    'blog': {
      eyebrow: 'Market Intelligence',
      title: 'The Blueprint Hub',
      lead: 'Exclusive macro-economic insights for the institutional developer.',
      sections: [
        { heading: 'Q4 Sourcing Forecast', body: 'Analyzing the volatility in natural stone markets and its impact on Q1 2026 delivery milestones.', icon: <TrendingUp className="text-brand-gold" /> },
        { heading: 'The ESG Premium', body: 'How verified carbon offsets are increasing resale valuations for ultra-luxury residential assets by 8-12%.', icon: <Zap className="text-brand-gold" /> }
      ]
    },
    'case-studies': {
      eyebrow: 'Proven Outcomes',
      title: 'Capital Optimization Reports',
      lead: 'Review how the world’s leading developers achieved 15%+ margin recovery through our AI-matched sourcing cycles.',
      sections: [
        { heading: 'Sterling Residence Peak Performance', body: 'A $45M estate project that recovered $2.4M in logistics overhead by switching to AI-verified alternative materials.', icon: <Building2 className="text-brand-gold" /> },
        { heading: 'Apex Tower Procurement Sprint', body: 'Reducing lead times by 65% for custom structural glazing across 42 floors using our predictive logistics engine.', icon: <TrendingUp className="text-brand-gold" /> }
      ],
      sidebar: [
        { label: 'Avg. Savings', value: '18.4%' },
        { label: 'Risk Mitigation', value: '92%' },
        { label: 'Time Saved', value: '14 Weeks' }
      ]
    },
    'help': {
      eyebrow: 'Institutional Support',
      title: 'Governance & Scale FAQ',
      lead: 'Addressing the technical and compliance requirements of our C-suite users.',
      sections: [
        { heading: 'How is Data Sovereignty Handled?', body: 'All enterprise data is siloed and encrypted using AES-256 standards, with institutional partitioning for multi-division users.', icon: <Lock className="text-brand-gold" /> },
        { heading: 'What are the Uptime Guarantees?', body: 'Our service level agreement (SLA) guarantees 99.9% uptime for the Predictive Sourcing Engine, backed by redundant nodes.', icon: <Zap className="text-brand-gold" /> }
      ]
    },
    'privacy-policy': {
      eyebrow: 'Governance Framework',
      title: 'Data Sovereignty Protocol',
      lead: 'At Classic Homes, we treat your procurement data as a sovereign asset.',
      sections: [
        { heading: 'Zero-Knowledge Auditing', body: 'We utilize SOC2-v4 protocols to ensure that your financial allocations and supplier negotiations remain private yet verifiable.', icon: <ShieldCheck className="text-brand-gold" /> },
        { heading: 'Institutional Partitioning', body: 'Our "God Mode" vs. "User Mode" logic ensures that C-suite oversight never compromises tactical-level privacy.', icon: <Lock className="text-brand-gold" /> }
      ]
    },
    'terms-of-service': {
      eyebrow: 'Master Agreement',
      title: 'Institutional Service Terms',
      lead: 'Our Master Service Agreement (MSA) is engineered to provide legal certainty for multi-million dollar procurement cycles.',
      sections: [
        { heading: 'Transactional Finality', body: 'All material orders executed through the Classic Homes Bridge are governed by immutable smart-contract logic, ensuring payment only upon verified provenance.', icon: <FileText className="text-brand-gold" /> },
        { heading: 'Dispute Resolution', body: 'Integrated arbitration protocols for high-value architectural assets, de-risking the relationship between developer and artisan.', icon: <Scale className="text-brand-gold" /> }
      ],
      sidebar: [
        { label: 'Standard MSA v.', value: '2025.4' },
        { label: 'Arbitration Node', value: 'London/NYC' },
        { label: 'Liability Cover', value: '$50M+' }
      ]
    },
    'cookies': {
      eyebrow: 'Digital Privacy',
      title: 'Digital Trace Protocol',
      lead: 'We employ zero-knowledge tracking to maintain workspace security without compromising executive privacy.',
      sections: [
        { heading: 'Session Integrity', body: 'Ephemeral identifiers ensure that your sourcing queries remain isolated and encrypted, preventing market front-running.', icon: <ShieldCheck className="text-brand-gold" /> },
        { heading: 'Analytical Opt-In', body: 'Choose which telemetry nodes are shared with your internal team vs. institutional partners.', icon: <Database className="text-brand-gold" /> }
      ]
    },
    'contact': {
      eyebrow: 'Executive Liaison',
      title: 'Initialize Concierge Bridge',
      lead: 'For urgent capital allocation inquiries or bespoke network vetting, our institutional team is on standby.',
      sections: [
        { heading: 'Global Headquarters', body: '100 Enterprise Way, Suite 500, San Francisco, CA 94105', icon: <MapPin className="text-brand-gold" /> },
        { heading: 'Institutional Line', body: '+1 (888) 555-0123 (Verified Partners Only)', icon: <Phone className="text-brand-gold" /> },
        { heading: 'Digital Gateway', body: 'executive.support@classichomes.ai', icon: <Mail className="text-brand-gold" /> }
      ]
    }
  };

  const page = contentMap[slug] || {
    eyebrow: 'Security Clearance Required',
    title: 'Resource Unattainable',
    lead: 'The requested intelligence node is currently offline or requires an elevated access tier.',
    sections: [
      { heading: 'Access Protocol 404', body: 'Your session token does not currently authorize entry to this logical perimeter. Please re-authenticate via the Main Cockpit.', icon: <Lock className="text-brand-gold" /> }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0A1628] pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-brand-gold selection:text-brand-darkNavy">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <Link to="/" className="inline-flex items-center space-x-3 text-[11px] font-black text-brand-gold uppercase tracking-[0.4em] hover:text-white transition-all group mb-16">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Cockpit</span>
        </Link>

        <div className="grid grid-cols-12 gap-16 lg:gap-24">
          
          {/* Main Content Node */}
          <div className="col-span-12 lg:col-span-8 space-y-20">
            <header className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="inline-flex items-center space-x-4 px-6 py-2 rounded-full bg-brand-gold/5 border border-brand-gold/30 backdrop-blur-md">
                 <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shadow-[0_0_10px_#D4AF37]"></div>
                 <span className="text-[12px] font-black text-brand-gold uppercase tracking-[0.3em]">{page.eyebrow}</span>
               </div>
               <h1 className="text-6xl lg:text-8xl font-sans font-black text-white leading-[1] tracking-tighter">
                 {page.title}
               </h1>
               <p className="text-2xl lg:text-3xl text-brand-offWhite/80 leading-relaxed font-normal max-w-3xl">
                 {page.lead}
               </p>
            </header>

            <div className="space-y-24 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              {page.sections.map((section, idx) => (
                <section key={idx} className="group relative">
                  <div className="flex items-start space-x-10">
                    <div className="shrink-0 p-6 bg-white/5 border border-white/10 rounded-3xl group-hover:border-brand-gold/50 transition-all duration-500 shadow-2xl">
                      {section.icon || <Sparkles size={28} className="text-brand-gold" />}
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-sans font-black text-white uppercase tracking-tight group-hover:text-brand-gold transition-colors">{section.heading}</h3>
                      <p className="text-xl text-brand-offWhite/60 leading-relaxed max-w-2xl font-normal">
                        {section.body}
                      </p>
                    </div>
                  </div>
                  {idx < page.sections.length - 1 && (
                    <div className="absolute -bottom-12 left-0 w-full h-px bg-white/10"></div>
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Sidebar Metadata Hub */}
          <aside className="col-span-12 lg:col-span-4 space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
             
             {page.sidebar && (
               <div className="bg-brand-navy/60 border border-brand-gold/20 p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-[0_60px_120px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                  <h4 className="text-[11px] font-black text-brand-gold uppercase tracking-[0.4em] mb-12">Institutional Metrics</h4>
                  <div className="space-y-10">
                    {page.sidebar.map((stat, idx) => (
                      <div key={idx} className="space-y-2 border-l-2 border-brand-gold/30 pl-6">
                        <p className="text-[11px] font-black text-white/30 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-sans font-black text-white tracking-tighter">{stat.value}</p>
                      </div>
                    ))}
                  </div>
               </div>
             )}

             <div className="bg-brand-gold/5 border border-brand-gold/30 p-12 rounded-[3.5rem] space-y-10 shadow-2xl">
                <div className="flex items-center space-x-5">
                   <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/30">
                      <MessageSquare size={24} className="text-brand-gold" />
                   </div>
                   <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Priority Access</h4>
                </div>
                <p className="text-base text-brand-offWhite/70 leading-relaxed font-normal">
                  For immediate consultation regarding capital allocation or custom sourcing nodes, please initialize our secure concierge bridge.
                </p>
                <button className="w-full py-6 bg-brand-gold text-brand-darkNavy font-black text-[12px] uppercase tracking-[0.35em] rounded-2xl hover:bg-white transition-all shadow-2xl shadow-brand-gold/20 transform active:scale-95">
                  Request C-Suite Demo
                </button>
             </div>

             <div className="px-8 flex items-center space-x-4 opacity-40">
                <ShieldCheck size={20} className="text-brand-gold" />
                <span className="text-[11px] font-black text-white uppercase tracking-[0.25em]">Verified Secure Protocol v2.5</span>
             </div>
          </aside>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(212,175,55,0.08)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-gold/5 blur-[150px] rounded-full"></div>
      </div>
    </div>
  );
};
