import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ExplorerFullscreenOwner = { fullscreen: boolean; toggle: () => void };
const ExplorerFullscreenContext = createContext<ExplorerFullscreenOwner | null>(null);

/** Lets an embedded graph drive the full-screen boundary that already wraps it. */
export const ExplorerFullscreenProvider = ExplorerFullscreenContext.Provider;
export function useEmbeddedExplorerFullscreen() { return useContext(ExplorerFullscreenContext); }

// Keep the mounted explorer and its live selection intact when changing viewport.
export function useExplorerFullscreen() {
  const ref = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const wasFullscreen = useRef(false);
  const exit = useCallback(() => {
    void (async () => {
      if (document.fullscreenElement === ref.current) await document.exitFullscreen().catch(() => {});
      setFullscreen(false);
      returnFocus.current?.focus({ preventScroll: true });
    })();
  }, []);
  const toggle = useCallback(async () => {
    if (fullscreen) { exit(); return; }
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setFullscreen(true);
    try { await ref.current?.requestFullscreen?.(); } catch { /* Fixed viewport fallback, including iOS. */ }
  }, [fullscreen, exit]);
  useEffect(() => {
    if (!fullscreen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let enteredNative = false;
    const sync = () => {
      if (document.fullscreenElement === ref.current) enteredNative = true;
      else if (enteredNative) exit();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); exit(); }
      if (event.key !== "Tab") return;
      const controls = [...(ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, [tabindex="0"]') ?? [])].filter(el => el.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("keydown", keyboard);
    ref.current?.scrollTo({ top: 0 });
    ref.current?.querySelector<HTMLElement>('[aria-label="Exit full screen"]')?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("keydown", keyboard);
    };
  }, [fullscreen, exit]);
  // Leaving full screen: bring the graph back to the middle of the page view.
  useEffect(() => {
    if (fullscreen) { wasFullscreen.current = true; return; }
    if (!wasFullscreen.current) return;
    wasFullscreen.current = false;
    // Native fullscreen restores its old page scroll asynchronously. Wait for that
    // restoration and the normal layout, then center the complete graph region.
    const timer = window.setTimeout(() => {
      const element = ref.current;
      if (!element || document.fullscreenElement) return;
      const bounds = element.getBoundingClientRect();
      const top = window.scrollY + bounds.top + bounds.height / 2 - window.innerHeight / 2;
      window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [fullscreen]);
  return { ref, fullscreen, toggle };
}

export function ExplorerFullscreenButton({ fullscreen, toggle }: { fullscreen: boolean; toggle: () => void }) {
  return <Button variant="outline" size="sm" onClick={toggle} aria-label={fullscreen ? "Exit full screen" : "Enter full screen"} title={fullscreen ? "Exit full screen" : "Enter full screen"}>
    {fullscreen ? <Minimize2 /> : <Maximize2 />}<span className="hidden sm:inline">{fullscreen ? "Exit full screen" : "Full screen"}</span>
  </Button>;
}