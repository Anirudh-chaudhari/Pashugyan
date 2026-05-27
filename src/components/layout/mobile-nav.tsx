"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/stores/useAppStore";

type MobileNavProps = {
  links: Array<{ href: string; label: string }>;
};

export function MobileNav({ links }: MobileNavProps) {
  const language = useAppStore((state) => state.language);
  const mobileNavOpen = useAppStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useAppStore((state) => state.setMobileNavOpen);
  const toggleLanguage = useAppStore((state) => state.toggleLanguage);

  return (
    <div className="md:hidden">
      <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Open menu"
            className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>PashuGyan</DialogTitle>
            <DialogDescription>
              Browse the platform and switch between English and Hindi.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="focus-ring rounded-2xl border border-[var(--border-raw)] px-4 py-3 text-sm font-medium text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={toggleLanguage}>
              {language === "en" ? "EN / HI" : "HI / EN"}
            </Button>
            <Button asChild variant="amber" className="flex-1" onClick={() => setMobileNavOpen(false)}>
              <Link href="/detect">Start Free</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
