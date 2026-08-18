import React, { useState } from "react";
import {
  TrendingUp,
  LineChart,
  BarChart3,
  AreaChart,
  PieChart,
  Table2,
  CheckSquare,
  Gauge,
  Heading,
  FileText,
  Minus,
  Image as ImageIcon,
  Calendar,
  Filter,
  Activity,
  ListFilter,
  Search,
  Plus,
  Sparkles,
} from "lucide-react";
import type { WidgetCategory, WidgetKind } from "../../types";
import { WIDGET_LIBRARY } from "../../constants/theme";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  LineChart,
  BarChart3,
  AreaChart,
  PieChart,
  Table2,
  CheckSquare,
  Gauge,
  Heading,
  FileText,
  Minus,
  Image: ImageIcon,
  Calendar,
  Filter,
  Activity,
  ListFilter,
};

interface WidgetLibraryProps {
  onAddWidget: (kind: WidgetKind) => void;
  onOpenAI: () => void;
}

export const WidgetLibrary: React.FC<WidgetLibraryProps> = ({ onAddWidget, onOpenAI }) => {
  const [activeCategory, setActiveCategory] = useState<WidgetCategory>("analytics");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWidgets = WIDGET_LIBRARY.filter((item) => {
    const matchesCategory = searchQuery ? true : item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <aside className="flex flex-col h-full w-72 shrink-0 border-r bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800/80 select-none">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Widget Library
          </h3>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
            {WIDGET_LIBRARY.length} Types
          </span>
        </div>

        {/* Search */}
        <div className="relative mt-2.5">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 py-1.5 pl-8 pr-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-cyan-500 transition-colors duration-150"
            placeholder="Search widgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="flex border-b border-zinc-200 dark:border-zinc-800/60 p-1.5 bg-zinc-50/50 dark:bg-zinc-900/30">
          {(["analytics", "content", "utility"] as WidgetCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 py-1.5 text-xs font-medium capitalize rounded-md transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Widgets List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredWidgets.map((item) => {
          const Icon = ICON_MAP[item.iconName] || TrendingUp;

          return (
            <button
              key={item.kind}
              onClick={() => onAddWidget(item.kind)}
              className="group flex w-full items-start gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800/70 bg-white dark:bg-zinc-900/40 p-2.5 text-left hover:border-cyan-500/60 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/90 active:scale-[0.98] transition-all duration-150 shadow-2xs cursor-pointer"
              title={`Click to add ${item.name}`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850/60 text-zinc-700 dark:text-zinc-300 group-hover:border-cyan-500/40 group-hover:text-cyan-500 group-hover:scale-105 transition-all duration-150">
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2 leading-tight">
                  {item.description}
                </p>
              </div>

              <div className="opacity-0 group-hover:opacity-100 text-cyan-500 mt-1 transition-all duration-150 transform translate-x-1 group-hover:translate-x-0">
                <Plus className="h-3.5 w-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* AI Generator Quick Banner at Bottom */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
        <button
          onClick={onOpenAI}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/40 p-2.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 active:scale-[0.98] transition-all duration-150"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Generate with AI Studio</span>
        </button>
      </div>
    </aside>
  );
};
