import React from "react";
import type { Widget } from "../../../types";
import { ACCENT_STYLES } from "../../../constants/theme";

export const GaugeWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  const value = widget.data && widget.data[0] !== undefined ? widget.data[0] : 84;
  const max = widget.config?.max || 100;
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  // Gauge geometry
  const width = 140;
  const height = 80;
  const radius = 55;
  const strokeWidth = 10;
  const cx = width / 2;
  const cy = height;

  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col h-full justify-between items-center text-center w-full min-w-0">
      {/* Header */}
      <div className="w-full text-left mb-1 min-w-0">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
          {widget.title}
        </h4>
        {widget.subtitle && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
            {widget.subtitle}
          </p>
        )}
      </div>

      {/* Fluid SVG Semi-Circle Gauge */}
      <div className="relative my-auto flex flex-col items-center w-32 sm:w-36">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Background arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="currentColor"
            className="text-zinc-100 dark:text-zinc-800/80"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Value arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke={accent.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>

        {/* Center text */}
        <div className="mt-[-22px] flex flex-col items-center">
          <span className="text-lg sm:text-xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
            {widget.metric || `${value}`}
          </span>
          <span className="text-[9px] sm:text-[10px] text-zinc-400 dark:text-zinc-500">
            Score / {max}
          </span>
        </div>
      </div>

      {/* Status Footer */}
      <div className="w-full flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/60 min-w-0">
        <span className="text-zinc-400 dark:text-zinc-500 text-[11px] truncate">Threshold: 80%</span>
        {widget.change && (
          <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-medium shrink-0">
            {widget.change}
          </span>
        )}
      </div>
    </div>
  );
};
