import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Aperture, Maximize, Focus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ShutterRevealSection = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const shutterTopRef = useRef(null);
  const shutterBottomRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const uiRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Determines how long the scroll takes
          pin: true,
          scrub: 1, // Smooth physics linkage
          anticipatePin: 1,
        }
      });

      // 1. The Shutter Open Animation
      tl.to(shutterTopRef.current, {
        yPercent: -100,
        ease: "power2.inOut",
        duration: 2
      }, "open")
      .to(shutterBottomRef.current, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 2
      }, "open");

      // 2. The Image Parallax (Zoom Out effect for depth)
      tl.fromTo(imageRef.current, 
        { scale: 1.3, filter: "grayscale(100%) blur(5px)" },
        { scale: 1, filter: "grayscale(0%) blur(0px)", duration: 2, ease: "power2.out" },
        "open"
      );

      // 3. Text Reveal (Scaling up as shutter opens)
      tl.fromTo(textRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" },
        "open+=0.5"
      );

      // 4. UI Elements Fade In
      tl.fromTo(uiRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }, 
        "open+=1"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Applied global font-sans (Inter)
    <div ref={containerRef} className="relative w-full h-screen bg-[#2F3E2F] overflow-hidden font-sans">
      
      {/* --- BACKGROUND IMAGE LAYER (Revealed) --- */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="/bg.jpg" 
          alt="Cinematic Photography" 
          className="w-full h-full object-cover"
        />
        {/* Film Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient(circle, transparent 40%, #000000 120%) opacity-60"></div>
      </div>

      {/* --- SHUTTER PANELS (The Mask) --- */}
      {/* Top Panel */}
      <div 
        ref={shutterTopRef}
        className="absolute top-0 left-0 w-full h-[50vh] bg-[#2F3E2F] z-20 flex items-end justify-center border-b border-[#E8E6E0]/10"
      >
        <div className="mb-4 text-[#A3B18A] flex flex-col items-center gap-2">
            {/* Label - Updated to Nav/Button Style */}
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em]">Locked</span>
            <div className="w-[1px] h-12 bg-[#A3B18A]"></div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div 
        ref={shutterBottomRef}
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#2F3E2F] z-20 flex items-start justify-center border-t border-[#E8E6E0]/10"
      >
         <div className="mt-4 text-[#A3B18A] flex flex-col items-center gap-2">
            <div className="w-[1px] h-12 bg-[#A3B18A]"></div>
            {/* Label - Updated to Nav/Button Style */}
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em]">Scroll</span>
        </div>
      </div>

      {/* --- CENTER CONTENT (Appears over image) --- */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div ref={textRef} className="text-center mix-blend-overlay">
           <div className="flex items-center justify-center gap-4 mb-4">
              <Minus className="text-[#E8E6E0]" />
              {/* Date Tag - Updated to Nav/Button Style */}
              <span className="text-[#E8E6E0] font-sans font-medium text-xs md:text-sm uppercase tracking-[0.4em]">Est. 2024</span>
              <Minus className="text-[#E8E6E0]" />
           </div>
           
           {/* Main Headline - Updated to Playfair Medium */}
           <h1 className="text-[15vw] md:text-[12vw] font-serif font-medium text-[#E8E6E0] leading-none tracking-tight opacity-90">
             CAPTURE
           </h1>
           
           {/* Subtitle - Updated to Body/Nav Style */}
           <p className="text-sm md:text-xl font-sans font-medium text-[#E8E6E0] uppercase tracking-[0.5em] mt-2 md:mt-4">
             The Untamed Light
           </p>
        </div>
      </div>

      {/* --- CAMERA HUD UI (Static Overlay) --- */}
      <div ref={uiRef} className="absolute inset-0 z-10 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
         
         {/* Top UI - Updated to Nav/Button Style (Inter, 0.25em tracking) */}
         <div className="flex justify-between items-start text-[#E8E6E0]/60 font-sans font-medium text-[10px] md:text-xs uppercase tracking-[0.25em]">
            <div className="flex gap-4 md:gap-8">
               <div className="flex items-center gap-2">
                  <Aperture size={14} className="text-[#A3B18A]" />
                  <span>F/1.8</span>
               </div>
               <span>ISO 400</span>
               <span>1/2000</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
               <span>REC</span>
            </div>
         </div>

         {/* Center Focus Brackets */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] border border-[#E8E6E0]/10">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#E8E6E0]/50"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#E8E6E0]/50"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#E8E6E0]/50"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#E8E6E0]/50"></div>
            
            {/* Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#A3B18A]/50">
               <Focus size={48} strokeWidth={1} />
            </div>
         </div>

         {/* Bottom UI - Updated to Nav/Button Style */}
         <div className="flex justify-between items-end text-[#E8E6E0]/60 font-sans font-medium text-[10px] md:text-xs uppercase tracking-[0.25em]">
            <div className="flex items-center gap-2">
               <Maximize size={14} />
               <span>Wide Angle</span>
            </div>
            <div className="text-right">
               <span className="block text-[#A3B18A]">4K / 60FPS</span>
               <span>RAW FORMAT</span>
            </div>
         </div>

      </div>

    </div>
  );
};

export default ShutterRevealSection;