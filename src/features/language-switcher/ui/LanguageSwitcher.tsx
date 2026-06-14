"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./LanguageSwitcher.module.css";

const languages = ["EN", "UA", "RU"] as const;

type Language = (typeof languages)[number];

const languageTitles: Record<Language, string> = {
  EN: "English version",
  UA: "Українська версія",
  RU: "Русская версия",
};

export function LanguageSwitcher() {
  const [activeLanguage, setActiveLanguage] = useState<Language>("RU");

  return (
    <div className={styles.wrapper} role="group" aria-label="Выбор языка">
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => setActiveLanguage(language)}
          className={cn(
            styles.btn,
            activeLanguage === language && styles.btnActive,
          )}
          title={languageTitles[language]}
          aria-label={languageTitles[language]}
          aria-pressed={activeLanguage === language}
        >
          {language}
        </button>
      ))}
    </div>
  );
}
