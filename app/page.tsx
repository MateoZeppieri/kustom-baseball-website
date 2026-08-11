"use client";

import { useState } from "react";
import Link from "next/link";

const products = [
  {
    name: "EXTENDED PROTECTION ELBOW GUARD",
    slug: "extended-elbow-guard",
    image: "/images/Products/elbow-guards/extended/elbow-guard.png",
  },
  {
    name: "ELBOW GUARD",
    slug: "elbow-guard",
    image:
      "/images/Products/elbow-guards/standard/Single Strap Elbow Guard.jpeg",
  },
  {
    name: "EXTENDED PROTECTION LEG GUARD",
    slug: "extended-leg-guard",
    image: "/images/Products/leg-guard/leg-guard.png",
  },
  {
    name: "HAND GUARD",
    slug: "hand-guard",
    image: "/images/Products/hand-guard/hand-guard.png",
  },
  {
    name: "LONG CUFF BATTING GLOVES",
    slug: "long-cuff-batting-gloves",
    image:
      "/images/Products/batting-gloves/long-cuff/long-cuff-batting-gloves.png",
  },
  {
    name: "SHORT CUFF BATTING GLOVES",
    slug: "short-cuff-batting-gloves",
    image:
      "/images/Products/batting-gloves/short-cuff/short-cuff-batting-gloves.PNG",
  },
  {
    name: "SLIDING MITT",
    slug: "sliding-mitt",
    image: "/images/Products/sliding-mitt/sliding-mitt.png",
  },
  {
    name: "ARM SLEEVES",
    slug: "arm-sleeves",
    image: "/images/Products/arm-sleeves/arm-sleeves.png",
  },
];

