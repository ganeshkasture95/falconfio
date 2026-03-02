import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { getAllCaseStudies } from "@/lib/mdx";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies - Falconfio",
  description: "Explore our success stories and see how we've helped startups build and scale their products.",
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        {/* Header Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/falconfiobiglogo.png"
                alt="Falconfio"
                width={200}
                height={71}
                className="h-14 w-auto sm:h-16 md:h-20"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Case Studies</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              Real products. Real results. See how we&apos;ve helped startups build and scale.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            {caseStudies.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-foreground/60 text-lg mb-4">No case studies available yet.</p>
                <p className="text-foreground/40">Check back soon for our success stories!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {caseStudies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/case-studies/${study.slug}`}
                    className="group"
                  >
                    <article className="h-full bg-card border border-foreground/10 rounded-xl overflow-hidden hover:border-[#73E2A7]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#73E2A7]/10 hover:-translate-y-1">
                      {/* Cover Image */}
                      {study.frontmatter.coverImage ? (
                        <div className="relative h-48 sm:h-56 overflow-hidden bg-foreground/5">
                          <Image
                            src={study.frontmatter.coverImage}
                            alt={study.frontmatter.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                        </div>
                      ) : (
                        <div className="h-48 sm:h-56 bg-linear-to-br from-[#73E2A7]/20 via-[#1C7C54]/10 to-[#1B512D]/10 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#73E2A7]/20 flex items-center justify-center">
                            <span className="text-2xl">📊</span>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {/* Client & Date */}
                        <div className="flex items-center justify-between mb-3">
                          {study.frontmatter.client && (
                            <span className="text-xs sm:text-sm font-medium text-[#73E2A7]">
                              {study.frontmatter.client}
                            </span>
                          )}
                          <time className="text-xs text-foreground/50">
                            {new Date(study.frontmatter.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}
                          </time>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground group-hover:text-[#73E2A7] transition-colors duration-300">
                          {study.frontmatter.title}
                        </h2>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-foreground/70 mb-4 line-clamp-3">
                          {study.frontmatter.description}
                        </p>

                        {/* Technologies */}
                        {study.frontmatter.technologies && study.frontmatter.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {study.frontmatter.technologies.slice(0, 3).map((tech, index) => (
                              <span
                                key={index}
                                className="px-2.5 py-1 bg-foreground/10 rounded-full text-xs text-foreground/70"
                              >
                                {tech}
                              </span>
                            ))}
                            {study.frontmatter.technologies.length > 3 && (
                              <span className="px-2.5 py-1 bg-foreground/10 rounded-full text-xs text-foreground/70">
                                +{study.frontmatter.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Read More */}
                        <div className="flex items-center text-sm font-medium text-[#73E2A7] group-hover:gap-2 transition-all duration-300">
                          <span>Read case study</span>
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
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
                        </div>
                      </div>
                    </article>
                  </Link>
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
