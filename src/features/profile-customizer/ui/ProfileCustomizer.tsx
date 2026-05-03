"use client";

import { type CSSProperties, useMemo, useState } from "react";
import { Container } from "@/shared/ui/Container";
import { cn } from "@/shared/lib/cn";
import styles from "./ProfileCustomizer.module.css";

const visualStyles = [
  { value: "3d", label: "3D-модель" },
  { value: "2d", label: "2D-стилизация" },
  { value: "hyperrealism", label: "Гиперреализм" },
  { value: "photorealism", label: "Фотореализм" },
] as const;

const hairColors = [
  { value: "brown", label: "Коричневый", hex: "#8B4513" },
  { value: "black", label: "Чёрный", hex: "#000000" },
  { value: "blonde", label: "Блонд", hex: "#FFD700" },
  { value: "red", label: "Рыжий", hex: "#B22222" },
  { value: "blue", label: "Синий", hex: "#4169E1" },
  { value: "purple", label: "Фиолетовый", hex: "#9370DB" },
  { value: "pink", label: "Розовый", hex: "#FF69B4" },
  { value: "green", label: "Зелёный", hex: "#90EE90" },
  { value: "white", label: "Белый", hex: "#eeeeee" },
];

const eyeColors = [
  { value: "brown", label: "Карий", hex: "#8B4513" },
  { value: "blue", label: "Синий", hex: "#4169E1" },
  { value: "green", label: "Зелёный", hex: "#228B22" },
  { value: "gray", label: "Серый", hex: "#808080" },
  { value: "purple", label: "Фиолетовый", hex: "#9370DB" },
  { value: "pink", label: "Розовый", hex: "#FF69B4" },
  { value: "gold", label: "Золотой", hex: "#FFD700" },
  { value: "red", label: "Красный", hex: "#B22222" },
];

type SelectOption = {
  value: string;
  label: string;
};

type ColorOption = {
  value: string;
  label: string;
  hex: string;
};

type RangeStyle = CSSProperties & {
  "--range-pct": string;
};

type RangeControlProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  minLabel?: string;
  maxLabel?: string;
};

function RangeControl({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "%",
  minLabel = "0",
  maxLabel = "100",
}: RangeControlProps) {
  const rangePct = ((value - min) / (max - min)) * 100;

  const rangeStyle: RangeStyle = {
    "--range-pct": `${rangePct}%`,
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel} htmlFor={id}>
        {label}
      </label>

      <div className={styles.rangeWrapper}>
        <div className={styles.rangeMeta}>
          <span className={styles.rangeMinMax}>{minLabel}</span>
          <span className={styles.rangeValue}>
            {value}
            {unit && ` ${unit}`}
          </span>
          <span className={styles.rangeMinMax}>{maxLabel}</span>
        </div>

        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className={styles.rangeInput}
          style={rangeStyle}
        />
      </div>
    </div>
  );
}

type SelectControlProps = {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

function SelectControl({
  id,
  label,
  value,
  options,
  onChange,
}: SelectControlProps) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel} htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={styles.selectInput}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type ColorPickerControlProps = {
  label: string;
  value: string;
  options: ColorOption[];
  onChange: (value: string) => void;
};

function ColorPickerControl({
  label,
  value,
  options,
  onChange,
}: ColorPickerControlProps) {
  return (
    <div>
      <span className={styles.colorPickerLabel}>{label}</span>

      <div className={styles.colorSwatches}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            title={option.label}
            aria-label={option.label}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              styles.colorSwatch,
              value === option.value && styles.colorSwatchActive,
            )}
            style={{ backgroundColor: option.hex }}
          />
        ))}
      </div>
    </div>
  );
}

