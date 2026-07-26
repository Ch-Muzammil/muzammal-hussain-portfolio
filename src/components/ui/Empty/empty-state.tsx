import { type ReactNode } from "react";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";

export type EmptyStateProps = {
  title?: ReactNode;
  description?: ReactNode;
  /** Icon or custom media. Default: Inbox */
  icon?: ReactNode;
  mediaVariant?: "default" | "icon";
  /** Actions (buttons) under the description */
  action?: ReactNode;
  className?: string;
  bordered?: boolean;
};

/**
 * One-shot empty state built on shadcn Empty primitives.
 *
 * HOW TO USE:
 *   <EmptyState title="No users" description="Invite someone to get started." action={<Button>Invite</Button>} />
 */
export function EmptyState({
  title = "No results",
  description,
  icon,
  mediaVariant = "icon",
  action,
  className,
  bordered = true,
}: EmptyStateProps) {
  return (
    <Empty className={cn(bordered && "border", className)}>
      <EmptyHeader>
        <EmptyMedia variant={mediaVariant}>
          {icon ?? <InboxIcon />}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description ? (
          <EmptyDescription>{description}</EmptyDescription>
        ) : null}
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  );
}
