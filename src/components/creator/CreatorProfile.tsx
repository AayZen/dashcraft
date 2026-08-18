import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { CREATOR_INFO } from "../../constants/creator";

export type CreatorAvatarSize = "sm" | "md" | "lg" | "xl";

export interface CreatorProfileProps {
  size?: CreatorAvatarSize;
  className?: string;
  showBadge?: boolean;
}

const SIZE_CLASSES: Record<CreatorAvatarSize, { container: string; dimension: number }> = {
  sm: { container: "h-12 w-12", dimension: 48 },
  md: { container: "h-16 w-16", dimension: 64 },
  lg: { container: "h-20 w-20 sm:h-24 sm:w-24", dimension: 96 },
  xl: { container: "h-28 w-28 sm:h-32 sm:w-32", dimension: 128 },
};

/**
 * Reusable Creator Profile Component
 * Automatically serves the Light Mode or Dark Mode profile photo based on active resolvedTheme.
 */
export const CreatorProfile: React.FC<CreatorProfileProps> = ({
  size = "lg",
  className = "",
  showBadge = true,
}) => {
  const { resolvedTheme } = useTheme();

  // Select exact profile image asset according to active theme
  const profileImageSrc =
    resolvedTheme === "dark" ? "/brand/aayan-dark.jpg" : "/brand/aayan-light.jpg";

  const config = SIZE_CLASSES[size] || SIZE_CLASSES.lg;

  return (
    <div className={`relative shrink-0 select-none inline-block ${className}`}>
      {/* Profile Image Container with subtle theme-aware border & elevation */}
      <div
        className={`relative ${config.container} aspect-square overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-zinc-700/80 bg-zinc-100 dark:bg-zinc-900 shadow-sm transition-all duration-200`}
      >
        <img
          src={profileImageSrc}
          alt={`${CREATOR_INFO.name} — Creator of DashCraft`}
          width={config.dimension}
          height={config.dimension}
          loading="eager"
          className="h-full w-full object-cover transition-opacity duration-200"
        />
      </div>

      {/* Online / Active Status Badge */}
      {showBadge && (
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-4.5 sm:w-4.5 items-center justify-center rounded-full border-2 border-white dark:border-zinc-900 bg-emerald-500 shadow-xs"
          title="Creator Verified"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        </span>
      )}
    </div>
  );
};

export default CreatorProfile;
