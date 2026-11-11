import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string | undefined; prefix?: string | undefined; decimals?: number | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (n) => setV(n) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v.toFixed(decimals)}{suffix}</span>;
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <section className="relative overflow-hidden grain border-b border-border pt-36 pb-16">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
        <Reveal delay={0.1}><h1 className="mt-4 font-display text-5xl font-bold tracking-tight font-bold leading-[1.02] tracking-tight md:text-7xl">{title}</h1></Reveal>
        {intro && <Reveal delay={0.2}><p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p></Reveal>}
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
            {["Founder", "Engineer", "Speaker"].map((t) => <span key={t} className="rounded-full border border-border bg-card/60 px-3 py-1 text-muted-foreground">{t}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
