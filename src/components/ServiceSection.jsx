import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clapperboard, Wand2, Plane, Moon, Film, Settings, ArrowUpRight, Plus } from "lucide-react";

// --- DATA ---
const services = [
  {
    id: "01",
    title: "Cinematic Edits",
    subtitle: "Storytelling",
    icon: <Clapperboard size={24} />,
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop",
    desc: "Narrative-driven video editing that turns raw footage into compelling stories. Color grading included.",
    specs: ["4K Render", "Sound Design", "Color Grade"]
  },
  {
    id: "02",
    title: "Retouching",
    subtitle: "High-End Beauty",
    icon: <Wand2 size={24} />,
    img: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop",
    desc: "Magazine-quality skin retouching and frequency separation. Natural, flawless results.",
    specs: ["Dodge & Burn", "Liquify", "Skin Tone"]
  },
  {
    id: "03",
    title: "Drone Visuals",
    subtitle: "Aerial Views",
    icon: <Plane size={24} />,
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop",
    desc: "FPV and cinematic drone shots to give your project a massive sense of scale.",
    specs: ["4K 60fps", "FPV", "Top-Down"]
  },
  {
    id: "04",
    title: "Night Mode",
    subtitle: "Low Light",
    icon: <Moon size={24} />,
    img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    desc: "Specialized low-light photography and videography for clubs, events, and street aesthetics.",
    specs: ["No Noise", "Neon", "Atmosphere"]
  },
  {
    id: "05",
    title: "Viral Reels",
    subtitle: "Social Growth",
    icon: <Film size={24} />,
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    desc: "Trend-aware editing specifically designed for Instagram Reels and TikTok algorithms.",
    specs: ["Trendy Audio", "Fast Cuts", "Captions"]
  }
];

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(services[0].id);

  return (
    <section className="bg-[#2F3E2F] text-[#E8E6E0] py-24 px-4 md:px-12 w-full min-h-screen flex flex-col justify-center">
      
      {/* Header */}
      <div className="container mx-auto mb-16 flex flex-col md:flex-row justify-between items-end border-b border-[#E8E6E0]/10 pb-8">
         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-[#A3B18A] animate-pulse"></span>
               <span className="text-[#A3B18A] uppercase tracking-[0.2em] text-xs font-bold">Suite</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-none">
               Creative <span className="italic text-[#A3B18A]">Services</span>
            </h2>
         </div>
         <p className="text-[#E8E6E0]/50 text-xs md:text-sm font-mono uppercase tracking-widest hidden md:block">
            Select a service to expand
         </p>
      </div>

      {/* --- ACCORDION CONTAINER --- */}
      {/* Desktop: Horizontal Flex | Mobile: Vertical Flex */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[600px] gap-4 container mx-auto">
         {services.map((service) => (
            <ServiceCard 
               key={service.id} 
               data={service} 
               isActive={activeId === service.id} 
               onClick={() => setActiveId(service.id)} 
            />
         ))}
      </div>

    </section>
  );
};

const ServiceCard = ({ data, isActive, onClick }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseEnter={() => window.innerWidth > 768 && onClick()} // Hover on desktop
      initial={false}
      animate={{
         flex: isActive ? 3 : 1,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`
         relative group cursor-pointer overflow-hidden rounded-[4px]
         border border-[#E8E6E0]/10 bg-[#1a241a]
         ${isActive ? 'h-[400px] md:h-auto' : 'h-[80px] md:h-auto'} 
         /* Mobile: fixed heights for active/inactive. Desktop: flex width handles it */
      `}
    >
       
       {/* 1. BACKGROUND IMAGE (Visible only when Active) */}
       <motion.div 
          className="absolute inset-0 z-0"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5 }}
       >
          <img 
             src={data.img} 
             alt={data.title} 
             className="w-full h-full object-cover opacity-60 grayscale md:grayscale-0 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2F] via-[#2F3E2F]/50 to-transparent opacity-90"></div>
       </motion.div>

       {/* 2. CONTENT CONTAINER */}
       <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
          
          {/* TOP BAR */}
          <div className={`flex justify-between items-center transition-all duration-500 ${isActive ? 'md:items-start' : 'md:flex-col md:h-full md:py-8'}`}>
             
             {/* ID & Icon */}
             <div className="flex items-center gap-4">
                <span className={`font-mono text-sm text-[#A3B18A] border border-[#A3B18A]/30 px-2 py-0.5 rounded-full ${isActive ? 'block' : 'hidden md:block'}`}>
                   {data.id}
                </span>
                <div className={`text-[#E8E6E0] ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                   {data.icon}
                </div>
             </div>

             {/* Collapsed Vertical Title (Desktop Only) */}
             {!isActive && (
                <div className="hidden md:block mt-auto">
                   <h3 className="text-xl font-serif text-[#E8E6E0]/60 -rotate-90 origin-bottom-left whitespace-nowrap translate-x-4 tracking-wider">
                      {data.title}
                   </h3>
                </div>
             )}

             {/* Mobile Expand Icon */}
             <div className="md:hidden text-[#E8E6E0]/50">
                {isActive ? null : <Plus size={20} />}
             </div>

          </div>

          {/* ACTIVE CONTENT REVEAL */}
          <AnimatePresence>
             {isActive && (
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 10 }}
                   transition={{ delay: 0.2, duration: 0.4 }}
                   className="mt-auto"
                >
                   {/* Title */}
                   <h3 className="text-3xl md:text-5xl font-serif text-[#E8E6E0] leading-none mb-2">
                      {data.title}
                   </h3>
                   <p className="text-[#A3B18A] text-xs font-bold uppercase tracking-widest mb-6">
                      {data.subtitle}
                   </p>

                   {/* Description */}
                   <p className="text-[#E8E6E0]/70 text-sm md:text-base leading-relaxed max-w-md mb-8">
                      {data.desc}
                   </p>

                   {/* Specs/Tags */}
                   <div className="flex flex-wrap gap-2 mb-8">
                      {data.specs.map((spec, i) => (
                         <span key={i} className="text-[10px] uppercase tracking-wider border border-[#E8E6E0]/20 px-3 py-1 rounded-sm text-[#E8E6E0]/60">
                            {spec}
                         </span>
                      ))}
                   </div>

                   {/* CTA */}
                   <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#E8E6E0] hover:text-[#A3B18A] transition-colors group/btn">
                      <span>View Packages</span>
                      <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                   </button>

                </motion.div>
             )}
          </AnimatePresence>

       </div>

    </motion.div>
  );
};

export default ServicesSection;