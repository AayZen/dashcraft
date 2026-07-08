import { useMemo, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
    Eye,
    Grid3X3,
    LayoutDashboard,
    LineChart,
    Loader2,
    Monitor,
    PanelRight,
    PieChart,
    Plus,
    Save,
    Search,
    Sparkles,
  Table2,
  Trash2,
  Wand2,
  X,
} from "lucide-react";

type WidgetKind = "kpi" | "line" | "bar" | "donut" | "table";
type WidgetSize = "sm" | "md" | "lg";
type Theme = "aurora" | "ember" | "forest";
type ViewMode = "desktop" | "tablet";
type Density = "compact" | "comfortable";

type Widget = {
    id: string;
    kind: WidgetKind;
    title: string;
    metric: string;
    change: string;
    size: WidgetSize;
    accent: string;
    data: number[];
};

type DashboardLayout = {
    title: string;
    widgets: Widget[];
};

const initialWidgets: Widget[] = [
    {
        id: "revenue",
        kind: "kpi",
        title: "Revenue",
        metric: "$128.4K",
        change: "+18.2%",
        size: "sm",
        accent: "cyan",
        data: [28, 42, 48, 64, 72, 86],
    },
    {
        id: "pipeline",
        kind: "kpi",
        title: "Pipeline",
        metric: "$482K",
        change: "+9.7%",
        size: "sm",
        accent: "emerald",
        data: [36, 44, 39, 58, 62, 78],
    },
    {
        id: "growth",
        kind: "line",
        title: "Monthly Growth",
        metric: "42.8%",
        change: "+6.3%",
        size: "lg",
        accent: "violet",
        data: [18, 31, 26, 52, 48, 71, 88, 81],
    },
    {
        id: "channels",
        kind: "bar",
        title: "Channel Revenue",
        metric: "$76.2K",
        change: "+12.4%",
        size: "md",
        accent: "amber",
        data: [34, 68, 46, 78, 55, 91],
    },
    {
        id: "conversion",
        kind: "donut",
        title: "Conversion Mix",
        metric: "64%",
        change: "+4.1%",
        size: "md",
        accent: "rose",
        data: [64, 22, 14],
    },
    {
        id: "accounts",
        kind: "table",
        title: "Top Accounts",
        metric: "18 deals",
        change: "+5 new",
        size: "lg",
        accent: "sky",
        data: [92, 86, 79, 73],
    },
];

const promptPresets = [
    "Create a SaaS revenue dashboard with MRR, churn, pipeline, and conversion widgets.",
    "Build an ecommerce dashboard for orders, revenue, traffic sources, and product performance.",
    "Design an operations dashboard with uptime, incidents, response times, and team workload.",
];

const themeStyles: Record<
    Theme,
    {
        label: string;
        canvas: string;
        glow: string;
        active: string;
    }
> = {
    aurora: {
        label: "Aurora",
        canvas: "bg-slate-950",
        glow: "bg-cyan-500/20",
        active: "border-cyan-400 bg-cyan-500/10 text-cyan-100",
    },
    ember: {
        label: "Ember",
        canvas: "bg-zinc-950",
        glow: "bg-amber-500/20",
        active: "border-amber-400 bg-amber-500/10 text-amber-100",
    },
    forest: {
        label: "Forest",
        canvas: "bg-emerald-950",
        glow: "bg-emerald-400/20",
        active: "border-emerald-300 bg-emerald-500/10 text-emerald-100",
    },
};

const accentStyles: Record<
    string,
    { text: string; bg: string; border: string; fill: string }
> = {
    amber: {
        text: "text-amber-300",
        bg: "bg-amber-400/15",
        border: "border-amber-400/30",
        fill: "bg-amber-400",
    },
    cyan: {
        text: "text-cyan-300",
        bg: "bg-cyan-400/15",
        border: "border-cyan-400/30",
        fill: "bg-cyan-400",
    },
    emerald: {
        text: "text-emerald-300",
        bg: "bg-emerald-400/15",
        border: "border-emerald-400/30",
        fill: "bg-emerald-400",
    },
    rose: {
        text: "text-rose-300",
        bg: "bg-rose-400/15",
        border: "border-rose-400/30",
        fill: "bg-rose-400",
    },
    sky: {
        text: "text-sky-300",
        bg: "bg-sky-400/15",
        border: "border-sky-400/30",
        fill: "bg-sky-400",
    },
    violet: {
        text: "text-violet-300",
        bg: "bg-violet-400/15",
        border: "border-violet-400/30",
        fill: "bg-violet-400",
    },
};

