import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv-safe";

dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["list", { printSteps: true }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.FRONTEND_URL,
    trace: "on-first-retry",
    headless: false,
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        // chromiumSandbox: false,
        // launchOptions: {
        //   args: [
        //     // `--headless=new`,
        //     `--disable-extensions-except=testData/extensions/metamask`,
        //     `--load-extension=testData/extensions/metamask`,
        //   ],
        // },
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
