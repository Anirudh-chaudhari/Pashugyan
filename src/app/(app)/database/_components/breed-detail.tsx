import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimalTypeBadge } from "@/components/shared/animal-type-badge";
import { BreedChip } from "@/components/shared/breed-chip";
import { PhotoWithFallback } from "@/components/shared/photo-with-fallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAnimalFallbackEmoji } from "@/lib/breed-images";
import { formatYieldRange } from "@/lib/utils";
import { Breed } from "@/types/breed";

type BreedDetailProps = {
  breed: Breed;
  related: Breed[];
};

export function BreedDetail({ breed, related }: BreedDetailProps) {
  return (
    <main className="pb-16">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0d1f14] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(74,222,128,.2),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(217,119,6,.16),transparent_24%),linear-gradient(135deg,rgba(13,31,20,.92),rgba(27,67,50,.82))]" />
        <div className="page-shell relative py-8">
          <Link
            href="/database"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white/[0.84] backdrop-blur"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to database
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <AnimalTypeBadge type={breed.type} />
                <BreedChip className="border-white/10 bg-white/10 text-white/82">
                  {breed.originState}
                </BreedChip>
              </div>
              <div>
                <h1 className="font-display text-5xl font-bold sm:text-6xl">
                  {breed.name}
                </h1>
                <p className="mt-3 font-hindi text-lg text-white/70">
                  {breed.nameHindi} · {breed.origin}
                </p>
              </div>
              <p className="max-w-3xl text-base leading-7 text-white/[0.76]">
                {breed.description}
              </p>
            </div>

            <PhotoWithFallback
              alt={`${breed.name} breed photo`}
              className="aspect-[16/10] rounded-[36px] border border-white/10 shadow-lifted"
              fallbackEmoji={getAnimalFallbackEmoji(breed.type)}
              imgClassName="h-full w-full object-cover"
              loading="eager"
              src={breed.imageUrl}
            />
          </div>
        </div>
      </section>

      <section className="page-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                Breed characteristics
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {breed.characteristics.map((trait) => (
                  <BreedChip key={trait}>{trait}</BreedChip>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
                {breed.description}
              </p>
            </div>

            <Tabs defaultValue="feeding">
              <TabsList>
                <TabsTrigger value="feeding">Feeding Guide</TabsTrigger>
                <TabsTrigger value="care">Health & Care</TabsTrigger>
                <TabsTrigger value="value">Economic Value</TabsTrigger>
              </TabsList>
              <TabsContent
                value="feeding"
                className="rounded-[32px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 text-sm leading-7 text-[var(--text-secondary)]"
              >
                {breed.feedingGuide}
              </TabsContent>
              <TabsContent
                value="care"
                className="rounded-[32px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 text-sm leading-7 text-[var(--text-secondary)]"
              >
                {breed.careTips}
              </TabsContent>
              <TabsContent
                value="value"
                className="rounded-[32px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 text-sm leading-7 text-[var(--text-secondary)]"
              >
                {breed.economicValue}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                Quick stats
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Milk yield", formatYieldRange(breed.avgMilkYieldMin, breed.avgMilkYieldMax)],
                  ["Lactation", `${breed.lactationDays} days`],
                  ["Body weight", `${breed.bodyWeightKg} kg`],
                  ["Gestation", `${breed.gestationDays} days`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-[var(--border-raw)] bg-[var(--bg-muted)]/60 px-4 py-4"
                  >
                    <div className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {label}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                Origin spotlight
              </h2>
              <div className="mt-5 rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,.18),transparent_50%),linear-gradient(135deg,#11261a,#173526)] p-5 text-white">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Native region
                </div>
                <div className="mt-2 font-display text-3xl font-semibold">
                  {breed.originState}
                </div>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  {breed.name} developed its reputation in {breed.origin},
                  where climate, feed resources, and farming traditions shaped
                  the breed&apos;s present-day strengths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="page-shell">
          <div className="rounded-[36px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 shadow-card">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="section-kicker">Related Breeds</div>
                <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)]">
                  Explore similar animals from other states
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/database/${item.slug}`}
                  className="overflow-hidden rounded-[28px] border border-[var(--border-raw)] bg-[var(--bg-muted)]/30 transition hover:-translate-y-1 hover:shadow-card"
                >
                  <PhotoWithFallback
                    alt={`${item.name} breed photo`}
                    className="aspect-[4/3] w-full"
                    fallbackEmoji={getAnimalFallbackEmoji(item.type)}
                    imgClassName="h-full w-full object-cover"
                    src={item.imageUrl}
                  />
                  <div className="space-y-1 p-4">
                    <div className="font-display text-xl font-semibold text-[var(--text-primary)]">
                      {item.name}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">
                      {item.originState}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
