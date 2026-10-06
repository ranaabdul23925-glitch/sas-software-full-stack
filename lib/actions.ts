"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OpportunityStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getTenantContext, type TenantContext } from "@/lib/tenant";
import { seedDemoWorkspace } from "@/lib/provision";
import {
  CLIENT_COOKIE,
  RANGE_COOKIE,
  WORKSPACE_COOKIE,
} from "@/lib/constants";
import {
  audienceSchema,
  brandSchema,
  clientSchema,
  productSchema,
  workspaceSettingsSchema,
} from "@/lib/validations";

type ReadyTenant = TenantContext & { workspace: NonNullable<TenantContext["workspace"]> };

async function requireWorkspace(): Promise<ReadyTenant> {
  const ctx = await getTenantContext();
  if (!ctx?.session?.user || !ctx.workspace) {
    redirect("/login");
  }
  return ctx as ReadyTenant;
}

export async function setWorkspaceCookie(workspaceId: string) {
  const ctx = await requireWorkspace();
  const allowed = ctx.workspaces.some((w) => w.id === workspaceId);
  if (!allowed) return { error: "Workspace not found." };
  const store = await cookies();
  store.set(WORKSPACE_COOKIE, workspaceId, { path: "/", sameSite: "lax" });
  store.delete(CLIENT_COOKIE);
  revalidatePath("/app");
}

export async function setClientCookie(clientId: string) {
  const ctx = await requireWorkspace();
  const store = await cookies();
  if (clientId === "all") {
    store.delete(CLIENT_COOKIE);
  } else {
    const allowed = ctx.workspace.clients.some((c) => c.id === clientId);
    if (!allowed) return { error: "Client not found in this workspace." };
    store.set(CLIENT_COOKIE, clientId, { path: "/", sameSite: "lax" });
  }
  revalidatePath("/app");
}

export async function setRangeCookie(rangeId: string) {
  const store = await cookies();
  store.set(RANGE_COOKIE, rangeId, { path: "/", sameSite: "lax" });
  revalidatePath("/app");
}

export async function activateDemoWorkspace() {
  const ctx = await requireWorkspace();
  const workspace = await prisma.workspace.update({
    where: { id: ctx.workspace.id },
    data: {
      isDemo: true,
      onboardingCompleted: true,
      name: ctx.workspace.isDemo ? ctx.workspace.name : "Demo Workspace",
    },
  });
  await seedDemoWorkspace(workspace.id, ctx.session.user.id, ctx.workspace.organizationId);
  revalidatePath("/app");
  redirect("/app");
}

export async function saveOnboardingStep(step: number, formData: FormData) {
  const ctx = await requireWorkspace();
  const workspaceId = ctx.workspace.id;
  const organizationId = ctx.workspace.organizationId;
  const clientId = ctx.client?.id ?? null;

  if (step === 1) {
    const parsed = brandSchema.safeParse({
      businessName: formData.get("businessName"),
      businessType: formData.get("businessType") ?? "",
      industry: formData.get("industry") ?? "",
      website: formData.get("website") ?? "",
      country: formData.get("country") ?? "",
      currency: formData.get("currency") ?? "USD",
      brandDescription: formData.get("brandDescription") ?? "",
    });
    if (!parsed.success) return { error: "Check the business fields and try again." };
    const existing = await prisma.brand.findFirst({
      where: { workspaceId, clientId },
    });
    const data = {
      ...parsed.data,
      workspaceId,
      clientId,
    };
    if (existing) {
      await prisma.brand.update({ where: { id: existing.id }, data });
    } else {
      await prisma.brand.create({ data });
    }
    await prisma.workspace.update({
      where: { id: workspaceId },
      data: { country: parsed.data.country || undefined, currency: parsed.data.currency || "USD" },
    });
  }

  if (step === 2) {
    const parsed = productSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description") ?? "",
      price: formData.get("price") ?? "",
      offer: formData.get("offer") ?? "",
      benefits: formData.get("benefits") ?? "",
      features: formData.get("features") ?? "",
      landingPage: formData.get("landingPage") ?? "",
      whatsappNumber: formData.get("whatsappNumber") ?? "",
    });
    if (!parsed.success) return { error: "Check the product fields and try again." };
    const existing = await prisma.product.findFirst({ where: { workspaceId, clientId } });
    if (existing) {
      await prisma.product.update({ where: { id: existing.id }, data: parsed.data });
    } else {
      await prisma.product.create({ data: { ...parsed.data, workspaceId, clientId } });
    }
  }

  if (step === 3) {
    const parsed = audienceSchema.safeParse({
      country: formData.get("country") ?? "",
      region: formData.get("region") ?? "",
      city: formData.get("city") ?? "",
      ageMin: formData.get("ageMin") ?? "",
      ageMax: formData.get("ageMax") ?? "",
      gender: formData.get("gender") ?? "",
      language: formData.get("language") ?? "",
      interests: formData.get("interests") ?? "",
      customAudience: formData.get("customAudience") ?? "",
      lookalikeAudience: formData.get("lookalikeAudience") ?? "",
    });
    if (!parsed.success) return { error: "Check the audience fields and try again." };
    const ageMin = parsed.data.ageMin ? Number(parsed.data.ageMin) : null;
    const ageMax = parsed.data.ageMax ? Number(parsed.data.ageMax) : null;
    const existing = await prisma.audience.findFirst({ where: { workspaceId, clientId } });
    const data = {
      country: parsed.data.country || null,
      region: parsed.data.region || null,
      city: parsed.data.city || null,
      ageMin: Number.isFinite(ageMin) ? ageMin : null,
      ageMax: Number.isFinite(ageMax) ? ageMax : null,
      gender: parsed.data.gender || null,
      language: parsed.data.language || null,
      interests: parsed.data.interests || null,
      customAudience: parsed.data.customAudience || null,
      lookalikeAudience: parsed.data.lookalikeAudience || null,
      workspaceId,
      clientId,
    };
    if (existing) {
      await prisma.audience.update({ where: { id: existing.id }, data });
    } else {
      await prisma.audience.create({ data });
    }
  }

  if (step === 4) {
    const objective = String(formData.get("campaignObjective") ?? "");
    if (!objective) return { error: "Select a campaign objective." };
    await prisma.workspace.update({
      where: { id: workspaceId },
      data: { campaignObjective: objective },
    });
  }

  if (step === 5) {
    await prisma.workspace.update({
      where: { id: workspaceId },
      data: { onboardingCompleted: true },
    });
    await prisma.activityLog.create({
      data: {
        action: "onboarding_completed",
        metadata: "Meta remains Not Connected until Phase 4",
        userId: ctx.session.user.id,
        organizationId,
        workspaceId,
      },
    });
    revalidatePath("/app");
    redirect("/app");
  }

  revalidatePath("/onboarding");
  return { ok: true };
}

