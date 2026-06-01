import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DashboardClient } from "@/app/(app)/dashboard/dashboard-client";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PashuGyan | Farmer Dashboard",
  description:
    "Start with the PashuGyan dashboard, see your latest scan activity, and jump into livestock tools from the first screen.",
};

export default function HomePage() {
  return <DashboardClient fontClassName={inter.className} />;
}
