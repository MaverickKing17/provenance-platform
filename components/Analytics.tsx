import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Box, 
  Wallet, 
  BarChart3, 
  Users, 
  Settings, 
  Download, 
  ChevronDown, 
  TrendingUp, 
  Leaf, 
  ArrowUpRight, 
  Info,
  MessageSquare,
  Globe,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Analytics: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* EXECUTIVE SIDEBAR */}
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20">
        <div className="p-8">
          <Link to="/" className="flex flex-col space-y-1">
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-brand-gold"></div>
            </div>
            <span className="text-white font-serif font-bold tracking-tight text-lg mt-2 uppercase tracking-tighter">Classic Homes</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/sourcing-hub" />
          <NavItem icon={<Layers size={18} />} label="Projects" to="/projects" />
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size={18} />} label="Orders" to="/orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" active />
          <NavItem icon={<Users size={18} />} label="Vetted Suppliers" to="/network" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
              className="w-10 h-10 rounded-full border border-brand-gold/50 shadow-lg" 
              alt="V. Sterling" 
            />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 uppercase tracking-widest">Chief Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col overflow-y-auto">
        
        {/* TOP BAR / CONTROLS */}
        <div className="bg-white border-b border-slate-200 px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6 sticky top-0 z-10 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-brand-darkNavy tracking-tight">Financial Performance</h1>
            <div className="flex items-center space-x-2 text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">
               <span>Strategic Sourcing Intelligence</span>
               <span className="w-1 h-1 bg-brand-gold rounded-full"></span>
               <span className="text-brand-success">4.2% Under Budget YTD</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-brand-navy/10 rounded-lg text-xs font-bold text-brand-darkNavy hover:bg-slate-50 transition-all shadow-sm group">
              <Download className="w-4 h-4 text-brand-mutedGray group-hover:text-brand-darkNavy" />
              <span>Download PDF</span>
            </button>
            <div className="relative group">
              <div className="flex items-center space-x-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-brand-darkNavy cursor-pointer hover:bg-slate-100 transition-all">
                <span className="text-brand-mutedGray uppercase tracking-widest text-[9px]">Timeframe:</span>
                <span>Fiscal Year 2025</span>
                <ChevronDown className="w-4 h-4 text-brand-mutedGray" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-12 py-10 space-y-10">
          
          {/* HIGH LEVEL KPI ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-darkNavy rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-3xl -translate-y-12 translate-x-12 rounded-full"></div>
               <p className="text-[10px] font-black text-brand-offWhite/40 uppercase tracking-[0.25em] mb-4">Total Realized Savings</p>
               <div className="flex items-end space-x-4">
                  <h2 className="text-4xl font-serif font-bold">$842,500</h2>
                  <div className="flex items-center space-x-1 mb-1.5 px-2 py-0.5 bg-brand-success/20 border border-brand-success/30 rounded text-[9px] font-black text-brand-success">
                     <ArrowUpRight size={10} />
                     <span>12% vs Market Index</span>
                  </div>
               </div>
               <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-gold w-[74%] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]"></div>
                  </div>
               </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
               <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.25em] mb-4">Budget Variance (YTD)</p>
               <h2 className="text-4xl font-serif font-bold text-brand-success">-4.2%</h2>
               <p className="text-xs text-brand-mutedGray mt-2 leading-relaxed">Under budget due to strategic bulk procurement in Q2 across Italian natural stone suppliers.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm group">
               <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.25em] mb-4">ESG Impact</p>
                    <h2 className="text-4xl font-serif font-bold text-brand-darkNavy">124 <span className="text-xl font-sans font-medium text-brand-mutedGray">tons</span></h2>
                    <p className="text-xs text-brand-mutedGray mt-2 leading-relaxed">CO2e offset via sustainable timber sourcing and consolidated maritime logistics.</p>
                  </div>
                  <div className="p-3 bg-brand-success/10 rounded-xl text-brand-success group-hover:rotate-12 transition-transform">
                     <Leaf size={24} />
                  </div>
               </div>
            </div>
          </div>

          {/* CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* SPEND CHART */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-10 shadow-sm flex flex-col">
               <div className="flex items-center justify-between mb-12">
                  <div className="space-y-1">
                     <h3 className="text-xl font-serif font-bold text-brand-darkNavy">Budget vs. Actual Spend</h3>
                     <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Millions USD • Monthly Consolidation</p>
                  </div>
                  <div className="flex items-center space-x-6">
                     <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-brand-darkNavy rounded-sm"></div>
                        <span className="text-[10px] font-black text-brand-darkNavy uppercase tracking-widest">Actual</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border border-brand-gold rounded-sm"></div>
                        <span className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Budget</span>
                     </div>
                  </div>
               </div>

               <div className="flex-grow h-80 relative mt-4">
                  {/* CHART GRID LINES */}
                  <div className="absolute inset-0 flex flex-col justify-between py-2">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-slate-100 border-dashed"></div>)}
                  </div>
                  
                  {/* BARS & LINE OVERLAY */}
                  <div className="absolute inset-0 flex items-end justify-around px-8">
                     {[
                       { m: 'Jan', a: 80, b: 75 },
                       { m: 'Feb', a: 65, b: 70 },
                       { m: 'Mar', a: 50, b: 55 },
                       { m: 'Apr', a: 60, b: 58 },
                       { m: 'May', a: 55, b: 52 },
                       { m: 'Jun', a: 58, b: 60 },
                       { m: 'Jul', a: 72, b: 68 },
                     ].map((data, idx) => (
                        <div key={idx} className="relative group w-12 flex flex-col items-center">
                           {/* Actual Bar */}
                           <div 
                              className="w-full bg-brand-darkNavy rounded-t-sm transition-all duration-1000 group-hover:bg-brand-gold" 
                              style={{ height: `${data.a}%` }}
                           ></div>
                           {/* Label */}
                           <span className="absolute -bottom-8 text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">{data.m}</span>
                        </div>
                     ))}
                  </div>

                  {/* SVG Line Overlay for Budget */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                     <path 
                        d="M 120,60 L 250,75 L 380,140 L 510,130 L 640,160 L 770,150 L 900,100" 
                        fill="none" 
                        stroke="#D4AF37" 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                        className="animate-pulse"
                     />
                     {[
                       { x: 120, y: 60 }, { x: 250, y: 75 }, { x: 380, y: 140 }, 
                       { x: 510, y: 130 }, { x: 640, y: 160 }, { x: 770, y: 150 }, { x: 900, y: 100 }
                     ].map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#D4AF37" />
                     ))}
                  </svg>
               </div>

               <div className="mt-20 p-6 bg-slate-50 border-l-4 border-brand-gold rounded-r-xl">
                  <div className="flex items-start space-x-4">
                     <Info className="w-5 h-5 text-brand-gold mt-0.5 shrink-0" />
                     <p className="text-xs text-brand-darkNavy leading-relaxed">
                        "Strategic bulk purchasing in May resulted in a <span className="font-bold">14% positive variance</span>, effectively offsetting the minor logistics cost overrun in April caused by Suez Canal re-routing."
                     </p>
                  </div>
               </div>
            </div>

            {/* ALLOCATION CHART */}
            <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
               <div className="mb-10">
                  <h3 className="text-xl font-serif font-bold text-brand-darkNavy">Capital Allocation</h3>
                  <p className="text-[10px] font-black text-brand-mutedGray uppercase tracking-widest">Distribution by Category</p>
               </div>

               <div className="relative flex items-center justify-center py-10">
                  {/* Custom Donut Chart (SVG) */}
                  <svg className="w-64 h-64 transform -rotate-90">
                     <circle cx="128" cy="128" r="100" stroke="#F1F5F9" strokeWidth="24" fill="none" />
                     {/* Segment 1: Natural Stone (45%) */}
                     <circle cx="128" cy="128" r="100" stroke="#1A2A44" strokeWidth="24" strokeDasharray="282.7" strokeDashoffset="0" fill="none" />
                     {/* Segment 2: Hardwoods (25%) */}
                     <circle cx="128" cy="128" r="100" stroke="#D4AF37" strokeWidth="24" strokeDasharray="157" strokeDashoffset="-282.7" fill="none" />
                     {/* Segment 3: Steel (20%) */}
                     <circle cx="128" cy="128" r="100" stroke="#94A3B8" strokeWidth="24" strokeDasharray="125.6" strokeDashoffset="-439.7" fill="none" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-3xl font-serif font-bold text-brand-darkNavy">45%</span>
                     <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-widest">Natural Stone</span>
                  </div>
               </div>

               <div className="mt-8 space-y-4">
                  <AllocationRow color="bg-brand-navy" label="Natural Stone" percentage="45%" />
                  <AllocationRow color="bg-brand-gold" label="Hardwoods" percentage="25%" />
                  <AllocationRow color="bg-slate-400" label="Steel" percentage="20%" />
                  <AllocationRow color="bg-slate-200" label="Glass" percentage="10%" />
               </div>
            </div>

          </div>

        </div>

        {/* SETTLEMENT FOOTER */}
        <div className="mt-auto bg-brand-darkNavy py-12 px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
             <div className="flex items-center space-x-3">
                <Lock size={14} className="text-brand-gold" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Institutional Settlement Channels</span>
             </div>
             <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-white uppercase tracking-[0.2em]">
                <span className="flex items-center space-x-2"><Globe size={14} /> <span>SWIFT / SEPA</span></span>
                <span className="flex items-center space-x-2"><TrendingUp size={14} /> <span>Corporate Treasury</span></span>
                <span className="flex items-center space-x-2"><ShieldCheck size={14} /> <span>Letter of Credit</span></span>
                <span className="flex items-center space-x-2"><Box size={14} /> <span>Escrow & Smart Contract</span></span>
             </div>
          </div>
        </div>
      </main>

      {/* FLOATING CONCIERGE */}
      <div className="fixed bottom-10 right-10 z-50 animate-in slide-in-from-bottom duration-1000">
         <div className="bg-brand-gold p-4 rounded-2xl shadow-2xl flex items-center space-x-4 cursor-pointer hover:bg-brand-goldHover hover:-translate-y-1 transition-all group">
            <div className="w-10 h-10 bg-brand-darkNavy rounded-xl flex items-center justify-center">
               <MessageSquare size={20} className="text-brand-gold fill-brand-gold" />
            </div>
            <div className="flex flex-col pr-2">
               <span className="text-[11px] text-brand-darkNavy font-black uppercase tracking-widest">Live Concierge</span>
               <span className="text-[10px] text-brand-darkNavy/70 font-bold">Priority Finance Support</span>
            </div>
         </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link 
    to={to || '#'} 
    className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-brand-gold text-brand-darkNavy shadow-lg shadow-brand-gold/10' 
        : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'} transition-colors`}>
      {icon}
    </div>
    <span className="text-xs font-bold tracking-wider">{label}</span>
  </Link>
);

const AllocationRow: React.FC<{ color: string; label: string; percentage: string }> = ({ color, label, percentage }) => (
  <div className="flex items-center justify-between py-2 group cursor-default">
    <div className="flex items-center space-x-3">
      <div className={`w-2 h-2 rounded-full ${color} group-hover:scale-125 transition-transform`}></div>
      <span className="text-[11px] font-bold text-brand-darkNavy uppercase tracking-wider">{label}</span>
    </div>
    <span className="text-xs font-black text-brand-darkNavy">{percentage}</span>
  </div>
);