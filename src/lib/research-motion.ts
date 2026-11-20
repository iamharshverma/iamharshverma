/** Compact bubble to immersive fabric, with soft endpoints and bounded travel. */
export function researchScrollZoom(distance: number, travel: number) {
  if (travel <= 0) return .62;
  const progress = Math.max(0, Math.min(1, distance / travel));
  const eased = progress * progress * (3 - 2 * progress);
  return .62 + eased * 1.28;
}