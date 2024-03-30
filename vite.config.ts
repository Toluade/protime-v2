/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: "autoUpdate",
  includeAssests: ["ProTime.png"],
  manifest: {
    name: "ProTime",
    short_name: "ProTime",
    dir: "ltr",
    lang: "en-US",
    orientation: "portrait",
    start_url: "/",
    scope: "/",
    background_color: "#000000",
    theme_color: "#eeeeee",
    display: "standalone",
    description: "A timer app",
    icons: [
      {
        src: "/ProTime_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      // {
      //   src: "/coza-logo-256x256.png",
      //   sizes: "256x256",
      //   type: "image/png",
      // },
      // {
      //   src: "/coza-logo-384x384.png",
      //   sizes: "384x384",
      //   type: "image/png",
      // },
      {
        src: "/ProTime_512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
} as Partial<VitePWAOptions>;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA(manifestForPlugIn)],
  build: {
    outDir: "./dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    loader: "tsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
      },
    },
  },

  ...{
    test: {
      environment: "jsdom",
      setupFiles: ["./tests/setup.ts"],
      testMatch: ["./tests/**/*.test.tsx", "./tests/**/*.test.jsx"],
      globals: true,
    },
  },
});
