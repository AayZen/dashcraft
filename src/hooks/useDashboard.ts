import { useState, useEffect, useCallback, useRef } from "react";
import type { Dashboard, Widget, WidgetKind, WidgetSize, AccentColor, DashboardSettings } from "../types";
import { storage } from "../services/storage";
import { useUndoRedo } from "./useUndoRedo";
import { WIDGET_LIBRARY } from "../constants/theme";

export type SaveStatus = "Saved" | "Saving..." | "Unsaved changes" | "AI Generated" | "Save Failed";

export function useDashboard(initialDashboardId?: string) {
  const [initialDashboard] = useState<Dashboard>(() => {
    return (
      (initialDashboardId && storage.getDashboardById(initialDashboardId)) ||
      storage.getDashboards()[0] ||
      storage.createBlankDashboard()
    );
  });

  const {
    state: dashboard,
    set: setDashboard,
    undo,
    redo,
    reset: resetDashboard,
    canUndo,
    canRedo,
  } = useUndoRedo<Dashboard>(initialDashboard);

  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(
    dashboard.widgets[0]?.id || null
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("Saved");
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  // Debounced autosave
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    const saveTimer = setTimeout(() => {
      setSaveStatus("Saving...");
      storage.saveDashboard(dashboard);
      setSaveStatus("Saved");
    }, 600);

    saveTimeoutRef.current = saveTimer;

    return () => {
      clearTimeout(saveTimer);
    };
  }, [dashboard]);

  // Selected widget reference
  const selectedWidget = dashboard.widgets.find((w) => w.id === selectedWidgetId) || null;

  // Add Widget
  const addWidget = useCallback(
    (kind: WidgetKind, overrides: Partial<Widget> = {}) => {
      const libraryItem = WIDGET_LIBRARY.find((w) => w.kind === kind);
      const nextSequence = dashboard.widgets.length + 1;
      const accents: AccentColor[] = ["cyan", "blue", "emerald", "violet", "amber", "rose", "indigo"];
      const accent = accents[dashboard.widgets.length % accents.length];

      const newId = `${kind}-${Date.now()}-${nextSequence}`;
      const defaultSize: WidgetSize =
        overrides.size ||
        libraryItem?.defaultSize ||
        (kind === "kpi" || kind === "progress" || kind === "gauge" ? "sm" : "md");

      const newWidget: Widget = {
        id: newId,
        kind,
        title: overrides.title || libraryItem?.name || `New ${kind}`,
        subtitle: overrides.subtitle || "Overview metric",
        metric: overrides.metric || (kind === "table" ? "12 Deals" : "$34.8K"),
        change: overrides.change || "+8.4%",
        changePeriod: overrides.changePeriod || "vs last month",
        changeType: overrides.changeType || "increase",
        size: defaultSize,
        accent: overrides.accent || accent,
        data: overrides.data || [32, 45, 58, 68, 74, 88],
        labels: overrides.labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        config: overrides.config || {},
        ...overrides,
      };

      setSaveStatus("Unsaved changes");
      setDashboard((curr) => ({
        ...curr,
        widgets: [...curr.widgets, newWidget],
        updatedAt: new Date().toISOString(),
      }));

      setSelectedWidgetId(newId);
    },
    [dashboard.widgets.length, setDashboard]
  );

  // Update Widget
  const updateWidget = useCallback(
    (id: string, updates: Partial<Widget>) => {
      setSaveStatus("Unsaved changes");
      setDashboard((curr) => ({
        ...curr,
        widgets: curr.widgets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
        updatedAt: new Date().toISOString(),
      }));
    },
    [setDashboard]
  );

  // Delete Widget
  const deleteWidget = useCallback(
    (id: string) => {
      setSaveStatus("Unsaved changes");
      setDashboard((curr) => {
        const remaining = curr.widgets.filter((w) => w.id !== id);
        return {
          ...curr,
          widgets: remaining,
          updatedAt: new Date().toISOString(),
        };
      });

      if (selectedWidgetId === id) {
        const remaining = dashboard.widgets.filter((w) => w.id !== id);
        setSelectedWidgetId(remaining[0]?.id || null);
      }
    },
    [dashboard.widgets, selectedWidgetId, setDashboard]
  );

  // Duplicate Widget
  const duplicateWidget = useCallback(
    (id: string) => {
      const source = dashboard.widgets.find((w) => w.id === id);
      if (!source) return;

      const newId = `${source.kind}-${Date.now()}`;
      const duplicate: Widget = {
        ...JSON.parse(JSON.stringify(source)),
        id: newId,
        title: `${source.title} (Copy)`,
      };

      const sourceIndex = dashboard.widgets.findIndex((w) => w.id === id);

      setSaveStatus("Unsaved changes");
      setDashboard((curr) => {
        const nextWidgets = [...curr.widgets];
        nextWidgets.splice(sourceIndex + 1, 0, duplicate);
        return {
          ...curr,
          widgets: nextWidgets,
          updatedAt: new Date().toISOString(),
        };
      });

      setSelectedWidgetId(newId);
    },
    [dashboard.widgets, setDashboard]
  );

  // Reorder widget up/down
  const reorderWidget = useCallback(
    (id: string, direction: "up" | "down") => {
      const currentIndex = dashboard.widgets.findIndex((w) => w.id === id);
      if (currentIndex < 0) return;

      const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex >= dashboard.widgets.length) return;

      setSaveStatus("Unsaved changes");
      setDashboard((curr) => {
        const nextWidgets = [...curr.widgets];
        const [moved] = nextWidgets.splice(currentIndex, 1);
        nextWidgets.splice(targetIndex, 0, moved);
        return {
          ...curr,
          widgets: nextWidgets,
          updatedAt: new Date().toISOString(),
        };
      });
    },
    [dashboard.widgets, setDashboard]
  );

  // Move widget by indexes
  const moveWidget = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= dashboard.widgets.length ||
        toIndex >= dashboard.widgets.length
      ) {
        return;
      }

      setSaveStatus("Unsaved changes");
      setDashboard((curr) => {
        const nextWidgets = [...curr.widgets];
        const [moved] = nextWidgets.splice(fromIndex, 1);
        nextWidgets.splice(toIndex, 0, moved);
        return {
          ...curr,
          widgets: nextWidgets,
          updatedAt: new Date().toISOString(),
        };
      });
    },
    [dashboard.widgets.length, setDashboard]
  );

  // Update Settings
  const updateSettings = useCallback(
    (settingsUpdates: Partial<DashboardSettings>) => {
      setSaveStatus("Unsaved changes");
      setDashboard((curr) => ({
        ...curr,
        settings: { ...curr.settings, ...settingsUpdates },
        updatedAt: new Date().toISOString(),
      }));
    },
    [setDashboard]
  );

  // Update Dashboard Meta
  const updateMeta = useCallback(
    (name: string, description?: string) => {
      setSaveStatus("Unsaved changes");
      setDashboard((curr) => ({
        ...curr,
        name,
        description: description !== undefined ? description : curr.description,
        updatedAt: new Date().toISOString(),
      }));
    },
    [setDashboard]
  );

  // Load a new dashboard
  const loadDashboard = useCallback(
    (newDashboard: Dashboard) => {
      resetDashboard(newDashboard);
      setSelectedWidgetId(newDashboard.widgets[0]?.id || null);
      setSaveStatus("Saved");
    },
    [resetDashboard]
  );

  // Manual immediate save
  const saveNow = useCallback(() => {
    storage.saveDashboard(dashboard);
    setSaveStatus("Saved");
  }, [dashboard]);

  return {
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
    moveWidget,
    updateSettings,
    updateMeta,
    loadDashboard,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
