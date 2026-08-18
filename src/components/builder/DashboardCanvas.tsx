import React from "react";
import { Plus, Sparkles, LayoutDashboard } from "lucide-react";
import type { Dashboard, ViewMode, WidgetKind } from "../../types";
import { DashboardGrid } from "./DashboardGrid";
import { DENSITY_SETTINGS } from "../../constants/theme";
import { LogoMark } from "../brand/Logo";

interface DashboardCanvasProps {
  dashboard: Dashboard;
  selectedWidgetId: string | null;
  onSelectWidget: (id: string | null) => void;
  onDuplicateWidget: (id: string) => void;
  onDeleteWidget: (id: string) => void;
  onMoveUpWidget: (id: string) => void;
  onMoveDownWidget: (id: string) => void;
  onAddWidget: (kind: WidgetKind) => void;
  onOpenAI: () => void;
  viewMode: ViewMode;
  isPreview?: boolean;
}

export const DashboardCanvas: React.FC<DashboardCanvasProps> = ({
  dashboard,
  selectedWidgetId,
  onSelectWidget,
  onDuplicateWidget,
  onDeleteWidget,
  onMoveUpWidget,
  onMoveDownWidget,
  onAddWidget,
  onOpenAI,
  viewMode,
  isPreview = false,
}) => {
  const density = dashboard.settings?.density || "comfortable";
  const densitySetting = DENSITY_SETTINGS[density];

  // Viewport width constraints (Desktop, Tablet 768px max, Mobile 448px max)
  const viewportClasses = {
    desktop: "max-w-7xl",
    tablet: "max-w-3xl",
    mobile: "max-w-md",
  }[viewMode];

  return (
    <main
      className="relative flex-1 overflow-y-auto bg-zinc-100/70 dark:bg-zinc-950/60 canvas-grid-pattern p-2.5 sm:p-5 lg:p-8 min-w-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelectWidget(null);
        }
      }}
    >
      <div
        className={`mx-auto w-full ${viewportClasses} transition-all duration-300 @container min-w-0`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onSelectWidget(null);
          }
        }}
      >
        {/* Top Header Card inside Canvas */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800/80 p-4 sm:px-6 sm:py-4 shadow-sm min-w-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight truncate">
              {dashboard.name}
            </h1>
            {dashboard.description && (
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                {dashboard.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              <LayoutDashboard className="h-3 w-3 text-cyan-500" />
              <span>{dashboard.widgets.length} Widgets</span>
            </span>

            {dashboard.generationSource === "ai_generated" && (
              <span className="rounded-md border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 dark:text-cyan-300">
                AI Generated
              </span>
            )}
            {dashboard.generationSource === "synthesized_demo" && (
              <span className="rounded-md border border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                Synthesized Demo
              </span>
            )}
          </div>
        </div>

        {/* Widgets Grid or Empty State */}
        {dashboard.widgets.length === 0 ? (
          <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 p-6 sm:p-8 text-center min-w-0">
            <div className="mb-4 flex items-center justify-center">
              <LogoMark className="h-12 w-12" size={48} idSuffix="empty-canvas" />
            </div>

            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              No widgets on canvas yet
            </h3>
            <p className="mt-1 max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
              Add your first metric or chart from the widget library, or generate an entire dashboard with AI in seconds.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onAddWidget("kpi")}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add KPI Metric</span>
              </button>

              <button
                onClick={onOpenAI}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-cyan-400 transition"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate with AI</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={`${densitySetting.padding} rounded-2xl border bg-white/40 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800/80 shadow-xs backdrop-blur-xs min-w-0`}>
            <DashboardGrid
              widgets={dashboard.widgets}
              selectedWidgetId={selectedWidgetId}
              onSelectWidget={(id) => onSelectWidget(id)}
              onDuplicateWidget={onDuplicateWidget}
              onDeleteWidget={onDeleteWidget}
              onMoveUpWidget={onMoveUpWidget}
              onMoveDownWidget={onMoveDownWidget}
              density={density}
              viewMode={viewMode}
              isPreview={isPreview}
            />
          </div>
        )}
      </div>
    </main>
  );
};
