import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Sparkles,
  TrendingUp,
  LineChart,
  BarChart3,
  AreaChart,
  PieChart,
  Table2,
  CheckSquare,
  Gauge,
  Eye,
  Moon,
  Sun,
  Laptop,
  Save,
  Download,
  FolderOpen,
  LayoutTemplate,
  Plus,
  Undo,
  Redo,
  ArrowRight,
  Info,
} from "lucide-react";
import type { WidgetKind } from "../../types";
import { useTheme } from "../../hooks/useTheme";
import { LogoMark } from "../brand/Logo";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget?: (kind: WidgetKind) => void;
  onOpenAI?: () => void;
  onTogglePreview?: () => void;
  onToggleTheme?: () => void;
  onSave?: () => void;
  onExport?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

interface CommandItem {
  id: string;
  category: "Actions" | "Add Widget" | "Navigation" | "Theme";
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  shortcut?: string;
  run: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onAddWidget,
  onOpenAI,
  onTogglePreview,
  onToggleTheme,
  onSave,
  onExport,
  onUndo,
  onRedo,
}) => {
  const { theme, isDark, setTheme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  };

  const commands: CommandItem[] = [
    // Actions
    {
      id: "ai-generate",
      category: "Actions",
      title: "Generate Dashboard with AI",
      subtitle: "Prompt-driven automated layout generator",
      icon: Sparkles,
      shortcut: "⌘G",
      run: () => {
        onOpenAI?.();
        onClose();
      },
    },
    {
      id: "toggle-preview",
      category: "Actions",
      title: "Toggle Presentation Preview",
      subtitle: "View dashboard without editor chrome",
      icon: Eye,
      shortcut: "⌘P",
      run: () => {
        onTogglePreview?.();
        onClose();
      },
    },
    {
      id: "save-dashboard",
      category: "Actions",
      title: "Save Dashboard",
      subtitle: "Persist changes to local storage",
      icon: Save,
      shortcut: "⌘S",
      run: () => {
        onSave?.();
        onClose();
      },
    },
    {
      id: "export-dashboard",
      category: "Actions",
      title: "Export Dashboard JSON",
      subtitle: "Export data or structure to file",
      icon: Download,
      run: () => {
        onExport?.();
        onClose();
      },
    },
    {
      id: "undo-action",
      category: "Actions",
      title: "Undo Edit",
      subtitle: "Revert previous canvas modification",
      icon: Undo,
      shortcut: "⌘Z",
      run: () => {
        onUndo?.();
        onClose();
      },
    },
    {
      id: "redo-action",
      category: "Actions",
      title: "Redo Edit",
      subtitle: "Re-apply reverted modification",
      icon: Redo,
      shortcut: "⌘⇧Z",
      run: () => {
        onRedo?.();
        onClose();
      },
    },

    // Add Widget
    {
      id: "add-kpi",
      category: "Add Widget",
      title: "Add KPI Metric",
      subtitle: "Single big stat with trend and sparkline",
      icon: TrendingUp,
      run: () => {
        onAddWidget?.("kpi");
        onClose();
      },
    },
    {
      id: "add-line",
      category: "Add Widget",
      title: "Add Line Chart",
      subtitle: "Time-series interactive trend curve",
      icon: LineChart,
      run: () => {
        onAddWidget?.("line");
        onClose();
      },
    },
    {
      id: "add-bar",
      category: "Add Widget",
      title: "Add Bar Chart",
      subtitle: "Categorical comparison bars",
      icon: BarChart3,
      run: () => {
        onAddWidget?.("bar");
        onClose();
      },
    },
    {
      id: "add-area",
      category: "Add Widget",
      title: "Add Area Chart",
      subtitle: "Gradient filled volume graph",
      icon: AreaChart,
      run: () => {
        onAddWidget?.("area");
        onClose();
      },
    },
    {
      id: "add-donut",
      category: "Add Widget",
      title: "Add Donut Chart",
      subtitle: "Segmented composition breakdown",
      icon: PieChart,
      run: () => {
        onAddWidget?.("donut");
        onClose();
      },
    },
    {
      id: "add-table",
      category: "Add Widget",
      title: "Add Data Table",
      subtitle: "Structured tabular deal ranking",
      icon: Table2,
      run: () => {
        onAddWidget?.("table");
        onClose();
      },
    },
    {
      id: "add-progress",
      category: "Add Widget",
      title: "Add Goal Progress",
      subtitle: "Target and milestone progress bar",
      icon: CheckSquare,
      run: () => {
        onAddWidget?.("progress");
        onClose();
      },
    },
    {
      id: "add-gauge",
      category: "Add Widget",
      title: "Add Gauge Meter",
      subtitle: "Radial speedometer threshold gauge",
      icon: Gauge,
      run: () => {
        onAddWidget?.("gauge");
        onClose();
      },
    },

    // Navigation
    {
      id: "nav-dashboards",
      category: "Navigation",
      title: "Go to My Dashboards",
      subtitle: "View dashboard library",
      icon: FolderOpen,
      run: () => {
        navigate("/dashboards");
        onClose();
      },
    },
    {
      id: "nav-templates",
      category: "Navigation",
      title: "Explore Templates",
      subtitle: "Browse pre-built dashboard templates",
      icon: LayoutTemplate,
      run: () => {
        navigate("/templates");
        onClose();
      },
    },
    {
      id: "nav-builder",
      category: "Navigation",
      title: "Open Builder Studio",
      subtitle: "Design visual dashboards",
      icon: Plus,
      run: () => {
        navigate("/builder");
        onClose();
      },
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "About DashCraft & Creator",
      subtitle: "Meet creator Aayan Kumar and view project details",
      icon: Info,
      run: () => {
        navigate("/about");
        onClose();
      },
    },

    // Theme Commands
    {
      id: "toggle-theme",
      category: "Theme",
      title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
      subtitle: `Toggle active visual theme (Current mode: ${theme})`,
      icon: isDark ? Sun : Moon,
      run: () => {
        toggleTheme();
        onToggleTheme?.();
        onClose();
      },
    },
    {
      id: "theme-dark",
      category: "Theme",
      title: "Set Theme: Dark Mode",
      subtitle: "Force dark visual palette across all screens",
      icon: Moon,
      run: () => {
        setTheme("dark");
        onClose();
      },
    },
    {
      id: "theme-light",
      category: "Theme",
      title: "Set Theme: Light Mode",
      subtitle: "Force light visual palette across all screens",
      icon: Sun,
      run: () => {
        setTheme("light");
        onClose();
      },
    },
    {
      id: "theme-system",
      category: "Theme",
      title: "Set Theme: System Preference",
      subtitle: "Automatically match your operating system color scheme",
      icon: Laptop,
      run: () => {
        setTheme("system");
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) => {
    const text = `${cmd.title} ${cmd.subtitle || ""} ${cmd.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in-scale">
        <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3.5">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
            placeholder="Type a command or search actions..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="hidden sm:inline-block rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={cmd.id}
                  onClick={cmd.run}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                    isSelected
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-md border ${
                        isSelected
                          ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                          : "border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium leading-none truncate">{cmd.title}</p>
                      {cmd.subtitle && (
                        <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <kbd className="rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    {isSelected && <ArrowRight className="h-3 w-3 text-cyan-500" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/80 px-4 py-2 text-[11px] text-zinc-400 dark:text-zinc-500 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span>Navigate</span>
            <kbd className="rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1 font-mono text-[9px]">↑</kbd>
            <kbd className="rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1 font-mono text-[9px]">↓</kbd>
            <span>Select</span>
            <kbd className="rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1 font-mono text-[9px]">↵</kbd>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400">
            <LogoMark className="h-3.5 w-3.5" size={14} idSuffix="palette" />
            <span>DashCraft Studio</span>
          </div>
        </div>
      </div>
    </div>
  );
};
