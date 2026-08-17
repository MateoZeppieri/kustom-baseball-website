"use client";

import { useState } from "react";
import Link from "next/link";

const products = [
  {
    name: "EXTENDED PROTECTION ELBOW GUARD",
    href: "#",
    image: "/images/Products/elbow-guards/extended/elbow-guard.png",
  },
  {
    name: "ELBOW GUARD",
    href: "#",
    image:
      "/images/Products/elbow-guards/standard/Single Strap Elbow Guard.jpeg",
  },
  {
    name: "EXTENDED PROTECTION LEG GUARD",
    href: "#",
    image: "/images/Products/leg-guard/leg-guard.png",
  },
  {
    name: "HAND GUARD",
    href: "#",
    image: "/images/Products/hand-guard/hand-guard.png",
  },
  {
    name: "LONG CUFF BATTING GLOVES",
    href: "#",
    image:
      "/images/Products/batting-gloves/long-cuff/long-cuff-batting-gloves.png",
  },
  {
    name: "SHORT CUFF BATTING GLOVES",
    href: "#",
    image:
      "/images/Products/batting-gloves/short-cuff/short-cuff-batting-gloves.PNG",
  },
  {
    name: "SLIDING MITT",
    href: "#",
    image: "/images/Products/sliding-mitt/sliding-mitt.png",
  },
  {
    name: "ARM SLEEVES",
    href: "#",
    image: "/images/Products/arm-sleeves/arm-sleeves.png",
  },
];

const faqs = [
  {
    question: "What is Kustom?",
    answer:
      "Kustom creates premium, custom-made baseball gear for teams and organizations. Each collection is built around your team's colors, logos, and identity.",
  },
  {
    question: "What gear does Kustom offer?",
    answer:
      "Kustom offers premium batting gloves, elbow guards, leg guards, hand guards, sliding mitts, and arm sleeves, all customized for your team.",
  },
  {
    question: "How does the sizing process work?",
    answer:
      "Before the team ordering window opens, we come to your organization with product samples and properly size every player in person. This helps take the guesswork out of ordering.",
  },
  {
    question: "How does team ordering work?",
    answer:
      "Your team receives a dedicated team ordering page where players and families can shop the collection and place their orders before the team's order deadline.",
  },
  {
    question: "How do I choose my size?",
    answer:
      "Players select their name on the team ordering page, and the sizes from their in-person fitting are already preselected. That means families can review the gear and order without guessing at sizes.",
  },
  {
    question: "How long does my order take?",
    answer:
      "Because your gear is custom-made to your team's design and sizing, orders typically take 6–8 weeks to be delivered after the team ordering window closes.",
  },
  {
    question: "Can I order after the deadline?",
    answer:
      "Team ordering pages have a specific deadline so we can submit the team's custom order for production. We recommend placing your order before the deadline shown on your team's page.",
  },
];

