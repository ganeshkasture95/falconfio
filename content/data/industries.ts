/**
 * Industry solution pages (/solutions/[industry]). Agents and services reference the catalogues by slug;
 * `caseStudyIndustry` matches the `industry` field in case-study MDX meta.
 */

export type Industry = {
  slug: string;
  name: string;
  icon: string;
  headline: string;
  intro: string;
  pains: { title: string; body: string }[];
  agents: string[];
  pattern: { title: string; steps: [string, string][] };
  compliance: string[];
  services: string[];
  caseStudyIndustry?: string;
};

export const industryPages: Industry[] = [
  {
    slug: "fintech",
    name: "Fintech",
    icon: "Landmark",
    headline: "Fintech platforms that stay fast, compliant and trusted",
    intro: "Payments, lending, wealth and banking products where every transaction matters and regulators are watching.",
    pains: [
      { title: "Traffic spikes at the worst time", body: "Salary days, market opens and campaigns hit the database all at once." },
      { title: "Manual compliance work", body: "KYC reviews, document checks and reports that eat analyst time." },
      { title: "Fragile integrations", body: "Banks, payment providers and bureaus with slow or flaky APIs." },
      { title: "Audit pressure", body: "Every change needs a trail, and every access needs a reason." },
    ],
    agents: ["document-processing", "support-triage", "accounts-payable"],
    pattern: {
      title: "Event-driven ledger with an audit trail",
      steps: [
        ["Ingest", "Payments and events land on a durable queue, never lost under load."],
        ["Record", "An append-only ledger in Postgres keeps every change, with idempotent writes."],
        ["Check", "Rules and agents flag risky activity and route it to a person."],
        ["Report", "Read replicas power dashboards and regulator reports without touching production."],
      ],
    },
    compliance: ["PCI DSS for card data", "SOC 2 and ISO 27001 controls", "RBI and DPDP (India), GDPR (EU) data rules", "Full audit logs for agents and staff"],
    services: ["architecture", "security", "ai"],
    caseStudyIndustry: "Financial Technology",
  },
  {
    slug: "logistics",
    name: "Logistics",
    icon: "Truck",
    headline: "Logistics systems that react before the delay does",
    intro: "Freight, last-mile and supply-chain teams who run on exceptions, emails and tracking feeds.",
    pains: [
      { title: "Exceptions everywhere", body: "Delays, re-routes and missing paperwork handled by email and phone." },
      { title: "Data in a dozen systems", body: "Carriers, warehouses and customers each with their own portal." },
      { title: "Slow customer updates", body: "Customers ask where their shipment is before you know." },
      { title: "Paper-heavy processes", body: "Bills of lading, invoices and customs forms typed in by hand." },
    ],
    agents: ["order-ops", "document-processing", "voice-receptionist"],
    pattern: {
      title: "Real-time tracking with agent-handled exceptions",
      steps: [
        ["Stream", "GPS, carrier and warehouse events flow into one live timeline per shipment."],
        ["Detect", "Rules and an orchestrator agent spot delays and risks early."],
        ["Act", "Specialist agents re-route, rebook and notify, within limits you set."],
        ["Escalate", "Anything high-value or unusual goes to a person with a ready summary."],
      ],
    },
    compliance: ["Customs and trade documentation checks", "Data retention per contract", "Role-based access for partners"],
    services: ["ai", "integrations", "data"],
    caseStudyIndustry: "Logistics & Supply Chain",
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    icon: "ShoppingCart",
    headline: "E-commerce that survives the sale and keeps customers coming back",
    intro: "Online stores and marketplaces where speed sells, and every support ticket costs margin.",
    pains: [
      { title: "Sale-day slowdowns", body: "Checkout gets slow exactly when traffic and revenue peak." },
      { title: "Support overload", body: "Where-is-my-order and returns questions flood the inbox." },
      { title: "Rising cloud bills", body: "Infrastructure costs grow faster than orders." },
      { title: "Disconnected tools", body: "Store, warehouse, ads and CRM that don't talk to each other." },
    ],
    agents: ["support-triage", "order-ops", "content-research"],
    pattern: {
      title: "Headless storefront with cached, resilient checkout",
      steps: [
        ["Cache", "Product pages served from the edge, updated the moment stock changes."],
        ["Protect", "Checkout isolated and load-tested, with queues for spikes."],
        ["Automate", "Agents answer order questions and process returns."],
        ["Measure", "One dashboard for conversion, speed and cost per order."],
      ],
    },
    compliance: ["PCI DSS via your payment provider", "GDPR and DPDP consent and deletion", "Accessibility (WCAG 2.2 AA)"],
    services: ["product", "architecture", "ai"],
    caseStudyIndustry: "E-commerce",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    headline: "Healthcare software that protects patients and frees up staff",
    intro: "Clinics, health-tech and care providers balancing patient experience with strict data rules.",
    pains: [
      { title: "Admin overload", body: "Booking, reminders, forms and insurance paperwork take clinicians' time." },
      { title: "Sensitive data", body: "Health data needs strict access control and audit trails." },
      { title: "Legacy systems", body: "Old practice-management tools that are hard to integrate with." },
      { title: "Missed appointments", body: "No-shows that cost revenue and delay care." },
    ],
    agents: ["voice-receptionist", "document-processing", "employee-helpdesk"],
    pattern: {
      title: "Privacy-first patient platform",
      steps: [
        ["Separate", "Health data stored apart from everything else, encrypted, in your chosen region."],
        ["Control", "Role-based access with every read and write logged."],
        ["Assist", "Agents handle booking and forms, never diagnosis, with staff review."],
        ["Integrate", "Standards-based connections (such as FHIR) to existing systems."],
      ],
    },
    compliance: ["HIPAA (US) and DPDP (India) safeguards", "Encryption at rest and in transit", "Audit logs and least-privilege access", "No patient data used to train models"],
    services: ["security", "product", "ai"],
  },
  {
    slug: "saas",
    name: "SaaS",
    icon: "Boxes",
    headline: "SaaS platforms built for the next 10× of customers",
    intro: "B2B and B2C software companies scaling users, tenants and features without slowing the team down.",
    pains: [
      { title: "Growth breaks things", body: "New customers bring new load, and incidents follow." },
      { title: "Slow releases", body: "Every deploy is risky, so the team ships less often." },
      { title: "Enterprise requirements", body: "SSO, audit logs and security questionnaires block deals." },
      { title: "Support scaling linearly", body: "More customers means more tickets and more hires." },
    ],
    agents: ["support-triage", "lead-qualification", "meeting-followup"],
    pattern: {
      title: "Multi-tenant platform with safe, frequent releases",
      steps: [
        ["Isolate", "Tenants separated in data and limits, so one customer can't slow the rest."],
        ["Ship", "CI/CD, preview environments and feature flags for low-risk releases."],
        ["Observe", "Tracing and alerts per tenant, so you see problems first."],
        ["Sell up", "SSO, roles and audit logs ready for enterprise buyers."],
      ],
    },
    compliance: ["SOC 2 readiness", "SSO, SCIM and audit logs", "GDPR and DPDP data processing terms"],
    services: ["architecture", "devops", "ai"],
    caseStudyIndustry: "Financial Technology",
  },
  {
    slug: "education",
    name: "Education",
    icon: "GraduationCap",
    headline: "Learning platforms that handle exam day and every day",
    intro: "Ed-tech companies, schools and training providers serving learners at scale.",
    pains: [
      { title: "Exam-day spikes", body: "Everyone logs in at once and the platform slows down." },
      { title: "Repetitive questions", body: "Admissions, fees and schedule questions answered again and again." },
      { title: "Content at scale", body: "Courses, quizzes and notes that take ages to produce." },
      { title: "Mobile-first learners", body: "Students on low-end phones and patchy networks." },
    ],
    agents: ["support-triage", "content-research", "employee-helpdesk"],
    pattern: {
      title: "Resilient learning platform with an AI study assistant",
      steps: [
        ["Scale", "Auto-scaling and caching tuned for exam-day peaks."],
        ["Reach", "Lightweight, offline-friendly mobile and web apps."],
        ["Assist", "A study assistant that answers from your own course material, with sources."],
        ["Learn", "Analytics on where learners struggle, to improve content."],
      ],
    },
    compliance: ["Child data protection (DPDP, COPPA where relevant)", "Accessibility (WCAG 2.2 AA)", "Age-appropriate AI guardrails"],
    services: ["product", "architecture", "ai"],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    icon: "Building2",
    headline: "Real-estate tech that turns enquiries into viewings",
    intro: "Developers, brokers and property managers handling leads, documents and tenants.",
    pains: [
      { title: "Leads go cold", body: "Enquiries arrive at all hours and wait days for a reply." },
      { title: "Document-heavy deals", body: "Agreements, IDs and payment proofs checked by hand." },
      { title: "Tenant requests", body: "Maintenance and billing questions spread across phone and chat." },
      { title: "Scattered listings data", body: "Inventory, prices and availability out of sync." },
    ],
    agents: ["lead-qualification", "voice-receptionist", "document-processing"],
    pattern: {
      title: "Always-on lead and tenant desk",
      steps: [
        ["Capture", "Every enquiry from web, portals, WhatsApp and phone in one place."],
        ["Qualify", "An agent asks the right questions and books viewings."],
        ["Verify", "Documents read, checked and filed automatically."],
        ["Serve", "Tenant requests triaged and routed to the right team."],
      ],
    },
    compliance: ["KYC document handling", "Consent for marketing messages", "Data retention and deletion"],
    services: ["ai", "integrations", "product"],
  },
  {
    slug: "professional-services",
    name: "Professional services",
    icon: "Users",
    headline: "Professional services firms that spend time on clients, not admin",
    intro: "Agencies, consultancies, accounting and legal teams whose product is expertise.",
    pains: [
      { title: "Admin eats billable time", body: "Notes, follow-ups and status reports done after hours." },
      { title: "Knowledge locked in people", body: "Answers live in inboxes and senior staff's heads." },
      { title: "Slow proposals", body: "Every proposal and report starts from a blank page." },
      { title: "Messy handoffs", body: "Work falls between sales, delivery and finance." },
    ],
    agents: ["meeting-followup", "employee-helpdesk", "accounts-payable"],
    pattern: {
      title: "A firm-wide knowledge layer with assistant agents",
      steps: [
        ["Connect", "Documents, wikis and past work indexed securely, respecting permissions."],
        ["Ask", "Staff get answers with sources in Slack or Teams."],
        ["Draft", "Agents prepare notes, proposals and reports for review."],
        ["Bill", "Time and invoices reconciled automatically."],
      ],
    },
    compliance: ["Client confidentiality and permission-aware search", "Professional-body record keeping", "GDPR and DPDP"],
    services: ["ai", "data", "integrations"],
  },
];

export const getIndustry = (slug: string) => industryPages.find((i) => i.slug === slug);
