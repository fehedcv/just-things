import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const revealImgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Desktop: Pin the Left Column (Image) while Right Column scrolls
      if (window.innerWidth > 768) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftColRef.current,
          scrub: true, 
        });
      }

      // 2. Right Column Content Reveal (Staggered Fade Up)
      const textElements = rightColRef.current.querySelectorAll(".anim-text");
      gsap.fromTo(textElements, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 70%",
          }
        }
      );

      // 3. Secondary Image "Curtain Reveal"
      gsap.fromTo(revealImgRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" }, // Hidden (from bottom)
        { 
          clipPath: "inset(0% 0% 0% 0%)",     // Fully Visible
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: revealImgRef.current,
            start: "top 80%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#2F3E2F] text-[#E8E6E0] overflow-hidden">
      
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* =======================================
            LEFT COLUMN: Sticky Image (Visual Anchor)
           ======================================= */}
        <div ref={leftColRef} className="w-full md:w-[45%] h-[60vh] md:h-screen relative overflow-hidden">
          {/* Main Portrait */}
          <img 
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1400&auto=format&fit=crop" 
            alt="Photographer Portrait" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
          />
          
          {/* Overlay Gradient (Bottom up) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2F] via-transparent to-transparent opacity-80 md:opacity-0"></div>

          {/* Floating 'About' Label */}
          <div className="absolute top-12 left-12 hidden md:block">
             <div className="flex items-center gap-4">
               <span className="w-12 h-[1px] bg-[#E8E6E0]"></span>
               <span className="text-[#E8E6E0] uppercase tracking-[0.3em] text-xs font-bold">About</span>
             </div>
          </div>
        </div>

        {/* =======================================
            RIGHT COLUMN: Scrolling Content (Narrative)
           ======================================= */}
        <div ref={rightColRef} className="w-full md:w-[55%] py-20 px-8 md:px-24 flex flex-col justify-center">
           
           {/* Section 1: The Hook */}
           <div className="mb-20">
              <p className="anim-text text-[#A3B18A] font-mono text-sm mb-6">EST. 2024 • DUBAI</p>
              <h2 className="anim-text text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                We believe in the <br/>
                <span className="text-[#A3B18A] italic">quiet</span> moments.
              </h2>
              <div className="anim-text w-full h-[1px] bg-[#E8E6E0]/20 mb-8"></div>
              <p className="anim-text text-[#E8E6E0]/80 text-lg md:text-xl leading-relaxed font-light max-w-lg">
                Photography is not just about the click—it’s about the breath before it. 
                We specialize in capturing the raw, unscripted energy of life, weaving visuals that feel less like photos and more like memories.
              </p>
           </div>

           {/* Section 2: Visual Break (Secondary Image) */}
           <div className="w-full aspect-video md:aspect-[2/1] relative mb-20">
              <div ref={revealImgRef} className="w-full h-full overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop" 
                   alt="Camera Detail" 
                   className="w-full h-full object-cover"
                 />
              </div>
              {/* Caption */}
              <div className="absolute -bottom-8 right-0 text-[#A3B18A] text-xs font-mono">
                 FIG 01. THE PROCESS
              </div>
           </div>

           {/* Section 3: The Philosophy & Stats */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                 <h3 className="anim-text text-2xl font-serif mb-4 text-[#E8E6E0]">The Vision</h3>
                 <p className="anim-text text-[#E8E6E0]/60 text-sm leading-relaxed">
                   To strip away the artificial and reveal the authentic. Whether it's a wedding, a brand story, or an architectural marvel, we look for the soul of the subject.
                 </p>
              </div>
              <div>
                 <h3 className="anim-text text-2xl font-serif mb-4 text-[#E8E6E0]">The Numbers</h3>
                 <div className="anim-text flex justify-between border-b border-[#E8E6E0]/20 pb-2 mb-2">
                    <span className="text-sm text-[#E8E6E0]/60">Projects</span>
                    <span className="text-sm font-mono text-[#A3B18A]">150+</span>
                 </div>
                 <div className="anim-text flex justify-between border-b border-[#E8E6E0]/20 pb-2 mb-2">
                    <span className="text-sm text-[#E8E6E0]/60">Exhibitions</span>
                    <span className="text-sm font-mono text-[#A3B18A]">12</span>
                 </div>
                 <div className="anim-text flex justify-between border-b border-[#E8E6E0]/20 pb-2">
                    <span className="text-sm text-[#E8E6E0]/60">Years</span>
                    <span className="text-sm font-mono text-[#A3B18A]">05</span>
                 </div>
              </div>
           </div>

           {/* CTA */}
           <div className="anim-text">
              <button className="group flex items-center gap-4 text-[#E8E6E0] uppercase tracking-[0.2em] text-xs font-bold w-fit">
                <span className="border-b border-[#E8E6E0]/30 pb-1 group-hover:border-[#A3B18A] group-hover:text-[#A3B18A] transition-colors duration-300">
                  Read Full Story
                </span>
                <ArrowRight className="text-[#A3B18A] group-hover:translate-x-2 transition-transform duration-300" size={18} />
              </button>
           </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;