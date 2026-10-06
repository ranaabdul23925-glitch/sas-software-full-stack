import Link from "next/link";
import { redirect } from "next/navigation";
import { ClientForm } from "@/components/clients/client-form";
import { DemoBanner } from "@/components/system/demo-banner";
import { EmptyState } from "@/components/system/empty-state";
import { PageHeader } from "@/components/system/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTenantContext } from "@/lib/tenant";

export default async function ClientsPage() {
  const ctx = await getTenantContext();
  if (!ctx?.workspace) redirect("/login");
  const clients = ctx.workspace.clients;

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Agency / multi-client mode. Each client is isolated to this workspace."
        actions={<ClientForm trigger={<Button>Add client</Button>} />}
      />
      <DemoBanner visible={ctx.workspace.isDemo} />
      {clients.length === 0 ? (
        <EmptyState
          title="No clients in this workspace"
          description="Add a client to separate campaigns, creatives, and reporting later."
          action={<ClientForm trigger={<Button>Add client</Button>} />}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">
                  <Link className="underline-offset-4 hover:underline" href={`/app/clients/${client.id}`}>
                    {client.name}
                  </Link>
                </TableCell>
                <TableCell>{client.industry ?? "—"}</TableCell>
                <TableCell>{client.website ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant={client.status === "ACTIVE" ? "success" : "warning"}>{client.status}</Badge>
                </TableCell>
                <TableCell>
                  <ClientForm client={client} trigger={<Button size="sm" variant="outline">Edit</Button>} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
