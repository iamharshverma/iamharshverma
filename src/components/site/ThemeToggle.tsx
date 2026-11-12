import { useEffect, useState } from "react";
import { Cloud, Gem, Moon, Orbit, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEMES = ["dark", "light", "glass", "sky", "signal"] as const;
type Theme = (typeof THEMES)[number];
const NAMES: Record<Theme, string> = { dark: "Keynote Midnight", light: "Classic Light", glass: "Founder Glass", sky: "Executive Sky", signal: "Signal Orange" };

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    const t = saved && THEMES.includes(saved) ? saved : "dark";
    setTheme(t);
    document.documentElement.dataset['theme'] = t;
  }, []);
  const next: Theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length] ?? "dark";
  function toggle() {
    setTheme(next);
    document.documentElement.dataset['theme'] = next;
    localStorage.setItem("portfolio-theme", next);
  }
  const label = `Switch to ${NAMES[next]}`;
  const Icon = next === "light" ? Sun : next === "glass" ? Gem : next === "sky" ? Cloud : next === "signal" ? Orbit : Moon;
  return <Button variant="ghost" size="icon-lg" aria-label={label} title={label} onClick={toggle}><Icon /></Button>;
}
