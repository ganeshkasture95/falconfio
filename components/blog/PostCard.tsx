import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/lib/content/posts";
import { cn } from "@/lib/utils";

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const { meta } = post;
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-guide={`Article: ${meta.title}. About ${post.readingMinutes} minutes to read.`}
      className={cn(
        "group flex flex-col rounded-3xl border p-7 transition-all hover:-translate-y-1 hover:shadow-lift",
        featured ? "border-navy bg-navy text-white md:col-span-2 md:p-10" : "border-border bg-card hover:border-primary",
      )}
    >
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className={cn("rounded-full px-3 py-1 font-mono font-semibold uppercase tracking-[0.12em]", featured ? "bg-white text-navy" : "bg-accent text-primary")}>
          {meta.category}
        </span>
        <span className={cn("inline-flex items-center gap-1.5", featured ? "text-white/70" : "text-muted-foreground")}>
          <Clock className="size-3.5" aria-hidden /> {post.readingMinutes} min read
        </span>
        <span className={featured ? "text-white/70" : "text-muted-foreground"}>{formatDate(meta.date)}</span>
      </div>
      <h3 className={cn("mt-5 flex items-start justify-between gap-4 font-semibold leading-snug", featured ? "text-2xl sm:text-4xl" : "text-xl")}>
        {meta.title}
        <ArrowUpRight
          className={cn("mt-1 size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5", featured ? "text-periwinkle" : "text-primary")}
          aria-hidden
        />
      </h3>
      <p className={cn("mt-3 leading-relaxed", featured ? "max-w-2xl text-white/80" : "text-sm text-muted-foreground")}>{meta.description}</p>
      <p className={cn("mt-auto pt-6 text-sm", featured ? "text-white/70" : "text-muted-foreground")}>By {meta.author}</p>
    </Link>
  );
}