export async function upsertClient(formData: FormData) {
  const ctx = await requireWorkspace();
  const parsed = clientSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    industry: formData.get("industry") ?? "",
    website: formData.get("website") ?? "",
    status: formData.get("status") ?? "ACTIVE",
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) return { error: "Client details are invalid." };

  if (parsed.data.id) {
    const existing = await prisma.client.findFirst({
      where: { id: parsed.data.id, workspaceId: ctx.workspace.id },
    });
    if (!existing) return { error: "Client not found in this workspace." };
    await prisma.client.update({
      where: { id: existing.id },
      data: {
        name: parsed.data.name,
        industry: parsed.data.industry || null,
        website: parsed.data.website || null,
        status: parsed.data.status,
        notes: parsed.data.notes || null,
      },
    });
  } else {
    await prisma.client.create({
      data: {
        name: parsed.data.name,
        industry: parsed.data.industry || null,
        website: parsed.data.website || null,
        status: parsed.data.status,
        notes: parsed.data.notes || null,
        workspaceId: ctx.workspace.id,
      },
    });
  }

  await prisma.activityLog.create({
    data: {
      action: parsed.data.id ? "client_updated" : "client_created",
      userId: ctx.session.user.id,
      organizationId: ctx.workspace.organizationId,
      workspaceId: ctx.workspace.id,
    },
  });

  revalidatePath("/app/clients");
  return { ok: true };
}

export async function saveBrandSettings(formData: FormData) {
  const ctx = await requireWorkspace();
  const parsed = brandSchema.safeParse({
    businessName: formData.get("businessName"),
    businessType: formData.get("businessType") ?? "",
    industry: formData.get("industry") ?? "",
    website: formData.get("website") ?? "",
    country: formData.get("country") ?? "",
    currency: formData.get("currency") ?? "USD",
    brandDescription: formData.get("brandDescription") ?? "",
  });
  if (!parsed.success) return { error: "Brand details are invalid." };

  const existing = await prisma.brand.findFirst({
    where: { workspaceId: ctx.workspace.id, clientId: ctx.client?.id ?? null },
  });
  if (existing) {
    await prisma.brand.update({ where: { id: existing.id }, data: parsed.data });
  } else {
    await prisma.brand.create({
      data: { ...parsed.data, workspaceId: ctx.workspace.id, clientId: ctx.client?.id ?? null },
    });
  }
  revalidatePath("/app/settings");
  return { ok: true };
}

export async function saveWorkspaceSettings(formData: FormData) {
  const ctx = await requireWorkspace();
  const parsed = workspaceSettingsSchema.safeParse({
    organizationName: formData.get("organizationName"),
    workspaceName: formData.get("workspaceName"),
  });
  if (!parsed.success) return { error: "Names are required." };
  await prisma.organization.update({
    where: { id: ctx.workspace.organizationId },
    data: { name: parsed.data.organizationName },
  });
  await prisma.workspace.update({
    where: { id: ctx.workspace.id },
    data: { name: parsed.data.workspaceName },
  });
  revalidatePath("/app/settings");
  return { ok: true };
}

export async function updateOpportunityStatus(id: string, status: OpportunityStatus) {
  const ctx = await requireWorkspace();
  const opp = await prisma.optimizationOpportunity.findFirst({
    where: { id, workspaceId: ctx.workspace.id },
  });
  if (!opp) return { error: "Opportunity not found." };
  await prisma.optimizationOpportunity.update({
    where: { id },
    data: {
      status,
      snoozedUntil: status === "SNOOZED" ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null,
    },
  });
  await prisma.activityLog.create({
    data: {
      action: `opportunity_${status.toLowerCase()}`,
      metadata: opp.title,
      userId: ctx.session.user.id,
      organizationId: ctx.workspace.organizationId,
      workspaceId: ctx.workspace.id,
    },
  });
  revalidatePath("/app");
}

export async function createWorkspace(formData: FormData) {
  const ctx = await requireWorkspace();
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) return { error: "Workspace name is required." };
  const workspace = await prisma.workspace.create({
    data: {
      name,
      organizationId: ctx.workspace.organizationId,
    },
  });
  const store = await cookies();
  store.set(WORKSPACE_COOKIE, workspace.id, { path: "/", sameSite: "lax" });
  revalidatePath("/app");
  redirect("/onboarding");
}
