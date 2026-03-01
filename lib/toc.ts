/**
 * Extract table of contents from HTML content
 */
export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function extractTOC(htmlContent: string): TOCItem[] {
  const headingRegex = /<h([2-4])[^>]*>(.*?)<\/h[2-4]>/gi;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]*>/g, '').trim(); // Remove HTML tags
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();

    if (text && id) {
      toc.push({ id, text, level });
    }
  }

  return toc;
}

/**
 * Add IDs to headings in HTML content
 */
export function addHeadingIds(htmlContent: string): string {
  const headingRegex = /<h([2-4])([^>]*)>(.*?)<\/h[2-4]>/gi;
  
  return htmlContent.replace(headingRegex, (match, level, attrs, content) => {
    const text = content.replace(/<[^>]*>/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check if id already exists in attributes
    if (attrs && attrs.includes('id=')) {
      return match;
    }

    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}
