import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    title: "Wedding Stories",
    subtitle: "Timeless Union",
    year: "2024",
    description: "Capturing raw emotions and unspoken vows in natural light.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: 2,
    title: "Editorial Fashion",
    subtitle: "Bold Aesthetics",
    year: "2024",
    description: "High-end portraiture blending human beauty with organic textures.",
    image: "/bg.jpg" 
  },
  {
    id: 3,
    title: "Product Design",
    subtitle: "Visual Clarity",
    year: "2023",
    description: "Showcasing objects with precision, symmetry and deep shadows.",
    image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1200&auto=format&fit=crop" 
  },
  {
    id: 4,
    title: "Architecture",
    subtitle: "Spaces & Lines",
    year: "2023",
    description: "Exploring symmetry where structure meets nature.",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop" 
  }
];

const ModernWorkSection = () => {
  const containerRef = useRef(null);
  
  const leftColumn = categories.filter((_, i) => i % 2 === 0);
  const rightColumn = categories.filter((_, i) => i % 2 !== 0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const items = gsap.utils.toArray('.gallery-item');

      items.forEach((item) => {
        const imgWrapper = item.querySelector('.img-wrapper');
        const img = item.querySelector('img');
        const textContent = item.querySelector('.text-content');

        // --- 1. Reveal Animation (No Delay) ---
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 95%", 
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        });

        // Wrapper unmasks
        tl.fromTo(imgWrapper,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { 
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "expo.out", 
          }
        )
        // Image scales down slightly simultaneously
        .fromTo(img,
          { scale: 1.4 },
          { 
            scale: 1.1, 
            duration: 1.4,
            ease: "power3.out"
          }, 
          "<" 
        )
        // Text slides up
        .fromTo(textContent,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          },
          "-=0.8" 
        );


        // --- 2. Parallax Effect (Scroll Scrub) ---
        gsap.to(img, {
          yPercent: 15, 
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true 
          }
        });

      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Reusable Card Component
  const ProjectCard = ({ item }) => (
    <div className="gallery-item mb-20 md:mb-40 group cursor-pointer block">
      
      {/* Image Container */}
      <div className="img-wrapper relative w-full aspect-[3/4] overflow-hidden mb-8 transform-gpu">
        <div className="absolute inset-0 bg-[#A3B18A]/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover will-change-transform" 
        />
        
        {/* Floating Year Tag - Updated to Nav/Button Style */}
        <div className="absolute top-4 right-4 z-20 overflow-hidden">
             <span className="block text-xs font-sans font-medium uppercase tracking-[0.25em] text-[#E8E6E0] bg-[#2F3E2F]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#A3B18A]/30">
               {item.year}
             </span>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-content pr-4">
        <div className="flex items-baseline gap-4 mb-2">
            {/* Subtitle - Updated to Nav/Button Style */}
            <span className="text-[#A3B18A] text-xs font-sans font-medium uppercase tracking-[0.25em]">{item.subtitle}</span>
            <div className="h-[1px] flex-grow bg-[#A3B18A]/30"></div>
        </div>
        
        {/* Title - Updated to H3 Style (Playfair, Medium) */}
        <h3 className="text-4xl md:text-5xl font-serif font-medium mb-4 group-hover:text-[#A3B18A] transition-colors duration-300">
          {item.title}
        </h3>
        
        {/* Description - Updated to Body Style (Inter, 16px, Normal) */}
        <p className="text-[#E8E6E0]/60 font-sans text-base font-normal max-w-[90%] leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );

  return (
    // Applied global font-sans (Inter)
    <section ref={containerRef} className="w-full bg-[#2F3E2F] text-[#E8E6E0] py-24 md:py-32 font-sans">
      
      <div className="max-w-[90vw] md:max-w-[85vw] mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-24 md:mb-40 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#E8E6E0]/10 pb-12">
           <div>
              {/* Tag - Updated to Nav/Button Style */}
              <p className="text-[#A3B18A] font-sans font-medium uppercase tracking-[0.25em] text-xs mb-4">Selected Works</p>
              
              {/* H2 - Updated to Playfair, Medium */}
              <h2 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9]">
                Visual <span className="text-[#A3B18A] italic">Poetry</span>
              </h2>
           </div>
           
           {/* Description - Updated to Body Style */}
           <p className="text-[#E8E6E0]/50 font-sans text-base font-normal leading-relaxed max-w-sm text-sm md:text-right pb-2">
             A curation of moments, architecture, and human connection captured through the lens.
           </p>
        </div>

        {/* --- Staggered Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 w-full">
          
          {/* Left Column */}
          <div className="flex flex-col">
            {leftColumn.map(item => <ProjectCard key={item.id} item={item} />)}
          </div>

          {/* Right Column - Starts lower */}
          <div className="flex flex-col md:mt-40">
            {rightColumn.map(item => <ProjectCard key={item.id} item={item} />)}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ModernWorkSection;