"use client";

import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AppHeader, type HeaderNotification } from "@/components/shell/app-header";
import { AppSidebar } from "@/components/shell/app-sidebar";
import type { Client, MembershipRole } from "@prisma/client";

type WorkspaceOption = {
  id: string;
  name: string;
  isDemo: boolean;
  organizationName: string;
  role: MembershipRole;
  clients: Client[];
};

export function AppShell({
  children,
  userName,
  userEmail,
  workspaces,
  workspaceId,
  clientId,
  rangeId,
  notifications,
}: {
  children: ReactNode;
  userName: string;
  userEmail: string;
  workspaces: WorkspaceOption[];
  workspaceId: string;
  clientId: string | null;
  rangeId: string;
  notifications: HeaderNotification[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 md:block">
        <div className="sticky top-0 h-screen">
          <AppSidebar />
        </div>
      </aside>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showClose={false}
          className="left-0 top-0 h-screen w-64 max-w-none translate-x-0 translate-y-0 rounded-none p-0 sm:rounded-none"
        >
          <DialogTitle className="sr-only">Workspace navigation</DialogTitle>
          <AppSidebar onNavigate={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          userName={userName}
          userEmail={userEmail}
          workspaces={workspaces}
          workspaceId={workspaceId}
          clientId={clientId}
          rangeId={rangeId}
          onOpenSidebar={() => setOpen(true)}
          notifications={notifications}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
