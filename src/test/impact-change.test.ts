import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useImpactChange } from "@/hooks/use-impact-change";

afterEach(() => { cleanup(); vi.useRealTimers(); });
describe("Impact score change notification", () => {
  it("does not report initial or unchanged measurements as a change", () => {
    const { result, rerender } = renderHook(({ score }) => useImpactChange(score), { initialProps: { score: 33 } });
    expect(result.current).toBe(false);
    rerender({ score: 33 });
    expect(result.current).toBe(false);
  });
  it("highlights increases and decreases then clears the notification", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ score }) => useImpactChange(score), { initialProps: { score: 33 } });
    rerender({ score: 67 });
    expect(result.current).toBe(true);
    act(() => vi.advanceTimersByTime(2200));
    expect(result.current).toBe(false);
    rerender({ score: 10 });
    expect(result.current).toBe(true);
  });
  it("restarts the notification for successive changes", () => {
    vi.useFakeTimers();
    const initialProps: { score: number | null } = { score: null };
    const { result, rerender } = renderHook(({ score }: { score: number | null }) => useImpactChange(score), { initialProps });
    rerender({ score: 34 });
    act(() => vi.advanceTimersByTime(1500));
    rerender({ score: 67 });
    act(() => vi.advanceTimersByTime(1500));
    expect(result.current).toBe(true);
    act(() => vi.advanceTimersByTime(700));
    expect(result.current).toBe(false);
  });
});