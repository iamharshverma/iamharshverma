/** Evidence must describe this specific work, not the author's aggregate reach. */
export type ImpactMetric = { value: number; source: string; observedAt: string };
export type WorkImpactEvidence = {
  citations?: ImpactMetric;
  audience?: ImpactMetric;
  adoption?: ImpactMetric;
};

// Deliberately empty until per-work evidence is supplied and checked.
export const workImpactEvidence: Readonly<Record<string, WorkImpactEvidence>> = {};
export const impactDimensions = [
  { key: "citations", label: "Citations", benchmark: 100 },
  { key: "audience", label: "Audience", benchmark: 10000 },
  { key: "adoption", label: "Documented deployments", benchmark: 10 },
] as const;
export const impactMethodology = "Equal thirds: citations, audience and documented deployments. Each component is min(1, log(1 + count) / log(1 + benchmark)); benchmarks are 100 citations, 10,000 views/readers/attendees and 10 deployments. Score = 100 × sum of components / 3. Missing components add no points; coverage is shown separately. No evidence means unscored, not zero. This evidence index is not an independently audited impact rating.";

export function scoreWorkImpact(evidence: WorkImpactEvidence = {}) {
  const metrics = impactDimensions.flatMap(dimension => {
    const metric = evidence[dimension.key];
    if (!metric || !Number.isSafeInteger(metric.value) || metric.value < 0 ||
      !/^https:\/\//.test(metric.source) || !/^\d{4}-\d{2}-\d{2}$/.test(metric.observedAt) ||
      !Number.isFinite(Date.parse(metric.observedAt))) return [];
    return [{ ...dimension, ...metric }];
  });
  const score = metrics.length ? Math.round(100 / 3 * metrics.reduce((sum, metric) =>
    sum + Math.min(1, Math.log1p(metric.value) / Math.log1p(metric.benchmark)), 0)) : null;
  return { score, coverage: metrics.length, metrics };
}

export function workImpact(id: string) {
  return scoreWorkImpact(workImpactEvidence[id]);
}

/** Fixed absolute bands, never connection degree or ranking within the current filter. */
export function impactSizeTier(score: number | null) {
  return score === null || score <= 0 ? 0 : score >= 67 ? 1 : score >= 34 ? 2 : 3;
}