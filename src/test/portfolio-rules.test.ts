import { describe, expect, it } from "vitest";
import { books } from "@/data/books";
import { enquirySchema } from "@/lib/enquiry-schema";

describe("Portfolio rules", () => {
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