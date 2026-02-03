import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright",
  snapshotDir: "./playwright/__screenshots__",
  use: {
    baseURL: "http://127.0.0.1:4173",
    viewport: { width: 1280, height: 720 }
  },
  webServer: {
    command: "pnpm dev -- --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});

