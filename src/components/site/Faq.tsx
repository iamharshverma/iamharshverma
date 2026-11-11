import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-20" aria-labelledby="faq-title">
      <p className="eyebrow">// frequently asked</p>
      <h2 id="faq-title" className="mt-3 font-display text-3xl md:text-4xl">About Harsh's work</h2>
      <div className="mt-8 divide-y divide-border border-y border-border">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <h3>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg">
                {f.q}
                <Plus className={`size-5 shrink-0 text-brand transition ${open === i ? "rotate-45" : ""}`} />
              </button>
            </h3>
            <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
