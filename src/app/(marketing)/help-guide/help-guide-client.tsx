/* eslint-disable @next/next/no-img-element */
"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const navLinks = [
  { href: "/detect", label: "Detect" },
  { href: "/database", label: "Database" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/help-guide", label: "Help", active: true },
];

const faqCards = [
  {
    title: "How to get a better photo?",
    description:
      "Good lighting and steady hands are key. Avoid harsh shadows and ensure the animal is centered in the frame for 99% accuracy.",
    badge: "Most Popular",
    icon: "help",
    href: "#photography-guide",
    cta: "Read detailed guide",
    tone: "default" as const,
  },
  {
    title: "Is it free?",
    description:
      "PashuGyan offers a generous free tier for individual farmers. For commercial fleets, we have enterprise solutions.",
    icon: "arrow_forward",
    href: "/detect",
    tone: "secondary" as const,
  },
  {
    title: "Offline access",
    description:
      "Yes! You can scan animals in the field without internet. Results will sync once you are back in range.",
    icon: "arrow_forward",
    href: "/how-it-works",
    tone: "tertiary" as const,
  },
];

const commonTopics = [
  { label: "Account Setup", href: "#contact", icon: "account_circle" },
  { label: "Breed Database", href: "/database", icon: "database" },
  { label: "Data Privacy", href: "/privacy-policy", icon: "security" },
  { label: "Marketplace Help", href: "#contact", icon: "shopping_cart" },
];

const photoTips = [
  {
    title: "Natural Lighting",
    description:
      "Take photos during early morning or late afternoon for soft, even light.",
    positive: true,
  },
  {
    title: "Side Profile",
    description:
      "Capture the full side of the animal to identify key anatomical markers.",
    positive: true,
  },
  {
    title: "Avoid Blurry Images",
    description:
      "Ensure the animal is stationary. Motion blur significantly drops AI confidence.",
    positive: false,
  },
];

const photoGallery = [
  {
    alt: "Clear cow photo",
    src: "/images/stitch/help-guide-perfect.jpg",
    label: "Perfect",
    positive: true,
  },
  {
    alt: "Poor cow photo",
    src: "/images/stitch/help-guide-avoid.jpg",
    label: "Avoid",
    positive: false,
  },
  {
    alt: "Farm landscape",
    src: "/images/stitch/help-guide-farm.jpg",
  },
];

const contactItems = [
  {
    label: "Email us",
    value: "support@pashugyan.com",
    href: "mailto:support@pashugyan.com",
    icon: "mail",
  },
  {
    label: "Call us",
    value: "+91 800-PASHU-GYAN",
    href: "tel:+918007274926",
    icon: "call",
  },
  {
    label: "Main Office",
    value: "AgriTech Hub, Sector 5, New Delhi, India",
    icon: "location_on",
  },
];

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

type HelpGuideClientProps = {
  fontClassName: string;
};

function isMatch(query: string, value: string) {
  return query.length === 0 || value.toLowerCase().includes(query);
}

function cardVisibility(active: boolean) {
  return active ? "opacity-100 scale-100" : "opacity-30 scale-[0.98]";
}

