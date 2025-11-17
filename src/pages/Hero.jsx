import bg from "../assets/bg.jpg";


export default function Hero() {
  return (
    <section
      className="h-screen w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-[55%]"></div>

      <div className="w-[45%] bg-[#0e0e0e]/90 h-full flex flex-col justify-center px-20 text-white">
        <h1 className="text-[80px] dynalight-regular leading-none">Just Things</h1>

        <h1 className="text-[70px] text-(--color-gold) tracking-wide font-serif mt-4">
          <span className="border-b bungee-outline-regular pb-2">Photography.</span>
        </h1>

        <p className="text-sm mt-8 leading-relaxed max-w-[380px]">
          Through my lens, every leaf, every ripple, every quiet burst of light becomes a story. I capture more than just scenery — I preserve emotion, color, and the living soul of the moment.
        </p>
      </div>
    </section>
  );
}
