import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DashboardClient } from "@/app/(app)/dashboard/dashboard-client";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Farmer Dashboard",
  description:
    "Manage livestock scans, recent breed detections, and personalized farming insights from the PashuGyan dashboard.",
};

export default function DashboardPage() {
  return <DashboardClient fontClassName={inter.className} />;
}
