import { prisma } from "@/lib/db";
import { demoClients, demoOpportunities } from "@/lib/demo/metrics";

export async function provisionTenant(user: { id: string; name: string; email: string }, opts?: { demo?: boolean }) {
  const existing = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { organization: { include: { workspaces: true } } },
  });
  if (existing) {
    return existing.organization.workspaces[0] ?? null;
  }

  const orgName = opts?.demo ? `${user.name}'s Demo Agency` : `${user.name}'s Organization`;
  const workspaceName = opts?.demo ? "Demo Workspace" : "Primary Workspace";

  const organization = await prisma.organization.create({
    data: {
      name: orgName,
      memberships: {
        create: { userId: user.id, role: "OWNER" },
      },
      workspaces: {
        create: {
          name: workspaceName,
          isDemo: Boolean(opts?.demo),
          onboardingCompleted: Boolean(opts?.demo),
          campaignObjective: opts?.demo ? "Sales" : null,
          country: "United States",
          currency: "USD",
        },
      },
    },
    include: { workspaces: true },
  });

  const workspace = organization.workspaces[0];
  if (!workspace) return null;

  if (opts?.demo) {
    await seedDemoWorkspace(workspace.id, user.id, organization.id);
  }

  await prisma.activityLog.create({
    data: {
      action: opts?.demo ? "demo_workspace_created" : "organization_created",
      userId: user.id,
      organizationId: organization.id,
      workspaceId: workspace.id,
    },
  });

  return workspace;
}

export async function seedDemoWorkspace(workspaceId: string, userId: string, organizationId: string) {
  const existingClients = await prisma.client.count({ where: { workspaceId } });
  if (existingClients === 0) {
    for (const client of demoClients) {
      await prisma.client.create({
        data: {
          name: client.name,
          industry: client.industry,
          website: client.website,
          status: client.status,
          workspaceId,
          brand: {
            create: {
              businessName: client.name,
              industry: client.industry,
              website: client.website,
              country: "United States",
              currency: "USD",
              brandDescription: `Sample brand profile for ${client.name}. Labeled demo data — not a live Meta advertiser.`,
              workspaceId,
            },
          },
        },
      });
    }

    await prisma.brand.create({
      data: {
        businessName: "AdForge Demo Agency",
        businessType: "Agency",
        industry: "Digital Marketing",
        website: "https://adforge.example",
        country: "United States",
        currency: "USD",
        brandDescription: "Agency demo brand used to explore the operating system with labeled sample data.",
        workspaceId,
      },
    });

    await prisma.product.create({
      data: {
        name: "Meta Ads Operating System",
        description: "Single workspace for creative, launch, test, and optimize workflows.",
        price: "From $79/mo",
        offer: "Start free, no performance guarantees",
        benefits: "One workflow from idea to optimization",
        features: "Dashboard, clients, brand setup, demo insights",
        landingPage: "https://adforge.example",
        workspaceId,
      },
    });

    await prisma.audience.create({
      data: {
        country: "United States",
        region: "California",
        city: "Los Angeles",
        ageMin: 25,
        ageMax: 54,
        gender: "All",
        language: "English",
        interests: "Digital marketing, e-commerce, local services",
        workspaceId,
      },
    });
  }

  const existingOpps = await prisma.optimizationOpportunity.count({ where: { workspaceId } });
  if (existingOpps === 0) {
    await prisma.optimizationOpportunity.createMany({
      data: demoOpportunities.map((opp) => ({
        id: `${workspaceId}_${opp.id}`,
        title: opp.title,
        reason: opp.reason,
        recommendation: opp.recommendation,
        type: opp.type,
        workspaceId,
        userId,
      })),
    });
  }

  const existingNotes = await prisma.notification.count({ where: { workspaceId, userId } });
  if (existingNotes === 0) {
    await prisma.notification.create({
      data: {
        title: "You are in a Demo Workspace",
        body: "All performance figures are labeled sample data and are not from a live Meta ad account.",
        workspaceId,
        userId,
      },
    });
  }

  await prisma.activityLog.create({
    data: {
      action: "demo_data_seeded",
      metadata: "Labeled sample metrics only",
      userId,
      organizationId,
      workspaceId,
    },
  });
}
