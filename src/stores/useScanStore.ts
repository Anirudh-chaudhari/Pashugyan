"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createScanHistoryItem,
  MAX_SYNCED_SCAN_HISTORY,
  sortScanHistory,
  type ScanHistoryDraft,
  type ScanHistoryItem,
} from "@/lib/supabase/profile";

type ScanStore = {
  history: ScanHistoryItem[];
  addScan: (item: ScanHistoryDraft) => void;
  removeScan: (id: string) => void;
  clearHistory: () => void;
  setHistory: (items: ScanHistoryItem[]) => void;
};

export const useScanStore = create<ScanStore>()(
  persist(
    (set) => ({
      history: [],
      addScan: (item) =>
        set((state) => ({
          history: sortScanHistory([
            createScanHistoryItem(item),
            ...state.history,
          ]).slice(0, MAX_SYNCED_SCAN_HISTORY),
        })),
      removeScan: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
      setHistory: (items) =>
        set({
          history: sortScanHistory(items).slice(0, MAX_SYNCED_SCAN_HISTORY),
        }),
    }),
    {
      name: "pashugyan-scan-history",
    },
  ),
);

export type { ScanHistoryDraft, ScanHistoryItem };
