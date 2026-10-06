export type SparkPoint = { day: string; value: number };

export type KpiMetric = {
  id: string;
  label: string;
  value: number;
  previous: number;
  format: "currency" | "number" | "percent" | "multiplier";
  series: SparkPoint[];
  tooltip: string;
};

export type DemoCampaign = {
  id: string;
  name: string;
  objective: string;
  spend: number;
  results: number;
  cpr: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
  status: "Active" | "Paused" | "Learning";
};

export type DemoCreative = {
  id: string;
  name: string;
  hook: string;
  format: string;
  campaign: string;
  spend: number;
  impressions: number;
  ctr: number;
  cpr: number;
  cpc: number;
  roas: number;
  frequency: number;
  fatigue: "Healthy" | "Watch" | "Fatigued";
  recommendation: string;
};

export type DemoOpportunity = {
  id: string;
  type: "fatigue" | "cpr" | "pattern";
  title: string;
  reason: string;
  recommendation: string;
};

function spark(base: number, variance: number): SparkPoint[] {
  return Array.from({ length: 14 }, (_, i) => ({
    day: `D${i + 1}`,
    value: Math.round((base + Math.sin(i / 2) * variance + (i % 3) * (variance / 4)) * 100) / 100,
  }));
}

export const demoKpis: KpiMetric[] = [
  {
    id: "spend",
    label: "Total Spend",
    value: 18420,
    previous: 16210,
    format: "currency",
    series: spark(1200, 180),
    tooltip: "Amount spent across selected workspace campaigns in the date range.",
  },
  {
    id: "results",
    label: "Results",
    value: 412,
    previous: 388,
    format: "number",
    series: spark(28, 6),
    tooltip: "Primary conversions or results attributed to ads.",
  },
  {
    id: "cpr",
    label: "Cost Per Result",
    value: 44.71,
    previous: 41.78,
    format: "currency",
    series: spark(42, 4),
    tooltip: "Spend divided by results (CPR / CPA).",
  },
  {
    id: "ctr",
    label: "CTR",
    value: 1.84,
    previous: 2.11,
    format: "percent",
    series: spark(1.9, 0.25),
    tooltip: "Click-through rate on ads.",
  },
  {
    id: "cpc",
    label: "CPC",
    value: 0.92,
    previous: 0.81,
    format: "currency",
    series: spark(0.88, 0.08),
    tooltip: "Average cost per click.",
  },
  {
    id: "cpm",
    label: "CPM",
    value: 16.4,
    previous: 15.2,
    format: "currency",
    series: spark(16, 1.4),
    tooltip: "Cost per 1,000 impressions.",
  },
  {
    id: "cvr",
    label: "Conversion Rate",
    value: 3.12,
    previous: 2.9,
    format: "percent",
    series: spark(3, 0.3),
    tooltip: "Results divided by clicks.",
  },
  {
    id: "roas",
    label: "ROAS",
    value: 2.46,
    previous: 2.71,
    format: "multiplier",
    series: spark(2.5, 0.2),
    tooltip: "Return on ad spend where purchase value is available.",
  },
];

export const demoCampaigns: DemoCampaign[] = [
  {
    id: "cmp_1",
    name: "Prospecting — Offer A",
    objective: "Sales",
    spend: 6420,
    results: 128,
    cpr: 50.16,
    ctr: 1.62,
    cpc: 0.98,
    cpm: 17.1,
    roas: 2.18,
    status: "Active",
  },
  {
    id: "cmp_2",
    name: "Retargeting — 30D Visitors",
    objective: "Sales",
    spend: 3180,
    results: 96,
    cpr: 33.13,
    ctr: 2.44,
    cpc: 0.71,
    cpm: 14.8,
    roas: 3.41,
    status: "Active",
  },
  {
    id: "cmp_3",
    name: "Lead Magnet — Audit",
    objective: "Leads",
    spend: 2740,
    results: 86,
    cpr: 31.86,
    ctr: 2.08,
    cpc: 0.84,
    cpm: 15.6,
    roas: 0,
    status: "Learning",
  },
  {
    id: "cmp_4",
    name: "Awareness — Brand Film",
    objective: "Awareness",
    spend: 2100,
    results: 42,
    cpr: 50,
    ctr: 0.91,
    cpc: 1.22,
    cpm: 12.4,
    roas: 0,
    status: "Paused",
  },
  {
    id: "cmp_5",
    name: "Catalog — Evergreen",
    objective: "Sales",
    spend: 3980,
    results: 60,
    cpr: 66.33,
    ctr: 1.41,
    cpc: 1.05,
    cpm: 18.2,
    roas: 1.72,
    status: "Active",
  },
];

