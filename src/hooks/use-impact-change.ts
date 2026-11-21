import { useEffect, useRef, useState } from "react";

/** Initial loads and unchanged scores do not flash; repeated changes restart the highlight. */
export function useImpactChange(score: number | null) {
  const previous = useRef(score);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (previous.current === score) return;
    previous.current = score;
    clearTimeout(timer.current);
    setChanged(true);
    timer.current = setTimeout(() => setChanged(false), 2200);
  }, [score]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return changed;
}