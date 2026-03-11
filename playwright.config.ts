import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 90_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [['line']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm --prefix server run dev',
      port: 3001,
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        NODE_ENV: 'development',
        PORT: '3001',
        AUTO_INIT_DB: 'true',
        ENABLE_DEV_AUTH: 'true',
        DB_CLIENT: 'sqlite3',
        SQLITE_FILE: './dev.sqlite3',
        AUTH_RATE_LIMIT_WINDOW_MS: '60000',
        AUTH_RATE_LIMIT_MAX_REQUESTS: '500',
      },
    },
    {
      command: 'npm --prefix client run dev',
      port: 3000,
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        NODE_ENV: 'development',
        NEXT_PUBLIC_API_BASE: 'http://localhost:3001/api/v1',
      },
    },
  ],
});
