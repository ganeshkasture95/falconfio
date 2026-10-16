import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { z } from "zod";

/** TRD §5.2. Each MDX file starts with `export const meta = {…}` (@next/mdx has no frontmatter). */
export const CaseStudyMeta = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  client: z.string(),
  industry: z.string(),
  technologies: z.array(z.string()).default([]),
  results: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
  agents: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  /** "draft" = shown (labelled) in development only; hidden in production until verified. */
  status: z.enum(["draft", "published"]).default("draft"),
  testimonial: z
    .object({ quote: z.string(), author: z.string(), role: z.string(), company: z.string(), verified: z.boolean() })
    .optional(),
});
export type CaseStudyMeta = z.infer<typeof CaseStudyMeta>;
export type CaseStudy = { slug: string; meta: CaseStudyMeta };

const dir = path.join(process.cwd(), "content", "case-studies");
const showDrafts = process.env.NODE_ENV !== "production";

async function load(slug: string): Promise<{ meta: CaseStudyMeta; Content: ComponentType }> {
  const mod = await import(`@/content/case-studies/${slug}.mdx`);
  const parsed = CaseStudyMeta.safeParse(mod.meta);
  if (!parsed.success) throw new Error(`Invalid meta in content/case-studies/${slug}.mdx: ${parsed.error.message}`);
  return { meta: parsed.data, Content: mod.default };
}

const isVisible = (m: CaseStudyMeta) => m.status === "published" || showDrafts;

export function getCaseStudySlugs(): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const all = await Promise.all(getCaseStudySlugs().map(async (slug) => ({ slug, meta: (await load(slug)).meta })));
  return all.filter((s) => isVisible(s.meta)).sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export async function getCaseStudy(slug: string) {
  if (!getCaseStudySlugs().includes(slug)) return null;
  const study = await load(slug);
  return isVisible(study.meta) ? study : null;
}
