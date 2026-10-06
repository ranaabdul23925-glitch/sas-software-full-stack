import { Badge } from "@/components/ui/badge";
import { DEMO_NOTICE } from "@/lib/constants";

export function DemoBanner({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-amber-300/70 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
      <Badge variant="demo">Demo Workspace</Badge>
      <span>{DEMO_NOTICE}. Figures are sample data for exploring the product.</span>
    </div>
  );
}
