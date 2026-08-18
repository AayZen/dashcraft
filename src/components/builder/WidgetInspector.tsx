import React from "react";
import {
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Sliders,
  TrendingUp,
  LineChart,
  BarChart3,
  AreaChart,
  PieChart,
  Table2,
  CheckSquare,
  Gauge,
  Plus,
  X,
  Layers,
  Sun,
  Moon,
  Laptop,
  ArrowLeft,
  PlusCircle,
} from "lucide-react";
import type {
  Widget,
  WidgetKind,
  WidgetSize,
  DashboardSettings,
  Density,
  ChangeType,
} from "../../types";
import { ACCENT_COLORS, ACCENT_STYLES } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";

interface WidgetInspectorProps {
  widget: Widget | null;
  dashboardSettings: DashboardSettings;
  onUpdateWidget: (id: string, updates: Partial<Widget>) => void;
  onDeleteWidget: (id: string) => void;
  onDuplicateWidget: (id: string) => void;
  onMoveUpWidget: (id: string) => void;
  onMoveDownWidget: (id: string) => void;
  onUpdateDashboardSettings: (updates: Partial<DashboardSettings>) => void;
  onBackToCanvas?: () => void;
  onOpenLibrary?: () => void;
}

const WIDGET_KINDS: { kind: WidgetKind; label: string; icon: React.ElementType }[] = [
  { kind: "kpi", label: "KPI", icon: TrendingUp },
  { kind: "line", label: "Line", icon: LineChart },
  { kind: "bar", label: "Bar", icon: BarChart3 },
  { kind: "area", label: "Area", icon: AreaChart },
  { kind: "donut", label: "Donut", icon: PieChart },
  { kind: "table", label: "Table", icon: Table2 },
  { kind: "progress", label: "Progress", icon: CheckSquare },
  { kind: "gauge", label: "Gauge", icon: Gauge },
];

