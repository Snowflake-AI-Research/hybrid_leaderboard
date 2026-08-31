export type ScoreKey = "overall" | "sql2s" | "s2sql" | "parallel";

export type Scores = Record<ScoreKey, number>;

export type AgentType = "multi-agent" | "single-agent";

/** Metric aggregation over k runs: Avg@k (mean over k runs) vs Pass@k (solved if any of k runs is correct). */
export type MetricAgg = "avg" | "pass";

/** Dataset split: the open public set vs the held-out private/official set. */
export type SplitKey = "public" | "private";

/** Aggregation (avg/pass) → k as a string key (e.g. "1", "8") → per-task scores. */
export type MetricScores = Partial<Record<MetricAgg, Record<string, Scores>>>;

/** Scores keyed by split. A split may be absent when its results aren't published yet. */
export type SplitScores = Partial<Record<SplitKey, MetricScores>>;

export interface Entry {
  id: string;
  system: string;
  org: string;
  baseModel: string;
  agentType: AgentType;
  date: string;
  featured?: boolean;
  link?: string;
  /** Path to a team/org logo served from /public, e.g. "/logos/openai.svg". */
  logo?: string;
  scores: SplitScores;
}

export interface NewsItem {
  date: string;
  title: string;
  body?: string;
  link?: string;
  /** Optional multiple labeled links, rendered as small pills. */
  links?: { label: string; url: string }[];
}

export interface Meta {
  benchmark: string;
  tagline: string;
  description: string;
  isSampleData?: boolean;
  news?: NewsItem[];
}

export interface Board {
  name: string;
  /** Default column to sort by. */
  primaryMetric: ScoreKey;
  columns: ScoreKey[];
  /** Split shown first. */
  defaultSplit?: SplitKey;
  /** Aggregation shown first. */
  defaultAgg?: MetricAgg;
  /** k shown first. */
  defaultK?: number;
  /** k values offered in the toggle, e.g. [1, 8]. */
  kValues?: number[];
}

export interface Data {
  meta: Meta;
  boards: { main: Board };
  entries: Entry[];
}

export const COLUMN_LABEL: Record<ScoreKey, string> = {
  overall: "Overall",
  sql2s: "SQL2S",
  s2sql: "S2SQL",
  parallel: "Parallel",
};

export const AGG_LABEL: Record<MetricAgg, string> = {
  avg: "Avg",
  pass: "Pass",
};

/** Human label for a metric, e.g. metricLabel("avg", 8) === "Avg@8". */
export function metricLabel(agg: MetricAgg, k: number): string {
  return `${AGG_LABEL[agg]}@${k}`;
}

export const SPLIT_LABEL: Record<SplitKey, string> = {
  public: "Public",
  private: "Private",
};
