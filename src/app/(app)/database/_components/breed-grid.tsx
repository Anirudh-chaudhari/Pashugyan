import { Breed } from "@/types/breed";
import { BreedCard } from "@/app/(app)/database/_components/breed-card";

type BreedGridProps = {
  breeds: Breed[];
};

export function BreedGrid({ breeds }: BreedGridProps) {
  if (!breeds.length) {
    return (
      <div className="rounded-[32px] border border-dashed border-[var(--border-raw)] bg-[var(--bg-surface)] p-12 text-center shadow-card">
        <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
          No breeds match these filters
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          Try widening the milk yield range, clearing the state filter, or
          searching with a different breed name.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {breeds.map((breed) => (
        <BreedCard key={breed.slug} breed={breed} />
      ))}
    </div>
  );
}
