"use client";

import { updateOpportunityStatus } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { OptimizationOpportunity } from "@prisma/client";

export function OpportunityList({ items }: { items: OptimizationOpportunity[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No open opportunities in this workspace.</p>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <Badge variant="secondary">{item.type}</Badge>
            <CardTitle className="text-base">{item.title}</CardTitle>
            <CardDescription>{item.reason}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">Recommended: {item.recommendation}</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => void updateOpportunityStatus(item.id, "REVIEWED")}>
                Review
              </Button>
              <Button size="sm" variant="outline" onClick={() => void updateOpportunityStatus(item.id, "IGNORED")}>
                Ignore
              </Button>
              <Button size="sm" variant="outline" onClick={() => void updateOpportunityStatus(item.id, "SNOOZED")}>
                Snooze
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
