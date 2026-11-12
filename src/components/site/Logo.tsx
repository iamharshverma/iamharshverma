import { useId } from "react";

// Brand palette for the logo: deep blue + red, kept fixed across all four themes.
const DEEP_BLUE = "#1F44C8";
const RED = "#E03131";

export function Logo() {
  const id = useId().replace(/:/g, "");
  return (
    <span className="group inline-flex items-center gap-3" aria-label="Harsh Verma">
      <svg viewBox="0 0 48 48" className="h-10 w-10 transition duration-700 group-hover:rotate-[60deg]" aria-hidden="true">
        <defs>
          <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={DEEP_BLUE} />
            <stop offset="100%" stopColor={RED} />
          </linearGradient>
        </defs>
        {/* hexagon frame */}
        <path d="M24 2.5 42.6 13.25v21.5L24 45.5 5.4 34.75v-21.5Z" fill="none" stroke={`url(#g${id})`} strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 7 38.7 15.5v17L24 41 9.3 32.5v-17Z" fill={`url(#g${id})`} opacity="0.12" />
        <g className="transition duration-700 group-hover:-rotate-[60deg]" style={{ transformOrigin: "24px 24px" }}>
          {/* H: left stem + crossbar, right stem becomes the V's first arm */}
          <path d="M15 14v20M15 24h9" fill="none" stroke={DEEP_BLUE} strokeWidth="3.2" strokeLinecap="round" />
          <path d="M24 14 29 34 34 14" fill="none" stroke={`url(#g${id})`} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="14" r="1.9" fill={RED} />
        </g>
      </svg>
      <span className="font-display text-xl font-semibold leading-none tracking-tight">
        Harsh
      </span>
    </span>
  );
}
