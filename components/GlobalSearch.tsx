import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Command, X, Layers, Users, Box, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  to: string;
}

export const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mockData: SearchItem[] = [
    { id: '1', title: 'Sterling Residence', category: 'Projects', icon: <Layers className="w-4 h-4" />, to: '/projects' },
    { id: '2', title: 'Tuscany Stoneworks', category: 'Suppliers', icon: <Users className="w-4 h-4" />, to: '/network' },
    { id: '3', title: 'ORD-2025-8921', category: 'Orders', icon: <Box className="w-4 h-4" />, to: '/orders' },
    { id: '4', title: 'Apex Materials', category: 'Suppliers', icon: <Users className="w-4 h-4" />, to: '/network' },
    { id: '5', title: 'Kyoto Timber Co.', category: 'Suppliers', icon: <Users className="w-4 h-4" />, to: '/network' },
    { id: '6', title: 'Hudson Estate', category: 'Projects', icon: <Layers className="w-4 h-4" />, to: '/projects' },
    { id: '7', title: 'ORD-2025-8920', category: 'Orders', icon: <Box className="w-4 h-4" />, to: '/orders' },
  ];

  // Grouped results memo
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    results.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [results]);

  // DEBOUNCE LOGIC
  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

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

  // Filter based on debounced query
  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setResults([]);
    } else {
      const filtered = mockData.filter(item => 
        item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults(filtered);
    }
  }, [debouncedQuery]);

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
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-brand-gold animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-brand-gold" />
            )}
            <input 
              autoFocus
              type="text" 
              placeholder="Search enterprise records..."
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
              <div className="px-6 py-10 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                   <Command className="text-slate-300" size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-brand-darkNavy uppercase tracking-[0.2em]">Institutional Search</p>
                  <p className="text-[10px] text-brand-mutedGray leading-relaxed max-w-[200px] mx-auto">Search across projects, vetted suppliers, and active procurement orders.</p>
                </div>
              </div>
            ) : Object.keys(groupedResults).length > 0 ? (
              <div className="divide-y divide-slate-50">
                {/* Fixed error: Property 'map' does not exist on type 'unknown' by casting Object.entries result to ensure items is correctly typed */}
                {(Object.entries(groupedResults) as [string, SearchItem[]][]).map(([category, items]) => (
                  <div key={category} className="py-2">
                    <div className="px-6 py-2 flex items-center justify-between">
                      <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-[0.25em]">{category}</span>
                      {isSearching && category === Object.keys(groupedResults)[0] && (
                        <span className="text-[8px] font-bold text-brand-gold uppercase animate-pulse">Syncing...</span>
                      )}
                    </div>
                    {items.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => handleSelect(item.to)}
                        className="w-full flex items-center justify-between px-6 py-3 hover:bg-slate-50 transition-colors text-left group/item"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-slate-100 rounded-lg text-brand-darkNavy group-hover/item:bg-brand-gold/10 group-hover/item:text-brand-gold transition-colors">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-brand-darkNavy">{item.title}</p>
                            <p className="text-[9px] text-brand-mutedGray font-medium uppercase tracking-widest">Entry Verified</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-200 group-hover/item:text-brand-gold transition-colors" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              !isSearching && (
                <div className="px-6 py-12 text-center space-y-3">
                   <div className="text-brand-mutedGray text-xs italic">No matching records found for "{debouncedQuery}"</div>
                   <p className="text-[9px] text-brand-gold font-bold uppercase tracking-widest">Check spelling or parameters</p>
                </div>
              )
            )}
          </div>

          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5">
                   <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-tighter">Select</span>
                   <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-[8px] font-bold text-brand-darkNavy">↵</div>
                </div>
                <div className="flex items-center space-x-1.5">
                   <span className="text-[9px] font-black text-brand-mutedGray uppercase tracking-tighter">Navigate</span>
                   <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-[8px] font-bold text-brand-darkNavy flex items-center">↑↓</div>
                </div>
             </div>
             <div className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em]">v2.4 Core</div>
          </div>
        </div>
      )}
    </div>
  );
};
