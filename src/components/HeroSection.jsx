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
    // Applied font-sans (Inter) as the global default for the container
    <div ref={containerRef} className="min-h-screen w-full bg-[#2F3E2F] text-[#E8E6E0] font-sans relative overflow-hidden">
      
      {/* BACKGROUND GRAIN */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")' }}></div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 h-full flex flex-col md:flex-row items-center justify-between relative z-10">

        {/* --- LEFT SIDE: TYPOGRAPHY --- */}
        <div ref={textRef} className="w-full md:w-1/2 flex flex-col gap-8 md:gap-12 z-20">
            
            {/* Top Tagline - Updated to Nav/Button style (Inter, 0.25em tracking) */}
            <div className="hero-text flex items-center gap-4">
               <span className="h-[1px] w-12 bg-[#A3B18A]"></span>
               <p className="text-[#A3B18A] font-sans uppercase tracking-[0.25em] text-xs font-medium">Est. 2025</p>
            </div>

            {/* Main Headline - Updated to H1 style (Playfair, Weight 500) */}
            <h1 className="hero-text font-serif font-medium text-6xl md:text-8xl lg:text-[7rem] leading-[0.9]">
              Visual <br/>
              <span className="italic text-[#A3B18A] ml-4 md:ml-12">Poetry</span> <br/>
              In Motion.
            </h1>

            {/* Subtext - Updated to Body P style (Inter, 16px, Weight 400) */}
            <p className="hero-text text-[#E8E6E0]/70 font-sans text-base font-normal max-w-md leading-relaxed ml-1 md:ml-2">
              We don't just take photos; we capture the unspoken energy of the moment. A minimal portfolio for the modern era.
            </p>

         <div className="hero-text pt-4">
  <button 
    className="
      group relative overflow-hidden 
      px-9 py-4 
      bg-[#E8E6E0] 
      text-[#2F3E2F] 
      rounded-full 
      transition-all duration-300 
      hover:scale-[1.02] hover:shadow-xl
    "
  >
    {/* 1. Background Fill */}
    <span className="absolute inset-0 bg-[#A3B18A] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.23,1,0.32,1]"></span>

    {/* 2. Content Wrapper - Updated to Button style (Inter, 0.25em tracking, Uppercase) */}
    <span className="relative z-10 flex items-center gap-4">
      
      <span className="font-sans font-medium uppercase tracking-[0.25em] text-xs">
        View Gallery
      </span>

      {/* 3. The Arrow Exchange Animation */}
      <span className="relative w-5 h-5 overflow-hidden">
        <ArrowDownRight 
          size={20} 
          className="absolute top-0 left-0 transition-all duration-300 group-hover:translate-x-full group-hover:translate-y-full" 
        />
        <ArrowDownRight 
          size={20} 
          className="absolute top-0 left-0 -translate-x-full -translate-y-full transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0" 
        />
      </span>

    </span>
  </button>
</div>

            {/* Social Proof - Small text follows body font-sans */}
            <div className="hero-text mt-12 flex gap-6 text-[#A3B18A]">
               <Instagram size={20} className="hover:text-[#E8E6E0] cursor-pointer transition-colors" />
               <Twitter size={20} className="hover:text-[#E8E6E0] cursor-pointer transition-colors" />
               <span className="font-sans text-xs self-center border-l border-[#A3B18A]/30 pl-6 ml-2">Based in Kerala / Dubai</span>
            </div>
        </div>

        {/* --- RIGHT SIDE: HERO IMAGE --- */}
        <div className="w-full md:w-[45%] h-[50vh] md:h-[75vh] mt-12 md:mt-0 relative">
            
            {/* The Image Container */}
            <div className="w-full h-full relative overflow-hidden rounded-t-[100px] md:rounded-t-[200px] rounded-b-[4px]">
               
               {/* Reveal Overlay */}
               <div ref={overlayRef} className="absolute inset-0 bg-[#A3B18A] z-20"></div>
               
               {/* The Image */}
               <img 
                 ref={imageRef}
                 src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop" 
                 alt="Hero Portrait" 
                 className="w-full h-full object-cover"
               />

               {/* Decorative Circle */}
               <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-[#E8E6E0]/20 rounded-full z-30 animate-spin-slow pointer-events-none"></div>
            </div>

            {/* Coordinates - Updated to Nav/Button style */}
            <div className="absolute -right-8 bottom-24 rotate-90 origin-right hidden md:block">
               <p className="text-[10px] text-[#A3B18A] font-sans tracking-[0.25em] uppercase">SCROLL TO DISCOVER</p>
            </div>

        </div>

      </div>
    </div>
  );
};

export default LandingHero;