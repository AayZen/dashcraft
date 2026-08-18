import React from "react";
import type { Widget } from "../../../types";
import { ACCENT_STYLES } from "../../../constants/theme";

export const ProgressWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  const value = widget.data && widget.data[0] !== undefined ? widget.data[0] : 78;
  const target = widget.config?.target || 100;
  const percent = Math.min(100, Math.max(0, Math.round((value / target) * 100)));

  return (
    <div className="flex flex-col h-full justify-between w-full min-w-0">
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
        <span className="text-sm font-bold tabular-nums text-zinc-900 dark:text-zinc-100 shrink-0">
          {percent}%
        </span>
      </div>

      <div className="my-auto py-2 w-full">
        <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800/80 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percent}%`,
              backgroundColor: accent.stroke,
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/60 min-w-0">
        <span className="text-zinc-500 dark:text-zinc-400 text-[11px] truncate">
          {widget.metric || `${value} / ${target}`}
        </span>
        {widget.change && (
          <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-medium shrink-0">
            {widget.change}
          </span>
        )}
      </div>
    </div>
  );
};
