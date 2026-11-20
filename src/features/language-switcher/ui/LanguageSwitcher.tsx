import { cn } from "@/shared/lib/cn";
import styles from "./LanguageSwitcher.module.css";

const languages = ["EN", "UA", "RU"] as const;

type Language = (typeof languages)[number];

const languageTitles: Record<Language, string> = {
  EN: "Английская версия пока недоступна",
  UA: "Украинская версия пока недоступна",
  RU: "Русская версия",
};

export function LanguageSwitcher() {
  return (
    <div className={styles.wrapper} role="group" aria-label="Выбор языка">
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          disabled={language !== "RU"}
          className={cn(styles.btn, language === "RU" && styles.btnActive)}
          title={languageTitles[language]}
          aria-label={languageTitles[language]}
          aria-pressed={language === "RU"}
        >
          {language}
        </button>
      ))}
    </div>
  );
}
