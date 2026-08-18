import React from "react";
import { Globe, ExternalLink, Code2, Cloud, Sparkles } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "../common/SocialIcons";
import { CreatorProfile } from "../creator/CreatorProfile";
import { CREATOR_INFO } from "../../constants/creator";

interface CreatorCardProps {
  variant?: "full" | "compact";
  className?: string;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ variant = "full", className = "" }) => {
  if (variant === "compact") {
    return (
      <div
        className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-5 sm:p-6 shadow-sm ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <CreatorProfile size="sm" showBadge />

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                  {CREATOR_INFO.name}
                </h3>
                <span className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
                  Creator
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {CREATOR_INFO.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={CREATOR_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title="LinkedIn Profile"
            >
              <LinkedInIcon size={14} className="text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={CREATOR_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              title="GitHub Profile"
            >
              <GitHubIcon size={14} className="text-zinc-900 dark:text-zinc-100" />
              <span>GitHub</span>
            </a>

            <a
              href={CREATOR_INFO.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition"
              title="Personal Portfolio"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm transition ${className}`}
    >
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8">
          {/* Creator Profile Image (Automatic Light/Dark switching) */}
          <CreatorProfile size="lg" showBadge />

          {/* Profile Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {CREATOR_INFO.name}
              </h2>
              <span className="rounded-full border border-blue-500/30 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                Creator &amp; Builder
              </span>
            </div>

            {/* Domains / Focus */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-zinc-700 dark:text-zinc-300 font-medium">
                <Cloud className="h-3 w-3 text-cyan-500" />
                Cloud Computing
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-zinc-700 dark:text-zinc-300 font-medium">
                <Code2 className="h-3 w-3 text-blue-500" />
                Web Development
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-zinc-700 dark:text-zinc-300 font-medium">
                <Sparkles className="h-3 w-3 text-purple-500" />
                UI/UX Design
              </span>
            </div>

            {/* Full Bio */}
            <p className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
              {CREATOR_INFO.bio}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-3">
          <a
            href={CREATOR_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 px-4 py-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-2xs"
          >
            <LinkedInIcon size={15} className="text-[#0A66C2]" />
            <span>LinkedIn</span>
            <ExternalLink className="h-3 w-3 text-zinc-400" />
          </a>

          <a
            href={CREATOR_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 px-4 py-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition shadow-2xs"
          >
            <GitHubIcon size={15} className="text-zinc-900 dark:text-zinc-100" />
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 text-zinc-400" />
          </a>

          <a
            href={CREATOR_INFO.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-4 py-2.5 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white transition shadow-sm"
          >
            <Globe className="h-4 w-4 text-cyan-400 dark:text-cyan-600" />
            <span>Portfolio</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
