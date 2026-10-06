import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { RANGE_COOKIE } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const ctx = await getTenantContext();
  if (!ctx?.session?.user) redirect("/login");
  if (!ctx.workspace) redirect("/onboarding");
  if (!ctx.workspace.onboardingCompleted && !ctx.workspace.isDemo) redirect("/onboarding");

  const rangeId = (await cookies()).get(RANGE_COOKIE)?.value ?? "30d";
  const notifications = await prisma.notification.findMany({
    where: { userId: ctx.session.user.id, workspaceId: ctx.workspace.id },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <AppShell
      userName={ctx.session.user.name}
      userEmail={ctx.session.user.email}
      workspaces={ctx.workspaces}
      workspaceId={ctx.workspace.id}
      clientId={ctx.client?.id ?? null}
      rangeId={rangeId}
      notifications={notifications.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
        read: item.read,
      }))}
    >
      {children}
    </AppShell>
  );
}
