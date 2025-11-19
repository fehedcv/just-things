import React from "react";
import { ArrowUpRight } from "lucide-react";

// Premium Images (Events, Fashion, Weddings)
const projects = [
  {
    id: 1,
    title: "Neon Nights Festival",
    category: "Event",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Vogue Editorial",
    category: "Fashion",
    image: "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    title: "Royal Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Urban Architecture",
    category: "Design",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Sonic Waves",
    category: "Concert",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="w-full bg-[#0A0A0A] py-16 md:py-20 overflow-hidden">
      
      {/* --- HEADER SECTION --- */}
      <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-8 md:w-10 bg-[#00D2BE]"></div>
            <span className="text-[#00D2BE] font-mono text-xs md:text-sm tracking-widest uppercase">
              Selected Works
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Featured <br /> Projects
          </h2>
        </div>
        
        <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
          A visual collection of our most recent works – each piece crafted with intention, emotion, and cinematic style.
        </p>
      </div>

      {/* --- CINEMATIC SLIDER / STACK --- */}
      <div className="w-full px-4 md:px-8">
        {/* Mobile: h-auto (let it grow), flex-col (stack vertical)
           Desktop: h-[600px] (fixed height), flex-row (accordion)
        */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 h-auto md:h-[600px] w-full max-w-[1600px] mx-auto">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="
                relative group overflow-hidden cursor-pointer rounded-2xl
                /* Mobile Styles: Full Width, Fixed Height per card */
                w-full h-[300px] md:h-full
                /* Desktop Styles: Accordion logic */
                md:flex-1 md:hover:flex-[4] 
                transition-all duration-700 ease-out
              "
            >
              {/* Image */}
              <img
                className="
                  h-full w-full object-cover transition-transform duration-700 
                  group-hover:scale-110 
                  /* Mobile: Always color (grayscale-0), Desktop: Grayscale until hover */
                  grayscale-0 md:grayscale md:group-hover:grayscale-0
                "
                src={project.image}
                alt={project.title}
              />

              {/* Dark Overlay: Darker on mobile for readability */}
              <div className="absolute inset-0 bg-black/40 md:bg-black/40 md:group-hover:bg-black/20 transition-colors duration-500"></div>

              {/* Text Content */}
              <div className="
                absolute bottom-0 left-0 w-full p-6 
                bg-gradient-to-t from-black/90 to-transparent 
                /* Mobile: Always visible (translate-y-0) */
                translate-y-0 
                /* Desktop: Hidden until hover (translate-y-full) */
                md:translate-y-full md:group-hover:translate-y-0 
                transition-transform duration-500 ease-out 
                flex justify-between items-end
              ">
                <div>
                  <p className="text-[#00D2BE] text-xs font-bold tracking-widest uppercase mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-white text-2xl font-bold">
                    {project.title}
                  </h3>
                </div>
                
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-md text-white hover:bg-[#00D2BE] hover:text-black transition-colors">
                    <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM BUTTON --- */}
      <div className="w-full flex justify-center mt-12 md:mt-16">
        <button className="group relative px-8 py-3 bg-transparent text-white font-bold tracking-widest uppercase text-sm border border-white/20 rounded-full overflow-hidden hover:border-[#00D2BE] transition-all duration-300">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">View All Projects</span>
            <div className="absolute inset-0 bg-[#00D2BE] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
        </button>
      </div>

    </section>
  );
}