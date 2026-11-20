import { insights } from "./insights";

/** Reuse the published records and their site-hosted article summaries. */
export const rsacArticles = insights
  .filter((article) => article.pub === "RSA Conference" && new URL(article.href).hostname === "www.rsaconference.com")
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));