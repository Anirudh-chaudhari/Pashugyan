"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSupabaseAuth } from "@/components/auth/supabase-auth-provider";
import {
  createScanHistoryItem,
  getUserDisplayName,
  mergeScanHistory,
  readScanHistoryFromMetadata,
  type ScanHistoryDraft,
} from "@/lib/supabase/profile";
import { useScanStore } from "@/stores/useScanStore";

function hasSameHistoryShape(
  left: ReturnType<typeof readScanHistoryFromMetadata>,
  right: ReturnType<typeof readScanHistoryFromMetadata>,
) {
  if (left.length !== right.length) {
    return false;
  }

  return left.every(
    (item, index) =>
      item.id === right[index]?.id &&
      item.createdAt === right[index]?.createdAt &&
      item.imageName === right[index]?.imageName,
  );
}

export function useFarmerHistory() {
  const { hasSupabase, isReady, saveRemoteHistory, user } = useSupabaseAuth();
  const guestHistory = useScanStore((state) => state.history);
  const addGuestScan = useScanStore((state) => state.addScan);
  const clearGuestHistory = useScanStore((state) => state.clearHistory);
  const syncedUserRef = useRef<string | null>(null);

  const remoteHistory = useMemo(
    () => readScanHistoryFromMetadata(user?.user_metadata),
    [user?.user_metadata],
  );

  useEffect(() => {
    if (!user || !hasSupabase) {
      syncedUserRef.current = null;
      return;
    }

    if (guestHistory.length === 0 || syncedUserRef.current === user.id) {
      return;
    }

    const merged = mergeScanHistory(remoteHistory, guestHistory);

    if (hasSameHistoryShape(merged, remoteHistory)) {
      clearGuestHistory();
      syncedUserRef.current = user.id;
      return;
    }

    void saveRemoteHistory(merged).then((saved) => {
      if (saved) {
        clearGuestHistory();
        syncedUserRef.current = user.id;
      }
    });
  }, [
    clearGuestHistory,
    guestHistory,
    hasSupabase,
    remoteHistory,
    saveRemoteHistory,
    user,
  ]);

  const addScan = useCallback(
    async (item: ScanHistoryDraft) => {
      if (!user || !hasSupabase) {
        addGuestScan(item);
        return { fallbackToLocal: false, synced: false };
      }

      const nextHistory = mergeScanHistory(
        [createScanHistoryItem(item)],
        remoteHistory,
      );
      const saved = await saveRemoteHistory(nextHistory);

      if (!saved) {
        addGuestScan(item);
        return { fallbackToLocal: true, synced: false };
      }

      return { fallbackToLocal: false, synced: true };
    },
    [addGuestScan, hasSupabase, remoteHistory, saveRemoteHistory, user],
  );

  return {
    addScan,
    hasSupabase,
    history: user ? remoteHistory : guestHistory,
    isAuthenticated: Boolean(user),
    isReady,
    user,
    userDisplayName: getUserDisplayName(user),
  };
}
