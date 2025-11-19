import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    title: "Wedding Stories",
    subtitle: "Timeless Love",
    description: "Capturing the raw emotions and beautiful moments of your special day.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Fashion & Editorial",
    subtitle: "Bold Aesthetics",
    description: "High-end fashion photography that speaks volumes. We focus on style.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Product Design",
    subtitle: "Visual Perfection",
    description: "Showcasing products with crystal clear precision and creative lighting.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Architecture",
    subtitle: "Spaces & Lines",
    description: "Exploring the symmetry and beauty of structures and light.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop"
  }
];

const CategorySection = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]); // Desktop Images
  const mobileCardsRef = useRef([]); // Mobile Cards

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION (min-width: 768px) ---
      mm.add("(min-width: 768px)", () => {
        // Main Pinning
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".left-content",
          scrub: 1.2, // ✨ Smooth Scrubbing (1.2s lag)
          anticipatePin: 1, // Prevents flicker
        });

        // Image Reveal Animation
        categories.forEach((_, index) => {
          if (index === 0) return;
          
          gsap.fromTo(imagesRef.current[index], 
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.out", // Slightly smoother ease
              scrollTrigger: {
                trigger: `.category-text-${index}`,
                start: "top bottom",
                end: "center center",
                scrub: 1.2, // ✨ Smooth Animation Lag
              }
            }
          );
        });
      });

      // --- MOBILE ANIMATION (max-width: 767px) ---
      mm.add("(max-width: 767px)", () => {
        mobileCardsRef.current.forEach((card, index) => {
          if(!card) return;
          
          gsap.to(card, {
            scale: 0.95, 
            opacity: 0.5, 
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: 1, // ✨ Smooth Mobile Stacking
              toggleActions: "restart none none reverse"
            }
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A0A0A] text-white">
      
      {/* ==========================
          DESKTOP LAYOUT (> 768px)
         ========================== */}
      <div className="hidden md:flex flex-row">
        {/* Left: Sticky Images */}
        <div className="left-content w-1/2 h-screen sticky top-0 overflow-hidden">
          <div className="relative w-full h-full">
            {categories.map((cat, index) => (
              <div 
                key={cat.id}
                ref={el => imagesRef.current[index] = el}
                className="absolute inset-0 w-full h-full z-1"
                style={{ zIndex: index + 1 }}
              >
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Scrollable Text */}
        <div className="w-1/2 relative z-10">
          {categories.map((cat, index) => (
            <div key={cat.id} className={`category-text-${index} min-h-screen flex flex-col justify-center px-20 py-20 border-l border-white/10 bg-[#0A0A0A]`}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#00D2BE] font-mono text-sm tracking-widest">0{index + 1}</span>
                <div className="h-px w-12 bg-[#00D2BE]"></div>
                <span className="text-gray-400 text-sm uppercase tracking-wider">{cat.subtitle}</span>
              </div>
              <h2 className="text-7xl font-bold mb-8 leading-tight">{cat.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-10">{cat.description}</p>
              <button className="group flex items-center gap-2 text-white hover:text-[#00D2BE] transition-colors uppercase tracking-widest text-sm font-bold">
                View Projects <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* ==========================
          MOBILE LAYOUT (< 768px)
         ========================== */}
      <div className="md:hidden w-full px-4 py-10 flex flex-col gap-4 pb-20">
        
        {categories.map((cat, index) => (
          <div 
            key={cat.id}
            ref={el => mobileCardsRef.current[index] = el}
            className="sticky top-4 w-full h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 will-change-transform"
          >
            {/* Full Height Image */}
            <img 
              src={cat.image} 
              alt={cat.title} 
              className="w-full h-full object-cover absolute inset-0"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

            {/* Text Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
              
              {/* Top Label */}
              <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[#00D2BE] font-mono text-xs tracking-widest">0{index + 1}</span>
              </div>

              <span className="text-[#00D2BE] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                {cat.subtitle}
              </span>
              
              <h2 className="text-4xl font-bold leading-[0.9] mb-3 text-white">
                {cat.title}
              </h2>
              
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-6 opacity-80">
                {cat.description}
              </p>

              <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#00D2BE] hover:text-black hover:border-[#00D2BE] transition-all duration-300 flex items-center justify-center gap-2">
                Explore <ArrowUpRight size={16} />
              </button>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default CategorySection;