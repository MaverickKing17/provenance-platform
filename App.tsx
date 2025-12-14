import React from 'react';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-navy flex flex-col font-sans text-brand-offWhite selection:bg-brand-gold selection:text-brand-darkNavy">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default App;