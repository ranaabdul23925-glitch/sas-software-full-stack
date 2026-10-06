import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shell/theme-toggle";

const sections = [
  { title: "Problem", body: "Marketers juggle creative tools, Ads Manager, spreadsheets, and reporting. Context gets lost between launch and optimization." },
  { title: "How it works", body: "Plan the offer, generate creatives, launch campaigns, test variations, measure results, then feed learning back into new creative." },
  { title: "Creative Studio", body: "Concept, copy, and variation workflows live in one place. Phase 2 ships generation — the navigation is already in the OS." },
  { title: "Creative testing", body: "A dedicated Testing Lab for experiments, not buried in campaign rows. Phase 3." },
  { title: "Optimization Center", body: "Fatigue, CPR drift, and winning patterns become recommended actions — never guaranteed results." },
  { title: "Analytics", body: "Spend, results, CPR, CTR, CPC, CPM, and ROAS in one workspace view." },
  { title: "Automation", body: "Approved rules can run later. You stay in control of every automated action." },
  { title: "Agency mode", body: "Workspaces and clients are isolated from day one. Client A never sees Client B." },
  { title: "Meta integration", body: "OAuth and publishing are Phase 4. Phase 1 never pretends an ad account is connected." },
];

const pricing = [
  { name: "Starter", detail: "For small businesses getting organized." },
  { name: "Pro", detail: "For advertisers and growing teams." },
  { name: "Agency", detail: "For agencies managing multiple clients." },
  { name: "Enterprise", detail: "For large teams with custom limits." },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-4 py-3 md:px-8">
        <Link href="/" className="font-semibold tracking-tight">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Start Free</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Meta Ads operating system</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Launch, Test & Optimize Your Meta Ads From One Platform
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Create advertising creatives, launch campaigns, test variations, monitor performance, and continuously improve your advertising workflow from one workspace.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/register">Start Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login?demo=1">View Demo</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No CPR, CPA, or ROAS guarantees. Demo workspaces use labeled sample data, not live Meta.</p>
        </section>
        <section className="border-t bg-muted/40 py-16">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2">
            {sections.map((section) => (
              <article key={section.title} className="rounded-xl border bg-card p-5">
                <h2 className="font-semibold">{section.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="pricing" className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-2xl font-semibold">Pricing</h2>
          <p className="mt-2 text-sm text-muted-foreground">Billing ships in a later phase. Architecture is ready; we never sell guaranteed advertising performance.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pricing.map((plan) => (
              <div key={plan.name} className="rounded-xl border p-4">
                <h3 className="font-medium">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.detail}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="border-t py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <div className="mt-6 space-y-4 text-sm">
              <div>
                <h3 className="font-medium">Is this connected to Meta today?</h3>
                <p className="mt-1 text-muted-foreground">No. Phase 1 is the operating system foundation. Meta OAuth and publishing are Phase 4.</p>
              </div>
              <div>
                <h3 className="font-medium">What is View Demo?</h3>
                <p className="mt-1 text-muted-foreground">A labeled Demo Workspace with sample performance figures so you can explore navigation and workflow. It is never presented as a live ad account.</p>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Button asChild size="lg">
                <Link href="/register">Start Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
