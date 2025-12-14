import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Clapperboard, Wand2, Plane, Moon, Film, 
  Settings, BatteryMedium, Mic
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    mode: "CINEMA",
    title: "Cinematic Edits",
    icon: <Clapperboard />,
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    desc: "Narrative-driven storytelling.",
    meta: { iso: "800", shutter: "1/48", fstop: "f/2.8", fps: "24fps" }
  },
  {
    id: "02",
    mode: "PORTRAIT",
    title: "Retouching",
    icon: <Wand2 />,
    img: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop",
    desc: "High-end skin & color grading.",
    meta: { iso: "100", shutter: "1/200", fstop: "f/1.4", fps: "RAW" }
  },
  {
    id: "03",
    mode: "AERIAL",
    title: "Drone Visuals",
    icon: <Plane />,
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop",
    desc: "Aerial perspectives.",
    meta: { iso: "200", shutter: "1/1000", fstop: "f/5.6", fps: "60fps" }
  },
  {
    id: "04",
    mode: "NIGHT",
    title: "Night Mode",
    icon: <Moon />,
    img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
    desc: "Low light mastery.",
    meta: { iso: "12800", shutter: "1/60", fstop: "f/1.2", fps: "30fps" }
  },
  {
    id: "05",
    mode: "SOCIAL",
    title: "Viral Reels",
    icon: <Film />,
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    desc: "Short-form impact.",
    meta: { iso: "400", shutter: "1/120", fstop: "f/4.0", fps: "9:16" }
  }
];