const widgetLibrary: Array<{
    kind: WidgetKind;
    label: string;
    icon: typeof BarChart3;
}> = [
        { kind: "kpi", label: "Metric", icon: LayoutDashboard },
        { kind: "line", label: "Trend", icon: LineChart },
        { kind: "bar", label: "Bars", icon: BarChart3 },
        { kind: "donut", label: "Mix", icon: PieChart },
        { kind: "table", label: "Table", icon: Table2 },
    ];

const sizeClasses: Record<WidgetSize, string> = {
    sm: "lg:col-span-1",
    md: "lg:col-span-2",
    lg: "lg:col-span-3",
};

const widgetKinds: WidgetKind[] = ["kpi", "line", "bar", "donut", "table"];
const widgetSizes: WidgetSize[] = ["sm", "md", "lg"];

const normalizeWidget = (widget: Partial<Widget>, index: number): Widget => {
    const kind = widgetKinds.includes(widget.kind as WidgetKind)
        ? (widget.kind as WidgetKind)
        : "kpi";
    const size = widgetSizes.includes(widget.size as WidgetSize)
        ? (widget.size as WidgetSize)
        : kind === "kpi"
          ? "sm"
          : "md";
    const accent = widget.accent && accentStyles[widget.accent] ? widget.accent : "cyan";
    const data = Array.isArray(widget.data)
        ? widget.data
              .map((value) => Number(value))
              .filter(Number.isFinite)
              .slice(0, 10)
              .map((value) => Math.max(0, Math.min(100, Math.round(value))))
        : [];

    return {
        id: widget.id || `ai-${index}-${kind}`,
        kind,
        title: String(widget.title || "Untitled Widget").slice(0, 48),
        metric: String(widget.metric || "0").slice(0, 24),
        change: String(widget.change || "+0%").slice(0, 24),
        size,
        accent,
        data: data.length >= 3 ? data : [24, 48, 72],
    };
};

