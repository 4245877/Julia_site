import en from "/i18n/en.json";
import ru from "/i18n/ru.json";
import ua from "/i18n/ua.json";

const dictionaries = { en, ru, ua };
const FALLBACK_LANG = "ru";

let currentLang = localStorage.getItem("julia_lang") || FALLBACK_LANG;

function getNestedValue(obj, path) {
  return path
    .split(".")
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export function t(key, fallback = key) {
  return (
    getNestedValue(dictionaries[currentLang], key) ??
    getNestedValue(dictionaries[FALLBACK_LANG], key) ??
    fallback
  );
}

export function applyTranslations(lang = currentLang) {
  currentLang = dictionaries[lang] ? lang : FALLBACK_LANG;
  document.documentElement.lang = currentLang;
  localStorage.setItem("julia_lang", currentLang);

  document.querySelectorAll("[data-translate-key], [data-i18n]").forEach((el) => {
    const key = el.dataset.translateKey || el.dataset.i18n;
    const value = t(key);

    if (value == null) return;

    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement
    ) {
      if (el.hasAttribute("placeholder")) {
        el.placeholder = value;
      } else {
        el.value = value;
      }
      return;
    }

    el.textContent = value;
  });

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === currentLang);
  });
}

export function initI18n(defaultLang = currentLang) {
  currentLang = dictionaries[defaultLang] ? defaultLang : FALLBACK_LANG;

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyTranslations(btn.dataset.lang);
    });
  });

  applyTranslations(currentLang);
}

export function getCurrentLang() {
  return currentLang;
}