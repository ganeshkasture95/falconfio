import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { AgentFlow, AgentTrace } from "@/components/case-studies/AgentDiagrams";

/** Allow-list of elements MDX content may render (TRD §8.4). Styling comes from the `.prose-falcon` wrapper. */
const components: MDXComponents = {
  AgentFlow,
  AgentTrace,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
