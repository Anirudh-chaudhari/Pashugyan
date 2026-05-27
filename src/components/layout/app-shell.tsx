"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Navbar } from "@/components/layout/navbar";

const standaloneRoutes = new Set(["/dashboard", "/database", "/detect"]);

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  if (standaloneRoutes.has(pathname)) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-5rem)]">
        <AppSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
