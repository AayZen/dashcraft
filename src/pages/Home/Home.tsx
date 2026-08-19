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

        {/* Answer-Oriented Content — AI Search Answerability & Product Overview */}
        <section className="py-20 border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Product Knowledge &amp; Q&amp;A
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                DashCraft is a visual dashboard creation studio and visual dashboard builder by Aayan Kumar for creating, customizing, and presenting analytics dashboards in the browser.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">What is DashCraft?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft is a visual dashboard creation studio and visual dashboard builder by Aayan Kumar for creating, customizing, and presenting analytics dashboards in the browser.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Who created DashCraft?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft was created by Aayan Kumar, specializing in Cloud Computing, Web Development, and UI/UX Design.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">What does DashCraft do?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft enables users to create, customize, and present responsive analytics dashboards directly in the browser with editable widgets, pre-built templates, and AI-assisted generation.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Is DashCraft a dashboard builder?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, DashCraft is a visual dashboard builder featuring a 3-zone studio layout with a widget library, an interactive drag-and-drop 12-column grid canvas, and a real-time property inspector.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">What type of dashboards can DashCraft create?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft creates analytics dashboards for SaaS metrics (MRR, churn, ARR), E-Commerce sales, DevOps cloud infrastructure, Marketing and growth tracking, Product analytics, Finance, and Customer Support.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Does DashCraft have AI dashboard generation?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, DashCraft features AI-assisted dashboard generation that turns natural language prompts into complete, structured dashboard layouts with relevant metrics and charts.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">How does DashCraft&apos;s AI generation work?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft connects to the OpenAI API through a secure Node.js backend proxy that keeps API keys on the server. When offline or without API connectivity, a built-in offline synthesizer generates demo dashboards locally, clearly labeled as &ldquo;Synthesized Demo&rdquo; to maintain transparency.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">What widgets does DashCraft support?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft supports KPI metric cards with sparklines, vertical bar charts, smooth spline line charts, gradient area charts, donut/pie charts, data tables, percentage progress bars, and circular gauge widgets.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Does DashCraft provide dashboard templates?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, DashCraft provides ready-to-use starter templates across SaaS Revenue, E-Commerce, DevOps Infrastructure, Marketing &amp; Growth, Product Analytics, Finance &amp; Accounting, and Customer Support.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Is DashCraft open source?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft&apos;s source code is publicly available on GitHub for educational and portfolio demonstration.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Where is DashCraft&apos;s source code?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft&apos;s official source code is hosted on GitHub at{" "}
                  <a
                    href="https://github.com/AayZen/dashcraft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 dark:text-cyan-400 underline font-medium hover:text-cyan-500"
                  >
                    github.com/AayZen/dashcraft
                  </a>.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">What technologies does DashCraft use?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  DashCraft is built with React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Node.js (OpenAI proxy server), custom SVG vector visualization, and browser LocalStorage.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-5 md:col-span-2 lg:col-span-3">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Is DashCraft&apos;s data stored locally?</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes, all user dashboards, widget properties, and layout configurations persist directly in the browser&apos;s LocalStorage. No user dashboard data is sent to external databases or servers.
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