import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DemoBanner } from "@/components/system/demo-banner";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { EmptyState } from "@/components/system/empty-state";
import { MetricCard } from "@/components/system/metric-card";
import { PageHeader } from "@/components/system/page-header";
import { OpportunityList } from "@/components/dashboard/opportunity-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DATE_RANGES, RANGE_COOKIE } from "@/lib/constants";
import { scaleDemoForRange } from "@/lib/demo/metrics";
import { prisma } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export default async function DashboardPage() {
  const ctx = await getTenantContext();
  if (!ctx?.workspace) redirect("/login");

  const rangeId = (await cookies()).get(RANGE_COOKIE)?.value ?? "30d";
  const range = DATE_RANGES.find((item) => item.id === rangeId) ?? DATE_RANGES[2];
  const isDemo = ctx.workspace.isDemo;
  const clientFilter = ctx.client;

  const opportunities = isDemo
    ? await prisma.optimizationOpportunity.findMany({
        where: { workspaceId: ctx.workspace.id, status: "OPEN" },
        orderBy: { createdAt: "asc" },
      })
    : [];

  const clientCount = ctx.workspace.clients.length;
  const demo = scaleDemoForRange(range.days);
  const spendSeries = demo.kpis[0]?.series ?? [];

  return (
    <div>
      <PageHeader
        title="Overview"
        description={`Workspace: ${ctx.workspace.name}${clientFilter ? ` · Client: ${clientFilter.name}` : " · All clients"} · ${range.label}`}
        actions={
          <Button asChild variant="outline">
            <Link href="/app/clients">Manage clients</Link>
          </Button>
        }
      />
      <DemoBanner visible={isDemo} />
      {!isDemo ? (
        <EmptyState
          title="No live campaign metrics yet"
          description="Connect Meta in Phase 4 to pull spend, results, and creative performance. Until then this workspace stays empty instead of showing fake Meta data."
          action={
            <Button asChild>
              <Link href="/app/integrations">View integration status</Link>
            </Button>
          }
        />
      ) : (
        <>
          {clientFilter ? (
            <p className="mb-4 text-sm text-muted-foreground">
              Client scope is {clientFilter.name}. Sample KPIs below are workspace-level demo figures, still labeled as not live Meta.
            </p>
          ) : null}
          <p className="text-xs text-muted-foreground">
            Values scale with the header date range. Totals are labeled sample data, not live Meta.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {demo.kpis.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Performance overview</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <PerformanceChart data={spendSeries} />
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Campaign performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Objective</TableHead>
                    <TableHead>Spend</TableHead>
                    <TableHead>Results</TableHead>
                    <TableHead>CPR</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>CPC</TableHead>
                    <TableHead>CPM</TableHead>
                    <TableHead>ROAS</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demo.campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.objective}</TableCell>
                      <TableCell>{formatCurrency(campaign.spend)}</TableCell>
                      <TableCell>{formatNumber(campaign.results)}</TableCell>
                      <TableCell>{formatCurrency(campaign.cpr)}</TableCell>
                      <TableCell>{formatPercent(campaign.ctr)}</TableCell>
                      <TableCell>{formatCurrency(campaign.cpc)}</TableCell>
                      <TableCell>{formatCurrency(campaign.cpm)}</TableCell>
                      <TableCell>{campaign.roas ? `${campaign.roas.toFixed(2)}x` : "—"}</TableCell>
                      <TableCell>
                        <Badge variant={campaign.status === "Paused" ? "warning" : "secondary"}>{campaign.status}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        View · Edit · Pause — later phase
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <h2 className="mb-3 mt-8 text-lg font-semibold">Creative performance</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {demo.creatives.map((creative) => (
              <Card key={creative.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{creative.name}</CardTitle>
                    <Badge variant={creative.fatigue === "Fatigued" ? "destructive" : creative.fatigue === "Watch" ? "warning" : "success"}>
                      {creative.fatigue}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{creative.hook}</p>
                  <p>
                    {creative.format} · {creative.campaign}
                  </p>
                  <p>
                    Spend {formatCurrency(creative.spend)} · CTR {formatPercent(creative.ctr)} · CPR {formatCurrency(creative.cpr)} · Freq {creative.frequency.toFixed(1)}
                  </p>
                  <p>{creative.recommendation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <h2 className="mb-3 mt-8 text-lg font-semibold">Optimization opportunities</h2>
          <OpportunityList items={opportunities} />
        </>
      )}
      {!isDemo && clientCount === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No clients yet"
            description="Add a client to start agency-style isolation inside this workspace."
            action={
              <Button asChild>
                <Link href="/app/clients">Add a client</Link>
              </Button>
            }
          />
        </div>
      ) : null}
    </div>
  );
}
