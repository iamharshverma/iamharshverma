import { ideaQuotes } from "@/data/ideas";

/**
 * Pick a random idea-quote index that differs from the one just shown,
 * so tapping the bulb twice never repeats the same line back to back.
 */
export function pickIdeaQuote(exclude?: number | null, length: number = ideaQuotes.length): number {
  if (length <= 1) return 0;
  let next = Math.floor(Math.random() * length);
  while (next === exclude) next = Math.floor(Math.random() * length);
  return next;
}
