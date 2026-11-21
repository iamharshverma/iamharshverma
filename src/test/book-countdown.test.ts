import { describe, expect, it } from "vitest";
import { BOOK_LAUNCH_MONTH_START, bookCountdown } from "@/lib/book-countdown";

describe("Books release-month countdown", () => {
  it("counts to the announced January 2027 month", () => {
    expect(BOOK_LAUNCH_MONTH_START).toBe(Date.UTC(2027, 0, 1));
    expect(bookCountdown(Date.UTC(2026, 11, 30, 22, 57, 56))).toEqual({ days: 1, hours: 1, minutes: 2, seconds: 4 });
  });
  it("never displays negative time after January begins", () => {
    expect(bookCountdown(Date.UTC(2027, 0, 2))).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
  it("decrements seconds and rolls over minutes", () => {
    expect(bookCountdown(BOOK_LAUNCH_MONTH_START - 61000)).toEqual({ days: 0, hours: 0, minutes: 1, seconds: 1 });
    expect(bookCountdown(BOOK_LAUNCH_MONTH_START - 59000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 59 });
  });
});