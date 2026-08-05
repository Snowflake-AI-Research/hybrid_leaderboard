import { motion, useReducedMotion } from "motion/react";
import { BookOpenText, ShieldCheck } from "@phosphor-icons/react";
import { Reveal } from "./primitives";

export default function DatasetSummary() {
  const reduce = useReducedMotion();

  return (
    <div className="grid items-stretch gap-4 md:grid-cols-5">
      {/* Public — open, quiet */}
      <Reveal className="h-full md:col-span-2">
        <div className="flex h-full flex-col rounded-[var(--radius)] border border-line bg-surface p-7 shadow-lift">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2">
            <BookOpenText size={22} weight="fill" className="text-ice-deep" />
          </div>
          <h3 className="font-display mt-5 text-xl font-semibold tracking-tight text-ink">
            The public set
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
            An openly available subset that runs against a local SQLite database
            for development and iteration. Inspect the task format, debug your
            agents and reproduce the evaluation locally.
          </p>
          <div className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-wider text-faint">
            Local SQLite · for development
          </div>
        </div>
      </Reveal>

      {/* Private — the official benchmark, with a shimmer sweep */}
      <Reveal delay={0.08} className="h-full md:col-span-3">
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-ice-bright/30 p-7 shadow-slab"
          style={{
            background:
              "linear-gradient(150deg, #eaf7fe 0%, #f7fcff 45%, #ffffff 100%)",
          }}
        >
          {/* moving light sweep */}
          {!reduce ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
              style={{
                background:
                  "linear-gradient(105deg, transparent, rgba(255,255,255,0.85), rgba(125,214,255,0.35), transparent)",
                filter: "blur(6px)",
              }}
              animate={{ left: ["-33%", "130%"] }}
              transition={{
                duration: 3.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2.4,
              }}
            />
          ) : null}

          <div className="relative flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lift">
              <ShieldCheck size={22} weight="fill" className="text-ice-deep" />
            </div>
            <span className="rounded-full border border-ice-bright/40 bg-white/70 px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-ice-deep backdrop-blur">
              Official benchmark
            </span>
          </div>

          <h3 className="font-display relative mt-5 text-xl font-semibold tracking-tight text-ink">
            The private set
          </h3>
          <p className="relative mt-2 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
            A held-out set that runs on an enterprise cloud Snowflake database
            and is never released. Keeping it private prevents contamination and
            overfitting, so leaderboard scores stay meaningful. Systems are
            scored on it through an official evaluation on request.
          </p>
          <div className="relative mt-auto pt-5 font-mono text-[11px] uppercase tracking-wider text-ice-deep">
            Cloud Snowflake · contamination-free
          </div>
        </div>
      </Reveal>
    </div>
  );
}
