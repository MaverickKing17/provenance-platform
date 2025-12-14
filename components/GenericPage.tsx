import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

export const GenericPage: React.FC = () => {
  const location = useLocation();
  
  // Format the pathname into a readable title
  // e.g., "/terms-of-service" -> "Terms Of Service"
  const title = location.pathname
    .substring(1)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Page Not Found';

  return (
    <div className="min-h-screen bg-brand-navy pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl animate-fade-in-up">
        
        {/* Breadcrumb / Back Link */}
        <Link to="/" className="inline-flex items-center text-brand-gold hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Content Card */}
        <div className="bg-brand-darkNavy/50 border border-white/10 rounded-2xl p-8 sm:p-12 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 text-center sm:text-left">
                <div className="inline-flex items-center justify-center p-3 bg-brand-navy rounded-xl border border-white/5 mb-6 shadow-inner">
                    <Construction className="w-8 h-8 text-brand-gold" />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                    {title}
                </h1>
                
                <p className="text-brand-offWhite/70 text-lg leading-relaxed max-w-2xl mb-8">
                    This module of the Classic Homes Enterprise Platform is currently being updated for our v2.0 release. 
                    Full functionality for <strong>{title}</strong> will be available shortly.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="px-6 py-3 bg-brand-gold text-brand-darkNavy font-semibold rounded-md hover:bg-brand-goldHover transition-colors w-full sm:w-auto">
                        Contact Support
                    </button>
                    <button className="px-6 py-3 border border-white/20 text-brand-offWhite font-medium rounded-md hover:bg-white/5 transition-colors w-full sm:w-auto">
                        Download Documentation
                    </button>
                </div>
            </div>

            {/* Simulated Content Skeleton */}
            <div className="mt-12 space-y-4 opacity-30 select-none pointer-events-none grayscale">
                <div className="h-4 bg-brand-mutedGray rounded w-3/4"></div>
                <div className="h-4 bg-brand-mutedGray rounded w-full"></div>
                <div className="h-4 bg-brand-mutedGray rounded w-5/6"></div>
                <div className="h-4 bg-brand-mutedGray rounded w-2/3"></div>
            </div>
        </div>
      </div>
    </div>
  );
};