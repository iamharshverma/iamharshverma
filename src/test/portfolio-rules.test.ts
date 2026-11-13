import { describe, expect, it } from "vitest";
import { books } from "@/data/books";
import { enquirySchema } from "@/lib/enquiry-schema";
import { homeKeynotes, keynotes, reels } from "@/data/media";

describe("Portfolio rules", () => {
  it("features the Digital Battleground in the third homepage slot instead of Berkeley", () => {
    expect(homeKeynotes.map(k => k.href)).toEqual([
      "https://www.youtube.com/watch?v=nIgJ99Bihsw",
      "https://www.youtube.com/watch?v=RS_BKcbeV3o",
      "https://www.youtube.com/watch?v=E6kA_o57DrM",
    ]);
  });
  it("puts the On stage reel first for the default reel selection", () => {
    expect(reels[0]?.id).toBe("DYaWly9vD60");
    expect(reels.filter(r => r.id === "DYaWly9vD60")).toHaveLength(1);
  });
  it("puts the VLink enterprise AI keynote first for the default theater selection", () => {
    expect(keynotes[0]?.href).toBe("https://www.youtube.com/watch?v=nIgJ99Bihsw");
    expect(keynotes.filter(k => k.href === "https://www.youtube.com/watch?v=nIgJ99Bihsw")).toHaveLength(1);
  });
  it("releases Beyond AI Engineering in January 2027", () => {
    expect(books.find(b => b.slug === "beyond-ai-engineering")?.status).toBe("Coming January 2027");
  });
  it("releases AI vs. AI in January 2027", () => {
    expect(books.find(b => b.slug === "ai-vs-ai")?.status).toBe("Coming January 2027");
  });
  it("accepts both keynote and advisory booking requests", () => {
    for (const topic of ["Keynote", "Advisory"]) {
      expect(enquirySchema.safeParse({ kind: "booking", topic, name: "Test", email: "test@example.com", message: "An engagement brief" }).success).toBe(true);
    }
  });
  it("does not accept media as a booking role", () => {
    expect(enquirySchema.safeParse({ kind: "booking", topic: "Media", name: "Test", email: "test@example.com", message: "Brief" }).success).toBe(false);
  });
});