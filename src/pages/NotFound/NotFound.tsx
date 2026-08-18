import React from "react";
import { Link } from "react-router-dom";
import { Home, Layers, Info, ArrowRight } from "lucide-react";
import { SEO } from "../../components/common/SEO";
import { notFoundSEO } from "../../data/seoData";
import { Logo } from "../../components/brand/Logo";

export const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 px-4 sm:px-6">
      <SEO {...notFoundSEO} />

      <div className="text-center max-w-md mx-auto">
        <Logo variant="mark" size="lg" />

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>

        <nav className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3" aria-label="Navigation">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-5 py-2.5 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition shadow-sm"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/templates"
            className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
          >
            <Layers className="h-3.5 w-3.5 text-cyan-500" />
            <span>Explore Templates</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
          >
            <Info className="h-3.5 w-3.5 text-zinc-500" />
            <span>About DashCraft</span>
          </Link>
        </nav>

        <div className="mt-10">
          <Link
            to="/builder"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Start building a dashboard</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
