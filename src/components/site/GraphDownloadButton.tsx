import { useState } from "react";
import { Download, LoaderCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Capture the live graph in its theme; keep controls and inspectors out of the image. */
export function GraphDownloadButton({ getElement, filename, svg = false, prepare }: {
  getElement: () => HTMLElement | null;
  filename: string;
  svg?: boolean;
  prepare?: () => Promise<() => Promise<void>>;
}) {
  const [menu, setMenu] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState<{ blob: Blob; name: string } | null>(null);
  const save = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = name;
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };
  const capture = async (format: "png" | "svg") => {
    const element = getElement();
    if (!element || busy) return;
    setBusy(true); setMenu(false); setError("");
    let restore: (() => Promise<void>) | undefined;
    try {
      const { toBlob, toSvg } = await import("html-to-image");
      restore = await prepare?.();
      const computed = getComputedStyle(element);
      const tokens: Record<string, string> = {};
      for (const property of Array.from(computed)) {
        if (property.startsWith("--")) tokens[property] = computed.getPropertyValue(property);
      }
      const probe = document.createElement("span");
      probe.style.backgroundColor = "var(--background)";
      element.appendChild(probe);
      const backgroundColor = getComputedStyle(probe).backgroundColor;
      probe.remove();
      const options = {
        backgroundColor,
        style: tokens,
        pixelRatio: 2, skipFonts: true,
        filter: (node: HTMLElement) => !node.matches?.('[data-graph-export-ignore], .react-flow__panel, .kn-node-preview, .kn-entry-detail, .kn-stage-caption, .kn-stage-inventory, .kn-stage > .absolute'),
      };
      const blob = format === "png" ? await toBlob(element, options) : await (await fetch(await toSvg(element, options))).blob();
      if (!blob || !blob.size) throw new Error("Empty image");
      const name = `${filename}.${format}`;
      // A second synchronous tap preserves download activation on phone browsers.
      if (window.matchMedia("(pointer: coarse)").matches) setReady({ blob, name });
      else save(blob, name);
    } catch { setError("Couldn't save this graph. Try again."); }
    finally { await restore?.(); setBusy(false); }
  };
  return <div className="graph-download relative" data-graph-export-ignore>
    <Button variant="ghost" size="icon-sm" aria-label={ready ? "Save prepared graph" : "Download graph"} title={ready ? "Save prepared graph" : "Download graph"} disabled={busy}
      onClick={() => { if (ready) { save(ready.blob, ready.name); setReady(null); } else if (svg) setMenu(value => !value); else void capture("png"); }}>
      {busy ? <LoaderCircle className="animate-spin" /> : <Download />}
    </Button>
    {menu && <div className="graph-download-menu" role="group" aria-label="Graph download format">
      <Button variant="ghost" size="sm" onClick={() => void capture("png")}><Download />PNG image</Button>
      <Button variant="ghost" size="sm" onClick={() => void capture("svg")}><Download />SVG file</Button>
      <Button variant="ghost" size="icon-sm" aria-label="Close download menu" onClick={() => setMenu(false)}><X /></Button>
    </div>}
    {(error || ready) && <p className="graph-download-message" role="status">{error || "Ready — tap download to save."}</p>}
  </div>;
}