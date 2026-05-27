import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HowItWorksClient } from "@/app/(marketing)/how-it-works/how-it-works-client";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how PashuGyan turns a livestock photo into breed intelligence using deep learning, precision scoring, and privacy-aware processing.",
};

export default function HowItWorksPage() {
  return <HowItWorksClient fontClassName={inter.className} />;
}
