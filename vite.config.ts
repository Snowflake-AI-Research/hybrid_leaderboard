import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// On GitHub Pages this is served from
// https://snowflake-eng.github.io/hybrid_leaderboard/, so the production build
// must be based under the repo name. Dev server stays at the root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/hybrid_leaderboard/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
}));
