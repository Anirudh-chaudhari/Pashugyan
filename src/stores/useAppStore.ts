"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemePreference = "light" | "dark" | "system";
export type AppLanguage = "en" | "hi";

type AppState = {
  language: AppLanguage;
  theme: ThemePreference;
  mobileNavOpen: boolean;
  setLanguage: (language: AppLanguage) => void;
  toggleLanguage: () => void;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
  setMobileNavOpen: (open: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: "en",
      theme: "system",
      mobileNavOpen: false,
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === "en" ? "hi" : "en" })),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme:
            state.theme === "dark"
              ? "light"
              : state.theme === "light"
                ? "system"
                : "dark",
        })),
      setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
    }),
    {
      name: "pashugyan-app-store",
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
      }),
    },
  ),
);
