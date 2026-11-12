import { agentCatalogue } from "./agents";
import { catalogue } from "./services";
/**
 * Single source of truth for site-wide copy, navigation and numbers.
 * ⚠️ VERIFY before launch: every value marked `verify` must be a real, defensible number
 * (PRD: "only verified testimonials and stats are shown").
 */

export const site = {
  name: "Falconfio",
  parent: "GK TechMatrix", // Falconfio is a technical brand of GK TechMatrix
  tagline: "Engineering that scales. AI agents that work.",
  email: "hello@falconfio.com",
  bookingUrl: "/contact", // TODO: replace with the Cal.com booking link (TRD §7.10)
  announcement: { text: "New: custom AI agents that plug into the tools you already use", cta: "Explore agents", href: "/agents" },
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string; description: string }[] };

/** Core services, in home-page order. The full catalogue lives in ./services.ts. */
const coreOrder = ["architecture", "ai", "product", "devops", "mvp", "rescue"];
export const services = coreOrder.map((slug) => {
  const s = catalogue.find((c) => c.slug === slug)!;
  return { slug: s.slug, title: s.title, description: s.description, icon: s.icon, image: s.image };
});

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: catalogue
      .filter((s) => s.core)
      .map((s) => ({ label: s.title, href: `/services/${s.slug}`, description: s.short })),
  },
  { label: "AI Agents", href: "/agents" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Products", href: "/products" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

/** verify: figures carried over from the v1 site */
export const heroStats = [
  { value: "50+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "8 wks", label: "Average time to launch" },
];

export const stackStrip = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Google Cloud",
  "Kubernetes", "Terraform", "Claude", "OpenAI", "LangGraph", "React Native",
];

export const reasons = [
  { title: "Architecture first", body: "We design for the load you will have, not the load you have today. Scale is planned, not patched." },
  { title: "Senior engineers only", body: "The people on your discovery call are the people who write your code. No hand-offs to juniors." },
  { title: "Weekly working demos", body: "Every week you see running software, not status slides. You always know where things stand." },
  { title: "AI where it pays", body: "We add AI where it measurably saves time or money, and we tell you when a simple rule will do instead." },
  { title: "Fixed scope, honest estimates", body: "Clear milestones and price ranges up front. If something changes, you hear it from us first." },
  { title: "You own everything", body: "Code, infrastructure and accounts live in your organisation from day one. No lock-in." },
  { title: "Built-in quality", body: "Automated tests, code review, observability and security checks are part of the job, not extras." },
  { title: "Support after launch", body: "We stay on for tuning, scaling and new features, so launch day is the start, not the finish." },
];

export const agents = agentCatalogue.filter((a) => a.featured);

/** verify: commitments shown in the stats band */
export const commitments = [
  { value: "2 wks", label: "To your first working release" },
  { value: "Weekly", label: "Live demos and written updates" },
  { value: "100%", label: "Code and IP ownership for you" },
  { value: "< 24 h", label: "Reply time on business days" },
  { value: "30 days", label: "Free post-launch support" },
];

export const techStack = [
  { group: "Front-end", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"] },
  { group: "Back-end", items: ["Node.js", "NestJS", "Python", "FastAPI", "Go"] },
  { group: "Mobile", items: ["React Native", "Expo", "Flutter", "Swift", "Kotlin"] },
  { group: "Data", items: ["PostgreSQL", "Redis", "MongoDB", "Prisma", "Supabase", "pgvector"] },
  { group: "Cloud & DevOps", items: ["AWS", "Google Cloud", "Vercel", "Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
  { group: "AI & Agents", items: ["Claude", "OpenAI", "LangGraph", "Vercel AI SDK", "MCP", "Hugging Face"] },
  { group: "Quality", items: ["Vitest", "Playwright", "Sentry", "OpenTelemetry", "k6"] },
];

export const process = [
  {
    step: "Discover",
    time: "Week 1",
    summary: "We learn your goals, users and constraints, and agree on what success looks like.",
    points: [
      { title: "Alignment", body: "A kickoff call to understand the product, the business model, the budget and the deadline." },
      { title: "Audit", body: "For existing products, a review of the code, architecture, infrastructure and costs." },
      { title: "Success metrics", body: "Two or three measurable outcomes we will report against every week." },
    ],
  },
  {
    step: "Blueprint",
    time: "Weeks 1–2",
    summary: "We turn the goals into an architecture, a backlog and a fixed-range estimate.",
    points: [
      { title: "Architecture", body: "System design, data model and integration plan, sized for future load." },
      { title: "UX flows", body: "Key screens and user journeys, validated with you before we build." },
      { title: "Plan & estimate", body: "Milestones, a team plan and a price range you can take to your board." },
    ],
  },
  {
    step: "Build",
    time: "Weeks 2–8",
    summary: "Short sprints, working software every week, and no surprises.",
    points: [
      { title: "Weekly demos", body: "Running software in a preview environment you can click through." },
      { title: "Quality gates", body: "Automated tests, code review and performance budgets on every change." },
      { title: "Launch", body: "Staged rollout with monitoring, alerts and a rollback plan." },
    ],
  },
  {
    step: "Scale",
    time: "Ongoing",
    summary: "After launch we tune, scale and keep shipping with you.",
    points: [
      { title: "Observe", body: "Dashboards for performance, errors, costs and the business metrics we agreed on." },
      { title: "Optimise", body: "Load testing, cost reduction and AI agent tuning based on real usage." },
      { title: "Grow", body: "New features, new agents and team hand-over or long-term partnership." },
    ],
  },
];

export const industries = [
  { name: "Fintech", slug: "fintech", icon: "Landmark" },
  { name: "Logistics", slug: "logistics", icon: "Truck" },
  { name: "E-commerce", slug: "ecommerce", icon: "ShoppingCart" },
  { name: "Healthcare", slug: "healthcare", icon: "HeartPulse" },
  { name: "SaaS", slug: "saas", icon: "Boxes" },
  { name: "Education", slug: "education", icon: "GraduationCap" },
  { name: "Real estate", slug: "real-estate", icon: "Building2" },
  { name: "Professional services", slug: "professional-services", icon: "Users" },
] as const;

export const faqs = [
  { q: "What does Falconfio do?", a: "We build scalable web, mobile and cloud products, and custom AI agents that automate real work inside the tools your team already uses." },
  { q: "Can you add AI agents to our existing product?", a: "Yes. Most of our agent work plugs into an existing stack such as your CRM, helpdesk, database or internal tools, with human review where it matters." },
  { q: "How long does a typical project take?", a: "An MVP usually takes 6 to 10 weeks. A focused AI agent can be live in 2 to 4 weeks. You get a working release within the first two weeks either way." },
  { q: "How much does it cost?", a: "Projects are scoped to milestones with a price range agreed up front. After a free discovery call you get a written estimate you can plan around." },
  { q: "Do we own the code?", a: "Yes. Code, infrastructure and accounts live in your organisation from day one, and you can take the work in-house at any time." },
  { q: "Do you work with early-stage startups?", a: "Yes. MVP sprints are built for founders who need to launch fast without building something they will have to throw away." },
  { q: "Which AI models do you use?", a: "We pick per use case, usually Claude or OpenAI models, and open-source models when data must stay on your infrastructure." },
  { q: "What happens after launch?", a: "Every project includes post-launch support. Many clients keep us on to scale the product, add agents and tune costs." },
];

export const footerColumns = [
  {
    title: "Services",
    links: [...services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })), { label: "All services", href: "/services" }],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Our Products", href: "/products" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "AI Agents", href: "/agents" },
      { label: "Blog", href: "/blog" },
      { label: "Architecture Scorecard", href: "/tools/scorecard" },
      { label: "Cost Estimator", href: "/tools/estimator" },
    ],
  },
];

/** Engagement models: footer cards and the services page. */
export const engagements = [
  { code: "01", title: "Fixed-scope project", body: "A defined product or agent, delivered against milestones and a price range agreed up front.", href: "/how-we-work#project" },
  { code: "02", title: "Dedicated squad", body: "A senior team that works as an extension of yours, with weekly demos and shared rituals.", href: "/how-we-work#squad" },
  { code: "03", title: "Architecture review", body: "A two-week deep dive into your code, infrastructure and costs, with a prioritised action plan.", href: "/how-we-work#review" },
  { code: "04", title: "AI retainer", body: "Ongoing agent building, tuning and monitoring, with a monthly report of hours and money saved.", href: "/how-we-work#retainer" },
];

/**
 * Pricing used by the estimator. Leave the rate as null to show timelines only;
 * set it (USD per team-week) to also show a cost range.
 */
export const pricing: { weeklyTeamRateUSD: number | null } = { weeklyTeamRateUSD: null };
