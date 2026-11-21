export type KnowledgeDetailView = "nodes" | "cards";

export function impactCardDimensions(score: number | null) {
  return { width: 230 + (score ?? 0) * .6, height: 82 + (score ?? 0) * .22 };
}

export function detailPresentation(view: KnowledgeDetailView, hasEntry: boolean, expanded: boolean) {
  return {
    // Both views open the full-detail popup; Node View keeps the dot graph behind it.
    inline: false,
    popup: hasEntry && expanded && (view === "nodes" || view === "cards"),
  };
}

/**
 * Camera target for a click on empty graph space.
 * While a topic or category is in focus the view re-centres on exactly the
 * nodes that focus drew, so the camera returns to the same framing; only the
 * unfiltered home graph fits the whole network.
 */
export function paneFocusNodeIds(options: {
  selected: string;
  category: string;
  resourceIds: string[];
  categoryIds: Set<string>;
}): string[] | null {
  const { selected, category, resourceIds, categoryIds } = options;
  if (category) return [...new Set([...categoryIds, ...(selected ? [selected] : [])])];
  if (selected) return [...new Set([selected, ...resourceIds])];
  return null;
}