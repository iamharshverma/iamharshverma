import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { insights } from "@/data/insights";
import { SITE_URL } from "@/lib/seo";

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url);

describe("Public search discovery", () => {
  it("includes each public content route in the existing sitemap", () => {
    const routes = readdirSync("src/routes").filter(name => name.endsWith(".tsx") && !name.startsWith("__") && !name.includes("$"));
    for (const route of routes) {
      const path = route === "index.tsx" ? "/" : `/${route.replace(/\.index\.tsx$|\.tsx$/g, "")}`;
      expect(urls).toContain(`${SITE_URL}${path}`);
    }
  });

  it("includes every current article exactly once", () => {
    for (const article of insights) {
      expect(urls.filter(url => url === `${SITE_URL}/insights/${article.slug}`)).toHaveLength(1);
    }
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("does not manufacture sitemap modification dates", () => {
    expect(sitemap).not.toContain("<lastmod>");
  });
});