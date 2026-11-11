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
    <div className={`fixed bottom-4 left-4 right-20 z-40 transition-all duration-300 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
      <Link to="/booking" className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-gradient font-medium text-primary-foreground shadow-glow" onClick={() => window.__lovableEvents?.track?.("project.book_bar_clicked", {})}>
        <CalendarDays className="h-4 w-4" />Book Harsh
      </Link>
    </div>
  );
}
