import { cn } from "@/lib/utils";
import { AnimalType } from "@/types/breed";

type AnimalTypeBadgeProps = {
  type: AnimalType;
  className?: string;
};

export function AnimalTypeBadge({ type, className }: AnimalTypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
        type === "buffalo"
          ? "bg-sky-500/15 text-sky-700 dark:text-sky-300"
          : "bg-[var(--color-glow)]/15 text-[var(--color-glow)]",
        className,
      )}
    >
      {type === "buffalo" ? "Buffalo" : "Cattle"}
    </span>
  );
}
