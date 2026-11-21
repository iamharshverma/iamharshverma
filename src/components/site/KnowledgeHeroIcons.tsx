import { Link } from "@tanstack/react-router";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function KnowledgeHeroIcons({ variant }: { variant: "hub" | "impact" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <div ref={ref} className={`knowledge-hero-icons ${inView && visible && !reducedMotion ? "is-moving" : ""}`} aria-label="Knowledge destinations">
      {variant === "hub" && (
      <Button asChild variant="ghost" className="knowledge-hero-destination">
        <Link to="/knowledge" title="Explore Knowledge Hub" aria-label="Explore Knowledge Hub">
          <svg className="knowledge-hero-art" viewBox="0 0 160 160" fill="none" aria-hidden="true">
            <g className="knowledge-hero-connections" stroke="currentColor" strokeWidth="1.5">
              <path d="M80 80 35 34 125 42 80 80 132 113 82 139 80 80 25 108 35 34M25 108 82 139M125 42 132 113" />
            </g>
            <g className="knowledge-hero-nodes" stroke="currentColor" strokeWidth="2">
              <circle cx="35" cy="34" r="8" /><circle cx="125" cy="42" r="6" />
              <circle cx="132" cy="113" r="8" /><circle cx="82" cy="139" r="6" /><circle cx="25" cy="108" r="7" />
            </g>
            <path className="knowledge-hero-core" d="m80 60 18 10v20L80 100 62 90V70Z" stroke="currentColor" strokeWidth="2" />
            <path d="m62 70 18 10 18-10M80 80v20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </Button>
      )}
      {variant === "impact" && (
      <Button asChild variant="ghost" className="knowledge-hero-destination knowledge-hero-impact">
        <Link to="/knowledge-impact" title="Explore Knowledge Impact" aria-label="Explore Knowledge Impact">
          <svg className="knowledge-hero-art" viewBox="0 0 160 160" fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="1" opacity=".4">
              <circle cx="80" cy="80" r="59" /><circle cx="80" cy="80" r="39" /><circle cx="80" cy="80" r="19" />
              <path d="M80 15v130M15 80h130" />
            </g>
            <g className="knowledge-hero-sweep" stroke="currentColor" strokeWidth="2">
              <path d="M80 80 122 38" />
              <path d="M80 21a59 59 0 0 1 42 17" strokeWidth="4" />
            </g>
            <g className="knowledge-hero-signals" fill="currentColor">
              <circle cx="105" cy="52" r="4" /><circle cx="47" cy="99" r="4" /><circle cx="103" cy="116" r="3" />
              <circle cx="80" cy="80" r="5" />
            </g>
          </svg>
        </Link>
      </Button>
      )}
    </div>
  );
}