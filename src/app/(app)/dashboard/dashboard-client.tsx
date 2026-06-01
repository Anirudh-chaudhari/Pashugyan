"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import breedsData from "@/data/breeds.json";
import { PhotoWithFallback } from "@/components/shared/photo-with-fallback";
import { useSupabaseAuth } from "@/components/auth/supabase-auth-provider";
import { useFarmerHistory } from "@/hooks/useFarmerHistory";
import { getBreedImage } from "@/lib/breed-images";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserInitials,
  type ScanHistoryItem,
} from "@/lib/supabase/profile";
import type { Breed } from "@/types/breed";

type DashboardClientProps = {
  fontClassName: string;
};

type HistoryCard = {
  badge: string;
  badgeTone: "high" | "medium" | "low";
  dateLabel: string;
  href: string;
  image: string;
  title: string;
};

const breedCatalog = breedsData as Breed[];

const fallbackHistoryCards: HistoryCard[] = [
  {
    badge: "98% High",
    badgeTone: "high",
    dateLabel: "Oct 12, 2023",
    href: "/database/sahiwal",
    image: "/images/stitch/dashboard-history-sahiwal.jpg",
    title: "Sahiwal Cow",
  },
  {
    badge: "92% High",
    badgeTone: "high",
    dateLabel: "Oct 10, 2023",
    href: "/database/murrah",
    image: "/images/stitch/dashboard-history-murrah.jpg",
    title: "Murrah Buffalo",
  },
  {
    badge: "74% Medium",
    badgeTone: "medium",
    dateLabel: "Oct 08, 2023",
    href: "/database/gir",
    image: "/images/stitch/dashboard-history-gir.jpg",
    title: "Gir Cow",
  },
];

