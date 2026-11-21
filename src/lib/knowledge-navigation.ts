export function scrollToKnowledgeGroup(id: string) {
  document.getElementById(`knowledge-${id}`)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });
}
