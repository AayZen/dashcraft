import React from "react";
import type { Widget } from "../../../types";
import { ACCENT_STYLES, getPaletteForAccent } from "../../../constants/theme";

export const DonutWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  const data = widget.data && widget.data.length >= 2 ? widget.data : [52, 30, 18];
  const labels =
    widget.labels && widget.labels.length >= data.length
      ? widget.labels
      : ["Category A", "Category B", "Category C", "Category D"].slice(0, data.length);

  const total = data.reduce((acc, v) => acc + v, 0) || 1;
  const palette = getPaletteForAccent(widget.accent, data.length);

  const rawSegments = data.map((val, idx) => {
    const percent = Math.round((val / total) * 100);
    const color = palette[idx] || accent.stroke;
    return {
      label: labels[idx] || `Series ${idx + 1}`,
      value: val,
      percent,
      color,
    };
  });

  const size = 140;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute segment offsets purely and immutably
  const segments = rawSegments.map((seg, idx, arr) => {
    const offsetPercent = arr.slice(0, idx).reduce((sum, s) => sum + s.percent, 0);
    return {
      ...seg,
      offsetPercent,
    };
  });

  return (
    <div className="flex flex-col h-full justify-between w-full min-w-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {widget.title}
          </h4>
          {widget.subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
              {widget.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Donut & Legend Container: Responsive Flex Column on Narrow / Row on Wide */}
      <div className="flex flex-col @sm:flex-row items-center justify-around gap-3 my-auto py-2 min-w-0 w-full">
        {/* SVG Donut */}
        <div className="relative shrink-0 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90">
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              className="text-zinc-100 dark:text-zinc-800/80"
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {segments.map((seg, idx) => {
              const strokeDasharray = `${(seg.percent / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((seg.offsetPercent / 100) * circumference);

              return (
                <circle
                  key={idx}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Center Metric Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-1">
            <span className="text-xs sm:text-sm font-bold tabular-nums text-zinc-900 dark:text-zinc-50 truncate max-w-[70px]">
              {widget.metric || `${segments[0]?.percent || 0}%`}
            </span>
            <span className={`text-[9px] sm:text-[10px] truncate max-w-[70px] ${accent.text}`}>
              {widget.change || "Leading"}
            </span>
          </div>
        </div>

        {/* Legend: responsive wrapping chips/list that never overflows */}
        <div className="flex flex-wrap @sm:flex-col gap-1.5 min-w-0 max-w-full justify-center @sm:justify-start">
          {segments.map((seg, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 text-xs rounded-md bg-zinc-50 dark:bg-zinc-800/50 @sm:bg-transparent px-2 py-1 @sm:p-0 min-w-0 max-w-full"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[80px] sm:max-w-[100px]">
                  {seg.label}
                </span>
              </div>
              <span className="font-mono text-zinc-900 dark:text-zinc-200 tabular-nums font-semibold shrink-0">
                {seg.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-1 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] text-zinc-400 dark:text-zinc-500 min-w-0">
        <span className="truncate">Total: {total.toLocaleString()}</span>
        <span className="shrink-0">{segments.length} Segments</span>
      </div>
    </div>
  );
};
