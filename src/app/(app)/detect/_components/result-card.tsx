"use client";

import Link from "next/link";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimalTypeBadge } from "@/components/shared/animal-type-badge";
import { BreedChip } from "@/components/shared/breed-chip";
import { ConfidenceBadge } from "@/components/shared/confidence-badge";
import { ClassificationResult } from "@/lib/classify";
import { getBreedByName } from "@/lib/breeds";
import { formatYieldRange } from "@/lib/utils";
import { AlternativePredictions } from "@/app/(app)/detect/_components/alternative-predictions";
import { ConfidenceMeter } from "@/app/(app)/detect/_components/confidence-meter";

type ResultCardProps = {
  result: ClassificationResult;
};

export function ResultCard({ result }: ResultCardProps) {
  const breedData = getBreedByName(result.breed);
  const percentage = Math.round(result.confidence * 100);

  const handleShare = async () => {
    const url =
      breedData?.slug != null
        ? `${window.location.origin}/database/${breedData.slug}`
        : window.location.href;

    await navigator.clipboard.writeText(url);
    toast.success("Result link copied to clipboard.");
  };

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--bg-surface)] shadow-lifted">
      <div className="grid gap-8 bg-gradient-to-br from-forest via-[#173526] to-[#10241a] px-6 py-7 text-white lg:grid-cols-[1fr_150px] lg:items-center">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Breed identified
            </span>
            <ConfidenceBadge confidence={result.confidence} />
          </div>
          <div>
            <h2 className="font-display text-4xl font-bold">{result.breed}</h2>
            <p className="mt-2 text-base text-white/75">
              {breedData?.nameHindi ?? "नस्ल"} • {breedData?.origin ?? "Indian livestock"} •{" "}
              {result.animalType === "buffalo" ? "Buffalo" : "Cattle"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AnimalTypeBadge type={result.animalType === "unknown" ? "cattle" : result.animalType} />
            {breedData?.purpose && <BreedChip>{breedData.purpose}</BreedChip>}
            {breedData?.originState && <BreedChip>{breedData.originState}</BreedChip>}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <ConfidenceMeter confidence={result.confidence} />
        </div>
      </div>

      {breedData && (
        <div className="grid gap-px bg-[var(--border-raw)] sm:grid-cols-3">
          {[
            { label: "Milk Yield", value: formatYieldRange(breedData.avgMilkYieldMin, breedData.avgMilkYieldMax) },
            { label: "Lactation", value: `${breedData.lactationDays} days` },
            { label: "Body Weight", value: `~${breedData.bodyWeightKg} kg` },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--bg-surface)] px-5 py-4 text-center">
              <div className="text-sm font-semibold text-[var(--text-primary)]">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-5 p-5 sm:p-6">
        {percentage < 60 && (
          <div className="rounded-[24px] border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            Low confidence detected. Try a well-lit, full-body photo for a better match.
          </div>
        )}

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milk">Milk</TabsTrigger>
            <TabsTrigger value="feeding">Feeding</TabsTrigger>
            <TabsTrigger value="care">Care</TabsTrigger>
            <TabsTrigger value="value">Value</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 rounded-[28px] border border-[var(--border-raw)] bg-[var(--bg-muted)]/50 p-5">
            <p className="text-sm leading-7 text-[var(--text-secondary)]">
              {breedData?.description ?? `${result.breed} is a recognized Indian livestock breed.`}
            </p>
            {breedData?.characteristics && (
              <div className="flex flex-wrap gap-2">
                {breedData.characteristics.map((trait) => (
                  <BreedChip key={trait}>{trait}</BreedChip>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="milk" className="rounded-[28px] border border-[var(--border-raw)] bg-[var(--bg-muted)]/50 p-5 text-sm leading-7 text-[var(--text-secondary)]">
            {breedData?.milkYieldInfo ?? "Milk yield information is not available yet."}
          </TabsContent>
          <TabsContent value="feeding" className="rounded-[28px] border border-[var(--border-raw)] bg-[var(--bg-muted)]/50 p-5 text-sm leading-7 text-[var(--text-secondary)]">
            {breedData?.feedingGuide ?? "Feeding guidance is not available yet."}
          </TabsContent>
          <TabsContent value="care" className="rounded-[28px] border border-[var(--border-raw)] bg-[var(--bg-muted)]/50 p-5 text-sm leading-7 text-[var(--text-secondary)]">
            {breedData?.careTips ?? "Care guidance is not available yet."}
          </TabsContent>
          <TabsContent value="value" className="rounded-[28px] border border-[var(--border-raw)] bg-[var(--bg-muted)]/50 p-5 text-sm leading-7 text-[var(--text-secondary)]">
            {breedData?.economicValue ?? "Economic insight is not available yet."}
          </TabsContent>
        </Tabs>

        <AlternativePredictions predictions={result.allPredictions} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleShare}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-raw)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-muted)]"
          >
            <Share2 className="h-4 w-4" />
            Share result
          </button>
          {breedData && (
            <Link
              href={`/database/${breedData.slug}`}
              className="focus-ring inline-flex items-center justify-center rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-forest-mid)]"
            >
              View full profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
