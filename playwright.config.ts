import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: { baseURL: "http://127.0.0.1:3100", viewport: { width: 390, height: 844 } },
  // Force no-key mode in automated app runs, even when .env.local has a key.
  webServer: { command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: false, timeout: 120_000, env: { OPENAI_API_KEY: "", OPENAI_MODEL: "" } },
});

