import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { GenericPage } from './components/GenericPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-brand-navy flex flex-col font-sans text-brand-offWhite selection:bg-brand-gold selection:text-brand-darkNavy">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            {/* Catch-all route for footer pages */}
            <Route path="/:slug" element={<GenericPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;