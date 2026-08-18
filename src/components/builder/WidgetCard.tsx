import React from "react";
import { Copy, Trash2, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import type { Widget, ViewMode } from "../../types";
import { getWidgetGridClass } from "../../constants/theme";
import { WidgetRenderer } from "./WidgetRenderer";

interface WidgetCardProps {
  widget: Widget;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  isDraggable?: boolean;
  isPreview?: boolean;
  viewMode?: ViewMode;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  isSelected,
  onSelect,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isPreview = false,
  viewMode = "desktop",
}) => {
  const gridClass = getWidgetGridClass(widget.size, viewMode);

  if (isPreview) {
    return (
      <div
        id={`widget-${widget.id}`}
        className={`@container ${gridClass} rounded-xl border bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800/80 p-3.5 sm:p-4.5 shadow-sm transition-all duration-200 min-w-0 max-w-full`}
      >
        <WidgetRenderer widget={widget} />
      </div>
    );
  }

  return (
    <div
      id={`widget-${widget.id}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(widget.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(widget.id);
        }
      }}
      className={`group relative @container ${gridClass} flex flex-col justify-between rounded-xl border p-3.5 sm:p-4.5 text-left transition-all duration-200 outline-none select-none cursor-pointer min-w-0 max-w-full animate-card-in ${
        isSelected
          ? "bg-white dark:bg-zinc-900 border-cyan-500 dark:border-cyan-400 ring-2 ring-cyan-500/25 shadow-md -translate-y-0.5"
          : "bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm"
      }`}
    >
      {/* Quick Action Toolbar with micro-interaction entrance */}
      <div
        className={`absolute -top-3 right-2 sm:right-3 z-10 flex items-center gap-0.5 sm:gap-1 rounded-lg border bg-white/95 dark:bg-zinc-900/95 border-zinc-200 dark:border-zinc-700 px-1 py-0.5 shadow-md backdrop-blur-xs transition-all duration-150 ${
          isSelected
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-1 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center text-zinc-400 dark:text-zinc-500 px-1 cursor-grab" title="Drag Handle">
          <GripVertical className="h-3 w-3" />
        </div>

        {onMoveUp && (
          <button
            onClick={() => onMoveUp(widget.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            title="Move Earlier"
          >
            <ChevronUp className="h-3 w-3" />
          </button>
        )}

        {onMoveDown && (
          <button
            onClick={() => onMoveDown(widget.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            title="Move Later"
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        )}

        {onDuplicate && (
          <button
            onClick={() => onDuplicate(widget.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            title="Duplicate Widget"
          >
            <Copy className="h-3 w-3" />
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(widget.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 active:scale-95 transition-all"
            title="Delete Widget"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Widget Visual Content */}
      <WidgetRenderer widget={widget} />

      {/* Widget Type Badge in footer on hover */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 min-w-0">
        <span className="uppercase tracking-wider font-mono truncate font-medium">
          {widget.kind} &bull; {widget.size}
        </span>
        <span className="shrink-0 hidden sm:inline">Click to inspect</span>
      </div>
    </div>
  );
};
