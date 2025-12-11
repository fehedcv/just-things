import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Neon Nights",
    category: "Event",
    year: "2024",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Vogue Editorial",
    category: "Fashion",
    year: "2024",
    image: "https://plus.unsplash.com/premium_photo-1664112065821-274ec259c6c2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Royal Union",
    category: "Wedding",
    year: "2023",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Urban Lines",
    category: "Architecture",
    year: "2023",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Sonic Waves",
    category: "Concert",
    year: "2022",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"
  }
];

const InteractiveListSection = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);
  const mobileCardsRef = useRef([]);
  const [activeImage, setActiveImage] = useState(null);

  // --- DESKTOP CURSOR ANIMATION ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Only run mouse logic if screen is wide
      if (window.innerWidth > 768) {
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" });

        const moveCursor = (e) => {
           xTo(e.clientX);
           yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
      } else {
        // --- MOBILE SCROLL ANIMATION ---
        mobileCardsRef.current.forEach((card, index) => {
          if(!card) return;
          gsap.fromTo(card, 
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%", // Trigger when card enters view
              }
            }
          );
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Hover Handlers (Desktop Only)
  const handleMouseEnter = (img) => {
    setActiveImage(img);
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  const handleMouseLeave = () => {
    setActiveImage(null);
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#2F3E2F] text-[#E8E6E0] py-20 md:py-32 overflow-hidden cursor-default md:cursor-none">
      
      {/* =========================================
          DESKTOP FLOATING CURSOR (Hidden on Mobile)
         ========================================= */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-[300px] h-[400px] rounded-[4px] overflow-hidden pointer-events-none z-50 opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-2xl"
        style={{ border: '1px solid rgba(232, 230, 224, 0.2)' }}
      >
        {activeImage && (
           <img src={activeImage} alt="Preview" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-[#2F3E2F]/10 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 border-b border-[#E8E6E0]/20 pb-8">
           <div>
              <p className="text-[#A3B18A] uppercase tracking-[0.3em] text-xs font-bold mb-4">Selected Works</p>
              <h2 className="text-5xl md:text-7xl font-serif leading-none">
                Index <span className="text-[#A3B18A] italic">&</span> Archive
              </h2>
           </div>
           <p className="text-[#E8E6E0]/60 text-sm md:text-base max-w-xs mt-6 md:mt-0 font-light">
             Explore our latest editorial & commercial projects.
           </p>
        </div>

        {/* =========================================
            DESKTOP LAYOUT (The Hover List)
           ========================================= */}
        <div className="hidden md:flex flex-col">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="group relative flex items-center justify-between py-12 border-b border-[#E8E6E0]/10 transition-colors duration-300 hover:bg-[#E8E6E0]/5 px-8"
              onMouseEnter={() => handleMouseEnter(project.image)}
              onMouseLeave={handleMouseLeave}
            >
               <div className="flex items-baseline gap-16">
                  <span className="text-[#A3B18A] font-mono text-sm">0{index + 1}</span>
                  <h3 className="text-6xl font-serif text-[#E8E6E0] group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
               </div>
               <div className="flex items-center gap-16 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs uppercase tracking-widest text-[#E8E6E0]">{project.category}</span>
                  <span className="text-xs font-mono text-[#A3B18A]">{project.year}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#E8E6E0] group-hover:rotate-45 transition-transform duration-300" />
               </div>
            </div>
          ))}
        </div>

        {/* =========================================
            MOBILE LAYOUT (The Stacked Cards)
           ========================================= */}
        <div className="md:hidden flex flex-col gap-12">
          {projects.map((project, index) => (
             <div 
               key={project.id} 
               ref={el => mobileCardsRef.current[index] = el}
               className="w-full flex flex-col gap-4"
             >
                {/* 1. Visible Image Card */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[2px] bg-[#E8E6E0]/5">
                   <img 
                     src={project.image} 
                     alt={project.title} 
                     className="w-full h-full object-cover opacity-90"
                   />
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2F] via-transparent to-transparent opacity-60"></div>
                   
                   {/* Category Badge */}
                   <div className="absolute top-4 left-4 bg-[#2F3E2F]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#E8E6E0]/20">
                      <span className="text-[#A3B18A] text-[10px] uppercase tracking-widest font-bold">{project.category}</span>
                   </div>
                </div>

                {/* 2. Text Content (Below Image) */}
                <div className="flex justify-between items-start px-1">
                   <div>
                      <span className="text-[#A3B18A] font-mono text-xs mb-1 block">0{index + 1}</span>
                      <h3 className="text-3xl font-serif text-[#E8E6E0] leading-tight mb-2">{project.title}</h3>
                      <p className="text-[#E8E6E0]/50 text-xs uppercase tracking-wider">{project.year}</p>
                   </div>
                   
                   <button className="p-3 border border-[#E8E6E0]/20 rounded-full text-[#E8E6E0] mt-2">
                      <ArrowUpRight size={20} />
                   </button>
                </div>
             </div>
          ))}
        </div>

        {/* Footer / More Link */}
        <div className="flex justify-center mt-20 md:mt-32">
           <button className="px-8 py-4 rounded-full border border-[#E8E6E0]/30 text-[#E8E6E0] uppercase text-xs font-bold tracking-widest hover:bg-[#E8E6E0] hover:text-[#2F3E2F] transition-all duration-300">
             View All Projects
           </button>
        </div>

      </div>
    </section>
  );
};

export default InteractiveListSection;