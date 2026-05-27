"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/useAppStore";

const links = [
  { href: "/detect", label: "Detect" },
  { href: "/database", label: "Database" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/what-we-provide", label: "What We Provide" },
  { href: "/help-guide", label: "Help" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const language = useAppStore((state) => state.language);
  const toggleLanguage = useAppStore((state) => state.toggleLanguage);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-[rgba(13,31,20,.78)] text-white backdrop-blur-md transition-all duration-300",
        scrolled &&
          "border-white/10 bg-[rgba(13,31,20,.92)] backdrop-blur-xl",
      )}
    >
      <div className="page-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-full">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white shadow-[0_12px_28px_rgba(0,0,0,.24)]">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg font-bold tracking-tight text-white">
              PashuGyan
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              Livestock AI
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring text-sm font-medium transition hover:text-white",
                pathname === link.href ? "text-white" : "text-white/70",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            className="focus-ring rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/[0.78] transition hover:bg-white/10"
            aria-label="Toggle language"
          >
            {language === "en" ? "EN / HI" : "HI / EN"}
          </button>
          <Button asChild variant="amber">
            <Link href="/detect">Start Free</Link>
          </Button>
        </div>

        <MobileNav links={links} />
      </div>
    </header>
  );
}
