import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { interviewFormats, mediaEnquirySchema } from "@/lib/media-enquiry";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { STATIC_SITE, openMailto } from "@/lib/site-mode";

export function MediaInquiry() {
  const submit = useServerFn(submitEnquiry);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [draft, setDraft] = useState(false);
  const input = "mt-2 w-full min-w-0 rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = mediaEnquirySchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details."); return; }
    setError("");
    if (STATIC_SITE) {
      openMailto("Media interview request", `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPublication: ${parsed.data.organization}\nDeadline: ${parsed.data.preferred_date || "Not specified"}\n\n${parsed.data.message}`);
      setDraft(true); return;
    }
    setPending(true);
    try { const result = await submit({ data: parsed.data }); setReference(result.id); }
    catch { setError("Your request wasn't saved. Please try again or contact Harsh by email."); }
    finally { setPending(false); }
  }
  if (reference) return <div role="status" className="py-8"><CheckCircle2 className="size-8 text-brand" /><h3 className="mt-4 font-display text-2xl">Interview request received</h3><p className="mt-3 text-muted-foreground">Your brief has been saved. The interview and timing still require confirmation.</p><p className="mt-4 font-mono text-xs">Reference: {reference.slice(0, 8)}</p><Button className="mt-6" variant="outline" onClick={() => setReference("")}>Send another request</Button></div>;
  return <form onSubmit={send} className="grid min-w-0 gap-5 sm:grid-cols-2" aria-label="Media interview request">
    <label className="min-w-0 text-sm">Journalist or host name<input className={input} name="name" required maxLength={100} autoComplete="name" /></label>
    <label className="min-w-0 text-sm">Professional email<input className={input} name="email" required type="email" maxLength={255} autoComplete="email" /></label>
    <label className="min-w-0 text-sm">Publication or organization<input className={input} name="organization" required maxLength={200} autoComplete="organization" /></label>
    <label className="min-w-0 text-sm">Publication website (optional)<input className={input} name="publication_url" type="url" maxLength={500} placeholder="https://" /></label>
    <label className="min-w-0 text-sm sm:col-span-2">Proposed interview topic<input className={input} name="interview_topic" required maxLength={200} /></label>
    <label className="min-w-0 text-sm">Interview format<select className={input} name="interview_format">{interviewFormats.map(format => <option key={format}>{format}</option>)}</select></label>
    <label className="min-w-0 text-sm">Proposed date or deadline (optional)<input className={input} name="preferred_date" type="date" /></label>
    <label className="min-w-0 text-sm sm:col-span-2">Additional context<textarea className={input} name="message" maxLength={2000} rows={4} /></label>
    <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
    {error && <p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>}
    {draft && <p role="status" className="text-sm text-muted-foreground sm:col-span-2">An email draft was opened. Your request is not received until you send that email.</p>}
    <Button className="h-11 sm:col-span-2" disabled={pending}><Send />{pending ? "Saving request…" : STATIC_SITE ? "Open interview email draft" : "Send interview request"}</Button>
    <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">Your details are used only to review and respond to this enquiry. Do not include confidential information. Contact Harsh to request deletion.{STATIC_SITE && " This site opens an email draft; it does not save or send your request."}</p>
  </form>;
}