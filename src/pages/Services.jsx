import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import {
  Camera,
  Car,
  Utensils,
  Clapperboard,
  Calendar,
  X
} from "lucide-react";

// --- IMAGE ---
// Make sure this path is correct in your project
import lensImg from "/cam_img.png"; 

// Fallback if local image is missing
const fallbackImg = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const SERVICES_DATA = [
  // INNER RING (2 Items)
  {
    id: "wedding",
    title: "Weddings",
    ring: "inner",
    icon: <Camera size={24} />,
    color: "#ec4899", // Pink
    items: ["Photography", "Videography", "Candid", "Highlights", "Pre-wedding"]
  },
  {
    id: "monthly",
    title: "Monthly Pkg",
    ring: "inner",
    icon: <Calendar size={24} />,
    color: "#06b6d4", // Cyan
    items: ["Content Reels", "Posters", "Social Media", "Page Handling"]
  },
  // OUTER RING (3 Items)
  {
    id: "food",
    title: "Food Vlogs",
    ring: "outer",
    icon: <Utensils size={24} />,
    color: "#f59e0b", // Amber
    items: ["Food Photos", "Reels", "Creative Videos", "Transitions"]
  },
  {
    id: "automotive",
    title: "Automotive",
    ring: "outer",
    icon: <Car size={24} />,
    color: "#ef4444", // Red
    items: ["Revealing", "On-road", "Off-roading", "Cinematic"]
  },
  {
    id: "production",
    title: "Production",
    ring: "outer",
    icon: <Clapperboard size={24} />,
    color: "#8b5cf6", // Violet
    items: ["Perfumes", "Cosmetics", "Jewelry", "Commercials"]
  },
];

// --- THREE.JS BACKGROUND (MANY RANDOM FLOATING PLANETS) ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002); // Deep space fog

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60; // Pulled back to see more planets

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); 
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 2, 200);
    sunLight.position.set(30, 30, 30);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x4f46e5, 1.5); // Cool blue rim
    rimLight.position.set(-20, 10, -20);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xff0066, 0.5); // Pinkish fill
    fillLight.position.set(20, -20, -10);
    scene.add(fillLight);


    // 3. TEXTURE LIBRARY
    const textureLoader = new THREE.TextureLoader();
    
    // High-quality abstract textures that look like planets
    const planetTextures = [
        textureLoader.load("https://images.unsplash.com/photo-1614730341194-75c60740a071?q=80&w=500&auto=format&fit=crop"), // Grey Rock (Moon)
        textureLoader.load("https://images.unsplash.com/photo-1618557219665-d05545e88e2c?q=80&w=500&auto=format&fit=crop"), // Abstract Blue (Ice)
        textureLoader.load("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop"), // Dark Magma
        textureLoader.load("https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=500&auto=format&fit=crop"), // Orange/Red (Mars)
        textureLoader.load("https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=500&auto=format&fit=crop"), // White Marble (Gas Giant)
        textureLoader.load("https://images.unsplash.com/photo-1511185307590-3c29c11275ca?q=80&w=500&auto=format&fit=crop"), // Rusty Iron
    ];

    // 4. STARS (Background Dust)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const posArray = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 300; // Wide spread
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);


    // 5. GENERATE MANY PLANETS ("GLOBS")
    const planets = [];
    const planetCount = 35; // Number of floating planets

    // Shared Geometry for performance, but scaled individually
    // 64x64 segments for perfectly round shape
    const baseGeometry = new THREE.SphereGeometry(1, 64, 64); 

    for(let i=0; i<planetCount; i++) {
        const texIndex = Math.floor(Math.random() * planetTextures.length);
        const radius = Math.random() * 3 + 0.5; // Size between 0.5 and 3.5

        const material = new THREE.MeshStandardMaterial({
            map: planetTextures[texIndex],
            bumpMap: planetTextures[texIndex],
            bumpScale: 0.2,
            roughness: 0.6,
            metalness: 0.2,
        });

        const planet = new THREE.Mesh(baseGeometry, material);
        
        // Scale mesh to random radius
        planet.scale.set(radius, radius, radius);

        // Random Position
        planet.position.set(
            (Math.random() - 0.5) * 120, // X: -60 to 60
            (Math.random() - 0.5) * 80,  // Y: -40 to 40
            (Math.random() - 0.5) * 80 - 10 // Z: -50 to 30 (mostly background)
        );

        // Movement Data
        planet.userData = {
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            floatSpeed: Math.random() * 0.01 + 0.002,
            floatOffset: Math.random() * Math.PI * 2,
            driftX: (Math.random() - 0.5) * 0.02,
            driftY: (Math.random() - 0.5) * 0.02,
        };

        scene.add(planet);
        planets.push(planet);
    }

    // 6. ANIMATION LOOP
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate stars slowly
      starsMesh.rotation.y += 0.0003;

      // Animate Planets
      planets.forEach((planet) => {
        // 1. Self Rotation
        planet.rotation.y += planet.userData.rotationSpeed;
        planet.rotation.x += planet.userData.rotationSpeed * 0.5;

        // 2. Drift Movement
        planet.position.x += planet.userData.driftX;
        planet.position.y += planet.userData.driftY;

        // 3. Floating Effect (Sine wave on Y)
        // We add a tiny sine wave on top of the linear drift for "weightlessness"
        planet.position.y += Math.sin(Date.now() * 0.001 + planet.userData.floatOffset) * 0.01;

        // 4. Boundary Check (Screen Wrapping)
        // If it goes too far right, move to left, etc.
        if (planet.position.x > 70) planet.position.x = -70;
        if (planet.position.x < -70) planet.position.x = 70;
        if (planet.position.y > 50) planet.position.y = -50;
        if (planet.position.y < -50) planet.position.y = 50;
      });

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      starsGeometry.dispose();
      starsMaterial.dispose();
      baseGeometry.dispose();
      planets.forEach(p => p.material.dispose());
      planetTextures.forEach(t => t.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};


