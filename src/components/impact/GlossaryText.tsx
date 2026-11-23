import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { radarGlossary } from "@/data/radar-glossary";

const aliases = radarGlossary.flatMap(term => term.aliases.map(alias => ({ alias, id: term.id }))).sort((a, b) => b.alias.length - a.alias.length);
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = new RegExp(`\\b(${aliases.map(item => escapeRegex(item.alias)).join("|")})\\b`, "gi");

/** Link only the first occurrence of a term within each passage. */
export function GlossaryText({ text }: { text: string }) {
  const used = new Set<string>();
  return <>{text.split(pattern).map((part, index) => {
    const term = aliases.find(item => item.alias.toLowerCase() === part.toLowerCase());
    if (!term || used.has(term.id)) return <Fragment key={index}>{part}</Fragment>;
    used.add(term.id);
    return <Link key={index} to="/glossary" hash={term.id} className="font-medium text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand" title={`Define ${part}`}>{part}</Link>;
  })}</>;
}