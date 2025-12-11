import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ExpandableRainSection = () => {
  const wrapperRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const rainContainerRef = useRef(null);

  // --- 1. THREE.JS RAIN ENGINE ---
  useEffect(() => {
    if (!rainContainerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    // Soft Fog to blend rain into the dark green background
    scene.fog = new THREE.FogExp2(0x2F3E2F, 0.002);

    const width = rainContainerRef.current.clientWidth;
    const height = rainContainerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rainContainerRef.current.appendChild(renderer.domElement);

    // Particles (Rain)
    const rainCount = 2000;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);

    for(let i=0; i<rainCount*3; i++) {
        rainPos[i] = (Math.random() - 0.5) * 60; // Spread wide
    }

    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));

    // Material: Cream colored rain to match theme
    const rainMat = new THREE.PointsMaterial({
        color: 0xE8E6E0,
        size: 0.1,
        transparent: true,
        opacity: 0.6,
    });

    const rainMesh = new THREE.Points(rainGeo, rainMat);
    scene.add(rainMesh);

    // Animation Loop
    let animationId;
    const animate = () => {
        animationId = requestAnimationFrame(animate);
        const positions = rainGeo.attributes.position.array;

        for(let i=1; i<rainCount*3; i+=3) {
            positions[i] -= 0.3; // Gravity speed
            if (positions[i] < -20) {
                positions[i] = 20; // Reset to top
            }
        }
        rainGeo.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
        if (!rainContainerRef.current) return;
        const newW = rainContainerRef.current.clientWidth;
        const newH = rainContainerRef.current.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        if (rainContainerRef.current && renderer.domElement) {
             rainContainerRef.current.removeChild(renderer.domElement);
        }
        rainGeo.dispose();
        rainMat.dispose();
        renderer.dispose();
    };
  }, []);


  // --- 2. GSAP EXPANSION ANIMATION ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=200%", // Long scroll distance for smooth effect
          pin: stickyContainerRef.current,
          scrub: 1,
        }
      });

      // Animation: Card expands from center to full screen
      tl.to(cardRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px", // Remove corners as it fills screen
        ease: "power2.inOut",
        duration: 2
      });

      // Text Fades out and moves up
      tl.to(textRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.5
      }, 0);

      // Rain Container opacity adjustment (optional, keeps it visible)
      tl.to(rainContainerRef.current, {
        opacity: 0.8, // Slightly more visible when full screen
      }, 0);

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    // Wrapper provides height for scrolling
    <div ref={wrapperRef} className="relative h-[300vh] bg-[#2F3E2F]">
      
      {/* Sticky Container: Holds the view in place */}
      <div 
        ref={stickyContainerRef} 
        className="h-screen w-full flex items-center justify-center overflow-hidden sticky top-0 bg-[#2F3E2F]"
      >
        
        {/* --- THE EXPANDING CARD --- */}
        <div 
           ref={cardRef}
           className="relative w-[85vw] md:w-[30vw] h-[50vh] md:h-[60vh] bg-[#1a241a] rounded-t-[200px] rounded-b-[10px] overflow-hidden shadow-2xl z-20"
        >
            {/* 1. Background Image */}
            <img 
              src="/bg.jpg" 
              alt="Moody Rain" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* 2. Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2F3E2F]/40 via-transparent to-[#2F3E2F]/90"></div>

            {/* 3. Three.js Rain Layer (Sits on top of image) */}
            <div ref={rainContainerRef} className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"></div>

            {/* 4. Text Content (Inside the Card) */}
            <div ref={textRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                <div className="mb-6 animate-pulse text-[#A3B18A]">
                   <Camera size={32} />
                </div>
                
                <h2 className="text-4xl md:text-6xl font-serif text-[#E8E6E0] leading-none mb-4 drop-shadow-lg">
                  The Unseen <br/> <span className="italic text-[#A3B18A]">Moment</span>
                </h2>
                
                <p className="text-[#E8E6E0]/80 text-xs md:text-sm font-mono tracking-[0.2em] uppercase max-w-xs mt-4">
                  Scroll to immerse yourself in the storm.
                </p>
            </div>

            {/* 5. Decorative Border */}
            <div className="absolute inset-4 border border-[#E8E6E0]/20 rounded-t-[190px] rounded-b-[5px] pointer-events-none z-30"></div>
        </div>

        {/* --- BACKGROUND TEXT (Behind the card, visible as it expands) --- */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
             <h1 className="text-[15vw] font-serif text-[#E8E6E0] opacity-5 leading-none">
                VISION
             </h1>
        </div>

      </div>
    </div>
  );
};

export default ExpandableRainSection;