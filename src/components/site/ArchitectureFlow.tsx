import { ArrowDown, ArrowRight } from "lucide-react";
export function ArchitectureFlow({ steps, caption }: { steps: string[]; caption: string }) {
  return (
    <figure className="my-8 border-y border-border py-8">
      <ol className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        {steps.map((step, index) => (
          <li key={step} className="flex min-w-0 flex-1 flex-col items-center gap-3 md:flex-row">
            <span className="flex w-full min-w-0 flex-col gap-2 rounded-md border border-brand/30 bg-card p-4 text-sm">
              <span className="font-mono text-xs text-stat-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
            {index < steps.length - 1 && (
              <>
                <ArrowRight aria-hidden className="hidden size-4 shrink-0 text-brand md:block" />
                <ArrowDown aria-hidden className="size-4 shrink-0 text-brand md:hidden" />
              </>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-sm text-muted-foreground">
        {caption} Flow: {steps.join(" → ")}.
      </figcaption>
    </figure>
  );
}
