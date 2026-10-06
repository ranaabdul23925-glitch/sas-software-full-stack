import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/system/page-header";

export function ComingSoon({
  title,
  phase,
  description,
}: {
  title: string;
  phase: number;
  description: string;
}) {
  return (
    <div>
      <PageHeader title={title} description="This module is intentionally incomplete in Phase 1." />
      <Card>
        <CardHeader>
          <Badge variant="secondary">Coming in Phase {phase}</Badge>
          <CardTitle className="pt-2">{title}</CardTitle>
          <CardDescription>{description} No fake Meta data or success states are shown here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/app">Back to Overview</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
