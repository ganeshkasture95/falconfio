import type { MetadataRoute } from "next";
import { industryPages } from "@/content/data/industries";
import { catalogue } from "@/content/data/services";
import { getCaseStudies } from "@/lib/content/case-studies";
import { getPosts } from "@/lib/content/posts";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://falconfio.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/services", "/agents", "/case-studies", "/products", "/how-we-work", "/about", "/careers", "/contact", "/blog", "/tools/scorecard", "/tools/estimator", "/privacy", "/terms"];
  const [studies, posts] = await Promise.all([getCaseStudies(), getPosts()]);
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...catalogue.map((s) => ({ url: `${base}/services/${s.slug}`, priority: 0.8 })),
    ...industryPages.map((i) => ({ url: `${base}/solutions/${i.slug}`, priority: 0.7 })),
    ...studies.map((c) => ({ url: `${base}/case-studies/${c.slug}`, lastModified: c.meta.date, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.meta.date, priority: 0.6 })),
  ];
}
