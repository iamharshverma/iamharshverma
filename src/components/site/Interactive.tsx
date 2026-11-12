import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { ArrowUp, X } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-gradient" />;
}

export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 800); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  if (!show) return null;
  return (
    <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="glass fixed right-6 bottom-24 z-50 hidden md:grid h-11 w-11 place-items-center rounded-full text-brand transition hover:shadow-glow">
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

/** Card that tilts toward the cursor and shows a soft spotlight. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useTransform(my, [0, 1], [6, -6]), ry = useTransform(mx, [0, 1], [-6, 6]);
  const bg = useTransform([mx, my], ([x, y]) => `radial-gradient(400px circle at ${(x as number) * 100}% ${(y as number) * 100}%, var(--spot), transparent 60%)`);
  const move = (e: MouseEvent<HTMLDivElement>) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); };
  return (
    <motion.div onMouseMove={move} onMouseLeave={() => { mx.set(0.5); my.set(0.5); }} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand/50">
      <motion.div aria-hidden style={{ background: bg }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className={`relative h-full ${className}`}>{children}</div>
    </motion.div>
  );
}

export function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div className="inline-block" style={{ x: sx, y: sy }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
  );
}

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-background/80 p-4 backdrop-blur-md" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl border border-border bg-popover shadow-glow" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/70 hover:text-brand"><X className="h-4 w-4" /></button>
        {children}
      </motion.div>
    </div>
  );
}

/** Light tile so dark-ink logos stay readable on the dark theme. */
export function LogoTile({ src, name, className = "" }: { src: string; name: string; className?: string }) {
  return (
    <div title={name} className={`grid place-items-center rounded-lg bg-logo-tile px-5 py-3 transition hover:shadow-glow ${className}`}>
      <img src={src} alt={name} loading="lazy" className="h-10 w-auto max-w-[150px] object-contain" />
    </div>
  );
}
