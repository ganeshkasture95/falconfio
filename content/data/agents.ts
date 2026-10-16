/**
 * Agent catalogue for /agents and the home page band. Each agent is a pattern we build and adapt
 * to a client's tools; descriptions stay plain and avoid unverified numbers.
 */

export type Department = "Sales" | "Support" | "Operations" | "Finance" | "People" | "Marketing";

export type Agent = {
  slug: string;
  name: string;
  fn: Department;
  body: string;
  tools: string[];
  /** what the agent does, step by step */
  steps: string[];
  /** when a person is pulled in */
  human: string;
  /** words that match a visitor's description of a task, for the hero prompt */
  keywords: string[];
  featured?: boolean;
};

export const departments: Department[] = ["Sales", "Support", "Operations", "Finance", "People", "Marketing"];

export const agentCatalogue: Agent[] = [
  {
    slug: "support-triage",
    name: "Support Triage Agent",
    fn: "Support",
    body: "Reads every ticket, answers the routine ones from your docs, and routes the rest with a summary.",
    tools: ["Zendesk", "Intercom", "Slack"],
    steps: ["Read the new ticket and its history", "Search your help docs for an answer", "Reply to routine questions with sources", "Tag, prioritise and route the rest with a summary"],
    human: "Angry customers, refunds and anything the docs don't cover.",
    keywords: ["support", "ticket", "customer", "help", "zendesk", "intercom", "reply", "complaint", "faq"],
    featured: true,
  },
  {
    slug: "lead-qualification",
    name: "Lead Qualification Agent",
    fn: "Sales",
    body: "Researches inbound leads, scores them against your ideal customer, and books calls for the good ones.",
    tools: ["HubSpot", "Gmail", "Cal.com"],
    steps: ["Pick up the new lead from your form or inbox", "Research the company and the person", "Score the lead against your ideal customer", "Reply and book a call, or nurture"],
    human: "Large deals, existing customers and unclear fits.",
    keywords: ["lead", "sales", "qualify", "crm", "hubspot", "prospect", "book", "call", "demo", "inbound"],
    featured: true,
  },
  {
    slug: "document-processing",
    name: "Document Processing Agent",
    fn: "Operations",
    body: "Extracts data from invoices, contracts and forms, checks it, and posts it to your systems.",
    tools: ["Google Drive", "Postgres", "Xero"],
    steps: ["Collect documents from email or a shared folder", "Read and extract the fields you need", "Check totals, dates and duplicates", "Post clean data to your system"],
    human: "Low-confidence fields and anything that fails a check.",
    keywords: ["document", "invoice", "pdf", "contract", "form", "extract", "data entry", "receipt", "scan"],
    featured: true,
  },
  {
    slug: "accounts-payable",
    name: "Accounts Payable Agent",
    fn: "Finance",
    body: "Matches invoices to purchase orders, chases missing details, and prepares payments for approval.",
    tools: ["Xero", "QuickBooks", "Gmail"],
    steps: ["Match each invoice to its purchase order", "Flag mismatches and duplicates", "Email suppliers for missing details", "Queue payments for one-click approval"],
    human: "Every payment run is approved by your finance team.",
    keywords: ["finance", "payment", "accounts", "payable", "invoice", "supplier", "reconcile", "bookkeeping", "expense"],
  },
  {
    slug: "meeting-followup",
    name: "Meeting Follow-up Agent",
    fn: "Operations",
    body: "Turns meeting recordings into notes, action items and follow-up emails, and updates your CRM.",
    tools: ["Google Meet", "Notion", "HubSpot"],
    steps: ["Transcribe the meeting", "Summarise decisions and action items", "Draft the follow-up email", "Update the CRM and task list"],
    human: "You review the follow-up email before it is sent.",
    keywords: ["meeting", "notes", "follow up", "summary", "transcript", "action items", "minutes"],
  },
  {
    slug: "recruiting-screener",
    name: "Recruiting Screener Agent",
    fn: "People",
    body: "Screens applications against the role, answers candidate questions, and schedules interviews.",
    tools: ["Greenhouse", "Gmail", "Calendar"],
    steps: ["Read each application", "Compare it fairly against the role's must-haves", "Answer candidate questions", "Schedule interviews for the shortlist"],
    human: "Hiring decisions are always made by people.",
    keywords: ["hiring", "recruit", "candidate", "cv", "resume", "interview", "hr", "job", "applicant"],
  },
  {
    slug: "employee-helpdesk",
    name: "Employee Helpdesk Agent",
    fn: "People",
    body: "Answers staff questions about policies, IT and benefits in Slack, with links to the source.",
    tools: ["Slack", "Notion", "Google Drive"],
    steps: ["Receive the question in Slack", "Search policies and internal docs", "Answer with a link to the source", "Open a ticket when it can't help"],
    human: "Sensitive or personal requests go straight to HR or IT.",
    keywords: ["employee", "policy", "it", "hr", "internal", "staff", "onboarding", "benefits", "slack", "knowledge"],
  },
  {
    slug: "content-research",
    name: "Content & Research Agent",
    fn: "Marketing",
    body: "Researches topics, drafts on-brand content and repurposes it for each channel, ready for your review.",
    tools: ["Notion", "Google Docs", "LinkedIn"],
    steps: ["Research the topic and sources", "Draft in your brand voice", "Repurpose for blog, email and social", "Send drafts for review"],
    human: "Nothing is published without your approval.",
    keywords: ["content", "marketing", "blog", "social", "post", "seo", "write", "newsletter", "research"],
  },
  {
    slug: "order-ops",
    name: "Order Operations Agent",
    fn: "Operations",
    body: "Watches orders and shipments, spots delays early, and updates customers before they ask.",
    tools: ["Shopify", "ShipStation", "Gmail"],
    steps: ["Watch orders and tracking events", "Spot delays and stock issues", "Re-route or re-order where allowed", "Update customers proactively"],
    human: "Refunds and high-value orders need a person.",
    keywords: ["order", "shipping", "delivery", "ecommerce", "shopify", "logistics", "stock", "inventory", "tracking"],
  },
  {
    slug: "voice-receptionist",
    name: "Voice Receptionist Agent",
    fn: "Support",
    body: "Answers the phone around the clock, books appointments, and passes urgent calls to your team.",
    tools: ["Twilio", "Calendar", "HubSpot"],
    steps: ["Answer the call in a natural voice", "Understand what the caller needs", "Book, reschedule or answer questions", "Hand urgent calls to a person"],
    human: "Urgent or upset callers are transferred straight away.",
    keywords: ["phone", "call", "voice", "receptionist", "appointment", "booking", "clinic", "salon"],
  },
];

/** Picks the agent that best matches a free-text task description. */
export function matchAgent(text: string): Agent | null {
  const t = text.toLowerCase();
  let best: Agent | null = null;
  let bestScore = 0;
  for (const a of agentCatalogue) {
    const score = a.keywords.reduce((n, k) => n + (t.includes(k) ? k.length : 0), 0);
    if (score > bestScore) {
      best = a;
      bestScore = score;
    }
  }
  return best;
}
