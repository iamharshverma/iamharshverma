import { getImpactTopic, radarEntries } from "./knowledge-impact";

/** Arc collections derive from technology records, never a second inventory. */
export const radarSectors = [...new Set(radarEntries.map((entry) => entry.sector))].map(
  (title) => {
    const entries = radarEntries.filter((entry) => entry.sector === title);
    const topic = entries[0]?.topic ?? "";
    const domain = getImpactTopic(topic);
    return {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      topic,
      summary: domain?.summary ?? "",
      why: domain?.why ?? "",
      principles: domain?.principles ?? [],
      sources: domain?.sources ?? [],
      entries,
    };
  },
);

export type RadarSector = (typeof radarSectors)[number];
export const getRadarSector = (id: string) => radarSectors.find((sector) => sector.id === id);