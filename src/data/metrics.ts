import { insights } from "./insights";
import { keynotes, media } from "./media";

/** Counts describe the curated site inventory, not total career output or audience reach. */
export const metricsInventory = [
  {
    id: "articles",
    value: insights.length,
    suffix: "",
    label: "Articles in the library",
    source: "/insights",
    auditedAt: "2026-11-21",
    public: true,
  },
  {
    id: "talks",
    value: keynotes.length,
    suffix: "",
    label: "Recorded keynotes",
    source: "/speaking",
    auditedAt: "2026-11-21",
    public: true,
  },
  {
    id: "publishers",
    value: new Set(media.map((m) => m.outlet)).size,
    suffix: "",
    label: "Outlets in the archive",
    source: "/media",
    auditedAt: "2026-11-21",
    public: true,
  },
  {
    id: "media",
    value: new Set(media.filter((m) => m.href).map((m) => m.href)).size,
    suffix: "",
    label: "Sourced media entries",
    source: "/media",
    auditedAt: "2026-11-21",
    public: true,
  },
  {
    id: "papers",
    value: 27,
    suffix: "+",
    label: "Peer-reviewed papers",
    source: "https://scholar.google.com/citations?user=zSt9oRMAAAAJ&hl=en",
    auditedAt: "2026-11-21",
    public: false,
  },
  {
    id: "reach",
    value: 3.75,
    suffix: "B+",
    label: "Syndicated views",
    source: null,
    auditedAt: "2026-11-21",
    public: false,
  },
  {
    id: "global-reach",
    value: 100,
    suffix: "M+",
    label: "Estimated global reach",
    source: null,
    auditedAt: "2026-11-21",
    public: false,
  },
] as const;
export const publicMetrics = metricsInventory.filter((metric) => metric.public);
/** Retained career totals; archive sizes are separate and do not independently verify them. */
export const ownerReportedSpeakingMetrics = [
  { v: 43, suffix: "+", l: "Total engagements" },
  { v: 10, suffix: "+", l: "Featured keynotes" },
  { v: 21, suffix: "+", l: "Judging & mentorship" },
  { v: 6, suffix: "+", l: "Panels" },
] as const;
/** Owner requested retaining these existing figures on November 21, 2026; no independent audit is implied. */
export const ownerReportedMetrics = [
  {
    value: 12,
    suffix: "+",
    label: "Years AI / Tech impact",
    source: "Owner-provided portfolio",
    verification: "owner-provided",
  },
  {
    value: 27,
    suffix: "+",
    label: "Peer-reviewed papers",
    source: "Owner-provided portfolio / Google Scholar",
    verification: "owner-provided",
  },
  {
    value: 6,
    suffix: "",
    label: "Granted & pending patents",
    source: "Owner-provided portfolio: 2 granted, 4 pending",
    verification: "owner-provided",
  },
  {
    value: 45,
    suffix: "+",
    label: "Global press features",
    source: "Owner-provided portfolio",
    verification: "owner-provided",
  },
];
