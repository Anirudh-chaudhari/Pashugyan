import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DatabaseClient } from "@/app/(app)/database/database-client";
import { getAllBreeds } from "@/lib/breeds";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Breed Database",
  description:
    "Browse the PashuGyan breed database for indigenous Indian cattle and buffalo profiles in a fast, visual catalog.",
};

export default function DatabasePage() {
  return (
    <DatabaseClient breeds={getAllBreeds()} fontClassName={inter.className} />
  );
}
