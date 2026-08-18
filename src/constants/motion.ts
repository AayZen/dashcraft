/**
 * DashCraft Motion & Interaction System Tokens
 * Fast, precise, and premium interaction timings and easings.
 */

export const MOTION = {
  duration: {
    instant: "80ms",
    fast: "150ms",     // Micro-interactions, button hover/press, toggles, badges
    normal: "220ms",   // Component transitions, modal scale/fade, widget selection
    slow: "340ms",     // Larger transitions, canvas reflow, hero entrance, modal backdrops
  },
  easing: {
    // Deceleration curve for entering elements
    enter: "cubic-bezier(0.16, 1, 0.3, 1)",
    // Standard ease-in-out for state & color changes
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    // Subtle snappy spring for focus/selection indicators
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  classes: {
    // Interactive button hover/press standard
    interactive:
      "transition-all duration-150 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none",
    // Surface hover highlight
    cardHover:
      "transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700",
    // Selected element pulse/ring
    selected:
      "transition-all duration-200 ring-2 ring-cyan-500/20 border-cyan-500 shadow-md",
  },
} as const;
