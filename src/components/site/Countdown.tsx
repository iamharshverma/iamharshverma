import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BOOK_LAUNCH_MONTH_START, bookCountdown } from "@/lib/book-countdown";

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (now === null) return <p className="font-display text-2xl font-semibold text-stat-number">January 2027</p>;
  if (now >= BOOK_LAUNCH_MONTH_START) return <p className="font-display text-2xl font-semibold text-stat-number">January 2027 · Release updates</p>;
  const time = bookCountdown(now);
  const units = [[time.days, "Days"], [time.hours, "Hours"], [time.minutes, "Min"], [time.seconds, "Sec"]] as const;
  return (
    <div role="group" aria-label="Countdown to January 2027" className="grid w-full max-w-sm grid-cols-4 gap-2">
      {units.map(([value, label]) => (
        <div key={label} className="min-w-0 text-center">
          <div className="relative flex h-14 items-center justify-center overflow-hidden rounded-md border border-border bg-background font-display text-2xl font-bold tabular-nums text-stat-number sm:text-3xl">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span key={value} initial={reducedMotion ? false : { y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reducedMotion ? { opacity: 0 } : { y: -15, opacity: 0 }} transition={{ duration: 0.2 }}>
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-2 font-mono text-xs text-stat-label">{label}</p>
        </div>
      ))}
    </div>
  );
}
