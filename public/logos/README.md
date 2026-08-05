# Team / org logos

Logos shown next to each entry on the leaderboard.

## How it works

- Files here are served at the site root, so `public/logos/openai.svg` is reachable at `/logos/openai.svg`.
- To attach a logo to a leaderboard entry, add a `logo` field in `data/results.json`:

```json
{
  "id": "openai-dr",
  "system": "Deep Research",
  "org": "OpenAI",
  "logo": "/logos/openai.svg",
  ...
}
```

- If an entry has **no** `logo`, the UI falls back to an automatically generated
  monogram (the org's first letter on a tinted tile), so nothing looks broken.

## Replacing with real logos

Drop a square `.svg` or `.png` (ideally 64×64 or larger, transparent or white
background) into this folder and point the entry's `logo` field at it. Square
marks look best; the UI renders them in a rounded ~28px box.

The SVGs currently shipped here are simple original monograms — not official
brand marks — and are meant as placeholders.
