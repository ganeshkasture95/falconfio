"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Bot, Check, CheckCircle2, Copy, Layers, Loader2, Mail, Smartphone, Sparkles } from "lucide-react";
import { submitLead } from "@/app/actions";
import { agentCatalogue } from "@/content/data/agents";
import { getService } from "@/content/data/services";
import { site } from "@/content/data/site";
import { leadSummary, type LeadInput } from "@/lib/leads";
import { cn } from "@/lib/utils";

const interests = [
  { id: "Architecture & cloud", icon: Layers, body: "Scale, re-architect, migrate or cut cloud costs" },
  { id: "Web or mobile product", icon: Smartphone, body: "Build an MVP, a new product or a new feature" },
  { id: "AI agent", icon: Bot, body: "Automate a workflow with an agent" },
  { id: "Not sure yet", icon: Sparkles, body: "Talk it through with an engineer" },
];
const stages = ["Just an idea", "Building an MVP", "Live product", "Scaling fast", "Established business"];
const teamSizes = ["Just me", "2–10", "11–50", "51–200", "200+"];
const timelines = ["As soon as possible", "1–3 months", "3–6 months", "Just exploring"];
const budgets = ["Under $10k", "$10k–$25k", "$25k–$75k", "$75k+", "Not sure yet"];
const steps = ["What", "Stage", "Timing", "Details", "You"];

const serviceInterest: Record<string, string> = { architecture: "Architecture & cloud", devops: "Architecture & cloud", product: "Web or mobile product", mvp: "Web or mobile product", design: "Web or mobile product", ai: "AI agent" };

/** Reads where the visitor came from (?agent=, ?service=, ?from=&summary=) to pre-fill the form. */
function useStartingPoint() {
  const params = useSearchParams();
  const agent = agentCatalogue.find((a) => a.slug === params.get("agent"));
  const service = getService(params.get("service") ?? "");
  const mode = params.get("mode");
  const summary = params.get("summary");
  const from = params.get("from");
  if (agent) return { source: "agent_request" as const, interest: "AI agent", context: `Agent: ${agent.name}${mode ? ` (autonomy: ${mode})` : ""}`, label: agent.name };
  if (service) return { source: "contact" as const, interest: serviceInterest[service.slug] ?? "Not sure yet", context: `Service: ${service.title}`, label: service.title };
  if (from && summary) return { source: (from === "scorecard" ? "scorecard" : "estimator") as LeadInput["source"], interest: from === "scorecard" ? "Architecture & cloud" : "", context: `From the ${from}: ${summary}`.slice(0, 3000), label: `your ${from} results` };
  return { source: "contact" as const, interest: "", context: "", label: "" };
}

