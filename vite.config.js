import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [dts({ include: ["src"] })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
    },
  },
});
