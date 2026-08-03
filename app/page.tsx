import Navbar from "@/components/Navbar";
import PremiumEquipment from "@/components/PremiumEquipment";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">
        {/* HERO */}
        <section className="relative flex min-h-[65vh] items-center overflow-hidden px-6 py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(203,173,125,0.10),transparent_65%)]" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-5xl font-black leading-none md:text-6xl lg:text-7xl">
                Premium Custom<br />Baseball<br />Equipment
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300 md:text-xl">
                Performance-driven equipment custom designed around your organization's colors,
                logos, and identity.
              </p>

              <button className="mt-10 rounded-full bg-[#CBAD7D] px-8 py-4 font-semibold text-black transition hover:opacity-90">
                Schedule a Team Fitting
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src="/images/hero-equipment.png"
                alt="Kustom Baseball Equipment"
                className="w-full max-w-2xl"
              />
            </div>
          </div>
        </section>

        <section className="-mt-12 pb-8">
          <div className="mx-auto max-w-7xl px-6">
            <PremiumEquipment />
          </div>
        </section>

        <section className="border-t border-white/10 pt-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#CBAD7D]">
                TEAM FITTING PROCESS
              </p>

              <h2 className="text-5xl font-black">How It Works</h2>

              <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-gray-300">
                Every collection is designed around your organization's colors,
                logos, and identity before each team is professionally fitted
                and orders custom equipment built specifically for them.
              </p>
            </div>

            <div className="mt-20 grid gap-10 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#CBAD7D]">Day 1</span>
                <h3 className="mt-4 text-3xl font-black">Team Visit</h3>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  We create an official collection built around your organization's colors,
                  logos, and identity. Each team then orders custom-fitted equipment from
                  that collection, creating a consistent, professional look across the organization.
                  During the fitting, players try on the equipment, get professionally sized,
                  and have any questions answered.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#CBAD7D]">Days 1–6</span>
                <h3 className="mt-4 text-3xl font-black">Player Ordering</h3>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Following the team fitting, every family receives a personalized ordering link
                  where they can purchase the products they choose.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Orders must be placed before the deadline so every player's order can be included
                  in the same team production run. Once the ordering window closes, production begins.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#CBAD7D]">6–8 Weeks</span>
                <h3 className="mt-4 text-3xl font-black">Receive Your Custom Equipment</h3>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Once production is complete, your team's custom equipment is delivered ready for the season.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-5xl font-black">Ready to Outfit Your Team?</h2>

            <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-gray-300">
              Schedule a team fitting and we'll handle everything from professional sizing
              and ordering to delivering premium custom equipment built around your organization's identity.
            </p>

            <button className="mt-12 rounded-full bg-[#CBAD7D] px-10 py-4 text-lg font-semibold text-black transition hover:opacity-90">
              Schedule a Team Fitting
            </button>
          </div>
        </section>
      </main>
    </>
  );
}