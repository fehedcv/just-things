import React, { useEffect, useState } from 'react';
import Navbar from './components/NavbarSection.jsx';
import Footer from './components/Footer.jsx';
import Preloader from './components/Preloader.jsx'; // Make sure path is correct

import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Service from './pages/Services.jsx';
import AboutPage from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

/* 🔁 SCROLL MANAGER */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // --- LENIS SETUP ---
    const lenis = new Lenis({
      duration: 1.5, // Slightly faster for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    // --- CONNECT LENIS TO GSAP ---
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // 🚀 SCROLL TO TOP ON ROUTE CHANGE
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    // Base background color #2F3E2F to match theme
    <div className="w-full min-h-screen bg-[#2F3E2F] text-[#E8E6E0] antialiased font-sans overflow-x-hidden">
      
      {/* 1. PRELOADER */}
      {/* Only removes from DOM when loading is fully done */}
      {isLoading && (
        <Preloader onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* 2. MAIN APP CONTENT */}
      {/* CRITICAL: 
          We render the Router immediately but keep it hidden/transparent.
          This forces the browser to fetch images/videos in the background.
      */}
      <div 
        className={`transition-opacity duration-1000 ease-out ${
          isLoading ? 'opacity-0 h-screen overflow-hidden pointer-events-none' : 'opacity-100'
        }`}
      >
        <Router>
          <Navbar />
          <ScrollManager />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Service />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;