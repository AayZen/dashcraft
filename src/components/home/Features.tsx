import React from "react";
import {
  Sparkles,
  MousePointerClick,
  BarChart3,
  Eye,
  Sliders,
  Database,
  Undo2,
  HardDrive,
} from "lucide-react";

export const Features: React.FC = () => {
  const features = [
    {
      title: "Visual 3-Zone Studio",
      description: "A fast, responsive editor layout with widget library, interactive canvas, and property inspector.",
      icon: MousePointerClick,
    },
    {
      title: "AI & Studio Synthesis",
      description: "Prompt-to-dashboard engine with OpenAI integration and instant offline synthesis fallback.",
      icon: Sparkles,
    },
    {
      title: "16+ High-Impact Widgets",
      description: "KPIs, trend splines, rounded bar charts, area fills, donut mixes, deal tables, goals, and gauges.",
      icon: BarChart3,
    },
    {
      title: "Full Customization",
      description: "Directly edit titles, metric numbers, percentage trends, accent colors, and custom dataset points.",
      icon: Sliders,
    },
    {
      title: "Presentation Preview",
      description: "1-click switch to full client presentation mode with desktop, tablet, and mobile viewport simulations.",
      icon: Eye,
    },
    {
      title: "Local Persistence",
      description: "All dashboards and edits autosave to versioned LocalStorage. Never lose work on page refresh.",
      icon: HardDrive,
    },
    {
      title: "Undo / Redo History",
      description: "Full history stack with keyboard shortcuts (⌘Z, ⌘⇧Z) and rapid state reversions.",
      icon: Undo2,
    },
    {
      title: "Command Palette",
      description: "Global keyboard-driven command palette (⌘K) to quickly add widgets, switch themes, or export.",
      icon: Database,
    },
  ];

  return (
    <section className="py-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Crafted for speed & polish
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
            Everything you need in a modern dashboard studio
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Designed with the restraint and precision of top SaaS tools. Fast, keyboard-accessible, and beautiful out of the box.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;

            return (
              <div
                key={feat.title}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 mb-4">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {feat.title}
                </h3>
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};