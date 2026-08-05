import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  CaretDown,
  CaretUp,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import {
  COLUMN_LABEL,
  METRIC_LABEL,
  SPLIT_LABEL,
  type AgentType,
  type Board,
  type Entry,
  type MetricKey,
  type ScoreKey,
  type SplitKey,
} from "../lib/types";
import OrgLogo from "./OrgLogo";

const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const SPLITS: SplitKey[] = ["public", "private"];
const METRICS: MetricKey[] = ["avg8", "pass8"];

type AgentFilter = "all" | AgentType;
const AGENT_FILTERS: { id: AgentFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "multi-agent", label: "Multi" },
  { id: "single-agent", label: "Single" },
];

function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="font-mono text-[10.5px] uppercase tracking-wider text-faint">
        {label}
      </span>
      <div className="inline-flex rounded-full border border-line-2 bg-surface p-0.5">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={
              "rounded-full px-3 py-1 text-[12.5px] font-medium transition-colors " +
              (value === o.id
                ? "bg-frost text-ice-deep"
                : "text-muted hover:text-ink")
            }
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScoreCell({ value, primary }: { value: number; primary?: boolean }) {
  return (
    <div className="flex items-center justify-end gap-3">
      <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-surface-2 sm:block">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.max(0, Math.min(100, value))}%`,
            background: primary
              ? "linear-gradient(90deg, var(--color-ice-deep), var(--color-ice-bright))"
              : "color-mix(in srgb, var(--color-ice-bright) 45%, #ffffff)",
          }}
        />
      </div>
      <span
        className={
          "w-11 text-right font-mono tabular " +
          (primary ? "font-semibold text-ink" : "text-muted")
        }
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function Leaderboard({
  entries,
  board,
}: {
  entries: Entry[];
  board: Board;
}) {
  const [sortKey, setSortKey] = useState<ScoreKey>(board.primaryMetric);
  const [sortDir, setSortDir] = useState<-1 | 1>(-1);
  const [query, setQuery] = useState("");
  const [split, setSplit] = useState<SplitKey>(board.defaultSplit ?? "public");
  const [agent, setAgent] = useState<AgentFilter>("all");
  const [metric, setMetric] = useState<MetricKey>(board.defaultMetric ?? "avg8");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => e.scores[split]?.[metric])
      .filter((e) => agent === "all" || e.agentType === agent)
      .filter(
        (e) =>
          !q ||
          `${e.system} ${e.org} ${e.baseModel}`.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const av = a.scores[split]![metric][sortKey];
        const bv = b.scores[split]![metric][sortKey];
        return (av - bv) * sortDir;
      });
  }, [entries, query, split, agent, metric, sortKey, sortDir]);

  function toggleSort(k: ScoreKey) {
    if (k === sortKey) setSortDir((d) => (d === -1 ? 1 : -1));
    else {
      setSortKey(k);
      setSortDir(-1);
    }
  }

  const colCount = 3 + board.columns.length;

  return (
    <div>
      {/* toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Segmented
            label="Split"
            value={split}
            onChange={setSplit}
            options={SPLITS.map((s) => ({ id: s, label: SPLIT_LABEL[s] }))}
          />
          <Segmented
            label="Agent"
            value={agent}
            onChange={setAgent}
            options={AGENT_FILTERS}
          />
          <Segmented
            label="Metric"
            value={metric}
            onChange={setMetric}
            options={METRICS.map((m) => ({ id: m, label: METRIC_LABEL[m] }))}
          />
        </div>
        <div className="relative">
          <MagnifyingGlass
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search system, org, model"
            className="w-64 max-w-[70vw] rounded-full border border-line-2 bg-surface py-2 pl-9 pr-3 text-[13.5px] text-ink outline-none transition-colors placeholder:text-faint focus:border-ice-bright"
          />
        </div>
      </div>

      {/* table */}
      <div className="shadow-lift overflow-x-auto rounded-[var(--radius)] border border-line bg-surface">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="bg-surface-2">
              <th className="w-14 px-4 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-wider text-faint">
                #
              </th>
              <th className="px-4 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-wider text-faint">
                System
              </th>
              <th className="hidden px-4 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-wider text-faint md:table-cell">
                Base model
              </th>
              {board.columns.map((k, i) => {
                const active = sortKey === k;
                return (
                  <th
                    key={k}
                    onClick={() => toggleSort(k)}
                    className={
                      "cursor-pointer select-none px-4 py-3.5 text-right font-mono text-[11px] font-medium uppercase tracking-wider transition-colors " +
                      (active ? "text-ice-deep" : "text-faint hover:text-ink")
                    }
                  >
                    <span className="inline-flex items-center gap-1">
                      {COLUMN_LABEL[k]}
                      {i === 0 && !active ? (
                        <span className="text-[9px] opacity-50">▼</span>
                      ) : null}
                      {active ? (
                        sortDir === -1 ? (
                          <CaretDown size={11} weight="bold" />
                        ) : (
                          <CaretUp size={11} weight="bold" />
                        )
                      ) : null}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={colCount}
                  className="px-4 py-14 text-center text-[14px] text-muted"
                >
                  {split === "private" ? (
                    <>
                      <span className="font-semibold text-ink">
                        Private results are not published yet.
                      </span>
                      <br />
                      The private split is held out and scored by the organizers —
                      check back after the next evaluation round.
                    </>
                  ) : (
                    "No systems match your search."
                  )}
                </td>
              </tr>
            ) : (
              rows.map((e, i) => {
                const s = e.scores[split]![metric];
                return (
                  <motion.tr
                    key={e.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-4%" }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i * 0.03, 0.3),
                      ease: EASE,
                    }}
                    className={
                      "group border-t border-line align-middle transition-colors " +
                      (e.featured
                        ? "bg-frost/70 hover:bg-frost"
                        : "hover:bg-surface-2/60")
                    }
                  >
                    <td className="px-4 py-3.5">
                      {i === 0 ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ice-bright font-mono text-[12px] font-bold tabular text-white">
                          1
                        </span>
                      ) : (
                        <span className="font-mono text-[13px] tabular text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <OrgLogo org={e.org} src={e.logo} size={30} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold tracking-tight text-ink">
                              {e.system}
                            </span>
                            {e.agentType === "multi-agent" ? (
                              <span className="rounded border border-ice-bright/40 bg-frost px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wide text-ice-deep">
                                multi
                              </span>
                            ) : null}
                            {e.link ? (
                              <a
                                href={e.link}
                                target="_blank"
                                rel="noopener"
                                aria-label={`Reference for ${e.system}`}
                                className="text-faint transition-colors hover:text-ice-deep"
                              >
                                <ArrowUpRight size={14} weight="bold" />
                              </a>
                            ) : null}
                          </div>
                          <div className="mt-0.5 text-[12px] text-faint">
                            {e.org}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3.5 font-mono text-[12.5px] text-muted md:table-cell">
                      {e.baseModel}
                    </td>
                    {board.columns.map((k, ci) => (
                      <td key={k} className="px-4 py-3.5">
                        <ScoreCell value={s[k]} primary={ci === 0} />
                      </td>
                    ))}
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3.5 font-mono text-[12px] text-faint">
        {rows.length} system{rows.length === 1 ? "" : "s"} · {SPLIT_LABEL[split]}{" "}
        split · {METRIC_LABEL[metric]}
        {agent !== "all" ? ` · ${agent}` : ""}
      </p>
    </div>
  );
}
