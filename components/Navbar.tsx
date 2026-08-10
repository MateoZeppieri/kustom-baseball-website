import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="relative z-50 h-[88px] bg-black">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8 md:px-12">

        {/* LOGO */}
        <a href="/" className="relative h-[48px] w-[180px]">
          <Image
            src="/images/logo/kustom-baseball-logo.png"
            alt="Kustom Baseball"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 text-sm font-medium text-white md:flex">
          <a
            href="/"
            className="transition-colors hover:text-[#CBAD7D]"
          >
            Home
          </a>

          <a
            href="#products"
            className="transition-colors hover:text-[#CBAD7D]"
          >
            Products
          </a>

          <a
            href="#gallery"
            className="transition-colors hover:text-[#CBAD7D]"
          >
            Gallery
          </a>

          <a
            href="#team-orders"
            className="transition-colors hover:text-[#CBAD7D]"
          >
            Team Orders
          </a>

          <a
            href="#contact"
            className="transition-colors hover:text-[#CBAD7D]"
          >
            Contact
          </a>
        </div>

        {/* MOBILE MENU */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>

      </div>
    </nav>
  );
}