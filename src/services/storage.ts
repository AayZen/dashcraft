import type { Dashboard, StorageSchemaV1, ThemeMode } from "../types";
import { DASHBOARD_TEMPLATES } from "./templates";

const STORAGE_KEY = "dashcraft:v1";

const DEFAULT_DASHBOARDS: Dashboard[] = DASHBOARD_TEMPLATES.map((template, index) => ({
  ...template,
  id: index === 0 ? "dashboard-primary" : `dashboard-${template.id.replace("template-", "")}`,
  isTemplate: false,
}));

export const storage = {
  loadState(): StorageSchemaV1 {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return this.initializeDefaultState();
      }

      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== "v1" || !Array.isArray(parsed.dashboards)) {
        return this.initializeDefaultState();
      }

      // Ensure dashboards array is non-empty
      if (parsed.dashboards.length === 0) {
        parsed.dashboards = DEFAULT_DASHBOARDS;
        parsed.activeDashboardId = DEFAULT_DASHBOARDS[0].id;
      }

      // Ensure active dashboard exists
      const activeExists = parsed.dashboards.some(
        (d: Dashboard) => d.id === parsed.activeDashboardId
      );
      if (!activeExists) {
        parsed.activeDashboardId = parsed.dashboards[0].id;
      }

      return parsed as StorageSchemaV1;
    } catch (err) {
      console.error("Failed to load DashCraft storage, initializing defaults:", err);
      return this.initializeDefaultState();
    }
  },

  initializeDefaultState(): StorageSchemaV1 {
    const initialState: StorageSchemaV1 = {
      version: "v1",
      dashboards: DEFAULT_DASHBOARDS,
      activeDashboardId: DEFAULT_DASHBOARDS[0].id,
      theme: "dark",
      recentPrompts: [
        "Create a SaaS revenue dashboard with MRR, ARR, churn rate, and top accounts.",
        "Build an e-commerce dashboard for store revenue, AOV, traffic mix, and orders.",
        "Design a DevOps cloud monitoring dashboard with API latencies, CPU load, and uptime.",
      ],
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    } catch (err) {
      console.warn("Unable to save initial state to localStorage:", err);
    }

    return initialState;
  },

  saveState(state: StorageSchemaV1): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error("Failed to save state to localStorage:", err);
    }
  },

  getDashboards(): Dashboard[] {
    return this.loadState().dashboards;
  },

  getDashboardById(id: string): Dashboard | undefined {
    const state = this.loadState();
    return state.dashboards.find((d) => d.id === id);
  },

  saveDashboard(dashboard: Dashboard): void {
    const state = this.loadState();
    const index = state.dashboards.findIndex((d) => d.id === dashboard.id);

    const updatedDashboard: Dashboard = {
      ...dashboard,
      updatedAt: new Date().toISOString(),
    };

    if (index >= 0) {
      state.dashboards[index] = updatedDashboard;
    } else {
      state.dashboards.unshift(updatedDashboard);
    }

    state.activeDashboardId = updatedDashboard.id;
    this.saveState(state);
  },

  deleteDashboard(id: string): Dashboard[] {
    const state = this.loadState();
    state.dashboards = state.dashboards.filter((d) => d.id !== id);

    if (state.dashboards.length === 0) {
      state.dashboards = [
        {
          ...DEFAULT_DASHBOARDS[0],
          id: `dashboard-${Date.now()}`,
          name: "My First Dashboard",
        },
      ];
    }

    if (state.activeDashboardId === id) {
      state.activeDashboardId = state.dashboards[0].id;
    }

    this.saveState(state);
    return state.dashboards;
  },

  duplicateDashboard(id: string): Dashboard | undefined {
    const state = this.loadState();
    const source = state.dashboards.find((d) => d.id === id);
    if (!source) return undefined;

    const newId = `dashboard-${Date.now()}`;
    const duplicate: Dashboard = {
      ...JSON.parse(JSON.stringify(source)),
      id: newId,
      name: `${source.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    state.dashboards.unshift(duplicate);
    state.activeDashboardId = newId;
    this.saveState(state);
    return duplicate;
  },

  createFromTemplate(templateId: string): Dashboard | undefined {
    const template = DASHBOARD_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return undefined;

    const newId = `dashboard-${Date.now()}`;
    const newDashboard: Dashboard = {
      ...JSON.parse(JSON.stringify(template)),
      id: newId,
      name: template.name,
      isTemplate: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generationSource: "template",
    };

    const state = this.loadState();
    state.dashboards.unshift(newDashboard);
    state.activeDashboardId = newId;
    this.saveState(state);
    return newDashboard;
  },

  createBlankDashboard(name = "Untitled Dashboard"): Dashboard {
    const newId = `dashboard-${Date.now()}`;
    const blankDashboard: Dashboard = {
      id: newId,
      name,
      description: "Custom visual dashboard created in DashCraft Studio.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generationSource: "manual",
      settings: {
        density: "comfortable",
        theme: "dark",
        accent: "cyan",
        gridColumns: 12,
        showBackgroundGrid: true,
        dateRange: "Last 30 days",
      },
      widgets: [
        {
          id: `kpi-${Date.now()}-1`,
          kind: "kpi",
          title: "Total Volume",
          subtitle: "Primary KPI metric",
          metric: "$84,250",
          change: "+12.4%",
          changeType: "increase",
          size: "sm",
          accent: "cyan",
          data: [35, 48, 55, 68, 74, 84],
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        {
          id: `line-${Date.now()}-2`,
          kind: "line",
          title: "Growth Trend",
          subtitle: "Historical performance trajectory",
          metric: "+28.4%",
          change: "+4.2%",
          changeType: "increase",
          size: "lg",
          accent: "cyan",
          data: [24, 38, 42, 59, 64, 78, 86, 92],
          labels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"],
        },
      ],
    };

    const state = this.loadState();
    state.dashboards.unshift(blankDashboard);
    state.activeDashboardId = newId;
    this.saveState(state);
    return blankDashboard;
  },

  getSavedTheme(): ThemeMode {
    try {
      const explicit = localStorage.getItem("dashcraft:theme");
      if (explicit === "light" || explicit === "dark" || explicit === "system") {
        return explicit;
      }
    } catch {
      // Storage read failed
    }
    return this.loadState().theme || "dark";
  },

  saveTheme(theme: ThemeMode): void {
    try {
      localStorage.setItem("dashcraft:theme", theme);
    } catch {
      // Storage write failed
    }
    const state = this.loadState();
    state.theme = theme;
    this.saveState(state);
  },

  addRecentPrompt(prompt: string): void {
    if (!prompt.trim()) return;
    const state = this.loadState();
    const filtered = state.recentPrompts.filter((p) => p.toLowerCase() !== prompt.toLowerCase());
    state.recentPrompts = [prompt.trim(), ...filtered].slice(0, 10);
    this.saveState(state);
  },

  getRecentPrompts(): string[] {
    return this.loadState().recentPrompts;
  },
};
