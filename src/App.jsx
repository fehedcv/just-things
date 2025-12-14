import React, { useEffect } from 'react';
import Navbar from './components/NavbarSection.jsx';
import Footer from './components/Footer.jsx';
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
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Make globally accessible
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

  // 🚀 SCROLL TO TOP ON ROUTE CHANGE (LENIS SAFE)
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white antialiased">
      <Router>
        <Navbar />

        {/* 🔥 Handles Lenis + route scroll */}
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
  );
}

export default App;
