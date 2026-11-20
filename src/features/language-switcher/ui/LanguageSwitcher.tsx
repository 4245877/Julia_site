import { SegmentedControl } from "@/shared/ui/SegmentedControl";

const languages = ["EN", "UA", "RU"] as const;

type Language = (typeof languages)[number];

const languageTitles: Record<Language, string> = {
  EN: "Английская версия пока недоступна",
  UA: "Украинская версия пока недоступна",
  RU: "Русская версия",
};

const options = languages.map((language) => ({
  value: language,
  label: language,
  disabled: language !== "RU",
  title: languageTitles[language],
  ariaLabel: languageTitles[language],
}));

type LanguageSwitcherProps = {
  labelledBy?: string;
  className?: string;
};

export function LanguageSwitcher({ labelledBy, className }: LanguageSwitcherProps) {
  return (
    <SegmentedControl
      label={labelledBy ? undefined : "Выбор языка"}
      labelledBy={labelledBy}
      value="RU"
      options={options}
      size="sm"
      className={className}
    />
  );
}
