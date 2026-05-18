import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";
import { navigationState } from "./navigation-state";

function createStorageMock() {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
}

const localStorageMock = createStorageMock();
Object.defineProperty(window, "localStorage", { value: localStorageMock, writable: true });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

if (typeof DragEvent === "undefined") {
  class DragEventPolyfill extends Event {
    constructor(type: string, eventInitDict?: EventInit) {
      super(type, eventInitDict);
    }
  }
  vi.stubGlobal("DragEvent", DragEventPolyfill);
}

afterEach(() => {
  cleanup();
  localStorageMock.clear();
  navigationState.pathname = "/";
  navigationState.searchParams = "lang=en";
  navigationState.replace.mockClear();
  navigationState.replace.mockImplementation((url: string) => {
    const queryIndex = url.indexOf("?");
    navigationState.searchParams = queryIndex >= 0 ? url.slice(queryIndex + 1) : "";
  });
});

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const imgProps = { ...props };
    delete imgProps.fill;
    delete imgProps.priority;
    delete imgProps.sizes;
    return React.createElement("img", imgProps);
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
  useSearchParams: () => new URLSearchParams(navigationState.searchParams),
  useRouter: () => ({
    replace: navigationState.replace,
    push: vi.fn(),
  }),
}));
