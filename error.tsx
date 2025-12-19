'use client';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { AlertCircle, RefreshCw, Hammer, Settings2 } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Capture the exception in Sentry immediately
    Sentry.captureException(error);

    const errorMessage = error.message || "";

    // 2. Contextual Tagging: Specific check for token-related environment variable failures
    if (errorMessage.includes('NEXT_PUBLIC_ALEX_TOKEN') || errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      Sentry.setTag('error_type', 'missing_env_variable');
    }

    // 3. User Identification: Determine workspace context (Alex/Larry)
    // Checking URL or LocalStorage as fallback for the current user context
    const isAlexWorkspace = window.location.hash.includes('ALEX') || 
                            localStorage.getItem('NEXT_PUBLIC_ALEX_TOKEN') !== null;
    
    const workspaceId = isAlexWorkspace ? 'ALEX_ADMIN' : 'LARRY_CUSTOMER';
    
    Sentry.setUser({ 
      id: workspaceId,
      username: isAlexWorkspace ? 'Alex' : 'Larry',
      segment: isAlexWorkspace ? 'Admin' : 'Customer'
    });
    
    Sentry.setTag('workspace', workspaceId);

    // 4. Navigation Logic: Handle authentication failures
    if (errorMessage.includes('401') || errorMessage.includes('403')) {
      navigate('/unauthorized');
    }
    
    // Institutional logging for debugging
    console.error('Executive System Fault Detected:', error);
  }, [error, navigate]);

  return (
    <div className="min-h-screen bg-brand-darkNavy flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-2xl w-full relative z-10 bg-brand-navy/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-16 shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center space-y-10 border-t-brand-gold/20">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-gold/10 blur-xl rounded-full animate-pulse"></div>
            <div className="relative p-6 bg-brand-darkNavy rounded-3xl border border-white/10">
              <Hammer className="w-12 h-12 text-brand-gold" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Settings2 size={16} className="text-brand-gold opacity-50" />
            <h1 className="text-4xl font-serif font-bold text-white tracking-tight">System Maintenance</h1>
          </div>
          <p className="text-brand-offWhite/40 text-sm max-w-md mx-auto leading-relaxed uppercase tracking-widest font-medium">
            We are optimizing the institutional data bridge. Strategic assets remain secured.
          </p>
        </div>

        <div className="pt-6 space-y-4">
          <button 
            onClick={() => reset()}
            className="group relative inline-flex items-center space-x-4 px-12 py-5 bg-brand-gold text-brand-darkNavy font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 shadow-2xl shadow-brand-gold/10"
          >
            <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
            <span>Try Again</span>
          </button>
          
          <div className="block pt-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <AlertCircle size={10} className="text-brand-gold" />
              <span className="text-[9px] font-mono text-brand-offWhite/30 uppercase tracking-tighter">
                Trace: {error.digest || 'Institutional-Fault-V1'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}