export default function HomePage() {
  const [showAllProducts, setShowAllProducts] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <header className="relative z-20 w-full bg-black">
        <div className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-6 md:h-[90px] md:px-10 lg:px-14">

          <Link href="/">
            <img
              src="/images/logo/kustom-baseball-logo.png"
              alt="Kustom Baseball"
              className="w-[125px] md:w-[155px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a
              href="#products"
              className="transition hover:text-[#dfbc7d]"
            >
              Products
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-[#dfbc7d]"
            >
              How It Works
            </a>

            <a
              href="#contact"
              className="transition hover:text-[#dfbc7d]"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-7 bg-white" />
            <span className="h-0.5 w-7 bg-white" />
            <span className="h-0.5 w-7 bg-white" />
          </button>

        </div>
      </header>


      {/* HERO */}
      <section className="relative h-[72svh] min-h-[540px] overflow-hidden md:h-[78svh] md:min-h-[600px]">

        <picture className="absolute inset-0 block h-full w-full">

          {/* MOBILE HERO */}
          <source
            media="(max-width: 768px)"
            srcSet="/images/Hero/Hero%20image%20for%20mobile.png"
          />

          {/* DESKTOP + TABLET HERO */}
          <img
            src="/images/Hero/Hero%20image%20for%20desktop.png"
            alt="Kustom Baseball custom baseball gear"
            className="h-full w-full object-cover object-center"
          />

        </picture>

        {/* DARK BOTTOM FADE */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/95" />

        {/* SUBTLE EDGE DARKENING */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.4)_100%)]" />


        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-end px-6 pb-8 md:px-10 md:pb-10 lg:px-14">

          <div className="max-w-[480px]">

            <h1 className="text-4xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl">
              WEAR YOUR
              <br />
              CONFIDENCE.
            </h1>

            <p className="mt-4 max-w-[420px] text-xs font-semibold leading-relaxed tracking-[0.08em] text-white/85 sm:text-sm">
              Custom-made gear built for players who belong.
            </p>

            <a
              href="#products"
              className="mt-5 inline-flex rounded-full bg-[#dfbc7d] px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Explore Our Gear
            </a>

          </div>

        </div>

      </section>


      {/* PRODUCTS */}
      <section
        id="products"
        className="px-4 py-8 sm:px-6 md:px-10 md:py-10 lg:px-14"
      >

        <div className="mx-auto max-w-[1500px]">

          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#dfbc7d]">
              OUR GEAR
            </p>
          </div>


          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 md:grid-cols-4 md:gap-6">

            {products.map((product, index) => {

              if (index >= 4 && !showAllProducts) {
                return null;
              }

              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group block"
                >

                  <div className="aspect-square overflow-hidden bg-white">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                    />

                  </div>

                  <h2 className="mt-2.5 min-h-[32px] text-[10px] font-semibold uppercase leading-[1.2] tracking-[0.04em] sm:text-xs md:min-h-[38px] md:text-sm">
                    {product.name}
                  </h2>

                </Link>
              );
            })}

          </div>


          {/* VIEW ALL / SHOW LESS */}
          <div className="mt-8 flex justify-center">

            {!showAllProducts ? (
              <button
                type="button"
                onClick={() => setShowAllProducts(true)}
                className="inline-flex rounded-full border border-white/30 px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                View All Gear ↓
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAllProducts(false)}
                className="inline-flex rounded-full border border-white/30 px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                Show Less ↑
              </button>
            )}

          </div>

        </div>

      </section>


      {/* OFFICIAL CUSTOM GEAR PARTNER */}
      <section className="border-t border-white/10 px-6 py-8 md:px-10 md:py-10 lg:px-14">

        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs">
            Official Custom Gear Partner of the
          </p>

          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-base">
            Kitchener Panthers
          </p>

          <img
            src="/images/logo/team%20logos/Panthers%20logo.png"
            alt="Kitchener Panthers"
            className="mt-4 h-14 w-auto object-contain"
          />

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-t border-white/10 px-6 py-10 md:px-10 md:py-12 lg:px-14"
      >

        <div className="mx-auto max-w-[1500px]">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#dfbc7d]">
            HOW IT WORKS
          </p>


          {/* THREE STEPS */}
          <div className="mt-7 grid gap-8 md:grid-cols-3 md:gap-8">

            {/* STEP 1 */}
            <div className="pt-4">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#dfbc7d]">
                01
              </span>

              <h3 className="mt-2 text-lg font-bold uppercase">
                See & Try It On
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/50">
                We come to your team with samples, help players find the right
                sizes, and answer questions from players and parents.
              </p>

            </div>


            {/* STEP 2 */}
            <div className="border-t border-white/20 pt-4 md:border-t-0 md:border-l md:pl-8">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#dfbc7d]">
                02
              </span>

              <h3 className="mt-2 text-lg font-bold uppercase">
                Get Your Link
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Each family receives an individualized order link for their
                player. The sizes selected during the fitting are already
                preselected, making it easy to review the gear and place your
                order.
              </p>

            </div>


            {/* STEP 3 */}
            <div className="border-t border-white/20 pt-4 md:border-t-0 md:border-l md:pl-8">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#dfbc7d]">
                03
              </span>

              <h3 className="mt-2 text-lg font-bold uppercase">
                Pick Your Gear & Order
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Choose your gear and place your order. We’ll then have your
                custom products made and hand deliver them to your team.
                Because everything is custom-made for your team, production
                takes 6–8 weeks.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-white/10 px-6 py-12 md:px-10 md:py-16 lg:px-14"
      >

        <div className="mx-auto max-w-[1500px]">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#dfbc7d]">
            READY TO BUILD YOUR COLLECTION?
          </p>

          <h2 className="mt-3 text-4xl font-bold uppercase leading-[0.92] md:text-5xl">
            BRING KUSTOM
            <br />
            TO YOUR TEAM.
          </h2>

          <a
            href="mailto:hello@kustombaseball.com"
            className="mt-5 inline-flex rounded-full bg-[#dfbc7d] px-7 py-3 text-sm font-semibold text-black"
          >
            Start Your Team Collection
          </a>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-5 md:px-10 lg:px-14">

        <div className="mx-auto flex max-w-[1500px] justify-between">

          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            © {new Date().getFullYear()} Kustom Baseball
          </p>

          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.18em] text-white/35"
          >
            Kustom Baseball
          </Link>

        </div>

      </footer>

    </main>
  );
}