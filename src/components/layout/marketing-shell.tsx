"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const standaloneRoutes = new Set([
  "/how-it-works",
  "/what-we-provide",
  "/help-guide",
]);

export function MarketingShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  if (standaloneRoutes.has(pathname)) {
    return <div className="relative min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <div className="relative">{children}</div>
      <Footer />
    </div>
  );
}
