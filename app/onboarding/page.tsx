import Link from "next/link";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { prisma } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";
import { APP_NAME } from "@/lib/constants";

export default async function OnboardingPage() {
  const ctx = await getTenantContext();
  if (!ctx?.session?.user || !ctx.workspace) redirect("/login");
  if (ctx.workspace.onboardingCompleted || ctx.workspace.isDemo) redirect("/app");

  const [brand, product, audience] = await Promise.all([
    prisma.brand.findFirst({ where: { workspaceId: ctx.workspace.id, clientId: null } }),
    prisma.product.findFirst({ where: { workspaceId: ctx.workspace.id, clientId: null } }),
    prisma.audience.findFirst({ where: { workspaceId: ctx.workspace.id, clientId: null } }),
  ]);

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10">
      <Link href="/" className="mb-6 font-semibold">
        {APP_NAME}
      </Link>
      <OnboardingWizard
        brand={brand}
        product={product}
        audience={audience}
        campaignObjective={ctx.workspace.campaignObjective}
      />
    </div>
  );
}
