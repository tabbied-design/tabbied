import { defineConfig, devices } from '@playwright/test';

/**
 * Verifies the production build: `npm start` serves the static export in
 * `out/`, so run `npm run build` first.
 */
export default defineConfig({
  testDir: './e2e',
  // Heavy client-side css-doodle rendering against one server: run serially.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
