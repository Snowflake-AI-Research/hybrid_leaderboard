import { asset } from "../lib/asset";

const NAV = [
  { href: "#leaderboard", label: "Leaderboard" },
  { href: "#dataset", label: "Dataset" },
  // Submit temporarily hidden for this release.
  // { href: "#submit", label: "Submit" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={asset("logos/snowflake-ai-research.svg")}
            alt="Snowflake"
            width={22}
            height={22}
            className="h-[22px] w-[22px]"
          />
          <span className="text-sm font-semibold tracking-tight text-ink">
            Snowflake{" "}
            <span className="font-normal text-muted">AI Research</span>
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
        {/* "Submit a result" button temporarily hidden for this release.
        <a
          href="#submit"
          className="ml-auto rounded-full bg-ink px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-ice-deep md:ml-2"
        >
          Submit a result
        </a>
        */}
      </div>
    </header>
  );
}
