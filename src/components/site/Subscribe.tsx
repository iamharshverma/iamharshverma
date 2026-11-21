import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscribe, subscribeSchema, type LISTS } from "@/lib/subscribe.functions";
import { STATIC_SITE, openMailto } from "@/lib/site-mode";

export function Subscribe({ list, cta = "Subscribe", placeholder = "you@company.com" }: { list: (typeof LISTS)[number]; cta?: string; placeholder?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [err, setErr] = useState("");
  const [draftOpened, setDraftOpened] = useState(false);
  const [website, setWebsite] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr("");
    const parsed = subscribeSchema.safeParse({ email, list, website });
    if (!parsed.success) return setErr(parsed.error.issues[0]?.message ?? "Invalid email");
    if (STATIC_SITE) { openMailto(`Join list: ${list}`, `Please add ${email} to the ${list} list.`); setDraftOpened(true); window.__lovableEvents?.track?.("project.email_draft_opened", { kind: "signup", target: list }); return; }
    setState("busy");
    try {
      await subscribe({ data: parsed.data });
      setState("done");
      (window as unknown as { __lovableEvents?: { track: (n: string, p?: object) => void } }).__lovableEvents?.track("subscribe", { list });
    } catch (x) { setErr((x as Error).message); setState("idle"); }
  };
  if (state === "done") return <p className="flex items-center gap-2 text-sm text-brand"><Check className="h-4 w-4" />You're on the list. Thank you!</p>;
  return (
    <form onSubmit={submit} className="w-full">
      <div className="hidden" aria-hidden="true"><input name="website" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></div>
      <div className="flex w-full max-w-md gap-2">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={placeholder} aria-label="Email address"
          className="h-11 min-w-0 flex-1 rounded-full border border-border bg-background/60 px-4 text-sm outline-none focus:border-brand" />
        <Button type="submit" disabled={state === "busy"} className="h-11 rounded-full px-5">{state === "busy" ? <Loader2 className="animate-spin" /> : STATIC_SITE ? "Email" : cta}</Button>
      </div>
      {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
      {draftOpened && <p role="status" className="mt-2 text-xs text-muted-foreground">Send the opened email draft to request signup. Enrollment is not confirmed.</p>}
    </form>
  );
}
