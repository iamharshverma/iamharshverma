import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { researchScrollZoom } from "@/lib/research-motion";
import { Reveal } from "@/components/site/Reveal";

/** A two-dimensional particle fabric; no models, textures or rendering library. */
function ParticleFabric({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;
    const host = canvas.parentElement;
    if (!host) return;
    const scrollHost = host.parentElement;
    if (!scrollHost) return;
    let width = 0, height = 0, frame = 0, last = 0, phase = 0;
    let visible = true;
    let zoom = .62, targetZoom = .62, scrollDirty = true;
    let ink = "", accent = "";
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0 };
    const colors = () => {
      const style = getComputedStyle(host);
      ink = style.getPropertyValue("--research-particle-ink").trim();
      accent = style.getPropertyValue("--research-particle-accent").trim();
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const narrow = width < 640;
      const columns = narrow ? 220 : 360;
      const rows = narrow ? 28 : 38;
      const bubbleRadius = Math.min(width * .6, height * .53);
      const rx = bubbleRadius * 1.08 * zoom;
      const ry = bubbleRadius * zoom;
      const cx = width / 2 + pointer.x * 6;
      const cy = height / 2 + pointer.y * 5;
      for (let row = 0; row < rows; row++) {
        const v = row / rows * Math.PI * 2;
        ctx.fillStyle = row % 7 === 0 ? accent : ink;
        for (let column = 0; column < columns; column++) {
          const u = column / columns * Math.PI * 2;
          const fold = Math.sin(u * 5 + phase) * .13 + Math.cos(u * 8 - phase * .65 + v) * .065;
          const radius = 1 + Math.cos(v) * .23 + fold;
          const twist = u + Math.sin(v + phase * .6 + u * 3) * .12;
          const x = cx + Math.cos(twist) * rx * radius;
          const y = cy + Math.sin(twist) * ry * radius + Math.sin(v + u * 6 + phase) * bubbleRadius * .1 * zoom;
          const front = (Math.sin(v + u * 3 - phase) + 1) / 2;
          ctx.globalAlpha = .12 + front * .47;
          const size = .65 + front * .55;
          ctx.fillRect(x, y, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      colors();
      targetZoom = motion.matches ? .62 : researchScrollZoom(-scrollHost.getBoundingClientRect().top, height * .4);
      zoom = targetZoom;
      scrollDirty = true;
      draw();
    };
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden || pausedRef.current || motion.matches || now - last < 33) return;
      const delta = Math.min((now - last) / 1000, .05);
      if (scrollDirty) {
        targetZoom = researchScrollZoom(-scrollHost.getBoundingClientRect().top, height * .4);
        scrollDirty = false;
      }
      zoom += (targetZoom - zoom) * (1 - Math.exp(-delta * 10));
      phase += delta * .4;
      last = now;
      draw();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = host.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / width - .5;
      pointer.y = (event.clientY - bounds.top) / height - .5;
    };
    const reset = () => { pointer.x = 0; pointer.y = 0; };
    // Passive page scroll: touch and trackpad remain native, with no wheel capture.
    const scroll = () => { scrollDirty = true; };
    const motionChange = () => {
      if (motion.matches) { zoom = .62; targetZoom = .62; draw(); }
      scrollDirty = true;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
    intersection.observe(host);
    const themeObserver = new MutationObserver(() => { colors(); draw(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", reset);
    window.addEventListener("scroll", scroll, { passive: true });
    motion.addEventListener("change", motionChange);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", reset);
      window.removeEventListener("scroll", scroll);
      motion.removeEventListener("change", motionChange);
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="research-particle-canvas pointer-events-none absolute inset-0 h-full w-full" />;
}

export function ResearchIntro() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="research-scroll-stage relative bg-background">
    <div className="research-intro relative isolate flex h-[560px] items-center overflow-hidden border-b border-border bg-background px-6 pt-24 pb-16 md:h-[680px] md:pt-28 md:pb-20">
      <ParticleFabric paused={paused} />
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <Reveal><p className="eyebrow">// research · patents · writing</p></Reveal>
        <Reveal delay={0.1}><h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl">Ideas,<br /><span className="text-brand-gradient">Patented and<br className="hidden md:block" /> Published.</span></h1></Reveal>
        <Reveal delay={0.2}><p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">Enterprise patents, peer-reviewed papers, books and a body of open-source systems work.</p></Reveal>
        <Reveal delay={0.3}>
          <div className="mt-7 flex justify-center gap-6 font-mono text-xs text-muted-foreground">
            <span>Founder</span><span>Engineer</span><span>Speaker</span>
          </div>
        </Reveal>
      </div>
      <Button variant="outline" size="icon" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play particle animation" : "Pause particle animation"} title={paused ? "Play animation" : "Pause animation"} aria-pressed={paused} className="absolute right-6 bottom-5 z-10 rounded-full border-border bg-background/80 motion-reduce:hidden">{paused ? <Play className="size-4" /> : <Pause className="size-4" />}</Button>
    </div>
    </section>
  );
}