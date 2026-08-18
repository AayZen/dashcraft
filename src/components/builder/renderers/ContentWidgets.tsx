import React from "react";
import type { Widget } from "../../../types";
import { Info, Image as ImageIcon } from "lucide-react";
import { ACCENT_STYLES } from "../../../constants/theme";

export const HeadingWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  return (
    <div className="py-1 flex items-start gap-2.5 min-w-0">
      <span
        className="h-5 w-1 rounded-full shrink-0 mt-0.5"
        style={{ backgroundColor: accent.stroke }}
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight truncate">
          {widget.title}
        </h3>
        {widget.subtitle && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
            {widget.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export const TextWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  return (
    <div className={`rounded-lg p-3.5 border ${accent.bg} ${accent.border} flex items-start gap-3 w-full min-w-0`}>
      <Info className={`h-4 w-4 shrink-0 mt-0.5 ${accent.text}`} />
      <div className="min-w-0 flex-1">
        <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
          {widget.title}
        </h5>
        <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
          {widget.subtitle || widget.config?.customText || "Custom analytics annotation or insights note."}
        </p>
      </div>
    </div>
  );
};

export const DividerWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  return (
    <div className="flex items-center gap-3 py-1 w-full min-w-0">
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      {widget.title && (
        <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${accent.badge}`}>
          {widget.title}
        </span>
      )}
      <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
};

export const ImageWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-50 dark:bg-zinc-850/50 border border-dashed ${accent.border} text-center w-full min-w-0`}>
      <ImageIcon className={`h-6 w-6 mb-2 ${accent.text}`} />
      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">{widget.title}</span>
      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">{widget.subtitle || "Media Asset Card"}</span>
    </div>
  );
};
