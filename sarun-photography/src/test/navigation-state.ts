import { vi } from "vitest";

export const navigationState = {
  pathname: "/",
  searchParams: "lang=en",
  replace: vi.fn((url: string) => {
    const queryIndex = url.indexOf("?");
    navigationState.searchParams = queryIndex >= 0 ? url.slice(queryIndex + 1) : "";
  }),
};
