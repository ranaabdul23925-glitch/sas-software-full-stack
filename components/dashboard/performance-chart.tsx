"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SparkPoint } from "@/lib/demo/metrics";

export function PerformanceChart({ data }: { data: SparkPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" name="Spend (demo)" fill="currentColor" fillOpacity={0.12} stroke="currentColor" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
