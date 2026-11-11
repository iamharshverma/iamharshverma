export function Logo() {
  return (
    <span className="group inline-flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-brand-gradient shadow-glow transition duration-500 group-hover:rotate-[8deg]">
        <svg viewBox="0 0 32 32" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 6v20M6 16h8M14 6v20" />
          <path d="M18 6l4.5 20L27 6" />
        </svg>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/40 to-transparent transition duration-700 group-hover:translate-x-full" />
      </span>
      <span className="font-display text-xl font-semibold leading-none tracking-tight">Harsh<span className="text-brand">.</span>
        <span className="block font-mono text-[9px] font-normal uppercase tracking-[0.25em] text-muted-foreground">AI · Founder · Speaker</span></span>
    </span>
  );
}
