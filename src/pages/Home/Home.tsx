import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "../../components/home/Hero";
import { Features } from "../../components/home/Features";
import { HowItWorks } from "../../components/home/HowItWorks";
import { Footer } from "../../components/layout/Footer";
import { DASHBOARD_TEMPLATES } from "../../services/templates";
import { CREATOR_INFO } from "../../constants/creator";
import { CreatorProfile } from "../../components/creator/CreatorProfile";
import { LinkedInIcon, GitHubIcon } from "../../components/common/SocialIcons";
import { SEO } from "../../components/common/SEO";
import { homeSEO } from "../../data/seoData";
import { ArrowRight, Globe } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <main className="flex-1">
        <SEO {...homeSEO} />
        <Hero />
        <Features />
        <HowItWorks />

        {/* Templates Showcase Teaser */}
        <section className="py-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Featured Layouts
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
                  Built for real business domains
                </h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Start with proven dashboard layouts for SaaS, E-Commerce, DevOps, and Growth.
                </p>
              </div>

              <Link
                to="/templates"
                className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <span>View all templates</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DASHBOARD_TEMPLATES.slice(0, 3).map((template) => (
                <div
                  key={template.id}
                  className="flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        {template.category}
                      </span>
                      <span className="text-xs text-zinc-400">{template.widgets.length} Widgets</span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {template.name}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <Link
                      to={`/preview/${template.id}`}
                      className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    >
                      Preview
                    </Link>

                    <Link
                      to="/builder"
                      className="flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <span>Open in Studio</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Answer-Oriented Content — What is DashCraft? */}
        <section className="py-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                About DashCraft
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
                What is DashCraft?
              </h2>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                DashCraft is a visual dashboard creation studio for building polished analytics dashboards without fighting with code or rigid templates. Created by Aayan Kumar, it provides a 3-zone studio layout with a widget library, interactive canvas, and property inspector — all running in your browser with local persistence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Who created DashCraft?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft was designed and developed by Aayan Kumar, specializing in Cloud Computing, Web Development, and UI/UX Design. It is an independent open-source analytics dashboard creation web application hosted on GitHub.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">How does AI dashboard generation work?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Describe your dashboard in natural language — for example, &ldquo;Create a SaaS revenue dashboard with MRR, churn, and top accounts.&rdquo; When connected to the OpenAI API through the secure backend proxy, DashCraft generates a structured dashboard layout with KPI cards, charts, and tables. When the API is unavailable, the built-in offline synthesizer creates a demo dashboard locally — clearly labeled as &ldquo;Synthesized Demo&rdquo; rather than &ldquo;AI Generated.&rdquo;
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Can I customize dashboard widgets?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Every widget is fully editable. Change titles, metric values, percentage trends, accent colors, chart data points, and widget sizes directly in the visual editor. The property inspector lets you fine-tune each widget without writing code.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">What widget types are supported?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft includes KPI metric cards with sparkline previews, bar charts, line/spline charts, area charts, donut charts, data tables, progress bars, and gauge widgets. Each widget renders using SVG-based visualization within a responsive 12-column grid layout.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Is my data private?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  All dashboards, widget configurations, and customizations persist directly inside your browser&apos;s LocalStorage. DashCraft does not upload dashboard data to any server. The only external call is the optional AI generation request, which goes through a secure backend proxy that never exposes API keys to the frontend.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">What technologies power DashCraft?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft is built with React 19, TypeScript, Vite, Tailwind CSS 4, and React Router. The AI generation backend uses Node.js with the OpenAI SDK. All visualization rendering uses SVG, and data persists in the browser via LocalStorage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Section on Home */}
        <section className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-10 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
                <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1">
                  <CreatorProfile size="md" showBadge />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      Behind DashCraft
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1.5">
                      Built with code, design, and data in mind.
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">{CREATOR_INFO.name}</span> &bull; {CREATOR_INFO.role}. {CREATOR_INFO.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
                  <Link
                    to="/about"
                    className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-5 py-2.5 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition shadow-sm"
                  >
                    <span>Meet the Creator</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <div className="flex items-center justify-center gap-2">
                    <a
                      href={CREATOR_INFO.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-[#0A66C2] transition"
                      title="LinkedIn"
                    >
                      <LinkedInIcon size={16} className="text-[#0A66C2]" />
                    </a>
                    <a
                      href={CREATOR_INFO.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition"
                      title="GitHub"
                    >
                      <GitHubIcon size={16} className="text-zinc-900 dark:text-zinc-100" />
                    </a>
                    <a
                      href={CREATOR_INFO.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                      title="Portfolio"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Ready to craft your next dashboard?
            </h2>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Open DashCraft Studio now. Free, instant, and saved locally in your browser.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Link
                to="/builder"
                className="flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition shadow-sm"
              >
                <span>Launch Studio Builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;