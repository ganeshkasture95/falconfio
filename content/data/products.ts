/**
 * In-house products built and run by the Falconfio / GK TechMatrix team. Powers /products.
 * Keep descriptions in line with each product's own store listing or website.
 */

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  platforms: string[];
  features: string[];
  audience: string[];
  links: { label: string; href: string; primary?: boolean }[];
  /** services this product shows off, by catalogue slug */
  shows: string[];
  mock: "chat" | "list";
};

export const products: Product[] = [
  {
    slug: "notelineai",
    name: "NotelineAI",
    tagline: "Chat with your notes & PDFs",
    description:
      "Upload notes and PDFs, then ask questions in plain language. Answers stream in, are grounded in your own library, and cite the excerpts they came from. When your library doesn't cover a question, it says so.",
    status: "Early access on Android",
    platforms: ["Android", "iOS (coming soon)"],
    features: [
      "One library for your notes and PDFs",
      "Natural-language chat with streaming answers",
      "Citations that link to the source excerpt",
      "Says clearly when the answer isn't in your library",
      "Remove outdated files so answers stay trustworthy",
      "Light and dark themes",
    ],
    audience: ["Students reviewing course material", "Professionals preparing briefings", "Researchers who need checkable answers"],
    links: [{ label: "Visit notelineai.com", href: "https://notelineai.com", primary: true }],
    shows: ["ai", "product", "design"],
    mock: "chat",
  },
  {
    slug: "commitlist",
    name: "CommitList",
    tagline: "Track your work like meaningful commits",
    description:
      "A clean, focused project to-do app inspired by the GitHub commit timeline. Each task becomes a commit, so progress is visible and motivating, whether you're building a project, studying or managing daily goals.",
    status: "Live on Google Play",
    platforms: ["Android"],
    features: [
      "Commit-style task tracking",
      "Simple, distraction-free interface",
      "Visual progress that feels rewarding",
      "Lightweight and fast",
    ],
    audience: ["Developers", "Students", "Creators and solo makers"],
    links: [
      { label: "Get it on Google Play", href: "https://play.google.com/store/apps/details?id=com.techmatrix.commitlist", primary: true },
    ],
    shows: ["product", "mvp", "design"],
    mock: "list",
  },
];
