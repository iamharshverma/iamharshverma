export function radarMarkerState(sector: string, selected: string, entry: { id: string; sector: string }) {
  const active = selected === entry.id;
  const focused = selected ? active : Boolean(sector && sector === entry.sector);
  return { active, focused, blinking: !sector && !selected || focused, radius: active ? 14 : focused ? 11 : 7 };
}