import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo";
import { CREATOR_INFO } from "../../constants/creator";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo variant="full" size="sm" isLink />

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-zinc-500 dark:text-zinc-400">
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition">
              Home
            </Link>
            <Link to="/dashboards" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition">
              My Dashboards
            </Link>
            <Link to="/templates" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition">
              Templates
            </Link>
            <Link to="/about" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition">
              About
            </Link>
            <Link to="/builder" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition">
              Studio Builder
            </Link>
          </div>

          <div className="text-xs text-zinc-400 dark:text-zinc-500">
            <span>&copy; {new Date().getFullYear()} DashCraft. All rights reserved.</span>
          </div>
        </div>

        {/* Creator Attribution & Professional Links */}
        <div className="border-t border-zinc-100 dark:border-zinc-800/60 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>Created by</span>
            <Link
              to="/about"
              className="font-semibold text-zinc-800 dark:text-zinc-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition underline underline-offset-2"
            >
              {CREATOR_INFO.name}
            </Link>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            <a
              href={CREATOR_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A66C2] transition"
            >
              LinkedIn
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
            <a
              href={CREATOR_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition"
            >
              GitHub
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
            <a
              href={CREATOR_INFO.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;