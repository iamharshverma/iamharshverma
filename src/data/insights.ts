import { blogs, type Blog } from "./media";
export const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
export const insights = blogs.map((b) => ({ ...b, slug: slugify(b.title) }));
export type Insight = Blog & { slug: string };
export const findInsight = (slug: string) => insights.find((i) => i.slug === slug);
