"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CalendarRange, Check, Link2, Package, Users } from "lucide-react";
import { pricing } from "@/content/data/site";
import { cn } from "@/lib/utils";

/** Project Cost & Timeline Estimator. A rough model: base weeks per project type, plus features, scale and compliance. */
const types = [
  { id: "web", label: "Web app", weeks: 6 },
  { id: "mobile", label: "Mobile app", weeks: 8 },
  { id: "both", label: "Web + mobile", weeks: 11 },
  { id: "saas", label: "SaaS platform", weeks: 10 },
  { id: "agent", label: "AI agent", weeks: 3 },
];
const features = [
  { id: "auth", label: "Sign-up & roles", weeks: 1 },
  { id: "payments", label: "Payments & billing", weeks: 1.5 },
  { id: "admin", label: "Admin panel", weeks: 1.5 },
  { id: "integrations", label: "Integrations (CRM, ERP…)", weeks: 1.5 },
  { id: "realtime", label: "Real-time / chat", weeks: 1.5 },
  { id: "analytics", label: "Dashboards & analytics", weeks: 1 },
  { id: "aichat", label: "AI assistant / chat", weeks: 1.5 },
  { id: "agents", label: "AI agents", weeks: 2.5 },
];
const scales = [
  { id: "prototype", label: "Prototype to test the idea", factor: 0.7 },
  { id: "launch", label: "Launch to real users", factor: 1 },
  { id: "scale", label: "Built for heavy scale", factor: 1.35 },
];
const compliance = [
  { id: "none", label: "No special rules", weeks: 0 },
  { id: "privacy", label: "GDPR / DPDP", weeks: 0.5 },
  { id: "soc2", label: "SOC 2 / enterprise", weeks: 1.5 },
  { id: "regulated", label: "HIPAA / PCI", weeks: 2 },
];
const design = [
  { id: "have", label: "We have designs", weeks: 0 },
  { id: "need", label: "We need design", weeks: 1.5 },
];

const usd = (n: number) => `$${Math.round(n / 1000).toLocaleString("en-US")}k`;

