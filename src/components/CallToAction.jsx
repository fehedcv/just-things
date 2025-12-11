import React, { useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LensPortalCTA = () => {
  const containerRef = useRef(null);
  
  // --- MAGNETIC LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the "heavy" lens feel
  const springConfig = { damping: 20, stiffness: 150, mass: 1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Move the lens slightly (divided by factor for subtle movement)
    x.set((clientX - centerX) / 5);
    y.set((clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen bg-[#2F3E2F] overflow-hidden flex flex-col items-center justify-center cursor-none" // Hide default cursor for immersion
    >
      
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

      {/* --- BACKGROUND TYPOGRAPHY (Static) --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
         <h2 className="text-[12vw] font-serif text-[#E8E6E0] leading-[0.8] opacity-10 blur-sm">
            CREATE
         </h2>
         <h2 className="text-[12vw] font-serif text-[#E8E6E0] leading-[0.8] opacity-10 blur-sm">
            IMPACT
         </h2>
      </div>

      {/* --- THE MAGNETIC LENS (Interactive) --- */}
      <motion.div 
        style={{ x: smoothX, y: smoothY }}
        className="relative z-20"
      >
         <a 
           href="/contact" 
           className="group relative flex items-center justify-center w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden"
         >
            {/* 1. Video/Image Inside Lens */}
            <div className="absolute inset-0 w-full h-full bg-black">
               <img 
                 src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop" 
                 alt="Lens"
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 ease-out"
               />
               
               {/* Inner Shadow / Vignette to look like a lens */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#2F3E2F_100%)] opacity-80"></div>
            </div>

            {/* 2. Content Inside Lens */}
            <div className="relative z-10 flex flex-col items-center text-center">
               <span className="text-[#A3B18A] uppercase tracking-[0.3em] text-xs font-bold mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Get in Touch
               </span>
               
               <div className="overflow-hidden">
                  <h3 className="text-5xl md:text-7xl font-serif text-[#E8E6E0] italic leading-none transform translate-y-0 group-hover:-translate-y-[120%] transition-transform duration-500 ease-in-out">
                     Let's <br/> Talk
                  </h3>
                  {/* Duplicate Text for Hover Roll Effect */}
                  <h3 className="absolute top-0 left-0 w-full text-5xl md:text-7xl font-serif text-[#A3B18A] italic leading-none transform translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                     Start <br/> Now
                  </h3>
               </div>

               <div className="mt-6 w-12 h-12 rounded-full border border-[#E8E6E0]/30 flex items-center justify-center text-[#E8E6E0] group-hover:bg-[#E8E6E0] group-hover:text-[#2F3E2F] transition-all duration-300">
                  <ArrowUpRight size={20} />
               </div>
            </div>

            {/* 3. Decorative Rings (Lens Flares) */}
            <div className="absolute inset-0 border border-[#E8E6E0]/10 rounded-full scale-90 group-hover:scale-95 transition-transform duration-700"></div>
            <div className="absolute inset-0 border border-[#E8E6E0]/5 rounded-full scale-110 group-hover:scale-105 transition-transform duration-700"></div>

         </a>
      </motion.div>

      {/* --- FOOTER LINKS --- */}
      <div className="absolute bottom-10 w-full px-12 flex justify-between text-[#E8E6E0]/40 text-xs font-mono uppercase tracking-widest z-10 pointer-events-none md:pointer-events-auto">
         <span className="hidden md:block">Based in Dubai</span>
         <div className="flex gap-8">
            <a href="#" className="hover:text-[#E8E6E0] transition-colors pointer-events-auto">Instagram</a>
            <a href="#" className="hover:text-[#E8E6E0] transition-colors pointer-events-auto">LinkedIn</a>
            <a href="#" className="hover:text-[#E8E6E0] transition-colors pointer-events-auto">Email</a>
         </div>
         <span className="hidden md:block">© 2025</span>
      </div>

    </section>
  );
};

export default LensPortalCTA;