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
  document.documentElement.removeAttribute("data-theme");
  navigationState.pathname = "/";
  navigationState.locale = "en";
  navigationState.push.mockClear();
  navigationState.replace.mockClear();
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

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
  Analytics: () => null,
}));

vi.mock("@vercel/analytics/next", () => ({
  track: vi.fn(),
  Analytics: () => null,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    replace: navigationState.replace,
    push: navigationState.push,
  }),
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    locale,
    children,
    ...rest
  }: {
    href: string;
    locale?: "en" | "th";
    children: React.ReactNode;
  } & Record<string, unknown>) => {
    const isInternal = href.startsWith("/");
    const loc = locale ?? navigationState.locale;
    const computed = isInternal ? (href === "/" ? `/${loc}` : `/${loc}${href}`) : href;
    return React.createElement("a", { href: computed, ...rest }, children);
  },
  usePathname: () => navigationState.pathname,
  useRouter: () => ({
    replace: navigationState.replace,
    push: navigationState.push,
  }),
}));