export default function Estimator() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pickOne = <T extends { id: string }>(list: T[], key: string, fallback: string) => list.find((x) => x.id === params.get(key))?.id ?? fallback;
  const [type, setType] = useState(() => pickOne(types, "t", "web"));
  const [feats, setFeats] = useState<string[]>(() => (params.get("f") ?? "auth").split(",").filter((f) => features.some((x) => x.id === f)));
  const [scale, setScale] = useState(() => pickOne(scales, "s", "launch"));
  const [comp, setComp] = useState(() => pickOne(compliance, "c", "none"));
  const [des, setDes] = useState(() => pickOne(design, "d", "need"));
  const [copied, setCopied] = useState(false);

  const t = types.find((x) => x.id === type)!;
  const sc = scales.find((x) => x.id === scale)!;
  const raw =
    (t.weeks + feats.reduce((n, f) => n + (features.find((x) => x.id === f)?.weeks ?? 0), 0) + compliance.find((x) => x.id === comp)!.weeks + design.find((x) => x.id === des)!.weeks) *
    sc.factor;
  const low = Math.max(2, Math.round(raw * 0.85));
  const high = Math.max(low + 1, Math.round(raw * 1.25));
  const team = high <= 6 ? "2–3 people" : high <= 14 ? "3–4 people" : "4–6 people";
  const pkg =
    type === "agent" && high <= 8
      ? { name: "AI agent build", href: "/services/ai" }
      : scale === "prototype"
        ? { name: "Startup MVP Sprint", href: "/services/mvp" }
        : high > 16
          ? { name: "Dedicated squad", href: "/how-we-work#squad" }
          : { name: "Fixed-scope project", href: "/how-we-work#project" };
  const rate = pricing.weeklyTeamRateUSD;
  const summary = `${t.label}; features: ${feats.map((f) => features.find((x) => x.id === f)?.label).join(", ") || "none"}; ${sc.label.toLowerCase()}; compliance: ${compliance.find((x) => x.id === comp)!.label}; ${design.find((x) => x.id === des)!.label.toLowerCase()}. Estimate: ${low}–${high} weeks, ${team}.`;

  // keep the URL in sync so the estimate can be shared
  const sync = (next: Record<string, string>) => {
    const q = new URLSearchParams({ t: type, f: feats.join(","), s: scale, c: comp, d: des, ...next });
    router.replace(`${pathname}?${q.toString()}`, { scroll: false });
  };
  const choose = (setter: (v: string) => void, key: string) => (v: string) => {
    setter(v);
    sync({ [key]: v });
  };
  const toggle = (id: string) => {
    const next = feats.includes(id) ? feats.filter((f) => f !== id) : [...feats, id];
    setFeats(next);
    sync({ f: next.join(",") });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 sm:p-8" data-guide="Choose what you want to build. The estimate on the right updates as you go.">
        <Group title="What are you building?">
          {types.map((x) => (
            <Chip key={x.id} on={type === x.id} onClick={() => choose(setType, "t")(x.id)}>
              {x.label}
            </Chip>
          ))}
        </Group>
        <Group title="Which features?" hint="Pick all that apply">
          {features.map((x) => (
            <Chip key={x.id} on={feats.includes(x.id)} onClick={() => toggle(x.id)}>
              {feats.includes(x.id) && <Check className="-ml-1 mr-1 inline size-3.5" aria-hidden />}
              {x.label}
            </Chip>
          ))}
        </Group>
        <Group title="How far should it go?">
          {scales.map((x) => (
            <Chip key={x.id} on={scale === x.id} onClick={() => choose(setScale, "s")(x.id)}>
              {x.label}
            </Chip>
          ))}
        </Group>
        <Group title="Compliance needs">
          {compliance.map((x) => (
            <Chip key={x.id} on={comp === x.id} onClick={() => choose(setComp, "c")(x.id)}>
              {x.label}
            </Chip>
          ))}
        </Group>
        <Group title="Design">
          {design.map((x) => (
            <Chip key={x.id} on={des === x.id} onClick={() => choose(setDes, "d")(x.id)}>
              {x.label}
            </Chip>
          ))}
        </Group>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start" aria-live="polite" data-guide="Your rough estimate: timeline, team and the best way to work with us.">
        <div className="rounded-3xl bg-navy p-8 text-white shadow-float">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-periwinkle">Your estimate</p>
          <p className="mt-4 flex items-center gap-3">
            <CalendarRange className="size-6 text-periwinkle" aria-hidden />
            <span className="text-4xl font-bold tracking-tight">
              {low}–{high} weeks
            </span>
          </p>
          {rate && (
            <p className="mt-2 text-lg text-white/85">
              About {usd(low * rate)}–{usd(high * rate)}
            </p>
          )}
          <dl className="mt-6 grid gap-4 border-t border-white/15 pt-6 text-sm">
            <div className="flex items-center gap-3">
              <Users className="size-4 text-periwinkle" aria-hidden />
              <dt className="text-white/70">Team</dt>
              <dd className="ml-auto font-semibold">{team}</dd>
            </div>
            <div className="flex items-center gap-3">
              <Package className="size-4 text-periwinkle" aria-hidden />
              <dt className="text-white/70">Suggested way to work</dt>
              <dd className="ml-auto font-semibold">
                <Link href={pkg.href} className="underline-offset-4 hover:underline">
                  {pkg.name}
                </Link>
              </dd>
            </div>
          </dl>
          <Link
            href={`/contact?from=estimator&summary=${encodeURIComponent(summary)}`}
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-navy hover:bg-accent"
          >
            Get a precise quote <ArrowRight className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => setCopied(true), () => {})}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold hover:bg-white/10"
          >
            {copied ? <Check className="size-4" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
            {copied ? "Link copied" : "Copy a link to this estimate"}
          </button>
        </div>
        <p className="mt-4 px-2 text-xs leading-relaxed text-muted-foreground">
          A rough guide based on typical projects, not a quote. After a free discovery call you get a written plan and price range for your exact scope.
        </p>
      </aside>
    </div>
  );
}

function Group({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="font-semibold">
        {title} {hint && <span className="text-sm font-normal text-muted-foreground">({hint})</span>}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn("rounded-full border px-4 py-2 text-sm font-medium transition-colors", on ? "border-navy bg-navy text-white" : "border-border bg-background hover:border-primary")}
    >
      {children}
    </button>
  );
}
