
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RiskTier = 1 | 2 | 3 | 4 | 5;

interface RiskState {
  tier: RiskTier;
  color: string;
  label: string;
  isLocked: boolean;
  showAIHedging: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
}

interface RiskContextType extends RiskState {
  refreshRisk: () => Promise<void>;
  setDemoMode: (active: boolean) => void;
}

const RiskContext = createContext<RiskContextType | undefined>(undefined);

const TIER_CONFIG = {
  1: { color: '#B22222', label: 'CRITICAL', isLocked: true, showAIHedging: false },
  2: { color: '#FF4F00', label: 'VOLATILE', isLocked: false, showAIHedging: true },
  3: { color: '#D4AF37', label: 'ELEVATED', isLocked: false, showAIHedging: false },
  4: { color: '#2E8B57', label: 'STABLE', isLocked: false, showAIHedging: false },
  5: { color: '#475569', label: 'INFO', isLocked: false, showAIHedging: false },
};

export const RiskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<RiskTier>(5);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('DEMO_MODE_ACTIVE') === 'true';
  });

  const getEnv = (key: string): string => {
    if (typeof window !== 'undefined') {
      const manual = window.localStorage.getItem(key);
      if (manual) return manual.trim();
    }
    return (process.env && process.env[key]) ? process.env[key]!.trim() : '';
  };

  const refreshRisk = async () => {
    if (isDemoMode) {
      setTier(2); // Volatile for Demo Mode
      setIsLoading(false);
      return;
    }

    const baseUrl = getEnv('NEXT_PUBLIC_XANO_BASE_URL');
    const alexToken = getEnv('NEXT_PUBLIC_ALEX_TOKEN');

    try {
      if (!baseUrl) throw new Error('No API');
      const response = await fetch(`${baseUrl}/highest_priority_risk`, {
        headers: { 'Authorization': `Bearer ${alexToken}` }
      });
      if (!response.ok) throw new Error('Fault');
      const data = await response.json();
      const newTier = (data.risk_score as RiskTier) || 5;
      setTier(newTier);
    } catch (e) {
      setTier(3);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshRisk();
    const interval = setInterval(refreshRisk, 30000);
    return () => clearInterval(interval);
  }, [isDemoMode]);

  useEffect(() => {
    const root = document.documentElement;
    const currentTier = isDemoMode ? 2 : tier;
    const config = TIER_CONFIG[currentTier as RiskTier];
    root.style.setProperty('--risk-accent', config.color);
    root.style.setProperty('--risk-glow', `${config.color}33`);
  }, [tier, isDemoMode]);

  const setDemoMode = (active: boolean) => {
    setIsDemoMode(active);
    localStorage.setItem('DEMO_MODE_ACTIVE', active ? 'true' : 'false');
  };

  const currentTier = isDemoMode ? 2 : tier;
  const value = {
    tier: currentTier as RiskTier,
    ...TIER_CONFIG[currentTier as RiskTier],
    isLoading,
    isDemoMode,
    refreshRisk,
    setDemoMode
  };

  return <RiskContext.Provider value={value}>{children}</RiskContext.Provider>;
};

export const useRisk = () => {
  const context = useContext(RiskContext);
  if (!context) throw new Error('useRisk must be used within RiskProvider');
  return context;
};
