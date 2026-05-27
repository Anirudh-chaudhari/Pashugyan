import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WhatWeProvideClient } from "@/app/(marketing)/what-we-provide/what-we-provide-client";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "What We Provide",
  description:
    "Explore PashuGyan's livestock tools for breed identification, health guidance, market value estimates, and milk yield planning.",
};

export default function WhatWeProvidePage() {
  return <WhatWeProvideClient fontClassName={inter.className} />;
}
