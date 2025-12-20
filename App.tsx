
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { GenericPage } from './components/GenericPage';
import { Dashboard } from './components/Dashboard';
import { Network } from './components/Network';
import { Projects } from './components/Projects';
import { Materials } from './components/Materials';
import { Orders } from './components/Orders';
import { Analytics } from './components/Analytics';
import { WalletPage } from './components/Wallet';
import { SettingsPage } from './components/Settings';
import { Unauthorized } from './components/Unauthorized';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ExecutiveAlertBanner } from './components/ExecutiveAlertBanner';
import { ExecutiveCommandCenter } from './components/ExecutiveCommandCenter';
import { ExecutiveReport } from './components/ExecutiveReport';
import { SupplierOnboarding } from './components/SupplierOnboarding';
import { RiskProvider } from './context/RiskContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const internalRoutes = [
    '/projects', 
    '/materials', 
    '/orders', 
    '/network', 
    '/analytics', 
    '/sourcing-hub', 
    '/wallet', 
    '/settings', 
    '/unauthorized',
    '/executive-command',
    '/executive-report',
    '/onboarding'
  ];
  const hideGlobalNav = internalRoutes.includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-brand-navy flex flex-col font-sans text-brand-offWhite selection:bg-brand-gold selection:text-brand-darkNavy">
      <ExecutiveAlertBanner />
      
      <div className="relative flex-grow flex flex-col">
        {!hideGlobalNav && <Navbar />}
        <main className="flex-grow">
          {children}
        </main>
        {!hideGlobalNav && <Footer />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <RiskProvider>
        <ErrorBoundary>
          <Layout>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/sourcing-hub" element={<Dashboard />} />
              <Route path="/network" element={<Network />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/executive-command" element={<ExecutiveCommandCenter />} />
              <Route path="/executive-report" element={<ExecutiveReport />} />
              <Route path="/onboarding" element={<SupplierOnboarding />} />
              <Route path="/:slug" element={<GenericPage />} />
            </Routes>
          </Layout>
        </ErrorBoundary>
      </RiskProvider>
    </Router>
  );
};

export default App;
