/**
 * The full service catalogue: every service, and every solution inside it.
 * Powers /services, /services/[slug], the home page cards (core services), the nav and the footer.
 * Keep claims plain and verifiable: no unverified numbers here.
 */

export type Solution = { title: string; body: string };
export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  /** one line for cards and menus */
  short: string;
  /** a paragraph for the home page card and the service page header */
  description: string;
  icon: string;
  group: ServiceGroupId;
  /** shown on the home page, in the nav and in the footer */
  core?: boolean;
  idealFor: string[];
  solutions: Solution[];
  deliverables: string[];
  outcomes: string[];
  /** how an engagement usually runs: [stage, what happens] */
  approach: [string, string][];
  tech: string[];
  faqs: ServiceFaq[];
  caseStudies?: string[];
  image: ServiceImage;
};

/** CC0 photos from StockSnap (via Openverse), stored in /public/images/services. Credit is optional under CC0 but kept. */
export type ServiceImage = { src: string; alt: string; credit: string; href: string };

export type ServiceGroupId = "build" | "scale" | "ai" | "quality" | "advise";

export const serviceGroups: { id: ServiceGroupId; title: string; intro: string }[] = [
  { id: "build", title: "Build products", intro: "Design and engineer the web, mobile and SaaS products your customers use every day." },
  { id: "scale", title: "Scale & operate", intro: "Architecture, cloud and operations that keep the product fast and affordable as you grow." },
  { id: "ai", title: "AI, data & automation", intro: "Agents, data pipelines and integrations that take repetitive work off your team." },
  { id: "quality", title: "Quality & security", intro: "Testing, security and compliance built into delivery, not bolted on before launch." },
  { id: "advise", title: "Fix & advise", intro: "Rescue struggling products and get senior technical leadership when you need it." },
];

