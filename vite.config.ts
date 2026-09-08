import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Repo is served from https://longngo2312.github.io/jackngo-website/
  base: "/jackngo-website/",
});
