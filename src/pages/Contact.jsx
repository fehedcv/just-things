import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, MessageCircle, Instagram, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  
  // Your Email
  const email = "hello@vynxwebworks.com"; 

  // --- 1. TIME LOGIC (Kerala/India Time) ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: "10:30 PM"
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata' 
      });
      setTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. COPY TO CLIPBOARD LOGIC ---
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <section className="bg-[#2F3E2F] text-[#E8E6E0] min-h-screen flex flex-col justify-between px-6 py-20 md:p-24 relative overflow-hidden">
      
      {/* Background Grain (Texture) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

      {/* --- TOP: HEADER & AVAILABILITY --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
         <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3B18A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A3B18A]"></span>
               </span>
               <span className="text-[#A3B18A] font-mono text-xs uppercase tracking-widest">Available for Freelance</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-none">Let's <span className="italic text-[#A3B18A]">Collaborate</span></h2>
         </div>

         {/* Local Time Display */}
         <div className="hidden md:block text-right">
            <span className="block text-2xl font-mono text-[#E8E6E0]">{time}</span>
            <span className="text-[#E8E6E0]/40 text-xs uppercase tracking-widest">Kerala, India (IST)</span>
         </div>
      </div>


      {/* --- CENTER: THE GIANT EMAIL ACTION --- */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 my-20">
         
         <p className="text-[#E8E6E0]/50 text-sm md:text-base font-mono uppercase tracking-widest mb-4 md:mb-8">
            Click to Copy Email
         </p>

         <motion.button 
            onClick={handleCopy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
         >
            {/* The Email Text */}
            <h1 className="text-[8vw] md:text-[7vw] font-serif leading-none text-[#E8E6E0] group-hover:text-[#A3B18A] transition-colors duration-300">
               {email}
            </h1>
            
            {/* Hover Underline */}
            <div className="w-full h-[1px] bg-[#E8E6E0]/20 mt-2 md:mt-4 group-hover:bg-[#A3B18A] transition-colors duration-300"></div>

            {/* "Copied" Notification (Floating) */}
            {copied && (
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#A3B18A] text-[#2F3E2F] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2"
               >
                  <Check size={14} /> Copied!
               </motion.div>
            )}
            
            {/* Copy Icon on Hover */}
            {!copied && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 text-[#E8E6E0]/50 hidden md:block"
               >
                  <Copy size={24} />
               </motion.div>
            )}
         </motion.button>

      </div>


      {/* --- BOTTOM: SOCIALS & DIRECT LINKS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 border-t border-[#E8E6E0]/10 pt-12">
         
         {/* 1. WhatsApp / Direct Message */}
         <a 
            href="https://wa.me/919876543210" // Replace with your number
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 bg-[#1a241a] border border-[#E8E6E0]/5 hover:border-[#A3B18A]/50 transition-all duration-300 rounded-[2px]"
         >
            <div className="flex items-center gap-4">
               <div className="bg-[#E8E6E0]/10 p-3 rounded-full text-[#E8E6E0] group-hover:text-[#A3B18A] group-hover:bg-[#A3B18A]/10 transition-colors">
                  <MessageCircle size={24} />
               </div>
               <div>
                  <h3 className="text-[#E8E6E0] font-serif text-xl">WhatsApp</h3>
                  <p className="text-[#E8E6E0]/40 text-xs uppercase tracking-widest">Instant Chat</p>
               </div>
            </div>
            <ArrowUpRight className="text-[#E8E6E0]/20 group-hover:text-[#A3B18A] group-hover:rotate-45 transition-all" />
         </a>

         {/* 2. Instagram */}
         <a 
            href="#" 
            target="_blank"
            className="group flex items-center justify-between p-6 bg-[#1a241a] border border-[#E8E6E0]/5 hover:border-[#A3B18A]/50 transition-all duration-300 rounded-[2px]"
         >
            <div className="flex items-center gap-4">
               <div className="bg-[#E8E6E0]/10 p-3 rounded-full text-[#E8E6E0] group-hover:text-[#A3B18A] group-hover:bg-[#A3B18A]/10 transition-colors">
                  <Instagram size={24} />
               </div>
               <div>
                  <h3 className="text-[#E8E6E0] font-serif text-xl">Instagram</h3>
                  <p className="text-[#E8E6E0]/40 text-xs uppercase tracking-widest">View Gallery</p>
               </div>
            </div>
            <ArrowUpRight className="text-[#E8E6E0]/20 group-hover:text-[#A3B18A] group-hover:rotate-45 transition-all" />
         </a>

         {/* 3. Send Mail (Fallback) */}
         <a 
            href={`mailto:${email}`}
            className="group flex items-center justify-between p-6 bg-[#1a241a] border border-[#E8E6E0]/5 hover:border-[#A3B18A]/50 transition-all duration-300 rounded-[2px]"
         >
            <div className="flex items-center gap-4">
               <div className="bg-[#E8E6E0]/10 p-3 rounded-full text-[#E8E6E0] group-hover:text-[#A3B18A] group-hover:bg-[#A3B18A]/10 transition-colors">
                  <Mail size={24} />
               </div>
               <div>
                  <h3 className="text-[#E8E6E0] font-serif text-xl">Send Mail</h3>
                  <p className="text-[#E8E6E0]/40 text-xs uppercase tracking-widest">Deep Inquiry</p>
               </div>
            </div>
            <ArrowUpRight className="text-[#E8E6E0]/20 group-hover:text-[#A3B18A] group-hover:rotate-45 transition-all" />
         </a>

      </div>

    </section>
  );
};

export default ContactSection;