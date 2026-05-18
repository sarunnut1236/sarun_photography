import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "bundle.js",
    "next-env.d.ts",
  ]),
  {
    files: ["src/app/_providers/**/*.{ts,tsx}"],
    rules: {
      // Providers sync client state from URL/storage on mount after hydration.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
