const languages = ["EN", "UA", "RU"] as const;

type Language = (typeof languages)[number];

const languageTitles: Record<Language, string> = {
  EN: "Английская версия пока недоступна",
  UA: "Украинская версия пока недоступна",
  RU: "Русская версия",
};

export function LanguageSwitcher() {
  return (
    <div role="group" aria-label="Выбор языка">
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          disabled={language !== "RU"}
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
