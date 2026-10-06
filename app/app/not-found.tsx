import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/system/empty-state";

export default function AppNotFound() {
  return (
    <EmptyState
      title="Not found"
      description="This client or page is not in the current workspace."
      action={
        <Button asChild>
          <Link href="/app">Back to Overview</Link>
        </Button>
      }
    />
  );
}
