import CaseStudyCTA from "@/components/CaseStudyCTA";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import { getAllCaseStudySlugs, getCaseStudyBySlug, mdxToHtml } from "@/lib/mdx";
import { extractTOC } from "@/lib/toc";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${caseStudy.frontmatter.title} - Falconfio Case Study`,
    description: caseStudy.frontmatter.description,
    openGraph: {
      title: caseStudy.frontmatter.title,
      description: caseStudy.frontmatter.description,
      images: caseStudy.frontmatter.coverImage
        ? [caseStudy.frontmatter.coverImage]
        : [],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const htmlContent = await mdxToHtml(caseStudy.content);
  const toc = extractTOC(htmlContent);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        {/* Back Button */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Case Studies
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Link
                href="/case-studies"
                className="text-sm text-[#73E2A7] hover:text-[#1C7C54] transition-colors duration-200"
              >
                Case Studies
              </Link>
            </div>

            {/* Cover Image */}
            {caseStudy.frontmatter.coverImage && (
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-8 bg-foreground/5">
                <Image
                  src={caseStudy.frontmatter.coverImage}
                  alt={caseStudy.frontmatter.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            )}

            {/* Header */}
            <div className="mb-8 max-w-4xl">
              <div className="flex items-center gap-3 mb-4 flex-wrap text-sm text-foreground/60">
                <time>
                  {new Date(caseStudy.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span className="text-foreground/30">•</span>
                <span>{Math.ceil(htmlContent.split(/\s+/).length / 200)} minute read</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {caseStudy.frontmatter.title}
              </h1>

              <p className="text-xl sm:text-2xl text-foreground/70 leading-relaxed mb-6">
                {caseStudy.frontmatter.description}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#73E2A7]/20 flex items-center justify-center">
                  <span className="text-[#73E2A7] font-bold text-sm">F</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Falconfio Team</div>
                  <div className="text-sm text-foreground/60">Product Engineering</div>
                </div>
              </div>

              {/* Technologies & Results - Compact */}
              <div className="flex flex-wrap gap-4 mb-8">
                {caseStudy.frontmatter.client && (
                  <span className="px-3 py-1 bg-[#73E2A7]/20 text-[#73E2A7] rounded-full text-sm font-medium">
                    {caseStudy.frontmatter.client}
                  </span>
                )}
                {caseStudy.frontmatter.industry && (
                  <span className="px-3 py-1 bg-foreground/10 text-foreground/70 rounded-full text-sm">
                    {caseStudy.frontmatter.industry}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content with Sidebar */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="min-w-0">
                {/* Technologies */}
                {caseStudy.frontmatter.technologies && caseStudy.frontmatter.technologies.length > 0 && (
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <h2 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                      Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.frontmatter.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-foreground/10 rounded-lg text-sm text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {caseStudy.frontmatter.results && caseStudy.frontmatter.results.length > 0 && (
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <h2 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                      Key Results
                    </h2>
                    <ul className="space-y-3">
                      {caseStudy.frontmatter.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-[#73E2A7] mt-0.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-foreground/80">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article Content */}
                <article
                  className="case-study-content"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>

              {/* Sidebar - Table of Contents & Share */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <TableOfContents items={toc} />
                  <ShareButtons title={caseStudy.frontmatter.title} url={`/case-studies/${slug}`} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CaseStudyCTA />
      </main>
      <Footer />
    </>
  );
}
