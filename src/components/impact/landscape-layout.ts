export function landscapeLayout(count: number, compact: boolean, expanded = false) {
  if (expanded) return compact
    ? { center: { x: 200, y: 350 }, nodes: [{ x: 100, y: 110 }, { x: 300, y: 110 }, { x: 200, y: 600 }], width: 400, height: 710 }
    : { center: { x: 480, y: 300 }, nodes: [{ x: 170, y: 170 }, { x: 790, y: 170 }, { x: 480, y: 560 }], width: 960, height: 680 };
  const center = compact ? { x: 200, y: count <= 5 ? 350 : 460 } : { x: 480, y: 260 };
  const slots = count <= 5
    ? [[100, 110], [300, 110], [100, 590], [300, 590], [200, 790]]
    : [[100, 100], [300, 100], [100, 280], [300, 280], [100, 640], [300, 640], [100, 820], [300, 820]];
  const nodes = Array.from({ length: count }, (_, i) => {
    if (compact) {
      const slot = slots[i];
      return { x: slot?.[0] ?? 200, y: slot?.[1] ?? 620 };
    }
    const angle = i / count * Math.PI * 2 - Math.PI / 2;
    return { x: center.x + Math.cos(angle) * 340, y: center.y + Math.sin(angle) * 170 };
  });
  return { center, nodes, width: compact ? 400 : 960, height: compact ? count <= 5 ? 890 : 920 : 520 };
}

// Terminate each spoke at the node border rather than underneath its label.
export function landscapeSpoke(center: { x: number; y: number }, node: { x: number; y: number }, width: number, height: number, hubRadius = 64, circular = false) {
  const dx = node.x - center.x;
  const dy = node.y - center.y;
  const length = Math.hypot(dx, dy);
  if (!length) return "";
  const inset = circular ? width / 2 / length : Math.min(dx ? width / 2 / Math.abs(dx) : Infinity, dy ? height / 2 / Math.abs(dy) : Infinity);
  const start = hubRadius / length;
  return `M ${center.x + dx * start} ${center.y + dy * start} L ${node.x - dx * inset} ${node.y - dy * inset}`;
}