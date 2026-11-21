import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div className={`content-reveal ${className ?? ""}`} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string | undefined; prefix?: string | undefined; decimals?: number | undefined }) {
  const container = useRef<HTMLSpanElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const inView = useInView(container, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const finalValue = `${prefix}${to.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const element = number.current;
    if (!element) return;
    element.textContent = finalValue;
    if (!inView || reducedMotion) return;

    // Update only the number's text, not the surrounding page, on each frame.
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      },
      onComplete: () => { element.textContent = finalValue; },
    });
    return () => {
      controls.stop();
      element.textContent = finalValue;
    };
  }, [inView, reducedMotion, to, prefix, suffix, decimals, finalValue]);

  return (
    <span ref={container} aria-label={finalValue} className="inline-grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">{finalValue}</span>
      <span ref={number} aria-hidden="true" className="col-start-1 row-start-1 justify-self-end">{finalValue}</span>
    </span>
  );
}

export function PageHero({ eyebrow, title, intro, sideImage, subtitle }: { eyebrow: string; title: ReactNode; intro?: string; sideImage?: ReactNode; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden grain border-b border-border pt-24 pb-12 md:pt-36 md:pb-16">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div className={`relative mx-auto max-w-6xl px-6 ${sideImage ? "grid items-center gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]" : ""}`}>
        <div className="min-w-0">
        <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
        <Reveal delay={0.1}><h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-7xl">{title}</h1></Reveal>
        {subtitle && <Reveal delay={0.15}><p className="mt-4 font-display text-xl font-bold md:text-2xl">{subtitle}</p></Reveal>}
        {intro && <Reveal delay={0.2}><p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p></Reveal>}
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
            {["Founder", "Engineer", "Speaker"].map((t) => <span key={t} className="rounded-full border border-border bg-card/60 px-3 py-1 text-muted-foreground">{t}</span>)}
          </div>
        </Reveal>
        </div>
        {sideImage}
      </div>
    </section>
  );
}
