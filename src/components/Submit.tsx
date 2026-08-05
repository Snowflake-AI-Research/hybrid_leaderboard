import { ArrowUpRight, EnvelopeSimple, FileText } from "@phosphor-icons/react";

export default function Submit() {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-line bg-surface p-6 shadow-lift md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-5">
      <p className="text-[15px] font-medium leading-snug text-ink md:text-[17px]">
        Follow the{" "}
        <a
          href="https://docs.google.com/document/d/1MSx0sD-quEtLfBizazjw95qXuPf5gedp/edit"
          target="_blank"
          rel="noopener"
          className="text-ice-deep underline decoration-ice-bright/50 underline-offset-4 hover:decoration-ice-bright"
        >
          Submission Guideline
        </a>{" "}
        to request an official evaluation.
      </p>
      <div className="flex shrink-0 items-center gap-2.5">
        <a
          href="https://docs.google.com/document/d/1MSx0sD-quEtLfBizazjw95qXuPf5gedp/edit"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface px-4 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:border-ice-bright hover:text-ice-deep"
        >
          <FileText size={16} className="text-ice-deep" />
          Guideline
        </a>
        <a
          href="mailto:placeholder@snowflake.com"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 font-mono text-[13.5px] text-white transition-colors hover:bg-ice-deep"
        >
          <EnvelopeSimple size={16} />
          placeholder@snowflake.com
          <ArrowUpRight size={14} className="opacity-70" />
        </a>
      </div>
    </div>
  );
}
