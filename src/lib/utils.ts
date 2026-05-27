import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatConfidence(confidence: number) {
  return `${Math.round(confidence * 100)}%`;
}

export function formatYieldRange(min: number, max: number) {
  return `${min}-${max} L/day`;
}
