import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-black border-b border-neutral-800">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center">
          <Image
            src="/images/logo/k-logo.svg"
            alt="Kustom Baseball"
            width={42}
            height={42}
            priority
          />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          <a href="#" className="hover:text-[#CBAD7D] transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-[#CBAD7D] transition-colors">
            Products
          </a>
          <a href="#" className="hover:text-[#CBAD7D] transition-colors">
            Gallery
          </a>
          <a href="#" className="hover:text-[#CBAD7D] transition-colors">
            Team Orders
          </a>
          <a href="#" className="hover:text-[#CBAD7D] transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}