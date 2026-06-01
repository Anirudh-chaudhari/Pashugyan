/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buildSignUpHref } from "@/lib/auth-links";

const navLinks = [
  { href: "/detect", label: "Detect" },
  { href: "/database", label: "Database" },
  { href: "/how-it-works", label: "How It Works", active: true },
  { href: "/help-guide", label: "Help" },
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

const privacyCards = [
  {
    icon: "shield_lock",
    title: "End-to-End Encryption",
    description:
      "All photos and farm data are encrypted. We never share your personal information with third parties without your explicit consent.",
  },
  {
    icon: "cloud_off",
    title: "Edge Processing",
    description:
      "Where possible, our AI runs locally on your device to minimize data transmission and ensure lightning-fast results even with poor internet.",
  },
];

type HowItWorksClientProps = {
  fontClassName: string;
};

export function HowItWorksClient({ fontClassName }: HowItWorksClientProps) {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div
      className={`${fontClassName} min-h-screen overflow-x-hidden bg-[#fbf9f8] font-body-md text-[#1b1c1c]`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }

        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal.active {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#bfcaba] bg-[#fbf9f8]/80 px-4 py-4 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-2">
          <span className="text-[24px] font-bold leading-8 text-[#1b6d24]">
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
                  ? "border-b-2 border-[#1b6d24] pb-1 text-[14px] font-medium leading-5 text-[#1b6d24]"
                  : "text-[14px] font-medium leading-5 text-[#40493d] transition-colors hover:text-[#1b6d24]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={buildSignUpHref()}
          className="rounded-full bg-[#1b6d24] px-6 py-2 text-[14px] font-bold leading-5 text-white transition-all hover:shadow-lg active:scale-95"
        >
          Try Now
        </Link>
      </header>

      <main className="flex-grow pb-20 pt-32">
        <section className="reveal active mx-auto mb-20 max-w-[1600px] px-4 text-center md:px-8">
          <div className="mb-6 inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.25em] text-[#1b6d24]">
            <span className="material-symbols-outlined text-lg">science</span>
            Process Excellence
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-[#1b1c1c] md:text-7xl">
            Science Behind the <span className="text-[#1b6d24]">Shield</span>
          </h1>
          <p className="mx-auto max-w-2xl text-[18px] leading-relaxed text-[#40493d]">
            Bridging Indian agricultural tradition with state-of-the-art Deep
            Learning to provide instant, expert animal health and breed analysis
            in the palm of your hand.
          </p>
        </section>

        <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-8">
          <div className="reveal active group rounded-[2.5rem] border border-[#bfcaba] bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1b6d24]/10 text-[#1b6d24] transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-4xl">
                photo_camera
              </span>
            </div>
            <h3 className="mb-4 text-[24px] font-semibold leading-8 text-[#1b1c1c]">
              1. Snap a Photo
            </h3>
            <p className="mb-8 text-[16px] leading-6 text-[#40493d]">
              Simply point your phone&apos;s camera at the animal. No
              specialized equipment needed. Our interface is designed to work
              even in low-light field conditions.
            </p>
            <div className="aspect-video overflow-hidden rounded-2xl border border-[#bfcaba]">
              <img
                alt="Farmer taking photo"
                className="h-full w-full object-cover grayscale-[0.2] transition-all duration-500 hover:grayscale-0"
                src="/images/stitch/how-it-works-step-photo.jpg"
              />
            </div>
          </div>

          <div
            className="reveal active group rounded-[2.5rem] border border-[#bfcaba] bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            style={{ transitionDelay: "100ms" }}
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1b6d24]/10 text-[#1b6d24] transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-4xl">
                neurology
              </span>
            </div>
            <h3 className="mb-4 text-[24px] font-semibold leading-8 text-[#1b1c1c]">
              2. AI Analysis
            </h3>
            <p className="mb-8 text-[16px] leading-6 text-[#40493d]">
              Our Deep Learning models process your image in real-time, scanning
              thousands of visual markers to identify specific breeds and health
              indicators.
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-[#1b6d24]/10 bg-[#1b6d24]/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[14px] font-bold leading-5 text-[#1b1c1c]">
                    Neural Network
                  </span>
                  <span className="text-[12px] font-bold leading-4 text-[#1b6d24]">
                    Active
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#f0eded]">
                  <div className="h-full w-4/5 animate-pulse bg-[#1b6d24]" />
                </div>
              </div>
              <div className="rounded-xl border border-[#1b6d24]/10 bg-[#1b6d24]/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[14px] font-bold leading-5 text-[#1b1c1c]">
                    Pattern Matching
                  </span>
                  <span className="text-[12px] font-bold leading-4 text-[#1b6d24]">
                    Active
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#f0eded]">
                  <div className="h-full w-[92%] bg-[#1b6d24]" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="reveal active group rounded-[2.5rem] border border-[#bfcaba] bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1b6d24]/10 text-[#1b6d24] transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-4xl">
                task_alt
              </span>
            </div>
            <h3 className="mb-4 text-[24px] font-semibold leading-8 text-[#1b1c1c]">
              3. Get Result
            </h3>
            <p className="mb-8 text-[16px] leading-6 text-[#40493d]">
              Receive a comprehensive report with high confidence scores,
              detailed breed history, and recommended next steps for care or
              commerce.
            </p>
            <div className="relative rounded-2xl border border-[#1b6d24]/10 bg-[#1b6d24]/[0.03] p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#1b6d24]">
                    Premium Result
                  </p>
                  <h4 className="text-[20px] font-semibold leading-7 text-[#1b1c1c]">
                    Sahiwal Cattle
                  </h4>
                </div>
                <span className="rounded-full bg-[#1b6d24] px-2 py-1 text-[10px] font-bold text-white">
                  98.4%
                </span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#40493d]">
                  <span className="material-symbols-outlined text-lg text-[#1b6d24]">
                    check_circle
                  </span>
                  Origin: Punjab/Rajasthan
                </li>
                <li className="flex items-center gap-2 text-sm text-[#40493d]">
                  <span className="material-symbols-outlined text-lg text-[#1b6d24]">
                    check_circle
                  </span>
                  High Milk Productivity
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-32 max-w-[1600px] px-4 md:px-8">
          <div className="grid grid-cols-1 items-center gap-16 rounded-[3rem] border border-[#1b6d24]/10 bg-[#1b6d24]/[0.03] p-10 md:p-16 lg:grid-cols-2">
            <div className="reveal active">
              <h2 className="mb-6 text-4xl font-bold leading-tight text-[#1b1c1c] md:text-5xl">
                Unmatched Precision
              </h2>
              <p className="mb-10 text-[18px] leading-relaxed text-[#40493d]">
                Our model is trained on a proprietary dataset of over 2 million
                verified images of Indian livestock, ensuring accuracy that
                rivals veteran veterinary experts.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="mb-1 text-4xl font-bold text-[#1b6d24]">
                    95.8%
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#40493d]">
                    Model Accuracy
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-4xl font-bold text-[#1b6d24]">
                    &lt; 2s
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#40493d]">
                    Inference Speed
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal active lg:order-2">
              <div className="aspect-square overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl lg:aspect-video">
                <img
                  alt="Data visualization"
                  className="h-full w-full object-cover"
                  src="/images/stitch/how-it-works-precision.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="reveal active mx-auto mt-32 max-w-[1600px] px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold leading-tight text-[#1b1c1c]">
              Your Data, Your Control
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-[#1b6d24]" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {privacyCards.map((card) => (
              <div
                key={card.title}
                className="flex items-start gap-6 rounded-[2.5rem] border border-[#bfcaba] bg-white p-10"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1b6d24]/10 text-[#1b6d24]">
                  <span className="material-symbols-outlined text-3xl">
                    {card.icon}
                  </span>
                </div>
                <div>
                  <h4 className="mb-3 text-[20px] font-semibold leading-7 text-[#1b1c1c]">
                    {card.title}
                  </h4>
                  <p className="text-[16px] leading-relaxed text-[#40493d]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mb-12 mt-40 max-w-[1600px] px-4 md:px-8">
          <div className="rounded-[4rem] bg-[#1b6d24] p-12 text-center text-white md:p-24">
            <h2 className="mb-8 text-4xl font-bold leading-tight md:text-6xl">
              Ready to see it in action?
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg opacity-90">
              Join 50,000+ Indian farmers who are using PashuGyan to optimize
              their livestock health and profitability.
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Link
                href={buildSignUpHref()}
                className="rounded-full bg-white px-12 py-4 text-lg font-bold text-[#1b6d24] shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Start Free Scan
              </Link>
              <Link
                href={buildSignUpHref()}
                className="rounded-full border-2 border-white/50 px-12 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#bfcaba] bg-[#e4e2e1] px-4 py-12 md:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <span className="text-[24px] font-bold leading-8 text-[#1b6d24]">
              PashuGyan
            </span>
            <p className="max-w-sm text-[16px] leading-6 text-[#40493d]">
              &copy; 2024 PashuGyan. Empowering Indian agriculture with
              AI-driven precision and insights for every farmer.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1b6d24]">
                  {column.title}
                </p>
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[16px] leading-6 text-[#40493d] transition-all hover:text-[#1b6d24]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1b6d24]">
                Connect
              </p>
              <div className="flex gap-4">
                <a
                  aria-label="Facebook"
                  className="text-[#40493d] transition-colors hover:text-[#1b6d24]"
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
                  className="text-[#40493d] transition-colors hover:text-[#1b6d24]"
                  href="/"
                >
                  <span className="material-symbols-outlined">language</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
