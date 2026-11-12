import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { orbitPortraits } from "@/data/profile";

function Card({ i, n, p, src, label, to }: { i: number; n: number; p: MotionValue<number>; src: string; label: string; to: (typeof orbitPortraits)[number]["to"] }) {
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
      className="absolute left-1/2 top-1/2 w-[26cqmin] overflow-hidden rounded-xl border border-border bg-card shadow-glow md:w-[30cqmin]">
      <Link to={to} aria-label={`Explore Harsh Verma — ${label}`} className="group block rounded-xl transition-shadow hover:ring-2 hover:ring-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand">
        <img src={src} alt={`Harsh Verma — ${label}`} loading="lazy" className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:-translate-y-1 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none" />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-1.5 pb-1.5 pt-6 font-mono text-[8px] text-foreground transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1 motion-reduce:transition-none md:px-2 md:text-xs">{label}</span>
      </Link>
    </motion.figure>
  );
}

export function PortraitOrbit({ heading, tag, headingNote, sectionLink, centerLink = { to: "/speaking", label: "See him on stage →" }, centerText = <>“From being <span className="text-brand-gradient">Creator</span> to <span className="text-brand-gradient">Curator</span>&nbsp;!!”</> }: { heading?: ReactNode; tag?: string; headingNote?: string; sectionLink?: ReactNode; centerLink?: { to: "/about" | "/speaking"; label: string }; centerText?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [expanded, setExpanded] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (progress) => setExpanded(progress >= 0.55));
  const centerOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0.45, 0.65], [0.9, 1]);
  const reducedMotion = useReducedMotion();
  const headingWidth = useTransform(scrollYProgress, [0.08, 0.5], ["90%", "34%"]);
  const headingY = useTransform(scrollYProgress, [0.08, 0.5], [-8, 0]);
  const headingTop = useTransform(scrollYProgress, [0, 0.06], [16, 88]);
  const headingSpread = useTransform(scrollYProgress, [0.08, 0.5], [0, 1]);
  const headingLeft = useTransform(headingSpread, (spread) => `calc(max(24px, (100vw - 72rem) / 2 + 24px) * ${1 - spread} + 40px * ${spread})`);
  const n = orbitPortraits.length;
  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ "--heading-width": reducedMotion ? "34%" : headingWidth, "--heading-left": reducedMotion ? "40px" : headingLeft, ...(headingNote ? { top: reducedMotion ? 88 : headingTop } : {}), y: reducedMotion ? 0 : headingY } as MotionStyle}
          className={`absolute left-6 right-6 z-10 md:left-[var(--heading-left)] md:right-auto md:w-[var(--heading-width)] ${headingNote ? "" : heading ? "top-24 md:top-[104px]" : "top-20 md:top-[88px]"}`}>
          {tag && <p className="eyebrow text-balance">{tag}</p>}
          <h2 className={`font-display font-bold leading-tight tracking-normal ${tag ? "mt-3" : ""} ${heading ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"}`}>
          {heading ?? <>{expanded ? "Meet " : "Who is "}<span className="text-brand-gradient">Harsh Verma</span>{expanded ? " !!" : "?"}</>}
          </h2>
          {headingNote && !expanded && <motion.p
            key={reducedMotion ? "static-hint" : "animated-hint"}
            animate={reducedMotion ? { y: 0 } : { y: [0, 3, 0] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="mt-3 flex w-fit items-center gap-1.5 border-b border-brand/40 pb-1 text-xs font-semibold italic leading-relaxed text-foreground motion-reduce:transform-none! md:text-sm"
          >
            <ChevronDown aria-hidden="true" className="size-3.5 text-brand" />
            {headingNote}
          </motion.p>}
          {sectionLink && <div className="mt-4 md:hidden">{sectionLink}</div>}
        </motion.div>
        {sectionLink && <div className="absolute right-[max(24px,calc((100vw-72rem)/2+24px))] top-[104px] z-20 hidden md:block">{sectionLink}</div>}
        <div className="orbit-stage relative aspect-square w-[min(96vw,84vh)]" style={{ containerType: "size" }}>
          {orbitPortraits.map((g, i) => <Card key={g.label} i={i} n={n} p={scrollYProgress} src={g.src} label={g.label} to={g.to} />)}
          <motion.div style={{ opacity: centerOpacity, scale: centerScale }}
            className="absolute left-1/2 top-[46%] w-[34cqmin] -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="eyebrow hidden md:block">Many rooms, one mission</p>
            <blockquote className={`mt-2 text-balance font-display font-bold leading-snug tracking-normal ${heading ? "text-[clamp(12px,3.4cqmin,24px)]" : "text-[clamp(13px,3.8cqmin,28px)]"}`}>
              {centerText}
            </blockquote>
            <Link to={centerLink.to} className="mt-3 inline-block max-w-full text-balance font-mono text-[clamp(10px,2cqmin,14px)] leading-relaxed text-brand hover:underline">{centerLink.label}</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
