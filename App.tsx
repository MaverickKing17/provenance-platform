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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide global navbar on specialized internal workspace views
  const hideGlobalNav = ['/projects', '/materials', '/orders'].includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-brand-navy flex flex-col font-sans text-brand-offWhite selection:bg-brand-gold selection:text-brand-darkNavy">
      {!hideGlobalNav && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideGlobalNav && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/sourcing-hub" element={<Dashboard />} />
          <Route path="/network" element={<Network />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/:slug" element={<GenericPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;