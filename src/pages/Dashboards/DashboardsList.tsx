import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Copy,
  Trash2,
  ExternalLink,
  Calendar,
  LayoutDashboard,
  Layers,
  Edit2,
} from "lucide-react";
import { storage } from "../../services/storage";
import { useToast } from "../../hooks/useToast";
import { Modal } from "../../components/common/Modal";
import { SEO } from "../../components/common/SEO";
import { dashboardsSEO } from "../../data/seoData";
import type { Dashboard } from "../../types";

export const DashboardsList: React.FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>(() => storage.getDashboards());
  const [searchQuery, setSearchQuery] = useState("");
  const [editingDashboard, setEditingDashboard] = useState<Dashboard | null>(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const filteredDashboards = dashboards.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBlank = () => {
    const created = storage.createBlankDashboard("Untitled Dashboard");
    navigate(`/builder/${created.id}`);
    toast.success("Created new dashboard");
  };

  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const dup = storage.duplicateDashboard(id);
    if (dup) {
      setDashboards(storage.getDashboards());
      toast.success("Dashboard duplicated");
    }
  };

  const handleDelete = (id: string, name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const remaining = storage.deleteDashboard(id);
      setDashboards(remaining);
      toast.info("Dashboard deleted");
    }
  };

  const handleOpenRename = (d: Dashboard, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingDashboard(d);
    setNewName(d.name);
    setNewDescription(d.description || "");
  };

  const handleSaveRename = () => {
    if (!editingDashboard) return;
    const updated: Dashboard = {
      ...editingDashboard,
      name: newName.trim() || editingDashboard.name,
      description: newDescription.trim(),
      updatedAt: new Date().toISOString(),
    };
    storage.saveDashboard(updated);
    setDashboards(storage.getDashboards());
    setEditingDashboard(null);
    toast.success("Dashboard renamed");
  };

  return (
    <div className="flex-1 bg-zinc-50/50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-8 animate-fade-in">
      <SEO {...dashboardsSEO} />
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              My Dashboards
            </h1>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Manage, edit, customize, and preview your visual analytics dashboards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/templates"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-150"
            >
              <Layers className="h-3.5 w-3.5 text-cyan-500" />
              <span>Browse Templates</span>
            </Link>

            <button
              onClick={handleCreateBlank}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3.5 py-2 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white active:scale-95 transition-all duration-150 shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Dashboard</span>
            </button>
          </div>
        </div>

        {/* Search filter */}
        <div className="my-6 max-w-md relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-2 pl-9 pr-4 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-cyan-500 transition-colors duration-150 shadow-2xs"
            placeholder="Search dashboards by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dashboards Grid */}
        {filteredDashboards.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center bg-white dark:bg-zinc-900/40 animate-fade-in">
            <LayoutDashboard className="h-8 w-8 text-zinc-400 mb-3" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              No dashboards found
            </h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-xs">
              {searchQuery
                ? `No results matching "${searchQuery}". Try another keyword.`
                : "Create a blank dashboard or launch from a pre-built template."}
            </p>
            <button
              onClick={handleCreateBlank}
              className="mt-4 flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-3.5 py-2 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white active:scale-95 transition-all duration-150"
            >
              <Plus className="h-3.5 w-3.5" /> Create Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDashboards.map((dash) => (
              <div
                key={dash.id}
                className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 animate-card-in"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/builder/${dash.id}`}
                          className="text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors truncate"
                        >
                          {dash.name}
                        </Link>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {dash.description || "Custom analytics dashboard."}
                      </p>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-150">
                      <button
                        onClick={(e) => handleOpenRename(dash, e)}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
                        title="Rename"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDuplicate(dash.id, e)}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
                        title="Duplicate"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(dash.id, dash.name, e)}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 active:scale-95 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Widget overview tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                      {dash.widgets.length} Widgets
                    </span>
                    {dash.generationSource === "ai_generated" && (
                      <span className="rounded-md border border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 dark:text-cyan-300">
                        AI Generated
                      </span>
                    )}
                    {dash.generationSource === "synthesized_demo" && (
                      <span className="rounded-md border border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                        Synthesized Demo
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-4 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(dash.updatedAt || dash.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/preview/${dash.id}`}
                      className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 active:scale-95 transition-all font-medium"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Preview</span>
                    </Link>

                    <Link
                      to={`/builder/${dash.id}`}
                      className="flex items-center gap-1 rounded-md bg-zinc-900 dark:bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white active:scale-95 transition-all"
                    >
                      <span>Open Studio</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rename Modal */}
      <Modal
        isOpen={Boolean(editingDashboard)}
        onClose={() => setEditingDashboard(null)}
        title="Rename Dashboard"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Dashboard Title
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Executive Revenue Dashboard"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-cyan-500"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Brief summary of what this dashboard tracks"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              onClick={() => setEditingDashboard(null)}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveRename}
              className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
