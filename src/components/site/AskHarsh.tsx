import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessagesSquare, Minus, X } from "lucide-react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputBody, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const pageStarters: Record<string, string[]> = {
  "/books": ["What is the C.A.O. framework?", "What is the book AI vs. AI about?", "When do Harsh's books come out?"],
  "/speaking": ["Which keynotes has Harsh given on agentic security?", "What topics can Harsh speak on?", "How do I book Harsh for a keynote?"],
  "/research": ["What are Harsh's main research areas?", "How many patents does Harsh hold?"],
  "/insights": ["Summarize Harsh's latest Forbes articles.", "What does Harsh say about the real AI moat?"],
  "/media": ["Where has Harsh been featured in the press?", "Which podcasts has Harsh appeared on?"],
};
const starters = [
  "What does Harsh work on at Palo Alto Networks?",
  "Which keynotes has Harsh given on agentic security?",
  "Tell me about the book Beyond AI Engineering.",
  "How can I book Harsh for advisory or a keynote?",
];

function errorText(err: Error) {
  const m = err.message || "";
  if (m.includes("429")) return "The assistant is busy right now. Please try again in a moment.";
  if (m.includes("402")) return "The assistant is temporarily unavailable. Please email Harsh directly.";
  return "Something went wrong reaching the assistant. Please try again.";
}

export function AskHarsh() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(sessionStorage.getItem("harsh-assistant-hidden") === "true");
    const restore = () => { setHidden(false); setOpen(true); sessionStorage.removeItem("harsh-assistant-hidden"); };
    window.addEventListener("open-harsh-assistant", restore);
    return () => window.removeEventListener("open-harsh-assistant", restore);
  }, []);
  const dismiss = () => { setOpen(false); setHidden(true); sessionStorage.setItem("harsh-assistant-hidden", "true"); };
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  if (hidden) return null;

  return (
    <>
      <Button onClick={() => setOpen(o => !o)} aria-label={open ? "Collapse assistant" : "Ask Harsh's AI"} title="Ask Harsh's AI" className="fixed right-4 bottom-4 z-[70] h-11 gap-2 rounded-full bg-brand-gradient px-2.5 text-primary-foreground shadow-glow">
        <img src={profile.portrait} alt="" className="size-7 rounded-full object-cover object-top" />
        {open ? <Minus /> : <MessagesSquare />}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="fixed right-4 bottom-20 z-[70] flex h-[min(520px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-glow">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b border-border px-3 py-2">
              <img src={profile.portrait} alt="" className="h-9 w-9 rounded-full object-cover object-top" />
              <div className="min-w-0">
                <p className="font-display font-semibold">Ask Harsh's AI</p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">Experience · research · talks · books</p>
              </div>
              <div className="flex shrink-0"><Button variant="ghost" size="icon" onClick={() => setOpen(false)} title="Collapse assistant" aria-label="Collapse assistant"><Minus /></Button><Button variant="ghost" size="icon" onClick={dismiss} title="Hide assistant for this visit" aria-label="Hide assistant"><X /></Button></div>
            </div>

            <Conversation className="flex-1">
              <ConversationContent>
                {messages.length === 0 ? (
                  <ConversationEmptyState title="Ask about Harsh's work" description="Answers come from his portfolio: career, research, articles, keynotes and books.">
                    <div className="mt-4 flex flex-col gap-2">
                      {(Object.entries(pageStarters).find(([k]) => typeof window !== "undefined" && window.location.pathname.startsWith(k))?.[1] ?? starters).map((s) => (
                        <Button variant="outline" key={s} onClick={() => send(s)} className="h-auto whitespace-normal px-3 py-2 text-left text-xs text-muted-foreground">{s}</Button>
                      ))}
                    </div>
                  </ConversationEmptyState>
                ) : (
                  messages.map((m) => (
                    <Message key={m.id} from={m.role}>
                      <MessageContent className="group-[.is-user]:bg-brand group-[.is-user]:text-primary-foreground">
                        {m.parts.map((p, i) => (p.type === "text" ? <MessageResponse key={i}>{p.text}</MessageResponse> : null))}
                        {m.role === "assistant" && m.parts.some((p) => p.type === "text" && /\b(book|booking|keynote|advis|hire|invite)/i.test(p.text)) && (
                          <a href="/booking" className="mt-2 inline-flex rounded-full bg-brand-gradient px-3 py-1 text-xs font-medium text-primary-foreground">Book Harsh →</a>
                        )}
                      </MessageContent>
                    </Message>
                  ))
                )}
                {status === "submitted" && <p className="animate-pulse font-mono text-xs text-muted-foreground">Thinking…</p>}
                {error && <p className="rounded-lg border border-destructive/40 px-3 py-2 text-sm text-destructive">{errorText(error)}</p>}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <div className="border-t border-border p-3">
              <PromptInput onSubmit={(msg) => send(msg.text)}>
                <PromptInputTextarea value={input} onChange={(e) => setInput(e.currentTarget.value)} placeholder="Ask about keynotes, patents, books…" />
                <PromptInputFooter className="justify-end">
                  <PromptInputSubmit status={status} onStop={stop} disabled={!busy && !input.trim()} />
                </PromptInputFooter>
              </PromptInput>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">AI-powered · may make mistakes · verify on the site</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