export const catalogue: Service[] = [
  // ── Build products ──────────────────────────────────────────────────────────
  {
    slug: "product",
    image: { src: "/images/services/product.jpg", alt: "A person using a smartphone at a table", credit: "Adrianna Calvo", href: "https://stocksnap.io/photo/iphone-smartphone-ODN23L0AC9" },
    title: "Web & Mobile Product Engineering",
    short: "Production-grade web and mobile apps, built to last.",
    description:
      "From MVP to production-grade product with Next.js, React Native and TypeScript. Fast first releases, clean codebases, and no rewrite when you hit product-market fit.",
    icon: "Smartphone",
    group: "build",
    core: true,
    idealFor: ["Funded startups", "Scale-ups adding a product line", "Companies replacing an off-the-shelf tool"],
    solutions: [
      { title: "Custom web applications", body: "Fast, accessible web apps with Next.js and React, built around your workflows." },
      { title: "SaaS platforms", body: "Multi-tenant SaaS with sign-up, billing, roles, admin and usage limits." },
      { title: "iOS & Android apps", body: "Cross-platform apps with React Native and Expo, or native Swift and Kotlin when needed." },
      { title: "Progressive web apps", body: "Installable, offline-capable web apps for teams in the field." },
      { title: "Customer & partner portals", body: "Self-service portals with secure logins, documents, payments and support." },
      { title: "Internal tools & dashboards", body: "Admin panels, back-office tools and live dashboards that replace spreadsheets." },
      { title: "E-commerce & marketplaces", body: "Headless storefronts, two-sided marketplaces, checkout and payment flows." },
      { title: "Marketing websites & CMS", body: "Fast, SEO-ready sites your team can edit without a developer." },
      { title: "Real-time features", body: "Chat, notifications, live collaboration and activity feeds." },
    ],
    deliverables: [
      "Working software released to real users every sprint",
      "A clean, documented codebase in your repository",
      "Automated tests and a CI/CD pipeline",
      "App store and production releases handled for you",
      "Handover sessions so your team can own it",
    ],
    outcomes: ["Ship your first release in weeks, not quarters", "A codebase new engineers can learn quickly", "No rewrite when usage grows"],
    approach: [
      ["Discover", "Workshops to agree users, scope, risks and what success looks like."],
      ["Design", "Clickable prototype and architecture plan, reviewed with you."],
      ["Build", "Two-week sprints with a demo at the end of each one."],
      ["Launch & grow", "Release, monitor, measure and keep improving."],
    ],
    tech: ["Next.js", "React", "TypeScript", "React Native", "Expo", "Swift", "Kotlin", "Node.js", "PostgreSQL", "Tailwind CSS"],
    faqs: [
      { q: "Do you build native or cross-platform apps?", a: "Usually cross-platform with React Native, which shares most code between iOS and Android. We go native with Swift or Kotlin when the app depends on heavy device features or graphics." },
      { q: "Who owns the code?", a: "You do. The code lives in your repository from the first commit, and full IP transfers to you." },
      { q: "Can you work with our existing team?", a: "Yes. We can own a whole product, a single feature area, or pair with your engineers inside your process." },
    ],
    caseStudies: ["saas-scaling-50k-users"],
  },
  {
    slug: "mvp",
    image: { src: "/images/services/mvp.jpg", alt: "A team planning a product with sticky notes on a table", credit: "Startup Stock Photos", href: "https://stocksnap.io/photo/team-meeting-84GOP2OAKR" },
    title: "Startup MVP Sprints",
    short: "Scope, design and launch a usable MVP in weeks.",
    description:
      "A focused build for founders: scope, design and launch a usable MVP in weeks, with an architecture that can carry you into your next funding round.",
    icon: "Rocket",
    group: "build",
    core: true,
    idealFor: ["Pre-seed and seed founders", "Corporate innovation teams", "Founders validating a new idea"],
    solutions: [
      { title: "Idea validation sprint", body: "Turn an idea into a tested prototype and a clear build plan in about two weeks." },
      { title: "Clickable prototypes", body: "Realistic prototypes you can put in front of users and investors." },
      { title: "MVP build", body: "The smallest product that proves your idea, built properly so it can grow." },
      { title: "AI-powered MVPs", body: "MVPs with AI at the core: assistants, search, summarising or automation." },
      { title: "Investor demo builds", body: "Polished, working demos for pitch meetings and due diligence." },
      { title: "Analytics from day one", body: "Product analytics and feedback loops so you learn from your first users." },
      { title: "Post-launch iteration", body: "Weekly releases based on what users actually do." },
    ],
    deliverables: ["A live product your first users can sign up to", "Prioritised roadmap for the next three months", "Analytics and feedback set up", "Everything in your own accounts and repository"],
    outcomes: ["Learn from real users quickly", "Spend only on what proves the idea", "An architecture that survives your next funding round"],
    approach: [
      ["Scope", "Cut the idea down to the one journey that proves it."],
      ["Prototype", "Test a clickable version with real users before building."],
      ["Build", "Short sprints with a working demo every week."],
      ["Launch", "Go live, measure, and plan the next round of features."],
    ],
    tech: ["Next.js", "React Native", "TypeScript", "Supabase", "PostgreSQL", "Vercel", "Claude"],
    faqs: [
      { q: "How small should an MVP be?", a: "Small enough to launch quickly, complete enough that a user can get real value from one core journey. We help you cut everything else." },
      { q: "Will we have to rebuild it later?", a: "That is exactly what we design against. The scope is small, but the foundations (data model, auth, deployment) are production-grade." },
    ],
  },
  {
    slug: "design",
    image: { src: "/images/services/design.jpg", alt: "Hand-drawn app wireframes in a notebook next to a phone", credit: "Jeffrey Betts", href: "https://stocksnap.io/photo/mockup-design-72RTRWFO25" },
    title: "UI/UX & Product Design",
    short: "Research-led design that users understand on first use.",
    description:
      "User research, UX and interface design, prototypes and design systems. We design products people understand on the first try, and hand engineers designs they can build.",
    icon: "PenTool",
    group: "build",
    idealFor: ["New products before the build", "Products with poor activation or retention", "Teams that need a design system"],
    solutions: [
      { title: "User research & interviews", body: "Talk to real users to find what they need and where they get stuck." },
      { title: "UX audits", body: "A review of your product's journeys with a prioritised list of fixes." },
      { title: "Information architecture", body: "Navigation and content structure that makes sense to your users." },
      { title: "Wireframes & prototypes", body: "Fast, testable layouts before any code is written." },
      { title: "UI design", body: "Clean, on-brand interfaces for web and mobile." },
      { title: "Design systems", body: "Reusable components and tokens shared by design and code." },
      { title: "Accessibility design", body: "Designs that meet WCAG 2.2 AA from the start." },
      { title: "Usability testing", body: "Watch users try the product and fix what confuses them." },
    ],
    deliverables: ["Research findings and user journeys", "Figma designs and prototypes", "A design system in Figma and code", "Developer-ready specs"],
    outcomes: ["Fewer support tickets about how things work", "Faster, more consistent builds", "Products that work for everyone, including assistive-tech users"],
    approach: [
      ["Research", "Interviews, analytics and competitor review."],
      ["Shape", "Journeys, information architecture and wireframes."],
      ["Design", "High-fidelity UI and prototypes, tested with users."],
      ["Systemise", "Components and tokens your engineers reuse."],
    ],
    tech: ["React", "Tailwind CSS", "Next.js", "TypeScript"],
    faqs: [
      { q: "Do you only design, or also build?", a: "Both. Design can be a standalone engagement, but it works best when the same team builds it." },
      { q: "Can you work with our existing brand?", a: "Yes. We extend your brand into a design system rather than replacing it." },
    ],
  },

  // ── Scale & operate ─────────────────────────────────────────────────────────
  {
    slug: "architecture",
    image: { src: "/images/services/architecture.jpg", alt: "Two engineers with laptops in a server room", credit: "Christina Morillo", href: "https://stocksnap.io/photo/servers-woman-ZYGIOUX4QU" },
    title: "Scalable Architecture & Cloud",
    short: "Systems designed for 10× the traffic you have today.",
    description:
      "Systems designed for 10× the traffic you have today. We review, re-architect and migrate so growth stops breaking things, and your cloud bill stops growing faster than revenue.",
    icon: "Layers",
    group: "scale",
    core: true,
    idealFor: ["Products slowing down under growth", "Teams with rising cloud bills", "Companies moving to the cloud"],
    solutions: [
      { title: "Architecture review", body: "A deep dive into code, infrastructure and costs, with a prioritised action plan." },
      { title: "System design for scale", body: "Services, data and caching designed for many times today's load." },
      { title: "Cloud migration", body: "Move from on-premise or another cloud to AWS or Google Cloud without downtime." },
      { title: "Microservices & modular monoliths", body: "Split the system where it helps, and only where it helps." },
      { title: "Serverless & event-driven systems", body: "Queues, events and functions that scale up and down with demand." },
      { title: "Database scaling & performance", body: "Query tuning, indexing, read replicas, partitioning and caching." },
      { title: "Cloud cost optimisation (FinOps)", body: "Find and remove waste so spend grows slower than revenue." },
      { title: "Green software (GreenOps)", body: "Cut energy use and carbon from your compute, and report on it." },
      { title: "Multi-region & high availability", body: "Failover, backups and disaster recovery you have actually tested." },
    ],
    deliverables: ["Architecture review report and roadmap", "Target architecture diagrams and decision records", "Load-test results before and after", "Migration runbooks", "Cost and performance dashboards"],
    outcomes: ["Peaks in traffic stop causing outages", "Faster pages and APIs", "A cloud bill you understand and control"],
    approach: [
      ["Assess", "Measure today's load, costs, bottlenecks and risks."],
      ["Design", "Target architecture and a step-by-step plan, agreed with you."],
      ["Migrate", "Change in small, reversible steps with no big-bang cutover."],
      ["Prove", "Load tests and dashboards show the improvement."],
    ],
    tech: ["AWS", "Google Cloud", "Kubernetes", "Terraform", "PostgreSQL", "Redis", "Go", "Node.js", "k6"],
    faqs: [
      { q: "Do we need microservices?", a: "Often not. Many products scale best as a well-structured modular monolith. We recommend what fits your team and load, not what is fashionable." },
      { q: "Can you migrate without downtime?", a: "In most cases, yes. We migrate step by step, running old and new side by side until the switch is safe." },
      { q: "What does an architecture review include?", a: "Around two weeks looking at your code, infrastructure, data and costs, ending with a written report and a prioritised plan you can act on with or without us." },
    ],
    caseStudies: ["saas-scaling-50k-users", "green-coding-energy"],
  },
  {
    slug: "devops",
    image: { src: "/images/services/devops.jpg", alt: "A developer typing code on a laptop", credit: "Negative Space", href: "https://stocksnap.io/photo/coding-programming-PBTF1NEBCG" },
    title: "DevOps & Platform Engineering",
    short: "Ship several times a day, with confidence.",
    description:
      "CI/CD, infrastructure as code, observability and on-call readiness. Ship several times a day with confidence, and know about problems before your users do.",
    icon: "Cloud",
    group: "scale",
    core: true,
    idealFor: ["Teams with slow or scary releases", "Products without monitoring", "Companies building an internal platform"],
    solutions: [
      { title: "CI/CD pipelines", body: "Automated build, test and deploy on every change." },
      { title: "Infrastructure as code", body: "Your whole environment in Terraform, reviewed like any other code." },
      { title: "Kubernetes & containers", body: "Containerise apps and run them reliably on managed Kubernetes." },
      { title: "Observability", body: "Logs, metrics, traces and alerts with OpenTelemetry, so you see problems first." },
      { title: "Internal developer platforms", body: "Self-service environments and golden paths for your engineers." },
      { title: "Preview environments", body: "A live copy of the app for every pull request." },
      { title: "Release strategies", body: "Feature flags, canary and blue-green releases with quick rollback." },
      { title: "Incident response & on-call", body: "Runbooks, alerting and post-incident reviews that actually prevent repeats." },
      { title: "Backup & disaster recovery", body: "Automated backups and recovery plans that are tested regularly." },
    ],
    deliverables: ["Working pipelines for every service", "Terraform for all environments", "Dashboards, alerts and runbooks", "Documentation and team training"],
    outcomes: ["Small, frequent, low-risk releases", "Problems found before users report them", "Faster recovery when things go wrong"],
    approach: [
      ["Audit", "Map how code gets to production today and where it hurts."],
      ["Automate", "Pipelines, infrastructure as code and environments."],
      ["Observe", "Monitoring, alerts and dashboards that matter."],
      ["Hand over", "Train your team and document everything."],
    ],
    tech: ["GitHub Actions", "Terraform", "Docker", "Kubernetes", "AWS", "Google Cloud", "OpenTelemetry", "Sentry", "Vercel"],
    faqs: [
      { q: "Do you replace our ops team?", a: "No. We build the platform and practices, then hand them over. We can also stay on as support if you want." },
      { q: "Which cloud do you work with?", a: "Mostly AWS, Google Cloud and Vercel. We are pragmatic and work with what you already use." },
    ],
  },
  {
    slug: "support",
    image: { src: "/images/services/support.jpg", alt: "A person monitoring a live product on two screens", credit: "Startup Stock Photos", href: "https://stocksnap.io/photo/coding-programming-SCC00WCQ3I" },
    title: "Managed Support & Maintenance",
    short: "Keep your product secure, fast and up to date.",
    description:
      "Ongoing care for live products: monitoring, updates, security patches, bug fixes and small improvements, with clear response times agreed in writing.",
    icon: "LifeBuoy",
    group: "scale",
    idealFor: ["Products after launch", "Teams without in-house engineers", "Companies inheriting an app from another agency"],
    solutions: [
      { title: "Monitoring & uptime", body: "Round-the-clock monitoring with alerts routed to the right person." },
      { title: "Bug fixing", body: "Reported issues triaged, fixed and released quickly." },
      { title: "Security patching", body: "Dependencies and infrastructure kept current and patched." },
      { title: "Framework & dependency upgrades", body: "Stay on supported versions without painful jumps later." },
      { title: "Performance tuning", body: "Regular checks to keep pages and APIs fast." },
      { title: "Small enhancements", body: "A monthly allowance for improvements and new small features." },
      { title: "App store maintenance", body: "Keep mobile apps compliant with Apple and Google policy changes." },
    ],
    deliverables: ["Agreed response and resolution times", "Monthly report of work done and system health", "Up-to-date documentation"],
    outcomes: ["Fewer surprises in production", "A product that does not quietly age", "Predictable monthly cost"],
    approach: [
      ["Onboard", "Review the system, set up access, monitoring and runbooks."],
      ["Stabilise", "Fix the riskiest issues first."],
      ["Maintain", "Patching, upgrades and fixes on a regular cycle."],
      ["Report", "A clear monthly summary of what changed and why."],
    ],
    tech: ["Sentry", "OpenTelemetry", "GitHub Actions", "AWS", "Vercel"],
    faqs: [
      { q: "Can you support an app you didn't build?", a: "Yes. We start with a short onboarding review so we understand the code and its risks before taking responsibility for it." },
      { q: "What response times do you offer?", a: "We agree them with you in writing, based on how critical the system is." },
    ],
  },

  // ── AI, data & automation ───────────────────────────────────────────────────
  {
    slug: "ai",
    image: { src: "/images/services/ai.jpg", alt: "A friendly humanoid robot holding a tablet", credit: "Alex Knight", href: "https://stocksnap.io/photo/robot-technology-WUBMLJRYEK" },
    title: "AI Strategy & Custom Agents",
    short: "Agents that do real work, with a human in the loop.",
    description:
      "Agents that handle real work: support triage, lead qualification, document processing and ops follow-ups. Built with guardrails, human review and clear ROI from day one.",
    icon: "Bot",
    group: "ai",
    core: true,
    idealFor: ["Teams buried in repetitive work", "Companies with lots of documents or tickets", "Leaders who want an AI plan that pays back"],
    solutions: [
      { title: "AI strategy & opportunity mapping", body: "Find the workflows where AI saves the most time, and estimate the payback." },
      { title: "Custom AI agents", body: "Agents that read, decide and act inside your tools, with guardrails." },
      { title: "Multi-agent orchestration", body: "Teams of specialised agents that hand work to each other." },
      { title: "AI assistants & chatbots", body: "Assistants for customers or staff, grounded on your own content." },
      { title: "RAG & knowledge search", body: "Search and answers over your documents, wikis and tickets, with sources." },
      { title: "Document processing", body: "Extract data from invoices, contracts and forms into your systems." },
      { title: "AI in your product", body: "Add summarising, drafting, classification or recommendations to your app." },
      { title: "MCP servers & tool integrations", body: "Give AI models safe, audited access to your systems." },
      { title: "Evaluation, guardrails & monitoring", body: "Test quality, block unsafe output and watch cost and accuracy in production." },
      { title: "Voice agents", body: "Phone and voice assistants for bookings, support and follow-ups." },
    ],
    deliverables: ["An AI opportunity map with estimated savings", "Agents running in your tools", "Evaluation suite and quality dashboard", "Human-review flows for edge cases", "Cost and usage monitoring"],
    outcomes: ["Hours of repetitive work handled automatically", "Faster responses to customers", "AI spend tracked against the value it creates"],
    approach: [
      ["Map", "Find and rank the workflows worth automating."],
      ["Prototype", "A working agent on real data within weeks."],
      ["Harden", "Guardrails, evaluations and human review."],
      ["Run", "Deploy, monitor and improve with monthly reporting."],
    ],
    tech: ["Claude", "OpenAI", "LangGraph", "MCP", "Vercel AI SDK", "Python", "pgvector", "Hugging Face"],
    faqs: [
      { q: "Is our data safe with AI models?", a: "We use enterprise model providers that don't train on your data, keep data in the region you choose, and give agents only the access they need." },
      { q: "What if the agent gets something wrong?", a: "We design for it: confidence checks, guardrails, and a human review step for anything unusual or high-value." },
      { q: "How do we know it's worth it?", a: "We estimate the payback before building, then track time and money saved once it's live." },
    ],
    caseStudies: ["agentic-ai-workflow"],
  },
  {
    slug: "data",
    image: { src: "/images/services/data.jpg", alt: "A laptop showing an analytics dashboard with charts", credit: "Negative Space", href: "https://stocksnap.io/photo/analytics-charts-JVSII4KCCK" },
    title: "Data Engineering & Analytics",
    short: "Reliable data pipelines and dashboards you can trust.",
    description:
      "Pipelines, warehouses and dashboards that bring your data together, so every team works from the same numbers, and your AI has clean data to learn from.",
    icon: "Database",
    group: "ai",
    idealFor: ["Teams reporting from spreadsheets", "Companies with data spread across many tools", "Products preparing for AI features"],
    solutions: [
      { title: "Data pipelines (ETL/ELT)", body: "Move data reliably from your apps and tools into one place." },
      { title: "Data warehouses & lakehouses", body: "A single, well-modelled home for your company's data." },
      { title: "BI dashboards & reporting", body: "Dashboards that answer real business questions, refreshed automatically." },
      { title: "Real-time streaming", body: "Event streams for live metrics, alerts and personalisation." },
      { title: "Product analytics", body: "Track how users behave and where they drop off." },
      { title: "Data quality & governance", body: "Tests, ownership and access rules so numbers can be trusted." },
      { title: "Vector databases & embeddings", body: "Prepare your content for AI search and agents." },
      { title: "Forecasting & machine learning", body: "Predict demand, churn or risk with models you can explain." },
    ],
    deliverables: ["Pipelines with tests and alerts", "A documented data model", "Dashboards for each team", "Data access and ownership rules"],
    outcomes: ["One version of the truth", "Less time building reports by hand", "Data ready for AI"],
    approach: [
      ["Inventory", "List sources, questions and owners."],
      ["Model", "Design the warehouse and core metrics."],
      ["Build", "Pipelines, tests and dashboards."],
      ["Adopt", "Train teams and retire old reports."],
    ],
    tech: ["Python", "PostgreSQL", "Google Cloud", "AWS", "pgvector", "MongoDB", "Redis"],
    faqs: [
      { q: "Which BI tool do you use?", a: "We work with the tool you have, or recommend one that fits your team and budget." },
      { q: "Can you help us get ready for AI?", a: "Yes. Clean, well-described data is the biggest factor in useful AI. We often start here before building agents." },
    ],
  },
  {
    slug: "integrations",
    image: { src: "/images/services/integrations.jpg", alt: "An engineer connecting network cables in a server rack", credit: "Field Engineer", href: "https://stocksnap.io/photo/engineer-fiber-6Z663NNH9K" },
    title: "APIs, Integrations & Automation",
    short: "Connect your tools and automate the busywork.",
    description:
      "APIs, system integrations and workflow automation that connect your CRM, ERP, payments and internal tools, so data flows without copy-paste.",
    icon: "Plug",
    group: "ai",
    idealFor: ["Teams copying data between tools", "Products that need a public API", "Companies replacing manual processes"],
    solutions: [
      { title: "API design & development", body: "REST and GraphQL APIs that are documented, versioned and secure." },
      { title: "Third-party integrations", body: "Connect CRMs, ERPs, payment providers, email and calendars." },
      { title: "Payments & billing", body: "Subscriptions, invoicing, payouts and tax with providers like Stripe." },
      { title: "Workflow automation", body: "Automate approvals, hand-offs and notifications across tools." },
      { title: "Webhooks & event systems", body: "Real-time updates between systems, with retries and logging." },
      { title: "Legacy system integration", body: "Connect older systems to modern apps without replacing them yet." },
      { title: "Authentication & SSO", body: "Single sign-on, social login and role-based access." },
      { title: "Developer portals", body: "Docs, keys and sandboxes for partners using your API." },
    ],
    deliverables: ["Documented APIs with tests", "Integrations with monitoring and retries", "Automated workflows with audit logs"],
    outcomes: ["Less manual data entry", "Fewer errors between systems", "Partners can build on your platform"],
    approach: [
      ["Map", "Trace how data and work move between tools today."],
      ["Design", "Agree contracts, events and error handling."],
      ["Build", "Integrations with tests, retries and logs."],
      ["Monitor", "Alerts when something fails, before it piles up."],
    ],
    tech: ["Node.js", "NestJS", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis"],
    faqs: [
      { q: "Can you integrate with a system that has no API?", a: "Often, yes, through database access, file exchange, or an automation layer. We assess the safest option first." },
      { q: "Do you use no-code tools?", a: "When they fit. For critical flows we usually write code so it can be tested and monitored properly." },
    ],
  },

  // ── Quality & security ─────────────────────────────────────────────────────
  {
    slug: "qa",
    image: { src: "/images/services/qa.jpg", alt: "A hand ticking items off a checklist in a notebook", credit: "Glenn Carstens-Peters", href: "https://stocksnap.io/photo/checklist-goals-TBJ9OPDGMK" },
    title: "Quality Engineering & Testing",
    short: "Automated testing that lets you release without fear.",
    description:
      "Test strategy, automation, performance and accessibility testing built into your pipeline, so releases are routine and bugs are caught before users see them.",
    icon: "BadgeCheck",
    group: "quality",
    idealFor: ["Teams afraid to release", "Products with recurring bugs", "Apps that must meet accessibility rules"],
    solutions: [
      { title: "Test strategy", body: "The right mix of unit, integration and end-to-end tests for your product." },
      { title: "Test automation", body: "Automated end-to-end tests with Playwright, running on every change." },
      { title: "Performance & load testing", body: "Find breaking points before your users do, with k6." },
      { title: "Accessibility testing", body: "Automated and manual checks against WCAG 2.2 AA." },
      { title: "Mobile device testing", body: "Test on the devices and OS versions your users actually have." },
      { title: "API & contract testing", body: "Catch breaking changes between services early." },
      { title: "AI & LLM evaluation", body: "Measure accuracy, safety and regressions in AI features." },
    ],
    deliverables: ["A test strategy document", "Automated test suites in your pipeline", "Load-test and accessibility reports"],
    outcomes: ["Fewer bugs in production", "Faster, calmer releases", "Confidence when changing old code"],
    approach: [
      ["Assess", "Review current tests, bugs and release process."],
      ["Plan", "Agree a test strategy and the highest-value tests."],
      ["Automate", "Build suites and add them to CI."],
      ["Maintain", "Keep tests fast, stable and useful."],
    ],
    tech: ["Playwright", "Vitest", "k6", "GitHub Actions", "TypeScript"],
    faqs: [
      { q: "Do you provide manual testers?", a: "We focus on automation, with targeted manual and exploratory testing where it adds value, such as accessibility." },
    ],
  },
  {
    slug: "security",
    image: { src: "/images/services/security.jpg", alt: "A laptop with a hardware security key plugged in", credit: "Negative Space", href: "https://stocksnap.io/photo/transaction-onlinebanking-BM2OM50PLO" },
    title: "Security & Compliance",
    short: "Security built in, and audits you can pass.",
    description:
      "Secure architecture, code reviews, penetration-test fixes and the controls you need for SOC 2, ISO 27001, GDPR or HIPAA, without slowing your team down.",
    icon: "ShieldCheck",
    group: "quality",
    idealFor: ["Startups selling to enterprises", "Regulated industries", "Teams preparing for an audit"],
    solutions: [
      { title: "Security reviews", body: "Architecture and code reviewed against OWASP and cloud best practice." },
      { title: "Secure SDLC", body: "Dependency scanning, secret scanning and reviews built into delivery." },
      { title: "Cloud security hardening", body: "Least-privilege access, network rules, encryption and logging." },
      { title: "Penetration test remediation", body: "Fix findings from your pen test and prove they are closed." },
      { title: "Compliance readiness", body: "Controls and evidence for SOC 2, ISO 27001, GDPR and HIPAA." },
      { title: "Identity & access management", body: "SSO, MFA and role-based access across your systems." },
      { title: "Data privacy engineering", body: "Consent, data retention, deletion and residency built into the product." },
      { title: "AI security", body: "Protect agents against prompt injection, data leaks and misuse." },
    ],
    deliverables: ["Security review report with fixes", "Hardened infrastructure as code", "Policies and evidence for your auditor"],
    outcomes: ["Pass security questionnaires faster", "Fewer vulnerabilities in production", "Audit-ready without a scramble"],
    approach: [
      ["Assess", "Threat model, review and gap analysis."],
      ["Fix", "Close the highest-risk issues first."],
      ["Embed", "Add checks to the pipeline so issues don't return."],
      ["Evidence", "Collect what your auditor needs."],
    ],
    tech: ["AWS", "Google Cloud", "Terraform", "GitHub Actions", "Sentry"],
    faqs: [
      { q: "Are you an auditor?", a: "No. We prepare your systems and evidence. Certification is done by an independent auditor." },
      { q: "Do you do penetration testing?", a: "We work with specialist testers and fix what they find. Keeping testing independent from the builders is better practice." },
    ],
  },

  // ── Fix & advise ────────────────────────────────────────────────────────────
  {
    slug: "rescue",
    image: { src: "/images/services/rescue.jpg", alt: "A person repairing something at a workbench full of tools", credit: "m0851", href: "https://stocksnap.io/photo/tools-people-ERNYCFWP8I" },
    title: "Product Rescue & Modernisation",
    short: "Stabilise and modernise fragile codebases.",
    description:
      "Slow, fragile or half-finished codebase? We audit it, stabilise it, and modernise it step by step, without stopping your roadmap.",
    icon: "Wrench",
    group: "advise",
    core: true,
    idealFor: ["Projects left unfinished by another team", "Legacy systems holding the business back", "Products where every change breaks something"],
    solutions: [
      { title: "Code & architecture audit", body: "An honest report on what is wrong, what is fine, and what to do first." },
      { title: "Project takeover", body: "Take over from a previous agency or team with a smooth handover." },
      { title: "Stabilisation", body: "Fix crashes, data issues and the worst bugs first." },
      { title: "Legacy modernisation", body: "Move old stacks to modern frameworks step by step, not in one risky rewrite." },
      { title: "Performance rescue", body: "Find and fix what makes the product slow." },
      { title: "Technical debt reduction", body: "Pay down the debt that slows your team most." },
      { title: "Monolith to modular", body: "Untangle a big codebase into clear, independent parts." },
    ],
    deliverables: ["Audit report with a prioritised plan", "A stable, monitored production system", "Modernised code with tests", "Documentation your team can use"],
    outcomes: ["Fewer incidents", "Features ship again", "A codebase the team is not afraid of"],
    approach: [
      ["Audit", "Read the code, run it, and talk to the team."],
      ["Stabilise", "Stop the bleeding: monitoring, backups, critical fixes."],
      ["Modernise", "Replace the worst parts step by step."],
      ["Hand back", "Leave your team in control."],
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "Docker", "Sentry"],
    faqs: [
      { q: "Should we rewrite from scratch?", a: "Rarely. Full rewrites are slow and risky. We usually modernise in place, part by part, while the product keeps running." },
      { q: "Our previous agency left no documentation. Can you still help?", a: "Yes. That is a common starting point. The audit includes documenting how the system actually works." },
    ],
  },
  {
    slug: "leadership",
    image: { src: "/images/services/leadership.jpg", alt: "A team in a meeting around a conference table with laptops", credit: "Christina Morillo", href: "https://stocksnap.io/photo/conferenceroom-meeting-GVUWVKUHZE" },
    title: "Technical Leadership & Teams",
    short: "Fractional CTOs, dedicated squads and expert advice.",
    description:
      "Senior technical leadership when you need it: a fractional CTO, due diligence for investors, or a dedicated squad that works as an extension of your team.",
    icon: "Compass",
    group: "advise",
    idealFor: ["Non-technical founders", "Investors assessing a tech company", "Teams that need senior capacity fast"],
    solutions: [
      { title: "Fractional CTO", body: "Part-time senior leadership for strategy, hiring and architecture decisions." },
      { title: "Technical due diligence", body: "An independent assessment of a product, team and code before you invest or acquire." },
      { title: "Dedicated squads", body: "A full senior team working as an extension of yours." },
      { title: "Team augmentation", body: "Add experienced engineers to your team for a project or phase." },
      { title: "Technology roadmaps", body: "A plan that links technical work to business goals." },
      { title: "Build vs buy advice", body: "Decide what to build, what to buy and what to skip." },
      { title: "Hiring & team building", body: "Define roles, run technical interviews and onboard new engineers." },
      { title: "Engineering process coaching", body: "Better planning, reviews and delivery habits for your team." },
    ],
    deliverables: ["Clear technical decisions, written down", "Roadmaps and hiring plans", "Due diligence reports", "Hands-on engineering capacity"],
    outcomes: ["Better decisions, made sooner", "A team that delivers predictably", "Investors who trust your technology"],
    approach: [
      ["Understand", "Goals, team, product and constraints."],
      ["Advise", "Recommendations and a plan you agree with."],
      ["Lead or build", "Guide your team, or add ours."],
      ["Step back", "Hand over as your own leadership grows."],
    ],
    tech: ["TypeScript", "Python", "AWS", "Google Cloud", "Claude"],
    faqs: [
      { q: "How much time does a fractional CTO spend with us?", a: "It depends on your stage, typically from one to three days a week, agreed up front and reviewed monthly." },
      { q: "Can the squad work in our time zone?", a: "We agree overlap hours and rituals with you so the team works like part of yours." },
    ],
  },
];

export const getService = (slug: string) => catalogue.find((s) => s.slug === slug);
export const solutionCount = catalogue.reduce((n, s) => n + s.solutions.length, 0);

/** Anchor id for a solution on its service page. */
export const solutionId = (title: string) =>
  title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
