import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoWithFallback } from "@/components/shared/photo-with-fallback";
import { getAnimalFallbackEmoji } from "@/lib/breed-images";
import { formatYieldRange } from "@/lib/utils";
import { Breed } from "@/types/breed";

type BreedCardProps = {
  breed: Breed;
};

export function BreedCard({ breed }: BreedCardProps) {
  return (
    <article className="group overflow-hidden rounded-[32px] border border-[var(--border-raw)] bg-[var(--bg-surface)] shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lifted">
      <div className="relative overflow-hidden">
        <PhotoWithFallback
          alt={`${breed.name} breed photo`}
          className="aspect-[4/3] w-full bg-[var(--bg-muted)]"
          fallbackEmoji={getAnimalFallbackEmoji(breed.type)}
          imgClassName="transition duration-500 group-hover:scale-[1.05]"
          src={breed.imageUrl}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/28 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
          <div className="grid grid-cols-2 gap-2 text-xs text-white">
            <div className="rounded-2xl bg-white/10 px-3 py-2 backdrop-blur">
              {breed.bodyWeightKg} kg body weight
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-2 backdrop-blur">
              {breed.lactationDays} day lactation
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            {breed.name}
          </h2>
          <p className="mt-1 font-hindi text-sm text-[var(--text-muted)]">
            {breed.nameHindi}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            {breed.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              breed.type === "buffalo"
                ? "bg-sky-500/14 text-sky-700 dark:text-sky-300"
                : "bg-emerald-500/14 text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {breed.type === "buffalo" ? "Buffalo" : "Cattle"}
          </span>
          <span className="rounded-full bg-amber-500/14 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            {formatYieldRange(breed.avgMilkYieldMin, breed.avgMilkYieldMax)}
          </span>
          <span className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {breed.originState}
          </span>
          <span className="rounded-full bg-[var(--bg-muted)] px-3 py-1 text-xs font-semibold capitalize text-[var(--text-secondary)]">
            {breed.purpose}
          </span>
        </div>

        <Link
          href={`/database/${breed.slug}`}
          className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-forest-mid)]"
        >
          View full profile
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
