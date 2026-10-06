import { redirect } from "next/navigation";
import { DemoBanner } from "@/components/system/demo-banner";
import { PageHeader } from "@/components/system/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTenantContext } from "@/lib/tenant";

export default async function IntegrationsPage() {
  const ctx = await getTenantContext();
  if (!ctx?.workspace) redirect("/login");

  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Meta connection is not available in Phase 1. Status is honest: Not Connected."
      />
      <DemoBanner visible={ctx.workspace.isDemo} />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Meta Ads</CardTitle>
            <Badge variant="warning">Not Connected</Badge>
          </div>
          <CardDescription>
            OAuth, token storage, account discovery, and publishing ship in Phase 4. This card never shows a fake Connected state.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>Meta Business: —</p>
          <p>Ad Account: —</p>
          <p>Facebook Page: —</p>
          <p>Instagram: —</p>
          <p>Last sync: never</p>
          <Button disabled>Connect Meta Ads Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
