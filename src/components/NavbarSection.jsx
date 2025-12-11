import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const bgRef = useRef(null);

  const navLinks = ['Home', 'Portfolio', 'Services', 'About'];

  // Helper function to determine the link href
  const getLinkHref = (link) => {
    return link === 'Home' ? '/' : `#${link}`;
  };

  // --- 1. DESKTOP SCROLL EFFECT (Glass Blur) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "100px",
          scrub: true,
        },
        opacity: 1,
        backdropFilter: "blur(12px)",
        borderBottomColor: "rgba(232, 230, 224, 0.1)",
      });
      
      gsap.to(navRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "100px",
          scrub: true,
        },
        paddingTop: "1.2rem",
        paddingBottom: "1.2rem",
      });
    });
    return () => ctx.revert();
  }, []);

  // --- 2. MOBILE MENU ANIMATION (Circular Reveal) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        // --- OPEN ANIMATION ---
        document.body.style.overflow = 'hidden'; // Lock Scroll

        const tl = gsap.timeline();

        // 1. Expand the Circle Background
        tl.to(menuRef.current, {
          clipPath: "circle(150% at calc(100% - 3rem) 3rem)", // Expands from top-right
          duration: 1,
          ease: "power4.inOut",
        });

        // 2. Stagger in Links (Slide Up + Fade)
        tl.fromTo(".mobile-link-item", 
          { y: 100, opacity: 0, skewY: 5 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.5" // Start before background finishes
        );

        // 3. Fade in Footer/Decor
        tl.fromTo(".menu-footer", 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.6"
        );

      } else {
        // --- CLOSE ANIMATION ---
        document.body.style.overflow = ''; // Unlock Scroll

        // Collapse the Circle
        gsap.to(menuRef.current, {
          clipPath: "circle(0% at calc(100% - 3rem) 3rem)",
          duration: 0.8,
          ease: "power4.inOut",
        });
      }
    });
    return () => ctx.revert();
  }, [isMenuOpen]);

  // Handle Link Click on Mobile (Close menu)
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* --- MAIN NAVBAR (Fixed Top) --- */}
      <nav 
        ref={navRef} 
        className="fixed top-0 left-0 w-full z-[100] px-6 py-8 md:px-12 transition-all"
      >
        {/* Glass Background (Visible on Scroll) */}
        <div 
          ref={bgRef} 
          className="absolute inset-0 bg-[#2F3E2F]/90 border-b border-transparent opacity-0 transition-colors pointer-events-none"
        ></div>

        <div className="relative z-10 flex items-center justify-between">
           
           {/* Logo */}
           <a href="/" className="text-2xl font-serif font-bold text-[#E8E6E0] tracking-widest z-50 mix-blend-difference">
              JUST-THINGS
           </a>

           {/* Desktop Links */}
           <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                 <a 
                    key={link} 
                    href={getLinkHref(link)} 
                    className="text-sm font-medium text-[#E8E6E0]/80 hover:text-[#A3B18A] transition-colors uppercase tracking-widest relative group"
                 >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A3B18A] transition-all duration-300 group-hover:w-full"></span>
                 </a>
              ))}
           </div>

           {/* Right Actions */}
           <div className="flex items-center gap-6">
              {/* Desktop CTA */}
              <a 
                 href="#contact"
                 className="hidden md:block px-8 py-3 bg-[#E8E6E0] text-[#2F3E2F] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#A3B18A] hover:text-[#2F3E2F] transition-all duration-300"
              >
                 Inquire
              </a>

              {/* Mobile Hamburger Button */}
              {/* Z-Index ensures it stays above the open menu */}
              <button 
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className="md:hidden text-[#E8E6E0] hover:text-[#A3B18A] transition-colors z-[110] relative p-2"
              >
                 {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
           </div>
        </div>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      {/* 1. fixed inset-0 z-[90]: Covers entire screen, sits below navbar button but above page content.
          2. clipPath: Controlled by GSAP for the circular reveal.
          3. bg-[#2F3E2F]: Solid dark green theme color.
      */}
      <div 
         ref={menuRef}
         className="fixed inset-0 z-[90] bg-[#2F3E2F] flex flex-col justify-center items-center overflow-hidden"
         style={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }} 
      >
         
         {/* Background Decor (Giant Text) */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <h1 className="text-[120vw] md:text-[30vw] font-black text-[#E8E6E0] rotate-90 md:rotate-0 leading-none">
               MENU
            </h1>
         </div>

         {/* --- NAVIGATION LINKS CONTAINER --- */}
         <div className="flex flex-col items-center gap-6 relative z-10 w-full px-6">
            
            {navLinks.map((link, i) => (
               // Wrapper for overflow hidden allows the "slide up" effect
               <div key={link} className="overflow-hidden">
                  <a 
                     href={getLinkHref(link)}
                     onClick={handleLinkClick}
                     className="mobile-link-item block text-5xl md:text-7xl font-serif text-[#E8E6E0] hover:text-[#A3B18A] hover:italic transition-all duration-300 text-center py-2"
                  >
                     {link}
                  </a>
               </div>
            ))}
            
            {/* Mobile CTA */}
            <div className="overflow-hidden mt-10 w-full max-w-xs flex justify-center">
               <a 
                  href="#contact" 
                  onClick={handleLinkClick}
                  className="mobile-link-item group flex items-center gap-3 px-8 py-4 border border-[#E8E6E0]/20 rounded-full text-[#E8E6E0] text-sm font-bold uppercase tracking-widest hover:bg-[#E8E6E0] hover:text-[#2F3E2F] transition-all duration-300"
               >
                  <span>Start Project</span>
                  <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform"/>
               </a>
            </div>

         </div>

         {/* --- FOOTER INFO --- */}
         <div className="menu-footer absolute bottom-10 left-0 w-full text-center">
            <p className="text-[#E8E6E0]/40 text-xs font-mono uppercase tracking-widest mb-2">
               Based in Kerala, India
            </p>
            <div className="flex justify-center gap-6 text-[#A3B18A] text-sm font-bold">
               <a href="#">Instagram</a>
               <a href="#">Twitter</a>
               <a href="#">LinkedIn</a>
            </div>
         </div>

      </div>
    </>
  );
};

export default ModernNavbar;