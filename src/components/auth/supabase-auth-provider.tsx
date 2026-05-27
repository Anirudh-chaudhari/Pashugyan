"use client";

import type { Session, User } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ScanHistoryItem } from "@/lib/supabase/profile";
import {
  createSupabaseBrowserClient,
  hasSupabaseEnv,
} from "@/lib/supabase/client";

type SupabaseAuthContextValue = {
  hasSupabase: boolean;
  isReady: boolean;
  session: Session | null;
  user: User | null;
  refreshUser: () => Promise<User | null>;
  saveRemoteHistory: (history: ScanHistoryItem[]) => Promise<boolean>;
  signOut: () => Promise<{ error: string | null }>;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextValue | null>(null);

export function SupabaseAuthProvider({ children }: PropsWithChildren) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const hasSupabase = hasSupabaseEnv() && supabase !== null;
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(!hasSupabase);

  const refreshUser = useCallback(async () => {
    if (!supabase) {
      setUser(null);
      return null;
    }

    const {
      data: { user: nextUser },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      setUser(null);
      return null;
    }

    setUser(nextUser ?? null);
    return nextUser ?? null;
  }, [supabase]);

  useEffect(() => {
    let active = true;

    if (!supabase) {
      setIsReady(true);
      return;
    }

    const bootstrap = async () => {
      const {
        data: { session: nextSession },
      } = await supabase.auth.getSession();

      if (!active) {
        return;
      }

      setSession(nextSession ?? null);
      await refreshUser();

      if (active) {
        setIsReady(true);
      }
    };

    void bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) {
        return;
      }

      setSession(nextSession ?? null);
      void refreshUser().finally(() => {
        if (active) {
          setIsReady(true);
        }
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [refreshUser, supabase]);

  const signOut = useCallback(async () => {
    if (!supabase) {
      return { error: "Supabase is not configured." };
    }

    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (!error) {
      setSession(null);
      setUser(null);
    }

    return { error: error?.message ?? null };
  }, [supabase]);

  const saveRemoteHistory = useCallback(
    async (history: ScanHistoryItem[]) => {
      if (!supabase) {
        return false;
      }

      const response = await fetch("/api/account/history", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ history }),
      });

      if (!response.ok) {
        return false;
      }

      await refreshUser();
      return true;
    },
    [refreshUser, supabase],
  );

  const value = useMemo<SupabaseAuthContextValue>(
    () => ({
      hasSupabase,
      isReady,
      session,
      user,
      refreshUser,
      saveRemoteHistory,
      signOut,
    }),
    [hasSupabase, isReady, refreshUser, saveRemoteHistory, session, signOut, user],
  );

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);

  if (!context) {
    throw new Error("useSupabaseAuth must be used inside SupabaseAuthProvider.");
  }

  return context;
}
