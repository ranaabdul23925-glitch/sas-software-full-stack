import { cookies, headers } from "next/headers";
import type { Client, MembershipRole } from "@prisma/client";
import { prisma } from "@/lib/db";
import { CLIENT_COOKIE, WORKSPACE_COOKIE } from "@/lib/constants";
import { auth } from "@/lib/auth";

export type WorkspaceOption = {
  id: string;
  name: string;
  isDemo: boolean;
  onboardingCompleted: boolean;
  campaignObjective: string | null;
  currency: string;
  country: string | null;
  organizationId: string;
  organizationName: string;
  role: MembershipRole;
  clients: Client[];
  createdAt: Date;
  updatedAt: Date;
};

export type TenantContext = {
  session: NonNullable<Awaited<ReturnType<typeof getSession>>>;
  workspaces: WorkspaceOption[];
  workspace: WorkspaceOption | null;
  client: Client | null;
};

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }
  return session;
}

export async function getTenantContext() {
  const session = await requireSession();
  if (!session?.user) return null;

  const cookieStore = await cookies();
  const memberships = await prisma.membership.findMany({
    where: { userId: session.user.id },
    include: {
      organization: {
        include: {
          workspaces: {
            orderBy: { createdAt: "asc" },
            include: {
              clients: { orderBy: { name: "asc" } },
            },
          },
        },
      },
    },
  });

  const workspaces: WorkspaceOption[] = memberships.flatMap((membership) =>
    membership.organization.workspaces.map((workspace) => ({
      ...workspace,
      organizationName: membership.organization.name,
      organizationId: membership.organization.id,
      role: membership.role,
    })),
  );

  if (workspaces.length === 0) {
    return { session, workspaces, workspace: null, client: null } satisfies TenantContext;
  }

  const requestedId = cookieStore.get(WORKSPACE_COOKIE)?.value;
  const workspace = workspaces.find((item) => item.id === requestedId) ?? workspaces[0];
  const requestedClient = cookieStore.get(CLIENT_COOKIE)?.value;
  const client = workspace.clients.find((item) => item.id === requestedClient) ?? null;

  return { session, workspaces, workspace, client } satisfies TenantContext;
}