export default function ContactWizard() {
  const start = useStartingPoint();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<LeadInput>>({ source: start.source, interest: start.interest || undefined, context: start.context || undefined });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<"sent" | "fallback" | "failed" | null>(null);
  const [pending, startTransition] = useTransition();

  const set = (key: keyof LeadInput, value: string) => setData((d) => ({ ...d, [key]: value }));
  const canNext = [Boolean(data.interest), Boolean(data.stage), Boolean(data.timeline), true, true][step];

  const submit = () =>
    startTransition(async () => {
      const res = await submitLead(data);
      if (res.ok) return setResult("sent");
      if (res.reason === "invalid") return setErrors(res.errors);
      setResult(res.reason === "not-configured" ? "fallback" : "failed");
    });

  if (result) return <Done result={result} data={data} />;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-float sm:p-8" data-guide="Tell us about your project in five quick steps. It takes about a minute.">
      {start.label && (
        <p className="mb-5 flex items-center gap-2 rounded-xl bg-accent px-3 py-2 text-sm text-primary">
          <Sparkles className="size-4 shrink-0" aria-hidden /> About <span className="font-semibold">{start.label}</span>
        </p>
      )}
      {/* progress */}
      <ol className="mb-8 grid grid-cols-5 gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1.5 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-border")} />
            <span className={cn("mt-2 hidden text-xs font-medium sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
          </li>
        ))}
      </ol>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < steps.length - 1) {
            if (canNext) setStep(step + 1);
          } else submit();
        }}
      >
        <div key={step} className="animate-[hero-rise_0.3s_ease-out_both]">
          {step === 0 && (
            <Field legend="What can we help you with?">
              <div className="grid gap-3 sm:grid-cols-2">
                {interests.map(({ id, icon: Icon, body }) => (
                  <Choice key={id} on={data.interest === id} onClick={() => set("interest", id)} className="flex items-start gap-3 p-4 text-left">
                    <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span>
                      <span className="block font-semibold">{id}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{body}</span>
                    </span>
                  </Choice>
                ))}
              </div>
            </Field>
          )}
          {step === 1 && (
            <>
              <Field legend="Where are you today?">
                <Chips options={stages} value={data.stage} onPick={(v) => set("stage", v)} />
              </Field>
              <Field legend="How big is your team?" optional>
                <Chips options={teamSizes} value={data.teamSize} onPick={(v) => set("teamSize", v)} />
              </Field>
            </>
          )}
          {step === 2 && (
            <>
              <Field legend="When do you want to start?">
                <Chips options={timelines} value={data.timeline} onPick={(v) => set("timeline", v)} />
              </Field>
              <Field legend="Rough budget" optional>
                <Chips options={budgets} value={data.budget} onPick={(v) => set("budget", v)} />
              </Field>
            </>
          )}
          {step === 3 && (
            <Field legend="Anything else we should know?" optional>
              <textarea
                value={data.details ?? ""}
                onChange={(e) => set("details", e.target.value)}
                rows={6}
                maxLength={5000}
                placeholder="What are you building, what's not working, links to anything we should look at…"
                className="w-full rounded-2xl border border-border bg-background p-4 text-[15px] focus:border-primary focus:outline-none"
                aria-label="Project details"
              />
            </Field>
          )}
          {step === 4 && (
            <Field legend="How can we reach you?">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Your name" name="name" value={data.name} error={errors.name} onChange={(v) => set("name", v)} autoComplete="name" required />
                <Input label="Work email" name="email" type="email" value={data.email} error={errors.email} onChange={(v) => set("email", v)} autoComplete="email" required />
                <Input label="Company (optional)" name="company" value={data.company} onChange={(v) => set("company", v)} autoComplete="organization" className="sm:col-span-2" />
                {/* honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden onChange={(e) => set("website", e.target.value)} />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                We use these details only to reply about your project. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  privacy policy
                </Link>
                .
              </p>
            </Field>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className={cn("inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground", step === 0 && "invisible")}
          >
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>
          <button
            type="submit"
            disabled={!canNext || pending}
            className="inline-flex items-center gap-2 rounded-xl bg-cta px-5 py-3 text-sm font-semibold text-cta-foreground shadow-cta transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
            {step < steps.length - 1 ? "Continue" : pending ? "Sending…" : "Send"}
            {!pending && <ArrowRight className="size-4" aria-hidden />}
          </button>
        </div>
      </form>
    </div>
  );
}

function Done({ result, data }: { result: "sent" | "fallback" | "failed"; data: Partial<LeadInput> }) {
  const [copied, setCopied] = useState(false);
  const summary = leadSummary(data);
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry from ${data.name ?? "the website"}`)}&body=${encodeURIComponent(summary)}`;

  if (result === "sent")
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-float sm:p-12" role="status">
        <CheckCircle2 className="mx-auto size-14 text-success" aria-hidden />
        <h2 className="mt-5 text-2xl font-bold">Thanks, {data.name?.split(" ")[0]}. We&apos;ve got it.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          An engineer will read your note and reply to <span className="font-semibold text-foreground">{data.email}</span> within one business day.
        </p>
      </div>
    );

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-float sm:p-10" role="status">
      <Mail className="size-10 text-primary" aria-hidden />
      <h2 className="mt-4 text-2xl font-bold">One last click</h2>
      <p className="mt-2 text-muted-foreground">
        {result === "failed" ? "Something went wrong sending your message." : "Our online form is being set up."} Send it from your email app instead. Everything you
        entered is already filled in.
      </p>
      <pre className="mt-5 max-h-56 overflow-auto rounded-2xl bg-background-tint p-4 font-sans text-sm whitespace-pre-wrap">{summary}</pre>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={mailto} className="inline-flex items-center gap-2 rounded-xl bg-cta px-5 py-3 text-sm font-semibold text-cta-foreground hover:bg-cta-hover">
          <Mail className="size-4" aria-hidden /> Email it to {site.email}
        </a>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(summary).then(() => setCopied(true), () => {});
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:border-primary"
        >
          {copied ? <Check className="size-4 text-success" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          {copied ? "Copied" : "Copy text"}
        </button>
      </div>
    </div>
  );
}

function Field({ legend, optional, children }: { legend: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <fieldset className="mb-6 min-w-0 last:mb-0">
      <legend className="mb-3 text-lg font-semibold">
        {legend} {optional && <span className="text-sm font-normal text-muted-foreground">(optional)</span>}
      </legend>
      {children}
    </fieldset>
  );
}

function Choice({ on, onClick, className, children }: { on: boolean; onClick: () => void; className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn("rounded-2xl border transition-colors", on ? "border-primary bg-accent" : "border-border bg-background hover:border-primary", className)}
    >
      {children}
    </button>
  );
}

function Chips({ options, value, onPick }: { options: string[]; value?: string; onPick: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Choice key={o} on={value === o} onClick={() => onPick(o)} className="px-4 py-2 text-sm font-medium">
          {o}
        </Choice>
      ))}
    </div>
  );
}

function Input({
  label,
  error,
  onChange,
  value,
  className,
  ...rest
}: { label: string; error?: string; onChange: (v: string) => void; value?: string; className?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className={cn("block", className)}>
      <span className="text-sm font-medium">{label}</span>
      <input
        {...rest}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(
          "mt-1.5 h-12 w-full rounded-xl border bg-background px-4 text-[15px] focus:outline-none",
          error ? "border-strike" : "border-border focus:border-primary",
        )}
      />
      {error && <span className="mt-1 block text-xs text-strike">{error}</span>}
    </label>
  );
}
