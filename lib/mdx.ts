import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { addHeadingIds } from "./toc";

const caseStudiesDirectory = path.join(process.cwd(), "content", "case-studies");

export interface CaseStudyFrontmatter {
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  client?: string;
  industry?: string;
  technologies?: string[];
  results?: string[];
}

export interface CaseStudy {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  content: string;
}

/**
 * Get all case study slugs from MDX files
 */
export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(caseStudiesDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

/**
 * Get all case studies with frontmatter
 */
export function getAllCaseStudies(): CaseStudy[] {
  const slugs = getAllCaseStudySlugs();
  
  const caseStudies = slugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((study): study is CaseStudy => study !== null)
    .sort((a, b) => {
      // Sort by date, newest first
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });

  return caseStudies;
}

/**
 * Get a single case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const fullPath = path.join(caseStudiesDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
    content,
  };
}

/**
 * Convert MDX content to HTML
 */
export async function mdxToHtml(mdxContent: string): Promise<string> {
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(mdxContent);
  const htmlString = processedContent.toString();
  // Add IDs to headings for table of contents
  return addHeadingIds(htmlString);
}
