"use client";

import Link from "next/link";
import { buildSignUpHref } from "@/lib/auth-links";
import { useAppStore } from "@/stores/useAppStore";
import {
  ChartColumn,
  MoonStar,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const navLinks = [
  { href: "/detect", label: "BreedDetection" },
  { href: "/database", label: "Database" },
  { href: "/how-it-works", label: "HowItWorks" },
  { href: "/what-we-provide", label: "WhatWeProvide" },
  { href: "/help-guide", label: "Help & Guide" },
];

const featureCards = [
  {
    icon: Search,
    title: "Accurate Identification",
    description:
      "Upload an image and get accurate breed identification within seconds.",
  },
  {
    icon: ChartColumn,
    title: "Data-Driven Insights",
    description:
      "Get detailed information about each breed, including characteristics and key traits.",
  },
  {
    icon: Users,
    title: "Simple & Easy",
    description: "Just upload a photo, no technical knowledge required.",
  },
];

const infoCards = [
  {
    title: "Breed detection",
    description: "Start an analysis from the first screen when you're ready.",
  },
  {
    title: "Private history",
    description: "Keep each farmer's scan history tied to their account.",
  },
  {
    title: "Dashboard access",
    description: "Logged-in farmers land on the full dashboard after sign in.",
  },
];

export function HomeLanding() {
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c]">
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }
      `}</style>

      <header className="fixed left-0 top-0 z-50 w-full border-b border-[#bfcaba] bg-[rgba(251,249,248,.82)] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2e7d32] text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-semibold text-[#1b1c1c]">
                PashuGyan
              </div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#40493d]/70">
                Livestock AI
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-[#40493d] transition-colors hover:text-[#2e7d32]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#bfcaba] bg-white text-[#1b1c1c] transition hover:bg-[#f5f3f3] md:inline-flex"
              onClick={toggleTheme}
              type="button"
            >
              <MoonStar className="h-5 w-5" />
            </button>
            <Link
              href="/sign-in?redirectTo=/dashboard"
              className="rounded-full border border-[#2e7d32] px-5 py-2 text-sm font-semibold text-[#2e7d32] transition hover:bg-[#2e7d32]/5"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6">
        <section
          className="relative flex min-h-[52vh] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-cover bg-center p-6 text-center shadow-sm sm:min-h-[60vh] sm:p-8"
          style={{
            backgroundImage:
              "linear-gradient(rgba(21,33,17,.56), rgba(21,33,17,.82)), url('/images/stitch/sign-in-farm-background.jpg')",
          }}
        >
          <div className="max-w-3xl">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4" />
              Namaste
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Identify Cow &amp; Buffalo Breeds Instantly
            </h1>
            <h2 className="mt-4 text-base leading-7 text-white/90 sm:text-lg">
              Upload a photo and get accurate breed details in seconds. Make
              better decisions for your livestock.
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={buildSignUpHref("/dashboard")}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white px-8 text-base font-semibold text-[#1b1c1c] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Try It Now
              </Link>
              <Link
                href="/sign-up?redirectTo=/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-[#2e7d32] px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#256428]"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 px-4 py-16 text-center sm:px-0 sm:pt-24">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why Choose PashuGyan?
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-7 text-[#40493d]">
              Quickly identify breeds and get useful insights to manage your
              livestock better.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-3">
            {featureCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 text-center shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2e7d32]/15 text-[#2e7d32]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-[#1b1c1c]">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-6 text-[#40493d]">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col items-center gap-6 px-4 py-16 text-center sm:pt-20">
          <div className="flex flex-col gap-2">
            <h2 className="max-w-3xl text-3xl font-bold sm:text-4xl">
              Start Identifying Breeds Today
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-7 text-[#40493d]">
              Instantly identify the breed and access complete care, feeding,
              and milk yield information.
            </p>
          </div>

          <div className="grid w-full max-w-5xl gap-4 rounded-[2rem] border border-[#bfcaba] bg-white p-6 shadow-sm sm:grid-cols-3 sm:p-8">
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl bg-[#fbf9f8] p-5 text-left shadow-sm"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2e7d32]">
                  {card.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-[#40493d]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-2xl items-center justify-center px-4 py-12">
          <div className="w-full rounded-2xl border border-[#bfcaba] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-2 text-2xl font-bold text-[#1b1c1c]">
              Get in touch
            </h2>
            <p className="mb-6 text-sm text-[#40493d]">
              Have a question or feedback? We&apos;d love to hear from you.
            </p>

            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium text-[#1b1c1c]"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-[#bfcaba] bg-transparent px-4 py-2.5 text-[#1b1c1c] outline-none transition focus:ring-2 focus:ring-[#2e7d32]"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium text-[#1b1c1c]"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-[#bfcaba] bg-transparent px-4 py-2.5 text-[#1b1c1c] outline-none transition focus:ring-2 focus:ring-[#2e7d32]"
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-1.5 block text-sm font-medium text-[#1b1c1c]"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  className="h-32 w-full resize-none rounded-lg border border-[#bfcaba] bg-transparent px-4 py-3 text-[#1b1c1c] outline-none transition focus:ring-2 focus:ring-[#2e7d32]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-[#2e7d32] px-8 py-3 font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#bfcaba] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 text-center text-sm text-[#40493d] sm:px-6 md:flex-row md:py-6 md:text-left">
          <span>
            Copyright {new Date().getFullYear()}{" "}
            <Link href="/" className="font-semibold text-[#2e7d32] hover:underline">
              PashuGyan
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#2e7d32] hover:underline">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#2e7d32] hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
