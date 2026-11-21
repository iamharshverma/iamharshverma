import { Link } from "@tanstack/react-router";
import { Network, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { knowledge } from "@/data/knowledge";
import { connectedWork } from "@/data/knowledge-network";

export function KnowledgeGraphEntry({ id }: { id: string }) {
  const item = knowledge.find(record => record.id === id);
  if (!item) return null;
  const connections = connectedWork(id);
  const formats = new Set(connections.map(connection => connection.item.kind));
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5">
      <div className="flex items-center gap-3">
        <Network className="size-5 shrink-0 text-expertise-node" />
        <div>
          <p className="font-display text-sm font-semibold">Part of the Connected Knowledge Graph</p>
          <p className="mt-1 text-xs text-muted-foreground">{connections.length} related works · {formats.size} content types</p>
        </div>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link to="/knowledge" search={{ resource: id }}>Explore connections <ArrowUpRight /></Link>
      </Button>
    </div>
  );
}