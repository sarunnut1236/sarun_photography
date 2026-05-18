import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "bun:test";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

describe("component tests", () => {
  test("vitest suite", () => {
    const proc = Bun.spawnSync({
      cmd: ["bun", "x", "vitest", "run"],
      cwd: projectRoot,
      stdout: "inherit",
      stderr: "inherit",
      env: {
        ...process.env,
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "test-cloud",
      },
    });

    expect(proc.exitCode).toBe(0);
  });
});
