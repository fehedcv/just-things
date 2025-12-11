import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Instagram, Twitter } from 'lucide-react';

const LandingHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline();

      // 1. Image Reveal (Curtain Effect)
      tl.to(overlayRef.current, {
        height: "0%",
        duration: 1.5,
        ease: "power4.inOut",
        delay: 0.2
      });

      // 2. Image slight zoom out (to settle)
      tl.from(imageRef.current, {
        scale: 1.2,
        duration: 2,
        ease: "power2.out"
      }, 0.2);

      // 3. Text Stagger Reveal
      tl.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, 0.8);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#2F3E2F] text-[#E8E6E0] font-sans relative overflow-hidden">
      
      {/* BACKGROUND GRAIN (Optional for texture) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")' }}></div>

      {/* MAIN CONTENT WRAPPER - Added pt-32 for Navbar clearance */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 h-full flex flex-col md:flex-row items-center justify-between relative z-10">

        {/* --- LEFT SIDE: TYPOGRAPHY --- */}
        <div ref={textRef} className="w-full md:w-1/2 flex flex-col gap-8 md:gap-12 z-20">
            
            {/* Top Tagline */}
            <div className="hero-text flex items-center gap-4">
               <span className="h-[1px] w-12 bg-[#A3B18A]"></span>
               <p className="text-[#A3B18A] uppercase tracking-[0.3em] text-xs font-bold">Est. 2024</p>
            </div>

            {/* Main Headline - Huge & Elegant */}
            <h1 className="hero-text text-6xl md:text-8xl lg:text-[7rem] font-serif leading-[0.9]">
              Visual <br/>
              <span className="italic text-[#A3B18A] ml-4 md:ml-12">Poetry</span> <br/>
              In Motion.
            </h1>

            {/* Subtext */}
            <p className="hero-text text-[#E8E6E0]/70 text-lg max-w-md leading-relaxed font-light ml-1 md:ml-2">
              We don't just take photos; we capture the unspoken energy of the moment. A minimal portfolio for the modern era.
            </p>

            {/* CTA Button */}
            <div className="hero-text pt-4">
              <button className="group flex items-center gap-4 px-8 py-4 bg-[#E8E6E0] text-[#2F3E2F] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#A3B18A] transition-all duration-300">
                View Gallery
                <ArrowDownRight size={18} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"/>
              </button>
            </div>

            {/* Social Proof / Footer of Hero */}
            <div className="hero-text mt-12 flex gap-6 text-[#A3B18A]">
               <Instagram size={20} className="hover:text-[#E8E6E0] cursor-pointer transition-colors" />
               <Twitter size={20} className="hover:text-[#E8E6E0] cursor-pointer transition-colors" />
               <span className="text-xs self-center border-l border-[#A3B18A]/30 pl-6 ml-2">Based in Kerala / Dubai</span>
            </div>
        </div>

        {/* --- RIGHT SIDE: HERO IMAGE (The Focal Point) --- */}
        <div className="w-full md:w-[45%] h-[50vh] md:h-[75vh] mt-12 md:mt-0 relative">
            
            {/* The Image Container */}
            <div className="w-full h-full relative overflow-hidden rounded-t-[100px] md:rounded-t-[200px] rounded-b-[4px]">
               
               {/* Reveal Overlay (The Curtain) */}
               <div ref={overlayRef} className="absolute inset-0 bg-[#A3B18A] z-20"></div>
               
               {/* The Image */}
               <img 
                 ref={imageRef}
                 src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop" 
                 alt="Hero Portrait" 
                 className="w-full h-full object-cover"
               />

               {/* Decorative Circle floating behind */}
               <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-[#E8E6E0]/20 rounded-full z-30 animate-spin-slow pointer-events-none"></div>
            </div>

            {/* Coordinates / Tech Detail */}
            <div className="absolute -right-8 bottom-24 rotate-90 origin-right hidden md:block">
               <p className="text-[10px] text-[#A3B18A] tracking-[0.5em] font-mono">SCROLL TO DISCOVER</p>
            </div>

        </div>

      </div>
    </div>
  );
};

export default LandingHero;