import breedsData from "@/data/breeds.json";
import { getBreedImage } from "@/lib/breed-images";
import { Breed, BreedFilters } from "@/types/breed";

const breeds = (breedsData as Breed[]).map((breed) => ({
  ...breed,
  imageUrl: getBreedImage(breed.slug),
}));

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function getAllBreeds() {
  return breeds;
}

export function getBreedBySlug(slug: string) {
  return breeds.find((breed) => breed.slug === slug) ?? null;
}

export function getBreedByName(name: string) {
  const key = normalizeKey(name);

  return (
    breeds.find(
      (breed) =>
        normalizeKey(breed.name) === key || normalizeKey(breed.slug) === key,
    ) ?? null
  );
}

export function getFeaturedBreeds(limit = 12) {
  return breeds.slice(0, limit);
}

export function getOriginStates() {
  return Array.from(new Set(breeds.map((breed) => breed.originState))).sort();
}

export function filterBreeds(filters: BreedFilters) {
  return breeds.filter((breed) => {
    if (filters.type && filters.type !== "all" && breed.type !== filters.type) {
      return false;
    }

    if (
      filters.purpose &&
      filters.purpose !== "all" &&
      breed.purpose !== filters.purpose
    ) {
      return false;
    }

    if (filters.originState && breed.originState !== filters.originState) {
      return false;
    }

    if (
      typeof filters.milkYieldMin === "number" &&
      breed.avgMilkYieldMax < filters.milkYieldMin
    ) {
      return false;
    }

    if (
      typeof filters.milkYieldMax === "number" &&
      breed.avgMilkYieldMin > filters.milkYieldMax
    ) {
      return false;
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      const haystack = [
        breed.name,
        breed.nameHindi,
        breed.origin,
        breed.originState,
        breed.type,
        ...breed.characteristics,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

export function getRelatedBreeds(slug: string, limit = 4) {
  const breed = getBreedBySlug(slug);

  if (!breed) {
    return [];
  }

  return breeds
    .filter(
      (candidate) =>
        candidate.slug !== slug &&
        candidate.type === breed.type &&
        candidate.originState !== breed.originState,
    )
    .slice(0, limit);
}
