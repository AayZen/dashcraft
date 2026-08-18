import React from "react";
import type { Widget, TableRow } from "../../../types";
import { ACCENT_STYLES } from "../../../constants/theme";

export const TableWidget: React.FC<{ widget: Widget }> = ({ widget }) => {
  const accent = ACCENT_STYLES[widget.accent] || ACCENT_STYLES.cyan;

  const defaultRows: TableRow[] = [
    { id: "1", name: "Northstar Enterprise", category: "Annual Plan", value: "$48,000", change: "+120 seats", status: "active", progress: 92 },
    { id: "2", name: "Orbit Technologies", category: "Annual Plan", value: "$36,400", change: "+85 seats", status: "active", progress: 84 },
    { id: "3", name: "SummitStack Labs", category: "Monthly", value: "$24,200", change: "+40 seats", status: "active", progress: 76 },
    { id: "4", name: "Bluepeak Systems", category: "Annual Plan", value: "$19,800", change: "+25 seats", status: "pending", progress: 62 },
  ];

  const rows: TableRow[] = widget.config?.tableRows || defaultRows;

  return (
    <div className="flex flex-col h-full justify-between w-full min-w-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {widget.title}
          </h4>
          {widget.subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
              {widget.subtitle}
            </p>
          )}
        </div>
        {widget.metric && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 shrink-0">
            {widget.metric}
          </span>
        )}
      </div>

      {/* Controlled Horizontal Scrolling Table Container */}
      <div className="overflow-x-auto w-full rounded-lg border border-zinc-100 dark:border-zinc-800/60 p-0.5">
        <table className="w-full text-left text-xs min-w-[320px]">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800/60 text-[11px] text-zinc-400 dark:text-zinc-500">
              <th className="pb-2 pl-2 font-medium">Account / Item</th>
              <th className="pb-2 font-medium">Tier</th>
              <th className="pb-2 font-medium text-right">Value</th>
              <th className="pb-2 pr-2 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/40">
            {rows.map((row) => (
              <tr key={row.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50 transition">
                <td className="py-2.5 pl-2 pr-3 min-w-[120px]">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[140px]">
                    {row.name}
                  </div>
                  {row.change && (
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                      {row.change}
                    </div>
                  )}
                </td>
                <td className="py-2.5 pr-3 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                  {row.category || "Standard"}
                </td>
                <td className="py-2.5 pr-3 text-right whitespace-nowrap">
                  <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                    {row.value}
                  </span>
                  {row.progress !== undefined && (
                    <div className="mt-1 h-1.5 w-14 ml-auto rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${row.progress}%`,
                          backgroundColor: accent.stroke,
                        }}
                      />
                    </div>
                  )}
                </td>
                <td className="py-2.5 pr-2 text-right whitespace-nowrap">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${
                      row.status === "active" || row.status === "completed"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : row.status === "pending"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {row.status || "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
