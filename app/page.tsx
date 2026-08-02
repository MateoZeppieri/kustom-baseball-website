import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#CBAD7D]">
            Premium Custom Baseball Equipment
          </p>

          <h1 className="max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
            Designed for Your Team.
            <span className="block text-[#CBAD7D]">
              Built to Perform.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Premium batting gloves, sliding mitts, elbow guards, leg guards,
            hand guards, and arm sleeves custom made to match your team's
            colors, logos, and style.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-[#CBAD7D] px-8 py-4 font-semibold text-black transition hover:brightness-110">
              Book a Consultation
            </button>

            <button className="rounded-full border border-[#CBAD7D] px-8 py-4 font-semibold text-[#CBAD7D] transition hover:bg-[#CBAD7D] hover:text-black">
              Browse Products
            </button>
          </div>
        </section>
      </main>
    </>
  );
}