export default function HomePage() {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black">

      {/* NAVIGATION */}
      <header className="relative z-50 bg-black">
        <div className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-6 md:h-[90px] md:px-10 lg:px-14">

          <Link href="/">
            <img
              src="/images/logo/kustom-baseball-logo.png"
              alt="Kustom Baseball"
              className="w-[125px] md:w-[155px]"
            />
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-white md:flex">
            <a href="#home" className="hover:text-[#dfbc7d]">
              Home
            </a>

            <a href="#faq" className="hover:text-[#dfbc7d]">
              FAQ
            </a>

            <a
              href="#team-collection"
              className="rounded-full border border-[#dfbc7d] px-5 py-2.5 text-[#dfbc7d] hover:bg-[#dfbc7d] hover:text-black"
            >
              Bring Kustom to Your Team
            </a>

            <a href="#contact" className="hover:text-[#dfbc7d]">
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-[6px] md:hidden"
          >
            <span className="h-[2px] w-7 bg-white" />
            <span className="h-[2px] w-7 bg-white" />
            <span className="h-[2px] w-7 bg-white" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="bg-black px-6 pb-6 md:hidden">
            <nav className="flex flex-col gap-5 pt-4 text-sm font-semibold text-white">
              <a href="#home">Home</a>
              <a href="#faq">FAQ</a>
              <a href="#team-collection" className="text-[#dfbc7d]">
                Bring Kustom to Your Team
              </a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        )}
      </header>


      {/* HERO */}
      <section
        id="home"
        className="relative h-[72svh] min-h-[540px] overflow-hidden bg-black md:h-[78svh] md:min-h-[600px]"
      >
        <img
          src="/images/Hero/Hero-mobile.png"
          alt="Kustom Baseball player"
          className="h-full w-full object-cover object-center md:hidden"
        />

        <img
          src="/images/Hero/Hero-desktop.png"
          alt="Kustom Baseball player"
          className="hidden h-full w-full object-cover object-center md:block"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1500px] px-6 pb-10 md:px-10 lg:px-14">

          <h1 className="text-4xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl">
            REP YOUR OWN.
          </h1>

          <p className="mt-4 text-xs font-semibold tracking-[0.08em] text-white/90 sm:text-sm">
            Premium gear. Built for players who represent.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href="/team"
              className="inline-flex rounded-full bg-[#dfbc7d] px-7 py-3 text-sm font-semibold"
            >
              Shop Your Team
            </Link>

            <a
              href="#team-collection"
              className="inline-flex rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white"
            >
              Bring Kustom to Your Team
            </a>

          </div>

        </div>
      </section>


      {/* PRODUCTS */}
      <section
        id="products"
        className="bg-white px-5 py-8 sm:px-6 md:px-10 md:py-10 lg:px-14"
      >
        <div className="mx-auto max-w-[1500px]">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d55]">
            OUR GEAR
          </p>

          <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Made for Your Team.
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-7">

            {products.map((product, index) => {
              if (index >= 4 && !showAllProducts) return null;

              return (
                <Link
                  key={product.name}
                  href={product.href}
                  className="group"
                >
                  <div className="aspect-square overflow-hidden bg-[#f6f6f4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <h3 className="mt-3 text-[10px] font-semibold uppercase leading-tight sm:text-xs md:text-sm">
                    {product.name}
                  </h3>
                </Link>
              );
            })}

          </div>

          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="rounded-full border border-[#0066d6] px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-black"
            >
              {showAllProducts ? "Show Less ↑" : "View All Gear ↓"}
            </button>
          </div>

        </div>
      </section>


      {/* PANTHERS PARTNER */}
      <section className="bg-white px-6 py-3 md:py-4">
        <div className="mx-auto flex max-w-[800px] flex-col items-center text-center">

          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45 sm:text-[10px]">
            Official Custom Gear Partner of
          </p>

          <img
            src="/images/logo/team logos/Panthers logo.png"
            alt="Kitchener Panthers"
            className="mt-2 h-11 w-auto object-contain"
          />

          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-black/70 sm:text-sm">
            Kitchener Panthers
          </p>

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-[#f8f8f6] px-6 py-6 md:px-10 md:py-8 lg:px-14"
      >
        <div className="mx-auto max-w-[1500px]">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d55]">
            HOW IT WORKS
          </p>

          <div className="mt-5 grid gap-8 md:grid-cols-3 md:gap-8">

            {/* STEP 1 */}
            <div>
              <div className="aspect-video overflow-hidden bg-white">
                <img
                  src="/images/how-it-works/See and try it on.png"
                  alt="See and try on Kustom Baseball gear"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pt-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#b08d55]">
                  01
                </p>

                <h3 className="mt-2 text-xl font-bold uppercase">
                  See & Try It On
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-black/55">
                  We come to your organization with samples, properly size
                  every player in person, and answer questions from players
                  and parents.
                </p>
              </div>
            </div>


            {/* STEP 2 */}
            <div>
              <div className="aspect-video overflow-hidden bg-white">
                <img
                  src="/images/how-it-works/Get your link and order photo updated.png"
                  alt="Shop your team ordering page"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pt-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#b08d55]">
                  02
                </p>

                <h3 className="mt-2 text-xl font-bold uppercase">
                  Shop Your Team Page
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-black/55">
                  Once every player is sized, your team receives its dedicated
                  page. Select your player and their fitted sizes will already be
                  preselected for you. Order before the deadline so your order can
                  be included with the team&apos;s production order.
                </p>
              </div>
            </div>


            {/* STEP 3 */}
            <div>
              <div className="aspect-video overflow-hidden bg-white">
                <img
                  src="/images/how-it-works/production-delivery.png"
                  alt="Kustom Baseball production and team delivery"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pt-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#b08d55]">
                  03
                </p>

                <h3 className="mt-2 text-xl font-bold uppercase">
                  Production & Delivery
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-black/55">
                  Once the team order closes, we submit it for production and
                  deliver the finished gear directly to your team. Because every
                  order is custom-made to your team and sizing, delivery typically
                  takes 6–8 weeks.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* BRING KUSTOM TO YOUR TEAM */}
      <section
        id="team-collection"
        className="bg-white px-6 py-16 md:px-10 md:py-20 lg:px-14"
      >
        <div className="mx-auto max-w-[900px]">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d55]">
            FOR TEAMS & ORGANIZATIONS
          </p>

          <h2 className="mt-3 text-4xl font-bold uppercase leading-[0.95] md:text-5xl">
            BRING KUSTOM
            <br />
            TO YOUR TEAM.
          </h2>

          <p className="mt-5 max-w-[690px] text-sm leading-relaxed text-black/55 md:text-base">
            Interested in a custom Kustom collection for your organization?
            Tell us who you&apos;re with and how to reach you. We&apos;ll learn
            about your program, answer questions, and see if Kustom is a fit.
          </p>

          <p className="mt-3 max-w-[690px] text-xs leading-relaxed text-black/40">
            No commitment. You don&apos;t need final colors, logos, sizes, or
            player counts yet.
          </p>

          <form
            className="mt-8 grid gap-4 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();

              const form = event.currentTarget;

              const name =
                (form.elements.namedItem("name") as HTMLInputElement).value;

              const organization =
                (form.elements.namedItem("organization") as HTMLInputElement).value;

              const role =
                (form.elements.namedItem("role") as HTMLSelectElement).value;

              const email =
                (form.elements.namedItem("email") as HTMLInputElement).value;

              const phone =
                (form.elements.namedItem("phone") as HTMLInputElement).value;

              const program =
                (form.elements.namedItem("program") as HTMLInputElement).value;

              const message =
                (form.elements.namedItem("message") as HTMLTextAreaElement).value;

              const subject = encodeURIComponent(
                `Bring Kustom to Your Team — ${organization}`
              );

              const body = encodeURIComponent(
                `Name: ${name}\n\nOrganization: ${organization}\n\nRole: ${role}\n\nEmail: ${email}\n\nPhone: ${phone || "Not provided"}\n\nTeams / Age Groups: ${program || "Not provided"}\n\nAdditional Details:\n${message || "None provided."}`
              );

              window.location.href =
                `mailto:hello@kustombaseball.com?subject=${subject}&body=${body}`;
            }}
          >

            <input
              name="name"
              type="text"
              required
              placeholder="Your Name"
              className="border border-black/15 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-black"
            />

            <input
              name="organization"
              type="text"
              required
              placeholder="Organization / Club"
              className="border border-black/15 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-black"
            />

            <select
              name="role"
              required
              defaultValue=""
              className="border border-black/15 bg-[#fafafa] px-4 py-3 text-sm text-black outline-none transition focus:border-black"
            >
              <option value="" disabled>
                Your Role
              </option>
              <option value="Organization Director / Executive">
                Organization Director / Executive
              </option>
              <option value="Coach">Coach</option>
              <option value="Team Manager">Team Manager</option>
              <option value="Parent">Parent</option>
              <option value="Player">Player</option>
              <option value="Other">Other</option>
            </select>

            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="border border-black/15 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-black"
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              className="border border-black/15 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-black"
            />

            <input
              name="program"
              type="text"
              placeholder="Teams / Age Groups (optional)"
              className="border border-black/15 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-black"
            />

            <textarea
              name="message"
              rows={3}
              placeholder="Anything you'd like us to know? (optional)"
              className="resize-none border border-black/15 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-black md:col-span-2"
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-[#dfbc7d] px-7 py-3 text-sm font-semibold transition hover:bg-[#d3ad6d]"
              >
                Bring Kustom to My Team
              </button>
            </div>

          </form>

          <p className="mt-4 text-[10px] text-black/35">
            We&apos;ll follow up to learn more about your organization before
            asking for final team artwork or collection details.
          </p>

        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="bg-[#f8f8f6] px-6 py-16 md:px-10 md:py-20 lg:px-14"
      >
        <div className="mx-auto max-w-[900px]">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d55]">
            FAQ
          </p>

          <h2 className="mt-3 text-4xl font-bold uppercase md:text-5xl">
            QUESTIONS?
          </h2>

          <div className="mt-8 divide-y divide-black/10">

            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-semibold uppercase md:text-base">
                  {faq.question}

                  <span className="text-xl font-light text-[#b08d55]">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-[750px] text-sm leading-relaxed text-black/55">
                  {faq.answer}
                </p>
              </details>
            ))}

          </div>
        </div>
      </section>


      {/* CONTACT */}
      <section
        id="contact"
        className="bg-white px-6 py-16 md:px-10 md:py-20 lg:px-14"
      >
        <div className="mx-auto max-w-[900px]">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d55]">
            HAVE A QUESTION?
          </p>

          <h2 className="mt-3 text-4xl font-bold uppercase leading-[0.95] md:text-5xl">
            LET’S TALK
            <br />
            BASEBALL.
          </h2>

          <p className="mt-5 max-w-[600px] text-sm leading-relaxed text-black/55 md:text-base">
            Whether you’re a parent, player, coach, or organization
            representative, we’re here to help.
          </p>

          <a
            href="mailto:hello@kustombaseball.com"
            className="mt-7 inline-flex rounded-full bg-[#dfbc7d] px-7 py-3 text-sm font-semibold"
          >
            Contact Kustom
          </a>

        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-black px-6 py-7 md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">

          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
            © {new Date().getFullYear()} Kustom Baseball
          </p>

          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
            Rep Your Own.
          </p>

        </div>
      </footer>

    </main>
  );
}