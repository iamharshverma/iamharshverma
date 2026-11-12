import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { orbitPortraits } from "@/data/profile";

function Card({ i, n, p, src, label }: { i: number; n: number; p: MotionValue<number>; src: string; label: string }) {
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
  const spread = useTransform(p, [0.08, 0.55], [0, 1], { clamp: true });
  // radius as % of the stage so it scales on phones
  const x = useTransform(spread, (s) => `calc(-50% + (${Math.cos(angle) * s}) * var(--orbit-r))`);
  const y = useTransform(spread, (s) => `calc(-50% + (${Math.sin(angle) * s}) * var(--orbit-r))`);
  const stackTilt = (i - (n - 1) / 2) * 4;
  const rotate = useTransform(spread, [0, 1], [stackTilt, 0]);
  const scale = useTransform(spread, [0, 1], [1.35, 1]);
  return (
    <motion.figure style={{ x, y, rotate, scale, zIndex: n - i }}
      className="absolute left-1/2 top-1/2 w-[17cqmin] overflow-hidden rounded-xl border border-border bg-card shadow-glow md:w-[20cqmin]">
      <img src={src} alt={`Harsh Verma — ${label}`} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-1.5 pb-1.5 pt-6 font-mono text-[8px] text-foreground md:px-2 md:text-xs">{label}</figcaption>
    </motion.figure>
  );
}

export function PortraitOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const centerOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0.45, 0.65], [0.9, 1]);
  const n = orbitPortraits.length;
  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="orbit-stage relative aspect-square w-[min(96vw,88vh)]" style={{ containerType: "size" }}>
          {orbitPortraits.map((g, i) => <Card key={g.label} i={i} n={n} p={scrollYProgress} src={g.src} label={g.label} />)}
          <motion.div style={{ opacity: centerOpacity, scale: centerScale }}
            className="absolute left-1/2 top-[46%] w-[50cqmin] -translate-x-1/2 -translate-y-1/2 text-center md:w-[46cqmin]">
            <p className="eyebrow">Many rooms, one mission</p>
            <blockquote className="mt-3 font-display text-[max(17px,5.4cqmin)] font-bold leading-tight tracking-tight md:text-[max(18px,6cqmin)]">
              “From being <span className="text-brand-gradient">Creator</span> to <span className="text-brand-gradient">Curator</span>&nbsp;!!”
            </blockquote>
            <p className="mt-3 text-[max(10px,2.4cqmin)] leading-snug text-muted-foreground">
              Engineer at Palo Alto Networks · AI keynote speaker · Author of two books coming January 2027 · Stanford GSB.
            </p>
            <Link to="/speaking" className="mt-3 inline-block font-mono text-[max(11px,2.4cqmin)] text-brand hover:underline">See him on stage →</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
