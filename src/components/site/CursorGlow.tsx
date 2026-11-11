import { useEffect, useState } from "react";
export function CursorGlow() {
  const [p, setP] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const m = (e: MouseEvent) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m); return () => window.removeEventListener("mousemove", m);
  }, []);
  return <div aria-hidden className="pointer-events-none fixed z-0 hidden h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl md:block"
    style={{ left: p.x, top: p.y }} />;
}
