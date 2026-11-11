import { useEffect, useState } from "react";

const TARGET = new Date("2027-01-01T00:00:00-08:00").getTime();
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const ms = Math.max(0, TARGET - (now ?? TARGET));
  const parts = [["Days", Math.floor(ms / 864e5)], ["Hours", Math.floor(ms / 36e5) % 24], ["Min", Math.floor(ms / 6e4) % 60], ["Sec", Math.floor(ms / 1e3) % 60]] as const;
  return (
    <div className="flex gap-3" aria-label="Countdown to January 2027">
      {parts.map(([l, v]) => (
        <div key={l} className="min-w-16 rounded-xl border border-border bg-card px-3 py-2 text-center">
          <p className="font-display text-2xl font-bold tabular-nums">{now === null ? "--" : String(v).padStart(2, "0")}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{l}</p>
        </div>
      ))}
    </div>
  );
}
