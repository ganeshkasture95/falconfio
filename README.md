# Falconfio

The website for **Falconfio**, a technical brand by GK TechMatrix: products that scale, and AI agents that do real work.

Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4 and MDX.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Before pushing:

```bash
npm run lint
npm run typecheck
npm run check:tokens   # no raw hex/rgb colours in components; use the brand tokens in app/globals.css
npm run build
```

## Project map

| Path | What lives there |
|---|---|
| `app/(marketing)/` | Pages: home, `/services`, `/services/[slug]`, `/agents`, `/case-studies`, `/case-studies/[slug]`, `/products` |
| `components/sections/` | Home page sections |
| `components/agents/` | The AI agents page: agent network, task prompt, playground demos, catalogue, builder |
| `components/guide/GuideBot.tsx` | Falco, the on-page guide that explains whatever the pointer rests on (`data-guide` attributes) |
| `components/layout/` | Header (mega-menu, mobile drawer) and footer |
| `components/brand/` | Logo, the Falco agent mark, technology logos |
| `content/data/` | Site copy and data: services catalogue, agents, products, navigation |
| `content/case-studies/*.mdx` | Case studies (`export const meta = {…}` at the top of each file) |
| `public/brand/` | Logo SVGs, including `falco-agent.svg` |
| `public/images/services/` | Service photos (CC0, from StockSnap; credits in `content/data/services.ts`) |

## Content notes

- Figures in the hero stats, commitments and case studies should be verified before launch.
- Agent demos on `/agents` are scripted illustrations with made-up data, and are labelled as such.
- Links to pages not built yet (`/contact`, `/how-we-work`, `/blog`, `/about`, `/privacy`, `/terms`, `/tools/*`) return 404 for now.
