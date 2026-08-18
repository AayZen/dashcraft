import type { AccentColor, Density, WidgetLibraryItem, WidgetSize, ViewMode } from "../types";

export const ACCENT_COLORS: AccentColor[] = [
  "cyan",
  "blue",
  "emerald",
  "violet",
  "amber",
  "rose",
  "indigo",
  "zinc",
];

export const ACCENT_STYLES: Record<
  AccentColor,
  {
    name: string;
    text: string;
    textHover: string;
    bg: string;
    bgHover: string;
    border: string;
    fill: string;
    stroke: string;
    gradient: string;
    ring: string;
    badge: string;
  }
> = {
  cyan: {
    name: "Cyan",
    text: "text-cyan-600 dark:text-cyan-400",
    textHover: "hover:text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    bgHover: "hover:bg-cyan-100 dark:hover:bg-cyan-900/30",
    border: "border-cyan-200 dark:border-cyan-800/60",
    fill: "fill-cyan-500 dark:fill-cyan-400",
    stroke: "#06b6d4",
    gradient: "from-cyan-500/20 to-transparent",
    ring: "focus:ring-cyan-500/40",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/60",
  },
  blue: {
    name: "Blue",
    text: "text-blue-600 dark:text-blue-400",
    textHover: "hover:text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    bgHover: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800/60",
    fill: "fill-blue-500 dark:fill-blue-400",
    stroke: "#3b82f6",
    gradient: "from-blue-500/20 to-transparent",
    ring: "focus:ring-blue-500/40",
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60",
  },
  emerald: {
    name: "Emerald",
    text: "text-emerald-600 dark:text-emerald-400",
    textHover: "hover:text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    bgHover: "hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
    border: "border-emerald-200 dark:border-emerald-800/60",
    fill: "fill-emerald-500 dark:fill-emerald-400",
    stroke: "#10b981",
    gradient: "from-emerald-500/20 to-transparent",
    ring: "focus:ring-emerald-500/40",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60",
  },
  violet: {
    name: "Violet",
    text: "text-violet-600 dark:text-violet-400",
    textHover: "hover:text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    bgHover: "hover:bg-violet-100 dark:hover:bg-violet-900/30",
    border: "border-violet-200 dark:border-violet-800/60",
    fill: "fill-violet-500 dark:fill-violet-400",
    stroke: "#8b5cf6",
    gradient: "from-violet-500/20 to-transparent",
    ring: "focus:ring-violet-500/40",
    badge: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800/60",
  },
  amber: {
    name: "Amber",
    text: "text-amber-600 dark:text-amber-400",
    textHover: "hover:text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    bgHover: "hover:bg-amber-100 dark:hover:bg-amber-900/30",
    border: "border-amber-200 dark:border-amber-800/60",
    fill: "fill-amber-500 dark:fill-amber-400",
    stroke: "#f59e0b",
    gradient: "from-amber-500/20 to-transparent",
    ring: "focus:ring-amber-500/40",
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60",
  },
  rose: {
    name: "Rose",
    text: "text-rose-600 dark:text-rose-400",
    textHover: "hover:text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    bgHover: "hover:bg-rose-100 dark:hover:bg-rose-900/30",
    border: "border-rose-200 dark:border-rose-800/60",
    fill: "fill-rose-500 dark:fill-rose-400",
    stroke: "#f43f5e",
    gradient: "from-rose-500/20 to-transparent",
    ring: "focus:ring-rose-500/40",
    badge: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60",
  },
  indigo: {
    name: "Indigo",
    text: "text-indigo-600 dark:text-indigo-400",
    textHover: "hover:text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    bgHover: "hover:bg-indigo-100 dark:hover:bg-indigo-900/30",
    border: "border-indigo-200 dark:border-indigo-800/60",
    fill: "fill-indigo-500 dark:fill-indigo-400",
    stroke: "#6366f1",
    gradient: "from-indigo-500/20 to-transparent",
    ring: "focus:ring-indigo-500/40",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/60",
  },
  zinc: {
    name: "Zinc",
    text: "text-zinc-700 dark:text-zinc-300",
    textHover: "hover:text-zinc-600",
    bg: "bg-zinc-100 dark:bg-zinc-900",
    bgHover: "hover:bg-zinc-200 dark:hover:bg-zinc-800",
    border: "border-zinc-300 dark:border-zinc-700",
    fill: "fill-zinc-600 dark:fill-zinc-400",
    stroke: "#71717a",
    gradient: "from-zinc-500/20 to-transparent",
    ring: "focus:ring-zinc-500/40",
    badge: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700",
  },
};

/**
 * Returns a multi-series palette starting with the selected base accent
 */
export function getPaletteForAccent(baseAccent: AccentColor, count: number): string[] {
  const baseStyle = ACCENT_STYLES[baseAccent] || ACCENT_STYLES.cyan;
  const otherColors = ACCENT_COLORS.filter((c) => c !== baseAccent);
  const result: string[] = [baseStyle.stroke];
  for (let i = 0; i < count - 1; i++) {
    const colKey = otherColors[i % otherColors.length];
    result.push(ACCENT_STYLES[colKey].stroke);
  }
  return result;
}

export const SIZE_GRID_CLASSES: Record<WidgetSize, string> = {
  sm: "col-span-12 sm:col-span-6 lg:col-span-3 @md:col-span-6 @3xl:col-span-3",
  md: "col-span-12 sm:col-span-6 lg:col-span-6 @md:col-span-6 @3xl:col-span-6",
  lg: "col-span-12 lg:col-span-8 @3xl:col-span-8",
  full: "col-span-12",
};

