import { cn } from "@/lib/utils";

type ConfidenceBadgeProps = {
  confidence: number;
  className?: string;
};

export function ConfidenceBadge({
  confidence,
  className,
}: ConfidenceBadgeProps) {
  const percentage = Math.round(confidence * 100);
  const tone =
    percentage >= 80
      ? "bg-[var(--color-glow)]/15 text-[var(--color-glow)]"
      : percentage >= 60
        ? "bg-amber/15 text-amber"
        : "bg-red-500/15 text-red-400";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
        tone,
        className,
      )}
    >
      {percentage}% confidence
    </span>
  );
}
