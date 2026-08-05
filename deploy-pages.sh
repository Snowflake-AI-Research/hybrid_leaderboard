#!/usr/bin/env bash
# Build the site locally and publish dist/ to the `gh-pages` branch.
# No GitHub Actions, no CI npm install — uses the local (working) build.
#
# One-time GitHub setup after the first run:
#   Settings -> Pages -> Source: "Deploy from a branch"
#                        Branch: gh-pages   Folder: / (root)   -> Save
#
# Usage:
#   bash deploy-pages.sh
set -euo pipefail

cd "$(dirname "$0")"

# Reuse whatever remote you already push `main` with (https or ssh),
# so authentication matches.
REMOTE="$(git config --get remote.origin.url)"
if [ -z "$REMOTE" ]; then
  echo "No 'origin' remote found. Run this from the repo that has origin set." >&2
  exit 1
fi

echo "==> Building (vite only, no tsc)…"
npm run build:ci

echo "==> Publishing dist/ to gh-pages on $REMOTE"
cd dist
touch .nojekyll                      # ensure Jekyll is disabled
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "$REMOTE" gh-pages
rm -rf .git

echo "==> Done. gh-pages updated."
echo "    If this is the first time: set Pages source to 'Deploy from a branch' -> gh-pages / (root)."
