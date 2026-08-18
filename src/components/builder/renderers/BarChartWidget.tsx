import React, { useState } from "react";
import type { Widget } from "../../../types";
import { ACCENT_STYLES } from "../../../constants/theme";

export const BarChartWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = widget.data && widget.data.length > 0 ? widget.data.slice(0, 8) : [42, 68, 54, 82, 95, 71];
  const labels =
    widget.labels && widget.labels.length >= data.length
      ? widget.labels.slice(0, data.length)
      : data.map((_, i) => `Q${i + 1}`);

  const maxVal = Math.max(...data, 10);

  return (
    <div className="flex flex-col h-full justify-between w-full min-w-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3 min-w-0">
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
        <div className="text-right shrink-0">
          <span className="text-base sm:text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
            {hoverIndex !== null ? data[hoverIndex] : widget.metric || `${data[data.length - 1]}`}
          </span>
          {widget.change && (
            <span className="block text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              {widget.change}
            </span>
          )}
        </div>
      </div>

      {/* Bars Chart Area */}
      <div className="flex items-end gap-1.5 sm:gap-2.5 h-32 sm:h-36 w-full pt-4 pb-2 px-1 min-w-0">
        {data.map((val, idx) => {
          const heightPercent = Math.max(8, (val / maxVal) * 100);
          const isHovered = hoverIndex === idx;

          return (
            <div
              key={idx}
              className="flex-1 min-w-0 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Value indicator on hover */}
              <span
                className={`text-[9px] sm:text-[10px] tabular-nums font-medium transition-opacity truncate ${
                  isHovered
                    ? "opacity-100 text-zinc-900 dark:text-zinc-100 font-semibold"
                    : "opacity-0 group-hover:opacity-100 text-zinc-500"
                }`}
              >
                {val}
              </span>

              {/* Bar */}
              <div className="w-full max-w-[32px] sm:max-w-[36px] bg-zinc-100 dark:bg-zinc-800/80 rounded-t-md overflow-hidden h-full flex items-end">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 shadow-md"
                      : "opacity-85 hover:opacity-100"
                  }`}
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: accent.stroke,
                  }}
                />
              </div>

              {/* X-axis Label */}
              <span className="text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 truncate w-full text-center">
                {labels[idx]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
