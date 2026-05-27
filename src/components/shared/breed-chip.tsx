import { cn } from "@/lib/utils";

type BreedChipProps = {
  children: React.ReactNode;
  className?: string;
};

export function BreedChip({ children, className }: BreedChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border-raw)] bg-[var(--bg-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
