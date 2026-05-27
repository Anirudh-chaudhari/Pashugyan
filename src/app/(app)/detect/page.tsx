import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DetectClient } from "@/app/(app)/detect/detect-client";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Breed Detection",
  description:
    "Upload a livestock photo to run PashuGyan's AI breed detection workflow and review farm-ready classification results.",
};

export default function DetectPage() {
  return <DetectClient fontClassName={inter.className} />;
}
