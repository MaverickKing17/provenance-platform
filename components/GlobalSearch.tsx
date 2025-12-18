import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, X, Layers, Users, Box, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mockData = [
    { id: '1', title: 'Sterling Residence', category: 'Project', icon: <Layers className="w-4 h-4" />, to: '/projects' },
    { id: '2', title: 'Tuscany Stoneworks', category: 'Supplier', icon: <Users className="w-4 h-4" />, to: '/network' },
    { id: '3', title: 'ORD-2025-8921', category: 'Order', icon: <Box className="w-4 h-4" />, to: '/orders' },
    { id: '4', title: 'Apex Materials', category: 'Supplier', icon: <Users className="w-4 h-4" />, to: '/network' },
    { id: '5', title: 'Kyoto Timber Co.', category: 'Supplier', icon: <Users className="w-4 h-4" />, to: '/network' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const filtered = mockData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  const handleSelect = (to: string) => {
    navigate(to);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div 
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-text group hover:border-brand-gold/50 transition-all duration-300 shadow-sm"
      >
        <Search className="w-4 h-4 text-brand-mutedGray group-hover:text-brand-gold transition-colors" />
        <span className="text-sm text-brand-mutedGray flex-grow">Search projects, suppliers...</span>
        <div className="hidden sm:flex items-center space-x-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-black text-brand-mutedGray uppercase tracking-tighter shadow-sm">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>

      {/* SEARCH RESULTS DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-4 border-b border-slate-50 flex items-center space-x-3">
            <Search className="w-5 h-5 text-brand-gold" />
            <input 
              autoFocus
              type="text" 
              placeholder="Start typing to search..."
              className="flex-grow text-sm font-medium text-brand-darkNavy outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-50 rounded-full transition-colors">
              <X className="w-4 h-4 text-brand-mutedGray" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto py-2">
            {query.trim() === '' ? (
              <div className="px-6 py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                   <Command className="text-slate-300" size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-brand-darkNavy uppercase tracking-widest">Global Command Search</p>
                  <p className="text-[10px] text-brand-mutedGray leading-relaxed">Instantly access any project, supplier, or order in the ecosystem.</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                <div className="px-6 py-2 text-[10px] font-black text-brand-mutedGray uppercase tracking-[0.2em]">Suggestions</div>
                {results.map((result) => (
                  <button 
                    key={result.id}
                    onClick={() => handleSelect(result.to)}
                    className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors text-left group/item"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-slate-100 rounded-lg text-brand-darkNavy group-hover/item:bg-brand-gold/10 group-hover/item:text-brand-gold transition-colors">
                        {result.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-darkNavy">{result.title}</p>
                        <p className="text-[10px] text-brand-mutedGray uppercase tracking-widest">{result.category}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-200 group-hover/item:text-brand-gold transition-colors" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center text-brand-mutedGray text-xs">No records found for "{query}"</div>
            )}
          </div>

          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5">
                   <span className="text-[9px] font-black text-brand-mutedGray uppercase">Select</span>
                   <div className="px-1 py-0.5 bg-white border border-slate-200 rounded shadow-xs text-[8px] font-bold">↵</div>
                </div>
                <div className="flex items-center space-x-1.5">
                   <span className="text-[9px] font-black text-brand-mutedGray uppercase">Navigate</span>
                   <div className="px-1 py-0.5 bg-white border border-slate-200 rounded shadow-xs text-[8px] font-bold">↑↓</div>
                </div>
             </div>
             <div className="text-[9px] font-black text-brand-gold uppercase tracking-widest">Enterprise Search v2.4</div>
          </div>
        </div>
      )}
    </div>
  );
};