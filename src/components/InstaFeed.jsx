import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

// --- DATA (Limited to 4) ---
const reels = [
  { id: 1, src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4", title: "Midnight Tokyo", category: "Urban", year: "2024" },
  { id: 2, src: "https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_24fps.mp4", title: "Desert Mirage", category: "Nature", year: "2024" },
  { id: 3, src: "https://videos.pexels.com/video-files/5823773/5823773-uhd_2732_1440_25fps.mp4", title: "Ocean Eyes", category: "Travel", year: "2023" },
  { id: 4, src: "https://videos.pexels.com/video-files/5309381/5309381-uhd_2560_1440_25fps.mp4", title: "Neon Cyber", category: "Tech", year: "2023" },
];

const FeaturedReels = () => {
  // Only show first 4 items
  const displayReels = reels.slice(0, 4);

  return (
    <section className="bg-[#2F3E2F] py-20 px-4 md:px-12 w-full min-h-[80vh] flex flex-col justify-center">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 border-b border-[#E8E6E0]/10 pb-8">
         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-[#A3B18A] animate-pulse"></span>
               <span className="text-[#A3B18A] uppercase tracking-[0.2em] text-xs font-bold">Featured Works</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#E8E6E0] leading-none">
               The <span className="italic text-[#A3B18A]">Quad</span> Edit.
            </h2>
         </div>
         
         <a href="#" className="hidden md:flex items-center gap-2 text-[#E8E6E0] opacity-60 hover:opacity-100 transition-opacity">
            <span className="uppercase tracking-widest text-xs font-bold">View Archive</span>
            <ArrowUpRight size={16} />
         </a>
      </div>

      {/* --- THE QUAD GRID --- */}
      {/* Mobile: 2 Columns (Compact) | Desktop: 4 Columns (Expansive) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-auto md:h-[600px]">
         {displayReels.map((reel, index) => (
            <ReelCard key={reel.id} data={reel} index={index} />
         ))}
      </div>

      {/* Mobile Footer Button */}
      <div className="mt-8 flex md:hidden justify-center">
         <a href="#" className="text-[#E8E6E0] border-b border-[#A3B18A] pb-1 text-xs uppercase tracking-widest font-bold">
            View All Projects
         </a>
      </div>

    </section>
  );
};

const ReelCard = ({ data, index }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Play Video on Hover (Desktop)
  useEffect(() => {
    if (window.innerWidth > 768 && videoRef.current) {
       if (isHovered) {
          videoRef.current.play();
       } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
       }
    }
  }, [isHovered]);

  return (
    <div 
      className="group relative w-full h-[300px] md:h-full bg-[#1a241a] rounded-[2px] overflow-hidden cursor-pointer border border-[#E8E6E0]/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       {/* 1. NUMBER (Background Decor) */}
       <div className="absolute top-4 left-4 z-20 mix-blend-overlay">
          <span className="text-[#E8E6E0] font-mono text-xl md:text-2xl opacity-50">0{index + 1}</span>
       </div>

       {/* 2. VIDEO LAYER */}
       <div className="absolute inset-0 w-full h-full">
          <video 
             ref={videoRef}
             src={data.src}
             className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 md:grayscale md:group-hover:grayscale-0"
             loop
             muted
             playsInline
             // AutoPlay on mobile for UX, controlled hover on desktop
             autoPlay={typeof window !== 'undefined' && window.innerWidth < 768} 
          />
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2F] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
       </div>

       {/* 3. CONTENT (Bottom) */}
       <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 flex flex-col items-start transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          
          <div className="flex items-center gap-2 mb-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
             <span className="px-2 py-0.5 border border-[#A3B18A] text-[#A3B18A] text-[8px] md:text-[10px] uppercase tracking-widest rounded-full">
                {data.category}
             </span>
          </div>

          <div className="flex justify-between items-end w-full">
             <h3 className="text-xl md:text-3xl font-serif text-[#E8E6E0] leading-none">
                {data.title}
             </h3>
             
             {/* Play Icon (Shows on Desktop Hover) */}
             <div className="hidden md:flex bg-[#E8E6E0] w-8 h-8 rounded-full items-center justify-center text-[#2F3E2F] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <Play size={12} fill="currentColor" />
             </div>
          </div>

       </div>

       {/* 4. HOVER BORDER (Desktop) */}
       <div className="hidden md:block absolute inset-0 border border-[#E8E6E0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none m-2"></div>

    </div>
  );
};

export default FeaturedReels;