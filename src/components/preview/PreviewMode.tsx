import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Share2,
  Download,
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  Sun,
  Moon,
  Edit3,
} from "lucide-react";
import { storage } from "../../services/storage";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import { Logo } from "../brand/Logo";
import { DashboardGrid } from "../builder/DashboardGrid";
import { ExportModal } from "../builder/ExportModal";
import { ShareModal } from "../builder/ShareModal";
import { SEO } from "../common/SEO";
import { previewSEO } from "../../data/seoData";
import type { ViewMode } from "../../types";

export const PreviewMode: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme, isDark, toggleTheme } = useTheme();
  const toast = useToast();

  const [dashboard] = useState(() => {
    if (id) {
      return storage.getDashboardById(id) || storage.getDashboards()[0];
    }
    return storage.getDashboards()[0];
  });

  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!dashboard) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4 text-center animate-fade-in">
        <SEO {...previewSEO} />
        <h2 className="text-xl font-bold">Dashboard not found</h2>
        <p className="mt-2 text-sm text-zinc-500">The requested dashboard could not be located in local storage.</p>
        <Link
          to="/dashboards"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-950 active:scale-95 transition-all"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Dashboards
        </Link>
      </div>
    );
  }

  const viewportClasses = {
    desktop: "max-w-7xl",
    tablet: "max-w-3xl",
    mobile: "max-w-md",
  }[viewMode];

  return (
    <div className="min-h-screen bg-zinc-100/80 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col animate-fade-in">
      <SEO {...previewSEO} />
      {/* Presentation Header Bar */}
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b bg-white/95 dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 backdrop-blur-md">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to={`/builder/${dashboard.id}`}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 active:scale-95 transition-all duration-150 shrink-0"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit in Studio</span>
          </Link>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          <Logo variant="compact" size="xs" isLink className="hidden sm:inline-flex" />
        </div>

        {/* Viewport Simulation Controls */}
        <div className="hidden md:flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 p-0.5">
          <button
            onClick={() => setViewMode("desktop")}
            className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium active:scale-95 transition-all duration-150 ${
              viewMode === "desktop"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewMode("tablet")}
            className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium active:scale-95 transition-all duration-150 ${
              viewMode === "tablet"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium active:scale-95 transition-all duration-150 ${
              viewMode === "mobile"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setRefreshKey((k) => k + 1);
              toast.info("Dashboard view refreshed");
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 active:scale-95 transition-all duration-150"
            title="Refresh View"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 active:scale-95 transition-all duration-150"
            title={`Switch to ${isDark ? "Light" : "Dark"} Mode (Current: ${theme})`}
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 active:scale-95 transition-all duration-150"
            title="Share Link"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 active:scale-95 transition-all duration-150"
            title="Export JSON"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Main Canvas Presentation */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 canvas-grid-pattern">
        <div className={`mx-auto w-full ${viewportClasses} transition-all duration-300 @container min-w-0`}>
          {/* Dashboard Meta Banner */}
          <div className="mb-6 rounded-2xl border bg-white dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800/80 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {dashboard.name}
                </h2>
                {dashboard.description && (
                  <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    {dashboard.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  {dashboard.settings?.dateRange || "Last 30 days"}
                </span>
                <span className="rounded-md border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                  Live View
                </span>
              </div>
            </div>
          </div>

          {/* Widgets Grid in Clean Presentation Mode */}
          <div key={refreshKey} className="rounded-2xl border bg-white/40 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800/80 p-4 sm:p-6 shadow-sm min-w-0">
            <DashboardGrid
              widgets={dashboard.widgets}
              selectedWidgetId={null}
              onSelectWidget={() => {}}
              onDuplicateWidget={() => {}}
              onDeleteWidget={() => {}}
              onMoveUpWidget={() => {}}
              onMoveDownWidget={() => {}}
              density={dashboard.settings?.density || "comfortable"}
              viewMode={viewMode}
              isPreview={true}
            />
          </div>
        </div>
      </main>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        dashboard={dashboard}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        dashboard={dashboard}
      />
    </div>
  );
};
