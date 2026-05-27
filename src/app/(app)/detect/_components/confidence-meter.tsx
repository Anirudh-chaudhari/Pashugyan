"use client";

import { cn } from "@/lib/utils";

type ConfidenceMeterProps = {
  confidence: number;
  className?: string;
};

export function ConfidenceMeter({
  confidence,
  className,
}: ConfidenceMeterProps) {
  const percentage = Math.round(confidence * 100);
  const tone =
    percentage >= 80
      ? "var(--color-glow)"
      : percentage >= 60
        ? "var(--color-amber)"
        : "#ef4444";

  return (
    <div className={cn("relative flex h-28 w-28 items-center justify-center", className)}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${tone} ${percentage * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
        }}
      />
      <div className="absolute inset-[10px] rounded-full bg-[var(--bg-surface)]" />
      <div className="relative text-center">
        <div className="font-display text-2xl font-bold text-[var(--text-primary)]">
          {percentage}%
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          confidence
        </div>
      </div>
    </div>
  );
}
