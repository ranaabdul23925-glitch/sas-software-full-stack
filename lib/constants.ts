export const APP_NAME = "AdForge";

export const SIDEBAR_ITEMS = [
  { href: "/app", label: "Overview", icon: "LayoutDashboard", phase: 1 },
  { href: "/app/campaigns", label: "Campaigns", icon: "Megaphone", phase: 2 },
  { href: "/app/creative-studio", label: "Creative Studio", icon: "Sparkles", phase: 2 },
  { href: "/app/creative-library", label: "Creative Library", icon: "Images", phase: 2 },
  { href: "/app/testing-lab", label: "Testing Lab", icon: "FlaskConical", phase: 3 },
  { href: "/app/optimization", label: "Optimization", icon: "Gauge", phase: 5 },
  { href: "/app/analytics", label: "Analytics", icon: "ChartNoAxesCombined", phase: 6 },
  { href: "/app/reports", label: "Reports", icon: "FileBarChart", phase: 6 },
  { href: "/app/audiences", label: "Audiences", icon: "Users", phase: 2 },
  { href: "/app/clients", label: "Clients", icon: "Briefcase", phase: 1 },
  { href: "/app/integrations", label: "Integrations", icon: "Plug", phase: 1 },
  { href: "/app/automation", label: "Automation", icon: "Workflow", phase: 5 },
  { href: "/app/billing", label: "Billing", icon: "CreditCard", phase: 6 },
  { href: "/app/settings", label: "Settings", icon: "Settings", phase: 1 },
] as const;

export const CAMPAIGN_OBJECTIVES = [
  "Sales",
  "Leads",
  "Traffic",
  "Engagement",
  "Awareness",
  "App Promotion",
] as const;

export const BUSINESS_TYPES = [
  "E-commerce",
  "Local Business",
  "Service Business",
  "SaaS",
  "Agency",
  "Freelance / Consultant",
  "Other",
] as const;

export const DATE_RANGES = [
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "14d", label: "Last 14 days", days: 14 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 90 days", days: 90 },
] as const;

export const DEMO_NOTICE = "Demo data — not live Meta";
export const DEMO_EMAIL = "demo@adforge.local";
export const DEMO_PASSWORD = "DemoWorkspace123!";
export const WORKSPACE_COOKIE = "adsos.workspace";
export const CLIENT_COOKIE = "adsos.client";
export const RANGE_COOKIE = "adsos.range";
