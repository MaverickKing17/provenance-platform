import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { GenericPage } from './components/GenericPage';
import { Dashboard } from './components/Dashboard';
import { Network } from './components/Network';
import { Projects } from './components/Projects';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Don't show the global navbar on the Projects page as it has its own professional sidebar
  const showNavbar = location.pathname !== '/projects';
  
  return (
    <div className="min-h-screen bg-brand-navy flex flex-col font-sans text-brand-offWhite selection:bg-brand-gold selection:text-brand-darkNavy">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {showNavbar && <Footer />}
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
          <Route path="/:slug" element={<GenericPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;