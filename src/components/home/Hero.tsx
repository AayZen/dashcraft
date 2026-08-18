import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { LogoMark } from "../brand/Logo";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* 1. Release / Category Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/40 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-6 shadow-2xs animate-fade-in">
          <LogoMark className="h-4 w-4" size={16} idSuffix="hero" />
          <span>DashCraft Studio &bull; Craft Dashboards Visually</span>
        </div>

        {/* 2. Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08] animate-fade-in-up delay-100">
          Craft dashboards <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            visually.
          </span>
        </h1>

        {/* 3. Supporting Copy */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal animate-fade-in-up delay-200">
          Build polished analytics dashboards without fighting with code or rigid templates. Generate layouts with AI, customize every widget, and present in presentation mode.
        </p>

        {/* 4. CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in-up delay-300">
          <Link
            to="/builder"
            className="group flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3.5 text-sm font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            <span>Start Building</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
          </Link>

          <Link
            to="/templates"
            className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 px-6 py-3.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all duration-150"
          >
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span>Explore Templates</span>
          </Link>
        </div>

        {/* Highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 animate-fade-in delay-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            No sign-up required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            Local persistence
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            AI generation + Synthesizer
          </span>
        </div>

        {/* 5. Product UI Hero Showcase with subtle entrance */}
        <div className="mt-14 relative mx-auto max-w-5xl animate-fade-in-up delay-400">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/5">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50 dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                <span>dashcraft.studio/builder/saas-mrr</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Saved Locally</span>
              </div>
            </div>

            {/* Mock Editor Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 gap-4 bg-zinc-100/50 dark:bg-zinc-950/60 canvas-grid-pattern text-left">
              {/* Card 1: MRR */}
              <div className="md:col-span-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Monthly Recurring Revenue</p>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">$142,850</span>
                  <span className="rounded-md border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">+14.2%</span>
                </div>
                <div className="mt-3 flex items-end gap-1.5 h-8">
                  {[24, 38, 45, 52, 68, 84, 98].map((v, i) => (
                    <span key={i} className="flex-1 bg-cyan-500 rounded-t-sm transition-all duration-300 hover:opacity-80" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>

              {/* Card 2: ARR */}
              <div className="md:col-span-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Annual Run Rate</p>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">$1.71M</span>
                  <span className="rounded-md border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-400">+22.8%</span>
                </div>
                <div className="mt-3 flex items-end gap-1.5 h-8">
                  {[30, 42, 50, 60, 72, 85, 95].map((v, i) => (
                    <span key={i} className="flex-1 bg-blue-500 rounded-t-sm transition-all duration-300 hover:opacity-80" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>

              {/* Card 3: Churn */}
              <div className="md:col-span-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Logo Churn Rate</p>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">1.24%</span>
                  <span className="rounded-md border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">-0.3%</span>
                </div>
                <div className="mt-3 flex items-end gap-1.5 h-8">
                  {[80, 70, 60, 50, 40, 35, 25].map((v, i) => (
                    <span key={i} className="flex-1 bg-emerald-500 rounded-t-sm transition-all duration-300 hover:opacity-80" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>

              {/* Card 4: Trend graph */}
              <div className="md:col-span-8 rounded-xl border border-cyan-500/50 dark:border-cyan-500/50 ring-2 ring-cyan-500/20 bg-white dark:bg-zinc-900 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">MRR Trajectory & Expansion</h4>
                    <p className="text-xs text-zinc-400">Monthly breakdown vs target</p>
                  </div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono">SELECTED WIDGET</span>
                </div>

                <div className="h-28 flex items-end gap-3 pt-2">
                  {[35, 48, 56, 68, 79, 85, 92, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <span className="h-full w-full rounded-t-md bg-gradient-to-t from-cyan-500/30 to-cyan-500" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 5: Plan Mix */}
              <div className="md:col-span-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs flex flex-col justify-between">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Tier Composition</h4>
                <div className="my-auto flex items-center justify-center py-2">
                  <div className="h-24 w-24 rounded-full border-[12px] border-cyan-500 border-t-blue-500 border-r-violet-500 flex items-center justify-center">
                    <span className="text-xs font-bold font-mono">58%</span>
                  </div>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <span>Enterprise 58%</span>
                  <span>Pro 28%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};