"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Product = {
  name: string;
  eyebrow: string;
  description: string;
  images: string[];
  video?: string;
};

const products: Record<string, Product> = {
  "elbow-guard": {
    name: "ELBOW GUARD.",
    eyebrow: "KUSTOM BASEBALL",
    description:
      "Premium custom elbow protection designed around your organization's colors, logos, and identity.",
    images: [
      "/images/Products/elbow-guards/standard/Single Strap Elbow Guard.jpeg",
    ],
    video:
      "/images/Products/elbow-guards/standard/videos/standard-elbow-guard-layers.mp4",
  },

  "extended-elbow-guard": {
    name: "EXTENDED PROTECTION ELBOW GUARD.",
    eyebrow: "KUSTOM BASEBALL",
    description:
      "Extended custom elbow protection designed to provide additional coverage while maintaining mobility and comfort.",
    images: [
      "/images/Products/elbow-guards/extended/elbow-guard.png",
    ],
    video:
      "/images/Products/elbow-guards/extended/videos/extended-elbow-guard-layers.mp4",
  },

  "hand-guard": {
    name: "HAND GUARD.",
    eyebrow: "KUSTOM BASEBALL",
    description:
      "Lightweight, low-profile hand protection designed to protect without interfering with your swing.",
    images: [
      "/images/Products/hand-guard/hand-guard.png",
      "/images/Products/hand-guard/Hand Guard real.jpeg",
      "/images/Products/hand-guard/hand guard back.jpeg",
    ],
    video:
      "/images/Products/hand-guard/videos/hand-guard-layers.MP4",
  },

  "extended-leg-guard": {
    name: "EXTENDED PROTECTION LEG GUARD.",
    eyebrow: "KUSTOM BASEBALL",
    description:
      "Extended protection down the shin and ankle while maintaining a comfortable fit and full mobility.",
    images: [
      "/images/Products/leg-guard/leg-guard.png",
      "/images/Products/leg-guard/leg guard layers.jpeg",
    ],
    video:
      "/images/Products/leg-guard/videos/leg-guard-layers.MP4",
  },

  "sliding-mitt": {
    name: "SLIDING MITT.",
    eyebrow: "KUSTOM BASEBALL",
    description:
      "Designed to protect your hand during headfirst slides while remaining comfortable and flexible.",
    images: [
      "/images/Products/sliding-mitt/sliding-mitt.png",
      "/images/Products/sliding-mitt/sliding mitt front.jpeg",
    ],
    video:
      "/images/Products/sliding-mitt/videos/sliding-mitt-layers.mp4",
  },

  "short-cuff-batting-gloves": {
    name: "SHORT CUFF BATTING GLOVES.",
    eyebrow: "KUSTOM BASEBALL",
    description:
      "Premium Cabretta leather batting gloves designed for a comfortable, responsive fit and professional feel.",
    images: [
      "/images/Products/batting-gloves/batting-gloves.png",
    ],
    video:
      "/images/Products/batting-gloves/videos/short-cuff-batting-gloves.mp4",
  },

  "long-cuff-batting-gloves": {
    name: "LONG CUFF BATTING GLOVES.",
    eyebrow: "KUSTOM BASEBALL",
    description:
      "Premium Cabretta leather batting gloves with an extended cuff for additional wrist coverage and a professional fit.",
    images: [
      "/images/Products/batting-gloves/batting-gloves.png",
    ],
    video:
      "/images/Products/batting-gloves/videos/long-cuff-batting-gloves.mp4",
  },

  "arm-sleeves": {
    name: "ARM SLEEVES.",
    eyebrow: "KUSTOM BASEBALL",
    description:
      "Custom team arm sleeves designed to complete your organization's on-field look with comfortable, lightweight performance.",
    images: [
      "/images/Products/arm-sleeves/arm-sleeves.png",
      "/images/Products/arm-sleeves/Arm sleeve multiple.jpeg",
    ],
    video:
      "/images/Products/arm-sleeves/videos/arm-sleeves.mp4",
  },
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = products[slug];

  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-5xl font-bold">404</p>
          <p className="mt-4 text-white/50">Product not found.</p>

          <Link
            href="/"
            className="mt-8 inline-block text-sm text-white/70 hover:text-white"
          >
            ← Back to Kustom Baseball
          </Link>
        </div>
      </main>
    );
  }

  const handleScroll = () => {
    if (!galleryRef.current) return;

    const scrollLeft = galleryRef.current.scrollLeft;
    const width = galleryRef.current.clientWidth;

    const index = Math.round(scrollLeft / width);

    setActiveImage(index);
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-7 md:px-12 lg:px-16">

          <Link href="/">
            <img
              src="/images/logo/kustom-baseball-logo.png"
              alt="Kustom Baseball"
              className="w-[150px] md:w-[175px]"
            />
          </Link>

          <Link
            href="/"
            className="text-sm text-white/70 transition hover:text-white"
          >
            ← Back
          </Link>

        </div>
      </header>


      {/* PRODUCT INTRO */}
      <section className="mx-auto max-w-[1500px] px-6 pt-14 pb-10 md:px-12 md:pt-20 lg:px-16">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dfbc7d]">
          {product.eyebrow}
        </p>

        <h1 className="mt-5 max-w-[1000px] text-5xl font-bold uppercase leading-[0.95] md:text-7xl lg:text-8xl">
          {product.name}
        </h1>

        <p className="mt-6 max-w-[700px] text-lg leading-relaxed text-white/50 md:text-xl">
          {product.description}
        </p>

      </section>


      {/* VIDEO */}
      {product.video && (
        <section className="mx-auto max-w-[1100px] px-6 pb-10 md:px-12">

          <div className="overflow-hidden bg-white">

            <video
              src={product.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="block h-auto w-full"
            />

          </div>

        </section>
      )}


      {/* SWIPEABLE PRODUCT GALLERY */}
      {product.images.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-6 pb-20 md:px-12">

          <div
            ref={galleryRef}
            onScroll={handleScroll}
            className="
              flex
              snap-x
              snap-mandatory
              overflow-x-auto
              overscroll-x-contain
              scrollbar-hide
              touch-pan-x
              gap-4
              rounded-none
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >

            {product.images.map((image, index) => (
              <div
                key={image}
                className="
                  min-w-full
                  snap-center
                  overflow-hidden
                  bg-white
                "
              >

                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="
                    block
                    h-auto
                    max-h-[750px]
                    w-full
                    object-contain
                  "
                />

              </div>
            ))}

          </div>


          {/* GALLERY DOTS */}
          {product.images.length > 1 && (
            <div className="mt-5 flex justify-center gap-2">

              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    galleryRef.current?.scrollTo({
                      left:
                        index *
                        (galleryRef.current?.clientWidth || 0),
                      behavior: "smooth",
                    });

                    setActiveImage(index);
                  }}
                  aria-label={`View image ${index + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    activeImage === index
                      ? "bg-[#dfbc7d]"
                      : "bg-white/20"
                  }`}
                />

              ))}

            </div>
          )}

        </section>
      )}


      {/* CONFIDENCE */}
      <section className="border-t border-white/10 px-6 py-20 md:px-12 lg:px-16">

        <div className="mx-auto max-w-[1200px]">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dfbc7d]">
            WHAT CONFIDENCE LOOKS LIKE
          </p>

          <h2 className="mt-5 max-w-[900px] text-4xl font-bold uppercase leading-tight md:text-6xl">
            BUILT TO LOOK
            <br />
            LIKE YOUR TEAM.
          </h2>

          <p className="mt-7 max-w-[750px] text-lg leading-relaxed text-white/50">
            Every piece is fully customized around your organization's
            colors, logos, and identity — giving your players gear that
            looks professional and feels like it belongs to the team.
          </p>

        </div>

      </section>


      {/* TEAM CTA */}
      <section className="border-t border-white/10 px-6 py-20 md:px-12 lg:px-16">

        <div className="mx-auto max-w-[1200px]">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dfbc7d]">
            YOUR ORGANIZATION
          </p>

          <h2 className="mt-5 max-w-[850px] text-4xl font-bold uppercase leading-tight md:text-6xl">
            YOUR TEAM.
            <br />
            YOUR IDENTITY.
          </h2>

          <p className="mt-6 max-w-[700px] text-lg leading-relaxed text-white/50">
            Bring Kustom Baseball to your team and create a complete
            custom gear collection built around your organization.
          </p>

          <Link
            href="/#contact"
            className="mt-8 inline-flex rounded-full bg-[#dfbc7d] px-9 py-4 font-semibold text-black transition hover:opacity-90"
          >
            Start Your Team Collection
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 md:px-12 lg:px-16">

        <div className="mx-auto max-w-[1500px]">

          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            © {new Date().getFullYear()} Kustom Baseball
          </p>

        </div>

      </footer>

    </main>
  );
}