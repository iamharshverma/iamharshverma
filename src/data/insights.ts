import { blogs, type Blog } from "./media";
import { originalPosts, type OriginalPost } from "./original-posts";
export const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
const seen = new Set<string>();
export const insights: (Insight)[] = [...originalPosts, ...blogs].map((b) => {
  let slug = slugify(b.title);
  if (seen.has(slug)) slug = `${slug}-${slugify(b.pub)}`.slice(0, 100);
  seen.add(slug);
  return { ...b, slug };
});
export type Insight = Blog & { slug: string; body?: OriginalPost["body"] };
export const findInsight = (slug: string) => insights.find((i) => i.slug === slug);
