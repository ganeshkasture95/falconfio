import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import PostCard, { formatDate } from "@/components/blog/PostCard";
import { FalcoMark } from "@/components/brand/FalcoMark";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { site } from "@/content/data/site";
import { getPost, getPosts } from "@/lib/content/posts";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.description, openGraph: { type: "article", publishedTime: post.meta.date } };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { meta, Content } = post;
  const others = (await getPosts()).filter((p) => p.slug !== slug);
  const related = [...others.filter((p) => p.meta.category === meta.category), ...others.filter((p) => p.meta.category !== meta.category)].slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white" data-guide={`Article: ${meta.title}`}>
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative max-w-4xl pb-16 pt-10 sm:pb-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-white/75 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden /> All articles
          </Link>
          <p className="mt-10 flex flex-wrap items-center gap-3 text-sm text-white/75">
            <span className="rounded-full bg-white px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-navy">{meta.category}</span>
            <span>{formatDate(meta.date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden /> {post.readingMinutes} min read
            </span>
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{meta.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80">{meta.description}</p>
        </Container>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <Container className="max-w-3xl">
          <article className="prose-falcon">
            <Content />
          </article>
          <div className="mt-14 flex flex-col gap-5 rounded-3xl bg-navy p-7 text-white sm:flex-row sm:items-center" data-guide="Talk to the team behind this article.">
            <FalcoMark className="size-14" />
            <div className="flex-1">
              <p className="font-semibold">Written by {meta.author}</p>
              <p className="mt-1 text-sm text-white/75">Want to talk through how this applies to your product? It&apos;s free and takes 30 minutes.</p>
            </div>
            <ButtonLink href={site.bookingUrl} variant="white">
              Book a call
            </ButtonLink>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-background-tint py-16 sm:py-20" data-guide="More articles you might like.">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
