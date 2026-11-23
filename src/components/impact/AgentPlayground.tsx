import { useEffect, useMemo, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  ShieldCheck,
  ArrowRight,
  Check,
  Ban,
  Clock,
  Activity,
} from "lucide-react";
import { ArchitectureCanvas } from "./ArchitectureCanvas";
import { Button } from "@/components/ui/button";
import {
  architectureComponents,
  defaultParameters,
  scenarios,
  simulateScenario,
  type ScenarioId,
  type SimulationParameters,
} from "@/lib/impact-simulation";
import { simulationSettings, type ImpactSearch } from "@/lib/impact-search";

export default function AgentPlayground({
  topic,
  onRadar,
  settings,
  onSettings,
}: {
  topic: string;
  onRadar: () => void;
  settings: ImpactSearch;
  onSettings: (patch: Partial<ImpactSearch>) => void;
}) {
  const scenario =
    settings.scenario ??
    (topic === "defense" ? "defense" : topic === "security" ? "injection" : "research");
  const params = useMemo(() => simulationSettings(settings), [settings]);
  const [cursor, setCursor] = useState(0);
  const [running, setRunning] = useState(false);
  const [component, setComponent] = useState("policy");
  const [speed, setSpeed] = useState(1);
  const [baseline, setBaseline] = useState<{ title: string; allowed: number; blocked: number; approval: number } | null>(null);
  const [inspected, setInspected] = useState<number | null>(null);
  const events = useMemo(() => simulateScenario(scenario, params), [scenario, params]);
  const current = cursor ? events[cursor - 1] : undefined;
  const inspectedEvent = inspected === null ? current : events[inspected];
  const visited = useMemo(() => events.slice(0, cursor).map(event => event.component), [events, cursor]);
  const selected = architectureComponents.find((c) => c.id === component);
  useEffect(() => {
    setRunning(false);
    setCursor(0);
    setInspected(null);
  }, [
    scenario,
    params.permission,
    params.trust,
    params.injection,
    params.requireApproval,
    params.approved,
    params.risk,
  ]);
  useEffect(() => {
    if (!running) return;
    const pauseHidden = () => { if (document.hidden) setRunning(false); };
    document.addEventListener("visibilitychange", pauseHidden);
    return () => document.removeEventListener("visibilitychange", pauseHidden);
  }, [running]);
  useEffect(() => {
    if (!running) return;
    if (cursor >= events.length) {
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(() => setCursor((c) => c + 1), 1050 / speed);
    return () => window.clearTimeout(timer);
  }, [running, cursor, events.length, speed]);
  const change = <K extends keyof SimulationParameters>(key: K, value: SimulationParameters[K]) => {
    onSettings({ [key]: value });
    setRunning(false);
    setCursor(0);
    setInspected(null);
  };
  const chooseScenario = (id: ScenarioId) => {
    setRunning(false);
    setCursor(0);
    setInspected(null);
    const next = scenarios.find((s) => s.id === id);
    onSettings({ scenario: id, ...defaultParameters, topic: next?.topic ?? topic });
  };
  const complete = cursor === events.length;
  return (
    <div className="impact-lab p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="impact-kicker">03 / Experimentation</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
            Inside the Agentic System.
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 font-mono text-[10px] text-muted-foreground">
          <ShieldCheck className="size-4" />
          ILLUSTRATIVE · BROWSER-LOCAL
        </span>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label>
          <span className="sr-only">Simulation scenario</span>
          <select
            className="impact-input"
            aria-label="Simulation scenario"
            value={scenario}
            onChange={(e) => chooseScenario(e.target.value as ScenarioId)}
          >
            {scenarios.map((s, i) => (
              <option key={s.id} value={s.id}>
                {String.fromCharCode(65 + i)} / {s.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              if (complete) setCursor(0);
              setRunning((r) => !r);
            }}
            aria-label={
              running
                ? "Pause simulation"
                : cursor > 0 && !complete
                  ? "Resume simulation"
                  : "Start simulation"
            }
          >
            {running ? <Pause /> : <Play />}
            {running ? "Pause" : cursor > 0 && !complete ? "Resume" : "Run"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={complete}
            onClick={() => {
              setRunning(false);
              setCursor((c) => Math.min(c + 1, events.length));
            }}
          >
            <SkipForward />
            Step
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            title="Reset simulation"
            aria-label="Reset simulation"
            onClick={() => {
              setRunning(false);
              setCursor(0);
              setInspected(null);
            }}
          >
            <RotateCcw />
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-y border-border py-3">
        <span role="status" className="impact-run-status font-mono text-xs">{complete ? "TRACE COMPLETE" : running ? "EXECUTING" : cursor ? "PAUSED" : "READY"} · {cursor}/{events.length}</span>
        <label className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">Playback speed<select aria-label="Playback speed" className="impact-input w-20" value={speed} onChange={event => setSpeed(Number(event.target.value))}><option value={0.5}>0.5×</option><option value={1}>1×</option><option value={2}>2×</option></select></label>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {scenarios.find((s) => s.id === scenario)?.task}
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="impact-lab-stage min-w-0">
          <ArchitectureCanvas selected={component} active={current?.component ?? ""} visited={visited} running={running} onSelect={setComponent} />
          <div className="grid grid-cols-2 gap-2 sm:hidden" aria-label="Architecture components">
            {architectureComponents.map((c) => (
              <Button
                key={c.id}
                size="sm"
                variant={component === c.id ? "secondary" : "outline"}
                className="h-auto min-h-12 whitespace-normal"
                onClick={() => setComponent(c.id)}
              >
                {c.title}
                {current?.component === c.id && <Activity />}
              </Button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-px w-6 bg-brand" />
              Data / control flow
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 border-t border-dashed border-destructive" />
              Approval / trust boundary
            </span>
          </div>
          <div className="mt-5 border-t border-border pt-4" aria-live="polite">
            <p className="flex items-center gap-2 font-display font-semibold">
              <Activity className="size-4 text-brand" />
              {cursor ? current?.title : "Ready to execute"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {cursor
                ? current?.detail
                : "Scoped agents, explicit permissions, independent outcome checks."}
            </p>
            <label className="mt-4 block text-xs text-muted-foreground">Trace position<input aria-label="Trace position" type="range" min={0} max={events.length} value={cursor} className="mt-2 w-full accent-primary" onChange={event => { setRunning(false); setInspected(null); setCursor(Number(event.target.value)); }} /></label>
            <progress
              className="impact-progress mt-4 w-full"
              max={events.length}
              value={cursor}
              aria-label="Simulation progress"
            />
          </div>
        </div>
        <div className="impact-lab-controls min-w-0">
          <h3 className="font-display text-xl font-semibold">Change the Outcome</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Lab values only. Changes reset execution; no real security assessment or external action
            occurs.
          </p>
          <div className="mt-5 space-y-4">
            <label className="flex items-center justify-between gap-4 text-sm">
              Required tool permission
              <input
                type="checkbox"
                checked={params.permission}
                onChange={(e) => change("permission", e.target.checked)}
                className="size-4 accent-primary"
              />
            </label>
            <label className="block text-sm">
              Illustrative trust{" "}
              <span className="float-right font-mono text-stat-number">{params.trust}/100</span>
              <input
                aria-label="Illustrative trust"
                type="range"
                min="0"
                max="100"
                step="10"
                value={params.trust}
                onChange={(e) => change("trust", Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </label>
            {scenario === "injection" && (
              <label className="flex items-center justify-between gap-4 text-sm">
                Untrusted instruction
                <input
                  type="checkbox"
                  checked={params.injection}
                  onChange={(e) => change("injection", e.target.checked)}
                  className="size-4 accent-primary"
                />
              </label>
            )}
            <label className="block text-sm">
              Action risk
              <select
                className="impact-input mt-2"
                aria-label="Action risk"
                value={params.risk}
                onChange={(e) => change("risk", e.target.value === "high" ? "high" : "low")}
              >
                <option value="low">Low · reversible / read-only</option>
                <option value="high">High · action-bound approval</option>
              </select>
            </label>
            <label className="flex items-center justify-between gap-4 text-sm">
              Require human approval
              <input
                type="checkbox"
                checked={params.requireApproval}
                onChange={(e) => change("requireApproval", e.target.checked)}
                className="size-4 accent-primary"
              />
            </label>
            <label className="flex items-center justify-between gap-4 text-sm">
              Grant exact-action approval
              <input
                type="checkbox"
                checked={params.approved}
                onChange={(e) => change("approved", e.target.checked)}
                className="size-4 accent-primary"
              />
            </label>
          </div>
          {selected && (
            <div className="mt-7 border-t border-border pt-5">
              <p className="impact-kicker">Component inspector</p>
              <h4 className="mt-2 font-display font-semibold">{selected.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selected.purpose}
              </p>
              <dl className="mt-4 space-y-3 text-xs">
                {[
                  ["Input", selected.input],
                  ["Output", selected.output],
                  ["Failure condition", selected.failure],
                  ["Security", selected.security],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-semibold">{label}</dt>
                    <dd className="mt-1 leading-relaxed text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
      <div className="mt-7 border-t border-border pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">Execution evidence</h3>
          <span className="font-mono text-xs text-muted-foreground">
            {cursor} / {events.length} events ·{" "}
            {complete ? "FINISHED" : running ? "RUNNING" : "PAUSED"}
          </span>
        </div>
        <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <ol className="max-h-72 overflow-y-auto pr-2" aria-label="Execution timeline">
            {!cursor && <li className="py-6 text-sm text-muted-foreground">Awaiting the first event.</li>}
            {events.slice(0, cursor).map((event, i) => (
              <li key={i} className="border-b border-border">
                <Button
                  variant="ghost"
                  className="h-auto min-h-11 w-full justify-start whitespace-normal py-3 text-left"
                  aria-pressed={inspected === i}
                  onClick={() => {
                    setInspected(i);
                    setComponent(event.component);
                  }}
                >
                  <span className="font-mono text-xs text-stat-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {event.decision === "blocked" ? (
                    <Ban className="text-destructive" />
                  ) : event.decision === "approval" ? (
                    <Clock className="text-signal" />
                  ) : (
                    <Check className="text-brand" />
                  )}
                  <span className="flex-1 text-sm">{event.title}</span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">
                    {event.decision}
                  </span>
                </Button>
              </li>
            ))}
          </ol>
          <div className="impact-lab-inspector min-w-0">
            <p className="impact-kicker">Tool & decision inspector</p>
            <h4 className="mt-3 font-semibold">
              {cursor ? inspectedEvent?.title : "No action yet"}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {cursor
                ? inspectedEvent?.detail
                : "Execution evidence appears when the simulation advances."}
            </p>
            {cursor > 0 && inspectedEvent?.tool && (
              <code className="mt-4 block break-words rounded-xl bg-muted p-3 text-xs">
                {inspectedEvent.tool}
              </code>
            )}
          </div>
        </div>
      </div>
      {complete && <div className="impact-outcome mt-6 border-y border-border py-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-xl font-semibold">{current?.title}</h3><Button variant="outline" size="sm" onClick={() => setBaseline({ title: scenarios.find(s => s.id === scenario)?.title ?? scenario, allowed: events.filter(e => e.decision === "allowed").length, blocked: events.filter(e => e.decision === "blocked").length, approval: events.filter(e => e.decision === "approval").length })}><Check />Pin this outcome</Button></div>
        <div className="mt-4 grid grid-cols-3 gap-3">{(["allowed", "blocked", "approval"] as const).map(decision => <div key={decision}><span className="font-mono text-2xl text-stat-number">{events.filter(event => event.decision === decision).length}</span><span className="ml-2 text-xs capitalize text-muted-foreground">{decision} events</span></div>)}</div>
      </div>}
      {baseline && <div className="mt-5 border-l-2 border-brand pl-4"><div className="flex items-center justify-between gap-2"><p className="impact-kicker">Pinned trace / {baseline.title}</p><Button variant="ghost" size="sm" onClick={() => setBaseline(null)}>Clear</Button></div><p className="mt-2 text-sm text-muted-foreground">{baseline.allowed} allowed · {baseline.blocked} blocked · {baseline.approval} approval events</p></div>}
      <Button variant="outline" size="sm" className="mt-7" onClick={onRadar}>
        Locate this idea on the radar
        <ArrowRight />
      </Button>
    </div>
  );
}
