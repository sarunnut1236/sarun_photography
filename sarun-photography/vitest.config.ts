import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/dist/**", "src/test/bun/**"],
    setupFiles: ["./src/test/setup.ts"],
    env: {
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "test-cloud",
    },
    coverage: {
      provider: "v8",
      include: ["src/app/_components/**/*.{ts,tsx}"],
      exclude: ["**/*.test.{ts,tsx}", "**/*.d.ts", "src/test/**"],
      reporter: ["text", "lcov", "json-summary"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
