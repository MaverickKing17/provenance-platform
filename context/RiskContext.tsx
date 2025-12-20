
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RiskTier = 1 | 2 | 3 | 4 | 5;

interface RiskState {
  tier: RiskTier;
  color: string;
  label: string;
  isLocked: boolean; // Tier 1 Kill Switch
  showAIHedging: boolean; // Tier 2 Feature
  isLoading: boolean;
}

interface RiskContextType extends RiskState {
  refreshRisk: () => Promise<void>;
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
  const [tier, setTier] = useState<RiskTier>(5); // Optimistic default: Stable
  const [isLoading, setIsLoading] = useState(true);

  const getEnv = (key: string): string => {
    if (typeof window !== 'undefined') {
      const manual = window.localStorage.getItem(key);
      if (manual) return manual.trim();
    }
    return (process.env && process.env[key]) ? process.env[key]!.trim() : '';
  };

  const refreshRisk = async () => {
    const baseUrl = getEnv('NEXT_PUBLIC_XANO_BASE_URL');
    const alexToken = getEnv('NEXT_PUBLIC_ALEX_TOKEN');

    try {
      if (!baseUrl) throw new Error('No API');
      const response = await fetch(`${baseUrl}/highest_priority_risk`, {
        headers: { 'Authorization': `Bearer ${alexToken}` }
      });
      if (!response.ok) throw new Error('Fault');
      const data = await response.json();
      // Assume backend returns { risk_score: 1-5 }
      const newTier = (data.risk_score as RiskTier) || 5;
      setTier(newTier);
    } catch (e) {
      // Simulation mode for demo if backend not fully wired
      setTier(3); // Default to Elevated for visual impact in demo
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshRisk();
    const interval = setInterval(refreshRisk, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  // Dynamic Theme Injection
  useEffect(() => {
    const root = document.documentElement;
    const config = TIER_CONFIG[tier];
    root.style.setProperty('--risk-accent', config.color);
    root.style.setProperty('--risk-glow', `${config.color}33`); // 20% opacity
  }, [tier]);

  const value = {
    tier,
    ...TIER_CONFIG[tier],
    isLoading,
    refreshRisk
  };

  return <RiskContext.Provider value={value}>{children}</RiskContext.Provider>;
};

export const useRisk = () => {
  const context = useContext(RiskContext);
  if (!context) throw new Error('useRisk must be used within RiskProvider');
  return context;
};
