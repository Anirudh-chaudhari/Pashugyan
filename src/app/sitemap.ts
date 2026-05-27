import type { MetadataRoute } from "next";
import { getAllBreeds } from "@/lib/breeds";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/detect",
    "/database",
    "/how-it-works",
    "/what-we-provide",
    "/help-guide",
    "/privacy-policy",
    "/terms",
    "/dashboard",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const breedRoutes = getAllBreeds().map((breed) => ({
    url: `${baseUrl}/database/${breed.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...breedRoutes];
}
