export default function Navbar() {
  return (
    <nav className="absolute top-6 right-10 text-(--color-gold) flex gap-4 items-center">
      <span className="tracking-[0.3em] text-sm text-(--color-gold)">MENU</span>
      <div className="flex flex-col gap-[3px] cursor-pointer">
        <span className="w-6 h-[1.8px] bg-(--color-gold)"></span>
        <span className="w-6 h-[1.8px] bg-(--color-gold)"></span>
      </div>
    </nav>
  );
}
