// Static build for GitHub Pages (iamharshverma.com). Used only by `bun run build:pages`
// (and the GitHub Actions workflow when deploy.config.json has githubPages.enabled = true).
// Server-only features (Ask Harsh, forms) are hidden via VITE_STATIC_SITE.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";

// Render every existing sitemap URL, including articles that are not linked on Home.
const sitemap = readFileSync(new URL("./public/sitemap.xml", import.meta.url), "utf8");
const pages = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, loc]) => ({
  path: new URL(loc).pathname,
}));

export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: false, failOnError: true, autoSubfolderIndex: false },
    pages,
  },
});
