import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HelpGuideClient } from "@/app/(marketing)/help-guide/help-guide-client";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Support Hub",
  description:
    "Support Hub for PashuGyan with refreshed FAQs, photography guidance, and direct livestock support contact paths.",
};

export default function HelpGuidePage() {
  return <HelpGuideClient fontClassName={inter.className} />;
}
