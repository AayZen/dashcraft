import React, { createContext, useState, useEffect, useCallback } from "react";
import type { ThemeMode } from "../types";
import { storage } from "../services/storage";

export interface ThemeContextValue {
  theme: ThemeMode; // "light" | "dark" | "system"
  resolvedTheme: "light" | "dark"; // Actual effective theme active on DOM
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = "dashcraft:theme";

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved as ThemeMode;
    }
    const fallback = storage.getSavedTheme();
    if (fallback === "light" || fallback === "dark" || fallback === "system") {
      return fallback;
    }
  } catch {
    // Ignore storage read error
  }
  return "dark";
}

function applyThemeToDOM(resolved: "light" | "dark", mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";
  }
  root.setAttribute("data-theme", mode);
  root.setAttribute("data-resolved-theme", resolved);
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getStoredTheme);
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(getSystemPrefersDark);

  // Derived effective theme without cascading setState in effects
  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  // Synchronize DOM & Storage whenever resolved theme or mode changes
  useEffect(() => {
    applyThemeToDOM(resolvedTheme, theme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      storage.saveTheme(theme);
    } catch {
      // Ignore write errors
    }
  }, [resolvedTheme, theme]);

  // Listen to OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && e.newValue) {
        if (e.newValue === "light" || e.newValue === "dark" || e.newValue === "system") {
          setThemeState(e.newValue as ThemeMode);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const currentResolved =
        current === "system" ? (getSystemPrefersDark() ? "dark" : "light") : current;
      return currentResolved === "dark" ? "light" : "dark";
    });
  }, []);

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    isDark: resolvedTheme === "dark",
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export { ThemeContext };
