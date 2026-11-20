import { describe, expect, it } from "vitest";
import { reels } from "@/data/media";
import onStage from "@/assets/reel-DYaWly9vD60.webp.asset.json";
import aiWithHarsh from "@/assets/reel-DYcnn4hOfxe.webp.asset.json";
import awards from "@/assets/reel-DYSEXmMswXj.webp.asset.json";
import speakerMoments from "@/assets/reel-DJ6szEOxxgl.webp.asset.json";

describe("stored reel covers", () => {
  it.each([
    ["DYaWly9vD60", onStage.url],
    ["DYcnn4hOfxe", aiWithHarsh.url],
    ["DYSEXmMswXj", awards.url],
    ["DJ6szEOxxgl", speakerMoments.url],
  ])("maps reel %s to its own saved original cover", (id, thumbnail) => {
    expect(reels.find(reel => reel.id === id)?.thumbnail).toBe(thumbnail);
  });

  it("never reuses a shared poster across reel records", () => {
    expect(new Set(reels.map(reel => reel.thumbnail)).size).toBe(4);
    for (const reel of reels) expect(reel.thumbnail).toMatch(/^\/__l5e\/assets-v1\//);
  });
});