"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CircleHelp,
  Database,
  ScanSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/detect", label: "Detect", icon: ScanSearch },
  { href: "/database", label: "Breeds", icon: Database },
  { href: "/how-it-works", label: "How It Works", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/help-guide", label: "Help", icon: CircleHelp },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#bfcaba] bg-[rgba(251,249,248,.94)]/95 backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-5 gap-1 px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href === "/database" && pathname.startsWith("/database/")) ||
            (item.href === "/how-it-works" &&
              pathname.startsWith("/how-it-works")) ||
            (item.href === "/dashboard" && pathname.startsWith("/dashboard")) ||
            (item.href === "/help-guide" && pathname.startsWith("/help-guide"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-16 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[10px] font-semibold leading-none transition-all",
                active
                  ? "bg-[#2e7d32] text-white shadow-md"
                  : "text-[#40493d] hover:bg-[#f5f3f3] hover:text-[#1b1c1c]",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
