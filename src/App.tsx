import rawData from "../data/results.json";
import type { Data } from "./lib/types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Leaderboard from "./components/Leaderboard";
import DatasetDesign from "./components/DatasetDesign";
import DatasetSummary from "./components/DatasetSummary";
// Submit / Subscribe temporarily hidden for this release.
// import Submit from "./components/Submit";
// import Subscribe from "./components/Subscribe";
import { Kicker, Section } from "./components/primitives";

const data = rawData as unknown as Data;

function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10">
      <Kicker>{kicker}</Kicker>
      <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-[2.6rem] md:leading-[1.05]">
        {title}
      </h2>
      {sub ? (
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export default function App() {
  const blogUrl =
    "https://www.snowflake.com/en/blog/engineering/hybrid-deep-research-benchmark/";

  return (
    <div className="min-h-[100dvh]">
      <Header />
      <main>
        <Hero
          tagline={data.meta.tagline}
          blogUrl={blogUrl}
          news={data.meta.news ?? []}
        />

        <Section id="leaderboard">
          <SectionHead
            kicker="Leaderboard"
            title="Leaderboard"
            sub="Open-model baselines under two agent scaffolds (smolagents and MiroFlow). Toggle the split, the metric (Avg / Pass), and k; scores break down across the 3 task categories: S2SQL, SQL2S and Parallel."
          />
          <Leaderboard entries={data.entries} board={data.boards.main} />
        </Section>

        <Section id="dataset">
          <SectionHead
            kicker="Dataset design"
            title="How the tasks are built"
            sub="Every task forces rigorous coordination between structured SQL and unstructured web search."
          />
          <DatasetDesign />
          <div className="mt-16">
            <SectionHead
              kicker="Dataset summary"
              title="Public and private splits"
            />
            <DatasetSummary />
          </div>
        </Section>

        {/* Submit / Subscribe temporarily hidden for this release.
        <Section id="submit">
          <SectionHead kicker="Submit" title="Add your system" />
          <Submit />
        </Section>

        <Subscribe />
        */}
      </main>
      <Footer sample={data.meta.isSampleData} />
    </div>
  );
}
