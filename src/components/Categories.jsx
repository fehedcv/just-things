import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    title: "Wedding Stories",
    subtitle: "Timeless Union",
    year: "2024",
    description: "Capturing raw emotions and unspoken vows.",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: 2,
    title: "Editorial Fashion",
    subtitle: "Bold Aesthetics",
    year: "2024",
    description: "High-end portraiture blending human beauty with organic textures.",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: 3,
    title: "Product Design",
    subtitle: "Visual Clarity",
    year: "2023",
    description: "Showcasing objects with precision and natural light.",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: 4,
    title: "Architecture",
    subtitle: "Spaces & Lines",
    year: "2023",
    description: "Exploring symmetry where structure meets nature.",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop" 
  }
];

const ModernWorkSection = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const image = item.querySelector(".project-img");
        const text = item.querySelector(".project-text");
        const line = item.querySelector(".separator-line");

        // 1. Line Animation (Draws from left to right)
        gsap.fromTo(line, 
          { scaleX: 0, transformOrigin: "left center" },
          { 
            scaleX: 1, 
            duration: 1, 
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );

        // 2. Image Reveal (Curtain Effect - Unveiling)
        gsap.fromTo(image,
          { clipPath: "inset(0% 100% 0% 0%)", scale: 1.2 }, // Starts hidden (right to left) and zoomed in
          { 
            clipPath: "inset(0% 0% 0% 0%)", 
            scale: 1,
            duration: 1.5, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "bottom center",
            }
          }
        );

        // 3. Text Parallax (Moves slightly slower than scroll)
        gsap.fromTo(text,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 65%",
            }
          }
        );

      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#2F3E2F] text-[#E8E6E0] py-24 md:py-40 overflow-hidden">
      
      <div className="max-w-[90vw] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-24 md:mb-40 pl-4 md:pl-0">
           <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#A3B18A]"></span>
              <p className="text-[#A3B18A] uppercase tracking-[0.3em] text-xs font-bold">Selected Works</p>
           </div>
           <h2 className="text-5xl md:text-8xl font-serif leading-[0.9]">
             Curated <br/> <span className="text-[#A3B18A] italic ml-12">Collections</span>
           </h2>
        </div>

        {/* --- PROJECT LIST --- */}
        <div className="flex flex-col gap-24 md:gap-40">
          {categories.map((cat, index) => (
            <div 
              key={cat.id} 
              ref={el => itemsRef.current[index] = el}
              className="group relative w-full"
            >
              {/* Separator Line */}
              <div className="separator-line w-full h-[1px] bg-[#E8E6E0]/20 mb-12 md:mb-20"></div>

              {/* Grid Layout: Alternating per row */}
              <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                 
                 {/* --- TEXT COLUMN --- */}
                 <div className="project-text w-full md:w-[40%] flex flex-col justify-between h-full pt-4 md:pt-12">
                    
                    {/* Top Meta */}
                    <div className="flex justify-between items-center mb-8 md:mb-16 border-b border-[#A3B18A]/30 pb-4">
                       <span className="text-4xl md:text-6xl font-serif text-[#E8E6E0]/20">0{index + 1}</span>
                       <span className="text-xs font-mono text-[#A3B18A] border border-[#A3B18A]/30 px-3 py-1 rounded-full">{cat.year}</span>
                    </div>

                    {/* Main Content */}
                    <div>
                      <h3 className="text-4xl md:text-6xl font-serif mb-6 leading-tight group-hover:text-[#A3B18A] transition-colors duration-500 cursor-pointer">
                        {cat.title}
                      </h3>
                      <p className="text-[#A3B18A] uppercase tracking-[0.2em] text-xs font-bold mb-6">
                        {cat.subtitle}
                      </p>
                      <p className="text-[#E8E6E0]/60 text-lg leading-relaxed max-w-sm mb-10 font-light">
                        {cat.description}
                      </p>
                    </div>

                    {/* Button */}
                    <button className="flex items-center gap-3 text-sm uppercase tracking-widest font-bold text-[#E8E6E0] group/btn w-fit">
                      <span className="border-b border-[#E8E6E0]/30 pb-1 group-hover/btn:border-[#A3B18A] transition-colors">View Project</span>
                      <ArrowUpRight className="w-5 h-5 text-[#A3B18A] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                 </div>

                 {/* --- IMAGE COLUMN --- */}
                 <div className="w-full md:w-[60%] relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                    {/* The Image Wrapper for Reveal Animation */}
                    <div className="project-img w-full h-full relative overflow-hidden">
                       <img 
                         src={cat.image} 
                         alt={cat.title} 
                         className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                       />
                       {/* Overlay that vanishes on hover */}
                       <div className="absolute inset-0 bg-[#2F3E2F]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                 </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ModernWorkSection;