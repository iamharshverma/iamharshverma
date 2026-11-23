import { BaseEdge, getStraightPath, type EdgeProps } from "@xyflow/react";

/** SVG motion follows the edge itself, without changing layout or camera state. */
export function KnowledgeFlowEdge({ id, sourceX, sourceY, targetX, targetY, data }: EdgeProps) {
  const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  return <>
    <BaseEdge id={id} path={path} />
    {data?.["flowing"] === true && <g className="kn-travelling-arrow" aria-hidden="true">
      <path d="M -5 -3 L 1 0 L -5 3" />
      <animateMotion dur="4s" repeatCount="indefinite" path={path} rotate="auto" />
    </g>}
  </>;
}