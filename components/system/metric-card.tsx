"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { deltaPercent, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import type { KpiMetric } from "@/lib/demo/metrics";

function formatValue(metric: KpiMetric) {
  if (metric.format === "currency") return formatCurrency(metric.value);
  if (metric.format === "percent") return formatPercent(metric.value);
  if (metric.format === "multiplier") return `${metric.value.toFixed(2)}x`;
  return formatNumber(metric.value);
}

export function MetricCard({ metric }: { metric: KpiMetric }) {
  const change = deltaPercent(metric.value, metric.previous);
  const up = change >= 0;
  const invert = metric.id === "cpr" || metric.id === "cpc" || metric.id === "cpm" || metric.id === "spend";
  const positive = invert ? !up : up;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground" title={metric.tooltip}>
              {metric.label}
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{formatValue(metric)}</p>
            <p className={`mt-1 text-xs ${positive ? "text-emerald-600" : "text-red-600"}`}>
              {up ? "+" : ""}
              {change.toFixed(1)}% vs previous period
            </p>
          </div>
          <div className="h-12 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metric.series}>
                <Area type="monotone" dataKey="value" stroke="currentColor" fill="currentColor" fillOpacity={0.12} strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricCardSkeleton() {
  return <div className="h-[108px] animate-pulse rounded-xl border bg-muted/50" />;
}
