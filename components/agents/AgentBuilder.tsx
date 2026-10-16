"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { agentCatalogue, departments, type Department } from "@/content/data/agents";
import { cn } from "@/lib/utils";

const extraTools = ["Slack", "Gmail", "Google Drive", "Notion", "Salesforce", "Microsoft Teams", "Postgres", "Shopify"];
const modes = [
  { id: "draft", label: "Draft only", body: "Prepares the work; a person sends it." },
  { id: "approve", label: "Act with approval", body: "Does the work and asks before anything important." },
  { id: "auto", label: "Automatic for routine cases", body: "Handles routine cases alone; escalates the rest." },
] as const;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

/** "Design your agent": pick a department, a job, tools and autonomy, and get a spec. */
export default function AgentBuilder() {
  const [dept, setDept] = useState<Department>("Sales");
  const jobs = agentCatalogue.filter((a) => a.fn === dept);
  const [jobSlug, setJobSlug] = useState(jobs[0].slug);
  const job = jobs.find((j) => j.slug === jobSlug) ?? jobs[0];
  const [tools, setTools] = useState<string[]>(job.tools);
  const [mode, setMode] = useState<(typeof modes)[number]["id"]>("approve");

  const pickDept = (d: Department) => {
    const first = agentCatalogue.find((a) => a.fn === d)!;
    setDept(d);
    setJobSlug(first.slug);
    setTools(first.tools);
  };
  const pickJob = (slug: string) => {
    setJobSlug(slug);
    setTools(agentCatalogue.find((a) => a.slug === slug)!.tools);
  };
  const toggleTool = (t: string) => setTools((ts) => (ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]));
  const toolOptions = [...new Set([...job.tools, ...extraTools])];
  const chip = (on: boolean) =>
    cn("rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors", on ? "border-navy bg-navy text-white" : "border-border bg-card hover:border-primary");

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="grid min-w-0 gap-8">
        <fieldset className="min-w-0">
          <legend className="text-sm font-semibold">
            <span className="mr-2 font-mono text-primary">1</span>Which team is it for?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {departments.map((d) => (
              <button key={d} type="button" aria-pressed={dept === d} onClick={() => pickDept(d)} className={chip(dept === d)}>
                {d}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="min-w-0">
          <legend className="text-sm font-semibold">
            <span className="mr-2 font-mono text-primary">2</span>What job should it do?
          </legend>
          <div className="mt-3 grid gap-2">
            {jobs.map((j) => (
              <button
                key={j.slug}
                type="button"
                aria-pressed={job.slug === j.slug}
                onClick={() => pickJob(j.slug)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-colors",
                  job.slug === j.slug ? "border-primary bg-accent" : "border-border bg-card hover:border-primary",
                )}
              >
                <span className="block text-sm font-semibold">{j.name}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{j.body}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="min-w-0">
          <legend className="text-sm font-semibold">
            <span className="mr-2 font-mono text-primary">3</span>Which tools should it use?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {toolOptions.map((t) => (
              <button key={t} type="button" aria-pressed={tools.includes(t)} onClick={() => toggleTool(t)} className={chip(tools.includes(t))}>
                {tools.includes(t) && <Check className="-ml-1 mr-1 inline size-3.5" aria-hidden />}
                {t}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="min-w-0">
          <legend className="text-sm font-semibold">
            <span className="mr-2 font-mono text-primary">4</span>How much should it do on its own?
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={mode === m.id}
                onClick={() => setMode(m.id)}
                className={cn("rounded-2xl border p-4 text-left transition-colors", mode === m.id ? "border-primary bg-accent" : "border-border bg-card hover:border-primary")}
              >
                <span className="block text-sm font-semibold">{m.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{m.body}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start" data-guide="Your agent's spec, updated live as you choose. Request it and we'll start from here.">
        <div className="overflow-hidden rounded-3xl bg-midnight text-white shadow-float">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="ml-2 font-mono text-xs text-white/60">agent.yaml</span>
          </div>
          <pre key={`${job.slug}-${mode}-${tools.length}`} className="animate-[hero-rise_0.3s_ease-out_both] overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
            <code>
              <span className="text-periwinkle">agent</span>: {slugify(job.name)}
              {"\n"}
              <span className="text-periwinkle">team</span>: {dept.toLowerCase()}
              {"\n"}
              <span className="text-periwinkle">job</span>: |{"\n"}
              {job.steps.map((s) => `  - ${s}\n`).join("")}
              <span className="text-periwinkle">tools</span>: [{tools.map(slugify).join(", ")}]
              {"\n"}
              <span className="text-periwinkle">autonomy</span>: {slugify(modes.find((m) => m.id === mode)!.label)}
              {"\n"}
              <span className="text-periwinkle">human_review</span>: &quot;{job.human}&quot;
              {"\n"}
              <span className="text-periwinkle">guardrails</span>: [prompt_injection, pii_redaction, audit_log]
            </code>
          </pre>
          <div className="border-t border-white/10 p-5">
            <Link
              href={`/contact?agent=${job.slug}&mode=${mode}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy hover:bg-accent"
            >
              Request this agent <ArrowRight className="size-4" aria-hidden />
            </Link>
            <p className="mt-3 text-center text-xs text-white/55">We reply within one business day with a plan and a price range.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
