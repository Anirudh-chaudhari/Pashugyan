"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Database, ScanSearch } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/detect", label: "Detect", icon: ScanSearch },
  { href: "/database", label: "Breeds", icon: Database },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/help-guide", label: "Research", icon: BookOpen },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[var(--bg-surface)]/65 p-5 backdrop-blur-xl lg:block">
      <div className="mb-8 rounded-[28px] bg-gradient-to-br from-forest to-[#163223] p-5 text-white shadow-lifted">
        <div className="text-sm uppercase tracking-[0.2em] text-white/60">
          PashuGyan
        </div>
        <h2 className="mt-2 font-display text-3xl font-semibold">
          AI livestock desk
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/75">
          Scan, compare, and build a working knowledge base for Indian breeds.
        </p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href === "/database" && pathname.startsWith("/database/")) ||
            (item.href !== "/database" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-[var(--color-forest)] text-white shadow-card"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
