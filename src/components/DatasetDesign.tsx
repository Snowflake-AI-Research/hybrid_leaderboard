import { Lock, Path, SealCheck, Stack, Target } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

function Tile({
  icon: I,
  title,
  children,
}: {
  icon: Icon;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex h-full flex-col rounded-[var(--radius)] border border-line bg-surface p-6 shadow-lift transition-all hover:-translate-y-0.5 hover:border-ice-bright/40"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-frost">
        <I size={20} weight="fill" className="text-ice-deep" />
      </div>
      <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-ink">
        {title}
      </h3>
      <div className="mt-2 text-[14px] leading-relaxed text-muted">
        {children}
      </div>
    </motion.div>
  );
}

export default function DatasetDesign() {
  return (
    <div className="space-y-4">
      {/* anchor: the defining property, as a wide banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="grid items-center gap-8 rounded-[var(--radius)] border border-ice-bright/30 p-7 shadow-lift md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:p-9"
        style={{
          background:
            "linear-gradient(150deg, var(--color-frost), #ffffff 55%)",
        }}
      >
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lift">
            <Lock size={22} weight="fill" className="text-ice-deep" />
          </div>
          <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight text-ink">
            The hybrid lock
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["SQL → search", "search → SQL", "parallel fusion"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-ice-bright/30 bg-white/70 px-2.5 py-1 font-mono text-[11px] text-ice-deep"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[15.5px] leading-relaxed text-muted">
          Every task is built so that neither SQL alone, text alone, nor model
          memory can solve it. The answer only emerges when structured and
          unstructured evidence are combined, cross-checked and validated. A
          task is kept only if both sides are genuinely necessary and the answer
          is unique and objectively gradable.
        </p>
      </motion.div>

      {/* even grid of the four supporting properties */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Tile icon={Path} title="Three task families">
          SQL → Search anchors on a database result, then verifies it in text.
          Search → SQL starts from web evidence, then grounds it in the
          database. Parallel fusion retrieves both sides and intersects them.
        </Tile>
        <Tile icon={Target} title="Diagnostic, not a flat score">
          Because each task needs a verifiable intersection, a failure pinpoints
          the handoff that broke: a dropped schema anchor, the salience trap, or
          a skipped cross-check.
        </Tile>
        <Tile icon={SealCheck} title="Objectively verifiable">
          Each task resolves to a unique, objectively gradable answer behind a
          strict evidence chain. Runs are graded end to end, with no partial
          credit.
        </Tile>
        <Tile icon={Stack} title="Rigorous construction">
          Start from a database-grounded seed entity, build nontrivial SQL
          constraints with joins, aggregations and rankings, attach text
          evidence while filtering out leaks, then keep only tasks that pass
          hybrid validation.
        </Tile>
      </div>
    </div>
  );
}