// --- POPUP CARD ---
const ServicePopup = ({ activeService, onClose }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!activeService) return;

    const tl = gsap.timeline();

    tl.fromTo(containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    )
      .fromTo(contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
        "-=0.3"
      );

  }, { dependencies: [activeService] });

  if (!activeService) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        ref={containerRef}
        className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl overflow-hidden"
        style={{ boxShadow: `0 0 40px ${activeService.color}20` }}
      >
        {/* Decorative Glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-40 pointer-events-none"
          style={{ backgroundColor: activeService.color }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px] opacity-40 pointer-events-none"
          style={{ backgroundColor: activeService.color }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div ref={contentRef} className="flex flex-col items-center text-center relative z-10">
          <div
            className="p-5 rounded-2xl mb-6 text-white shadow-lg transform transition-transform hover:scale-105"
            style={{
              backgroundColor: activeService.color,
              boxShadow: `0 10px 30px -10px ${activeService.color}`
            }}
          >
            {React.cloneElement(activeService.icon, { size: 32 })}
          </div>

          <h3 className="text-3xl font-bold text-white mb-2">
            {activeService.title}
          </h3>

          <div className="w-12 h-1 rounded-full mb-6 opacity-50" style={{ backgroundColor: activeService.color }} />

          <div className="flex flex-wrap justify-center gap-2 w-full">
            {activeService.items.map((item, idx) => (
              <span
                key={idx}
                className="text-sm px-4 py-2 rounded-lg text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ORBIT RING (UPDATED: More visible border) ---
const OrbitRing = ({ items, radius, duration, reverse, onSelect }) => {
  return (
    <div
      className="orbit-ring-container absolute rounded-full border border-dashed border-white/30 flex items-center justify-center pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        "--duration": `${duration}s`,
        "--direction": reverse ? 'reverse' : 'normal',
        "--counter-direction": reverse ? 'normal' : 'reverse',
        // Added a subtle shadow to make lines pop
        boxShadow: '0 0 15px rgba(255,255,255,0.05)' 
      }}
    >
      {items.map((item, index) => {
        const angle = (index / items.length) * 360;
        // Initial position on the ring
        const transform = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;

        return (
          <div
            key={item.id}
            className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
            style={{ transform: transform }}
          >
            {/* Counter-rotating container */}
            <div
              className="orbit-item flex flex-col items-center justify-center cursor-pointer group pointer-events-auto"
              onClick={() => onSelect(item)}
            >
              {/* Icon Circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center bg-[#0a0a0a] border border-white/10 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--color)]"
                style={{
                  '--color': item.color,
                  boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                <div className="text-white/70 group-hover:text-[var(--color)] transition-colors duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Label */}
              <span
                className="mt-3 text-[10px] font-bold uppercase tracking-widest text-white/40 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5 transition-all duration-300 group-hover:text-white group-hover:bg-[var(--color)] group-hover:border-[var(--color)]"
                style={{ '--color': item.color }}
              >
                {item.title}
              </span>

              {/* Hover Glow Effect via CSS */}
              <style jsx>{`
                .group:hover .w-16 {
                  box-shadow: 0 0 30px var(--color);
                  }
                  `}</style>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- MAIN COMPONENT ---
