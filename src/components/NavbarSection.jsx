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

  // --- 1. SMART SCROLL LOGIC ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // A. Animation to Hide/Show the Navbar
      const showAnim = gsap.from(navRef.current, { 
        yPercent: -100, 
        paused: true,
        duration: 0.3,
        ease: "power2.out"
      }).progress(1);

      // B. The Scroll Watcher
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (isMenuOpen) return;
          if (self.direction === 1 && self.scroll() > 50) {
             showAnim.reverse();
          } else {
             showAnim.play();
          }
        }
      });

      // C. Glass Effect & Padding
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
  }, [isMenuOpen]); 

  // --- 2. MOBILE MENU ANIMATION ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        // --- OPEN ANIMATION ---
        document.body.style.overflow = 'hidden'; 

        const tl = gsap.timeline();

        // 1. Expand the Circle Background
        tl.to(menuRef.current, {
          clipPath: "circle(150% at calc(100% - 3rem) 3rem)",
          duration: 1,
          ease: "power4.inOut",
        });

        // 2. Stagger in Links
        tl.fromTo(".mobile-link-item", 
          { y: 100, opacity: 0, skewY: 5 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.5" 
        );

        // 3. Fade in Footer/Decor
        tl.fromTo(".menu-footer", 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.6"
        );

      } else {
        // --- CLOSE ANIMATION ---
        document.body.style.overflow = ''; 

        gsap.to(menuRef.current, {
          clipPath: "circle(0% at calc(100% - 3rem) 3rem)",
          duration: 0.8,
          ease: "power4.inOut",
        });
      }
    });
    return () => ctx.revert();
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <nav 
        ref={navRef} 
        className="fixed top-0 left-0 w-full z-[100] px-6 py-8 md:px-12 transition-all will-change-transform font-sans"
      >
        {/* Glass Background */}
        <div 
          ref={bgRef} 
          className="absolute inset-0 bg-[#2F3E2F]/90 border-b border-transparent opacity-0 transition-colors pointer-events-none"
        ></div>

        <div className="relative z-10 flex items-center justify-between">
            
            {/* Logo - Updated to Playfair Medium (H2 style equivalent) */}
            <a href="/" className="text-2xl font-serif font-medium text-[#E8E6E0] tracking-widest z-50 mix-blend-difference">
              JUST-THINGS
            </a>

            {/* Desktop Links - Updated to Nav Style (Inter, 12px, 0.25em tracking) */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                 <a 
                   key={link} 
                   href={getLinkHref(link)} 
                   className="text-xs font-medium font-sans text-[#E8E6E0]/80 hover:text-[#A3B18A] transition-colors uppercase tracking-[0.25em] relative group"
                 >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A3B18A] transition-all duration-300 group-hover:w-full"></span>
                 </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              {/* Desktop CTA - Updated to Button Style */}
             <a
              href="#contact"
              className="
                hidden md:block relative overflow-hidden group 
                px-8 py-3 
                bg-[#E8E6E0] 
                text-[#2F3E2F] 
                text-xs font-medium font-sans uppercase tracking-[0.25em] 
                rounded-[2px] 
                transition-all duration-300
              "
            >
              <span className="relative z-10 group-hover:text-[#2F3E2F] transition-colors duration-300">
                Inquire
              </span>
              <span className="absolute inset-0 bg-[#A3B18A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]"></span>
            </a>

              {/* Mobile Hamburger Button */}
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
      <div 
          ref={menuRef}
          className="fixed inset-0 z-[90] bg-[#2F3E2F] flex flex-col justify-center items-center overflow-hidden font-sans"
          style={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }} 
      >
          
          {/* Background Decor - Updated to Playfair Medium */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
             <h1 className="text-[120vw] md:text-[30vw] font-serif font-medium text-[#E8E6E0] rotate-90 md:rotate-0 leading-none">
                MENU
             </h1>
          </div>

          {/* --- NAVIGATION LINKS CONTAINER --- */}
          <div className="flex flex-col items-center gap-6 relative z-10 w-full px-6">
            
             {navLinks.map((link, i) => (
               <div key={link} className="overflow-hidden">
                  {/* Mobile Links - Keep Serif for emotion, Medium weight */}
                  <a 
                     href={getLinkHref(link)}
                     onClick={handleLinkClick}
                     className="mobile-link-item block text-5xl md:text-7xl font-serif font-medium text-[#E8E6E0] hover:text-[#A3B18A] hover:italic transition-all duration-300 text-center py-2"
                  >
                     {link}
                  </a>
               </div>
             ))}
             
             {/* Mobile CTA - Updated to Button Style */}
             <div className="overflow-hidden mt-10 w-full max-w-xs flex justify-center">
                <a 
                   href="#contact" 
                   onClick={handleLinkClick}
                   className="mobile-link-item group flex items-center gap-3 px-8 py-4 border border-[#E8E6E0]/20 rounded-full text-[#E8E6E0] text-xs font-sans font-medium uppercase tracking-[0.25em] hover:bg-[#E8E6E0] hover:text-[#2F3E2F] transition-all duration-300"
                >
                   <span>Start Project</span>
                   <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform"/>
                </a>
             </div>

          </div>

          {/* --- FOOTER INFO --- */}
          <div className="menu-footer absolute bottom-10 left-0 w-full text-center">
             {/* Updated to Nav/Body style (Inter, 0.25em tracking) */}
             <p className="text-[#E8E6E0]/40 text-xs font-sans font-medium uppercase tracking-[0.25em] mb-2">
                Based in Kerala, India
             </p>
             <div className="flex justify-center gap-6 text-[#A3B18A] text-xs font-sans font-medium uppercase tracking-[0.25em]">
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