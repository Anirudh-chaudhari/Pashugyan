import { AnimalType } from "@/types/breed";

export const GIR_BREED_IMAGE =
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop";
export const MURRAH_BREED_IMAGE =
  "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop";
export const SAHIWAL_BREED_IMAGE =
  "https://images.unsplash.com/photo-1529927066849-79b791a69825?w=400&h=300&fit=crop";
export const KANKREJ_BREED_IMAGE =
  "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop";
export const GENERIC_BREED_IMAGE =
  "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=300&fit=crop";
export const HERO_COW_IMAGE =
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&h=220&fit=crop";

export const BREED_IMAGE_URLS: Record<string, string> = {
  "brown-swiss": "/images/stitch/database-brown-swiss.jpg",
  deoni: "/images/stitch/database-deoni.jpg",
  gir: "/images/stitch/database-gir.jpg",
  "holstein-friesian": "/images/stitch/database-holstein-friesian.jpg",
  kangayam: "/images/stitch/database-kangayam.jpg",
  kankrej: "/images/stitch/database-kankrej.jpg",
  khillari: "/images/stitch/database-khillari.jpg",
  murrah: "/images/stitch/database-murrah.jpg",
  pandharpuri: "/images/stitch/database-pandharpuri.jpg",
  sahiwal: "/images/stitch/database-sahiwal.jpg",
  jaffarabadi: "/images/stitch/database-jaffarabadi.jpg",
  surti: "/images/stitch/database-surti.jpg",
  "nili-ravi": "/images/stitch/database-nili-ravi.jpg",
  tharparkar: "/images/stitch/database-tharparkar.jpg",
  hallikar: "/images/stitch/database-hallikar.jpg",
  toda: "/images/stitch/database-toda.jpg",
};

export function getBreedImage(slug: string) {
  return BREED_IMAGE_URLS[slug] ?? `/images/breeds/${slug}.svg`;
}

export function getAnimalFallbackEmoji(type: AnimalType) {
  return type === "buffalo" ? "BUF" : "COW";
}
