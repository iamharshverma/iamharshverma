import { useEffect, useRef } from "react";
export function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    const gold = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim();
    let w = 0, h = 0, raf = 0;
    const pts = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0006, vy: (Math.random() - .5) * .0006 }));
    const resize = () => { w = c.width = c.offsetWidth * devicePixelRatio; h = c.height = c.offsetHeight * devicePixelRatio; };
    resize(); window.addEventListener("resize", resize);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const a = pts[i]!, b = pts[j]!;
        const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h, d = Math.hypot(dx, dy);
        if (d < 160 * devicePixelRatio) { ctx.strokeStyle = `oklch(from ${gold} l c h / ${0.18 * (1 - d / (160 * devicePixelRatio))})`; ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke(); }
      }
      ctx.fillStyle = gold; for (const p of pts) { ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 1.5 * devicePixelRatio, 0, 7); ctx.fill(); }
      raf = requestAnimationFrame(tick);
    };
    tick(); return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full opacity-70" />;
}