const PRESET_DATASETS: { name: string; data: number[]; labels: string[] }[] = [
  { name: "SaaS MRR Growth", data: [45, 62, 78, 95, 118, 142], labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"] },
  { name: "Quarterly Target", data: [32, 54, 72, 88, 94], labels: ["Q1", "Q2", "Q3", "Q4", "Q1"] },
  { name: "Weekly Traffic", data: [120, 145, 138, 175, 192, 210, 185], labels: ["M", "T", "W", "T", "F", "S", "S"] },
  { name: "Conversion Mix", data: [58, 28, 14], labels: ["Organic", "Paid", "Referral"] },
];

export const WidgetInspector: React.FC<WidgetInspectorProps> = ({
  widget,
  dashboardSettings,
  onUpdateWidget,
  onDeleteWidget,
  onDuplicateWidget,
  onMoveUpWidget,
  onMoveDownWidget,
  onUpdateDashboardSettings,
  onBackToCanvas,
  onOpenLibrary,
}) => {
  const { theme, setTheme } = useTheme();

  if (!widget) {
    return (
      <aside className="flex flex-col h-full w-full lg:w-80 max-w-lg lg:max-w-none shrink-0 border-l lg:border-l border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-4 select-none overflow-y-auto animate-fade-in">
        {/* Mobile/Tablet Back to Canvas Header */}
        {onBackToCanvas && (
          <div className="lg:hidden flex items-center justify-between pb-3 mb-3 border-b border-zinc-200 dark:border-zinc-800">
            <button
              onClick={onBackToCanvas}
              className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 active:scale-95 transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Canvas</span>
            </button>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Dashboard Settings
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800/60">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-cyan-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
              Dashboard Settings
            </h3>
          </div>
        </div>

        {/* Studio Theme Mode */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Theme Mode
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
            {(
              [
                { mode: "light", label: "Light", icon: Sun },
                { mode: "dark", label: "Dark", icon: Moon },
                { mode: "system", label: "System", icon: Laptop },
              ] as const
            ).map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md active:scale-95 transition-all duration-150 ${
                  theme === mode
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout Density */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Layout Density
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
            {(["compact", "comfortable", "spacious"] as Density[]).map((d) => (
              <button
                key={d}
                onClick={() => onUpdateDashboardSettings({ density: d })}
                className={`py-1.5 text-xs font-medium capitalize rounded-md active:scale-95 transition-all duration-150 ${
                  dashboardSettings.density === d
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Accent Color */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Global Accent Theme
          </label>
          <div className="grid grid-cols-4 gap-2">
            {ACCENT_COLORS.map((col) => {
              const style = ACCENT_STYLES[col];
              const isSelected = dashboardSettings.accent === col;

              return (
                <button
                  key={col}
                  onClick={() => onUpdateDashboardSettings({ accent: col })}
                  className={`flex items-center gap-1.5 rounded-lg border p-2 text-left text-xs capitalize active:scale-95 transition-all duration-150 ${
                    isSelected
                      ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-semibold shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: style.stroke }}
                  />
                  <span className="truncate text-[11px]">{col}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Hint with Action Buttons */}
        <div className="mt-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 text-center">
          <Layers className="h-6 w-6 text-zinc-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            No Widget Selected
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Tap any widget on the canvas to customize its metrics, chart series, and appearance.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            {onBackToCanvas && (
              <button
                onClick={onBackToCanvas}
                className="flex items-center justify-center gap-1.5 w-full rounded-lg bg-zinc-900 dark:bg-zinc-100 py-2 text-xs font-semibold text-white dark:text-zinc-950 active:scale-95 transition-all shadow-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Canvas</span>
              </button>
            )}

            {onOpenLibrary && (
              <button
                onClick={onOpenLibrary}
                className="flex items-center justify-center gap-1.5 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-750 active:scale-95 transition-all"
              >
                <PlusCircle className="h-3.5 w-3.5 text-cyan-500" />
                <span>Browse Widget Library</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    );
  }

  // Selected Widget Inspector
  const handleDataChange = (index: number, val: number) => {
    const nextData = [...widget.data];
    nextData[index] = val;
    onUpdateWidget(widget.id, { data: nextData });
  };

  const handleLabelChange = (index: number, lbl: string) => {
    const nextLabels = widget.labels ? [...widget.labels] : widget.data.map((_, i) => `P${i + 1}`);
    nextLabels[index] = lbl;
    onUpdateWidget(widget.id, { labels: nextLabels });
  };

  const handleAddDataPoint = () => {
    const nextData = [...widget.data, Math.round(Math.random() * 80 + 20)];
    const nextLabels = widget.labels
      ? [...widget.labels, `P${widget.data.length + 1}`]
      : widget.data.map((_, i) => `P${i + 1}`);
    nextLabels.push(`P${nextData.length}`);
    onUpdateWidget(widget.id, { data: nextData, labels: nextLabels });
  };

  const handleRemoveDataPoint = (index: number) => {
    if (widget.data.length <= 2) return;
    const nextData = widget.data.filter((_, i) => i !== index);
    const nextLabels = widget.labels?.filter((_, i) => i !== index);
    onUpdateWidget(widget.id, { data: nextData, labels: nextLabels });
  };

  const handleApplyPreset = (preset: typeof PRESET_DATASETS[0]) => {
    onUpdateWidget(widget.id, { data: preset.data, labels: preset.labels });
  };

  return (
    <aside
      key={widget.id}
      className="flex flex-col h-full w-full lg:w-80 max-w-lg lg:max-w-none shrink-0 border-l lg:border-l border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-4 select-none overflow-y-auto animate-fade-in"
    >
      {/* Mobile/Tablet Back to Canvas Header */}
      {onBackToCanvas && (
        <div className="lg:hidden flex items-center justify-between pb-3 mb-3 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onBackToCanvas}
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 active:scale-95 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Canvas</span>
          </button>
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            Editing: {widget.kind}
          </span>
        </div>
      )}

      {/* Header & Quick Action Buttons */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            Inspector
          </span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
            {widget.kind}
          </span>
        </div>

        {/* Quick buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMoveUpWidget(widget.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-150"
            title="Move Up"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onMoveDownWidget(widget.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-150"
            title="Move Down"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDuplicateWidget(widget.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-150"
            title="Duplicate"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDeleteWidget(widget.id)}
            className="p-1 rounded-md text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 active:scale-95 transition-all duration-150"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-5 mt-4">
        {/* Widget Basics */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Basics
          </label>

          <div className="space-y-3">
            <div>
              <span className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Title</span>
              <input
                type="text"
                value={widget.title}
                onChange={(e) => onUpdateWidget(widget.id, { title: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <span className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Subtitle</span>
              <input
                type="text"
                value={widget.subtitle || ""}
                placeholder="Optional description"
                onChange={(e) => onUpdateWidget(widget.id, { subtitle: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Metric</span>
                <input
                  type="text"
                  value={widget.metric || ""}
                  onChange={(e) => onUpdateWidget(widget.id, { metric: e.target.value })}
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <span className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Change %</span>
                <input
                  type="text"
                  value={widget.change || ""}
                  onChange={(e) => onUpdateWidget(widget.id, { change: e.target.value })}
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Period</span>
                <input
                  type="text"
                  value={widget.changePeriod || ""}
                  placeholder="vs last month"
                  onChange={(e) => onUpdateWidget(widget.id, { changePeriod: e.target.value })}
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <span className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Trend Direction</span>
                <select
                  value={widget.changeType || "increase"}
                  onChange={(e) => onUpdateWidget(widget.id, { changeType: e.target.value as ChangeType })}
                  className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="increase">Positive (Green)</option>
                  <option value="decrease">Negative (Red)</option>
                  <option value="neutral">Neutral (Gray)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization & Type */}
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/60">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Visualization
          </label>

          <div className="grid grid-cols-4 gap-1.5">
            {WIDGET_KINDS.map((k) => {
              const Icon = k.icon;
              const isSelected = widget.kind === k.kind;

              return (
                <button
                  key={k.kind}
                  onClick={() => onUpdateWidget(widget.id, { kind: k.kind })}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center active:scale-95 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-zinc-900 bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-bold shadow-xs ring-1 ring-zinc-900/20 dark:ring-white/20"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                  }`}
                  title={k.label}
                >
                  <Icon className="h-3.5 w-3.5 mb-1" />
                  <span className="text-[10px]">{k.label}</span>
                </button>
              );
            })}
          </div>

          {/* Size Selector */}
          <div className="mt-3">
            <span className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Card Width</span>
            <div className="grid grid-cols-4 gap-1 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
              {(["sm", "md", "lg", "full"] as WidgetSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateWidget(widget.id, { size: s })}
                  className={`py-1 text-xs uppercase font-mono rounded-md active:scale-95 transition-all duration-150 ${
                    widget.size === s
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-bold"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color Palette with selection animation */}
          <div className="mt-3">
            <span className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1.5">Accent Color</span>
            <div className="flex flex-wrap gap-2.5">
              {ACCENT_COLORS.map((col) => {
                const style = ACCENT_STYLES[col];
                const isSelected = widget.accent === col;

                return (
                  <button
                    key={col}
                    onClick={() => onUpdateWidget(widget.id, { accent: col })}
                    className={`h-6 w-6 rounded-full transition-transform duration-150 cursor-pointer active:scale-95 ${
                      isSelected
                        ? "ring-2 ring-zinc-900 dark:ring-zinc-100 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 scale-110 shadow-sm"
                        : "hover:scale-105 opacity-85 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: style.stroke }}
                    title={col}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Dataset Editor */}
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/60">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Chart Dataset ({widget.data.length})
            </label>
            <button
              onClick={handleAddDataPoint}
              className="flex items-center gap-1 text-[11px] font-medium text-cyan-600 dark:text-cyan-400 hover:underline active:scale-95 transition-all"
            >
              <Plus className="h-3 w-3" /> Add Point
            </button>
          </div>

          {/* Preset dataset chips */}
          <div className="mb-3 flex flex-wrap gap-1">
            {PRESET_DATASETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleApplyPreset(preset)}
                className="rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 active:scale-95 transition-all duration-150"
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Data Points List */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {widget.data.map((val, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={widget.labels?.[idx] || `P${idx + 1}`}
                  onChange={(e) => handleLabelChange(idx, e.target.value)}
                  className="w-16 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-2 py-1 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Label"
                />
                <input
                  type="number"
                  value={val}
                  onChange={(e) => handleDataChange(idx, Number(e.target.value))}
                  className="flex-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-2 py-1 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  onClick={() => handleRemoveDataPoint(idx)}
                  className="p-1 text-zinc-400 hover:text-rose-500 active:scale-95 transition-all"
                  title="Remove point"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
