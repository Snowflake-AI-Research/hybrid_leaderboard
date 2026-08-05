import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "./primitives";
import type { NewsItem } from "../lib/types";

export default function News({ items }: { items: NewsItem[] }) {
  if (!items.length) return null;
  return (
    <div className="divide-y divide-line border-t border-line">
      {items.map((n, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <article className="grid gap-3 py-7 md:grid-cols-[150px_1fr] md:gap-10">
            <time className="font-mono text-[12.5px] text-faint md:pt-1">
              {n.date}
            </time>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {n.title}
              </h3>
              {n.body ? (
                <p className="mt-1.5 max-w-[68ch] text-[14.5px] leading-relaxed text-muted">
                  {n.body}
                </p>
              ) : null}
              {n.link ? (
                <a
                  href={n.link}
                  target="_blank"
                  rel="noopener"
                  className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-medium text-ice-deep hover:underline"
                >
                  Read more <ArrowUpRight size={14} />
                </a>
              ) : null}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
