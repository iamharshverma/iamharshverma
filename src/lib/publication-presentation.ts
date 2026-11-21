import { publications, type Publication } from '@/data/publications';

export type VerifiedPublicationMetrics = {
  citations?: { value: number; source: string; checked: string };
  journalImpactFactor?: { value: number; source: string; year: number };
};
// Add source-dated measurements only; unknown is not zero.
const metrics: Record<string, VerifiedPublicationMetrics> = {};
const journalTones: Record<string, number> = {
  'IEEE Xplore': 0, IEEE: 0, 'IJCA Online': 1, 'IJIRCCE / ResearchGate': 6,
  WJARR: 5, IJEETR: 3, IJRAI: 7, IJSRM: 2, 'ICACCM 2026': 3,
  'European Centre for Research Training and Development UK (ECRTD)': 4,
  'Hackathon Raptors (Raptors.Dev)': 7,
};
export function publicationByNode(id: string | undefined) {
  return publications.find(p => id === `publication:${p.slug}`);
}
export function publicationPresentation(p: Publication, evidence = metrics[p.slug] ?? {}) {
  const citations = p.status === 'Published' ? evidence.citations ?? null : null;
  const factor = evidence.journalImpactFactor ?? null;
  return {
    color: `var(--atlas-k${journalTones[p.publisher] ?? 5})`,
    publisherUrl: new URL(p.source).origin,
    paperUrl: p.status === 'Published' ? p.source : null,
    citations, factor,
    // Evidence changes emphasis, never the journal's identity color.
    emphasis: (citations?.value ?? 0) >= 100 || (factor?.value ?? 0) >= 5 ? 'high'
      : (citations?.value ?? 0) > 0 || (factor?.value ?? 0) > 0 ? 'measured' : 'unknown',
  };
}