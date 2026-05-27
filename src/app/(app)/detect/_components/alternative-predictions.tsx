"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Prediction } from "@/lib/classify";
import { cn } from "@/lib/utils";

type AlternativePredictionsProps = {
  predictions: Prediction[];
};

export function AlternativePredictions({
  predictions,
}: AlternativePredictionsProps) {
  const [open, setOpen] = useState(false);
  const alternatives = useMemo(() => predictions.slice(1, 4), [predictions]);

  if (!alternatives.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-[var(--border-raw)] bg-[var(--bg-muted)]/60">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)]"
      >
        Other possibilities
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="space-y-3 px-4 pb-4">
          {alternatives.map((prediction) => (
            <div key={prediction.breed}>
              <div className="mb-1 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                <span>{prediction.breed}</span>
                <span>{Math.round(prediction.confidence * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-[var(--color-glow)]"
                  style={{ width: `${Math.max(prediction.confidence * 100, 4)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
