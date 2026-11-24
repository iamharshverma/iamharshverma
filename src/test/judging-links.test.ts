import { describe, expect, it } from "vitest";
import { judging } from "@/data/media";

describe("Judging record links", () => {
  const big = judging.find(j => j.title === "2026 BIG Awards for Business Judge");

  it("links the Business Intelligence Group judge profile", () => {
    expect(big?.href).toBe("https://judges.bintelligence.com/harsh-verma");
  });

  it("links the public verification page for the 2026 BIG Awards award", () => {
    expect(big?.verifiedHref).toBe("https://judges.bintelligence.com/verify/big-awards-for-business-2026/harsh-verma");
  });
});
