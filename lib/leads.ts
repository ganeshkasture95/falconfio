import { z } from "zod";

/** One lead shape for every form on the site: contact wizard, agent requests, estimator, scorecard. */
export const LeadInput = z.object({
  source: z.enum(["contact", "agent_request", "estimator", "scorecard", "careers"]),
  name: z.string().trim().min(1, "Please tell us your name").max(120),
  email: z.email("Please enter a valid email address").max(200),
  company: z.string().trim().max(160).optional(),
  interest: z.string().max(80).optional(),
  stage: z.string().max(80).optional(),
  teamSize: z.string().max(80).optional(),
  timeline: z.string().max(80).optional(),
  budget: z.string().max(80).optional(),
  details: z.string().trim().max(5000).optional(),
  /** context from the page that sent the visitor, e.g. an agent slug or an estimate summary */
  context: z.string().max(3000).optional(),
  /** honeypot: real people never fill this in */
  website: z.string().max(0).optional(),
});
export type LeadInput = z.infer<typeof LeadInput>;

export type LeadResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: Record<string, string> }
  | { ok: false; reason: "not-configured" | "failed" };

const labels: [keyof LeadInput, string][] = [
  ["source", "Source"],
  ["name", "Name"],
  ["email", "Email"],
  ["company", "Company"],
  ["interest", "Interested in"],
  ["stage", "Stage"],
  ["teamSize", "Team size"],
  ["timeline", "Timeline"],
  ["budget", "Budget"],
  ["details", "Details"],
  ["context", "Context"],
];

/** Plain-text summary used in the notification email and the mailto fallback. */
export function leadSummary(lead: Partial<LeadInput>) {
  return labels
    .filter(([key]) => lead[key])
    .map(([key, label]) => `${label}: ${lead[key]}`)
    .join("\n");
}
