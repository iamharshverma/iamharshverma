import {
  BookOpen,
  FileText,
  FlaskConical,
  Mic2,
  MessagesSquare,
  Fingerprint,
  Layers,
  Download,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { KnowledgeCards } from "./KnowledgeCards";
import { groupKnowledge, networkTopics } from "@/data/knowledge-network";
import type { KnowledgeItem } from "@/data/knowledge";
import { scrollToKnowledgeGroup } from "@/lib/knowledge-navigation";
const icons: Record<string, typeof FileText> = {
  Article: FileText,
  Research: FlaskConical,
  Keynote: Mic2,
  Book: BookOpen,
  Media: MessagesSquare,
  Patent: Fingerprint,
  Download,
};
export function GroupedKnowledgeResults({
  items,
  topic,
}: {
  items: KnowledgeItem[];
  topic: string;
}) {
  const groups = groupKnowledge(items);
  const title = networkTopics.find((t) => t.id === topic)?.title ?? (topic || "The Complete Collection");
  return (
    <div
      className="knowledge-grouped-results"
      aria-label="Classified knowledge results"
      key={topic}
    >
      <Reveal>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">
              {topic ? "CONNECTED WORK / SELECTED DOMAIN" : "THE KNOWLEDGE COLLECTION"}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {items.length} resources · {groups.length} collections
          </p>
        </div>
      </Reveal>
      <nav aria-label="Resource collections" className="knowledge-collection-nav mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {groups.map((group) => {
          const Icon = icons[group.kind] ?? Layers;
          return (
            <Button
              key={group.id}
              variant="outline"
              size="sm"
              className="h-auto min-h-12 justify-start whitespace-normal rounded-md"
              onClick={() => scrollToKnowledgeGroup(group.id)}
            >
              <Icon className="size-3.5" />
              {group.title}
              <span className="ml-auto font-mono text-xs text-stat-number">{group.items.length}</span>
            </Button>
          );
        })}
      </nav>
      <div className="space-y-12">
        {groups.map((group, index) => {
          const Icon = icons[group.kind] ?? Layers;
          return (
            <section
              key={group.id}
              id={`knowledge-${group.id}`}
              className="knowledge-result-group scroll-mt-24"
              aria-label={group.title}
            >
              <Reveal>
                <div className="mb-5 flex items-center gap-4 border-t border-border pt-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-expertise-node">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] uppercase text-muted-foreground">
                      Collection {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{group.title}</h3>
                  </div>
                  <span className="font-mono text-sm text-stat-number">{group.items.length}</span>
                  <ArrowDownRight className="size-4 text-muted-foreground" />
                </div>
              </Reveal>
              <KnowledgeCards items={group.items} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
