import { rmSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-electron-plugin";
import { customStart } from "vite-electron-plugin/plugin";
import pkg from "./package.json";

rmSync(path.join(__dirname, "dist-electron"), { recursive: true, force: true });
const srcRoot = path.join(__dirname, "src").toString();
const stylesRoot = path.join(__dirname, "src/assets/styles").toString();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": srcRoot,
      "styles": stylesRoot,
    },
  },
  plugins: [
    react(),
    electron({
      include: [
        "electron",
      ],
      transformOptions: {
        sourcemap: !!process.env.VSCODE_DEBUG,
      },
      // Will start Electron via VSCode Debug
      plugins: process.env.VSCODE_DEBUG
        ? [
          customStart(debounce(() =>
            console.log(
              /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App",
            )
          )),
        ]
        : undefined,
    }),
  ],
  server: process.env.VSCODE_DEBUG
    ? (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port,
      };
    })()
    : undefined,
  clearScreen: false,
});

function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299) {
  let t: NodeJS.Timeout;
  return ((...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  }) as Fn;
}
