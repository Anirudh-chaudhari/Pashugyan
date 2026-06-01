/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buildSignUpHref } from "@/lib/auth-links";

const navLinks = [
  { href: "/detect", label: "Detect" },
  { href: "/database", label: "Database" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/what-we-provide", label: "What We Provide", active: true },
  { href: "/help-guide", label: "Help" },
];

const healthItems = [
  "Customized vaccination schedules based on age and region.",
  "Nutrition guides for maximum growth and immunity.",
  "Early-warning symptom detection through image analysis.",
];

const heartlandItems = [
  {
    icon: "language",
    title: "Multi-lingual Support",
    description:
      "Available in Hindi, Punjabi, Marathi, Tamil, and more for ease of use across regions.",
  },
  {
    icon: "signal_wifi_off",
    title: "Offline Capability",
    description:
      "Critical identification features work even without a stable internet connection in remote areas.",
  },
  {
    icon: "verified_user",
    title: "Expert Verified",
    description:
      "Insights are calibrated by veterinary professionals and dairy experts for maximum reliability.",
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

type WhatWeProvideClientProps = {
  fontClassName: string;
};

export function WhatWeProvideClient({
  fontClassName,
}: WhatWeProvideClientProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${fontClassName} min-h-screen bg-[#fbf9f8] text-[#1b1c1c]`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reveal {
          opacity: 0;
        }

        .reveal.visible {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hover-zoom img {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-zoom:hover img {
          transform: scale(1.05);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal.visible,
          .hover-zoom img {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
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
          className="rounded-full bg-[#2e7d32] px-6 py-2 text-[14px] font-bold leading-5 text-white transition-all hover:opacity-90 active:scale-95"
        >
          Try Now
        </Link>
      </header>

      <main className="mx-auto flex-grow w-full max-w-[1600px] px-4 pb-20 pt-28 md:px-8">
        <section className="reveal mb-20 text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.25em] text-[#2e7d32]">
            <span className="material-symbols-outlined text-lg">layers</span>
            Our Services
          </div>
          <h1 className="mb-6 text-6xl font-bold leading-tight text-[#1b1c1c] md:text-7xl">
            Empowering Indian Farmers
            <br />
            <span className="text-[#2e7d32]">with Precision AI</span>
          </h1>
          <p className="mx-auto max-w-2xl text-[18px] leading-7 text-[#40493d] lg:mx-0">
            PashuGyan provides a comprehensive suite of digital tools designed
            to modernize livestock management, ensuring better health for your
            animals and higher profits for your farm.
          </p>
        </section>

        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="reveal hover-zoom group relative h-[500px] overflow-hidden rounded-[2.5rem] border border-[#bfcaba] bg-[#f5f3f3] shadow-sm transition-all hover:shadow-xl md:col-span-8">
            <div className="absolute inset-0 z-0">
              <img
                alt="Healthy cattle in a bright Indian pasture"
                className="h-full w-full object-cover"
                src="/images/stitch/what-we-provide-hero.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="absolute bottom-0 z-10 p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2e7d32] px-4 py-1.5 text-white shadow-lg shadow-[#2e7d32]/20">
                <span className="material-symbols-outlined text-[18px]">
                  camera_enhance
                </span>
                <span className="text-[12px] font-medium uppercase tracking-[0.18em]">
                  AI Powered
                </span>
              </div>
              <h2 className="mb-3 text-4xl font-bold leading-tight text-white">
                Instant Breed Identification
              </h2>
              <p className="max-w-lg text-[16px] leading-relaxed text-white/90">
                Identify indigenous and exotic breeds in seconds. Our AI
                achieves 98%+ accuracy by analyzing physical traits, helping you
                confirm pedigree and market value instantly.
              </p>
            </div>
          </div>

          <div className="reveal flex flex-col justify-between rounded-[2.5rem] border border-[#bfcaba] bg-white p-10 shadow-sm md:col-span-4">
            <div>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2e7d32]/10 text-[#2e7d32]">
                <span
                  className="material-symbols-outlined text-[36px]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  medical_services
                </span>
              </div>
              <h2 className="mb-6 text-2xl font-semibold leading-8 text-[#1b1c1c]">
                Health &amp; Care Plans
              </h2>
              <ul className="space-y-5">
                {healthItems.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[22px] text-[#2e7d32]">
                      check_circle
                    </span>
                    <span className="text-[16px] leading-6 text-[#40493d]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/help-guide#contact"
              className="mt-10 block w-full rounded-xl border-2 border-[#2e7d32] py-4 text-center text-[14px] font-bold leading-5 text-[#2e7d32] transition-all hover:bg-[#2e7d32] hover:text-white"
            >
              View Sample Plan
            </Link>
          </div>

          <div className="reveal relative overflow-hidden rounded-[2.5rem] border border-[#bfcaba] bg-[#f0eded] p-10 shadow-sm md:col-span-5">
            <div className="relative z-10">
              <h2 className="mb-3 text-2xl font-semibold leading-8 text-[#1b1c1c]">
                Market Value Estimates
              </h2>
              <p className="mb-8 text-[16px] leading-relaxed text-[#40493d]">
                Real-time pricing data from Mandis and private auctions across
                India to help you negotiate the best price for your livestock.
              </p>
              <div className="rounded-2xl border border-[#bfcaba] bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-[0.18em] text-[#40493d]">
                    Estimated Value
                  </span>
                  <span className="flex items-center gap-1 text-[16px] font-bold leading-6 text-[#8f4e00]">
                    <span className="material-symbols-outlined text-sm">
                      trending_up
                    </span>
                    4% this month
                  </span>
                </div>
                <div className="text-4xl font-bold leading-tight text-[#1b1c1c]">
                  &#8377;75,000 - &#8377;82,500
                </div>
              </div>
            </div>
            <div className="absolute -bottom-16 -right-16 opacity-[0.03]">
              <span
                className="material-symbols-outlined text-[280px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                payments
              </span>
            </div>
          </div>

          <div className="reveal relative flex flex-col items-center gap-8 overflow-hidden rounded-[2.5rem] bg-[#2e7d32] p-10 text-white shadow-lg shadow-[#2e7d32]/10 md:col-span-7 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-3 text-2xl font-semibold leading-8">
                Milk Yield Projections
              </h2>
              <p className="mb-8 text-[16px] leading-relaxed text-white/90">
                Leverage biological data and historical trends to predict daily
                and seasonal milk production levels. Plan your distribution and
                sales with precision.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-md">
                  <div className="mb-1 text-[10px] uppercase tracking-[0.18em] opacity-70">
                    Peak Yield
                  </div>
                  <div className="text-2xl font-bold">18L/Day</div>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-md">
                  <div className="mb-1 text-[10px] uppercase tracking-[0.18em] opacity-70">
                    Lactation
                  </div>
                  <div className="text-2xl font-bold">305 Days</div>
                </div>
              </div>
            </div>

            <div className="relative h-56 w-full flex-1 overflow-hidden rounded-[1.5rem] border-4 border-white/10 shadow-2xl md:h-full">
              <img
                alt="Milk yield planning dashboard beside dairy livestock"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                src="/images/stitch/what-we-provide-milk.jpg"
              />
            </div>
          </div>
        </div>

        <section className="mb-20 rounded-[2.5rem] border border-[#bfcaba] bg-[#eae8e7] p-10 md:p-16">
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-4xl font-bold leading-tight text-[#1b1c1c]">
              Built for the Indian Heartlands
            </h3>
            <p className="mx-auto max-w-xl text-[16px] leading-relaxed text-[#40493d]">
              Our technology is tested in diverse climatic conditions and local
              environments across the subcontinent.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {heartlandItems.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#2e7d32]/10 text-[#2e7d32]">
                  <span className="material-symbols-outlined text-[40px]">
                    {item.icon}
                  </span>
                </div>
                <h4 className="mb-3 text-xl font-semibold leading-7 text-[#1b1c1c]">
                  {item.title}
                </h4>
                <p className="text-[16px] leading-6 text-[#40493d]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal rounded-[2.5rem] border border-[#2e7d32]/10 bg-[#2e7d32]/[0.03] px-8 py-16 text-center">
          <h2 className="mb-8 text-5xl font-bold leading-tight text-[#1b1c1c]">
            Ready to transform your farm?
          </h2>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href={buildSignUpHref()}
              className="rounded-full bg-[#2e7d32] px-12 py-5 text-[14px] font-bold leading-5 text-white shadow-xl shadow-[#2e7d32]/20 transition-all hover:-translate-y-1"
            >
              Start a Free Scan
            </Link>
            <Link
              href="/help-guide#contact"
              className="rounded-full border-2 border-[#2e7d32] bg-white px-12 py-5 text-[14px] font-bold leading-5 text-[#2e7d32] transition-all hover:bg-[#2e7d32]/5"
            >
              Contact an Expert
            </Link>
          </div>
        </section>
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

          <div className="flex flex-wrap gap-x-16 gap-y-8">
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
              <div className="flex gap-6">
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
