import { knowledge, type KnowledgeItem } from "./knowledge";
import { networkTopics, networkResources } from "./knowledge-network";

/** Illustrative visual weights only: never evidence or a measured impact score. */
function seed(id: string) {
  return Array.from(id).reduce((value, character) => (Math.imul(value, 31) + character.charCodeAt(0)) >>> 0, 17);
}

export function illustrativeGraphWeights(items: KnowledgeItem[] = knowledge) {
  const weights = new Map<string, number>();
  for (const topic of networkTopics) {
    const candidates = [...networkResources(topic.id, items)].sort((a, b) => seed(`${topic.id}:${a.id}`) - seed(`${topic.id}:${b.id}`) || a.id.localeCompare(b.id));
    const picks: KnowledgeItem[] = [];
    const kinds = new Set<string>();
    for (const item of candidates) {
      if (kinds.has(item.kind)) continue;
      picks.push(item);
      kinds.add(item.kind);
      if (picks.length === 3) break;
    }
    for (const item of candidates) {
      if (picks.length === 3) break;
      if (!picks.some(pick => pick.id === item.id)) picks.push(item);
    }
    picks.forEach((item, index) => weights.set(item.id, Math.max(weights.get(item.id) ?? 0, 90 - index * 20)));
  }
  return weights;
}

const weights = illustrativeGraphWeights();
export function graphVisualWeight(id: string) { return weights.get(id) ?? 0; }