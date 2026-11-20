import { insights } from "./insights";

function collection(publisher: string, hostname: string) {
  return insights
    .filter((article) => article.pub === publisher && new URL(article.href).hostname === hostname)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export const forbesArticles = collection("Forbes Council", "www.forbes.com");
export const hackerNoonArticles = collection("HackerNoon", "hackernoon.com");
