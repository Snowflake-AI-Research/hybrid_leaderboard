# HybridDeepResearch — Leaderboard

A fancy, framework-based leaderboard for the HybridDeepResearch benchmark.

**Stack:** Vite + React + TypeScript + Tailwind v4 + Motion + Phosphor icons
(self-hosted Geist / Geist Mono via Fontsource).

## Run locally

Requires Node 18+.

```bash
npm install
npm run dev
```

Dev server runs on `http://localhost:5173` (bound to `0.0.0.0`, so an SSH
reverse tunnel on port 5173 works the same way as before).

Build a static bundle:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build
```

## Editing data

All leaderboard content lives in a single source of truth:

```
data/results.json
```

- `entries[]` — one object per evaluated system (system, org, base model,
  agent type, date, optional link, and `scores.{overall,sql,web,hybrid}`).
- `meta.news[]` — items shown in the News section.
- `meta.isSampleData` — set to `false` to hide the "sample data" footer note.

Adding a system to the board is a pull request that appends one entry to
`entries[]`. No component changes required.
