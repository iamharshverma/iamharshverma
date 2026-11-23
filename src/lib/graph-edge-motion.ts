/** Keep directional motion on topic spokes and highlighted large works only. */
export function graphEdgeFlows({ spoke, dimmed, highlighted, standout }: { spoke: boolean; dimmed: boolean; highlighted: boolean; standout: boolean }) {
  return !dimmed && (spoke || (highlighted && standout));
}