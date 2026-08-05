/**
 * Resolve a public asset path against Vite's base URL.
 *
 * On GitHub Pages the site is served under a subpath (e.g.
 * `/hybrid_leaderboard/`), so hardcoded absolute paths like `/logos/x.png`
 * would 404. Passing them through here rewrites them to
 * `${BASE_URL}logos/x.png`. A leading slash is optional.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, "");
}
