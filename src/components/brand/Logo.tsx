import React from "react";
import { Link } from "react-router-dom";

export type LogoVariant = "full" | "compact" | "mark";
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";
export type LogoTheme = "auto" | "light" | "dark";

export interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  theme?: LogoTheme;
  showTagline?: boolean;
  className?: string;
  isLink?: boolean;
}

const SIZE_CONFIGS: Record<
  LogoSize,
  {
    markSize: string;
    markDimension: number;
    titleSize: string;
    taglineSize: string;
    gap: string;
  }
> = {
  xs: {
    markSize: "h-5 w-5",
    markDimension: 20,
    titleSize: "text-xs",
    taglineSize: "text-[7px]",
    gap: "gap-1.5",
  },
  sm: {
    markSize: "h-6 w-6",
    markDimension: 24,
    titleSize: "text-sm",
    taglineSize: "text-[8px]",
    gap: "gap-2",
  },
  md: {
    markSize: "h-8 w-8",
    markDimension: 32,
    titleSize: "text-base sm:text-lg",
    taglineSize: "text-[9px]",
    gap: "gap-2.5",
  },
  lg: {
    markSize: "h-10 w-10",
    markDimension: 40,
    titleSize: "text-xl sm:text-2xl",
    taglineSize: "text-[10px]",
    gap: "gap-3",
  },
  xl: {
    markSize: "h-14 w-14",
    markDimension: 56,
    titleSize: "text-3xl sm:text-4xl",
    taglineSize: "text-xs",
    gap: "gap-4",
  },
};

/**
 * Geometric DashCraft "D" Symbol with stylized inner data visualization bars
 */
export const LogoMark: React.FC<{
  className?: string;
  size?: number;
  idSuffix?: string;
}> = ({ className = "h-8 w-8", size = 32, idSuffix = "def" }) => {
  const dGradId = `dc-d-${idSuffix}`;
  const b1GradId = `dc-b1-${idSuffix}`;
  const b2GradId = `dc-b2-${idSuffix}`;
  const b3GradId = `dc-b3-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      width={size}
      height={size}
    >
      <defs>
        {/* Dynamic D shape gradient: Electric Cyan -> Royal Blue -> Purple -> Pink */}
        <linearGradient id={dGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="35%" stopColor="#2563EB" />
          <stop offset="70%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {/* 3 Inner Data Visualization Bar Gradients */}
        <linearGradient id={b1GradId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id={b2GradId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id={b3GradId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      {/* Stylized Outer D Loop */}
      <path
        d="M 12 16 L 52 16 C 78 16 94 32 94 50 C 94 68 78 84 52 84 L 12 84 L 26 70 L 48 70 C 66 70 76 61 76 50 C 76 39 66 30 48 30 L 26 30 Z"
        fill={`url(#${dGradId})`}
      />

      {/* 3 Internal Vertical Data Visualization Bars */}
      <rect x="32" y="54" width="8" height="16" rx="4" fill={`url(#${b1GradId})`} />
      <rect x="44" y="42" width="8" height="28" rx="4" fill={`url(#${b2GradId})`} />
      <rect x="56" y="28" width="8" height="42" rx="4" fill={`url(#${b3GradId})`} />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "compact",
  size = "md",
  theme = "auto",
  showTagline,
  className = "",
  isLink = false,
}) => {
  const config = SIZE_CONFIGS[size] || SIZE_CONFIGS.md;
  const isFull = variant === "full";
  const isMarkOnly = variant === "mark";
  const shouldShowTagline = showTagline ?? isFull;

  // Wordmark colors based on theme
  const dashColorClass =
    theme === "dark"
      ? "text-zinc-50"
      : theme === "light"
      ? "text-zinc-950"
      : "text-zinc-950 dark:text-zinc-50";

  const taglineColorClass =
    theme === "dark"
      ? "text-zinc-400"
      : theme === "light"
      ? "text-zinc-500"
      : "text-zinc-500 dark:text-zinc-400";

  const content = (
    <div
      className={`inline-flex items-center ${config.gap} select-none ${className}`}
    >
      {/* Brand Icon Mark */}
      <LogoMark className={config.markSize} size={config.markDimension} />

      {/* Wordmark */}
      {!isMarkOnly && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-extrabold tracking-tight ${config.titleSize} flex items-baseline`}>
            <span className={dashColorClass}>Dash</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent ml-0.5">
              Craft
            </span>
          </div>

          {shouldShowTagline && (
            <span
              className={`font-bold tracking-[0.2em] uppercase mt-1 ${config.taglineSize} ${taglineColorClass}`}
            >
              Craft dashboards visually.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (isLink) {
    return (
      <Link to="/" className="inline-flex items-center group transition opacity-95 hover:opacity-100">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
