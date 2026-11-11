import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";

/** Mobile-only "Book Harsh" bar that appears after the visitor scrolls past the top section. */
export function MobileBookBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (path.startsWith("/booking") || path.startsWith("/contact")) return null;
  return (
    <div className={`fixed bottom-4 left-4 z-[60] pb-[env(safe-area-inset-bottom)] transition-all duration-300 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
      <Link to="/booking" className="flex h-11 items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 text-sm font-medium text-foreground shadow-glow backdrop-blur-md" onClick={() => window.__lovableEvents?.track?.("project.book_bar_clicked", {})}>
        <CalendarDays className="h-4 w-4 text-primary" />Book Harsh
      </Link>
    </div>
  );
}
