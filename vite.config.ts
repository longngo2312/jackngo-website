import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Repo is served from https://longngo2312.github.io/jackngo-website/
  base: "/jackngo-website/",
  build: {
    // The largest stack logo is ~9.2KB. Lifting the limit above that inlines
    // all 14 as data URIs, so they cost no requests and can't be blocked by
    // filter lists matching the old /logos/*.svg paths.
    assetsInlineLimit: 10240,
  },
});
