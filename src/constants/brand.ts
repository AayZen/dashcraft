/**
 * DashCraft Official Brand Identity Tokens & Assets
 * Tagline: Craft dashboards visually.
 */

export const BRAND_COLORS = {
  primary: "#2563eb",   // Royal Electric Blue
  secondary: "#7c3aed", // Rich Violet / Purple
  accent: "#ec4899",    // Vibrant Magenta / Pink
  cyan: "#06b6d4",      // Cyan / Electric Blue highlight
  dark: "#0f172a",      // Slate Dark
  gray: "#64748b",      // Muted Gray
  light: "#f8fafc",     // Crisp Slate Light
} as const;

export const BRAND_GRADIENTS = {
  // Primary brand gradient used on logo mark and "Craft" wordmark
  logo: "linear-gradient(135deg, #06b6d4 0%, #2563eb 38%, #7c3aed 72%, #ec4899 100%)",
  bar1: "linear-gradient(180deg, #38bdf8 0%, #06b6d4 100%)",
  bar2: "linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)",
  bar3: "linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%)",
  text: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent",
  textDark: "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent",
} as const;
