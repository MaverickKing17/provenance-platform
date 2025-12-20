
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { useRisk, OnboardingPayload } from '../context/RiskContext';
import { useNavigate } from 'react-router-dom';

export const ExecutiveToast: React.FC = () => {
  const { activeNotification, clearNotification } = useRisk();
  const navigate = useNavigate();

  const handleAssign = () => {
    // Simulated API call to 'Agentic Resolve' engine
    console.log("Triggering Agentic Resolve for material gaps...");
    navigate('/executive-command', { 
      state: { 
        triggerResolve: true, 
        material: activeNotification?.material_category 
      } 
    });
    clearNotification();
  };

  if (!activeNotification) return null;

  return (
    <AnimatePresence>
      {activeNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-10 right-10 z-[1000] w-[450px] bg-brand-darkNavy border border-white/10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden gold-shimmer-border"
        >
          <div className="p-8 relative">
            <button 
              onClick={clearNotification}
              className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-start space-x-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-brand-emerald/20 blur-xl rounded-full animate-pulse-slow"></div>
                <div className="relative w-16 h-16 bg-white/5 border border-brand-emerald/30 rounded-2xl flex items-center justify-center">
                  <Award className="text-brand-emerald animate-pulse" size={32} />
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                <div>
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Asset Secured</span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
                    {activeNotification.supplier_name}
                  </h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{activeNotification.material_category}</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                    <div className="flex items-center space-x-1.5 text-brand-success">
                      <CheckCircle2 size={12} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Score: {activeNotification.compliance_score}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Strategy Context</p>
                  <p className="text-xs text-brand-offWhite/80 leading-relaxed font-medium">
                    {activeNotification.project_relevance}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <a 
                    href="https://polygonscan.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-[9px] font-black text-brand-emerald uppercase tracking-[0.25em] hover:text-white transition-colors group"
                  >
                    <ExternalLink size={12} className="group-hover:scale-110 transition-transform" />
                    <span>Home Passport Credentials</span>
                  </a>
                  
                  <button 
                    onClick={handleAssign}
                    className="flex items-center space-x-3 px-6 py-3 bg-brand-gold text-brand-darkNavy rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl shadow-brand-gold/10"
                  >
                    <Zap size={14} className="fill-brand-darkNavy" />
                    <span>Assign to Project</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-1 w-full bg-white/5 relative overflow-hidden">
             <motion.div 
               className="h-full bg-brand-gold"
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 10, ease: "linear" }}
               onAnimationComplete={clearNotification}
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
