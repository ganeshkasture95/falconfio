import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import FinalCta from "@/components/sections/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/primitives";
import { categories, getPosts } from "@/lib/content/posts";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical writing on architecture, AI agents, cloud cost and engineering leadership from the Falconfio team.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [first, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Practical notes on building software <span className="text-periwinkle">that lasts</span>
          </>
        }
        intro="Short, useful articles on architecture, AI agents, cloud cost and engineering leadership. No fluff, just what we've learned building real systems."
        guide="Our blog: practical articles on architecture, AI agents, cloud cost and engineering leadership."
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {categories
            .map((c) => [c, posts.filter((p) => p.meta.category === c).length] as const)
            .filter(([, n]) => n > 0)
            .map(([c, n]) => (
              <li key={c} className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold">
                {c} <span className="ml-1 font-mono text-white/60">{n}</span>
              </li>
            ))}
        </ul>
      </PageHero>
      <section className="bg-background py-20 sm:py-24">
        <Container>
          {first ? (
            <div className="grid gap-6 md:grid-cols-2">
              <PostCard post={first} featured />
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">New articles are on their way.</p>
          )}
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
