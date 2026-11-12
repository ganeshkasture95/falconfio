import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { z } from "zod";

/** Blog posts in content/blog/*.mdx, each starting with `export const meta = {…}`. */
export const categories = ["Architecture", "AI Agents", "Cloud Cost", "Engineering Leadership"] as const;

export const PostMeta = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(categories),
  author: z.string().default("The Falconfio team"),
  status: z.enum(["draft", "published"]).default("draft"),
});
export type PostMeta = z.infer<typeof PostMeta>;
export type Post = { slug: string; meta: PostMeta; readingMinutes: number };

const dir = path.join(process.cwd(), "content", "blog");
const showDrafts = process.env.NODE_ENV !== "production";

async function load(slug: string): Promise<{ meta: PostMeta; Content: ComponentType }> {
  const mod = await import(`@/content/blog/${slug}.mdx`);
  const parsed = PostMeta.safeParse(mod.meta);
  if (!parsed.success) throw new Error(`Invalid meta in content/blog/${slug}.mdx: ${parsed.error.message}`);
  return { meta: parsed.data, Content: mod.default };
}

/** ~220 words a minute, counting only the prose after the meta block. */
function readingMinutes(slug: string) {
  const text = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8").replace(/export const meta[\s\S]*?\n};?\n/, "");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}

const isVisible = (m: PostMeta) => m.status === "published" || showDrafts;

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPosts(): Promise<Post[]> {
  const all = await Promise.all(getPostSlugs().map(async (slug) => ({ slug, meta: (await load(slug)).meta, readingMinutes: readingMinutes(slug) })));
  return all.filter((p) => isVisible(p.meta)).sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export async function getPost(slug: string) {
  if (!getPostSlugs().includes(slug)) return null;
  const post = await load(slug);
  return isVisible(post.meta) ? { ...post, readingMinutes: readingMinutes(slug) } : null;
}
