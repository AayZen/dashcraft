import React, { useState } from "react";
import { Share2, Copy, Check, Link2 } from "lucide-react";
import { Modal } from "../common/Modal";
import type { Dashboard } from "../../types";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboard: Dashboard;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, dashboard }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/preview/${dashboard.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Dashboard Presentation"
      description="Share a clean presentation link with teammates and clients."
      maxWidth="md"
      icon={<Share2 className="h-5 w-5 text-cyan-500" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Presentation Preview Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 truncate">
              <Link2 className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{shareUrl}</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-zinc-950 hover:bg-cyan-400 transition shrink-0"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-3 text-xs text-zinc-500 dark:text-zinc-400">
          Anyone with this link can view the live interactive preview without editor chrome.
        </div>
      </div>
    </Modal>
  );
};
