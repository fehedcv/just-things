import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { ArrowRight, Smile, Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = forwardRef((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Refs for mobile menu animation
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const menuTimeline = useRef(null);

  // Toggle Menu Function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Scroll (Background Change & Progress Bar)
  useEffect(() => {
    const handleScroll = () => {
      // 1. Change Background on Scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animation for Mobile Menu (Drawer Effect)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize timeline (paused initially)
      menuTimeline.current = gsap.timeline({ paused: true });

      menuTimeline.current
        .to(mobileMenuRef.current, {
          x: '0%',
          duration: 0.8,
          ease: 'power4.inOut', // Extra smooth easing
        })
        .fromTo(mobileLinksRef.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
          "-=0.4"
        );

    });

    return () => ctx.revert();
  }, []);

  // Play/Reverse animation based on state
  useEffect(() => {
    if (menuTimeline.current) {
      if (isMenuOpen) {
        menuTimeline.current.play();
      } else {
        menuTimeline.current.reverse();
      }
    }
  }, [isMenuOpen]);

  const navLinks = ['Home', 'Portfolio', 'Services', 'About'];

  return (
    <>
      <nav 
        ref={ref} 
        className={`w-full px-6 md:px-12 py-6 flex items-center justify-between z-50 fixed top-0 left-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/70 backdrop-blur-md border-b border-white/10 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        {/* Logo Section */}
        <div className="flex flex-col leading-none group cursor-pointer z-50 relative">
          <span className="text-white font-bold text-xl tracking-[0.2em]">Just things</span>
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href="#" 
              className="relative group overflow-hidden text-gray-400 hover:text-white transition-colors pb-1"
            >
              {item}
              {/* Smooth Underline Animation */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00D2BE] transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTA Buttons & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50 relative">
          <button className="hidden md:block px-6 py-2 bg-white/5 text-white border border-white/10 rounded-full text-sm hover:bg-white hover:text-black transition-all">
            Contact
          </button>
          
          <button className="w-10 h-10 bg-[#00D2BE] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
            <ArrowRight size={18} className="-rotate-45" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white hover:text-[#00D2BE] transition-colors z-50"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* --- SCROLL PROGRESS BAR --- */}
        <div 
            className="absolute bottom-0 left-0 h-[2px] bg-[#00D2BE] transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
        ></div>

      </nav>

      {/* --- MOBILE MENU DRAWER --- */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col items-center justify-center translate-x-full will-change-transform"
      >
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00D2BE] blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="flex flex-col items-center gap-8 text-4xl font-bold text-white uppercase tracking-widest z-10">
          {navLinks.map((item, index) => (
            <a 
              key={item} 
              href="#" 
              ref={el => mobileLinksRef.current[index] = el}
              className="relative group hover:text-[#00D2BE] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
               {/* Underline for Mobile too */}
               <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#00D2BE] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
           
           {/* Mobile Contact Link */}
           <div ref={el => mobileLinksRef.current[navLinks.length] = el}>
             <a 
                href="#" 
                className="text-lg font-normal text-gray-400 mt-8 block border border-white/20 px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Get in Touch
              </a>
           </div>
        </div>
      </div>
    </>
  );
});

export default Navbar;