import { redirect } from "next/navigation";
import { DemoBanner } from "@/components/system/demo-banner";
import { PageHeader } from "@/components/system/page-header";
import { SettingsForms } from "@/components/settings/settings-forms";
import { prisma } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";

export default async function SettingsPage() {
  const ctx = await getTenantContext();
  if (!ctx?.workspace) redirect("/login");

  const brand = await prisma.brand.findFirst({
    where: { workspaceId: ctx.workspace.id, clientId: ctx.client?.id ?? null },
  });

  return (
    <div>
      <PageHeader title="Settings" description="Organization, workspace, brand, and profile." />
      <DemoBanner visible={ctx.workspace.isDemo} />
      <SettingsForms
        organizationName={ctx.workspace.organizationName}
        workspaceName={ctx.workspace.name}
        userName={ctx.session.user.name}
        userEmail={ctx.session.user.email}
        role={ctx.workspace.role}
        brand={brand}
      />
    </div>
  );
}
