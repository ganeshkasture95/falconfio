import { cn } from "@/lib/utils";

/**
 * Falconfio eagle-F mark. Geometry is shared with specs/brand/*.svg.
 * Colours come from --logo-ink / --logo-head / --logo-slash so the theme can swap them;
 * `tone="onDark"` forces the reversed colours for always-dark bands.
 */
type Tone = "auto" | "onDark";

const reversed = {
  "--logo-ink": "#FFFFFF",
  "--logo-head": "transparent",
  "--logo-slash": "#FF2A1F",
} as React.CSSProperties;

export function LogoMark({ className, tone = "auto", title }: { className?: string; tone?: Tone; title?: string }) {
  return (
    <svg
      viewBox="12 70 556 440"
      className={cn("shrink-0", className)}
      style={tone === "onDark" ? reversed : undefined}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        fill="var(--logo-head)"
        d="M103 243 C141 233 155 231 175 229 L330 225 L320 165 C345 150 420 150 475 147 C515 138 545 120 560 78 C455 87 325 87 235 101 C137 117 53 175 27 237 C19 253 21 273 33 290 Z"
      />
      <path
        fill="none"
        stroke="var(--logo-ink)"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M103 243 C80 249 55 260 40 277 L33 290 C21 273 19 253 27 237 C53 175 137 117 235 101 C325 87 455 87 562 79 C547 120 515 140 470 150"
      />
      <path
        fill="var(--logo-ink)"
        d="M258 187 C285 165 345 157 415 153 C478 150 528 128 556 86 C538 130 495 152 435 163 C395 170 355 177 330 187 L327 217 L267 213 Z"
      />
      <path
        fill="var(--logo-ink)"
        d="M97 245 C135 233 205 231 275 231 L431 237 L387 290 L235 297 C213 362 178 445 123 503 C137 425 157 335 167 273 C145 263 120 255 97 245 Z"
      />
      <path fill="var(--logo-slash)" d="M237 311 L355 305 C330 335 297 365 272 405 C247 455 197 485 139 501 C180 445 210 385 237 311 Z" />
      <ellipse fill="var(--logo-ink)" cx="80" cy="215" rx="9" ry="7" />
      <path fill="var(--logo-ink)" d="M111 191 C123 177 137 171 157 173 C143 181 129 187 111 191 Z" />
    </svg>
  );
}

export function Logo({ className, tone = "auto" }: { className?: string; tone?: Tone }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Falconfio">
      <LogoMark tone={tone} className="h-9 w-auto" />
      <span className="text-[1.45rem] leading-none tracking-tight" aria-hidden>
        <span className={cn("font-extrabold", tone === "onDark" ? "text-white" : "text-foreground")}>Falcon</span>
        <span className={cn("font-medium", tone === "onDark" ? "text-flare" : "text-strike")}>fio</span>
      </span>
    </span>
  );
}
