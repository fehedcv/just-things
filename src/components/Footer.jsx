import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const SimpleFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Applied global font-sans (Inter)
    <footer className="w-full bg-[#2F3E2F] text-[#E8E6E0] px-4 md:px-12 py-12 md:py-16 border-t border-[#E8E6E0]/10 font-sans">
      
      <div className="flex flex-col gap-12 md:gap-20">
        
        {/* --- 1. MAIN ACTION --- */}
        <div className="flex flex-col gap-4">
           {/* Label - Nav Style */}
           <span className="text-[#A3B18A] font-sans font-medium uppercase tracking-[0.25em] text-xs pl-1">
              Start a project
           </span>
           <a 
             href="mailto:hello@just-things.com" 
             className="group flex items-start md:items-center gap-2 md:gap-6 w-fit"
           >
             {/* Email - Playfair Medium */}
             <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-medium leading-none group-hover:text-[#A3B18A] transition-colors duration-500">
               hello@just-things.com
             </h2>
             <ArrowUpRight 
                size={32} 
                className="text-[#A3B18A] opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 hidden md:block" 
             />
           </a>
        </div>

        {/* --- 2. INFO GRID --- */}
        {/* All text here uses Nav Style (Inter, Medium, Uppercase, Tracking) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 border-t border-[#E8E6E0]/10 pt-8 text-xs font-sans font-medium uppercase tracking-[0.25em] text-[#E8E6E0]/60">
           
           {/* Copyright */}
           <div className="flex flex-col gap-2">
              <span className="text-[#E8E6E0]">Just-Things © {currentYear}</span>
              <span>All Rights Reserved</span>
           </div>

           {/* Location */}
           <div className="flex flex-col gap-2">
              <span className="text-[#E8E6E0]">Based In</span>
              <span>Dubai, UAE / Kerala, IND</span>
           </div>

           {/* Socials */}
           <div className="flex flex-col gap-2">
              <span className="text-[#E8E6E0]">Socials</span>
              <div className="flex gap-4">
                 <a href="#" className="hover:text-[#A3B18A] transition-colors">Instagram</a>
                 <a href="#" className="hover:text-[#A3B18A] transition-colors">Twitter</a>
                 <a href="#" className="hover:text-[#A3B18A] transition-colors">LinkedIn</a>
              </div>
           </div>

           {/* Back to Top */}
           <div className="md:text-right flex md:block flex-col gap-2">
               <button 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 className="hover:text-[#A3B18A] transition-colors text-left md:text-right"
               >
                 Back to Top ↑
               </button>
           </div>
        </div>

        {/* --- 3. DEVELOPER CREDIT --- */}
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 pt-6 border-t border-[#E8E6E0]/5 text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#E8E6E0]/30">
            <span>
               Designed & Developed by <a href="#" className="hover:text-[#A3B18A] transition-colors">Vynx Software Solutions</a>
            </span>
            <span className="hidden md:block">Est. 2025</span>
        </div>

      </div>
    </footer>
  );
};

export default SimpleFooter;