import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./avatar";

export type UserAvatarProps = {
  src?: string | null;
  alt?: string;
  /** Initials / fallback text */
  fallback?: string;
  name?: string;
  size?: "sm" | "default" | "lg";
  badge?: React.ReactNode;
  className?: string;
};

function initialsFrom(name?: string, fallback?: string) {
  if (fallback) return fallback.slice(0, 2).toUpperCase();
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

/**
 * Convenient avatar with image + initials + optional badge.
 *
 * HOW TO USE:
 *   <UserAvatar name="Ayesha Khan" src="/a.jpg" size="lg" />
 */
export function UserAvatar({
  src,
  alt,
  fallback,
  name,
  size = "default",
  badge,
  className,
}: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      {src ? <AvatarImage src={src} alt={alt ?? name ?? "Avatar"} /> : null}
      <AvatarFallback>{initialsFrom(name, fallback)}</AvatarFallback>
      {badge ? <AvatarBadge>{badge}</AvatarBadge> : null}
    </Avatar>
  );
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
};
