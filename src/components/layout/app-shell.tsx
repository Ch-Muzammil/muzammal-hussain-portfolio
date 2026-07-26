"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROLE_LABEL, type UserRole } from "@/config/roles";
import { ROLE_NAV } from "@/config/nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar";
import { Separator } from "@/components/ui/Separator";
import { SignOutLink } from "./sign-out-link";

type AppShellProps = {
  role: UserRole;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  /** Default sidebar open on desktop */
  defaultSidebarOpen?: boolean;
};

/**
 * Shared role dashboard shell — shadcn Sidebar + AppHeader.
 *
 * HOW TO USE:
 *   <AppShell role="admin" title="Users" description="Manage accounts">
 *     {children}
 *   </AppShell>
 */
export function AppShell({
  role,
  title,
  description,
  actions,
  children,
  defaultSidebarOpen = true,
}: AppShellProps) {
  const pathname = usePathname();
  const items = ROLE_NAV[role];

  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<Link href={`/${role}`} />}>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Base App</span>
                  <span className="text-xs text-muted-foreground">
                    {ROLE_LABEL[role]}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.label}
                        render={<Link href={item.href} />}
                      >
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-2 py-1.5 text-sm">
                <SignOutLink />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-6">
          <SidebarTrigger className="-ml-1" />
          {title ? (
            <>
              <Separator orientation="vertical" className="mr-1 h-4" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{title}</p>
                {description ? (
                  <p className="truncate text-xs text-muted-foreground">
                    {description}
                  </p>
                ) : null}
              </div>
            </>
          ) : (
            <div className="flex-1" />
          )}
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

/** Optional visual divider for shell sections */
export function AppShellSeparator({ className }: { className?: string }) {
  return <Separator className={className} />;
}
