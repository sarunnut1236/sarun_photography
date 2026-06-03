import { vi } from "vitest";

export const navigationState = {
  pathname: "/",
  locale: "en" as "en" | "th",
  push: vi.fn(),
  replace: vi.fn(),
};
