import { memo, useEffect, useMemo, useState } from "react";
import { ReactFlow, Background, Handle, Position, useNodesState, type Node, type NodeProps, type ReactFlowInstance } from "@xyflow/react";
import { Focus, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { architectureComponents } from "@/lib/impact-simulation";

type AgentNode = Node<{ title: string; index: number; active: boolean; selected: boolean; visited: boolean }, "agent">;
const Agent = memo(function Agent({ data }: NodeProps<AgentNode>) {
  return <div style={{ ["--agent-i" as string]: data.index }} className={`impact-agent-node impact-tone-${data.index % 8} ${data.selected ? "is-selected" : ""} ${data.active ? "is-active" : ""} ${data.visited ? "is-visited" : ""}`}>
    <Handle type="target" position={Position.Top} /><span className="impact-kicker">{String(data.index + 1).padStart(2, "0")} / {data.active ? "ACTIVE" : data.visited ? "TRACED" : "AGENT"}</span>
    <span className="impact-agent-dot" aria-hidden /><span className="mt-2 block text-sm font-semibold">{data.title}</span><Handle type="source" position={Position.Bottom} />
  </div>;
});
const nodeTypes = { agent: Agent };
const coordinates: Record<string, [number, number]> = { human: [230, 0], orchestrator: [230, 120], planner: [0, 250], research: [230, 250], execution: [460, 250], policy: [230, 400], gateway: [230, 540], systems: [460, 540], evaluation: [0, 540], audit: [230, 680] };
const connections = [["human", "orchestrator"], ["orchestrator", "planner"], ["orchestrator", "research"], ["orchestrator", "execution"], ["planner", "policy"], ["research", "policy"], ["execution", "policy"], ["policy", "gateway"], ["gateway", "systems"], ["systems", "evaluation"], ["evaluation", "audit"], ["policy", "human"]];

export function ArchitectureCanvas({ selected, active, visited, running, onSelect }: { selected: string; active: string; visited: string[]; running: boolean; onSelect: (id: string) => void }) {
  const [flow, setFlow] = useState<ReactFlowInstance<AgentNode> | null>(null);
  const initial = useMemo<AgentNode[]>(() => architectureComponents.map((component, index) => {
    const [x = 0, y = 0] = coordinates[component.id] ?? [];
    return { id: component.id, type: "agent", position: { x, y }, ariaLabel: `Inspect ${component.title}`, data: { title: component.title, index, active: component.id === active, selected: component.id === selected, visited: visited.includes(component.id) } };
  }), [selected, active, visited]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initial);
  useEffect(() => { setNodes(previous => initial.map(node => ({ ...node, position: previous.find(p => p.id === node.id)?.position ?? node.position }))); }, [initial, setNodes]);
  const edges = useMemo(() => connections.map(([source = "", target = ""], index) => ({ id: `agent-${index}`, source, target, type: "smoothstep", animated: target === active || source === selected || target === selected, className: `impact-agent-edge ${source === selected || target === selected ? "is-linked" : ""} ${target === active ? "is-active" : ""} ${source === "policy" && target === "human" ? "is-approval" : ""}` })), [active]);
  return <div className={`impact-architecture-canvas ${running ? "is-running" : ""}`}>
    <ReactFlow<AgentNode> nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onInit={setFlow} onNodeClick={(_, node) => onSelect(node.id)} fitView fitViewOptions={{ padding: 0.15 }} minZoom={0.3} maxZoom={2.5} nodesConnectable={false} deleteKeyCode={null} zoomOnScroll={false} preventScrolling={false} nodeDragThreshold={6} proOptions={{ hideAttribution: true }}>
      <Background gap={24} size={1} />
    </ReactFlow>
    <div className="impact-diagram-tools">
      <Button variant="ghost" size="icon-sm" aria-label="Zoom in architecture" title="Zoom in" onClick={() => void flow?.zoomIn()}><Plus /></Button>
      <Button variant="ghost" size="icon-sm" aria-label="Zoom out architecture" title="Zoom out" onClick={() => void flow?.zoomOut()}><Minus /></Button>
      <Button variant="ghost" size="icon-sm" aria-label="Fit architecture" title="Fit architecture" onClick={() => void flow?.fitView({ padding: 0.15 })}><Focus /></Button>
    </div>
  </div>;
}