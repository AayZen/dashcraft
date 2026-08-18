import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo variant="compact" size="md" isLink />

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
            Home
          </Link>
          <Link to="/dashboards" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
            My Dashboards
          </Link>
          <Link to="/templates" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
            Templates
          </Link>
          <Link to="/about" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition">
            About
          </Link>

          <Link
            to="/builder"
            className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-xs font-semibold text-white dark:text-zinc-950 transition hover:bg-zinc-800 dark:hover:bg-white shadow-2xs"
          >
            Start Building Free
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;