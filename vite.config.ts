import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// This repo is PRIVATE, so GitHub Pages serves the site at the ROOT of a random
// *.pages.github.io subdomain (e.g. https://refactored-couscous-xxx.pages.github.io/),
// NOT at snowflake-eng.github.io/hybrid_leaderboard/. So base must be "/".
// If the repo is ever made public, set PAGES_BASE=/hybrid_leaderboard/ at build time.
export default defineConfig(() => ({
  base: process.env.PAGES_BASE || "/",
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
}));
