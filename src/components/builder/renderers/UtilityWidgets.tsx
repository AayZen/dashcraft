import React, { useState } from "react";
import type { Widget, ActivityItem } from "../../../types";
import { Calendar, Filter, Clock, Activity } from "lucide-react";
import { ACCENT_STYLES } from "../../../constants/theme";

export const DateWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;
  const [selectedRange, setSelectedRange] = useState(widget.config?.activeFilter || "Last 30 Days");
  const options = widget.config?.filterOptions || ["Today", "Last 7 Days", "Last 30 Days", "Quarter to Date"];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-1 w-full min-w-0">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 min-w-0">
        <Calendar className={`h-4 w-4 shrink-0 ${accent.text}`} />
        <span className="truncate">{widget.title}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 min-w-0">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelectedRange(opt)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
              selectedRange === opt
                ? `${accent.bg} ${accent.text} ${accent.border} border font-semibold shadow-2xs`
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export const FilterWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;
  const [activeSegment, setActiveSegment] = useState("All Segments");
  const options = widget.config?.filterOptions || ["All Segments", "Enterprise", "Self-Serve", "Partners"];

  return (
    <div className="flex items-center justify-between gap-3 p-1 w-full min-w-0">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 min-w-0">
        <Filter className={`h-4 w-4 shrink-0 ${accent.text}`} />
        <span className="truncate">{widget.title}</span>
      </div>

      <select
        value={activeSegment}
        onChange={(e) => setActiveSegment(e.target.value)}
        className={`rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 outline-none ${accent.ring}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export const StatusWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  return (
    <div className="flex flex-col justify-between h-full w-full min-w-0">
      {/* Header: Semantic status pulse + Widget Title + Accent Styled Metric */}
      <div className="flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          {/* Semantic Health indicator pulse */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{widget.title}</h4>
        </div>

        {/* Configurable Accent Badge */}
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border shrink-0 ${accent.badge}`}>
          {widget.metric || "100% Operational"}
        </span>
      </div>

      {/* 30-Day Vitals with user-configured Accent Color bars */}
      <div className="my-auto py-3 w-full">
        <div className="flex items-center gap-1 h-8 w-full">
          {Array.from({ length: 30 }).map((_, idx) => (
            <div
              key={idx}
              className="flex-1 h-full rounded-xs transition opacity-85 hover:opacity-100 cursor-pointer"
              style={{ backgroundColor: accent.stroke }}
              title={`Day ${idx + 1}: 100% Uptime`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 min-w-0">
          <span>30 days ago</span>
          <span className="font-medium text-zinc-600 dark:text-zinc-300">99.99% uptime</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export const ActivityWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  const defaultActivities: ActivityItem[] = [
    { id: "1", user: "alex.dev", action: "deployed release", target: "v2.18.4 to prod-us", time: "8m ago", status: "success" },
    { id: "2", user: "system", action: "autoscaled cluster", target: "+12 nodes", time: "24m ago", status: "info" },
    { id: "3", user: "sarah.sre", action: "resolved alert", target: "redis-latency-p99", time: "42m ago", status: "success" },
  ];

  const items: ActivityItem[] = widget.config?.activityItems || defaultActivities;

  return (
    <div className="flex flex-col h-full justify-between w-full min-w-0">
      <div className="flex items-center justify-between gap-3 mb-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <Activity className={`h-4 w-4 shrink-0 ${accent.text}`} />
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{widget.title}</h4>
        </div>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1 shrink-0">
          <Clock className="h-3 w-3" /> Live feed
        </span>
      </div>

      <div className="space-y-2 my-auto w-full">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-100 dark:border-zinc-800/40 last:border-0 min-w-0"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: accent.stroke }}
              />
              <span className="font-semibold text-zinc-900 dark:text-zinc-200 truncate">
                {item.user}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 truncate">
                {item.action} <span className="font-mono text-zinc-700 dark:text-zinc-300">{item.target}</span>
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0 ml-2">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
