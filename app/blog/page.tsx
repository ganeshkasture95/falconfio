import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Falconfio",
  description: "Insights, tutorials, and updates on product engineering, AI, and web development.",
};

export default function BlogPage() {
  // Placeholder blog posts - you can replace this with MDX files later
  const blogPosts = [
    {
      slug: "coming-soon",
      title: "Blog Coming Soon",
      description: "We're working on bringing you valuable insights on product engineering, AI, and web development.",
      date: new Date().toISOString(),
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        {/* Header Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center items-center gap-3 mb-8">
              <Image
                src="/falconfiobiglogo.png"
                alt="Falconfio"
                width={200}
                height={71}
                className="h-14 w-auto sm:h-16 md:h-20"
              />
              <span className="text-2xl sm:text-3xl md:text-4xl gradient-text">
                <span className="font-bold">Falcon</span>
                <span className="font-normal">Fio</span>
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              Insights, tutorials, and updates on product engineering, AI, and web development.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-4xl mx-auto">
            {blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-foreground/60 text-lg mb-4">No blog posts available yet.</p>
                <p className="text-foreground/40">Check back soon for our latest insights!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-card border border-foreground/10 rounded-xl p-6 sm:p-8 hover:border-[#73E2A7]/30 transition-all duration-300"
                  >
                    <div className="mb-4">
                      <time className="text-sm text-foreground/50">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">
                      {post.title}
                    </h2>
                    <p className="text-foreground/70 mb-4 leading-relaxed">
                      {post.description}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-[#73E2A7] hover:gap-2 transition-all duration-300"
                    >
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
