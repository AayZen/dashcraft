import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Undo,
  Redo,
  Sparkles,
  Eye,
  Edit3,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Share2,
  Save,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Command,
  Sun,
  Moon,
} from "lucide-react";
import type { ViewMode } from "../../types";
import type { SaveStatus } from "../../hooks/useDashboard";
import { useTheme } from "../../hooks/useTheme";
import { LogoMark } from "../brand/Logo";

interface BuilderToolbarProps {
  dashboardName: string;
  onUpdateName: (name: string) => void;
  saveStatus: SaveStatus;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  isPreview: boolean;
  onTogglePreview: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onOpenAI: () => void;
  onOpenExport: () => void;
  onOpenShare: () => void;
  onOpenCommandPalette: () => void;
  onSaveNow: () => void;
}

export const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  dashboardName,
  onUpdateName,
  saveStatus,
  viewMode,
  onChangeViewMode,
  isPreview,
  onTogglePreview,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onOpenAI,
  onOpenExport,
  onOpenShare,
  onOpenCommandPalette,
  onSaveNow,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(dashboardName);

  const handleTitleSubmit = () => {
    if (titleInput.trim()) {
      onUpdateName(titleInput.trim());
    } else {
      setTitleInput(dashboardName);
    }
    setIsEditingTitle(false);
  };

  const isSaving = saveStatus === "Saving...";
  const isSaved = saveStatus === "Saved" || saveStatus === "AI Generated";
  const isError = saveStatus === "Save Failed";

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b bg-white/95 dark:bg-zinc-950/95 border-zinc-200 dark:border-zinc-800/80 px-2.5 sm:px-4 backdrop-blur-sm min-w-0 transition-colors duration-150">
      {/* Left: Navigation & Dashboard Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial">
        <Link
          to="/dashboards"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-95 transition-all duration-150"
          title="Back to My Dashboards"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        <Link to="/" title="DashCraft Home" className="hidden sm:flex items-center group">
          <LogoMark className="h-5 w-5 transition-transform duration-150 group-hover:scale-105" size={20} idSuffix="toolbar" />
        </Link>

        <div className="h-4 w-px bg-zinc-200 dark:border-zinc-800 shrink-0" />

        <div className="flex items-center gap-2 min-w-0 flex-1">
          {isEditingTitle ? (
            <input
              type="text"
              autoFocus
              className="h-8 w-full max-w-[180px] sm:max-w-[240px] rounded-md border border-cyan-500 bg-white dark:bg-zinc-900 px-2.5 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 outline-none"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleSubmit();
                if (e.key === "Escape") {
                  setTitleInput(dashboardName);
                  setIsEditingTitle(false);
                }
              }}
            />
          ) : (
            <button
              onClick={() => {
                setTitleInput(dashboardName);
                setIsEditingTitle(true);
              }}
              className="group flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-150 min-w-0 truncate"
              title="Click to rename dashboard"
            >
              <span className="truncate max-w-[120px] sm:max-w-[240px] md:max-w-[320px]">{dashboardName}</span>
              <Edit3 className="h-3 w-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>
          )}

          {/* Persistent Save Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-medium pl-1 shrink-0 transition-all duration-200">
            {isSaving && (
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </span>
            )}
            {isSaved && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Saved locally</span>
              </span>
            )}
            {isError && (
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <AlertCircle className="h-3 w-3" />
                <span>Save failed</span>
              </span>
            )}
            {!isSaving && !isSaved && !isError && (
              <span className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>Unsaved changes</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Center: Viewport & Presentation Mode Switcher */}
      <div className="hidden md:flex items-center gap-2 shrink-0">
        {/* Device Viewport switch */}
        <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-0.5">
          <button
            onClick={() => onChangeViewMode("desktop")}
            className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all duration-150 ${
              viewMode === "desktop"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
            title="Desktop View (1200px max)"
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => onChangeViewMode("tablet")}
            className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all duration-150 ${
              viewMode === "tablet"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="h-3.5 w-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => onChangeViewMode("mobile")}
            className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all duration-150 ${
              viewMode === "mobile"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
            title="Mobile View (390px)"
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Mode Toggle */}
        <button
          onClick={onTogglePreview}
          className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold active:scale-95 transition-all duration-150 ${
            isPreview
              ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 shadow-xs"
              : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          }`}
          title={isPreview ? "Return to Editor" : "Switch to Presentation Preview"}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>{isPreview ? "Exit Preview" : "Preview"}</span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Undo / Redo */}
        <div className="hidden xl:flex items-center gap-0.5 border-r border-zinc-200 dark:border-zinc-800 pr-1.5 mr-0.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-25 disabled:cursor-not-allowed active:scale-95 transition-all duration-150"
            title="Undo (Ctrl/Cmd + Z)"
          >
            <Undo className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-25 disabled:cursor-not-allowed active:scale-95 transition-all duration-150"
            title="Redo (Ctrl/Cmd + Shift + Z)"
          >
            <Redo className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Command Palette Button */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 sm:px-2.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-95 transition-all duration-150"
          title="Command Palette (Ctrl/Cmd + K)"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px] hidden md:inline">⌘K</span>
        </button>

        {/* Preview Button on Mobile */}
        <button
          onClick={onTogglePreview}
          className={`md:hidden flex h-8 w-8 items-center justify-center rounded-lg border active:scale-95 transition-all duration-150 ${
            isPreview
              ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400"
              : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
          title="Preview Mode"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>

        {/* AI Generator Button */}
        <button
          onClick={onOpenAI}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/40 px-2 sm:px-3 text-xs font-semibold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 active:scale-95 transition-all duration-150 shadow-xs"
          title="Generate Dashboard with AI"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-500 shrink-0 animate-pulse" />
          <span className="hidden sm:inline">AI Generate</span>
        </button>

        {/* Share & Export */}
        <button
          onClick={onOpenShare}
          className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-95 transition-all duration-150"
          title="Share Dashboard"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={onOpenExport}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-95 transition-all duration-150"
          title="Export JSON"
        >
          <Download className="h-3.5 w-3.5" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-95 transition-all duration-150"
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode (Current: ${theme})`}
        >
          {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>

        {/* Save button with interactive state feedback */}
        <button
          onClick={onSaveNow}
          className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 sm:px-3 text-xs font-semibold active:scale-95 transition-all duration-150 shrink-0 shadow-2xs ${
            isSaved
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : isError
              ? "bg-rose-600 text-white hover:bg-rose-500"
              : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white"
          }`}
          title="Save to Local Storage (Ctrl/Cmd + S)"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="hidden sm:inline">Saving…</span>
            </>
          ) : isSaved ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Saved</span>
            </>
          ) : isError ? (
            <>
              <AlertCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Retry</span>
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
