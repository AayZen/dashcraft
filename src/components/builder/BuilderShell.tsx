import React, { useState, useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import { BuilderToolbar } from "./BuilderToolbar";
import { WidgetLibrary } from "./WidgetLibrary";
import { DashboardCanvas } from "./DashboardCanvas";
import { WidgetInspector } from "./WidgetInspector";
import { AIGeneratorModal } from "./AIGeneratorModal";
import { ExportModal } from "./ExportModal";
import { ShareModal } from "./ShareModal";
import { CommandPalette } from "../common/CommandPalette";
import type { ViewMode, WidgetKind } from "../../types";
import { LayoutDashboard, PlusCircle, Sliders } from "lucide-react";

interface BuilderShellProps {
  dashboardId?: string;
}

type MobilePane = "canvas" | "library" | "inspector";

export const BuilderShell: React.FC<BuilderShellProps> = ({ dashboardId }) => {
  const {
    dashboard,
    selectedWidgetId,
    selectedWidget,
    setSelectedWidgetId,
    saveStatus,
    saveNow,
    addWidget,
    updateWidget,
    deleteWidget,
    duplicateWidget,
    reorderWidget,
    updateSettings,
    updateMeta,
    loadDashboard,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useDashboard(dashboardId);

  const { toggleTheme } = useTheme();
  const toast = useToast();

  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isPreview, setIsPreview] = useState(false);
  const [mobilePane, setMobilePane] = useState<MobilePane>("canvas");

  // Modals state
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleSelectWidget = (id: string | null) => {
    setSelectedWidgetId(id);
    // On tablet & mobile, auto-switch to Inspector view when a widget is selected
    if (id && typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobilePane("inspector");
    }
  };

  const handleAddWidget = (kind: WidgetKind) => {
    addWidget(kind);
    toast.success(`Added ${kind.toUpperCase()} widget`);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobilePane("canvas");
    }
  };

  const handleDuplicateWidget = (id: string) => {
    duplicateWidget(id);
    toast.success("Widget duplicated", undefined, {
      label: "Undo",
      onClick: () => undo(),
    });
  };

  const handleDeleteWidget = React.useCallback(
    (id: string) => {
      deleteWidget(id);
      toast.info("Widget deleted", undefined, {
        label: "Undo",
        onClick: () => undo(),
      });
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setMobilePane("canvas");
      }
    },
    [deleteWidget, toast, undo]
  );

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isModifier = isMac ? e.metaKey : e.ctrlKey;

      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Command Palette (Ctrl/Cmd + K)
      if (isModifier && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // AI Modal (Ctrl/Cmd + G)
      if (isModifier && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setIsAIModalOpen(true);
        return;
      }

      // Preview toggle (Ctrl/Cmd + P)
      if (isModifier && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsPreview((prev) => !prev);
        return;
      }

      // Save (Ctrl/Cmd + S)
      if (isModifier && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveNow();
        toast.success("Dashboard saved to local storage");
        return;
      }

      // Undo / Redo
      if (isModifier && !e.shiftKey && e.key.toLowerCase() === "z") {
        if (!isInput) {
          e.preventDefault();
          undo();
        }
        return;
      }
      if (
        isModifier &&
        ((e.shiftKey && e.key.toLowerCase() === "z") || e.key.toLowerCase() === "y")
      ) {
        if (!isInput) {
          e.preventDefault();
          redo();
        }
        return;
      }

      // Delete selected widget
      if ((e.key === "Delete" || e.key === "Backspace") && selectedWidgetId && !isInput) {
        e.preventDefault();
        handleDeleteWidget(selectedWidgetId);
        return;
      }

      // Escape key to deselect or close
      if (e.key === "Escape") {
        setSelectedWidgetId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedWidgetId, saveNow, undo, redo, handleDeleteWidget, setSelectedWidgetId, toast]);

  const handleApplyAI = (
    generated: { title: string; description: string; widgets: typeof dashboard.widgets },
    source: "ai_generated" | "synthesized_demo"
  ) => {
    loadDashboard({
      ...dashboard,
      name: generated.title,
      description: generated.description,
      widgets: generated.widgets,
      generationSource: source,
      updatedAt: new Date().toISOString(),
    });
    if (source === "ai_generated") {
      toast.success("AI Dashboard generated successfully");
    } else {
      toast.info("Demo dashboard generated using Studio Synthesizer");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Top Toolbar */}
      <BuilderToolbar
        dashboardName={dashboard.name || "Untitled Dashboard"}
        onUpdateName={(name) => updateMeta(name)}
        saveStatus={saveStatus}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        isPreview={isPreview}
        onTogglePreview={() => setIsPreview(!isPreview)}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onOpenAI={() => setIsAIModalOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onSaveNow={() => {
          saveNow();
          toast.success("Dashboard saved to local storage");
        }}
      />

      {/* Workspace Area: 3-zone desktop layout | seamless responsive tabs on tablet & mobile */}
      <div className="flex flex-1 overflow-hidden relative min-w-0">
        {/* Left: Widget Library */}
        {!isPreview && (
          <div
            className={`shrink-0 z-20 transition-all duration-150 motion-reduce:transition-none ${
              mobilePane === "library"
                ? "flex flex-1 w-full h-full justify-center overflow-y-auto bg-white dark:bg-zinc-950 animate-fade-in motion-reduce:animate-none"
                : "hidden lg:flex h-full"
            }`}
          >
            <WidgetLibrary
              onAddWidget={handleAddWidget}
              onOpenAI={() => setIsAIModalOpen(true)}
              onBackToCanvas={() => setMobilePane("canvas")}
            />
          </div>
        )}

        {/* Center: Canvas */}
        <div
          className={`flex-1 flex overflow-hidden min-w-0 transition-all duration-150 motion-reduce:transition-none ${
            mobilePane !== "canvas" && !isPreview ? "hidden lg:flex" : "flex h-full"
          }`}
        >
          <DashboardCanvas
            dashboard={dashboard}
            selectedWidgetId={selectedWidgetId}
            onSelectWidget={handleSelectWidget}
            onDuplicateWidget={handleDuplicateWidget}
            onDeleteWidget={handleDeleteWidget}
            onMoveUpWidget={(id) => reorderWidget(id, "up")}
            onMoveDownWidget={(id) => reorderWidget(id, "down")}
            onAddWidget={handleAddWidget}
            onOpenAI={() => setIsAIModalOpen(true)}
            viewMode={viewMode}
            isPreview={isPreview}
          />
        </div>

        {/* Right: Inspector */}
        {!isPreview && (
          <div
            className={`shrink-0 z-20 transition-all duration-150 motion-reduce:transition-none ${
              mobilePane === "inspector"
                ? "flex flex-1 w-full h-full justify-center overflow-y-auto bg-white dark:bg-zinc-950 animate-fade-in motion-reduce:animate-none"
                : "hidden lg:flex h-full"
            }`}
          >
            <WidgetInspector
              widget={selectedWidget}
              dashboardSettings={dashboard.settings}
              onUpdateWidget={updateWidget}
              onDeleteWidget={handleDeleteWidget}
              onDuplicateWidget={handleDuplicateWidget}
              onMoveUpWidget={(id) => reorderWidget(id, "up")}
              onMoveDownWidget={(id) => reorderWidget(id, "down")}
              onUpdateDashboardSettings={updateSettings}
              onBackToCanvas={() => setMobilePane("canvas")}
              onOpenLibrary={() => setMobilePane("library")}
            />
          </div>
        )}
      </div>

      {/* Mobile/Tablet Bottom Navigation Bar */}
      {!isPreview && (
        <nav
          aria-label="Workspace Navigation"
          className="lg:hidden flex h-14 w-full items-center justify-around border-t bg-white/95 dark:bg-zinc-950/95 border-zinc-200 dark:border-zinc-800 z-30 px-3 backdrop-blur-sm shadow-md shrink-0"
        >
          <button
            onClick={() => setMobilePane("canvas")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1.5 text-xs font-medium rounded-lg active:scale-95 transition-all duration-150 motion-reduce:transition-none ${
              mobilePane === "canvas"
                ? "text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-50/60 dark:bg-cyan-950/40"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Canvas</span>
          </button>

          <button
            onClick={() => setMobilePane("library")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1.5 text-xs font-medium rounded-lg active:scale-95 transition-all duration-150 motion-reduce:transition-none ${
              mobilePane === "library"
                ? "text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-50/60 dark:bg-cyan-950/40"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Widgets</span>
          </button>

          <button
            onClick={() => setMobilePane("inspector")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1.5 text-xs font-medium rounded-lg active:scale-95 transition-all duration-150 motion-reduce:transition-none ${
              mobilePane === "inspector"
                ? "text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-50/60 dark:bg-cyan-950/40"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <div className="relative">
              <Sliders className="h-4 w-4" />
              {selectedWidget && (
                <span
                  className="absolute -top-1 -right-1.5 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white dark:ring-zinc-950 animate-pulse motion-reduce:animate-none"
                  title="Widget selected"
                />
              )}
            </div>
            <span>Inspector</span>
          </button>
        </nav>
      )}

      {/* Modals & Command Palette */}
      <AIGeneratorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApplyGeneratedDashboard={handleApplyAI}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        dashboard={dashboard}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        dashboard={dashboard}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onAddWidget={(kind) => {
          handleAddWidget(kind);
        }}
        onOpenAI={() => setIsAIModalOpen(true)}
        onTogglePreview={() => setIsPreview(!isPreview)}
        onToggleTheme={toggleTheme}
        onExport={() => setIsExportModalOpen(true)}
      />
    </div>
  );
};
