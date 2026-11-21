import { knowledge, knowledgeTopics, type KnowledgeItem } from "./knowledge";

export const networkTopics = [
  ...knowledgeTopics.map((topic, index) => ({
    id: topic,
    title:
      topic === "AI security" ? "Agentic Security" : topic.replace(/\b\w/g, (c) => c.toUpperCase()),
    tone: index,
  })),
  { id: "Across the portfolio", title: "Across the Portfolio", tone: 6 },
];

// Edges express subject associations from the shared library, not impact or endorsement.
export function networkMembership(item: Pick<KnowledgeItem, "topics">): string[] {
  const topics = item.topics.filter((topic) => knowledgeTopics.some((t) => t === topic));
  return topics.length ? topics : ["Across the portfolio"];
}

export const knowledgeNetworkEdges = knowledge.flatMap((item) =>
  networkMembership(item).map((topic) => ({
    id: `${topic}:${item.id}`,
    source: topic,
    target: item.id,
  })),
);

export function networkResources(topic: string, items: KnowledgeItem[] = knowledge) {
  return topic ? items.filter((item) => networkMembership(item).includes(topic)) : items;
}

/** Keep focused graphs aligned with the same filtered records as the real collections. */
export function focusedNetworkResources(topic: string, items: KnowledgeItem[], resourceId = "") {
  if (resourceId) {
    const source = knowledge.find(item => item.id === resourceId);
    return source ? [source, ...connectedWork(resourceId).map(connection => connection.item)] : [];
  }
  return networkResources(topic, items);
}

export function focusedNetworkPositions(items: KnowledgeItem[]) {
  const ordered = groupKnowledge(items).flatMap(group => group.items);
  const columns = ordered.length > 24 ? 5 : 3;
  return ordered.map((item, index) => ({
    id: item.id,
    x: (index % columns) * 260,
    y: Math.floor(index / columns) * 105,
  }));
}

/** Cross-format discovery links express shared subjects, never citations or influence. */
export function connectedWork(id: string, items: KnowledgeItem[] = knowledge) {
  const source = knowledge.find(item => item.id === id);
  if (!source) return [];
  return items.filter(item => item.id !== id && item.kind !== source.kind)
    .map(item => ({ item, topics: source.topics.filter(topic => item.topics.includes(topic)) }))
    .filter(connection => connection.topics.length > 0)
    .sort((a, b) => b.topics.length - a.topics.length || a.item.id.localeCompare(b.item.id));
}

export const knowledgeResourceEdges = (() => {
  const edges = new Map<string, { id: string; source: string; target: string; topics: string[] }>();
  for (const item of knowledge) {
    const kinds = new Set<string>();
    for (const related of connectedWork(item.id)) {
      if (kinds.has(related.item.kind)) continue;
      kinds.add(related.item.kind);
      const [source = "", target = ""] = [item.id, related.item.id].sort();
      const id = `shared:${source}:${target}`;
      edges.set(id, { id, source, target, topics: related.topics });
    }
  }
  return [...edges.values()];
})();

export const knowledgeClassifiers = [
  { kind: "Article", title: "Articles", id: "articles" },
  { kind: "Research", title: "Research", id: "research" },
  { kind: "Keynote", title: "Keynotes & Talks", id: "keynotes" },
  { kind: "Book", title: "Books", id: "books" },
  { kind: "Media", title: "Interviews & Media", id: "interviews" },
  { kind: "Publication", title: "Publications", id: "publications" },
  { kind: "Patent", title: "Patents", id: "patents" },
  { kind: "Case study", title: "Engineering Case Studies", id: "case-studies" },
  { kind: "Project", title: "Projects", id: "projects" },
  { kind: "Download", title: "Downloads", id: "downloads" },
  { kind: "Resource", title: "Resources", id: "resources" },
];

export function groupKnowledge(items: KnowledgeItem[]) {
  const kinds = [
    ...knowledgeClassifiers,
    ...[...new Set(items.map((item) => item.kind))]
      .filter((kind) => !knowledgeClassifiers.some((c) => c.kind === kind))
      .map((kind) => ({ kind, title: kind, id: kind.toLowerCase().replace(/[^a-z0-9]+/g, "-") })),
  ];
  return kinds
    .map((classifier) => ({
      ...classifier,
      items: items.filter((item) => item.kind === classifier.kind),
    }))
    .filter((group) => group.items.length > 0);
}
