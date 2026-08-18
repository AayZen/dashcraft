import React from "react";
import { WandSparkles, Sliders, Presentation } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: WandSparkles,
      title: "Prompt or Pick a Template",
      description: "Describe your dashboard requirements in natural language or choose from 8+ production-ready starter templates.",
    },
    {
      step: "02",
      icon: Sliders,
      title: "Customize Every Detail",
      description: "Tweak metrics, change percentage rates, swap chart styles, pick curated accents, and edit data values on the fly.",
    },
    {
      step: "03",
      icon: Presentation,
      title: "Preview & Share Instantly",
      description: "Switch to presentation mode for client reviews, copy presentation links, or export the JSON schema to disk.",
    },
  ];

  return (
    <section className="py-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Intuitive Workflow
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
            Build dashboards in 3 fast steps
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            From an initial prompt to an interactive analytics studio in seconds.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-6 shadow-xs"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};