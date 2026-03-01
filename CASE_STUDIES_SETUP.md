# Case Studies Setup Guide

## Installation

First, install the required dependencies for MDX processing:

```bash
npm install gray-matter remark remark-html rehype-raw
```

## Folder Structure

The case studies system uses the following structure:

```
falconfio/
├── app/
│   ├── case-studies/
│   │   ├── page.tsx              # List all case studies
│   │   └── [slug]/
│   │       └── page.tsx          # Individual case study page
├── content/
│   └── case-studies/
│       ├── example-case-study.mdx
│       └── your-case-study.mdx  # Add new case studies here
└── lib/
    └── mdx.ts                     # MDX utility functions
```

## Adding a New Case Study

1. Create a new `.mdx` file in `content/case-studies/`
2. Use the following frontmatter structure:

```mdx
---
title: "Your Case Study Title"
description: "A brief description of the case study"
date: "2024-01-15"
client: "Client Name"
industry: "Industry Type"
technologies:
  - "Technology 1"
  - "Technology 2"
results:
  - "Result 1"
  - "Result 2"
coverImage: "/images/case-studies/cover.jpg"  # Optional
---

Your MDX content here...
```

3. The slug will be automatically generated from the filename (e.g., `my-case-study.mdx` → `/case-studies/my-case-study`)

## Frontmatter Fields

- **title** (required): The case study title
- **description** (required): Brief description shown in listings
- **date** (required): Publication date (YYYY-MM-DD format)
- **client** (optional): Client name
- **industry** (optional): Industry category
- **technologies** (optional): Array of technologies used
- **results** (optional): Array of key results/achievements
- **coverImage** (optional): Path to cover image

## Features

- ✅ Automatic slug generation from filenames
- ✅ Static generation for optimal performance
- ✅ SEO-friendly metadata
- ✅ Full MDX support with HTML rendering
- ✅ Responsive design
- ✅ Automatic sorting by date (newest first)

## Routes

- `/case-studies` - Lists all case studies
- `/case-studies/[slug]` - Individual case study page

## Notes

- All case studies are statically generated at build time
- Images should be placed in the `public` directory
- The system automatically handles missing case studies with 404 pages
