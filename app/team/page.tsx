"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

type TeamSearchResult = {
  id: string;
  name: string;
  organization: string | null;
  age_group: string | null;
  season: string | null;
  slug: string | null;
  primaryLogo: string | null;
  secondaryLogo: string | null;
  colors: Record<string, string>;
  published: boolean;
  active: boolean;
};

export default function TeamSearchPage() {
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState<TeamSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const requestIdRef = useRef(0);

  async function searchTeams(searchValue: string) {
    const trimmed = searchValue.trim();

    if (!trimmed) {
      setTeams([]);
      setSearched(false);
      setError("");
      setLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/team-search?q=${encodeURIComponent(trimmed)}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Unable to search teams.");
      }

      if (requestId !== requestIdRef.current) return;

      setTeams(Array.isArray(result?.teams) ? result.teams : []);
      setSearched(true);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;

      setTeams([]);
      setSearched(true);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to search teams."
      );
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setTeams([]);
      setSearched(false);
      setError("");
      setLoading(false);
      return;
    }

    const timer = window.setTimeout(() => {
      void searchTeams(trimmed);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void searchTeams(query);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-black">
      {/* HEADER */}
      <header className="bg-black text-white">
        <div className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-6 md:h-[90px] md:px-10 lg:px-14">
          <Link href="/" className="inline-flex items-center">
            <img
              src="/images/logo/kustom-baseball-logo.png"
              alt="Kustom Baseball"
              className="w-[125px] md:w-[155px]"
            />
          </Link>

          <Link
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
          >
            Back Home
          </Link>
        </div>
      </header>

      {/* HERO / SEARCH */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[980px] px-6 py-14 text-center md:px-10 md:py-20">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#dfbc7d] md:text-xs">
            Team Collections
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
            Find Your Team
          </h1>

          <p className="mx-auto mt-4 max-w-[620px] text-sm leading-6 text-black/50 md:text-base">
            Search your organization or team to access your official Kustom collection.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-[720px]"
          >
            <div className="flex overflow-hidden border border-black/15 bg-white focus-within:border-black">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search team or organization..."
                autoComplete="off"
                className="h-14 min-w-0 flex-1 bg-transparent px-5 text-sm font-semibold outline-none placeholder:text-black/30 md:h-16 md:text-base"
              />

              <button
                type="submit"
                className="shrink-0 bg-black px-5 text-[9px] font-black uppercase tracking-[0.14em] text-white md:px-8 md:text-[10px]"
              >
                Search
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-[980px] px-6 py-10 md:px-10 md:py-14">
        {loading && (
          <div className="border border-black/10 bg-white px-6 py-8 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-black/45">
              Searching teams...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="border border-black/10 bg-white px-6 py-8 text-center">
            <p className="text-sm font-black uppercase">
              We couldn&apos;t search teams.
            </p>
            <p className="mt-2 text-xs text-black/45">
              {error}
            </p>
            <button
              type="button"
              onClick={() => void searchTeams(query)}
              className="mt-5 bg-black px-5 py-3 text-[9px] font-black uppercase tracking-[0.12em] text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && teams.length > 0 && (
          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/35">
                  Search Results
                </p>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-tight">
                  Choose Your Team
                </h2>
              </div>

              <p className="text-[9px] font-black uppercase tracking-[0.1em] text-black/30">
                {teams.length} {teams.length === 1 ? "Result" : "Results"}
              </p>
            </div>

            <div className="grid gap-3">
              {teams.map((team) => {
                const teamHref = team.slug
                  ? `/team/${team.slug}`
                  : null;

                return (
                  <article
                    key={team.id}
                    className="flex items-center gap-4 border border-black/10 bg-white p-4 md:p-5"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#f5f5f3] p-2 md:h-20 md:w-20">
                      {team.primaryLogo ? (
                        <img
                          src={team.primaryLogo}
                          alt={`${team.name} logo`}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-[9px] font-black uppercase tracking-[0.12em] text-black/25">
                          Kustom
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      {team.organization && (
                        <p className="truncate text-[8px] font-black uppercase tracking-[0.14em] text-[#b08d55] md:text-[9px]">
                          {team.organization}
                        </p>
                      )}

                      <h3 className="mt-1 truncate text-base font-black uppercase md:text-xl">
                        {team.name}
                      </h3>

                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-black/40">
                        {team.age_group && <span>{team.age_group}</span>}
                        {team.season && <span>{team.season}</span>}
                      </div>
                    </div>

                    {teamHref ? (
                      <Link
                        href={teamHref}
                        className="shrink-0 bg-black px-4 py-3 text-[8px] font-black uppercase tracking-[0.12em] text-white md:px-6 md:text-[9px]"
                      >
                        Shop Team
                      </Link>
                    ) : (
                      <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.1em] text-black/30">
                        Unavailable
                      </span>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {!loading &&
          !error &&
          searched &&
          teams.length === 0 &&
          query.trim() && (
            <div className="border border-black/10 bg-white px-6 py-10 text-center">
              <p className="text-lg font-black uppercase">
                Team Not Found
              </p>

              <p className="mx-auto mt-2 max-w-[520px] text-xs leading-5 text-black/45">
                We couldn&apos;t find a published Kustom collection matching
                &quot;{query.trim()}&quot;.
              </p>

              <Link
                href="/#team-collection"
                className="mt-6 inline-flex rounded-full border border-black bg-white px-6 py-3 text-[9px] font-black uppercase tracking-[0.12em] transition hover:bg-black hover:text-white"
              >
                Bring Kustom to Your Team
              </Link>
            </div>
          )}


      </section>

      <footer className="mt-auto border-t border-black/10 bg-black px-6 py-7 text-white md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
            Kustom Baseball
          </p>

          <Link
            href="/"
            className="text-[9px] uppercase tracking-[0.15em] text-white/40 hover:text-white"
          >
            Home
          </Link>
        </div>
      </footer>
    </main>
  );
}