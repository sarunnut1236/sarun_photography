import { COLOR_MODE_STORAGE_KEY } from "../../_lib/color-mode";

/** Runs before paint so `data-theme` matches localStorage / system preference. */
export default function ColorModeInitScript() {
  const script = `
(function () {
  try {
    var key = ${JSON.stringify(COLOR_MODE_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var theme = "light";
    if (stored === "dark" || stored === "light") theme = stored;
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
