"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAnimalFallbackEmoji } from "@/lib/breed-images";
import { buildSignUpHref } from "@/lib/auth-links";
import { Breed } from "@/types/breed";

type FilterKey = "all" | "cattle" | "buffalo" | "draft";

type DatabaseClientProps = {
  breeds: Breed[];
  fontClassName: string;
};

const navLinks = [
  { href: "/detect", label: "Detect" },
  { href: "/database", label: "Database", active: true },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/help-guide", label: "Help" },
];

const filterOptions: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All Breeds" },
  { key: "cattle", label: "Cattle" },
  { key: "buffalo", label: "Buffalo" },
  { key: "draft", label: "Draft Purpose" },
];

const featuredOrder = [
  "brown-swiss",
  "deoni",
  "gir",
  "holstein-friesian",
  "jaffarabadi",
  "kangayam",
  "kankrej",
  "khillari",
  "murrah",
  "pandharpuri",
  "sahiwal",
  "toda",
];

const INITIAL_VISIBLE_COUNT = featuredOrder.length;

const footerColumns = [
  {
    title: "Resources",
    links: [
      { href: "/database", label: "Breed Database" },
      { href: "/how-it-works", label: "Research Papers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

function BreedImage({
  alt,
  className,
  fallback,
  src,
}: {
  alt: string;
  className: string;
  fallback: string;
  src: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-label={alt}
        className={`${className} flex items-center justify-center bg-[#eae8e7] text-base font-semibold text-[#2e7d32]`}
        role="img"
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      src={src}
    />
  );
}

export function DatabaseClient({ breeds, fontClassName }: DatabaseClientProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [visibleSlugs, setVisibleSlugs] = useState<string[]>([]);

  const originalOrder = useMemo(() => {
    return new Map(breeds.map((breed, index) => [breed.slug, index]));
  }, [breeds]);

  const featuredOrderIndex = useMemo(() => {
    return new Map(featuredOrder.map((slug, index) => [slug, index]));
  }, []);

  const filteredBreeds = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return breeds.filter((breed) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          breed.name,
          breed.nameHindi,
          breed.origin,
          breed.originState,
          breed.type,
          breed.purpose,
          ...breed.characteristics,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "all" ||
        breed.type === activeFilter ||
        (activeFilter === "draft" && breed.purpose === "draft");

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, breeds, query]);

  const sortedBreeds = useMemo(() => {
    return [...filteredBreeds].sort((left, right) => {
      const leftFeatured = featuredOrderIndex.get(left.slug);
      const rightFeatured = featuredOrderIndex.get(right.slug);

      if (leftFeatured != null && rightFeatured != null) {
        return leftFeatured - rightFeatured;
      }

      if (leftFeatured != null) {
        return -1;
      }

      if (rightFeatured != null) {
        return 1;
      }

      return (
        (originalOrder.get(left.slug) ?? Number.MAX_SAFE_INTEGER) -
        (originalOrder.get(right.slug) ?? Number.MAX_SAFE_INTEGER)
      );
    });
  }, [featuredOrderIndex, filteredBreeds, originalOrder]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [activeFilter, query]);

  const visibleBreeds = useMemo(
    () => sortedBreeds.slice(0, visibleCount),
    [sortedBreeds, visibleCount],
  );
  const hasMore = visibleBreeds.length < sortedBreeds.length;

  useEffect(() => {
    setVisibleSlugs([]);

    const nextVisibleBreeds = sortedBreeds.slice(0, visibleCount);

    const timers = nextVisibleBreeds.map((breed, index) =>
      window.setTimeout(() => {
        setVisibleSlugs((current) =>
          current.includes(breed.slug) ? current : [...current, breed.slug],
        );
      }, 100 + index * 100),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [sortedBreeds, visibleCount]);

  return (
    <div
      className={`${fontClassName} min-h-screen bg-[#fbf9f8] font-body-md text-[#1b1c1c] selection:bg-[#88d982] selection:text-[#002204]`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }

        .breed-card {
          transition:
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            opacity 0.6s ease,
            top 0.6s ease;
          opacity: 0;
          top: 20px;
          position: relative;
        }

        .breed-card.visible {
          opacity: 1;
          top: 0;
        }

        .breed-card:hover {
          transform: translateY(-8px);
          border-color: #2e7d32;
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
        }

        .search-container {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-container:focus-within {
          box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.1);
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .breed-card,
          .search-container {
            transition: none !important;
            transform: none !important;
            animation: none !important;
            opacity: 1 !important;
            top: 0 !important;
          }
        }
      `}</style>

      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#bfcaba] bg-[#fbf9f8]/80 px-4 py-4 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-2">
          <span className="text-[24px] font-bold leading-8 text-[#2e7d32]">
            PashuGyan
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.active
                  ? "border-b-2 border-[#2e7d32] pb-1 text-[14px] font-medium leading-5 text-[#2e7d32]"
                  : "text-[14px] font-medium leading-5 text-[#40493d] transition-colors hover:text-[#2e7d32]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={buildSignUpHref()}
          className="rounded-full bg-[#2e7d32] px-6 py-2.5 text-[14px] font-semibold leading-5 text-white transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          Try Now
        </Link>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 pb-20 pt-24 md:px-8">
        <section className="mb-12">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="mb-2 text-[48px] font-bold leading-tight text-[#1b1c1c] md:text-6xl">
                Indian Breed <span className="text-[#2e7d32]">Database</span>
              </h1>
              <p className="max-w-2xl text-[18px] leading-7 text-[#40493d]">
                A comprehensive library of verified indigenous livestock
                breeds, maintained with precision for the modern Indian farmer.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="search-container relative w-full flex-grow rounded-2xl border border-[#bfcaba] bg-[#f5f3f3]">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#40493d]">
                  search
                </span>
                <input
                  className="w-full rounded-2xl border-none bg-transparent py-4 pl-12 pr-4 text-[16px] leading-6 outline-none focus:ring-0"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search breeds by name or state..."
                  type="text"
                  value={query}
                />
              </div>

              <div className="no-scrollbar flex w-full gap-3 overflow-x-auto pb-2 md:w-auto md:pb-0">
                {filterOptions.map((filter) => {
                  const active = filter.key === activeFilter;

                  return (
                    <button
                      key={filter.key}
                      className={
                        active
                          ? "whitespace-nowrap rounded-full bg-[#2e7d32] px-6 py-2.5 text-[14px] font-semibold leading-5 text-white shadow-sm transition-all"
                          : "whitespace-nowrap rounded-full bg-[#eae8e7] px-6 py-2.5 text-[14px] font-semibold leading-5 text-[#40493d] transition-all hover:bg-[#2e7d32]/10 hover:text-[#2e7d32]"
                      }
                      onClick={() => setActiveFilter(filter.key)}
                      type="button"
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          id="breed-grid"
        >
          {visibleBreeds.map((breed, index) => (
            <article
              key={breed.slug}
              className={`breed-card group flex flex-col overflow-hidden rounded-[2rem] border border-[#bfcaba] bg-white shadow-sm ${
                visibleSlugs.includes(breed.slug) ? "visible" : ""
              }`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <BreedImage
                  alt={`${breed.name} breed`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fallback={getAnimalFallbackEmoji(breed.type)}
                  src={breed.imageUrl}
                />
                <div
                  className={
                    breed.type === "cattle"
                      ? "absolute right-4 top-4 rounded-full bg-[#2e7d32] px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white shadow-md"
                      : "absolute right-4 top-4 rounded-full bg-[#ff8f00] px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#623400] shadow-md"
                  }
                >
                  {breed.type === "cattle" ? "Cattle" : "Buffalo"}
                </div>
              </div>

              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-2 text-[24px] font-semibold leading-8 text-[#1b1c1c]">
                  {breed.name}
                </h3>
                <div className="mb-6 flex items-center gap-2 text-[#40493d]">
                  <span className="material-symbols-outlined text-xl text-[#2e7d32]">
                    location_on
                  </span>
                  <span className="text-[16px] leading-6">{breed.originState}</span>
                </div>

                <Link
                  className="mt-auto block w-full rounded-xl border-2 border-[#2e7d32] bg-[#2e7d32]/5 py-3 text-center text-[14px] font-semibold leading-5 text-[#2e7d32] transition-all duration-300 hover:bg-[#2e7d32] hover:text-white"
                  href={`/database/${breed.slug}`}
                >
                  View Profile
                </Link>
              </div>
            </article>
          ))}
        </section>

        {sortedBreeds.length === 0 ? (
          <div className="mt-12 rounded-[2rem] border border-dashed border-[#bfcaba] bg-[#f5f3f3] px-6 py-12 text-center">
            <p className="text-[18px] font-semibold leading-7 text-[#1b1c1c]">
              No breeds matched your search.
            </p>
            <p className="mt-2 text-[16px] leading-6 text-[#40493d]">
              Try a breed name like Gir or a state like Gujarat.
            </p>
          </div>
        ) : null}

        {sortedBreeds.length > 0 ? (
          <div className="mt-20 flex justify-center">
            {hasMore ? (
              <button
                className="flex items-center gap-2 rounded-full bg-[#eae8e7] px-10 py-4 text-[14px] font-semibold leading-5 text-[#1b1c1c] shadow-sm transition-all hover:bg-[#2e7d32]/10 hover:text-[#2e7d32] active:scale-95"
                onClick={() =>
                  setVisibleCount((current) =>
                    Math.min(current + 4, sortedBreeds.length),
                  )
                }
                type="button"
              >
                Load More Breeds
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            ) : (
              <div className="text-sm text-[#707a6c]">
                Showing all {sortedBreeds.length} breeds
              </div>
            )}
          </div>
        ) : null}
      </main>

      <footer className="w-full border-t border-[#bfcaba] bg-[#e4e2e1] px-4 py-16 md:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="flex flex-col gap-3">
            <span className="text-[24px] font-bold leading-8 text-[#2e7d32]">
              PashuGyan
            </span>
            <p className="max-w-sm text-[16px] leading-relaxed text-[#40493d]">
              &copy; 2024 PashuGyan. Empowering Indian agriculture with
              AI-driven precision and insights for every farmer.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2e7d32]">
                  {column.title}
                </p>
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[16px] leading-6 text-[#40493d] transition-all hover:text-[#2e7d32]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2e7d32]">
                Connect
              </p>
              <div className="flex gap-5">
                <a
                  aria-label="Facebook"
                  className="text-[#40493d] transition-colors hover:text-[#2e7d32]"
                  href="https://facebook.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-2xl">
                    facebook
                  </span>
                </a>
                <Link
                  aria-label="Website"
                  className="text-[#40493d] transition-colors hover:text-[#2e7d32]"
                  href="/"
                >
                  <span className="material-symbols-outlined text-2xl">
                    language
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Link
        aria-label="Start a quick scan"
        className="fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#2e7d32] text-white shadow-2xl transition-transform active:scale-90 md:hidden"
        href="/detect"
      >
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          photo_camera
        </span>
      </Link>
    </div>
  );
}