function VisualIcon() {
  return (
    <svg
      className={styles.featureIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3l7 4v10l-7 4-7-4V7l7-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 3v18M5 7l7 4 7-4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg
      className={styles.featureIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 10v4M12 7v10M16 9v6M4 12h1M19 12h1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BehaviorIcon() {
  return (
    <svg
      className={styles.featureIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4v4M12 16v4M4 12h4M16 12h4M7.8 7.8l2.8 2.8M13.4 13.4l2.8 2.8M16.2 7.8l-2.8 2.8M10.6 13.4l-2.8 2.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ProfileCustomizer() {
  const [visualStyle, setVisualStyle] = useState("3d");
  const [age, setAge] = useState("25");
  const [height, setHeight] = useState(165);
  const [hairColor, setHairColor] = useState("brown");
  const [eyeColor, setEyeColor] = useState("blue");

  const [temperament, setTemperament] = useState(50);
  const [empathy, setEmpathy] = useState(70);
  const [formality, setFormality] = useState(30);
  const [personalityType, setPersonalityType] = useState("balanced");

  const [voicePitch, setVoicePitch] = useState(60);
  const [speechSpeed, setSpeechSpeed] = useState(50);
  const [accent, setAccent] = useState("none");

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [initiative, setInitiative] = useState(30);
  const [creativity, setCreativity] = useState(50);
  const [realism, setRealism] = useState(30);
  const [knowledge, setKnowledge] = useState(80);
  const [memory, setMemory] = useState(70);

  const selectedStyleLabel = useMemo(() => {
    return (
      visualStyles.find((style) => style.value === visualStyle)?.label ??
      "3D-модель"
    );
  }, [visualStyle]);

  return (
    <section id="character-customization" className={styles.section}>
      <Container>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.headerEyebrow}>Profile interface</span>

            <h2 className={styles.headerTitle}>
              Настройка <em>интерфейсной личности</em>
            </h2>

            <p className={styles.headerDesc}>
              Внешний образ Julia — это не основа системы, а пользовательский
              интерфейсный слой. Он позволяет выбрать визуальное представление,
              голос, стиль речи и параметры поведения, не меняя глубинную
              нейрокогнитивную архитектуру.
            </p>
          </header>

          <div className={styles.featureGrid}>
            <article className={styles.featureCard}>
              <VisualIcon />

              <h3 className={styles.featureTitle}>Визуальный образ</h3>

              <p className={styles.featureDesc}>
                2D, 3D, фотореалистичный или стилизованный интерфейсный персонаж.
              </p>
            </article>

            <article className={styles.featureCard}>
              <VoiceIcon />

              <h3 className={styles.featureTitle}>Речь и голос</h3>

              <p className={styles.featureDesc}>
                Тембр, скорость речи, интонация, паузы и эмоциональная окраска
                ответа.
              </p>
            </article>

            <article className={styles.featureCard}>
              <BehaviorIcon />

              <h3 className={styles.featureTitle}>Поведенческий профиль</h3>

              <p className={styles.featureDesc}>
                Формальность, эмпатия, инициативность, осторожность, креативность
                и глубина объяснений.
              </p>
            </article>
          </div>

          <div className={styles.styleSelectorBlock}>
            <h3 className={styles.blockTitle}>Стиль визуального слоя</h3>

            <div className={styles.styleOptions}>
              {visualStyles.map((style) => (
                <button
                  type="button"
                  key={style.value}
                  onClick={() => setVisualStyle(style.value)}
                  className={cn(
                    styles.styleBtn,
                    visualStyle === style.value && styles.styleBtnActive,
                  )}
                >
                  <span>{style.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.previewPanel}>
              <div className={styles.previewContent}>
                <p className={styles.previewLabel}>
                  Превью интерфейсного образа
                </p>

                <p className={styles.previewSub}>
                  Выбран стиль: <em>{selectedStyleLabel}</em>
                </p>

                <div className={styles.previewOrn} aria-hidden="true">
                  ✦
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ornDivider} aria-hidden="true">
            <span className={styles.ornDividerIcon}>✦ ✦</span>
          </div>

          <div className={styles.settingsPanel}>
            <h3 className={styles.settingsPanelTitle}>Основные настройки</h3>

            <div className={styles.settingsGrid}>
              <article className={styles.settingsCard}>
                <h4 className={styles.settingsCardTitle}>
                  Визуальное представление
                </h4>

                <SelectControl
                  id="age"
                  label="Возраст интерфейсного персонажа"
                  value={age}
                  onChange={setAge}
                  options={[
                    { value: "18", label: "18 лет" },
                    { value: "20", label: "20 лет" },
                    { value: "22", label: "22 года" },
                    { value: "25", label: "25 лет" },
                    { value: "28", label: "28 лет" },
                    { value: "30", label: "30 лет" },
                    { value: "35", label: "35 лет" },
                  ]}
                />

                <RangeControl
                  id="height"
                  label="Рост визуального образа"
                  min={140}
                  max={210}
                  unit="см"
                  minLabel="140 см"
                  maxLabel="210 см"
                  value={height}
                  onChange={setHeight}
                />

                <ColorPickerControl
                  label="Цвет волос"
                  value={hairColor}
                  options={hairColors}
                  onChange={setHairColor}
                />

                <ColorPickerControl
                  label="Цвет глаз"
                  value={eyeColor}
                  options={eyeColors}
                  onChange={setEyeColor}
                />
              </article>

              <article className={styles.settingsCard}>
                <h4 className={styles.settingsCardTitle}>
                  Поведенческий профиль
                </h4>

                <RangeControl
                  id="temperament"
                  label="Темперамент"
                  minLabel="Спокойный"
                  maxLabel="Энергичный"
                  value={temperament}
                  onChange={setTemperament}
                />

                <RangeControl
                  id="empathy"
                  label="Эмпатия"
                  minLabel="Сдержанная"
                  maxLabel="Выраженная"
                  value={empathy}
                  onChange={setEmpathy}
                />

                <RangeControl
                  id="formality"
                  label="Формальность речи"
                  minLabel="Неформальная"
                  maxLabel="Официальная"
                  value={formality}
                  onChange={setFormality}
                />

                <SelectControl
                  id="personality-type"
                  label="Когнитивный профиль"
                  value={personalityType}
                  onChange={setPersonalityType}
                  options={[
                    { value: "balanced", label: "Сбалансированный" },
                    { value: "analytical", label: "Аналитический" },
                    { value: "supportive", label: "Поддерживающий" },
                    { value: "creative", label: "Креативный" },
                    { value: "formal", label: "Формальный" },
                    { value: "research", label: "Исследовательский" },
                  ]}
                />
              </article>

              <article className={styles.settingsCard}>
                <h4 className={styles.settingsCardTitle}>Голос</h4>

                <RangeControl
                  id="voice-pitch"
                  label="Тембр"
                  minLabel="Низкий"
                  maxLabel="Высокий"
                  value={voicePitch}
                  onChange={setVoicePitch}
                />

                <RangeControl
                  id="speech-speed"
                  label="Темп речи"
                  minLabel="Медленный"
                  maxLabel="Быстрый"
                  value={speechSpeed}
                  onChange={setSpeechSpeed}
                />

                <SelectControl
                  id="accent"
                  label="Акцент"
                  value={accent}
                  onChange={setAccent}
                  options={[
                    { value: "none", label: "Без акцента" },
                    { value: "russian", label: "Русский" },
                    { value: "ukrainian", label: "Украинский" },
                    { value: "belarusian", label: "Белорусский" },
                    { value: "british", label: "Британский" },
                    { value: "american", label: "Американский" },
                    { value: "french", label: "Французский" },
                    { value: "japanese", label: "Японский" },
                    { value: "caucasian", label: "Кавказский" },
                  ]}
                />
              </article>
            </div>
          </div>

          <div>
            <button
              type="button"
              aria-expanded={advancedOpen}
              aria-controls="profile-advanced-settings"
              onClick={() => setAdvancedOpen((current) => !current)}
              className={styles.advancedToggleBtn}
            >
              <span>Дополнительные параметры</span>

              <span
                className={cn(
                  styles.advancedToggleIcon,
                  advancedOpen && styles.advancedToggleIconOpen,
                )}
              >
                ▼
              </span>
            </button>

            {advancedOpen && (
              <div
                id="profile-advanced-settings"
                className={styles.advancedPanel}
              >
                <h3 className={styles.advancedTitle}>
                  Расширенные настройки
                </h3>

                <div className={styles.advancedGrid}>
                  <RangeControl
                    id="initiative"
                    label="Степень инициативности"
                    minLabel="Низкая"
                    maxLabel="Высокая"
                    value={initiative}
                    onChange={setInitiative}
                  />

                  <RangeControl
                    id="creativity"
                    label="Креативность"
                    minLabel="Логичная"
                    maxLabel="Творческая"
                    value={creativity}
                    onChange={setCreativity}
                  />

                  <RangeControl
                    id="realism"
                    label="Допустимость естественных ошибок"
                    minLabel="Минимальная"
                    maxLabel="Повышенная"
                    value={realism}
                    onChange={setRealism}
                  />

                  <RangeControl
                    id="knowledge"
                    label="Глубина объяснений"
                    minLabel="Базовая"
                    maxLabel="Экспертная"
                    value={knowledge}
                    onChange={setKnowledge}
                  />

                  <RangeControl
                    id="memory"
                    label="Объём пользовательского контекста"
                    minLabel="Короткий"
                    maxLabel="Долгий"
                    value={memory}
                    onChange={setMemory}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.ctaBlock}>
            <a href="#launcher" className={styles.ctaBtn}>
              <span>Настроить профиль Julia</span>
              <span aria-hidden="true">→</span>
            </a>

            <p className={styles.ctaHint}>
              Профиль можно <em>изменить позже</em>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}