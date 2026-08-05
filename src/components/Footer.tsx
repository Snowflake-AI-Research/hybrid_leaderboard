export default function Footer({ sample }: { sample?: boolean }) {
  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-8 font-mono text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Snowflake AI Research · HybridDeepResearch</span>
        {sample ? (
          <span className="text-muted">
            Sample data, shown for layout preview only.
          </span>
        ) : null}
      </div>
    </footer>
  );
}
