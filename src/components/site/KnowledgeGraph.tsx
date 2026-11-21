import { knowledgeTopics } from "@/data/knowledge";
export function KnowledgeGraph({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (topic: string) => void;
}) {
  const points: [number, number][] = [
    [160, 60],
    [410, 60],
    [580, 170],
    [410, 280],
    [160, 280],
    [20, 170],
  ];
  return (
    <figure className="py-6">
      <svg
        viewBox="-100 0 810 340"
        role="group"
        aria-label="Research topic network"
        className="mx-auto w-full max-w-3xl overflow-visible"
      >
        <circle cx="290" cy="170" r="48" fill="var(--card)" stroke="var(--brand)" />
        <text x="290" y="166" textAnchor="middle" fill="var(--foreground)" fontSize="14">
          Harsh Verma
        </text>
        <text x="290" y="187" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10">
          BODY OF WORK
        </text>
        {knowledgeTopics.map((topic, i) => {
          const p = points[i];
          if (!p) return null;
          const [x, y] = p;
          return (
            <g key={topic}>
              <line x1="290" y1="170" x2={x} y2={y} stroke="var(--border)" />
              <g
                role="button"
                aria-label={`Explore ${topic}`}
                aria-pressed={selected === topic}
                tabIndex={0}
                onClick={() => onSelect(topic)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(topic);
                  }
                }}
                className="cursor-pointer outline-none focus-visible:stroke-brand"
              >
                <rect
                  x={x - 93}
                  y={y - 25}
                  width="186"
                  height="50"
                  rx="6"
                  fill={selected === topic ? "var(--accent)" : "var(--card)"}
                  stroke={selected === topic ? "var(--brand)" : "var(--border)"}
                />
                <text x={x} y={y + 5} textAnchor="middle" fill="var(--foreground)" fontSize="13">
                  {topic}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-5 text-center text-xs text-muted-foreground">
        Topic relationships reflect the subjects of the listed work, not proof of institutional
        endorsement.
      </figcaption>
    </figure>
  );
}