export function HelpGuideClient({ fontClassName }: HelpGuideClientProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const faqOneActive = isMatch(
    normalizedQuery,
    `${faqCards[0].title} ${faqCards[0].description}`,
  );
  const faqTwoActive = isMatch(
    normalizedQuery,
    `${faqCards[1].title} ${faqCards[1].description}`,
  );
  const faqThreeActive = isMatch(
    normalizedQuery,
    `${faqCards[2].title} ${faqCards[2].description}`,
  );
  const topicsActive = isMatch(
    normalizedQuery,
    commonTopics.map((item) => item.label).join(" "),
  );

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Support message drafted. Connect your backend to send it live.");
  };

  return (
    <div
      className={`${fontClassName} min-h-screen bg-[#fbf9f8] text-[#1b1c1c] selection:bg-[#a3f69c] selection:text-[#002204]`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }

        .hero-pattern {
          background-color: #fbf9f8;
          background-image: radial-gradient(#2e7d3211 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .reveal-on-scroll.active {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-on-scroll,
          .animate-slide-up,
          .animate-fade-in {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
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

        <div className="hidden md:block" />
      </header>

      <main className="pb-12 pt-24">
        <section className="hero-pattern flex flex-col items-center px-4 py-24 text-center md:px-8">
          <h1 className="mb-6 text-6xl font-bold leading-tight text-[#1b1c1c] max-md:text-[28px] md:text-8xl">
            How can we <span className="text-[#2e7d32]">help you?</span>
          </h1>
          <p className="mb-12 max-w-2xl text-[18px] leading-7 text-[#40493d]">
            Get the most out of PashuGyan with our comprehensive guides, FAQs,
            and expert support for your livestock management.
          </p>
          <div className="group relative w-full max-w-xl">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-[#707a6c] transition-colors group-focus-within:text-[#2e7d32]">
              search
            </span>
            <input
              className="h-16 w-full rounded-2xl border border-[#bfcaba] bg-white pl-14 pr-6 shadow-sm outline-none transition-all hover:shadow-md focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for help topics..."
              type="text"
              value={query}
            />
          </div>
        </section>

        <section className="reveal-on-scroll active mx-auto max-w-[1600px] px-4 py-16 md:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-[32px] font-bold leading-10 text-[#1b1c1c]">
              <span className="h-1 w-8 rounded-full bg-[#2e7d32]" />
              Frequently Asked Questions
            </h2>
            <Link
              className="group flex items-center gap-1 text-[14px] font-semibold leading-5 text-[#2e7d32] hover:underline"
              href="#contact"
            >
              View all topics
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div
              className={`group flex cursor-pointer flex-col rounded-[2rem] border border-[#bfcaba] bg-white p-8 transition-all duration-300 hover:shadow-lg md:col-span-2 ${cardVisibility(
                faqOneActive,
              )}`}
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="rounded-full bg-[#2e7d32] px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white">
                  {faqCards[0].badge}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2e7d32]/10 text-[#2e7d32]">
                  <span className="material-symbols-outlined">
                    {faqCards[0].icon}
                  </span>
                </div>
              </div>
              <h3 className="mb-3 text-[24px] font-semibold leading-8 text-[#1b1c1c]">
                {faqCards[0].title}
              </h3>
              <p className="mb-6 text-[18px] leading-7 text-[#40493d]">
                {faqCards[0].description}
              </p>
              <Link
                className="mt-auto flex items-center gap-1 text-[14px] font-semibold leading-5 text-[#2e7d32] hover:underline"
                href={faqCards[0].href}
              >
                {faqCards[0].cta}
                <span className="material-symbols-outlined text-[16px]">
                  open_in_new
                </span>
              </Link>
            </div>

            <Link
              className={`group flex min-h-[248px] flex-col justify-between rounded-[2rem] border border-[#bfcaba] bg-[#ffdcc2] p-8 text-[#2e1500] transition-all duration-300 hover:shadow-lg ${cardVisibility(
                faqTwoActive,
              )}`}
              href={faqCards[1].href}
            >
              <div>
                <h3 className="mb-3 text-[24px] font-semibold leading-8">
                  {faqCards[1].title}
                </h3>
                <p className="text-[16px] leading-6 text-[#6d3a00]">
                  {faqCards[1].description}
                </p>
              </div>
              <span className="material-symbols-outlined mt-6 self-end transition-transform group-hover:translate-x-1">
                {faqCards[1].icon}
              </span>
            </Link>

            <Link
              className={`group flex min-h-[248px] flex-col justify-between rounded-[2rem] border border-[#bfcaba] bg-[#d6e3ff] p-8 text-[#001b3d] transition-all duration-300 hover:shadow-lg ${cardVisibility(
                faqThreeActive,
              )}`}
              href={faqCards[2].href}
            >
              <div>
                <h3 className="mb-3 text-[24px] font-semibold leading-8">
                  {faqCards[2].title}
                </h3>
                <p className="text-[16px] leading-6 text-[#00468c]">
                  {faqCards[2].description}
                </p>
              </div>
              <span className="material-symbols-outlined mt-6 self-end transition-transform group-hover:translate-x-1">
                {faqCards[2].icon}
              </span>
            </Link>

            <div
              className={`rounded-[2.5rem] border border-[#bfcaba] bg-[#f0eded] p-8 transition-shadow hover:shadow-md md:col-span-2 ${cardVisibility(
                topicsActive,
              )}`}
            >
              <h3 className="-ml-4 mb-8 flex items-center gap-3 rounded-xl bg-[#2e7d32]/10 p-4 text-[20px] font-semibold leading-7 text-[#2e7d32]">
                <span className="material-symbols-outlined">grid_view</span>
                Common Topics
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {commonTopics.map((item) => (
                  <Link
                    key={item.label}
                    className="group flex items-center gap-4 rounded-2xl border border-[#bfcaba] bg-white p-4 transition-all hover:border-[#2e7d32] hover:bg-[#2e7d32]/5"
                    href={item.href}
                  >
                    <span className="material-symbols-outlined text-[#2e7d32] transition-transform group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-[14px] font-bold leading-5 text-[#1b1c1c]">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-4 py-12 md:px-8">
          <div
            id="photography-guide"
            className="reveal-on-scroll active relative overflow-hidden rounded-[2.5rem] bg-[#005312] p-10 text-white shadow-2xl md:p-16"
          >
            <div className="absolute -right-48 -top-48 h-96 w-96 rounded-full bg-[#2e7d32] opacity-20 blur-3xl" />

            <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.25em] text-[#a3f69c]">
                  <span className="material-symbols-outlined text-lg">camera</span>
                  Visual Best Practices
                </div>
                <h2 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
                  Photography <span className="text-[#88d982]">Guide</span>
                </h2>
                <p className="mb-12 max-w-xl text-[18px] leading-relaxed text-[#a3f69c] opacity-90">
                  Maximize the accuracy of our AI by following these simple
                  professional photography tips designed for farm environments.
                </p>

                <div className="space-y-8">
                  {photoTips.map((item) => (
                    <div key={item.title} className="flex gap-6">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg ${
                          item.positive ? "bg-[#2e7d32]" : "bg-[#ba1a1a]"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-3xl text-white"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          {item.positive ? "check_circle" : "cancel"}
                        </span>
                      </div>
                      <div>
                        <h4 className="mb-1 text-[24px] font-semibold leading-8">
                          {item.title}
                        </h4>
                        <p className="text-[16px] leading-6 text-[#a3f69c] opacity-80">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-[2rem] border-4 border-[#2e7d32] shadow-xl group">
                  <img
                    alt={photoGallery[0].alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={photoGallery[0].src}
                  />
                  <div className="absolute bottom-4 left-4 rounded-lg bg-[#2e7d32] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#cbffc2]">
                    {photoGallery[0].label}
                  </div>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-[2rem] border-4 border-[#ffdad6]/50 shadow-xl group">
                  <img
                    alt={photoGallery[1].alt}
                    className="h-full w-full object-cover grayscale brightness-50 transition-transform duration-700 group-hover:scale-105"
                    src={photoGallery[1].src}
                  />
                  <div className="absolute bottom-4 left-4 rounded-lg bg-[#ba1a1a] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.18em] text-white">
                    {photoGallery[1].label}
                  </div>
                </div>

                <div className="col-span-2 h-48 overflow-hidden rounded-[2rem] shadow-xl group">
                  <img
                    alt={photoGallery[2].alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={photoGallery[2].src}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="reveal-on-scroll active mx-auto grid max-w-[1600px] gap-24 px-4 py-24 lg:grid-cols-2 lg:items-start md:px-8"
        >
          <div>
            <h2 className="mb-6 flex items-center gap-3 text-[32px] font-bold leading-10 text-[#1b1c1c]">
              <span className="h-1 w-8 rounded-full bg-[#2e7d32]" />
              Still have questions?
            </h2>
            <p className="mb-12 text-[18px] leading-relaxed text-[#40493d]">
              Our support team is available Monday to Saturday, 9 AM - 6 PM. We
              typically respond within 24 hours.
            </p>

            <div className="space-y-8">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eae8e7] transition-colors group-hover:bg-[#2e7d32]/10">
                      <span className="material-symbols-outlined text-3xl text-[#2e7d32] transition-transform group-hover:scale-110">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.25em] text-[#40493d]">
                        {item.label}
                      </p>
                      <p className="text-xl font-semibold text-[#1b1c1c]">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    className="group flex items-center gap-6"
                    href={item.href}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="group flex items-center gap-6">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-[#bfcaba] bg-white p-10 shadow-sm">
            <form className="space-y-6" onSubmit={submitForm}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="ml-1 text-[14px] font-bold leading-5 text-[#1b1c1c]">
                    First Name
                  </label>
                  <input
                    className="h-14 w-full rounded-xl border border-[#bfcaba] px-4 outline-none transition-all focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="ml-1 text-[14px] font-bold leading-5 text-[#1b1c1c]">
                    Last Name
                  </label>
                  <input
                    className="h-14 w-full rounded-xl border border-[#bfcaba] px-4 outline-none transition-all focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-[14px] font-bold leading-5 text-[#1b1c1c]">
                  Email Address
                </label>
                <input
                  className="h-14 w-full rounded-xl border border-[#bfcaba] px-4 outline-none transition-all focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]"
                  type="email"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-[14px] font-bold leading-5 text-[#1b1c1c]">
                  Subject
                </label>
                <select className="h-14 w-full appearance-none rounded-xl border border-[#bfcaba] bg-white px-4 outline-none transition-all focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]">
                  <option>Technical Support</option>
                  <option>Billing Inquiry</option>
                  <option>Breed Identification Feedback</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-[14px] font-bold leading-5 text-[#1b1c1c]">
                  Message
                </label>
                <textarea
                  className="w-full resize-none rounded-xl border border-[#bfcaba] p-4 outline-none transition-all focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32]"
                  rows={4}
                />
              </div>

              <button
                className="w-full rounded-2xl bg-[#2e7d32] py-5 text-lg font-bold text-white shadow-lg shadow-[#2e7d32]/20 transition-all hover:opacity-90 active:scale-[0.98]"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#bfcaba] bg-[#e4e2e1] px-4 py-16 md:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="flex flex-col gap-3">
            <span className="text-[24px] font-bold leading-8 text-[#2e7d32]">
              PashuGyan
            </span>
            <p className="max-w-sm text-[16px] leading-6 text-[#40493d]">
              &copy; 2024 PashuGyan. Empowering Indian agriculture with
              AI-driven precision and insights for every farmer.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#2e7d32]">
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
              <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#2e7d32]">
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
                  <span className="flex h-6 w-6 items-center justify-center text-[20px] font-bold leading-none">
                    f
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
    </div>
  );
}
