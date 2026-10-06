"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ChartNoAxesCombined,
  CreditCard,
  FileBarChart,
  FlaskConical,
  Gauge,
  Images,
  LayoutDashboard,
  Megaphone,
  Plug,
  Settings,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { APP_NAME, SIDEBAR_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Megaphone,
  Sparkles,
  Images,
  FlaskConical,
  Gauge,
  ChartNoAxesCombined,
  FileBarChart,
  Users,
  Briefcase,
  Plug,
  Workflow,
  CreditCard,
  Settings,
};

function isActive(pathname: string, href: string) {
  if (href === "/app") return pathname === "/app";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Link href="/app" onClick={onNavigate} className="font-semibold tracking-tight">
          {APP_NAME}
        </Link>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = ICONS[item.icon] ?? LayoutDashboard;
          const active = isActive(pathname, item.href);
          const later = item.phase > 1 && !["/app/clients", "/app/integrations", "/app/settings"].includes(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground",
                active && "bg-sidebar-accent text-sidebar-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {later ? <span className="text-[10px] uppercase tracking-wide opacity-60">Later</span> : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