export const demoCreatives: DemoCreative[] = [
  {
    id: "cr_1",
    name: "Founder UGC — Price Hook",
    hook: "Stop paying agencies for ads that don’t convert",
    format: "9:16",
    campaign: "Prospecting — Offer A",
    spend: 2140,
    impressions: 148200,
    ctr: 2.31,
    cpr: 38.2,
    cpc: 0.68,
    roas: 3.05,
    frequency: 1.8,
    fatigue: "Healthy",
    recommendation: "Scale budget and create headline variations.",
  },
  {
    id: "cr_2",
    name: "Before / After — Salon",
    hook: "Same chair. Different results in 21 days.",
    format: "4:5",
    campaign: "Retargeting — 30D Visitors",
    spend: 1680,
    impressions: 98200,
    ctr: 2.88,
    cpr: 29.4,
    cpc: 0.59,
    roas: 3.92,
    frequency: 2.4,
    fatigue: "Watch",
    recommendation: "Refresh hook; frequency is rising.",
  },
  {
    id: "cr_3",
    name: "Offer Stack — Static",
    hook: "Free audit + 14-day test plan",
    format: "1:1",
    campaign: "Lead Magnet — Audit",
    spend: 1540,
    impressions: 121400,
    ctr: 1.12,
    cpr: 61.6,
    cpc: 1.14,
    roas: 0,
    frequency: 3.6,
    fatigue: "Fatigued",
    recommendation: "Generate fresh creative variations.",
  },
  {
    id: "cr_4",
    name: "Social Proof — 4.9★",
    hook: "142 brands ran this workflow last quarter",
    format: "1.91:1",
    campaign: "Prospecting — Offer A",
    spend: 1220,
    impressions: 88400,
    ctr: 1.96,
    cpr: 41.1,
    cpc: 0.79,
    roas: 2.44,
    frequency: 1.5,
    fatigue: "Healthy",
    recommendation: "Duplicate into additional ad sets.",
  },
];

export const demoOpportunities: DemoOpportunity[] = [
  {
    id: "opp_fatigue",
    type: "fatigue",
    title: "Creative fatigue",
    reason: "Frequency increased while CTR declined on Offer Stack — Static.",
    recommendation: "Generate fresh creative variations.",
  },
  {
    id: "opp_cpr",
    type: "cpr",
    title: "CPR increase",
    reason: "Cost per result is up versus the previous period on Catalog — Evergreen.",
    recommendation: "Review creative, audience, placement and conversion signals.",
  },
  {
    id: "opp_pattern",
    type: "pattern",
    title: "Strong creative pattern",
    reason: "UGC and founder-style hooks are outperforming offer-only statics.",
    recommendation: "Generate additional variations using the same creative pattern.",
  },
];

function round(value: number, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

/** Scale labeled demo totals for the selected date range (baseline = 30 days). */
export function scaleDemoForRange(days: number) {
  const factor = days / 30;
  return {
    kpis: demoKpis.map((metric) => {
      const volume = metric.format === "percent" || metric.format === "multiplier" ? 1 : factor;
      return {
        ...metric,
        value: round(metric.value * volume, metric.format === "number" ? 0 : 2),
        previous: round(metric.previous * volume, metric.format === "number" ? 0 : 2),
        series: metric.series.slice(-Math.min(days, metric.series.length)),
      };
    }),
    campaigns: demoCampaigns.map((campaign) => ({
      ...campaign,
      spend: round(campaign.spend * factor, 0),
      results: Math.round(campaign.results * factor),
    })),
    creatives: demoCreatives.map((creative) => ({
      ...creative,
      spend: round(creative.spend * factor, 0),
      impressions: Math.round(creative.impressions * factor),
    })),
  };
}

export const demoClients = [
  {
    name: "Northline Apparel",
    industry: "E-commerce",
    website: "https://northline.example",
    status: "ACTIVE" as const,
  },
  {
    name: "Harbor Dental",
    industry: "Local Business",
    website: "https://harbordental.example",
    status: "ACTIVE" as const,
  },
  {
    name: "Kinetic Coaching",
    industry: "Service Business",
    website: "https://kinetic.example",
    status: "PAUSED" as const,
  },
];
