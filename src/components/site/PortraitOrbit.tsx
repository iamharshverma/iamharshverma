import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { orbitPortraits } from "@/data/profile";
import { Button } from "@/components/ui/button";

const Card = memo(function Card({ i, n, spread, radius, reducedMotion, src, label, to }: { i: number; n: number; spread: MotionValue<number>; radius: number; reducedMotion: boolean; src: string; label: string; to: (typeof orbitPortraits)[number]["to"] }) {
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
  // Resolve responsive geometry on resize, not on every scroll frame.
  const x = useTransform(spread, (s) => Math.cos(angle) * s * radius);
  const y = useTransform(spread, (s) => Math.sin(angle) * s * radius);
  const stackTilt = (i - (n - 1) / 2) * 4;
  const rotate = useTransform(spread, [0, 1], [stackTilt, 0]);
  const scale = useTransform(spread, [0, 1], [1.35, 1]);
  return (
    <motion.figure style={{ x: reducedMotion ? Math.cos(angle) * radius : x, y: reducedMotion ? Math.sin(angle) * radius : y, rotate: reducedMotion ? 0 : rotate, scale: reducedMotion ? 1 : scale, zIndex: n - i }}
      className="orbit-card absolute left-1/2 top-1/2 w-[26cqmin] overflow-hidden rounded-xl border border-border bg-card shadow-glow md:w-[30cqmin]">
      <Link to={to} aria-label={`Explore Harsh Verma — ${label}`} className="group block rounded-xl transition-shadow hover:ring-2 hover:ring-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand">
        <img src={src} alt={`Harsh Verma — ${label}`} loading="lazy" decoding="async" width={400} height={500} className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:-translate-y-1 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none" />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-1.5 pb-1.5 pt-6 font-mono text-[8px] text-foreground transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1 motion-reduce:transition-none md:px-2 md:text-xs">{label}</span>
      </Link>
    </motion.figure>
  );
});

export function PortraitOrbit({ heading, tag, headingNote, sectionLink, centerLink = { to: "/speaking", label: "See him on stage →" }, centerText = <>“From being <span className="text-brand-gradient">Creator</span> to <span className="text-brand-gradient">Curator</span>&nbsp;!!”</> }: { heading?: ReactNode; tag?: string; headingNote?: string; sectionLink?: ReactNode; centerLink?: { to: "/about" | "/speaking"; label: string; appearance?: "button" }; centerText?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState({ radius: 0, headingOffset: 0 });
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => {
      const size = Math.min(stage.clientWidth, stage.clientHeight);
      const radiusRatio = window.matchMedia("(min-width: 768px)").matches ? 0.36 : 0.33;
      const initialLeft = Math.max(24, (window.innerWidth - 1152) / 2 + 24);
      setGeometry({ radius: size * radiusRatio, headingOffset: 40 - initialLeft });
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [expanded, setExpanded] = useState(false);
  const expandedRef = useRef(false);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = progress >= 0.55;
    if (expandedRef.current === next) return;
    expandedRef.current = next;
    setExpanded(next);
  });
  const spread = useTransform(scrollYProgress, [0.08, 0.55], [0, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0.45, 0.65], [0.9, 1]);
  const reducedMotion = useReducedMotion();
  const headingY = useTransform(scrollYProgress, [0.08, 0.5], [-8, 0]);
  const headingTop = useTransform(scrollYProgress, [0, 0.06], [-72, 0]);
  const headingSpread = useTransform(scrollYProgress, [0.08, 0.5], [0, 1]);
  const headingLeft = useTransform(headingSpread, (value) => geometry.headingOffset * value);
  const n = orbitPortraits.length;
  return (
    <div ref={ref} className="portrait-orbit relative h-[260vh]">
      <div className="orbit-sticky sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ "--heading-shift": reducedMotion ? `${geometry.headingOffset}px` : headingLeft, y: reducedMotion ? 0 : headingNote ? headingTop : headingY } as MotionStyle}
          className={`orbit-heading absolute left-6 right-6 z-10 md:left-[max(24px,calc((100vw-72rem)/2+24px))] md:right-auto ${expanded || reducedMotion ? "md:w-[34%]" : "md:w-[90%]"} ${headingNote ? "top-[88px]" : heading ? "top-24 md:top-[104px]" : "top-20 md:top-[88px]"}`}>
          {tag && <p className="eyebrow text-balance">{tag}</p>}
          <h2 className={`font-display font-bold leading-tight tracking-normal ${tag ? "mt-3" : ""} ${heading ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"}`}>
          {heading ?? <>{expanded ? "Meet " : "Who is "}<span className="text-brand-gradient">Harsh Verma</span>{expanded ? " !!" : "?"}</>}
          </h2>
          {headingNote && !expanded && !reducedMotion && <motion.p
            key={reducedMotion ? "static-hint" : "animated-hint"}
            animate={reducedMotion ? { y: 0 } : { y: [0, 3, 0] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="mt-3 flex w-fit items-center gap-1.5 border-b border-brand/40 pb-1 text-xs font-semibold italic leading-relaxed text-foreground motion-reduce:transform-none! md:text-sm"
          >
            <ChevronDown aria-hidden="true" className="size-3.5 text-brand" />
            {headingNote}
          </motion.p>}
        </motion.div>
        {sectionLink && <div className="absolute right-[max(24px,calc((100vw-72rem)/2+24px))] top-[104px] z-20 hidden md:block">{sectionLink}</div>}
        <div ref={stageRef} className="orbit-stage relative aspect-square w-[min(96vw,84vh)]" style={{ containerType: "size" }}>
          {orbitPortraits.map((g, i) => <Card key={g.label} i={i} n={n} spread={spread} radius={geometry.radius} reducedMotion={Boolean(reducedMotion)} src={g.src} label={g.label} to={g.to} />)}
          <motion.div style={{ opacity: reducedMotion ? 1 : centerOpacity, scale: reducedMotion ? 1 : centerScale }}
            className="absolute left-1/2 top-[46%] w-[34cqmin] -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="eyebrow hidden md:block">Many rooms, one mission</p>
            <blockquote className={`mt-2 text-balance font-display font-bold leading-snug tracking-normal ${heading ? "text-[clamp(12px,3.4cqmin,24px)]" : "text-[clamp(13px,3.8cqmin,28px)]"}`}>
              {centerText}
            </blockquote>
            {centerLink.appearance === "button" ? (
              <Button asChild size="sm" className="mt-3 h-auto min-h-8 max-w-full whitespace-normal px-2 py-1 font-mono text-[10px] leading-tight md:px-3 md:text-xs">
                <Link to={centerLink.to}>{centerLink.label}</Link>
              </Button>
            ) : <Link to={centerLink.to} className="mt-3 inline-block max-w-full text-balance font-mono text-[clamp(10px,2cqmin,14px)] leading-relaxed text-brand hover:underline">{centerLink.label}</Link>}
          </motion.div>
          {sectionLink && <div className="absolute inset-x-0 top-[calc(93%+16px)] z-10 flex justify-center md:hidden">{sectionLink}</div>}
        </div>
      </div>
    </div>
  );
}
