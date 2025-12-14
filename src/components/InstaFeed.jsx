import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Play } from "lucide-react";

// --- DATA ---
const reels = [
  { id: 1, src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4", title: "Midnight Tokyo", category: "Urban", year: "2024" },
  { id: 2, src: "https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_24fps.mp4", title: "Desert Mirage", category: "Nature", year: "2024" },
  { id: 3, src: "https://res.cloudinary.com/dmtzmgbkj/video/upload/11_r1mhql.mp4", title: "Ocean Eyes", category: "Travel", year: "2023" },
  { id: 4, src: "https://res.cloudinary.com/dmtzmgbkj/video/upload/22_ro57lw.mp4", title: "Neon Cyber", category: "Tech", year: "2023" },
];

const FeaturedReels = () => {
  const displayReels = reels.slice(0, 4);

  return (
    // Applied global font-sans (Inter)
    <section className="bg-[#2F3E2F] py-20 px-4 md:px-12 w-full min-h-[80vh] flex flex-col justify-center font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-[#E8E6E0]/10 pb-8">
         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-[#A3B18A] animate-pulse"></span>
               {/* Label - Nav Style */}
               <span className="text-[#A3B18A] font-sans font-medium uppercase tracking-[0.25em] text-xs">Featured Works</span>
            </div>
            {/* Heading - Playfair Medium */}
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#E8E6E0] leading-none text-left">
               The <span className="italic text-[#A3B18A]">Quad</span> Edit.
            </h2>
         </div>
         
         <a href="#" className="hidden md:flex items-center gap-2 text-[#E8E6E0] opacity-60 hover:opacity-100 transition-opacity">
            {/* Link - Nav Style */}
            <span className="font-sans font-medium uppercase tracking-[0.25em] text-xs">View Archive</span>
            <ArrowUpRight size={16} />
         </a>
      </div>

      {/* --- THE QUAD GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-auto md:h-[600px]">
         {displayReels.map((reel, index) => (
            <ReelCard key={reel.id} data={reel} index={index} />
         ))}
      </div>

      {/* Mobile Footer Button */}
      <div className="mt-10 px-2 w-full flex md:hidden">
         <a href="#" className="group relative w-full flex items-center justify-between bg-[#E8E6E0]/5 border border-[#E8E6E0]/10 backdrop-blur-sm py-4 px-6 rounded-[2px] active:scale-[0.98] transition-all duration-300">
            {/* Text - Nav Style */}
            <span className="text-[#E8E6E0] text-xs font-sans font-medium uppercase tracking-[0.25em] opacity-80 group-active:opacity-100">
               View Full Archive
            </span>
            <div className="w-8 h-8 rounded-full bg-[#A3B18A] flex items-center justify-center text-[#2F3E2F] shadow-[0_0_15px_rgba(163,177,138,0.3)] group-active:scale-90 transition-transform">
               <ArrowUpRight size={16} />
            </div>
         </a>
      </div>

    </section>
  );
};

const ReelCard = ({ data, index }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingMobile, setIsPlayingMobile] = useState(false);

  // --- DESKTOP LOGIC (Hover) ---
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

  // --- MOBILE LOGIC (Click) ---
  const handleMobileClick = () => {
    if (window.innerWidth < 768 && videoRef.current) {
       if (isPlayingMobile) {
          videoRef.current.pause();
          setIsPlayingMobile(false);
       } else {
          videoRef.current.play();
          setIsPlayingMobile(true);
       }
    }
  };

  return (
    <div 
      className="group relative w-full h-[300px] md:h-full bg-[#1a241a] rounded-[2px] overflow-hidden cursor-pointer border border-[#E8E6E0]/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMobileClick}
    >
       {/* 1. NUMBER - Nav Style */}
       <div className="absolute top-4 left-4 z-20 mix-blend-overlay pointer-events-none">
          <span className="text-[#E8E6E0] font-sans font-medium text-xl md:text-2xl opacity-50 tracking-widest">0{index + 1}</span>
       </div>

       {/* 2. CENTER PLAY BUTTON (MOBILE ONLY) */}
       <div className={`absolute inset-0 z-30 flex items-center justify-center md:hidden transition-opacity duration-300 ${isPlayingMobile ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-14 h-14 bg-[#E8E6E0]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#E8E6E0]/30 shadow-lg">
             <Play size={24} className="text-[#E8E6E0] fill-[#E8E6E0] ml-1" />
          </div>
       </div>

       {/* 3. VIDEO LAYER */}
       <div className="absolute inset-0 w-full h-full">
          <video 
             ref={videoRef}
             src={data.src}
             className="w-full h-full object-cover transition-transform duration-700 ease-out 
                        opacity-100 grayscale-0 
                        md:opacity-60 md:grayscale md:group-hover:scale-105 md:group-hover:opacity-100 md:group-hover:grayscale-0"
             loop
             muted
             playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2F] via-transparent to-transparent opacity-60 md:opacity-80 md:group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
       </div>

       {/* 4. CONTENT (Bottom) */}
       <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 flex flex-col items-start transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
          
          <div className="flex items-center gap-2 mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:delay-100">
             {/* Category - Nav Style Small */}
             <span className="px-2 py-0.5 border border-[#A3B18A] text-[#A3B18A] font-sans font-medium text-[8px] md:text-[10px] uppercase tracking-[0.25em] rounded-full">
                {data.category}
             </span>
          </div>

          <div className="flex justify-between items-end w-full">
             {/* Title - Playfair Medium */}
             <h3 className="text-xl md:text-3xl font-serif font-medium text-[#E8E6E0] leading-none">
                {data.title}
             </h3>
          </div>

       </div>

       {/* 5. HOVER BORDER */}
       <div className="hidden md:block absolute inset-0 border border-[#E8E6E0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none m-2"></div>

    </div>
  );
};

export default FeaturedReels;