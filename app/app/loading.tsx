import { MetricCardSkeleton } from "@/components/system/metric-card";

export default function AppLoading() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <MetricCardSkeleton key={index} />
      ))}
    </div>
  );
}
