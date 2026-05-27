"use client";

import { Toaster } from "sonner";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { SupabaseAuthProvider } from "@/components/auth/supabase-auth-provider";
import { useAppStore } from "@/stores/useAppStore";

function resolveTheme(
  theme: "light" | "dark" | "system",
  prefersDark: boolean,
): "light" | "dark" {
  if (theme === "system") {
    return prefersDark ? "dark" : "light";
  }

  return theme;
}

export function AppProviders({ children }: PropsWithChildren) {
  const theme = useAppStore((state) => state.theme);
  const language = useAppStore((state) => state.language);
  const [prefersDark, setPrefersDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  const resolvedTheme = useMemo(
    () => resolveTheme(theme, prefersDark),
    [prefersDark, theme],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setPrefersDark(media.matches);
    sync();
    media.addEventListener("change", sync);
    setMounted(true);

    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
    root.lang = language === "hi" ? "hi" : "en";
  }, [language, resolvedTheme]);

  return (
    <SupabaseAuthProvider>
      {children}
      <Toaster
        closeButton
        position="bottom-right"
        richColors
        theme={mounted && resolvedTheme === "dark" ? "dark" : "light"}
        toastOptions={{
          className:
            "border border-border bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-lifted",
        }}
      />
    </SupabaseAuthProvider>
  );
}
