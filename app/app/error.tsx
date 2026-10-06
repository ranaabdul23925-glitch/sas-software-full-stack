"use client";

import { ErrorState } from "@/components/system/empty-state";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="This screen failed to load"
      description={error.message || "An unexpected error occurred in the workspace."}
      onRetry={reset}
    />
  );
}
