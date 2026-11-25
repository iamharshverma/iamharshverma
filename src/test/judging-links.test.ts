import { describe, expect, it } from "vitest";
import { judging } from "@/data/media";

describe("Judging record links", () => {
  it("includes Google's judging role and both official destinations", () => {
    const entry = judging.find(j => j.title === "Google Agents for Impact Hackathon Challenge");
    expect(entry?.role).toBe("Hackathon Judge");
    expect(entry?.links?.map(link => link.href)).toEqual([
      "https://cloud.google.com/events/agents-for-impact-svl",
      "https://cloud.google.com/resources/agents-for-impact-2026",
    ]);
  });

  it("includes the IEEE SAC Awards judging role and official program", () => {
    const entry = judging.find(j => j.title === "IEEE SAC Awards 2026");
    expect(entry?.role).toBe("Awards Judge");
    expect(entry?.links?.[0]?.href).toBe("https://students.ieee.org/student-opportunities/sac-awards-programs/");
  });

  it("includes the CITRIS judging and selection role and program", () => {
    const entry = judging.find(j => j.title === "CITRIS-CDSS Innovation Fellowship & AIC Awards");
    expect(entry?.role).toBe("Judge & Selection Reviewer");
    expect(entry?.links?.[0]?.href).toBe("https://citris-uc.org/labs-programs/citris-aic-awards/");
  });

  const big = judging.find(j => j.title === "2026 BIG Awards for Business Judge");

  it("links the Business Intelligence Group judge profile", () => {
    expect(big?.href).toBe("https://judges.bintelligence.com/harsh-verma");
  });

  it("links the public verification page for the 2026 BIG Awards award", () => {
    expect(big?.verifiedHref).toBe("https://judges.bintelligence.com/verify/big-awards-for-business-2026/harsh-verma");
  });
});
