"use client";

import { gearItems } from "../../_content/gear";
import { useLanguage } from "../../_providers/language-context";

export default function HomeIntroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="rounded-2xl border border-(--border-subtle) bg-(--bg) p-6 md:p-8">
      <h2 className="text-lg font-semibold md:text-xl">{t("homeGearTitle")}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--text-secondary) md:text-base">
        {t("homeGearIntro")}
      </p>
      <ul className="mt-5 space-y-3">
        {gearItems.map((item) => (
          <li key={item.id} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="font-medium text-(--text-primary)">{item.name[language]}</span>
            <span className="text-sm text-(--text-secondary)">{item.detail[language]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
