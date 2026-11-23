export function radarMarkerState(sector: string, selected: string, entry: { id: string; sector: string }) {
  const active = selected === entry.id;
  const focused = selected ? active : Boolean(sector && sector === entry.sector);
  return { active, focused, blinking: !sector && !selected || focused, radius: active ? 14 : focused ? 11 : 7 };
}

export const RADAR_SWEEP_SECONDS = 9;
/** The torch spans -90° to -54° before rotation; its bright edge leads. */
export function radarSweepDelay(angleRadians: number) {
  const degrees = angleRadians * 180 / Math.PI;
  const turn = ((degrees + 54) % 360 + 360) % 360 / 360;
  return (turn - 1) * RADAR_SWEEP_SECONDS;
}