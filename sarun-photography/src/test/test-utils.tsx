import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { copy } from "../app/_content/copy";
import { ColorModeProvider } from "../app/_providers/color-mode-context";
import { LanguageProvider } from "../app/_providers/language-context";
import { navigationState } from "./navigation-state";

type ProviderOptions = {
  lang?: "en" | "th";
  pathname?: string;
  withColorMode?: boolean;
};

function resetNavigation({ lang = "en", pathname = "/" }: ProviderOptions) {
  navigationState.pathname = pathname;
  navigationState.searchParams = `lang=${lang}`;
  navigationState.replace.mockClear();
}

export function renderWithProviders(
  ui: ReactElement,
  { lang = "en", pathname = "/", withColorMode = false }: ProviderOptions = {},
  options?: Omit<RenderOptions, "wrapper">,
) {
  resetNavigation({ lang, pathname });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const content = <LanguageProvider copy={copy}>{children}</LanguageProvider>;
    return withColorMode ? <ColorModeProvider>{content}</ColorModeProvider> : content;
  };

  return render(ui, { wrapper, ...options });
}

export { navigationState };
