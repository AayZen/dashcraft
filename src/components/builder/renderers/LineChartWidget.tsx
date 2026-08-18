import React, { useState } from "react";
import type { Widget } from "../../../types";
import { ACCENT_STYLES } from "../../../constants/theme";

export const LineChartWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = widget.data && widget.data.length > 0 ? widget.data : [28, 42, 38, 56, 64, 78, 92];
  const labels =
    widget.labels && widget.labels.length === data.length
      ? widget.labels
      : data.map((_, i) => `P${i + 1}`);

  const maxVal = Math.max(...data, 10);
  const minVal = Math.min(...data, 0);
  const range = maxVal - minVal || 1;

  const width = 400;
  const height = 160;
  const paddingX = 16;
  const paddingY = 20;
  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1 || 1)) * graphWidth;
    const y = height - paddingY - ((val - minVal) / range) * graphHeight;
    return { x, y, val, label: labels[idx] };
  });

  // Create smooth bezier curve path
  const curvePath = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, "");

  const areaPath = `${curvePath} L ${points[points.length - 1]?.x || width} ${height - paddingY} L ${paddingX} ${height - paddingY} Z`;

  return (
    <div className="flex flex-col h-full justify-between w-full min-w-0">
      {/* Header */}
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
            {hoverIndex !== null ? data[hoverIndex] : widget.metric || `${data[data.length - 1]}`}
          </span>
          {widget.change && (
            <span className="block text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              {widget.change}
            </span>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden my-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id={`line-grad-${widget.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={accent.stroke} stopOpacity="0.28" />
              <stop offset="100%" stopColor={accent.stroke} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid guide lines */}
          {[0, 0.5, 1].map((ratio) => {
            const y = height - paddingY - ratio * graphHeight;
            return (
              <line
                key={ratio}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="currentColor"
                className="text-zinc-200 dark:text-zinc-800/80"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill={`url(#line-grad-${widget.id})`} />

          {/* Main Stroke */}
          <path
            d={curvePath}
            fill="none"
            stroke={accent.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, idx) => (
            <g key={idx} className="cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoverIndex === idx ? "5" : "3.5"}
                fill={hoverIndex === idx ? accent.stroke : "var(--bg-surface, #18181c)"}
                stroke={accent.stroke}
                strokeWidth={hoverIndex === idx ? "2.5" : "2"}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                className="transition-all duration-150"
              />
            </g>
          ))}
        </svg>

        {/* Clamped Tooltip Indicator (never overflows card bounds) */}
        {hoverIndex !== null && (
          <div
            className="absolute top-1 transform -translate-x-1/2 rounded bg-zinc-900 dark:bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-white dark:text-zinc-900 shadow pointer-events-none transition-all duration-75"
            style={{
              left: `${Math.max(12, Math.min(88, (points[hoverIndex].x / width) * 100))}%`,
            }}
          >
            {labels[hoverIndex]}: {data[hoverIndex]}
          </div>
        )}
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between items-center px-1 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] text-zinc-400 dark:text-zinc-500 min-w-0">
        {labels.filter((_, i) => i === 0 || i === Math.floor(labels.length / 2) || i === labels.length - 1).map((lbl, idx) => (
          <span key={idx} className="truncate">{lbl}</span>
        ))}
      </div>
    </div>
  );
};
