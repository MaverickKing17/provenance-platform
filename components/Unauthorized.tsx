import React from 'react';
import { ShieldX, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-darkNavy flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-brand-gold/20 blur-2xl rounded-full"></div>
          <div className="relative bg-brand-navy border border-white/10 p-6 rounded-3xl shadow-2xl">
            <Lock className="w-12 h-12 text-brand-gold mx-auto" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Security Alert</h1>
          <p className="text-brand-offWhite/60 text-sm leading-relaxed">
            Session Expired or Access Denied. Please contact your administrator to refresh your workspace token.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-3 text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Perimeter</span>
          </Link>
        </div>
        
        <div className="pt-20 opacity-20">
          <div className="text-[9px] font-mono text-white uppercase tracking-widest">Protocol: 401-UNAUTHORIZED</div>
        </div>
      </div>
    </div>
  );
};
