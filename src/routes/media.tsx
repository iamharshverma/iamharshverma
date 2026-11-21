import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Download, Mic2, Search, SlidersHorizontal } from "lucide-react";
import { canonical, SITE_URL } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Reveal, PageHero, Counter } from "@/components/site/Reveal";
import { LogoTile } from "@/components/site/Interactive";
import { MediaCoverageCard } from "@/components/site/MediaCoverageCard";
import { MediaInquiry } from "@/components/site/MediaInquiry";
import { MediaSpotlight } from "@/components/site/MediaSpotlight";
import { mediaCategories, mediaCoverage, mediaImpact, mediaYears, filterCoverage, MEDIA_ARCHIVE_PAGE_SIZE, type MediaCategory } from "@/data/media-center";
import { pressLogos } from "@/data/collaborate";
import { mediaKit } from "@/data/press-kit";

const title = "Harsh Verma | Media, Press, Interviews & Podcasts";
const description = "Explore media coverage, interviews, podcasts and expert commentary featuring Harsh Verma on enterprise AI, cybersecurity and agentic systems.";
export const Route = createFileRoute("/media")({
  head: () => ({
    links: canonical("/media").links,
    meta: [canonical("/media").url, { title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": `${SITE_URL}/media#collection`, url: `${SITE_URL}/media`, name: title, description, about: { "@id": `${SITE_URL}/#person` }, isPartOf: { "@id": `${SITE_URL}/#website` } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }, { "@type": "ListItem", position: 2, name: "Media", item: `${SITE_URL}/media` }] },
    ] }) }],
  }), component: MediaPage,
});

const sections: { id: string; title: string; short: string; category: MediaCategory; description: string }[] = [
  { id: "commentary", title: "Articles & Expert Commentary", short: "Articles", category: "Editorial & Commentary", description: "Explore published perspectives, technical commentary and conversations on the evolving landscape of artificial intelligence, cybersecurity and autonomous systems." },
  { id: "conversations", title: "Interviews, Podcasts & Conversations", short: "Interviews", category: "Interviews & Podcasts", description: "Conversations, interviews and podcasts exploring AI engineering, cybersecurity, agentic systems and the future of intelligent technologies." },
  { id: "on-screen", title: "Video, Broadcast & On-Screen Features", short: "Video", category: "Video & Broadcast", description: "Selected video appearances, recorded interviews and other visual features." },
  { id: "institutions", title: "Institutional & Professional Features", short: "Institutions", category: "Institutional Features", description: "Professional profiles, institutional mentions and features from technology communities and professional organizations." },
  { id: "announcements", title: "Press Releases & Syndicated Coverage", short: "Press releases", category: "Press Releases & Syndicated", description: "Professional announcements and updates distributed through newswire and media distribution platforms." },
  { id: "recognition-coverage", title: "Recognition-Related Media", short: "Recognition", category: "Recognition Coverage", description: "External features, award announcements and nomination coverage. Primary awards and honors remain in Recognition." },
  { id: "others-recognized", title: "Others Recognized", short: "Others", category: "Others Recognized", description: "Additional public features and mentions that fall outside the categories above." },
];

