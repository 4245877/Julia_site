import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Julia_site/" : "/",
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        howToUse: resolve(__dirname, "src/how-to-use.html"),
      },
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
  },
}));