const ViewfinderLayout = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const audioLeftRef = useRef(null);
  const audioRightRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeCode, setTimeCode] = useState("00:00:00:00");
  
  const activeService = services[activeIndex];

  // --- 1. AUDIO VISUALIZER ANIMATION ---
  useEffect(() => {
    if (!audioLeftRef.current || !audioRightRef.current) return;

    const animateBars = (element, delay) => {
        gsap.to(element, {
            height: "random(10, 100)%", 
            duration: 0.15, 
            ease: "power1.inOut",
            repeat: -1, 
            yoyo: true, 
            delay: delay
        });
    };

    animateBars(audioLeftRef.current, 0);
    animateBars(audioRightRef.current, 0.05);

    return () => {
        gsap.killTweensOf([audioLeftRef.current, audioRightRef.current]);
    };
  }, []);

  // --- 2. GSAP IMAGE TRANSITION ---
  useLayoutEffect(() => {
    if (!imageRef.current) return;

    gsap.killTweensOf(imageRef.current);

    gsap.fromTo(imageRef.current,
      { 
        opacity: 0, 
        scale: 1.05, 
        filter: "blur(8px)" 
      },
      { 
        opacity: 1, 
        scale: 1, 
        filter: "blur(0px)", 
        duration: 0.6, 
        ease: "power2.out" 
      }
    );
  }, [activeIndex]);

  // --- 3. SCROLL TRIGGER LOGIC ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=3000", 
              pin: true,
              scrub: 0.5,
              snap: {
                snapTo: 1 / (services.length - 1), 
                duration: { min: 0.1, max: 0.3 },
                delay: 0.0,
                ease: "power1.inOut"
              },
              onUpdate: (self) => {
                const newIndex = Math.round(self.progress * (services.length - 1));
                setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
              }
            }
          });
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeCode(now.toLocaleTimeString('en-US', { hour12: false }) + ":12");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Applied global font-sans (Inter)
    <section 
      ref={containerRef} 
      className="bg-[#2F3E2F] text-[#E8E6E0] font-sans w-full min-h-screen lg:h-screen flex flex-col justify-center relative py-12 lg:py-0 overflow-hidden"
    >
      
      {/* Header */}
      <div className="lg:absolute lg:top-12 lg:left-0 w-full px-6 md:px-12 flex items-center justify-between z-20 mb-8 lg:mb-0">
         <div>
            {/* Tag - Updated to Nav/Button Style */}
            <span className="text-[#A3B18A] font-sans font-medium text-xs uppercase tracking-[0.25em] block mb-2">Interface</span>
            {/* Heading - Updated to Playfair Medium */}
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#E8E6E0]">Live <span className="italic text-[#A3B18A]">View</span></h2>
         </div>
         {/* Hint - Updated to Nav/Button Style */}
         <div className="hidden lg:flex items-center gap-2 text-[#E8E6E0]/40 font-sans font-medium text-xs uppercase tracking-[0.25em] animate-pulse">
            <Settings size={14} />
            <span>Scroll to Switch Mode</span>
         </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center h-full lg:pt-20">
         
         {/* --- RIGHT: THE VIEWFINDER --- */}
         <div className="w-full lg:w-2/3 order-1 lg:order-2">
            <div className="relative w-full aspect-video bg-black rounded-[4px] overflow-hidden border border-[#E8E6E0]/20 shadow-2xl">
               
               {/* DYNAMIC IMAGE */}
               <div className="absolute inset-0 z-0 bg-black">
                  <img 
                     ref={imageRef}
                     src={activeService.img} 
                     alt={activeService.title} 
                     className="w-full h-full object-cover opacity-90"
                  />
               </div>

               {/* CAMERA HUD */}
               <div className="absolute inset-0 z-10 p-4 md:p-8 flex flex-col justify-between pointer-events-none">
                  
                  {/* Top Info - Updated to Nav/Button Style (Inter, 0.25em tracking) */}
                  <div className="flex justify-between items-start text-[#E8E6E0] font-sans font-medium text-[10px] md:text-xs uppercase tracking-[0.25em]">
                     <div className="flex gap-3 md:gap-6 items-center">
                        <span className="bg-[#A3B18A] text-[#2F3E2F] px-1 rounded-sm">REC</span>
                        <span>{timeCode}</span>
                        <span>{activeService.meta.fps}</span>
                     </div>
                     <div className="flex gap-4 items-center">
                        <BatteryMedium size={16} />
                        <span className="text-[#E8E6E0]/50">A001_C{activeService.id}</span>
                     </div>
                  </div>

                  {/* Focus Brackets */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 border border-[#E8E6E0]/40 flex items-center justify-center opacity-60">
                     <div className="w-2 h-2 border border-[#A3B18A] rounded-full"></div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="flex justify-between items-end text-[#E8E6E0]">
                     <div className="flex gap-3 md:gap-8 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
                        <div className="flex flex-col">
                           {/* Labels - Updated to Nav Style */}
                           <span className="text-[#A3B18A] font-sans font-medium text-[8px] uppercase tracking-[0.25em]">ISO</span>
                           <span className="font-sans font-medium text-xs tracking-[0.1em]">{activeService.meta.iso}</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[#A3B18A] font-sans font-medium text-[8px] uppercase tracking-[0.25em]">FPS</span>
                           <span className="font-sans font-medium text-xs tracking-[0.1em]">{activeService.meta.fps}</span>
                        </div>
                     </div>

                     {/* --- LIVE AUDIO METERS --- */}
                     <div className="flex gap-1 h-8 items-end">
                        <div className="w-1 bg-[#E8E6E0]/20 h-full relative overflow-hidden rounded-full">
                           <div ref={audioLeftRef} className="absolute bottom-0 w-full bg-[#A3B18A]" style={{ height: "30%" }}></div>
                        </div>
                        <div className="w-1 bg-[#E8E6E0]/20 h-full relative overflow-hidden rounded-full">
                           <div ref={audioRightRef} className="absolute bottom-0 w-full bg-[#A3B18A]" style={{ height: "50%" }}></div>
                        </div>
                        <Mic size={12} className="text-[#E8E6E0]/50 ml-1" />
                     </div>

                  </div>
               </div>

               {/* Rec Dot */}
               <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20">
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full animate-pulse"></div>
               </div>
            </div>
         </div>

         {/* --- LEFT: MENU CONTROLS --- */}
         <div className="w-full lg:w-1/3 order-2 lg:order-1">
            <div className="flex flex-col gap-2 relative">
               
               <div className="hidden lg:block absolute left-[27px] top-0 bottom-0 w-[1px] bg-[#E8E6E0]/10"></div>

               {services.map((service, index) => (
                  <button
                     key={service.id}
                     onClick={() => setActiveIndex(index)}
                     className={`
                        group relative flex items-center gap-4 lg:gap-6 p-4 rounded-[2px] transition-all duration-300 w-full text-left
                        ${index === activeIndex 
                           ? 'bg-[#E8E6E0]/5 lg:bg-transparent opacity-100 lg:translate-x-4 border border-[#E8E6E0]/10 lg:border-none' 
                           : 'opacity-50 lg:opacity-30 hover:opacity-100 border border-transparent'}
                     `}
                  >
                     <div className={`
                        hidden lg:block absolute left-[-20px] w-2 h-2 rounded-full transition-colors duration-300 z-10
                        ${index === activeIndex ? 'bg-[#A3B18A] scale-125' : 'bg-[#E8E6E0]/20'}
                     `}></div>

                     <div className={`transition-colors duration-300 ${index === activeIndex ? 'text-[#A3B18A]' : 'text-[#E8E6E0]'}`}>
                        {React.cloneElement(service.icon, { size: 24 })}
                     </div>

                     <div>
                        {/* Mode - Updated to Nav/Button Style */}
                        <span className="block text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#E8E6E0]/60 mb-1">
                           {service.mode}
                        </span>
                        {/* Title - Updated to Playfair Medium */}
                        <h3 className="text-lg lg:text-xl font-serif font-medium leading-none text-[#E8E6E0]">
                           {service.title}
                        </h3>
                     </div>
                  </button>
               ))}
            </div>
         </div>

      </div>
    </section>
  );
};

export default ViewfinderLayout;