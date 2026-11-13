import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { orbitPortraits } from "@/data/profile";
import { Button } from "@/components/ui/button";

// Short, wide viewports (landscape phones): the ring has no room for a centre
// column, so the portraits unstack into a row and the quote sits underneath.
const LANDSCAPE_QUERY = "(orientation: landscape) and (max-height: 560px) and (max-width: 1000px)";

function useLandscapePhone() {
  const [isLandscape, setIsLandscape] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(LANDSCAPE_QUERY);
    const sync = () => setIsLandscape(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isLandscape;
}

const Card = memo(function Card({ i, n, spread, radiusX, radiusY, rowGap, row, reducedMotion, src, label, to }: { i: number; n: number; spread: MotionValue<number>; radiusX: number; radiusY: number; rowGap: number; row: boolean; reducedMotion: boolean; src: string; label: string; to: (typeof orbitPortraits)[number]["to"] }) {
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
  // Gentle arch in row mode: outer photos sit a little lower than the centre one.
  const arc = (Math.abs(i - (n - 1) / 2) - 1) * 10;
  const x = useTransform(spread, (s) => (row ? (i - (n - 1) / 2) * rowGap : Math.cos(angle) * radiusX) * s);
  const y = useTransform(spread, (s) => (row ? arc : Math.sin(angle) * radiusY) * s);
  const stackTilt = (i - (n - 1) / 2) * 4;
  const rotate = useTransform(spread, [0, 1], [stackTilt, 0]);
  const scale = useTransform(spread, [0, 1], [1.35, 1]);
  const restX = row ? (i - (n - 1) / 2) * rowGap : Math.cos(angle) * radiusX;
  const restY = row ? arc : Math.sin(angle) * radiusY;
  return (
    <motion.figure style={{ x: reducedMotion ? restX : x, y: reducedMotion ? restY : y, rotate: reducedMotion ? 0 : rotate, scale: reducedMotion ? 1 : scale, zIndex: n - i }}
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
  const landscape = useLandscapePhone();
  const [geometry, setGeometry] = useState({ radiusX: 0, radiusY: 0, rowGap: 0, row: false, headingOffset: 0 });
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const size = Math.min(w, h);
      const n = orbitPortraits.length;
      const initialLeft = Math.max(24, (window.innerWidth - 1152) / 2 + 24);
      if (window.matchMedia(LANDSCAPE_QUERY).matches) {
        const cardW = Math.min(window.innerWidth * 0.13, 88);
        const rowGap = Math.min(((w - cardW) / (n - 1)) * 0.8, cardW * 1.6);
        setGeometry({ radiusX: w * 0.42, radiusY: h * 0.34, rowGap, row: true, headingOffset: 40 - initialLeft });
      } else {
        const ratio = window.matchMedia("(min-width: 768px)").matches ? 0.36 : 0.33;
        setGeometry({ radiusX: size * ratio, radiusY: size * ratio, rowGap: 0, row: false, headingOffset: 40 - initialLeft });
      }
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
  const headingLeft = useTransform(headingSpread, (value) => `${geometry.headingOffset * value}px`);
  const n = orbitPortraits.length;
  return (
    <div ref={ref} className="portrait-orbit relative h-[260vh]">
      <div className="orbit-sticky sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ "--heading-shift": reducedMotion ? `${geometry.headingOffset}px` : headingLeft, y: reducedMotion ? 0 : headingNote ? headingTop : headingY } as MotionStyle}
          className={`orbit-heading absolute left-6 right-6 z-10 md:left-[max(24px,calc((100vw-72rem)/2+24px))] md:right-auto ${!landscape && (expanded || reducedMotion) ? "md:w-[min(34vw,calc(50vw-min(14.4vw,12.6vh)-56px))]" : "md:w-[90%]"} ${landscape ? "top-[80px]" : headingNote ? "top-[88px]" : heading ? "top-24 md:top-[104px]" : "top-20 md:top-[88px]"}`}>
          {tag && <p className="eyebrow text-balance">{tag}</p>}
          <h2 className={`text-balance break-words font-display font-bold leading-tight tracking-normal ${tag ? "mt-3" : ""} ${landscape ? "text-lg md:text-xl" : heading ? "text-2xl md:text-2xl lg:text-4xl" : "text-3xl md:text-3xl lg:text-5xl"}`}>
          {heading ?? <>{expanded ? "Meet " : "Who is "}<span className="text-brand-gradient">Harsh Verma</span>{expanded ? " !!" : "?"}</>}
          </h2>
          {headingNote && !expanded && !reducedMotion && <motion.p
            key={reducedMotion ? "static-hint" : "animated-hint"}
            animate={reducedMotion ? { y: 0 } : { y: [0, 3, 0] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className={`mt-2 flex w-fit items-center gap-1.5 border-b border-brand/40 pb-1 font-semibold italic leading-relaxed text-foreground motion-reduce:transform-none! ${landscape ? "text-[10px]" : "mt-3 text-xs md:text-sm"}`}
          >
            <ChevronDown aria-hidden="true" className="size-3.5 text-brand" />
            {headingNote}
          </motion.p>}
        </motion.div>
        {sectionLink && <div className="absolute right-[max(24px,calc((100vw-72rem)/2+24px))] top-[104px] z-20 hidden md:block">{sectionLink}</div>}
        <div ref={stageRef} className="orbit-stage relative aspect-square w-[min(96vw,84vh)]" style={{ containerType: "size" }}>
          {orbitPortraits.map((g, i) => <Card key={g.label} i={i} n={n} spread={spread} radiusX={geometry.radiusX} radiusY={geometry.radiusY} rowGap={geometry.rowGap} row={geometry.row} reducedMotion={Boolean(reducedMotion)} src={g.src} label={g.label} to={g.to} />)}
          <motion.div style={{ opacity: reducedMotion ? 1 : centerOpacity, scale: reducedMotion ? 1 : centerScale }}
            className={`absolute left-1/2 text-center ${landscape ? "top-[calc(100%+10px)] w-[min(88vw,460px)] -translate-x-1/2" : "top-[47%] w-[34cqmin] -translate-x-1/2 -translate-y-1/2"}`}>
            <p className={landscape ? "hidden" : "eyebrow hidden md:block"}>Many rooms, one mission</p>
            <blockquote className={`text-balance font-display font-bold leading-snug tracking-normal ${landscape ? "mt-0 text-sm md:text-base" : `mt-2 ${heading ? "text-[clamp(12px,3.4cqmin,24px)]" : "text-[clamp(13px,3.8cqmin,28px)]"}`}`}>
              {centerText}
            </blockquote>
            {centerLink.appearance === "button" ? (
              <Button asChild size="sm" className="mt-2 h-auto min-h-6 max-w-full whitespace-normal rounded-md px-1.5 py-0.5 font-mono text-[9px] leading-tight md:px-2 md:text-[10px]">
                <Link to={centerLink.to}>{centerLink.label}</Link>
              </Button>
            ) : <Link to={centerLink.to} className={`inline-block max-w-full text-balance font-mono leading-relaxed text-brand hover:underline ${landscape ? "mt-1 text-xs" : "mt-3 text-[clamp(10px,2cqmin,14px)]"}`}>{centerLink.label}</Link>}
          </motion.div>
          {sectionLink && <div className="absolute inset-x-0 top-[calc(93%+16px)] z-10 flex justify-center md:hidden">{sectionLink}</div>}
        </div>
      </div>
    </div>
  );
}