function MaterialIcon({
  className,
  fill,
  name,
}: {
  className?: string;
  fill?: boolean;
  name: string;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className ?? ""}`.trim()}
      style={fill ? { fontVariationSettings: '"FILL" 1' } : undefined}
    >
      {name}
    </span>
  );
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function findBreedByName(name: string) {
  const key = normalizeKey(name);

  return (
    breedCatalog.find(
      (breed) =>
        normalizeKey(breed.name) === key || normalizeKey(breed.slug) === key,
    ) ?? null
  );
}

function formatHistoryDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const minutes = Math.max(1, Math.round((Date.now() - date.getTime()) / 60000));

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.round(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function formatMemberSince(dateString: string | undefined) {
  if (!dateString) {
    return "Member since Feb 2023";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Member since Feb 2023";
  }

  return `Member since ${new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date)}`;
}

function getMonthlyDelta(history: ScanHistoryItem[]) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const previousMonth = previousMonthDate.getMonth();
  const previousYear = previousMonthDate.getFullYear();

  let current = 0;
  let previous = 0;

  history.forEach((item) => {
    const createdAt = new Date(item.createdAt);

    if (Number.isNaN(createdAt.getTime())) {
      return;
    }

    if (
      createdAt.getMonth() === currentMonth &&
      createdAt.getFullYear() === currentYear
    ) {
      current += 1;
      return;
    }

    if (
      createdAt.getMonth() === previousMonth &&
      createdAt.getFullYear() === previousYear
    ) {
      previous += 1;
    }
  });

  return current - previous;
}

function getConfidenceTone(confidence: number) {
  if (confidence >= 0.9) {
    return "high" as const;
  }

  if (confidence >= 0.75) {
    return "medium" as const;
  }

  return "low" as const;
}

function getConfidenceLabel(confidence: number) {
  const percent = Math.round(confidence * 100);
  const tone = getConfidenceTone(confidence);
  const label = tone === "high" ? "High" : tone === "medium" ? "Medium" : "Low";

  return {
    label: `${percent}% ${label}`,
    tone,
  };
}

function fallbackHistoryImage(animalType: "buffalo" | "cattle" | "unknown") {
  if (animalType === "buffalo") {
    return "/images/stitch/dashboard-history-murrah.jpg";
  }

  return "/images/stitch/dashboard-history-gir.jpg";
}

function slugifyBreed(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getRecentMeta(
  latestScan: ScanHistoryItem | null,
  latestBreed: Breed | null,
) {
  if (!latestScan) {
    return "2 hours ago • Gujarat";
  }

  const location =
    latestBreed?.originState ??
    (latestScan.result.animalType === "buffalo" ? "Buffalo" : "Cattle");

  return `${formatRelativeTime(latestScan.createdAt)} • ${location}`;
}

export function DashboardClient({ fontClassName }: DashboardClientProps) {
  const { user } = useSupabaseAuth();
  const { history } = useFarmerHistory();
  const [hasMounted, setHasMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const animateElements = document.querySelectorAll(".dashboard-reveal");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const liveHistory = useMemo(() => (hasMounted ? history : []), [hasMounted, history]);
  const isAuthenticated = Boolean(user);
  const latestScan = liveHistory[0] ?? null;
  const latestBreed = latestScan ? findBreedByName(latestScan.result.breed) : null;
  const monthlyDelta = useMemo(() => getMonthlyDelta(liveHistory), [liveHistory]);

  const profileName = isAuthenticated
    ? getUserDisplayName(user) || "Rajesh Kumar"
    : "Rajesh Kumar";
  const greetingName = isAuthenticated
    ? `${profileName.split(" ")[0] ?? profileName} Ji`
    : "Rajesh Ji";
  const avatarLabel = getUserInitials(profileName);
  const profileAvatarUrl = isAuthenticated ? getUserAvatarUrl(user) : null;
  const memberSinceLabel = isAuthenticated
    ? formatMemberSince(user?.created_at)
    : "Member since Feb 2023";

  const totalAnimalsDisplay = liveHistory.length > 0 ? liveHistory.length : 24;
  const totalAnimalsLabel =
    liveHistory.length > 0
      ? monthlyDelta > 0
        ? `+${monthlyDelta} FROM LAST MONTH`
        : monthlyDelta < 0
          ? `${Math.abs(monthlyDelta)} FEWER THAN LAST MONTH`
          : "NO CHANGE FROM LAST MONTH"
      : "+3 FROM LAST MONTH";

  const recentTitle = latestScan
    ? `${latestScan.result.breed} Scan`
    : "Gir Cow Scan";
  const recentMeta = getRecentMeta(latestScan, latestBreed);
  const recentConfidence = latestScan
    ? `${Math.round(latestScan.result.confidence * 100)}% Confidence`
    : "94% Confidence";

  const recommendedActions = useMemo(() => {
    if (!latestBreed) {
      return [
        {
          description: "Add more dry fodder during the monsoon season.",
          icon: "nutrition",
          title: "Seasonal feeding tips for your Gir cow",
        },
        {
          description: "Scheduled FMD booster for next Tuesday.",
          icon: "vaccines",
          title: "Vaccination Reminder",
        },
      ];
    }

    return [
      {
        description:
          latestBreed.type === "buffalo"
            ? "Increase water access and cooling support during hot afternoons."
            : "Add more dry fodder and mineral support during the current season.",
        icon: "nutrition",
        title: `Seasonal feeding tips for your ${latestBreed.name}${
          latestBreed.type === "buffalo" ? "" : " cow"
        }`,
      },
      {
        description: "Scheduled FMD booster for next Tuesday.",
        icon: "vaccines",
        title: "Vaccination Reminder",
      },
    ];
  }, [latestBreed]);

  const historyCards = useMemo<HistoryCard[]>(() => {
    if (liveHistory.length === 0) {
      return fallbackHistoryCards;
    }

    const cards = liveHistory.slice(0, 3).map((item) => {
      const breed = findBreedByName(item.result.breed);
      const slug = breed?.slug ?? slugifyBreed(item.result.breed);
      const confidence = getConfidenceLabel(item.result.confidence);

      return {
        badge: confidence.label,
        badgeTone: confidence.tone,
        dateLabel: formatHistoryDate(item.createdAt),
        href: breed ? `/database/${breed.slug}` : "/dashboard#history",
        image: breed
          ? getBreedImage(slug)
          : fallbackHistoryImage(item.result.animalType),
        title: item.result.breed,
      };
    });

    if (cards.length === 3) {
      return cards;
    }

    return [...cards, ...fallbackHistoryCards.slice(cards.length)].slice(0, 3);
  }, [liveHistory]);

  return (
    <div
      className={`${fontClassName} min-h-screen overflow-x-hidden bg-[#fbf9f8] font-body-md text-[#1b1c1c]`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-family: "Material Symbols Outlined";
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
          line-height: 1;
        }

        .scrolled-header {
          background-color: rgba(251, 249, 248, 0.85);
          backdrop-filter: blur(12px);
        }

        .hover-card-effect {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-card-effect:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <header
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#bfcaba] px-gutter md:px-container-margin-desktop py-4 transition-all duration-300 ${
          scrolled
            ? "scrolled-header py-2"
            : "bg-[#fbf9f8]/80 backdrop-blur-md"
        }`}
        id="top-nav"
      >
        <div className="flex items-center gap-2">
          <span className="text-[24px] font-bold leading-8 text-[#2e7d32]">
            PashuGyan
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className="border-b-2 border-[#2e7d32] pb-1 text-[14px] font-medium leading-5 text-[#2e7d32] transition-colors font-display"
            href="/detect"
          >
            Detect
          </Link>
          <Link
            className="text-[14px] font-medium leading-5 text-[#40493d] transition-colors hover:text-[#2e7d32] font-display"
            href="/database"
          >
            Database
          </Link>
          <Link
            className="text-[14px] font-medium leading-5 text-[#40493d] transition-colors hover:text-[#2e7d32] font-display"
            href="/how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-[14px] font-medium leading-5 text-[#40493d] transition-colors hover:text-[#2e7d32] font-display"
            href="/help-guide"
          >
            Help
          </Link>
        </nav>

        <div className="flex items-center gap-stack-sm">
          <Link
            className="hidden rounded-xl border-2 border-[#2e7d32] px-6 py-2 text-[14px] font-semibold leading-5 text-[#2e7d32] transition-all hover:bg-[#2e7d32]/5 md:block font-display"
            href="/database"
          >
            Browse Breeds
          </Link>
          <Link
            className="rounded-xl bg-[#2e7d32] px-6 py-2 text-[14px] font-semibold leading-5 text-white shadow-lg shadow-[#2e7d32]/20 transition-all active:scale-95 font-display"
            href="/detect"
          >
            Try Now
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1600px] flex-col px-gutter pb-20 pt-24 md:px-container-margin-desktop">
        <section className="animate-fade-in-up mb-12 flex flex-col items-start justify-between gap-stack-md md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-4xl font-bold leading-tight text-[#1b1c1c] md:text-5xl font-display">
              Namaste, {greetingName}
            </h1>
            <p className="text-[18px] leading-7 text-[#40493d]">
              Manage your livestock and insights from your personal dashboard.
            </p>
          </div>

          <div className="hover-card-effect flex cursor-pointer items-center gap-6 rounded-[2rem] border border-[#bfcaba] bg-white p-4 pr-8 shadow-sm">
            <PhotoWithFallback
              alt="Profile"
              className="h-16 w-16 rounded-full border-4 border-[#f0eded] shadow-sm"
              emojiClassName="text-xl font-bold tracking-[0.08em] text-white"
              fallbackEmoji={avatarLabel}
              src={profileAvatarUrl}
            />
            <div className="flex flex-col">
              <span className="text-[20px] font-semibold leading-7 text-[#1b1c1c]">
                {profileName}
              </span>
              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#40493d]">
                {memberSinceLabel}
              </span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="grid grid-cols-1 gap-8 md:col-span-8 sm:grid-cols-2">
            <div
              className="dashboard-reveal hover-card-effect rounded-[2.5rem] border border-[#bfcaba] bg-white p-8 opacity-0 shadow-sm"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#40493d]">
                      Total Animals Identified
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2e7d32]/10 text-[#2e7d32]">
                      <MaterialIcon name="analytics" />
                    </div>
                  </div>
                  <div className="text-6xl font-bold leading-none text-[#2e7d32]">
                    {totalAnimalsDisplay}
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[12px] font-bold text-[#2e7d32]">
                  <MaterialIcon className="scale-75" fill name="trending_up" />
                  {totalAnimalsLabel}
                </div>
              </div>
            </div>

            <div
              className="dashboard-reveal hover-card-effect rounded-[2.5rem] border border-[#bfcaba] bg-white p-8 opacity-0 shadow-sm"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#40493d]">
                      Recent Activity
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8f4e00]/10 text-[#8f4e00]">
                      <MaterialIcon name="schedule" />
                    </div>
                  </div>
                  <div className="text-2xl font-semibold leading-8 text-[#1b1c1c]">
                    {recentTitle}
                  </div>
                  <p className="text-[16px] leading-6 text-[#40493d]">
                    {recentMeta}
                  </p>
                </div>
                <div className="mt-6 text-[12px] font-bold uppercase tracking-[0.18em] text-[#8f4e00]">
                  {recentConfidence}
                </div>
              </div>
            </div>

            <section
              className="dashboard-reveal sm:col-span-2 rounded-[2.5rem] border border-[#2e7d32]/10 bg-[#2e7d32]/[0.03] p-8 opacity-0"
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="-ml-4 mb-8 flex items-center gap-3 rounded-xl bg-[#2e7d32]/10 p-4 text-[20px] font-semibold leading-7 text-[#2e7d32] font-display">
                <MaterialIcon name="grass" />
                Recommended Actions
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {recommendedActions.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-2xl border border-[#2e7d32]/5 bg-white/60 p-6 backdrop-blur-sm transition-all hover:border-[#2e7d32]/20"
                  >
                    <div className="flex items-start gap-4">
                      <MaterialIcon className="mt-1 text-[#2e7d32]" name={action.icon} />
                      <div>
                        <p className="mb-1 font-bold text-[#1b1c1c]">
                          {action.title}
                        </p>
                        <p className="text-[16px] leading-6 text-[#40493d]">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-8 md:col-span-4">
            <div
              className="dashboard-reveal rounded-[2.5rem] border border-[#bfcaba] bg-white p-8 opacity-0 shadow-sm"
              style={{ animationDelay: "400ms" }}
            >
              <h3 className="-ml-4 mb-6 flex items-center gap-3 rounded-xl bg-[#2e7d32]/10 p-4 text-[20px] font-semibold leading-7 text-[#2e7d32] font-display">
                <MaterialIcon name="explore" />
                Quick Navigation
              </h3>
              <div className="space-y-3">
                <Link
                  className="group flex w-full items-center justify-between rounded-2xl border border-transparent bg-[#fbf9f8] p-4 text-[#1b1c1c] transition-all hover:border-[#bfcaba] hover:bg-white font-display"
                  href="/database"
                >
                  <div className="flex items-center gap-4">
                    <MaterialIcon className="text-[#2e7d32]" name="database" />
                    <span className="text-[14px] font-semibold leading-5">
                      Breed Database
                    </span>
                  </div>
                  <MaterialIcon
                    className="text-[#707a6c] transition-transform group-hover:translate-x-1"
                    name="chevron_right"
                  />
                </Link>

                <Link
                  className="group flex w-full items-center justify-between rounded-2xl border border-transparent bg-[#fbf9f8] p-4 text-[#1b1c1c] transition-all hover:border-[#bfcaba] hover:bg-white font-display"
                  href="/help-guide"
                >
                  <div className="flex items-center gap-4">
                    <MaterialIcon
                      className="text-[#2e7d32]"
                      name="contact_support"
                    />
                    <span className="text-[14px] font-semibold leading-5">
                      Farmer Support
                    </span>
                  </div>
                  <MaterialIcon
                    className="text-[#707a6c] transition-transform group-hover:translate-x-1"
                    name="chevron_right"
                  />
                </Link>

                <Link
                  className="group flex w-full items-center justify-between rounded-2xl border border-transparent bg-[#fbf9f8] p-4 text-[#1b1c1c] transition-all hover:border-[#bfcaba] hover:bg-white font-display"
                  href="/dashboard#history"
                >
                  <div className="flex items-center gap-4">
                    <MaterialIcon className="text-[#2e7d32]" name="history" />
                    <span className="text-[14px] font-semibold leading-5">
                      Detailed History
                    </span>
                  </div>
                  <MaterialIcon
                    className="text-[#707a6c] transition-transform group-hover:translate-x-1"
                    name="chevron_right"
                  />
                </Link>
              </div>
            </div>

            <div
              className="dashboard-reveal group relative overflow-hidden rounded-[2.5rem] bg-[#2e7d32] p-8 opacity-0 text-white shadow-2xl shadow-[#2e7d32]/30"
              style={{ animationDelay: "500ms" }}
            >
              <div className="relative z-10">
                <h4 className="mb-3 text-3xl font-bold leading-tight">
                  Upgrade to Pro
                </h4>
                <p className="mb-8 text-[16px] leading-7 text-white/90">
                  Get advanced disease detection and herd management tools with
                  our premium intelligence.
                </p>
                <button
                  className="w-full rounded-2xl bg-white px-8 py-4 font-bold text-[#2e7d32] shadow-xl transition-all hover:scale-[1.02] active:scale-95"
                  type="button"
                >
                  Learn More
                </button>
              </div>
              <MaterialIcon
                className="absolute -bottom-12 -right-12 text-[200px] opacity-10 transition-all duration-700 group-hover:rotate-12 group-hover:scale-110"
                fill
                name="verified"
              />
            </div>
          </aside>

          <section
            id="history"
            className="dashboard-reveal mt-8 scroll-mt-28 opacity-0 md:col-span-12"
            style={{ animationDelay: "600ms" }}
          >
            <div className="mb-8 flex items-center justify-between border-b-4 border-[#2e7d32]/10 pb-4">
              <h2 className="flex items-center gap-3 text-[32px] font-bold leading-10 text-[#1b1c1c] font-display">
                <span className="h-1 w-8 rounded-full bg-[#2e7d32]" />
                Identification History
              </h2>
              <Link
                className="group flex items-center gap-2 font-bold text-[#2e7d32] transition-transform hover:translate-x-2 font-display"
                href="/dashboard#history"
              >
                View All
                <MaterialIcon className="text-xl" name="arrow_forward" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {historyCards.map((item) => (
                <Link
                  key={`${item.title}-${item.dateLabel}`}
                  className="hover-card-effect group overflow-hidden rounded-[2.5rem] border border-[#bfcaba] bg-white shadow-sm"
                  href={item.href}
                >
                  <div className="relative h-56 overflow-hidden">
                    <PhotoWithFallback
                      alt={item.title}
                      className="h-full w-full"
                      fallbackEmoji="CW"
                      imgClassName="transition-transform duration-700 group-hover:scale-110"
                      src={item.image}
                    />
                    <div
                      className={`absolute right-4 top-4 rounded-xl px-4 py-2 text-sm font-bold shadow-lg ${
                        item.badgeTone === "high"
                          ? "bg-[#2e7d32] text-white"
                          : item.badgeTone === "medium"
                            ? "bg-[#ff8f00] text-[#623400]"
                            : "bg-[#ffdad6] text-[#93000a]"
                      }`}
                    >
                      {item.badge}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="mb-2 text-[24px] font-semibold leading-8 text-[#1b1c1c]">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-[#40493d]">
                      <span className="flex items-center gap-2 text-[16px] leading-6">
                        <MaterialIcon
                          className="text-[18px] text-[#2e7d32]"
                          name="calendar_today"
                        />
                        {item.dateLabel}
                      </span>
                      <MaterialIcon
                        className="transition-colors hover:text-[#2e7d32]"
                        name="more_vert"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Link
        aria-label="Start New Scan"
        className="group fixed bottom-8 right-8 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-[#2e7d32] text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
        href="/detect"
      >
        <MaterialIcon
          className="text-4xl transition-transform group-hover:rotate-12"
          fill
          name="photo_camera"
        />
        <span className="pointer-events-none absolute right-full mr-4 translate-x-2 whitespace-nowrap rounded-xl bg-[#1b1c1c] px-4 py-2 text-sm text-white opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Start New Scan
        </span>
      </Link>

      <footer className="w-full border-t border-[#bfcaba] bg-[#e4e2e1] px-gutter py-16 md:px-container-margin-desktop">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="flex flex-col gap-4">
            <span className="text-[24px] font-bold leading-8 text-[#2e7d32]">
              PashuGyan
            </span>
            <p className="max-w-sm text-[16px] leading-6 text-[#40493d]">
              &copy; 2024 PashuGyan. Empowering Indian agriculture with
              AI-driven precision and insights for every farmer.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div className="flex flex-col gap-4">
              <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#2e7d32]">
                Resources
              </p>
              <Link
                className="text-[16px] leading-6 text-[#40493d] transition-all hover:text-[#2e7d32]"
                href="/database"
              >
                Breed Database
              </Link>
              <Link
                className="text-[16px] leading-6 text-[#40493d] transition-all hover:text-[#2e7d32]"
                href="/how-it-works"
              >
                Research Papers
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#2e7d32]">
                Legal
              </p>
              <Link
                className="text-[16px] leading-6 text-[#40493d] transition-all hover:text-[#2e7d32]"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-[16px] leading-6 text-[#40493d] transition-all hover:text-[#2e7d32]"
                href="/terms"
              >
                Terms of Service
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#2e7d32]">
                Connect
              </p>
              <div className="flex gap-6">
                <a
                  aria-label="Facebook"
                  className="text-[#40493d] transition-colors hover:text-[#2e7d32]"
                  href="https://facebook.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <MaterialIcon className="text-2xl" name="facebook" />
                </a>
                <Link
                  aria-label="Website"
                  className="text-[#40493d] transition-colors hover:text-[#2e7d32]"
                  href="/"
                >
                  <MaterialIcon className="text-2xl" name="language" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
