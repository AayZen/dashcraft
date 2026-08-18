import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Widget } from "../../../types";
import { ACCENT_STYLES } from "../../../constants/theme";

export const KPIWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;
  const isPositive = widget.changeType !== "decrease" && !widget.change?.startsWith("-");
  const isNeutral = widget.changeType === "neutral";

  // Generate smooth sparkline points
  const points = widget.data && widget.data.length > 0 ? widget.data : [35, 48, 62, 54, 76, 88];
  const maxVal = Math.max(...points, 1);
  const minVal = Math.min(...points, 0);
  const range = maxVal - minVal || 1;

  const width = 120;
  const height = 36;
  const step = width / (points.length - 1 || 1);

  const coords = points.map((val, idx) => {
    const x = idx * step;
    const y = height - ((val - minVal) / range) * (height - 6) - 3;
    return { x, y };
  });

  const pathD = coords.reduce(
    (acc, curr, idx) => (idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`),
    ""
  );

  return (
    <div className="flex flex-col justify-between h-full min-h-[96px] w-full min-w-0">
      {/* Top row: Title on left, Trend badge on right */}
      <div className="flex items-center justify-between gap-2 min-w-0">
        <p
          className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate flex-1 min-w-0"
          title={widget.title}
        >
          {widget.title}
        </p>

        {/* Trend badge */}
        {widget.change && (
          <div
            className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold border shrink-0 ${
              isNeutral
                ? "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                : isPositive
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
                : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/50"
            }`}
          >
            {isNeutral ? (
              <Minus className="h-3 w-3" />
            ) : isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{widget.change}</span>
          </div>
        )}
      </div>

      {/* Primary KPI Metric - Full width dedicated row for maximum legibility */}
      <div className="my-1.5 sm:my-2 flex items-baseline gap-2 min-w-0">
        <span
          className="text-2xl @[180px]:text-3xl font-bold tracking-tight tabular-nums text-zinc-900 dark:text-zinc-50 leading-none break-words min-w-0"
          title={widget.metric}
        >
          {widget.metric}
        </span>
      </div>

      {/* Bottom row: Subtitle/Period and Responsive SVG Sparkline */}
      <div className="mt-auto flex items-end justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/40 min-w-0">
        <span
          className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate flex-1 min-w-0"
          title={widget.changePeriod || widget.subtitle || "Recent period"}
        >
          {widget.changePeriod || widget.subtitle || "Recent period"}
        </span>

        {/* Fluid SVG Sparkline */}
        <div className="h-7 sm:h-8 w-20 sm:w-24 max-w-[45%] shrink-0 flex items-center justify-end">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={`grad-${widget.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={accent.stroke} stopOpacity="0.3" />
                <stop offset="100%" stopColor={accent.stroke} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <path
              d={`${pathD} L ${width} ${height} L 0 ${height} Z`}
              fill={`url(#grad-${widget.id})`}
            />
            {/* Line stroke */}
            <path
              d={pathD}
              fill="none"
              stroke={accent.stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Latest point circle */}
            {coords.length > 0 && (
              <circle
                cx={coords[coords.length - 1].x}
                cy={coords[coords.length - 1].y}
                r="3"
                fill={accent.stroke}
                className="animate-pulse"
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