export function getWidgetGridClass(size: WidgetSize, viewMode: ViewMode = "desktop"): string {
  if (viewMode === "mobile") {
    return "col-span-12";
  }

  if (viewMode === "tablet") {
    switch (size) {
      case "sm":
        return "col-span-6"; // 2 cards per row on tablet
      case "md":
      case "lg":
      case "full":
        return "col-span-12"; // full width on tablet
      default:
        return "col-span-12";
    }
  }

  // Desktop mode: uses responsive viewport & container queries
  switch (size) {
    case "sm":
      return "col-span-12 sm:col-span-6 lg:col-span-3 @md:col-span-6 @3xl:col-span-3";
    case "md":
      return "col-span-12 sm:col-span-6 lg:col-span-6 @md:col-span-6 @3xl:col-span-6";
    case "lg":
      return "col-span-12 lg:col-span-8 @3xl:col-span-8";
    case "full":
      return "col-span-12";
    default:
      return "col-span-12 sm:col-span-6 lg:col-span-6";
  }
}

export const DENSITY_SETTINGS: Record<
  Density,
  {
    gap: string;
    padding: string;
    cardPadding: string;
    label: string;
  }
> = {
  compact: {
    gap: "gap-2.5 sm:gap-3",
    padding: "p-2 sm:p-3",
    cardPadding: "p-3 sm:p-3.5",
    label: "Compact",
  },
  comfortable: {
    gap: "gap-3.5 sm:gap-4",
    padding: "p-3 sm:p-5",
    cardPadding: "p-3.5 sm:p-4.5",
    label: "Comfortable",
  },
  spacious: {
    gap: "gap-4 sm:gap-6",
    padding: "p-4 sm:p-6",
    cardPadding: "p-4.5 sm:p-6",
    label: "Spacious",
  },
};

export const WIDGET_LIBRARY: WidgetLibraryItem[] = [
  // Analytics
  {
    kind: "kpi",
    name: "KPI Metric",
    category: "analytics",
    description: "Key performance indicator with metric, trend, and mini sparkline",
    defaultSize: "sm",
    iconName: "TrendingUp",
    badge: "Popular",
  },
  {
    kind: "line",
    name: "Line Trend",
    category: "analytics",
    description: "Time-series trend analysis with interactive spline curve",
    defaultSize: "md",
    iconName: "LineChart",
    badge: "Core",
  },
  {
    kind: "bar",
    name: "Bar Chart",
    category: "analytics",
    description: "Categorical comparison with rounded vertical or horizontal bars",
    defaultSize: "md",
    iconName: "BarChart3",
    badge: "Core",
  },
  {
    kind: "area",
    name: "Area Chart",
    category: "analytics",
    description: "Volume and cumulative metrics with smooth gradient fills",
    defaultSize: "md",
    iconName: "AreaChart",
  },
  {
    kind: "donut",
    name: "Donut Mix",
    category: "analytics",
    description: "Segmented composition breakdown with center metric",
    defaultSize: "md",
    iconName: "PieChart",
  },
  {
    kind: "table",
    name: "Data Table",
    category: "analytics",
    description: "Structured ranking table with status pills and value progress",
    defaultSize: "lg",
    iconName: "Table2",
  },
  {
    kind: "progress",
    name: "Goal Progress",
    category: "analytics",
    description: "Multi-tier milestone and target completion tracker",
    defaultSize: "sm",
    iconName: "CheckSquare",
  },
  {
    kind: "gauge",
    name: "Speedometer Gauge",
    category: "analytics",
    description: "Radial gauge showing current vs target threshold",
    defaultSize: "sm",
    iconName: "Gauge",
  },

  // Content
  {
    kind: "heading",
    name: "Section Header",
    category: "content",
    description: "Clear section title and subtitle for dashboard segmentation",
    defaultSize: "full",
    iconName: "Heading",
  },
  {
    kind: "text",
    name: "Note / Callout",
    category: "content",
    description: "Explanatory commentary, insights, or alert banner",
    defaultSize: "md",
    iconName: "FileText",
  },
  {
    kind: "divider",
    name: "Divider",
    category: "content",
    description: "Visual separator with optional group label",
    defaultSize: "full",
    iconName: "Minus",
  },
  {
    kind: "image",
    name: "Media Card",
    category: "content",
    description: "Brand logo, graphic banner, or visual placeholder",
    defaultSize: "sm",
    iconName: "Image",
  },

  // Utility
  {
    kind: "date",
    name: "Date Range",
    category: "utility",
    description: "Timeframe selector pill for interactive reporting",
    defaultSize: "sm",
    iconName: "Calendar",
  },
  {
    kind: "filter",
    name: "Category Filter",
    category: "utility",
    description: "Interactive segment and dimension switcher",
    defaultSize: "sm",
    iconName: "Filter",
  },
  {
    kind: "status",
    name: "System Status",
    category: "utility",
    description: "Service uptime status indicator and health vitals",
    defaultSize: "sm",
    iconName: "Activity",
  },
  {
    kind: "activity",
    name: "Activity Stream",
    category: "utility",
    description: "Recent event timeline and audit log feed",
    defaultSize: "md",
    iconName: "ListFilter",
  },
];
