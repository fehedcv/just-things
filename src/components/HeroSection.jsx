import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RoelZoomOutHero = () => {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const textWrapperRef = useRef(null);
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      tl
        .to([textWrapperRef.current, navRef.current], {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power1.out"
        }, 0)
        .fromTo(galleryRef.current, 
          { scale: 3.5, x: 0, y: 0 }, 
          { scale: 1, duration: 2, ease: "power2.inOut" }
        , 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);
    
  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0A0A0A] text-white font-sans">
      
      {/* --- GALLERY SECTION --- */}
      <div 
        ref={galleryRef} 
        className="absolute inset-0 w-full h-full flex items-center justify-center origin-center will-change-transform"
      >
        {/* Updated Grid Structure: Removed random translates and fixed gap */}
        <div className="grid grid-cols-3 gap-1 w-[120vw] h-[120vh] opacity-60 md:opacity-80">
           
           {/* Row 1 */}
           <div className="relative overflow-hidden bg-gray-900">
             <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="img" />
           </div>
           <div className="relative overflow-hidden bg-gray-900">
             <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="img" />
           </div>
           <div className="relative overflow-hidden bg-gray-900">
             <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="img" />
           </div>

           {/* Row 2 */}
           <div className="relative overflow-hidden bg-gray-900">
             <img src="https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="img" />
           </div>
           
           {/* Center Image (Hero) */}
           <div className="relative overflow-hidden z-10">
             <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
             <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Main Hero" />
           </div>

           <div className="relative overflow-hidden bg-gray-900">
             <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="img" />
           </div>

           {/* Row 3 */}
           <div className="relative overflow-hidden bg-gray-900">
             <img src="https://images.unsplash.com/photo-1514525253440-b393452e8fc4?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="img" />
           </div>
           <div className="relative overflow-hidden bg-gray-900">
             <img src="https://images.unsplash.com/photo-1459749411177-3c2ea1db0a6b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="img" />
           </div>
           <div className="relative overflow-hidden bg-gray-900">
             <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="img" />
           </div>
        </div>
      </div>

      <div className="absolute inset-0 z-30 flex flex-col pointer-events-none">
        <div ref={textWrapperRef} className="flex-1 flex flex-col items-center justify-center text-center px-4">
           <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[0.9] tracking-tighter uppercase mix-blend-difference">
             Capturing The <br/>
             Pulse of Every <br/>
             <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Event</span>
           </h1>
           <p className="mt-8 max-w-xl text-gray-300 text-base md:text-lg font-light leading-relaxed mix-blend-difference">
             Welcome to my portfolio. Scroll down to explore the vibrant world of festivals, events, and life's special moments.
           </p>
        </div>
      </div>

    </div>
  );
};

export default RoelZoomOutHero;