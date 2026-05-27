"use client";

import { useMemo, useState } from "react";
import { Breed, BreedFilters } from "@/types/breed";
import { filterBreeds } from "@/lib/breeds";

const initialFilters: BreedFilters = {
  type: "all",
  purpose: "all",
  originState: "",
  search: "",
  milkYieldMin: 0,
  milkYieldMax: 25,
};

export function useBreedFilter(breeds: Breed[]) {
  const [filters, setFilters] = useState<BreedFilters>(initialFilters);

  const filteredBreeds = useMemo(
    () =>
      filterBreeds({
        ...filters,
        search: filters.search?.trim() ? filters.search.trim() : undefined,
        originState: filters.originState || undefined,
      }).filter((breed) => breeds.some((candidate) => candidate.slug === breed.slug)),
    [breeds, filters],
  );

  return {
    filters,
    filteredBreeds,
    setFilters,
    resetFilters: () => setFilters(initialFilters),
  };
}
