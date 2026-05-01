"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";

const languages = ["EN", "UA", "RU"] as const;

export function LanguageSwitcher() {
  const [activeLanguage, setActiveLanguage] = useState<(typeof languages)[number]>("RU");

  return (
    <div className="absolute right-4 top-4 z-50 flex gap-2">
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => setActiveLanguage(language)}
          className={cn(
            "rounded-full border px-3 py-1 text-sm font-semibold transition",
            activeLanguage === language
              ? "border-blue-300 bg-blue-500 text-white"
              : "border-white/20 bg-white/10 text-slate-200 hover:bg-white/15",
          )}
          title={
            language === "RU"
              ? "Русская версия"
              : "Перевод можно подключить следующим этапом"
          }
        >
          {language}
        </button>
      ))}
    </div>
  );
}