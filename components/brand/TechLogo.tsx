import {
  siClaude, siDocker, siExpo, siFastapi, siFlutter, siGithubactions, siGo, siGooglecloud, siHuggingface, siK6,
  siKotlin, siKubernetes, siLanggraph, siModelcontextprotocol, siMongodb, siNestjs, siNextdotjs, siNodedotjs,
  siOpentelemetry, siPostgresql, siPrisma, siPython, siReact, siRedis, siSentry, siSupabase, siSwift,
  siTailwindcss, siTerraform, siTypescript, siVercel, siVitest, siVuedotjs, type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

/**
 * Technology logos from Simple Icons (CC0 icon data; marks belong to their owners and are used
 * only to name the tools we work with). AWS, OpenAI and Playwright are not in Simple Icons for
 * trademark reasons, so they render as a text monogram.
 */
const icons: Record<string, SimpleIcon> = {
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Vue.js": siVuedotjs,
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  Python: siPython,
  FastAPI: siFastapi,
  Go: siGo,
  "React Native": siReact,
  Expo: siExpo,
  Flutter: siFlutter,
  Swift: siSwift,
  Kotlin: siKotlin,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  MongoDB: siMongodb,
  Prisma: siPrisma,
  Supabase: siSupabase,
  pgvector: siPostgresql,
  "Google Cloud": siGooglecloud,
  Vercel: siVercel,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  Terraform: siTerraform,
  "GitHub Actions": siGithubactions,
  Claude: siClaude,
  LangGraph: siLanggraph,
  "Vercel AI SDK": siVercel,
  MCP: siModelcontextprotocol,
  "Hugging Face": siHuggingface,
  Vitest: siVitest,
  Sentry: siSentry,
  OpenTelemetry: siOpentelemetry,
  k6: siK6,
};

const monograms: Record<string, string> = { AWS: "aws", OpenAI: "AI", Playwright: "Pw" };

/** True when we have a logo or monogram for this technology name. */
export const hasTechLogo = (name: string) => name in icons || name in monograms;

/** Brand colours that are too light to read on white fall back to the foreground colour. */
function readable(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.75;
}

export function TechLogo({
  name,
  className,
  mono = false,
}: {
  name: string;
  className?: string;
  /** mono: render in currentColor (used in the scrolling strip); otherwise brand colour */
  mono?: boolean;
}) {
  const icon = icons[name];
  if (!icon) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-[5px] bg-current font-mono text-[9px] font-bold leading-none",
          className,
        )}
        aria-hidden
      >
        <span className="text-background">{monograms[name] ?? name.slice(0, 2)}</span>
      </span>
    );
  }
  const fill = mono || !readable(icon.hex) ? "currentColor" : `#${icon.hex}`;
  return (
    <svg viewBox="0 0 24 24" className={cn("shrink-0", className)} fill={fill} aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}
