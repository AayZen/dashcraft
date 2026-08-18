import React, { useState } from "react";
import { Copy, Download, Check, FileJson } from "lucide-react";
import { Modal } from "../common/Modal";
import type { Dashboard } from "../../types";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboard: Dashboard;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, dashboard }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(dashboard, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dashboard.name.toLowerCase().replace(/\s+/g, "-")}-dashcraft.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Dashboard Schema"
      description="Download your dashboard layout as JSON or copy to clipboard."
      maxWidth="2xl"
      icon={<FileJson className="h-5 w-5 text-cyan-500" />}
    >
      <div className="space-y-4">
        <div className="relative">
          <pre className="max-h-72 overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-800 dark:text-zinc-300 leading-relaxed">
            {jsonString}
          </pre>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {dashboard.widgets.length} Widgets &bull; Schema Version 1.0
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3.5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy JSON"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
