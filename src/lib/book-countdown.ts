/** Counts to the start of the announced release month, not a confirmed publication day. */
export const BOOK_LAUNCH_MONTH_START = Date.UTC(2027, 0, 1);
export function bookCountdown(now: number) {
  const seconds = Math.max(0, Math.floor((BOOK_LAUNCH_MONTH_START - now) / 1000));
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}