const Builder = () => {
    const [prompt, setPrompt] = useState(promptPresets[0]);
    const [widgets, setWidgets] = useState(initialWidgets);
    const [activeWidgetId, setActiveWidgetId] = useState(initialWidgets[2].id);
    const [theme, setTheme] = useState<Theme>("aurora");
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [density, setDensity] = useState<Density>("comfortable");
  const [dashboardTitle, setDashboardTitle] = useState("Revenue Command Center");
  const [widgetSequence, setWidgetSequence] = useState(1);
  const [saveStatus, setSaveStatus] = useState("Unsaved changes");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

    const activeWidget = useMemo(
        () => widgets.find((widget) => widget.id === activeWidgetId) ?? widgets[0],
        [activeWidgetId, widgets],
    );

    const generateDashboard = async () => {
        setIsGenerating(true);
        setGenerationError("");
        setSaveStatus("Generating with AI...");

        try {
            const response = await fetch("/api/generate-dashboard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });
            const payload = (await response.json()) as Partial<DashboardLayout> & {
                error?: string;
            };

            if (!response.ok) {
                throw new Error(payload.error || "AI generation failed.");
            }

            if (!payload.title || !Array.isArray(payload.widgets)) {
                throw new Error("AI returned an invalid dashboard layout.");
            }

            const nextWidgets = payload.widgets.map((widget, index) =>
                normalizeWidget(widget, index),
            );

            if (nextWidgets.length === 0) {
                throw new Error("AI did not return any widgets.");
            }

            setDashboardTitle(payload.title);
            setWidgets(nextWidgets);
            setActiveWidgetId(nextWidgets[0].id);
            setWidgetSequence((currentSequence) => currentSequence + nextWidgets.length);
            setSaveStatus("AI generated");
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "DashCraft could not reach the AI generator.";
            setGenerationError(message);
            setSaveStatus("AI unavailable");
        } finally {
            setIsGenerating(false);
        }
    };

    const addWidget = (kind: WidgetKind) => {
        const nextId = `${kind}-${widgetSequence}`;
        const accents = ["cyan", "emerald", "violet", "amber", "rose", "sky"];
        const nextWidget: Widget = {
            id: nextId,
            kind,
            title: `New ${kind === "kpi" ? "Metric" : "Widget"}`,
            metric: kind === "table" ? "12 rows" : "24.8K",
            change: "+3.2%",
            size: kind === "kpi" ? "sm" : "md",
            accent: accents[widgets.length % accents.length],
            data: [24, 48, 36, 72, 64, 90],
        };

    setWidgets((currentWidgets) => [...currentWidgets, nextWidget]);
    setActiveWidgetId(nextId);
    setWidgetSequence((currentSequence) => currentSequence + 1);
    setSaveStatus("Unsaved changes");
  };

  const updateActiveWidget = (updates: Partial<Widget>) => {
    setWidgets((currentWidgets) =>
      currentWidgets.map((widget) =>
        widget.id === activeWidgetId ? { ...widget, ...updates } : widget,
      ),
    );
    setSaveStatus("Unsaved changes");
  };

    const moveActiveWidget = (direction: "up" | "down") => {
        const activeIndex = widgets.findIndex((widget) => widget.id === activeWidgetId);
        const nextIndex = direction === "up" ? activeIndex - 1 : activeIndex + 1;

        if (activeIndex < 0 || nextIndex < 0 || nextIndex >= widgets.length) {
            return;
        }

    setWidgets((currentWidgets) => {
      const nextWidgets = [...currentWidgets];
      const [movedWidget] = nextWidgets.splice(activeIndex, 1);
      nextWidgets.splice(nextIndex, 0, movedWidget);
      return nextWidgets;
    });
    setSaveStatus("Unsaved changes");
  };

    const removeActiveWidget = () => {
        if (widgets.length === 1) {
            return;
        }

    const remainingWidgets = widgets.filter((widget) => widget.id !== activeWidgetId);
    setWidgets(remainingWidgets);
    setActiveWidgetId(remainingWidgets[0].id);
    setSaveStatus("Unsaved changes");
  };

  const saveDashboard = () => {
    const payload = {
      dashboardTitle,
      density,
      theme,
      viewMode,
      widgets,
    };

    localStorage.setItem("dashcraft-builder", JSON.stringify(payload));
    setSaveStatus("Saved locally");
  };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <header className="border-b border-slate-800 bg-slate-950/95">
                <div className="flex min-h-16 flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
                            <Grid3X3 className="h-5 w-5 text-cyan-300" />
                        </div>
            <div>
              <p className="text-sm text-slate-400">DashCraft Builder</p>
              <h1 className="text-xl font-semibold text-white">{dashboardTitle}</h1>
              <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="h-3 w-3 text-cyan-300" />
                {saveStatus}
              </p>
            </div>
          </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-1">
                            {(["desktop", "tablet"] as ViewMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    className={`flex h-9 items-center gap-2 rounded-lg px-3 text-sm transition ${viewMode === mode
                                            ? "bg-slate-700 text-white"
                                            : "text-slate-400 hover:text-white"
                  }`}
                  title={`Switch to ${mode} preview`}
                  type="button"
                  onClick={() => {
                    setViewMode(mode);
                    setSaveStatus("Unsaved changes");
                  }}
                >
                                    <Monitor className="h-4 w-4" />
                                    <span className="capitalize">{mode}</span>
                                </button>
                            ))}
                        </div>

            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
              title="Preview dashboard"
              type="button"
              onClick={() => setPreviewOpen(true)}
            >
              <Eye className="h-4 w-4" />
              Preview
                        </button>

                        <button
              className="flex h-10 items-center gap-2 rounded-lg bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              title="Save dashboard"
              type="button"
              onClick={saveDashboard}
            >
              <Save className="h-4 w-4" />
              Save
                        </button>
                    </div>
                </div>
            </header>

            <main className="grid min-h-[calc(100vh-65px)] grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)_300px]">
                <aside className="border-b border-slate-800 bg-slate-950 p-4 xl:border-b-0 xl:border-r">
                    <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                                Prompt
                            </h2>
                            <Sparkles className="h-4 w-4 text-cyan-300" />
                        </div>

                        <textarea
                            className="mt-4 min-h-32 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                            value={prompt}
                            onChange={(event) => {
                                setPrompt(event.target.value);
                                setGenerationError("");
                            }}
                        />

                        <button
                            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                            title="Generate dashboard from prompt"
                            type="button"
                            disabled={isGenerating}
                            onClick={generateDashboard}
                        >
                            {isGenerating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Wand2 className="h-4 w-4" />
                            )}
                            {isGenerating ? "Generating..." : "Generate"}
                        </button>

                        {generationError ? (
                            <p className="mt-3 flex gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-xs leading-5 text-amber-100">
                                <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                                {generationError}
                            </p>
                        ) : null}

                        <div className="mt-4 space-y-2">
                            {promptPresets.map((preset) => (
                                <button
                                    key={preset}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-left text-xs leading-5 text-slate-400 transition hover:border-slate-700 hover:text-slate-200"
                                    title="Use prompt preset"
                                    type="button"
                                    onClick={() => setPrompt(preset)}
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="mt-4 rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                                Widgets
                            </h2>
                            <Search className="h-4 w-4 text-slate-500" />
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {widgetLibrary.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        key={item.kind}
                                        className="flex min-h-20 flex-col items-start justify-between rounded-lg border border-slate-800 bg-slate-950 p-3 text-left transition hover:border-cyan-400/50 hover:bg-slate-900"
                                        title={`Add ${item.label} widget`}
                                        type="button"
                                        onClick={() => addWidget(item.kind)}
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <Icon className="h-5 w-5 text-cyan-300" />
                                            <Plus className="h-4 w-4 text-slate-500" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-200">
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </aside>

                <section className="relative overflow-hidden bg-slate-900/70 p-4 lg:p-6">
                    <div
                        className={`absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full blur-[120px] ${themeStyles[theme].glow}`}
                    />

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm text-slate-400">Canvas</p>
                                <h2 className="text-2xl font-semibold text-white">{dashboardTitle}</h2>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {(["compact", "comfortable"] as Density[]).map((item) => (
                                    <button
                                        key={item}
                                        className={`h-9 rounded-lg border px-3 text-sm capitalize transition ${density === item
                                                ? "border-cyan-400 bg-cyan-400/10 text-cyan-100"
                                                : "border-slate-700 text-slate-400 hover:text-white"
                    }`}
                    title={`Use ${item} layout density`}
                    type="button"
                    onClick={() => {
                      setDensity(item);
                      setSaveStatus("Unsaved changes");
                    }}
                  >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`mx-auto w-full flex-1 rounded-lg border border-slate-800 p-3 shadow-2xl transition-all ${themeStyles[theme].canvas
                                } ${viewMode === "tablet" ? "max-w-3xl" : "max-w-6xl"}`}
                        >
                            <div className="rounded-lg border border-slate-800 bg-slate-950/70">
                                <div className="flex flex-col gap-3 border-b border-slate-800 px-4 py-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {dashboardTitle}
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            {widgets.length} widgets active
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-rose-400" />
                                        <span className="h-3 w-3 rounded-full bg-amber-300" />
                                        <span className="h-3 w-3 rounded-full bg-emerald-400" />
                                    </div>
                                </div>

                                <div
                                    className={`grid grid-cols-1 ${viewMode === "desktop" ? "lg:grid-cols-3" : "md:grid-cols-2"
                                        } ${density === "compact" ? "gap-3 p-3" : "gap-4 p-4"}`}
                                >
                                    {widgets.map((widget) => (
                                        <WidgetCard
                                            key={widget.id}
                                            active={widget.id === activeWidgetId}
                                            widget={widget}
                                            onSelect={setActiveWidgetId}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="border-t border-slate-800 bg-slate-950 p-4 xl:border-l xl:border-t-0">
                    <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                                Inspector
                            </h2>
                            <PanelRight className="h-4 w-4 text-slate-500" />
                        </div>

                        <label className="mt-4 block text-sm text-slate-400" htmlFor="title">
                            Dashboard title
                        </label>
                        <input
              id="title"
              className="mt-2 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-cyan-400"
              value={dashboardTitle}
              onChange={(event) => {
                setDashboardTitle(event.target.value);
                setSaveStatus("Unsaved changes");
              }}
            />

                        <div className="mt-5">
                            <p className="text-sm text-slate-400">Theme</p>
                            <div className="mt-2 grid grid-cols-3 gap-2">
                                {(["aurora", "ember", "forest"] as Theme[]).map((item) => (
                                    <button
                                        key={item}
                                        className={`rounded-lg border px-3 py-2 text-sm transition ${theme === item
                                                ? themeStyles[item].active
                                                : "border-slate-700 text-slate-400 hover:text-white"
                                            }`}
                    title={`Apply ${themeStyles[item].label} theme`}
                    type="button"
                    onClick={() => {
                      setTheme(item);
                      setSaveStatus("Unsaved changes");
                    }}
                  >
                    {themeStyles[item].label}
                  </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {activeWidget ? (
                        <section className="mt-4 rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                                    Selected
                                </h2>
                                <span className="rounded-lg border border-slate-700 px-2 py-1 text-xs uppercase text-slate-400">
                                    {activeWidget.kind}
                                </span>
                            </div>

                            <label
                                className="mt-4 block text-sm text-slate-400"
                                htmlFor="widget-title"
                            >
                                Widget title
                            </label>
                            <input
                                id="widget-title"
                                className="mt-2 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-cyan-400"
                                value={activeWidget.title}
                                onChange={(event) =>
                                    updateActiveWidget({ title: event.target.value })
                                }
                            />

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <label className="block text-sm text-slate-400" htmlFor="metric">
                                    Metric
                                    <input
                                        id="metric"
                                        className="mt-2 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-cyan-400"
                                        value={activeWidget.metric}
                                        onChange={(event) =>
                                            updateActiveWidget({ metric: event.target.value })
                                        }
                                    />
                                </label>

                                <label className="block text-sm text-slate-400" htmlFor="change">
                                    Change
                                    <input
                                        id="change"
                                        className="mt-2 h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-cyan-400"
                                        value={activeWidget.change}
                                        onChange={(event) =>
                                            updateActiveWidget({ change: event.target.value })
                                        }
                                    />
                                </label>
                            </div>

                            <div className="mt-5">
                                <p className="text-sm text-slate-400">Size</p>
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    {(["sm", "md", "lg"] as WidgetSize[]).map((size) => (
                                        <button
                                            key={size}
                                            className={`h-9 rounded-lg border text-sm uppercase transition ${activeWidget.size === size
                                                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-100"
                                                    : "border-slate-700 text-slate-400 hover:text-white"
                                                }`}
                                            title={`Set widget size to ${size}`}
                                            type="button"
                                            onClick={() => updateActiveWidget({ size })}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-3 gap-2">
                                <button
                                    className="flex h-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:bg-slate-800"
                                    title="Move widget up"
                                    type="button"
                                    onClick={() => moveActiveWidget("up")}
                                >
                                    <ChevronUp className="h-4 w-4" />
                                </button>
                                <button
                                    className="flex h-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:bg-slate-800"
                                    title="Move widget down"
                                    type="button"
                                    onClick={() => moveActiveWidget("down")}
                                >
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                <button
                                    className="flex h-10 items-center justify-center rounded-lg border border-rose-500/40 text-rose-300 transition hover:bg-rose-500/10"
                                    title="Remove widget"
                                    type="button"
                                    onClick={removeActiveWidget}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </section>
          ) : null}
        </aside>
      </main>

      {previewOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4 backdrop-blur">
          <section className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg border border-slate-700 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div>
                <p className="text-sm text-slate-400">Preview</p>
                <h2 className="text-lg font-semibold text-white">{dashboardTitle}</h2>
              </div>
              <button
                className="grid h-10 w-10 place-items-center rounded-lg border border-slate-700 text-slate-300 transition hover:bg-slate-800"
                title="Close preview"
                type="button"
                onClick={() => setPreviewOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className={`max-h-[calc(90vh-73px)] overflow-auto p-4 ${themeStyles[theme].canvas}`}>
              <div className="mx-auto max-w-6xl rounded-lg border border-slate-800 bg-slate-950/70">
                <div className="border-b border-slate-800 px-4 py-4">
                  <h3 className="text-xl font-semibold text-white">{dashboardTitle}</h3>
                  <p className="text-sm text-slate-400">
                    Presentation preview with {widgets.length} widgets
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 lg:grid-cols-3 ${
                    density === "compact" ? "gap-3 p-3" : "gap-4 p-4"
                  }`}
                >
                  {widgets.map((widget) => (
                    <WidgetCard
                      key={`preview-${widget.id}`}
                      active={false}
                      widget={widget}
                      onSelect={() => undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
};

type WidgetCardProps = {
    active: boolean;
    widget: Widget;
    onSelect: (id: string) => void;
};

const WidgetCard = ({ active, widget, onSelect }: WidgetCardProps) => {
    const accent = accentStyles[widget.accent] ?? accentStyles.cyan;

    return (
        <button
            className={`min-h-40 rounded-lg border bg-slate-900/90 p-4 text-left transition hover:-translate-y-1 hover:border-cyan-400/50 ${sizeClasses[widget.size]
                } ${active ? "border-cyan-400 shadow-2xl shadow-cyan-500/10" : "border-slate-800"
                }`}
            title={`Select ${widget.title}`}
            type="button"
            onClick={() => onSelect(widget.id)}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm text-slate-400">{widget.title}</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{widget.metric}</p>
                </div>
                <span
                    className={`rounded-lg border px-2 py-1 text-xs font-medium ${accent.border} ${accent.bg} ${accent.text}`}
                >
                    {widget.change}
                </span>
            </div>

            <div className="mt-5">
                {widget.kind === "kpi" ? <Sparkline widget={widget} /> : null}
                {widget.kind === "line" ? <LinePreview widget={widget} /> : null}
                {widget.kind === "bar" ? <BarPreview widget={widget} /> : null}
                {widget.kind === "donut" ? <DonutPreview widget={widget} /> : null}
                {widget.kind === "table" ? <TablePreview widget={widget} /> : null}
            </div>
        </button>
    );
};

const Sparkline = ({ widget }: { widget: Widget }) => {
    const accent = accentStyles[widget.accent] ?? accentStyles.cyan;

    return (
        <div className="flex h-16 items-end gap-2">
            {widget.data.map((value, index) => (
                <span
                    key={`${widget.id}-spark-${index}`}
                    className={`flex-1 rounded ${accent.fill}`}
                    style={{ height: `${Math.max(18, value)}%` }}
                />
            ))}
        </div>
    );
};

const LinePreview = ({ widget }: { widget: Widget }) => {
    const accent = accentStyles[widget.accent] ?? accentStyles.cyan;

    return (
        <div className="h-40 rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="flex h-full items-end gap-2">
                {widget.data.map((value, index) => (
                    <span
                        key={`${widget.id}-line-${index}`}
                        className={`flex-1 rounded-t ${accent.fill}`}
                        style={{ height: `${Math.max(12, value)}%`, opacity: 0.35 + index / 12 }}
                    />
                ))}
            </div>
        </div>
    );
};

const BarPreview = ({ widget }: { widget: Widget }) => {
    const accent = accentStyles[widget.accent] ?? accentStyles.cyan;

    return (
        <div className="space-y-3">
            {widget.data.slice(0, 5).map((value, index) => (
                <div key={`${widget.id}-bar-${index}`} className="flex items-center gap-3">
                    <span className="w-8 text-xs text-slate-500">Q{index + 1}</span>
                    <span className="h-3 flex-1 overflow-hidden rounded bg-slate-800">
                        <span
                            className={`block h-full rounded ${accent.fill}`}
                            style={{ width: `${Math.max(12, value)}%` }}
                        />
                    </span>
                </div>
            ))}
        </div>
    );
};

const DonutPreview = ({ widget }: { widget: Widget }) => {
    const firstValue = widget.data[0] ?? 64;

    return (
        <div className="flex items-center justify-center">
            <div
                className="grid h-36 w-36 place-items-center rounded-full"
                style={{
                    background: `conic-gradient(#22d3ee 0 ${firstValue}%, #a78bfa ${firstValue}% 82%, #fb7185 82% 100%)`,
                }}
            >
                <div className="grid h-24 w-24 place-items-center rounded-full bg-slate-900">
                    <span className="text-xl font-semibold text-white">{widget.metric}</span>
                </div>
            </div>
        </div>
    );
};

const TablePreview = ({ widget }: { widget: Widget }) => {
    const rows = ["Northstar Co.", "Orbit Labs", "SummitStack", "Bluepeak"];

    return (
        <div className="space-y-3">
            {rows.map((row, index) => (
                <div
                    key={`${widget.id}-row-${row}`}
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2"
                >
                    <span className="text-sm text-slate-300">{row}</span>
                    <span className="text-sm font-medium text-cyan-300">
                        {widget.data[index] ?? 72}%
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Builder;
