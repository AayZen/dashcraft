import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  ExternalLink,
} from "lucide-react";
import { CreatorCard } from "../../components/about/CreatorCard";
import { Footer } from "../../components/layout/Footer";
import { Logo } from "../../components/brand/Logo";
import { SEO } from "../../components/common/SEO";
import { GitHubIcon } from "../../components/common/SocialIcons";
import { aboutSEO } from "../../data/seoData";

export const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <main className="flex-1">
        <SEO {...aboutSEO} />
        {/* Hero Section */}
        <section className="pt-12 pb-10 sm:pt-16 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50/60 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-5 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              <span>Creator &amp; Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              About <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                DashCraft.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              DashCraft is a visual dashboard creation studio and visual dashboard builder by Aayan Kumar for creating, customizing, and presenting analytics dashboards in the browser.
            </p>
          </div>
        </section>

        {/* Creator Profile Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <CreatorCard variant="full" />
          </div>
        </section>

        {/* Product Mission & Engineering Section */}
        <section className="py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-3">
                <Logo variant="compact" size="md" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Craft dashboards visually.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                Built from the ground up for modern teams who need rapid dashboard prototyping without sacrificing visual polish.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 mb-4">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Visual-First Studio
                </h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Design complex metric widgets, spline charts, and categorical views in real-time with responsive 12-column layouts.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 mb-4">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  AI &amp; Local Synthesis
                </h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Generate tailored dashboard templates from natural language prompts, with built-in offline synthesis fallback.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Local-First Privacy
                </h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  All dashboards, widget configurations, and customizations persist directly inside your browser storage.
                </p>
              </div>
            </div>

            {/* Tech Stack Highlights */}
            <div className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Core Technical Foundation
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Engineered with modern frontend standards and clean component architecture.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    React 19
                  </span>
                  <span className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    TypeScript
                  </span>
                  <span className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    Vite
                  </span>
                  <span className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    Tailwind CSS 4
                  </span>
                  <span className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                    React Router
                  </span>
                </div>
              </div>
            </div>

            {/* Official Project & Source Code */}
            <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Project Repository &amp; Source Code
                </h4>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  DashCraft&apos;s source code is publicly available on GitHub. View the complete codebase, architecture, and issue tracker on GitHub.
                </p>
              </div>
              <a
                href="https://github.com/AayZen/dashcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
              >
                <GitHubIcon size={14} className="text-zinc-900 dark:text-zinc-100" />
                <span>GitHub Repository</span>
                <ExternalLink className="h-3 w-3 text-zinc-400" />
              </a>
            </div>

            {/* Launch CTA */}
            <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/builder"
                className="flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition shadow-sm"
              >
                <span>Launch Studio Builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/templates"
                className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 px-6 py-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
              >
                <Layers className="h-3.5 w-3.5 text-cyan-500" />
                <span>Explore Templates</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
