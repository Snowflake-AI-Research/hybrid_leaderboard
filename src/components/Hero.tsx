import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Database, GithubLogo } from "@phosphor-icons/react";
import type { NewsItem } from "../lib/types";

const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export default function Hero({
  tagline,
  blogUrl,
  news,
}: {
  tagline: string;
  blogUrl?: string;
  news: NewsItem[];
}) {
  const reduce = useReducedMotion();

  return (
    <div id="top" className="relative overflow-hidden">
      {/* frost + grid + grain background stack */}
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 620px at 80% -10%, var(--color-frost), transparent 60%), radial-gradient(880px 500px at 6% 4%, #eef7ff, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-ice-bright) 60%, transparent), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[60dvh] max-w-[1200px] items-center gap-14 px-6 pb-8 pt-16 md:grid-cols-12 md:gap-10 md:pb-10 md:pt-20">
        {/* Left: the thesis */}
        <div className="md:col-span-6 lg:col-span-7">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="font-display flex flex-col text-[3rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink sm:text-[3.8rem] lg:text-[4.8rem]"
          >
            <span>Hybrid</span>
            <span
              className="w-fit text-transparent"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-ice-bright), var(--color-ice-deep))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Deep
            </span>
            <span>Research</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
            className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#leaderboard"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ice-deep"
            >
              View leaderboard
              <ArrowRight
                weight="bold"
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            {blogUrl ? (
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-surface/80 px-5 py-3 text-[15px] font-medium text-ink backdrop-blur transition-colors hover:border-ice-bright hover:text-ice-deep"
              >
                Read the blog
                <ArrowUpRight size={16} />
              </a>
            ) : null}
            <a
              href="https://huggingface.co/datasets/Snowflake/HybridDeepResearch"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-surface/80 px-5 py-3 text-[15px] font-medium text-ink backdrop-blur transition-colors hover:border-ice-bright hover:text-ice-deep"
            >
              <Database size={16} weight="bold" />
              Dataset
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/snowflake-eng/HybridDeepResearch/tree/main"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-surface/80 px-5 py-3 text-[15px] font-medium text-ink backdrop-blur transition-colors hover:border-ice-bright hover:text-ice-deep"
            >
              <GithubLogo size={16} weight="bold" />
              Code
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Right: latest updates */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="md:col-span-6 lg:col-span-5"
        >
          <NewsCarousel news={news} reduce={!!reduce} />
        </motion.div>
      </div>
    </div>
  );
}

function NewsCarousel({
  news,
  reduce,
}: {
  news: NewsItem[];
  reduce: boolean;
}) {
  const items = news.slice(0, 5);
  const [active, setActive] = useState(0);
  const count = items.length;

  useEffect(() => {
    if (reduce || count <= 1) return;
    const t = setInterval(() => setActive((a) => (a + 1) % count), 10000);
    return () => clearInterval(t);
  }, [reduce, count]);

  if (!count) return null;

  return (
    <div className="shadow-slab relative overflow-hidden rounded-[calc(var(--radius)+6px)] border border-white bg-surface/90 p-6 ring-1 ring-line backdrop-blur-sm md:p-7">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, var(--color-ice-bright), #7dd6ff 55%, transparent)",
        }}
      />

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ice-deep">
          <span aria-hidden className="h-px w-6 bg-ice-bright" />
          Latest updates
        </span>
        <span className="font-mono text-[11px] tabular text-faint">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* sliding track */}
      <div className="mt-5 overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${active * 100}%` }}
          transition={{ duration: 0.55, ease: EASE }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) setActive((a) => Math.min(a + 1, count - 1));
            else if (info.offset.x > 60) setActive((a) => Math.max(a - 1, 0));
          }}
        >
          {items.map((n, i) => (
            <article
              key={i}
              className="min-h-[188px] w-full shrink-0 select-none pr-1"
            >
              <time className="font-mono text-[13px] font-semibold tabular text-ice-deep">
                {n.date}
              </time>
              <h3 className="font-display mt-2 text-[19px] font-semibold leading-snug tracking-tight text-ink">
                {n.title}
              </h3>
              {n.body ? (
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                  {n.body}
                </p>
              ) : null}
              {n.links?.length ? (
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  {n.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener"
                      draggable={false}
                      className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-surface/80 px-3 py-1 text-[12px] font-medium text-ice-deep transition-colors hover:border-ice-bright"
                    >
                      {l.label} <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              ) : n.link ? (
                <a
                  href={n.link}
                  target="_blank"
                  rel="noopener"
                  draggable={false}
                  className="mt-3.5 inline-flex items-center gap-1 text-[13px] font-medium text-ice-deep hover:underline"
                >
                  Read more <ArrowUpRight size={14} />
                </a>
              ) : null}
            </article>
          ))}
        </motion.div>
      </div>

      {/* light slide indicators */}
      {count > 1 ? (
        <div className="mt-5 flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to update ${i + 1}`}
              onClick={() => setActive(i)}
              className="group h-2.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 26 : 10,
                background:
                  i === active
                    ? "linear-gradient(90deg, var(--color-ice-bright), #7dd6ff)"
                    : "var(--color-line-2, #e2ebf3)",
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
