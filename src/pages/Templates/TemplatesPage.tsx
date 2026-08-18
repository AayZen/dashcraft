import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  Search,
} from "lucide-react";
import { DASHBOARD_TEMPLATES } from "../../services/templates";
import { storage } from "../../services/storage";
import { useToast } from "../../hooks/useToast";
import { SEO } from "../../components/common/SEO";
import { templatesSEO } from "../../data/seoData";
import type { Dashboard } from "../../types";

export const TemplatesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const categories = ["All", "SaaS", "E-Commerce", "DevOps", "Marketing", "Product", "Finance"];

  const filteredTemplates = DASHBOARD_TEMPLATES.filter((template) => {
    const matchesCat = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  const handleUseTemplate = (template: Dashboard) => {
    toast.info(`Cloning "${template.name}"...`);
    const newDash = storage.createFromTemplate(template.id);
    if (newDash) {
      toast.success(`Dashboard created from "${template.name}"`);
      navigate(`/builder/${newDash.id}`);
    }
  };

  return (
    <div className="flex-1 bg-zinc-50/50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-8 animate-fade-in">
      <SEO {...templatesSEO} />
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Curated Blueprints
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
              Dashboard Templates
            </h1>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Start with production-ready layouts tailored for SaaS metrics, cloud operations, e-commerce, and growth.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/builder"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-150"
            >
              <span>Blank Canvas</span>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium active:scale-95 transition-all duration-150 ${
                  selectedCategory === cat
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold shadow-xs"
                    : "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-cyan-500 transition-colors duration-150 shadow-2xs"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-in"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    {template.category}
                  </span>
                  <span className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                    {template.widgets.length} Widgets
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {template.name}
                </h3>

                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {template.description}
                </p>

                {/* Tags */}
                {template.tags && template.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-zinc-100 dark:bg-zinc-800/60 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
                <Link
                  to={`/preview/${template.id}`}
                  className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 active:scale-95 transition-all"
                >
                  Preview Layout
                </Link>

                <button
                  onClick={() => handleUseTemplate(template)}
                  className="flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white active:scale-95 transition-all shadow-sm"
                >
                  <span>Use Template</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center bg-white dark:bg-zinc-900/40 animate-fade-in">
            <Layers className="h-8 w-8 text-zinc-400 mb-3" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              No matching templates
            </h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-xs">
              No templates found in &ldquo;{selectedCategory}&rdquo; matching &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
