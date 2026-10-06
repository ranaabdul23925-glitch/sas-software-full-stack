"use client";

import { useRouter } from "next/navigation";
import { Bell, HelpCircle, Menu, Search } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { setClientCookie, setRangeCookie, setWorkspaceCookie } from "@/lib/actions";
import { DATE_RANGES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import type { Client, MembershipRole } from "@prisma/client";

type WorkspaceOption = {
  id: string;
  name: string;
  isDemo: boolean;
  organizationName: string;
  role: MembershipRole;
  clients: Client[];
};

export type HeaderNotification = {
  id: string;
  title: string;
  body: string;
  read: boolean;
};

export function AppHeader({
  userName,
  userEmail,
  workspaces,
  workspaceId,
  clientId,
  rangeId,
  onOpenSidebar,
  notifications,
}: {
  userName: string;
  userEmail: string;
  workspaces: WorkspaceOption[];
  workspaceId: string;
  clientId: string | null;
  rangeId: string;
  onOpenSidebar: () => void;
  notifications: HeaderNotification[];
}) {
  const router = useRouter();
  const workspace = workspaces.find((item) => item.id === workspaceId);
  const selectedClient = workspace?.clients.find((item) => item.id === clientId);

  async function signOut() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 px-3 py-2 backdrop-blur md:px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpenSidebar} aria-label="Open navigation">
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <Select
            value={workspaceId}
            onValueChange={(value) => {
              void setWorkspaceCookie(value).then(() => router.refresh());
            }}
          >
            <SelectTrigger className="h-8 w-[140px] sm:w-[180px]" aria-label="Workspace">
              <SelectValue placeholder="Workspace" />
            </SelectTrigger>
            <SelectContent>
              {workspaces.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {workspace?.isDemo ? <Badge variant="demo">Demo Workspace</Badge> : null}
          <Select
            value={clientId ?? "all"}
            onValueChange={(value) => {
              void setClientCookie(value).then(() => router.refresh());
            }}
          >
            <SelectTrigger className="h-8 w-[140px] sm:w-[180px]" aria-label="Client">
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All clients</SelectItem>
              {(workspace?.clients ?? []).map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative hidden lg:block">
          <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <Input className="h-8 w-44 pl-8 xl:w-56" placeholder="Search (UI only)" />
        </div>
        <Select
            value={rangeId}
            onValueChange={(value) => {
              void setRangeCookie(value).then(() => router.refresh());
            }}
          >
            <SelectTrigger className="h-8 w-[130px] md:w-[140px]" aria-label="Date range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <p className="px-2 py-3 text-sm text-muted-foreground">No notifications in this workspace.</p>
            ) : (
              notifications.map((item) => (
                <div key={item.id} className="px-2 py-2 text-sm">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground">{item.body}</p>
                </div>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Help</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <p className="px-2 py-2 text-sm text-muted-foreground">
              Demo figures are labeled sample data, not live Meta. Connecting an ad account is Phase 4. We never guarantee CPR, CPA, or ROAS.
            </p>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="max-w-32 truncate">
              {userName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/app/settings")}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => void signOut()}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mt-1 truncate text-xs text-muted-foreground">
        {workspace?.organizationName} · {workspace?.name}
        {selectedClient ? ` · ${selectedClient.name}` : " · All clients"}
      </p>
    </header>
  );
}
