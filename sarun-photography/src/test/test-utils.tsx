import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../messages/en.json";
import thMessages from "../../messages/th.json";
import { ColorModeProvider } from "../app/_providers/color-mode-context";
import { navigationState } from "./navigation-state";

type ProviderOptions = {
  lang?: "en" | "th";
  pathname?: string;
  withColorMode?: boolean;
};

const messagesByLocale = {
  en: enMessages,
  th: thMessages,
} as const;

export function renderWithProviders(
  ui: ReactElement,
  { lang = "en", pathname = "/", withColorMode = false }: ProviderOptions = {},
  options?: Omit<RenderOptions, "wrapper">,
) {
  navigationState.pathname = pathname;
  navigationState.locale = lang;

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const content = (
      <NextIntlClientProvider locale={lang} messages={messagesByLocale[lang]}>
        {children}
      </NextIntlClientProvider>
    );
    return withColorMode ? <ColorModeProvider>{content}</ColorModeProvider> : content;
  };

  return render(ui, { wrapper, ...options });
}

export { navigationState };
