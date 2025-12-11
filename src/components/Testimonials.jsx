import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { id: 1, name: "Sarah Jenkins", role: "Nike", quote: "The cinematic approach transformed our product launch completely." },
  { id: 2, name: "David Miller", role: "TechFlow", quote: "Minimalist, fast, and stunning. Increased engagement by 40%." },
  { id: 3, name: "Emily Chen", role: "Archizaid", quote: "Captured the essence of our architecture perfectly. Smooth as butter." },
  { id: 4, name: "Marcus Reid", role: "Spotify", quote: "A visual treat. The color grading is world-class. Feels like a movie." },
  { id: 5, name: "Rinshad T", role: "Event Planner", quote: "Professionalism at its peak. Delivered exactly on time." },
  { id: 6, name: "Elena Vos", role: "Vogue", quote: "They understand the language of luxury. Everything is intentional." },
  { id: 7, name: "Alex Ross", role: "Filmmaker", quote: "Finally, a team that speaks the language of cinema." },
  { id: 8, name: "Jessica Lee", role: "Brand Mgr", quote: "Our social reach doubled. The visuals stopped people scrolling." }
];

const ModernTestimonials = () => {
  const containerRef = useRef(null);
  
  // Desktop Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Split data
  const col1 = testimonials.slice(0, 4);
  const col2 = testimonials.slice(4, 8);

  return (
    <section ref={containerRef} className="bg-[#2F3E2F] py-20 px-4 md:px-12 w-full overflow-hidden">
      
      {/* Header */}
      <div className="container mx-auto mb-12 md:mb-20 flex flex-col items-center text-center">
         <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#A3B18A] animate-pulse"></span>
            <span className="text-[#A3B18A] uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">Feedback</span>
         </div>
         <h2 className="text-4xl md:text-8xl font-serif text-[#E8E6E0] leading-none">
            Voices of <span className="italic text-[#A3B18A]">Trust</span>
         </h2>
      </div>

      {/* --- DESKTOP LAYOUT (Scroll Parallax) --- */}
      <div className="hidden md:grid grid-cols-2 gap-8 max-w-6xl mx-auto h-[800px] overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#2F3E2F] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#2F3E2F] to-transparent z-10 pointer-events-none"></div>

         <motion.div style={{ y: y1 }} className="flex flex-col gap-8">
            {col1.map((item) => <ReviewCard key={item.id} data={item} />)}
         </motion.div>
         <motion.div style={{ y: y2, marginTop: "-200px" }} className="flex flex-col gap-8">
            {col2.map((item) => <ReviewCard key={item.id} data={item} />)}
         </motion.div>
      </div>

      {/* --- MOBILE LAYOUT (Vertical Marquee / Auto-Scroll) --- */}
      {/* This creates a 2-column "Wall" that scrolls automatically */}
      <div className="md:hidden relative h-[500px] overflow-hidden">
         
         {/* Gradients to hide edges */}
         <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#2F3E2F] to-transparent z-20 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#2F3E2F] to-transparent z-20 pointer-events-none"></div>

         <div className="grid grid-cols-2 gap-3">
            
            {/* Left Column - Upward Scroll */}
            <div className="h-[500px] overflow-hidden">
               <motion.div 
                  animate={{ y: [0, -1000] }} 
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="flex flex-col gap-3"
               >
                  {[...col1, ...col1, ...col1].map((item, i) => (
                     <ReviewCardMobile key={`${item.id}-${i}`} data={item} />
                  ))}
               </motion.div>
            </div>

            {/* Right Column - Downward Scroll */}
            <div className="h-[500px] overflow-hidden">
               <motion.div 
                  animate={{ y: [-1000, 0] }} 
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="flex flex-col gap-3"
               >
                  {[...col2, ...col2, ...col2].map((item, i) => (
                     <ReviewCardMobile key={`${item.id}-${i}`} data={item} />
                  ))}
               </motion.div>
            </div>

         </div>
      </div>

    </section>
  );
};

// --- DESKTOP CARD ---
const ReviewCard = ({ data }) => {
  return (
    <div className="bg-[#1a241a] p-10 rounded-[4px] border border-[#E8E6E0]/5 shadow-xl group hover:border-[#E8E6E0]/20 transition-colors duration-300">
       <div className="flex justify-between items-start mb-6">
          <Quote className="text-[#A3B18A] opacity-50" size={32} />
          <div className="flex gap-1">
             {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#A3B18A] text-[#A3B18A]" />)}
          </div>
       </div>
       <p className="text-[#E8E6E0] text-xl font-serif leading-relaxed mb-8 opacity-90">"{data.quote}"</p>
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#E8E6E0]/10 flex items-center justify-center text-[#E8E6E0] font-bold">
             {data.name.charAt(0)}
          </div>
          <div>
             <h4 className="text-[#E8E6E0] font-bold text-sm uppercase tracking-wide">{data.name}</h4>
             <p className="text-[#E8E6E0]/40 text-xs font-mono">{data.role}</p>
          </div>
       </div>
    </div>
  );
};

// --- MOBILE COMPACT CARD ---
const ReviewCardMobile = ({ data }) => {
   return (
     <div className="bg-[#1a241a] p-4 rounded-[4px] border border-[#E8E6E0]/5 shadow-lg">
        {/* Compact Stars */}
        <div className="flex gap-0.5 mb-2 opacity-60">
           {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-[#A3B18A] text-[#A3B18A]" />)}
        </div>
        
        {/* Compact Text */}
        <p className="text-[#E8E6E0] text-xs font-serif leading-snug mb-3 opacity-90">
           "{data.quote}"
        </p>
 
        {/* Minimal Footer */}
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full bg-[#E8E6E0]/10 flex items-center justify-center text-[#E8E6E0] text-[10px] font-bold">
              {data.name.charAt(0)}
           </div>
           <div className="overflow-hidden">
              <h4 className="text-[#E8E6E0] font-bold text-[10px] uppercase truncate">{data.name}</h4>
              <p className="text-[#E8E6E0]/40 text-[8px] font-mono truncate">{data.role}</p>
           </div>
        </div>
     </div>
   );
 };

export default ModernTestimonials;