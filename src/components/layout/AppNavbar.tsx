import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Plus,
  Home as HomeIcon,
  LayoutDashboard,
  LayoutTemplate,
  Info,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Logo } from "../brand/Logo";

export const AppNavbar: React.FC = () => {
  const location = useLocation();
  const { toggleTheme, isDark, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: HomeIcon, exact: true },
    { name: "My Dashboards", href: "/dashboards", icon: LayoutDashboard },
    { name: "Templates", href: "/templates", icon: LayoutTemplate },
    { name: "About", href: "/about", icon: Info },
  ];

  const isLinkActive = (link: (typeof navLinks)[0]) => {
    if (link.exact) {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(link.href);
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col w-full border-b bg-white/95 dark:bg-zinc-950/95 border-zinc-200 dark:border-zinc-800/80 px-4 sm:px-6 backdrop-blur-sm">
      <div className="flex h-14 w-full items-center justify-between">
        {/* Brand & Desktop Nav */}
        <div className="flex items-center gap-6">
          <Logo variant="compact" size="md" isLink />

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isLinkActive(link);

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            title={`Switch to ${isDark ? "Light" : "Dark"} Mode (Current: ${theme})`}
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <Link
            to="/builder"
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Dashboard</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            title="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 py-3 space-y-1 animate-in-fade">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isLinkActive(link);

            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <Link
              to="/builder"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full rounded-lg bg-zinc-900 dark:bg-zinc-100 py-2 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Launch Studio Builder</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
