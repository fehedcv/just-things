import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Settings, Check, Activity, HardDrive, Disc } from 'lucide-react';

const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING_CORE");
  
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // --- 1. STATUS MESSAGES LOGIC ---
    const updateStatus = (p) => {
      if (p < 30) return "LOADING_ASSETS...";
      if (p < 55) return "CALIBRATING_SENSORS...";
      if (p < 80) return "RENDERING_VISUALS...";
      return "FINALIZING_EXPORT...";
    };

    // --- 2. LOADING SIMULATION ---
    let interval;
    const maxFakeProgress = 90;

    interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1;
        if (next >= maxFakeProgress) {
          clearInterval(interval);
          return maxFakeProgress;
        }
        setStatusText(updateStatus(next));
        return next;
      });
    }, 60); // Fast ticks

    // --- 3. FINISH FUNCTION ---
    const finishLoading = () => {
      clearInterval(interval);
      setProgress(100);
      setStatusText("SYSTEM_READY");
      runExitAnimation();
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }

    // Safety timeout
    const safetyTimeout = setTimeout(finishLoading, 8000);

    return () => {
      window.removeEventListener('load', finishLoading);
      clearTimeout(safetyTimeout);
      clearInterval(interval);
    };
  }, []);

  // --- 4. EXIT ANIMATION (Vertical Wipe) ---
  const runExitAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onLoadingComplete) onLoadingComplete();
      }
    });

    // Step 1: UI Pop out
    tl.to(contentRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    // Step 2: Background Wipe Up (Like a digital transition)
    tl.to(bgRef.current, {
      clipPath: "inset(0% 0% 100% 0%)", // Wipes from bottom to top
      duration: 0.8,
      ease: "power4.inOut"
    }, "-=0.2");

    // Step 3: Remove
    tl.to(containerRef.current, {
      display: "none",
      duration: 0
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex justify-center items-center pointer-events-auto font-sans"
    >
      
      {/* --- BACKGROUND (The Wipe Layer) --- */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 bg-[#0F120F] flex items-center justify-center z-10"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }} // Initial full reveal
      >
         
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 opacity-[0.05]" 
              style={{ backgroundImage: 'linear-gradient(#E8E6E0 1px, transparent 1px), linear-gradient(90deg, #E8E6E0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
         </div>

      </div>

      {/* --- MAIN CONTENT (UI Card) --- */}
      <div ref={contentRef} className="relative z-20 w-full max-w-md px-6">
         
         {/* Top Header */}
         <div className="flex justify-between items-end mb-6 border-b border-[#E8E6E0]/10 pb-4">
            <div className="flex flex-col">
               <h1 className="text-[#E8E6E0] font-serif text-2xl md:text-3xl italic">
                  Processing
               </h1>
               <span className="text-[#A3B18A] font-mono text-[10px] tracking-widest uppercase mt-1">
                  Queue_ID: 2025_REF_01
               </span>
            </div>
            <div className="animate-spin-slow text-[#E8E6E0]/30">
               <Settings size={24} />
            </div>
         </div>

         {/* Technical Stats Row */}
         <div className="flex gap-8 mb-8 text-[#E8E6E0]/50 font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2">
               <HardDrive size={12} />
               <span>Writing_Mem</span>
            </div>
            <div className="flex items-center gap-2">
               <Activity size={12} className="text-[#A3B18A]" />
               <span>CPU_Optimized</span>
            </div>
            <div className="flex items-center gap-2">
               <Disc size={12} />
               <span>Cache_Clear</span>
            </div>
         </div>

         {/* PROGRESS SECTION */}
         <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end mb-1">
               <span className="text-[#E8E6E0] font-sans font-medium text-xs tracking-[0.2em] uppercase">
                  {statusText}
               </span>
               <span className="text-[#A3B18A] font-mono text-xl font-bold">
                  {progress}%
               </span>
            </div>

            {/* The Loading Bar */}
            <div className="w-full h-2 bg-[#1a241a] rounded-sm overflow-hidden relative border border-[#E8E6E0]/10">
               {/* Glowing Fill */}
               <div 
                  className="absolute top-0 left-0 h-full bg-[#A3B18A] transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(163,177,138,0.6)]"
                  style={{ width: `${progress}%` }}
               ></div>
               {/* Scanline Effect */}
               <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-scan"></div>
            </div>
         </div>

         {/* Footer Status */}
         <div className="mt-6 flex items-center gap-2 text-[#E8E6E0]/30 text-[10px] font-mono uppercase">
            {progress === 100 ? (
               <>
                 <Check size={12} className="text-[#A3B18A]" />
                 <span className="text-[#A3B18A]">Export Complete</span>
               </>
            ) : (
               <span>Estimating time remaining...</span>
            )}
         </div>

      </div>

      <style>{`
         .animate-spin-slow {
            animation: spin 4s linear infinite;
         }
         @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
         }
         @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
         }
         .animate-scan {
            animation: scan 2s linear infinite;
         }
      `}</style>

    </div>
  );
};

export default Preloader;