function MediaPage() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [sort, setSort] = useState("newest");
  const [visible, setVisible] = useState(MEDIA_ARCHIVE_PAGE_SIZE);
  const [inquiry, setInquiry] = useState(false);
  const list = useMemo(() => filterCoverage(mediaCoverage, { query, category, year, topic, sort }), [query, category, year, topic, sort]);
  const topics = useMemo(() => [...new Set(mediaCoverage.map(item => item.topic))].sort(), []);
  useEffect(() => { setVisible(MEDIA_ARCHIVE_PAGE_SIZE); }, [query, category, year, topic, sort]);
  useEffect(() => {
    if (query.trim().length < 2) return;
    const timer = setTimeout(() => window.__lovableEvents?.track?.("project.media_searched", { group: category || "All", result_count: list.length }), 1000);
    return () => clearTimeout(timer);
  }, [query, category, list.length]);
  function openArchive(value: string) {
    setCategory(value); setQuery(""); setYear(""); setTopic(""); setVisible(MEDIA_ARCHIVE_PAGE_SIZE);
    document.getElementById("media-archive")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const select = "mt-2 h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return <>
    <PageHero eyebrow="// press · podcasts · broadcast" title={<>In the <span className="text-brand-gradient">Headlines.</span></>} subtitle="Media, Press & Interviews"
      intro="International press, executive podcasts, Times Square NYC broadcasts and technical interviews shaping the conversation on enterprise AI and cybersecurity." />
    <div className="mx-auto -mt-6 flex max-w-6xl flex-wrap gap-3 px-6 pb-8"><Button asChild><Link to="/media-kit"><Download />Media kit</Link></Button><Button asChild variant="outline"><Link to="/press-kit">Press kit</Link></Button></div>
    <section className="border-b border-border bg-card/40" aria-label="Media impact">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">{mediaImpact.map((s, i) => <div key={s.l} className={`px-6 py-8 ${i ? "md:border-l" : ""} border-border`}><p className="font-display text-4xl font-bold text-stat-number md:text-5xl"><Counter to={s.v} suffix={s.s} decimals={s.d} /></p><p className="mt-1 text-sm text-stat-label">{s.l}</p></div>)}</div>
    </section>
    <nav aria-label="Media sections" className="border-b border-border"><div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4"><Button asChild size="sm" variant="ghost"><a href="#featured">Featured</a></Button>{sections.map(section => <Button asChild key={section.id} size="sm" variant="ghost"><a href={`#${section.id}`}>{section.short}</a></Button>)}<Button asChild size="sm" variant="outline"><a href="#media-archive">Full archive<ArrowDown /></a></Button></div></nav>
    <section className="py-10" aria-label="Publication platforms"><p className="eyebrow text-center">As seen on</p><div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"><div className="flex w-max animate-marquee gap-4">{[...pressLogos, ...pressLogos].map((b, i) => <LogoTile key={i} src={b.logo} name={b.name} />)}</div></div></section>
    <MediaSpotlight />
    {sections.map((section, index) => {
      const selected = mediaCoverage.filter(item => item.category === section.category);
      if (!selected.length) return null;
      return <section id={section.id} key={section.id} className={`scroll-mt-28 border-b border-border py-14 md:py-20 ${index === 1 ? "bg-card/40" : ""}`}><div className="mx-auto max-w-6xl px-6"><Reveal><div className="flex flex-wrap items-end justify-between gap-5"><div className="min-w-0"><p className="eyebrow">0{index + 2} / {section.short}</p><h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{section.title}</h2></div><Button size="sm" variant="outline" onClick={() => openArchive(section.category)}>Explore all<ArrowDown /></Button></div><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{section.description}</p>{section.id === "institutions" && <p className="mt-3 text-xs text-muted-foreground">Profiles and listings describe professional relationships, not institutional endorsements.</p>}{section.id === "announcements" && <p className="mt-3 text-xs text-muted-foreground">Newswire distributions are announcements, not independent editorial reporting.</p>}</Reveal><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{selected.map(item => <MediaCoverageCard key={item.id} item={item} />)}</div>{!selected.length && <p className="mt-6 text-muted-foreground">No verified appearances are available in this category.</p>}{section.id === "recognition-coverage" && <Button asChild variant="link" className="mt-6 h-auto max-w-full whitespace-normal p-0 text-left"><Link to="/recognition">Explore Awards & Professional Recognition<ArrowUpRight /></Link></Button>}</div></section>;
    })}
    <section id="media-archive" className="scroll-mt-28 py-16 md:py-20"><div className="mx-auto max-w-6xl px-6"><Reveal><p className="eyebrow">The complete archive</p><h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Explore All Media Coverage</h2></Reveal>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Coverage category"><Button size="sm" variant={!category ? "default" : "outline"} aria-pressed={!category} onClick={() => setCategory("")}>All</Button>{mediaCategories.map(value => <Button key={value} size="sm" variant={category === value ? "default" : "outline"} aria-pressed={category === value} className="h-auto whitespace-normal py-2" onClick={() => setCategory(value)}>{value}</Button>)}</div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1fr]"><label className="min-w-0 text-xs text-muted-foreground">Search coverage<div className="relative"><Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Headline, publisher or topic…" className={`${select} pl-10`} /></div></label><label className="min-w-0 text-xs text-muted-foreground">Year<select value={year} onChange={event => setYear(event.target.value)} className={select}><option value="">All years</option>{mediaYears.map(value => <option key={value}>{value}</option>)}</select></label><label className="min-w-0 text-xs text-muted-foreground">Topic<select value={topic} onChange={event => setTopic(event.target.value)} className={select}><option value="">All topics</option>{topics.map(value => <option key={value}>{value}</option>)}</select></label><label className="min-w-0 text-xs text-muted-foreground">Sort<select value={sort} onChange={event => setSort(event.target.value)} className={select}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="title">Title A–Z</option></select></label></div>
      <div className="mt-5 flex items-center justify-between gap-3"><p role="status" className="font-mono text-xs text-muted-foreground">Showing {Math.min(visible, list.length)} of {list.length} records</p>{(query || category || year || topic || sort !== "newest") && <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setCategory(""); setYear(""); setTopic(""); setSort("newest"); }}><SlidersHorizontal />Reset filters</Button>}</div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.slice(0, visible).map(item => <MediaCoverageCard key={item.id} item={item} />)}</div>
      {!list.length && <p className="py-12 text-center text-muted-foreground">No coverage matches these filters.</p>}{visible < list.length && <div className="mt-8 text-center"><Button variant="outline" onClick={() => setVisible(list.length)}>Explore More<ArrowDown /></Button></div>}
    </div></section>
    <section id="interview-enquiry" className="scroll-mt-28 border-y border-border bg-card/40 py-16"><div className="mx-auto max-w-6xl px-6"><Reveal><p className="eyebrow">Press resources & enquiries</p><h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Working on a Story About AI?</h2><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Looking for an expert perspective on agentic AI, enterprise cybersecurity, autonomous systems or the future of AI engineering? Get in touch to discuss interviews, expert commentary and media opportunities.</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild size="sm"><a href={mediaKit.pdf} download="harsh-verma-media-kit.pdf"><Download />Download Media Kit</a></Button><Button asChild variant="outline" size="sm"><Link to="/press-kit">Access Press Kit<ArrowUpRight /></Link></Button><Button variant="outline" size="sm" aria-expanded={inquiry} aria-controls="media-interview-form" onClick={() => setInquiry(value => !value)}><Mic2 />{inquiry ? "Close interview form" : "Request an Interview"}</Button></div></Reveal>{inquiry && <div id="media-interview-form" className="mt-10 max-w-3xl border-t border-border pt-8"><h3 className="mb-6 font-display text-2xl font-semibold">Your interview brief</h3><MediaInquiry /></div>}</div></section>
  </>;
}
