import task from "@cypress/code-coverage/task";
import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      task(on, config);
      return config;
    },
  },
});
