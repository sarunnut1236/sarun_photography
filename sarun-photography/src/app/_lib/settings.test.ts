import { describe, expect, it } from "vitest";
import { settings } from "./settings";

describe("settings", () => {
  it("loads rates from settings.json", () => {
    expect(settings.rates.halfDayThb).toBe(1500);
    expect(settings.rates.fullDayThb).toBe(2000);
  });
});
