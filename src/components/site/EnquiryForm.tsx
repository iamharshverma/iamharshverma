import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enquirySchema } from "@/lib/enquiry-schema";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { STATIC_SITE, openMailto } from "@/lib/site-mode";

export function EnquiryForm({ booking = false }: { booking?: boolean }) {
  const [topic, setTopic] = useState("Keynote");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const submit = useServerFn(submitEnquiry);
  const input = "mt-2 w-full min-w-0 rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";
  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = enquirySchema.safeParse({ ...Object.fromEntries(form), topic, kind: booking ? "booking" : "contact" });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details."); return; }
    setError("");
    if (STATIC_SITE) {
      const d = parsed.data as Record<string, unknown>;
      openMailto(`${booking ? "Booking request" : "Enquiry"}: ${topic}`, Object.entries(d).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n"));
      window.__lovableEvents?.track?.("project.contact_submitted", { topic });
      return;
    }
    setPending(true);
    try {
      const result = await submit({ data: parsed.data });
      setReference(result.id);
      window.__lovableEvents?.track?.("project.contact_submitted", { topic });
    } catch { setError("Your request wasn't saved. Please try again or email Harsh directly."); }
    finally { setPending(false); }
  }
  if (reference) return <div className="py-12" role="status"><CheckCircle2 className="size-10 text-brand" /><h2 className="mt-4 font-display text-3xl">Request received</h2><p className="mt-3 text-muted-foreground">{booking ? "Your preferred date and brief have been saved. This is a booking request, not a confirmed engagement." : "Your enquiry has been saved."}</p><p className="mt-4 font-mono text-xs text-muted-foreground">Reference: {reference.slice(0, 8)}</p><Button variant="outline" className="mt-6" onClick={() => setReference("")}>Send another request</Button></div>;
  return <form onSubmit={send} className="space-y-6">
    <div className="flex flex-wrap gap-2" role="group" aria-label="Enquiry type">{(booking ? ["Keynote", "Advisory"] : ["Keynote", "Advisory", "Media", "Other"]).map(t => <Button key={t} type="button" variant={topic === t ? "default" : "outline"} aria-pressed={topic === t} onClick={() => setTopic(t)}>{t}</Button>)}</div>
    {!booking && (topic === "Keynote" || topic === "Advisory") && <Button asChild variant="outline" className="h-auto w-full whitespace-normal py-3"><Link to="/booking"><CalendarDays />Request a keynote or advisory booking</Link></Button>}
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="min-w-0 text-sm">Your name<input name="name" autoComplete="name" required maxLength={100} className={input} /></label>
      <label className="min-w-0 text-sm">Email<input name="email" type="email" autoComplete="email" required maxLength={255} className={input} /></label>
    </div>
    <label className="block text-sm">Organization<input name="organization" autoComplete="organization" maxLength={200} className={input} /></label>
    {booking && <div className="grid gap-5 sm:grid-cols-2">
      <label className="min-w-0 text-sm">Preferred date <span className="text-muted-foreground">(optional)</span><input name="preferred_date" type="date" className={input} /></label>
      <label className="min-w-0 text-sm">Format<select name="format" className={input}><option>Virtual</option><option>In person</option><option>Hybrid</option></select></label>
      <label className="min-w-0 text-sm sm:col-span-2">Location / time zone<input name="location" maxLength={200} className={input} /></label>
    </div>}
    <label className="block text-sm">{booking ? (topic === "Keynote" ? "Event, audience & speaking brief" : "Advisory role, goals & scope") : "Your message"}<textarea name="message" required maxLength={3000} rows={5} className={input} /></label>
    <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <Button disabled={pending} className="h-12 w-full"><Send />{pending ? "Saving request…" : booking ? "Send booking request" : "Send enquiry"}</Button>
    {booking && <p className="text-xs text-muted-foreground">Availability and engagement details require confirmation from Harsh.</p>}
  </form>;
}