import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const SimpleFooter = () => {
  return (
    <footer className="w-full bg-[#2F3E2F] text-[#E8E6E0] pt-20 pb-10 border-t border-[#E8E6E0]/10">
      
      <div className="container mx-auto px-6 md:px-12">
        
        {/* --- TOP SECTION: GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
           
           {/* Col 1: Brand & Desc */}
           <div className="col-span-1 md:col-span-1">
              <h2 className="text-2xl font-serif font-bold tracking-wide mb-6">JUST-THINGS.</h2>
              <p className="text-[#E8E6E0]/70 text-sm leading-relaxed max-w-xs mb-8">
                 Capturing moments, crafting stories, and designing visual narratives that resonate. Based in Kerala, available worldwide.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                 <a href="#" className="p-2 border border-[#E8E6E0]/20 rounded-full hover:bg-[#E8E6E0] hover:text-[#2F3E2F] transition-all duration-300">
                    <Instagram size={18} />
                 </a>
                 <a href="#" className="p-2 border border-[#E8E6E0]/20 rounded-full hover:bg-[#E8E6E0] hover:text-[#2F3E2F] transition-all duration-300">
                    <Twitter size={18} />
                 </a>
                 <a href="#" className="p-2 border border-[#E8E6E0]/20 rounded-full hover:bg-[#E8E6E0] hover:text-[#2F3E2F] transition-all duration-300">
                    <Linkedin size={18} />
                 </a>
              </div>
           </div>

           {/* Col 2: Sitemap */}
           <div>
              <h4 className="text-[#A3B18A] text-xs uppercase tracking-widest font-bold mb-6">Sitemap</h4>
              <ul className="space-y-4">
                 {['Home', 'Portfolio', 'Services', 'About'].map((item) => (
                    <li key={item}>
                       <a href="#" className="text-sm hover:text-[#A3B18A] transition-colors">{item}</a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Col 3: Services */}
           <div>
              <h4 className="text-[#A3B18A] text-xs uppercase tracking-widest font-bold mb-6">Services</h4>
              <ul className="space-y-4">
                 {['Photography', 'Videography', 'Editing', 'Drone Shots'].map((item) => (
                    <li key={item}>
                       <a href="#" className="text-sm hover:text-[#A3B18A] transition-colors">{item}</a>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Col 4: Contact */}
           <div>
              <h4 className="text-[#A3B18A] text-xs uppercase tracking-widest font-bold mb-6">Contact</h4>
              <div className="flex flex-col gap-4">
                 <a href="mailto:hello@just-things.com" className="text-xl font-serif hover:text-[#A3B18A] transition-colors">
                    hello@just-things.com
                 </a>
                 <p className="text-[#E8E6E0]/60 text-sm">
                    +91 98765 43210 <br/>
                    Dubai, UAE
                 </p>
              </div>
           </div>

        </div>

        {/* --- BOTTOM SECTION: COPYRIGHT --- */}
        <div className="border-t border-[#E8E6E0]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#E8E6E0]/40 uppercase tracking-widest">
           <p>© {new Date().getFullYear()} Just Things. All Rights Reserved.</p>
           <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#E8E6E0] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#E8E6E0] transition-colors">Terms of Use</a>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default SimpleFooter;