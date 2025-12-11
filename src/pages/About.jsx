import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Aperture, Focus, Film, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const bioRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // --- 1. HERO ANIMATION ---
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Strips reveal
      gsap.utils.toArray('.hero-strip').forEach((strip, i) => {
         heroTl.fromTo(strip, 
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, duration: 1.2, delay: i * 0.1 },
            0
         );
      });
      
      // Text reveal
      heroTl.fromTo('.hero-title .word',
         { y: 100, opacity: 0, skewY: 5 },
         { y: 0, opacity: 1, skewY: 0, stagger: 0.05, duration: 1 },
         "-=1"
      );

      // --- 2. BIO SECTION ---
      gsap.fromTo(bioRef.current.querySelector('.bio-portrait'),
         { y: 50, opacity: 0 },
         {
            y: 0, opacity: 1, duration: 1,
            scrollTrigger: {
               trigger: bioRef.current,
               start: "top 80%",
            }
         }
      );
      
      gsap.utils.toArray('.bio-data-item').forEach((item, i) => {
         gsap.fromTo(item,
            { x: 30, opacity: 0 },
            {
               x: 0, opacity: 1, duration: 0.8, delay: i * 0.1,
               scrollTrigger: {
                  trigger: bioRef.current,
                  start: "top 70%",
               }
            }
         );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const splitText = (text) => text.split(" ").map((word, i) => <span key={i} className="word inline-block mr-2 md:mr-4">{word}</span>);

  return (
    // Added padding to clear potential fixed navbar
    <div ref={containerRef} className="bg-[#2F3E2F] text-[#E8E6E0] font-sans overflow-hidden pt-24 md:pt-32 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden mb-20 md:mb-32">
         {/* Strips Background */}
         <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 gap-1 p-4 z-0 opacity-30 mix-blend-overlay pointer-events-none">
            {[...Array(12)].map((_, i) => (
               <div key={i} className="hero-strip relative w-full h-full bg-[#1a241a] overflow-hidden origin-bottom rounded-sm">
                  <img 
                     src="https://www.shutterstock.com/image-photo/breathtaking-view-dense-forest-sunlight-600nw-2582941859.jpg"
                     alt="Texture"
                     className="w-full h-full object-cover grayscale opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2F] to-transparent"></div>
               </div>
            ))}
         </div>

         {/* Content */}
         <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 text-[#A3B18A] mb-4 md:mb-6 border border-[#A3B18A]/30 px-3 py-1 rounded-full uppercase text-[10px] md:text-xs font-bold tracking-[0.2em]">
               <Camera size={12} />
               <span>2030 Vision</span>
            </div>
            <h1 className="hero-title text-[13vw] md:text-[10vw] font-black leading-[0.9] uppercase mb-4 md:mb-6">
               {splitText("Visual Architect")}
            </h1>
            <p className="hero-title text-sm md:text-2xl font-light text-[#A3B18A] tracking-[0.2em] uppercase">
               {splitText("Framing the Future")}
            </p>
         </div>
         
         {/* Tech Specs */}
         <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-4 text-[#E8E6E0]/40 font-mono text-xs">
            <Aperture size={14} />
            <span>F/1.2</span>
            <span>ISO 3200</span>
         </div>
      </section>


      {/* --- BIO SECTION --- */}
      <section ref={bioRef} className="py-12 md:py-32 container mx-auto px-6 relative z-10 mb-20">
         <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            
            {/* Portrait (Left on Desktop, Top on Mobile) */}
            <div className="bio-portrait relative h-[50vh] md:h-[700px] bg-[#1a241a] rounded-[2px] overflow-hidden order-1 md:order-none shadow-2xl">
               <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop" 
                  alt="Portrait" 
                  className="w-full h-full object-cover grayscale contrast-125 opacity-90"
               />
               <div className="absolute top-4 left-4 flex gap-2 text-[#A3B18A]">
                  <Film size={18} />
                  <span className="font-mono text-xs uppercase tracking-widest">Rec</span>
               </div>
               <div className="absolute inset-0 border border-[#A3B18A]/30 m-3 pointer-events-none"></div>
            </div>

            {/* Bio Data (Right on Desktop, Bottom on Mobile) */}
            <div className="space-y-8 md:space-y-12 order-2 md:order-none">
               <div>
                  <h2 className="text-4xl md:text-6xl font-serif mb-4 md:mb-6">Just-Things</h2>
                  <p className="text-lg md:text-xl text-[#A3B18A] font-light leading-relaxed">
                     A visual alchemist based in the neon-lit canyons of the city.
                  </p>
               </div>

               <div className="space-y-6 md:space-y-8 font-mono">
                  {[
                     { icon: <Eye />, title: "Philosophy", text: "I don't capture reality; I curate it. My work is a study in high-contrast noir." },
                     { icon: <Camera />, title: "Gear", text: "Custom-modded mirrorless systems designed for extreme low light." },
                     { icon: <Aperture />, title: "Focus", text: "Cyberpunk Editorial, Brutalist Architecture, Neo-Noir Portraiture." }
                  ].map((item, i) => (
                     <div key={i} className="bio-data-item flex items-start gap-4 border-l-2 border-[#A3B18A] pl-4">
                        <div className="text-[#A3B18A] shrink-0 mt-1">{item.icon}</div>
                        <div>
                           <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#E8E6E0]/60 mb-1">{item.title}</h3>
                           <p className="text-sm md:text-lg text-[#E8E6E0] leading-relaxed">{item.text}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>
      </section>

    </div>
  );
};

export default AboutPage;