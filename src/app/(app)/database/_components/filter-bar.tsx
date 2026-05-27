"use client";

import { Dispatch, SetStateAction } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BreedFilters } from "@/types/breed";

type FilterBarProps = {
  filters: BreedFilters;
  mobileOpen: boolean;
  onChange: Dispatch<SetStateAction<BreedFilters>>;
  onReset: () => void;
  setMobileOpen: (open: boolean) => void;
  states: string[];
};

function FilterFields({
  filters,
  onChange,
  onReset,
  states,
}: Omit<FilterBarProps, "mobileOpen" | "setMobileOpen">) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[var(--text-primary)]">
          Search breeds
        </label>
        <div className="flex items-center rounded-2xl border border-[var(--border-raw)] bg-[var(--bg-muted)] px-3">
          <Search className="h-4 w-4 text-[var(--text-muted)]" />
          <input
            aria-label="Search breeds"
            className="h-12 flex-1 bg-transparent px-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            placeholder="Gir, Murrah, Gujarat..."
            value={filters.search ?? ""}
            onChange={(event) =>
              onChange((current) => ({ ...current, search: event.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-[var(--text-primary)]">
          Animal type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "all", label: "All" },
            { value: "cattle", label: "Cattle" },
            { value: "buffalo", label: "Buffalo" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onChange((current) => ({ ...current, type: option.value as BreedFilters["type"] }))
              }
              className={`focus-ring rounded-2xl px-3 py-3 text-sm font-semibold ${
                filters.type === option.value
                  ? "bg-[var(--color-forest)] text-white"
                  : "border border-[var(--border-raw)] text-[var(--text-secondary)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-[var(--text-primary)]">
          Purpose
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "all", label: "All" },
            { value: "dairy", label: "Dairy" },
            { value: "draft", label: "Draft" },
            { value: "dual", label: "Dual" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onChange((current) => ({
                  ...current,
                  purpose: option.value as BreedFilters["purpose"],
                }))
              }
              className={`focus-ring rounded-2xl px-3 py-3 text-sm font-semibold ${
                filters.purpose === option.value
                  ? "bg-[var(--color-amber)] text-white"
                  : "border border-[var(--border-raw)] text-[var(--text-secondary)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="originState"
          className="text-sm font-semibold text-[var(--text-primary)]"
        >
          Origin state
        </label>
        <select
          id="originState"
          className="focus-ring h-12 w-full rounded-2xl border border-[var(--border-raw)] bg-[var(--bg-muted)] px-4 text-sm text-[var(--text-primary)]"
          value={filters.originState ?? ""}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              originState: event.target.value,
            }))
          }
        >
          <option value="">All states</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-[var(--text-primary)]">
            Milk yield range
          </label>
          <span className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {filters.milkYieldMin}-{filters.milkYieldMax} L/day
          </span>
        </div>
        <div className="grid gap-3">
          <input
            aria-label="Minimum milk yield"
            type="range"
            min={0}
            max={25}
            value={filters.milkYieldMin ?? 0}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                milkYieldMin: Number(event.target.value),
              }))
            }
          />
          <input
            aria-label="Maximum milk yield"
            type="range"
            min={0}
            max={25}
            value={filters.milkYieldMax ?? 25}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                milkYieldMax: Number(event.target.value),
              }))
            }
          />
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}

export function FilterBar({
  filters,
  mobileOpen,
  onChange,
  onReset,
  setMobileOpen,
  states,
}: FilterBarProps) {
  return (
    <>
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setMobileOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Open filters
        </Button>
      </div>

      <aside className="hidden h-fit rounded-[32px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-5 shadow-card lg:sticky lg:top-24 lg:block">
        <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          Filters
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Narrow the catalog by type, purpose, geography, and milk yield.
        </p>
        <div className="mt-6">
          <FilterFields
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            states={states}
          />
        </div>
      </aside>

      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter breeds</DialogTitle>
            <DialogDescription>
              Refine the encyclopedia for your farm, region, or research need.
            </DialogDescription>
          </DialogHeader>
          <FilterFields
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            states={states}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
