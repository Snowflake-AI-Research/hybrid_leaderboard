export type ScoreKey = "overall" | "sql2s" | "s2sql" | "parallel";

export type Scores = Record<ScoreKey, number>;

export type AgentType = "multi-agent" | "single-agent";

/** Reported metric: Pass@8 (solved if any of 8 runs is correct) vs Avg@8 (mean over 8 runs). */
export type MetricKey = "pass8" | "avg8";

/** Dataset split: the open public set vs the held-out private/official set. */
export type SplitKey = "public" | "private";

/** Both metrics' score sets for one split. */
export type MetricScores = Record<MetricKey, Scores>;

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
  /** Metric shown first. */
  defaultMetric?: MetricKey;
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

export const METRIC_LABEL: Record<MetricKey, string> = {
  pass8: "Pass@8",
  avg8: "Avg@8",
};

export const SPLIT_LABEL: Record<SplitKey, string> = {
  public: "Public",
  private: "Private",
};
