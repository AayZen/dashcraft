import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "../contexts/ThemeContext";

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider } from "../contexts/ThemeContext";
export type { ThemeContextValue };