const Service = () => {
  const wrapperRef = useRef(null);
  const cameraRef = useRef(null);
  const bgTextRef = useRef(null);
  const orbitContainerRef = useRef(null);

  useEffect(() => {
    // (x-coord, y-coord)
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const [activeService, setActiveService] = useState(null);

  const innerItems = SERVICES_DATA.filter(i => i.ring === "inner");
  const outerItems = SERVICES_DATA.filter(i => i.ring === "outer");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=150%", // Slightly increased to give more room for the faster animation to feel smooth
        scrub: 1,
        pin: true,
      },
    });

    // 1. Zoom Camera & Fade Text
    tl.to(cameraRef.current, {
      scale: 50,
      rotation: 180,
      duration: 1.5, // Reduced from 2
      ease: "power2.inOut",
      transformOrigin: "center center",
    })
      .to(bgTextRef.current, {
        opacity: 0,
        scale: 1.5,
        duration: 1
      }, "<")

      // 2. Hide Camera & Reveal Orbit System
      .to(cameraRef.current, {
        autoAlpha: 0,
        duration: 0.1
      }, ">-0.5") // Starts at 1.0s
      .fromTo(orbitContainerRef.current,
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out" },
        "<" // Starts at 1.0s (same as hide)
      );

  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center font-['Inter',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

        /* --- ROTATION ANIMATIONS --- */
        @keyframes rotate-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .orbit-ring-container {
          animation: rotate-ring var(--duration) linear infinite var(--direction);
        }
        
        /* Counter-rotate items so they stand still vertically */
        .orbit-item {
          animation: rotate-ring var(--duration) linear infinite var(--counter-direction);
        }

        /* --- HOVER PAUSE LOGIC --- */
        .orbit-ring-container:hover,
        .orbit-item:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* THREE.JS BACKGROUND */}
      <ThreeBackground />

      {/* BACKGROUND TEXT */}
      <div ref={bgTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
        <h1 className="text-[15vw] font-black text-white/5 uppercase tracking-tighter leading-[0.8] text-center">
          OUR<br />SERVICES
        </h1>
      </div>

      {/* CAMERA LENS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <img
          ref={cameraRef}
          src={lensImg || fallbackImg}
          alt="Camera Lens"
          className="w-[600px] h-[600px] object-contain drop-shadow-2xl"
        />
      </div>

      {/* ORBIT SYSTEM */}
      <div
        ref={orbitContainerRef}
        className="orbit-system relative w-full h-full flex items-center justify-center opacity-0 z-30"
      >
        {/* Modal */}
        <ServicePopup
          activeService={activeService}
          onClose={() => setActiveService(null)}
        />

        {/* Rings Container - Fades out when modal is active */}
        <div
          className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${activeService ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
          {/* Center Branding */}
          <div className="absolute z-0 text-center opacity-20 pointer-events-none">
            <h2 className="text-5xl font-black text-white tracking-tighter">VYNX</h2>
          </div>

          {/* INNER RING - Clockwise */}
          <OrbitRing
            items={innerItems}
            radius={140}
            duration={25}
            reverse={false}
            onSelect={setActiveService}
          />

          {/* OUTER RING - Counter-Clockwise */}
          <OrbitRing
            items={outerItems}
            radius={250}
            duration={40}
            reverse={true}
            onSelect={setActiveService}
          />
        </div>
      </div>
    </section>
  );
};

export default Service;