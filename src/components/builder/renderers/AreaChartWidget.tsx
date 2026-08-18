import React from "react";
import type { Widget } from "../../../types";
import { ACCENT_STYLES } from "../../../constants/theme";

export const AreaChartWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  const data = widget.data && widget.data.length > 0 ? widget.data : [32, 45, 58, 62, 74, 88, 95];
  const labels =
    widget.labels && widget.labels.length === data.length
      ? widget.labels
      : data.map((_, i) => `${i * 3}:00`);

  const maxVal = Math.max(...data, 10);
  const minVal = Math.min(...data, 0);
  const range = maxVal - minVal || 1;

  const width = 450;
  const height = 150;
  const paddingX = 12;
  const paddingY = 16;
  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1 || 1)) * graphWidth;
    const y = height - paddingY - ((val - minVal) / range) * graphHeight;
    return { x, y };
  });

  const curvePath = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, "");

  const areaPath = `${curvePath} L ${points[points.length - 1]?.x || width} ${height} L ${paddingX} ${height} Z`;

  return (
    <div className="flex flex-col h-full justify-between w-full min-w-0">
      <div className="flex items-start justify-between gap-3 mb-2 min-w-0">
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
            {widget.metric || `${data[data.length - 1]}`}
          </span>
          {widget.change && (
            <span className="block text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              {widget.change}
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full overflow-hidden my-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            <linearGradient id={`area-grad-${widget.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={accent.stroke} stopOpacity="0.4" />
              <stop offset="60%" stopColor={accent.stroke} stopOpacity="0.12" />
              <stop offset="100%" stopColor={accent.stroke} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area */}
          <path d={areaPath} fill={`url(#area-grad-${widget.id})`} />

          {/* Stroke */}
          <path
            d={curvePath}
            fill="none"
            stroke={accent.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex justify-between items-center px-1 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] text-zinc-400 dark:text-zinc-500 min-w-0">
        <span className="truncate">{labels[0]}</span>
        <span className="truncate">{labels[Math.floor(labels.length / 2)]}</span>
        <span className="truncate">{labels[labels.length - 1]}</span>
      </div>
    </div>
  );
};
