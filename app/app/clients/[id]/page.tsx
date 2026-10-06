import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ClientForm } from "@/components/clients/client-form";
import { DemoBanner } from "@/components/system/demo-banner";
import { PageHeader } from "@/components/system/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await getTenantContext();
  if (!ctx?.workspace) redirect("/login");

  const client = await prisma.client.findFirst({
    where: { id, workspaceId: ctx.workspace.id },
    include: { brand: true, products: true, audiences: true },
  });
  if (!client) notFound();

  return (
    <div>
      <PageHeader
        title={client.name}
        description="Client workspace summary. Campaigns, creatives, and Meta sync are later phases."
        actions={<ClientForm client={client} trigger={<Button variant="outline">Edit</Button>} />}
      />
      <DemoBanner visible={ctx.workspace.isDemo} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Isolated to this workspace only.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Industry: {client.industry ?? "—"}</p>
            <p>Website: {client.website ?? "—"}</p>
            <p>
              Status: <Badge variant="secondary">{client.status}</Badge>
            </p>
            <p>Notes: {client.notes ?? "—"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Brand</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {client.brand ? (
              <div className="space-y-1 text-foreground">
                <p>{client.brand.businessName}</p>
                <p>{client.brand.industry}</p>
                <p>{client.brand.brandDescription}</p>
              </div>
            ) : (
              <p>No brand profile on this client yet. Add one from Settings while this client is selected.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        <Link className="underline" href="/app/clients">
          Back to clients
        </Link>
      </p>
    </div>
  );
}
