"use server";

import { site } from "@/content/data/site";
import { LeadInput, leadSummary, type LeadResult } from "@/lib/leads";

/**
 * Receives a lead from any form and emails it to the team through Resend.
 * Set RESEND_API_KEY (and optionally LEADS_TO_EMAIL, LEADS_FROM_EMAIL) in the Vercel project.
 * Without a key the action reports "not-configured" and the form offers a pre-filled email instead,
 * so a lead is never silently dropped.
 */
export async function submitLead(input: unknown): Promise<LeadResult> {
  const parsed = LeadInput.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { ok: false, reason: "invalid", errors };
  }
  const lead = parsed.data;
  // Bots fill the hidden field; pretend it worked so they move on.
  if (lead.website) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "not-configured" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL ?? "Falconfio website <onboarding@resend.dev>",
      to: [process.env.LEADS_TO_EMAIL ?? site.email],
      reply_to: lead.email,
      subject: `New ${lead.source.replace("_", " ")} lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: leadSummary(lead),
    }),
  });
  if (!res.ok) {
    console.error("Lead email failed", res.status, await res.text().catch(() => ""));
    return { ok: false, reason: "failed" };
  }
  return { ok: true };
}
