import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ShoppingBag, 
  Wallet, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  LogOut, 
  ChevronDown, 
  FileUp, 
  ShieldCheck, 
  Cpu, 
  Search,
  CheckCircle2,
  Globe,
  TrendingUp,
  ArrowRight,
  MessageSquare,
  Box
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState('Sterling Residence');
  const [materialCategory, setMaterialCategory] = useState('Natural Stone');
  const [isScanning, setIsScanning] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const simulateAIScan = () => {
    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          // Auto-navigate to materials result for demo impact
          navigate('/materials');
        }, 1200);
      }
    }, 50);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      
      {/* EXECUTIVE SIDEBAR */}
      <aside className="w-64 bg-brand-darkNavy flex flex-col border-r border-white/5 shadow-2xl z-20">
        <div className="p-8">
          <Link to="/" className="flex flex-col space-y-1">
            <div className="w-8 h-8 border-2 border-brand-gold flex items-center justify-center rounded-sm">
              <div className="w-4 h-4 bg-brand-gold"></div>
            </div>
            <span className="text-white font-serif font-bold tracking-tight text-lg mt-2 uppercase">Classic Homes</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/sourcing-hub" />
          <NavItem icon={<Layers size={18} />} label="Projects" active />
          <NavItem icon={<ShoppingBag size={18} />} label="Materials" to="/materials" />
          <NavItem icon={<Box size={18} />} label="Orders" />
          <NavItem icon={<Wallet size={18} />} label="Wallet" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" />
          <NavItem icon={<Users size={18} />} label="Suppliers" to="/network" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center space-x-3 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                className="w-10 h-10 rounded-full border border-brand-gold/50" 
                alt="V. Sterling" 
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-success border-2 border-brand-darkNavy rounded-full"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-bold truncate">V. Sterling</span>
              <span className="text-[10px] text-brand-offWhite/40 truncate uppercase tracking-widest">Procurement</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full px-12 py-16">
          
          <header className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-brand-darkNavy mb-2">Initiate Sourcing Cycle</h1>
            <p className="text-brand-mutedGray text-sm">Upload technical specifications to begin AI-driven matchmaking across our vetted artisan network.</p>
          </header>

          <div className="space-y-8">
            <section className="bg-white border border-brand-navy/5 rounded-xl p-8 shadow-sm">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white text-xs font-bold">1</div>
                <h3 className="text-brand-darkNavy font-bold uppercase tracking-widest text-[11px]">Project Context</h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-mutedGray uppercase tracking-widest">Active Project</label>
                  <select className="w-full bg-slate-50 border border-brand-navy/10 rounded-lg px-4 py-3 text-brand-darkNavy font-medium focus:ring-1 focus:ring-brand-gold/50 outline-none">
                    <option>Sterling Residence</option>
                    <option>Hudson Estate</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-mutedGray uppercase tracking-widest">Material Category</label>
                  <select className="w-full bg-slate-50 border border-brand-navy/10 rounded-lg px-4 py-3 text-brand-darkNavy font-medium focus:ring-1 focus:ring-brand-gold/50 outline-none">
                    <option>Natural Stone</option>
                    <option>Structural Steel</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white border border-brand-navy/5 rounded-xl p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white text-xs font-bold">2</div>
                <h3 className="text-brand-darkNavy font-bold uppercase tracking-widest text-[11px]">Specification Upload</h3>
              </div>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${isScanning ? 'border-brand-gold bg-brand-gold/5' : 'border-slate-200 hover:border-brand-gold/40 hover:bg-slate-50/50'}`}
              >
                <input type="file" ref={fileInputRef} className="hidden" onChange={simulateAIScan} />
                {isScanning ? (
                  <div className="space-y-6 w-full max-w-xs">
                    <div className="relative h-1 w-full bg-brand-navy/10 rounded-full overflow-hidden">
                      <div className="absolute h-full bg-brand-gold transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Cpu className="w-8 h-8 text-brand-gold animate-spin" />
                      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] animate-pulse">Running AI Validation...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-gold/10">
                      <FileUp className="w-8 h-8 text-brand-mutedGray group-hover:text-brand-gold" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-brand-darkNavy mb-2">Drag & Drop Specifications</h4>
                    <p className="text-xs text-brand-mutedGray mb-6">Supports PDF, CAD, Revit, IFC</p>
                    <button className="px-6 py-2.5 bg-white border border-slate-200 rounded text-xs font-bold text-brand-darkNavy shadow-sm">Browse Files</button>
                  </>
                )}
              </div>
            </section>

            <div className="flex justify-end pt-4">
              <button 
                onClick={() => navigate('/materials')}
                className="group flex items-center space-x-3 px-10 py-5 bg-brand-gold/10 border border-brand-gold text-brand-darkNavy font-black text-xs uppercase tracking-[0.2em] rounded-md hover:bg-brand-gold transition-all duration-500 shadow-2xl"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Secure Artisan Access</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto bg-brand-darkNavy text-white py-12 px-12 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-3">
                 <ShieldCheck className="w-4 h-4 text-brand-gold" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Institutional Settlement Channels</span>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest">
                 <span>SWIFT / SEPA</span>
                 <span>Corporate Treasury</span>
                 <span>Letter of Credit</span>
                 <span>Smart Contracts</span>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to?: string }> = ({ icon, label, active, to }) => (
  <Link 
    to={to || '#'} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active ? 'bg-brand-gold text-brand-darkNavy' : 'text-brand-offWhite/40 hover:bg-white/5 hover:text-white'}`}
  >
    <div className={`${active ? 'text-brand-darkNavy' : 'text-brand-offWhite/30 group-hover:text-brand-gold'}`}>
      {icon}
    </div>
    <span className="text-xs font-bold tracking-wide">{label}</span>
  </Link>
);